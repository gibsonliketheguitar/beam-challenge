import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useTheme } from "@emotion/react";

export default function SearchIcon({ disabled = true }) {
  const theme: any = useTheme();
  return (
    <SearchOutlinedIcon
      sx={{
        color: disabled
          ? theme.palette.text.disabled
          : theme.palette.text.primary,
      }}
    />
  );
}
