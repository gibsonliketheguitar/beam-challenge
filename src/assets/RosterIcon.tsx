import React from "react";
import { useTheme } from "@emotion/react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Box } from "@mui/material";
export default function RosterIcon() {
  const theme: any = useTheme();
  return (
    <Box>
      <MenuRoundedIcon
        color="primary"
        sx={{
          "&::before": {
            width: theme.spacing(1),
            height: theme.spacing(1),
            borderRadius: theme.spacing(6),
            background: theme.palette.primary.main,
            display: "inline-block",
            margin: theme.spacing(0, 2),
          },
        }}
      />
    </Box>
  );
}
