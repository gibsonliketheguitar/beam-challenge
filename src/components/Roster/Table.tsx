import React, { useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { useAtom } from "jotai";
import { Box, IconButton, Popover, Typography } from "@mui/material";
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
  const [roster, _] = useAtom(rosterAtom);
  const [search, __] = useAtom(searchAtom);
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorOwner = useRef(null);

  if (!roster) return <></>;

  function handleClose() {
    setAnchorEl(null);
    anchorOwner.current = null;
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EditIcon />
            <Typography p={1.5}> Edit player </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DeleteIcon />
            <Typography p={1.5}> Delete Player </Typography>
          </Box>
        </Box>
      </Popover>
    </table>
  );
}
