import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Paper } from "@mui/material";
import { useAtom } from "jotai";

import EmptyPlayerCard from "./EmptyPlayerCard";
import TeamName from "./TeamName";
import PlayCard from "./PlayerCard";

import ErrorDialog from "../../common/ErrorDialog";
import { rosterAtom } from "../../store/atom";
import { POSITION, STARTER } from "../../utils/constant/PLAYER";
import {
  DEFENDER,
  FORWARD,
  GOALKEEPER,
  MIDFIELDER,
} from "../../utils/constant/POSITION";

export default function Formation() {
  const [roster, _] = useAtom(rosterAtom);
  const [open, setOpen] = useState(false);
  const [selectedPlayer, setPlayer] = useState(null);
  const [error, setError] = useState<any>({ title: "", body: "" });
  const theme: any = useTheme();

  const close = () => setOpen(false);

  useEffect(() => {
    //TODO move to UTIL, consider creating a dervived atom for starter position
    function moreThan9Starter(arr: any) {
      let totalStarter = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][STARTER] === "Yes") totalStarter++;
      }
      return totalStarter > 9;
    }

    function validStarterType(arr: any) {
      let playerPosition: any = new Map();
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][STARTER] === "Yes") {
          const position = arr[i][POSITION];
          const count = (playerPosition.get(position) || 0) + 1;
          playerPosition.set(position, count);
        }
      }
      console.log(playerPosition);
      for (const [key, value] of playerPosition) {
        if (key === GOALKEEPER) if (value !== 1) return false;
        if (key === DEFENDER) if (value !== 4) return false;
        if (key === MIDFIELDER) if (value !== 3) return false;
        if (key === FORWARD) if (value !== 3) return false;
      }
      return true;
    }

    let state: any = {};
    if (!roster) {
      state = {
        title: "No player data found",
        body: "Please import your roster first",
      };
    } else if (
      !!roster &&
      moreThan9Starter(roster) &&
      !validStarterType(roster)
    ) {
      state = {
        title: "There are too many starter",
        body: "Your team has too many starters for one or more of the positions in the 4-3-3 formation",
      };
    } else if (
      !!roster &&
      !moreThan9Starter(roster) &&
      validStarterType(roster)
    ) {
      state = {
        title: "",
        body: "",
      };
    }

    setError(state);
    console.log(state.title !== "" && state.body !== "", state);
    state.title !== "" && state.body !== "" ? setOpen(true) : setOpen(false);
  }, [roster]);

  useEffect(() => {
    if (!roster) return;
    setPlayer(roster[0]);
  }, [roster]);

  useEffect(() => {
    console.log("what is open", open);
  }, [open]);

  return (
    <>
      <ErrorDialog
        open={open}
        close={close}
        title={error.title}
        body={error.body}
        onClose={close}
      />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: theme.spacing(3),
          backgroundColor: "none",
        }}
      >
        <TeamName />
      </Box>
      <Box
        sx={{
          flex: 11,
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(4),
          borderRadius: theme.spacing(0.5),
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
          }}
        >
          <Paper
            sx={{
              flex: 3,
              marginRight: theme.spacing(4),
              borderRadius: theme.spacing(0.5),
            }}
          >
            TODO: Formation
          </Paper>
          <Paper
            sx={{
              flex: 2,
              height: "100%",
              borderRadius: theme.spacing(0.5),
            }}
          >
            {!roster ? (
              <EmptyPlayerCard />
            ) : (
              <PlayCard selected={selectedPlayer} />
            )}
          </Paper>
        </Box>
      </Box>
    </>
  );
}
