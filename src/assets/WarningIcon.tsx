
import React from "react";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useTheme } from "@emotion/react";

export default function WarningIcon() {
  const theme: any = useTheme();
  return <WarningRoundedIcon color='warning'/>
}
