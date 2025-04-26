"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('info');

  const handleSendReminders = async () => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/line/send-reminders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "リマインダーの送信に失敗しました。");
      }

      setSnackbarMessage(`リマインダー送信処理を開始しました: ${result.message || '成功'}`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error sending reminders:", error);
      const errorMessage = error instanceof Error ? error.message : "不明なエラーが発生しました。";
      setSnackbarMessage(`エラー: ${errorMessage}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        管理画面
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" gutterBottom>
          LINEリマインダー通知を手動でトリガーします。
        </Typography>
        <Box sx={{ position: 'relative', display: 'inline-flex', mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleSendReminders} 
            disabled={isLoading}
            size="large"
          >
            {isLoading ? "送信中..." : "リマインドを発火"}
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
