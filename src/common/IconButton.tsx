import React from "react";
import { Box, styled } from "@mui/material";

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: theme.spacing(4),
  width: theme.spacing(4),
  marginBottom: theme.spacing(3),
}));

export default function IconButton({
  children,
  isSelected = false,
  onClick,
  sx,
}: any) {
  const handleClick = () => {
    if (isSelected) return;
    if (onClick) onClick();
  };
  //TODO add animation to make selecting transition feel more polish
  return (
    <IconWrapper
      onClick={handleClick}
      sx={{ opacity: isSelected ? 1 : 0.5, ...sx }}
    >
      {children}
    </IconWrapper>
  );
}
