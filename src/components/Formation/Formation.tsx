import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Paper } from "@mui/material";
import { Container } from "@mui/system";
import TeamName from "./TeamName";
import PlayCard from "./PlayerCard";
import { useAtom } from "jotai";
import { rosterAtom } from "../../store/atom";
import StarterErrorDialog from "./StarterErrorDialog";

export default function Formation() {
  const [starterError, setError] = useState(false)
  const [roster, _ ] = useAtom(rosterAtom)
  const theme: any = useTheme();

  const close = () => setError(false)

  useEffect(() => {
    if(!roster) return
    let totalStarter = 0
    for(let i = 0; i < roster.length; i++){
      if(roster[i]['Starter'] === 'Yes') totalStarter++
    }

    if(totalStarter > 9) setError(true) 

  }, [roster])

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <StarterErrorDialog open={starterError} close={close} />
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
          flex: 4,
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(4),
          borderRadius: theme.spacing(0.5),
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: theme.spacing(49),
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
          <Box sx={{ flex: 2, borderRadius: theme.spacing(0.5) }}>
            <PlayCard />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
