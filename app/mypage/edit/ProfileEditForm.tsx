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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Box,
} from "@mui/material";
import { Layers, Target as TargetIcon, Tag as TagLucide } from "lucide-react";
import { updateUserProfile, UserProfile } from "lib/api/client.ts/userApi";
import {
  DifficultyLevel,
  GoalType,
  DIFFICULTY_LABELS,
  GOAL_LABELS,
} from "types/enums";
import { tagData } from "../../../constants/tagData";

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
  stack: z.array(z.string()).optional(),
  level: z.string().optional(),
  place: z.string().optional(),
  tag: z.array(z.string()).optional(),
  goal: z.array(z.string()).optional(),
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
  const [tags, setTags] = useState<string[]>(initialData.tag || []);
  const [selectedGoals, setSelectedGoals] = useState<GoalType[]>(
    (initialData.goal || []) as GoalType[]
  );
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(
    (initialData.level as DifficultyLevel) || DifficultyLevel.BEGINNER
  );
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData.name || "",
      email: initialData.email || "",
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

  // カテゴリ選択
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // タグのトグル
  const handleTagToggle = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleGoalChange = (goal: GoalType) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);

    try {
      await updateUserProfile(initialData.id, {
        name: data.name || undefined,
        email: data.email || undefined,
        stack: stacks,
        level: selectedLevel,
        place: data.place || undefined,
        tag: tags,
        goal: selectedGoals,
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
      <Card className="mx-auto max-w-xl rounded-3xl">
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
            </section>

            {/* プロフィール情報セクション */}
            <section className="space-y-4">
              <Typography variant="h6">プロフィール情報</Typography>

              {/* 技術スタック */}
              <div>
                <Typography
                  variant="subtitle1"
                  className="mb-2 flex items-center gap-1"
                >
                  <Layers className="w-4 h-4 text-indigo-600" /> 技術スタック
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
                  <FormControl fullWidth>
                    <InputLabel>スキルレベル</InputLabel>
                    <Select
                      {...field}
                      label="スキルレベル"
                      error={!!errors.level}
                      value={selectedLevel}
                      onChange={(e) =>
                        setSelectedLevel(e.target.value as DifficultyLevel)
                      }
                    >
                      {Object.values(DifficultyLevel).map((level) => (
                        <MenuItem key={level} value={level}>
                          {DIFFICULTY_LABELS[level]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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

              {/* 興味タグ（2段階カテゴリ→タグUI） */}
              <div>
                <Typography
                  variant="subtitle1"
                  className="mb-2 flex items-center gap-1"
                >
                  <TagLucide className="w-4 h-4 text-purple-600" /> 興味タグ
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  興味のあるカテゴリを選択し、タグを複数選択してください。
                </Typography>
                {/* カテゴリ選択 */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {Object.keys(tagData).map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      color={
                        selectedCategory === category ? "primary" : "default"
                      }
                      onClick={() => handleCategorySelect(category)}
                      clickable
                      sx={{
                        fontWeight:
                          selectedCategory === category ? "bold" : "normal",
                      }}
                    />
                  ))}
                </Box>
                {/* タグ選択（カテゴリが選ばれている場合のみ） */}
                {selectedCategory && (
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                  >
                    {tagData[selectedCategory].map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.title}
                        color={
                          tags.includes(tag.title) ? "secondary" : "default"
                        }
                        onClick={() => handleTagToggle(tag.title)}
                        clickable
                        sx={{
                          fontWeight: tags.includes(tag.title)
                            ? "bold"
                            : "normal",
                        }}
                      />
                    ))}
                  </Box>
                )}
                {/* 選択済みタグ一覧 */}
                {tags.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      選択された興味タグ ({tags.length}個)
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
                    >
                      {tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          color="secondary"
                          size="small"
                          variant="filled"
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </div>

              <div>
                <Typography
                  variant="subtitle1"
                  className="mb-2 flex items-center gap-1"
                >
                  <TargetIcon className="w-4 h-4 text-emerald-600" /> 目標
                </Typography>
                <FormGroup>
                  {Object.values(GoalType).map((goal) => (
                    <FormControlLabel
                      key={goal}
                      control={
                        <Checkbox
                          checked={selectedGoals.includes(goal)}
                          onChange={() => handleGoalChange(goal)}
                        />
                      }
                      label={GOAL_LABELS[goal]}
                    />
                  ))}
                </FormGroup>
              </div>

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
