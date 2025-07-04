"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Autocomplete,
  TextField,
  Chip,
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import { predefinedTags } from "../../lib/data/tags";
import { getUserProfile, updateUserProfile } from "../../lib/api/client.ts/userApi";

interface InterestTagManagerProps {
  initialTags?: string[];
}

export function InterestTagManager({ initialTags = [] }: InterestTagManagerProps) {
  const { data: session } = useSession();
  const [currentTags, setCurrentTags] = useState<string[]>(initialTags);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadUserTags = useCallback(async () => {
    if (!session?.user?.id) return;
    
    setIsLoading(true);
    try {
      const userProfile = await getUserProfile(session.user.id);
      setCurrentTags(userProfile.tag || []);
    } catch (error) {
      console.error("Failed to load user tags:", error);
      setMessage({ type: "error", text: "タグの読み込みに失敗しました" });
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (session?.user?.id) {
      loadUserTags();
    }
  }, [session?.user?.id, loadUserTags]);

  const handleTagChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setCurrentTags(newValue);
  };

  const handleSave = async () => {
    if (!session?.user?.id) return;

    setIsSaving(true);
    setMessage(null);
    
    try {
      await updateUserProfile(session.user.id, { tag: currentTags });
      setMessage({ type: "success", text: "興味タグを保存しました" });
    } catch (error) {
      console.error("Failed to save tags:", error);
      setMessage({ type: "error", text: "保存に失敗しました。もう一度お試しください。" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleMessageClose = () => {
    setMessage(null);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h6" gutterBottom>
        興味タグの編集
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        興味のある技術やトピックを選択してください。リストにない場合は、自由に入力することもできます。
      </Typography>

      {message && (
        <Alert 
          severity={message.type} 
          onClose={handleMessageClose}
          sx={{ mb: 2 }}
        >
          {message.text}
        </Alert>
      )}

      <Autocomplete
        multiple
        freeSolo
        value={currentTags}
        onChange={handleTagChange}
        options={predefinedTags}
        renderInput={(params) => (
          <TextField
            {...params}
            label="興味タグ"
            placeholder="タグを選択または入力してください"
            helperText="Enterキーで新しいタグを追加できます"
            fullWidth
          />
        )}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={option}
              color="primary"
              size="medium"
            />
          ))
        }
        sx={{ mb: 3 }}
        disabled={isSaving}
      />

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isSaving}
          startIcon={isSaving ? <CircularProgress size={20} /> : <SaveIcon />}
        >
          {isSaving ? "保存中..." : "保存"}
        </Button>
      </Box>

      {currentTags.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            現在の興味タグ ({currentTags.length}個)
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {currentTags.map((tag, index) => (
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
    </Box>
  );
}