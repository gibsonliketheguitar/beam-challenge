import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useTheme } from "@emotion/react";

export default function EditIcon() {
  const theme: any = useTheme();
  return <EditRoundedIcon sx={{ color: theme.palette.text.primary }} />;
}
