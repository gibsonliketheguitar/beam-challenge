import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useTheme } from "@emotion/react";

export default function DeleteIcon() {
  const theme: any = useTheme();
  return <DeleteOutlinedIcon sx={{ color: theme.palette.text.primary }} />;
}
