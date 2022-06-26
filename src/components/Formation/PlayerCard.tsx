import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import {
  NAME,
  POSITION,
  HEIGHT,
  IMG_FLAG,
  IMG_PLAYER,
  WEIGHT,
  NATIONALITY,
  APPEARANCES,
  MIN_PLAYED,
  CLEAN_SHEETS,
  SAVES,
  JERSEY_NUMBER,
  GOALS,
  ASSISTS,
} from "../../utils/constant/PLAYER";
import { GOALKEEPER } from "../../utils/constant/POSITION";

export default function PlayCard({ selected }: any) {
  const theme = useTheme();
  if (!selected) return <></>;
  const {
    [APPEARANCES]: appearances,
    [ASSISTS]: assists,
    [CLEAN_SHEETS]: sheets,
    [GOALS]: goals,
    [HEIGHT]: height,
    [IMG_PLAYER]: playerImg,
    [IMG_FLAG]: flagImg,
    [JERSEY_NUMBER]: number,
    [MIN_PLAYED]: minutes,
    [NAME]: name,
    [NATIONALITY]: nationality,
    [POSITION]: position,
    [SAVES]: saves,
    [WEIGHT]: weight,
  }: any = selected;

  const playerType = (position: any) => {
    return position === GOALKEEPER
      ? [
          { label: CLEAN_SHEETS, value: sheets },
          { label: SAVES, value: saves },
        ]
      : [
          { label: GOALS, value: goals },
          { label: ASSISTS, value: assists },
        ];
  };

  const GAME_STATS = [
    { label: APPEARANCES, value: appearances },
    { label: MIN_PLAYED, value: minutes },
    ...playerType(selected[POSITION]),
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
        borderRadius: theme.spacing(0.5),
        height: "100%",
      }}
    >
      <Box
        flex={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <Box flex={3} position="relative">
          <Typography
            variant="h2"
            color="primary"
            sx={{ position: "absolute", top: "0px", left: "0px" }}
          >
            {number}
          </Typography>
          <Box flex={1} display="flex" justifyContent="center">
            <Box component="img" src={playerImg} height={theme.spacing(40)} />
          </Box>
          <Box
            pb={2}
            pt={2}
            sx={{ position: "absolute", bottom: "0px", left: "0px" }}
          >
            <Typography variant="h3" color="text.main">
              {name}
            </Typography>
            <Typography variant="h3" color="primary">
              {position}
            </Typography>
          </Box>
        </Box>
        <Box
          flex={1}
          mt={2}
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography variant="body1" color="text.secondary" p={1}>
              Height
            </Typography>
            <Typography variant="h4" color="text.primary" p={1}>
              {height.slice(0, 1) + "." + height.slice(1) + " m"}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography variant="body1" color="text.secondary" p={1}>
              Weight
            </Typography>
            <Typography variant="h4" color="text.primary" p={1}>
              {weight + " kg"}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography variant="body1" color="text.secondary" p={1}>
              Nationality
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Avatar
                src={flagImg}
                sx={{
                  width: theme.spacing(3),
                  height: theme.spacing(3),
                  padding: theme.spacing(0.1),
                  backgroundColor: theme.palette.text.primary,
                }}
              />
              <Typography color="text.primary" p={1}>
                {nationality}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
      />
      <Box flex={1}>
        <Grid container direction="row" spacing={2}>
          {GAME_STATS.map((ele: any, indx: number) => {
            return (
              <Grid key={indx} item xs={6}>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h2" color="primary">
                    {ele.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {ele.label}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
