import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Dialog, Typography } from "@mui/material";
import WarningIcon from "../../assets/WarningIcon";

export default function StarterErrorDialog({ open, close }: any) {
  const theme: any = useTheme();
  return (
    <Dialog open={open} onClose={close}>
      <Box p={3} width={theme.spacing(50)} borderRadius={10}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <WarningIcon />
          <Typography ml={1} p={1} variant="h4" color="text.main">
            {" "}
            There are too many starters
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color={theme.palette.text.secondary}
          textAlign="center"
        >
          Your team has too many starters for one or more of the position in the
          4-3-3
        </Typography>
      </Box>
    </Dialog>
  );
}
