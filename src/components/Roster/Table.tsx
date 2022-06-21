import React, { useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { useAtom } from "jotai";
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  IconButton,
  Popover,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ThreeDots from "../../assets/ThreeDots";
import { rosterAtom, searchAtom } from "../../store/atom";
import DeleteIcon from "../../assets/DeleteIcon";
import EditIcon from "../../assets/EditIcon";
import CloseIcon from "../../assets/CloseIcon";

const colHeader = [
  "Player Name",
  "Jersey Number",
  "Starter",
  "Position",
  "Height",
  "Weight",
  "Nationality",
  "Appearances",
  "Minutes Played",
  "",
];

export default function Table() {
  const theme: any = useTheme();
  const [roster, setRoster] = useAtom(rosterAtom);
  const [search, __] = useAtom(searchAtom);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDelete, setDelete] = useState(false);
  const [openEdit, setEdit] = useState(false);
  const [selectedValue, setSelectedValue] = useState("a");

  const anchorOwner = useRef(null);

  if (!roster) return <></>;

  function handleChange(val: any) {
    setSelectedValue(val);
  }

  function handleClose() {
    setAnchorEl(null);
    anchorOwner.current = null;
  }

  function closeEditDialogAndPopOver() {
    setEdit(false);
    handleClose();
  }

  function handleDelete() {
    if (anchorOwner.current === null) return;
    setRoster((prev: any) =>
      prev.filter(
        (player: any) => player["Player Name"] !== anchorOwner.current
      )
    );
    setDelete(false);
    handleClose();
  }

  function updateAnchor(e: any, name: any) {
    setAnchorEl(e.currentTarget);
    anchorOwner.current = name;
  }

  function renderColHeader() {
    if (!roster) return <></>;
    const colHead = colHeader.map((col, index) => (
      <th key={index} scope="col" style={{ textAlign: "left" }}>
        <Typography color={theme.palette.text.secondary} variant="h6">
          {col}
        </Typography>
      </th>
    ));
    return <tr>{colHead}</tr>;
  }

  function renderRow() {
    if (!roster) return [];
    return roster
      .filter(
        (player: any) =>
          player["Player Name"].toLowerCase().includes(search) ||
          player["Position"].toLowerCase().includes(search)
      )
      .map((player: any, index: number) => {
        const row = colHeader.map((key) => (
          <td style={{ textAlign: "left", height: theme.spacing(2) }}>
            {key !== "" ? (
              <Typography variant="body1" color={theme.palette.text.secondary}>
                {player[key]}
              </Typography>
            ) : (
              <IconButton
                onClick={(e: any) => updateAnchor(e, player["Player Name"])}
              >
                <ThreeDots />
              </IconButton>
            )}
          </td>
        ));
        return <tr key={index}>{row}</tr>;
      });
  }

  return (
    <>
      <Dialog
        open={openDelete}
        onClose={() => {
          setDelete(false);
          handleClose();
        }}
      >
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
            <IconButton
              onClick={() => {
                setDelete(false);
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography p={2}>This Action cannot be done?</Typography>
          <Box p={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" sx={{ marginRight: theme.spacing(1) }}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog open={openEdit} onClose={closeEditDialogAndPopOver}>
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
            <IconButton onClick={closeEditDialogAndPopOver}>
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
                onChange={handleChange}
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Radio
                checked={selectedValue === "b"}
                onChange={handleChange}
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
              />
            </Box>
          </Box>
          <Box
            mt={2}
            p={1}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button disabled={true} color="primary">
              Edit
            </Button>
          </Box>
        </Box>
      </Dialog>

      <table
        style={{
          tableLayout: "fixed",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>{renderColHeader()}</thead>
        <tbody>{renderRow()}</tbody>
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
      </table>
    </>
  );
}
