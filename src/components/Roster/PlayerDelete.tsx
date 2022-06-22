import React from "react";
import { useUpdateAtom } from "jotai/utils";
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import CloseIcon from "../../assets/CloseIcon";
import { rosterAtom } from "../../store/atom";

export default function PlayerDelete({
  anchorOwner,
  open = false,
  setOpen,
  closeParentPopover,
}: any) {
  const theme: any = useTheme();
  const setRoster = useUpdateAtom(rosterAtom);
  const onCloseDeleteAndParentPopover = () => {
    setOpen(false);
    closeParentPopover();
  };

  const handleDeletePlayer = () => {
    if (anchorOwner.current === null) return;
    setRoster((prev: any) =>
      prev.filter(
        (player: any) => player["Player Name"] !== anchorOwner.current
      )
    );
    onCloseDeleteAndParentPopover();
  };

  return (
    <Dialog open={open} onClose={onCloseDeleteAndParentPopover}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: theme.spacing(1.5),
          width: theme.spacing(50),
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" p={1}>
            Are you sure
          </Typography>
          <IconButton onClick={onCloseDeleteAndParentPopover}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography p={2}>This action cannot be done?</Typography>
        <Box p={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            sx={{ marginRight: theme.spacing(1) }}
            onClick={onCloseDeleteAndParentPopover}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeletePlayer}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
