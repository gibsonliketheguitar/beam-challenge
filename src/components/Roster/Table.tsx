import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { useAtom, useAtomValue } from "jotai";
import { IconButton, Typography, useEventCallback } from "@mui/material";
import ThreeDots from "../../assets/ThreeDots";
import { rosterAtom, searchAtom } from "../../store/atom";
import PlayerDataAction from "./PlayerDataAction";

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
  const anchorOwner = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const roster = useAtomValue(rosterAtom);
  const search = useAtomValue(searchAtom);

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

  if (!roster) return <></>;
  return (
    <>
      <table
        style={{
          tableLayout: "fixed",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>{renderColHeader()}</thead>
        <tbody>{renderRow()}</tbody>
        <PlayerDataAction
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          anchorOwner={anchorOwner}
        />
      </table>
    </>
  );
}
