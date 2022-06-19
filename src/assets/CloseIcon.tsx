import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTheme } from "@emotion/react";

export default function CloseIcon() {
  const theme: any = useTheme();
  return <CloseRoundedIcon sx={{ color: theme.palette.text.disabled }} />;
}
