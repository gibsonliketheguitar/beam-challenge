import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { useAtomValue } from "jotai";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "../../assets/CloseIcon";
import { rosterAtom } from "../../store/atom";

export default function PlayerEdit({
  open = false,
  setOpen,
  anchorOwner,
  closeParentPopover,
}: any) {
  const theme: any = useTheme();
  const [roster, setRoster] = useAtomValue(rosterAtom);
  const [selectedValue, setSelectedValue] = useState("a");
  const onCloseEditAndParentPopover = () => {
    setOpen(false);
    closeParentPopover();
  };

  function onChangeRadio(val: any) {
    setSelectedValue(val);
  }

  function getPlayerData() {
    if (anchorOwner.current === null) return null;
    return roster.filter(
      (player: any) => player["Player Name"] === anchorOwner.current
    );
  }

  return (
    <Dialog open={open} onClose={onCloseEditAndParentPopover}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: theme.spacing(1.5),
          width: theme.spacing(50),
          backgroundColor: theme.palette.background.paper,
          justifyContent: "space-between",
        }}
      >
        <Box
          mb={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" p={1}>
            EditPlayer
          </Typography>
          <IconButton onClick={onCloseEditAndParentPopover}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box mb={1.5} sx={{ display: "flex" }}>
          <TextField
            label="Player Name"
            sx={{
              flex: 2,
              marginRight: theme.spacing(1.5),
              borderRadius: theme.spacing(1),
            }}
          />
          <TextField
            label="Jersey Number"
            sx={{ flex: 1, borderRadius: theme.spacing(1) }}
          />
        </Box>
        <Box mb={1} sx={{ display: "flex" }}>
          <TextField
            label="Height"
            sx={{
              flex: 4,
              marginRight: theme.spacing(1.5),
              borderRadius: theme.spacing(1),
            }}
          />
          <TextField
            label="Weight"
            sx={{ flex: 3, borderRadius: theme.spacing(1) }}
          />
        </Box>
        <Box mb={1.5}>
          <Select
            label="Nationality"
            sx={{ width: "100%", borderRadius: theme.spacing(1) }}
          />
        </Box>
        <Box mb={1.5}>
          <Select
            label="Position"
            sx={{ width: "100%", borderRadius: theme.spacing(1) }}
          />
        </Box>
        <Box>
          <Typography>Starter</Typography>
          <Box>
            <Radio
              checked={selectedValue === "starter"}
              onChange={onChangeRadio}
              value="a"
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
            />
            <Radio
              checked={selectedValue === "b"}
              onChange={onChangeRadio}
              value="b"
              name="radio-buttons"
              inputProps={{ "aria-label": "B" }}
            />
          </Box>
        </Box>
        <Box mt={2} p={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button disabled={true} color="primary">
            Edit
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
