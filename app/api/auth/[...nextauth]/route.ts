import NextAuth, {
  AuthOptions,
  Account,
  Profile,
  User,
  Session,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import LineProvider from "next-auth/providers/line";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      lineId?: string | null;
    };
    accessToken?: string;
  }
  interface User {
    lineId?: string | null;
  }
  interface AdapterUser {
    lineId?: string | null;
  }
}

interface LineProfile extends Profile {
  sub: string;
  name?: string;
  picture?: string;
  email?: string;
}

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    LineProvider({
      clientId: process.env.NEXT_PUBLIC_LINE_CHANNEL_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET as string,
      authorization: {
        params: { scope: "openid profile email" },
      },
      profile(profile: LineProfile): User | AdapterUser {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          lineId: profile.sub,
        };
      },
    }),
    CredentialsProvider({
      name: "Test User Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          // バックエンドのテストユーザーログインAPIを呼び出し
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            console.error("Backend authentication failed");
            return null;
          }

          const data = await response.json();

          if (data.success && data.user) {
            console.log("Test user authentication successful");
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              image: data.user.image,
            };
          }

          return null;
        } catch (error) {
          console.error("Error during test user authentication:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: User | AdapterUser;
      account: Account | null;
    }) {
      if (account && account.provider === "line") {
        const providerAccountId = account.providerAccountId;
        if (!providerAccountId) {
          console.error(
            "LINE providerAccountId is missing in signIn callback."
          );
          return false;
        }
        console.log(
          "Attempting backend sync. User (NextAuth):",
          JSON.stringify(user, null, 2),
          "Account (NextAuth):",
          JSON.stringify(account, null, 2)
        );

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/sync`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user: user,
                account: account,
              }),
            }
          );

          const responseBody = await response.text();
          console.log(`Backend sync response status: ${response.status}`);
          console.log(`Backend sync response body: ${responseBody}`);

          if (!response.ok) {
            console.error(
              "Failed to sync user with backend. See details above."
            );
          } else {
            console.log("Successfully initiated user sync with backend.");
          }
        } catch (error) {
          console.error("Error calling backend sync endpoint:", error);
        }
      }
      return true;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User | AdapterUser;
      account?: Account | null;
    }) {
      const isSignIn = user ? true : false;
      if (isSignIn && account) {
        token.id = user!.id;
        if (account.provider === "line") {
          token.lineId = account.providerAccountId;
        }
        if (account.access_token) {
          token.accessToken = account.access_token;
        }
      } else if (token.id) {
        if (!token.lineId) {
          try {
            const dbAccount = await prisma.account.findFirst({
              where: { userId: token.id as string, provider: "line" },
              select: { providerAccountId: true },
            });
            if (dbAccount) {
              token.lineId = dbAccount.providerAccountId;
            }
          } catch (error) {
            console.error("Error fetching account in JWT callback:", error);
          }
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      if (token.lineId) {
        session.user.lineId = token.lineId as string | null;
      }
      if (token.accessToken) {
        session.accessToken = token.accessToken as string | undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
