import React from "react";
import Button from "@mui/material/Button";
import { styled, Theme } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  textTransform: "none", // MUIのデフォルトでつく大文字変換を無効化
  fontWeight: "medium",
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(["background-color", "box-shadow"], {
    duration: theme.transitions.duration.short,
  }),
  "&:disabled": {
    opacity: 0.5,
    pointerEvents: "none",
  },
}));

interface CustomButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  [key: string]: string | React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "default",
  size = "default",
  children,
  ...props
}) => {
  const sizeStyles = {
    default: { padding: "10px 16px", fontSize: "1rem" },
    sm: { padding: "8px 12px", fontSize: "0.875rem" },
    lg: { padding: "12px 24px", fontSize: "1.125rem" },
    icon: { width: "40px", height: "40px", padding: 0, minWidth: "40px" },
  };

  const variantStyles = {
    default: {
      backgroundColor: "#3f51b5",
      color: "#fff",
      "&:hover": { backgroundColor: "#303f9f" },
    },
    destructive: {
      backgroundColor: "#d32f2f",
      color: "#fff",
      "&:hover": { backgroundColor: "#c62828" },
    },
    outline: {
      border: "1px solid #ccc",
      backgroundColor: "transparent",
      "&:hover": { backgroundColor: "#f5f5f5" },
    },
    secondary: {
      backgroundColor: "#f50057",
      color: "#fff",
      "&:hover": { backgroundColor: "#c51162" },
    },
    ghost: {
      backgroundColor: "transparent",
      "&:hover": { backgroundColor: "#e0e0e0" },
    },
    link: {
      textDecoration: "underline",
      color: "#3f51b5",
      "&:hover": { color: "#303f9f" },
    },
  };

  return (
    <StyledButton
      {...props}
      sx={{ ...sizeStyles[size], ...variantStyles[variant] }}
    >
      {children}
    </StyledButton>
  );
};

export default CustomButton;
