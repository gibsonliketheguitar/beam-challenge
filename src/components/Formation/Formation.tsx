import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Paper } from "@mui/material";
import TeamName from "./TeamName";
import PlayCard from "./PlayerCard";
import { useAtom } from "jotai";
import { rosterAtom } from "../../store/atom";
import ErrorDialog from "../../common/ErrorDialog";

export default function Formation() {
  const [roster, _] = useAtom(rosterAtom);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<any>({ title: '', body: ''});
  const theme: any = useTheme();

  const close = () => setOpen(false);

  useEffect(() => {
    function moreThan9Starter(arr: any) {
      let totalStarter = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]["Starter"] === "Yes") totalStarter++;
      }
      return totalStarter > 9;
    }

    let state: any = {};
    if (!roster) {
      state = {
        title: "No player data found",
        body: "Please import your roster first",
      };
    } else if (!!roster && moreThan9Starter(roster)) {
      state = {
        title: "There are too many starter",
        body: "Your team has too many starters for one or more of the positions in the 4-3-3 formation",
      };
    }
    else if(!!roster && !moreThan9Starter(roster)){
      state = {
        title: '',
        body: ''
      }
    }

    if(state.title !== '' && state.body !== ''){
      setError(state)
      setOpen(true)
    }
  }, [roster]);
 

  return (
    <>
      <ErrorDialog open={open} close={close} title={error.title} body={error.body} onClose={close}/>
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
          height: "calc(100vh - 46px)",
          marginBottom: theme.spacing(4),
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
            Formation
          </Paper>
          <Paper
            sx={{
              flex: 2,
              height: "100%",
              borderRadius: theme.spacing(0.5),
            }}
          >
            <PlayCard />
          </Paper>
        </Box>
      </Box>
    </>
  );
}
