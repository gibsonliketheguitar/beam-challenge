import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Divider } from "@mui/material";

export default function EmptyPlayerCard() {
  const theme: any = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        borderRadius: theme.spacing(0.5),
        height: "100%",
      }}
    >
      <Box flex={2} />
      <Divider />
      <Box flex={1} />
    </Box>
  );
}
