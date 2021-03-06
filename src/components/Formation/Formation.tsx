import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Paper } from "@mui/material";
import { useAtomValue } from "jotai";

import EmptyPlayerCard from "./EmptyPlayerCard";
import TeamName from "./TeamName";
import PlayCard from "./PlayerCard";

import ErrorDialog from "../../common/ErrorDialog";
import { starterAtom } from "../../store/atom";
import { POSITION, STARTER } from "../../utils/constant/PLAYER";

import {
  DEFENDER,
  FORWARD,
  GOALKEEPER,
  MIDFIELDER,
} from "../../utils/constant/POSITION";
import Field from "../Roster/Field";

export default function Formation() {
  const starter = useAtomValue(starterAtom);
  const starterLen = starter.length;
  const [open, setOpen] = useState(false);
  const [selectedPlayer, setPlayer] = useState(null);
  const [error, setError] = useState<any>({
    status: true,
    title: "",
    body: "",
  });
  const theme: any = useTheme();

  const close = () => setOpen(false);

  useEffect(() => {
    //TODO move to UTIL, consider creating a dervived atom for starter position
    function validStarterType(arr: any) {
      let playerPosition: any = new Map();
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][STARTER] === "Yes") {
          const position = arr[i][POSITION];
          const count = (playerPosition.get(position) || 0) + 1;
          playerPosition.set(position, count);
        }
      }
      for (const [key, value] of playerPosition) {
        if (key === GOALKEEPER) if (value !== 1) return false;
        if (key === DEFENDER) if (value !== 4) return false;
        if (key === MIDFIELDER) if (value !== 3) return false;
        if (key === FORWARD) if (value !== 3) return false;
      }
      return true;
    }
    //TODO look at how to handle global error logic
    //There has to be a cleaner way. OOP?
    //What happens when you need to add more error logic
    let state: any = {
      status: true,
    };
    if (starterLen === 0) {
      state = {
        status: true,
        title: "No player data found",
        body: "Please import your roster first",
      };
    } else if (starterLen < 11) {
      state = {
        status: true,
        title: "There are too few starters",
        body: "Your team has too few starters for one or more of the positions in the 4-3-3 formation",
      };
    } else if (starterLen > 11) {
      state = {
        status: true,
        title: "There are too many starters",
        body: "Your team has too many starters for one or more of the positions in the 4-3-3 formation",
      };
    } else if (starterLen === 11 && !validStarterType(starter)) {
      state = {
        status: true,
        title: "Number of player per position is invalid",
        body: "Your team has invalid starters for one or more of the positions in the 4-3-3 formation",
      };
    } else if (starterLen === 11 && validStarterType(starter)) {
      state = {
        status: false,
        title: "",
        body: "",
      };
    }
    setError(state);
    !state.status ? setOpen(false) : setOpen(true);
  }, [starter]);

  //ON load set goalLeg as initial player
  useEffect(() => {
    const goalKeeper = starter.filter(
      (player: any) => player[POSITION] === GOALKEEPER
    )[0];
    setPlayer(goalKeeper);
  }, []);

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
            {!error.status && (
              <Field selected={selectedPlayer} setSelected={setPlayer} />
            )}
          </Paper>
          <Paper
            sx={{
              flex: 2,
              height: "100%",
              borderRadius: theme.spacing(0.5),
            }}
          >
            {!!error.status ? (
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
