"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

interface ProfileEditFormProps {
  initialData: UserProfile;
}

export function ProfileEditForm({ initialData }: ProfileEditFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateUserProfile(initialData.id, {
        name: formData.name || undefined,
        email: formData.email || undefined,
        image: formData.image || undefined,
        stack: formData.stack,
        level: formData.level || undefined,
        place: formData.place || undefined,
        tag: formData.tag,
        goal: formData.goal,
        affiliation: formData.affiliation || undefined,
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基本情報セクション */}
            <section className="space-y-4">
              <Typography variant="h6">基本情報</Typography>
              <TextField
                fullWidth
                label="名前"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="メールアドレス"
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="プロフィール画像URL"
                value={formData.image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                margin="normal"
              />
            </section>

            {/* プロフィール情報セクション */}
            <section className="space-y-4">
              <Typography variant="h6">プロフィール情報</Typography>
              <TextField
                fullWidth
                label="技術スタック"
                value={formData.stack.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stack: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                margin="normal"
                placeholder="カンマ区切りで入力"
              />
              <TextField
                fullWidth
                label="スキルレベル"
                value={formData.level || ""}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="場所"
                value={formData.place || ""}
                onChange={(e) =>
                  setFormData({ ...formData, place: e.target.value })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="タグ"
                value={formData.tag.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tag: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                margin="normal"
                placeholder="カンマ区切りで入力"
              />
              <TextField
                fullWidth
                label="目標"
                value={formData.goal.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    goal: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                margin="normal"
                placeholder="カンマ区切りで入力"
              />
              <TextField
                fullWidth
                label="所属"
                value={formData.affiliation || ""}
                onChange={(e) =>
                  setFormData({ ...formData, affiliation: e.target.value })
                }
                margin="normal"
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
