import React, { useState } from "react";
import {
  Box,
  ButtonBase,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import CloseIcon from "../../assets/CloseIcon";
import EditIcon from "../../assets/EditIcon";
import DeleteIcon from "../../assets/DeleteIcon";

import PlayerDelete from "./PlayerDelete";
import PlayerEdit from "./PlayerEdit";

export default function PlayerDataAction({
  anchorEl,
  setAnchorEl,
  anchorOwner,
}: any) {
  const theme: any = useTheme();
  const [openDelete, setDelete] = useState(false);
  const [openEdit, setEdit] = useState(false);

  function handleClose() {
    anchorOwner.current = null;
    setAnchorEl(null);
  }

  return (
    <>
      <PlayerDelete
        anchorOwner={anchorOwner}
        open={openDelete}
        setOpen={setDelete}
        closeParentPopover={handleClose}
      />
      <PlayerEdit
        anchorOwner={anchorOwner}
        open={openEdit}
        setOpen={setEdit}
        closeParentPopover={handleClose}
      />
      <Popover
        id={!!anchorEl ? "popoverEdit" : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(1.5),
            width: theme.spacing(25),
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
              Actions
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <ButtonBase
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              borderRadius: theme.spacing(0.5),
              paddingLeft: theme.spacing(1),
            }}
            onClick={() => setEdit(true)}
          >
            <EditIcon />
            <Typography p={1.5}> Edit player </Typography>
          </ButtonBase>
          <ButtonBase
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              borderRadius: theme.spacing(0.5),
              paddingLeft: theme.spacing(1),
            }}
            onClick={() => setDelete(true)}
          >
            <DeleteIcon />
            <Typography p={1.5}> Delete Player </Typography>
          </ButtonBase>
        </Box>
      </Popover>
    </>
  );
}
