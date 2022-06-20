import React from "react";
import { useTheme } from "@emotion/react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function ThreeDots() {
  const theme: any = useTheme();
  return <MoreHorizIcon color={theme.palette.text.secondary} />;
}
