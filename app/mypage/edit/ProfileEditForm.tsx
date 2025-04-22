"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { updateUserProfile, UserProfile } from "@/lib/api/userApi";

const profileSchema = z.object({
  name: z
    .string()
    .min(1, "名前は必須です")
    .max(50, "名前は50文字以内で入力してください"),
  email: z
    .string()
    .email("有効なメールアドレスを入力してください")
    .optional()
    .or(z.literal("")),
  image: z
    .string()
    .url("有効なURLを入力してください")
    .optional()
    .or(z.literal("")),
  stack: z.string().transform((val) =>
    val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  ),
  level: z.string().optional(),
  place: z.string().optional(),
  tag: z.string().transform((val) =>
    val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  ),
  goal: z.string().transform((val) =>
    val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  ),
  affiliation: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
  initialData: UserProfile;
}

export function ProfileEditForm({ initialData }: ProfileEditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newStack, setNewStack] = useState("");
  const [stacks, setStacks] = useState<string[]>(initialData.stack || []);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData.name || "",
      email: initialData.email || "",
      image: initialData.image || "",
      stack: initialData.stack || [],
      level: initialData.level || "",
      place: initialData.place || "",
      tag: initialData.tag || [],
      goal: initialData.goal || [],
      affiliation: initialData.affiliation || "",
    },
  });

  // スキルの追加
  const handleAddStack = () => {
    if (newStack.trim() && !stacks.includes(newStack.trim())) {
      setStacks([...stacks, newStack.trim()]);
      setNewStack("");
    }
  };

  // スキルの削除
  const handleRemoveStack = (stackToRemove: string) => {
    setStacks(stacks.filter((stack) => stack !== stackToRemove));
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);

    try {
      await updateUserProfile(initialData.id, {
        name: data.name || undefined,
        email: data.email || undefined,
        image: data.image || undefined,
        stack: stacks, // 更新されたスタックを使用
        level: data.level || undefined,
        place: data.place || undefined,
        tag: data.tag,
        goal: data.goal,
        affiliation: data.affiliation || undefined,
      });

      setToast({
        open: true,
        message: "プロフィールを更新しました",
        severity: "success",
      });
      router.push("/mypage");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setToast({
        open: true,
        message: "プロフィールの更新に失敗しました",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <>
      <Card>
        <CardHeader title="プロフィール編集" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 基本情報セクション */}
            <section className="space-y-4">
              <Typography variant="h6">基本情報</Typography>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="名前"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="メールアドレス"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="プロフィール画像URL"
                    error={!!errors.image}
                    helperText={errors.image?.message}
                    margin="normal"
                  />
                )}
              />
            </section>

            {/* プロフィール情報セクション */}
            <section className="space-y-4">
              <Typography variant="h6">プロフィール情報</Typography>

              {/* 技術スタック */}
              <div>
                <Typography variant="subtitle1" className="mb-2">
                  技術スタック
                </Typography>
                <div className="flex gap-2 mb-2">
                  <TextField
                    value={newStack}
                    onChange={(e) => setNewStack(e.target.value)}
                    placeholder="新しいスキルを入力"
                    fullWidth
                    size="small"
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddStack}
                    disabled={!newStack.trim()}
                  >
                    追加
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {stacks.map((stack, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                    >
                      <span>{stack}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStack(stack)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="スキルレベル"
                    error={!!errors.level}
                    helperText={errors.level?.message}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="place"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="場所"
                    error={!!errors.place}
                    helperText={errors.place?.message}
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="tag"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="タグ"
                    error={!!errors.tag}
                    helperText={errors.tag?.message}
                    margin="normal"
                    placeholder="カンマ区切りで入力"
                  />
                )}
              />
              <Controller
                name="goal"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="目標"
                    error={!!errors.goal}
                    helperText={errors.goal?.message}
                    margin="normal"
                    placeholder="カンマ区切りで入力"
                  />
                )}
              />
              <Controller
                name="affiliation"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="所属"
                    error={!!errors.affiliation}
                    helperText={errors.affiliation?.message}
                    margin="normal"
                  />
                )}
              />
            </section>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outlined"
                onClick={() => router.push("/mypage")}
                disabled={isSubmitting}
              >
                キャンセル
              </Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
