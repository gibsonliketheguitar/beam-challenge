import React from "react";
import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";

export default function PlayCard() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        borderRadius: theme.spacing(0.5),
        height: '100%',
      }}
    >
      <Box sx={{ flex: 4, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 3 }}>
          <Typography>Player Number</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography>Player Name</Typography>
          <Typography>Player Position </Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Height</Typography>
          <Typography>1.85 m</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Weight</Typography>
          <Typography>89kg</Typography>
        </Box>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>Nationality</Typography>
            <Typography>Costa Rican</Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>26</Typography>
          <Typography>Apperances</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>2308</Typography>
          <Typography>Minutes Played</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>10</Typography>
          <Typography>Clean Sheets</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>76</Typography>
          <Typography>Saves</Typography>
        </Box>
      </Box>
    </Box>
  );
}
