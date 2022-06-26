import React from "react";
import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { useAtomValue } from "jotai";
import { starterAtom } from "../../store/atom";
import { JERSEY_NUMBER, NAME, POSITION } from "../../utils/constant/PLAYER";
import {
  DEFENDER,
  FORWARD,
  GOALKEEPER,
  MIDFIELDER,
} from "../../utils/constant/POSITION";
import { useTheme } from "@emotion/react";

export default function Field({ selected, setSelected }: any) {
  const theme: any = useTheme();
  const starter = useAtomValue(starterAtom);

  function getPlayersByPosition(position: any) {
    return starter.filter((player: any) => player[POSITION] === position);
  }

  function positionVar(arr: any) {
    return 100 / arr.length;
  }

  function renderPosition(position: any) {
    if (!selected) return <></>;
    const playerPosArr = getPlayersByPosition(position);
    const value = positionVar(playerPosArr);
    const offSet = value / 2;
    return playerPosArr.map((player: any, index: any) => {
      const isSelected = player[NAME] === selected[NAME];
      return (
        <Avatar
          onClick={() => setSelected(player)}
          key={position + "_" + index}
          sx={{
            position: "absolute",
            margin: 2,
            top: `${index * value + offSet}%`,
            left: "0%",
            backgroundColor: isSelected ? theme.palette.primary.main : "",
          }}
        >
          {player[JERSEY_NUMBER]}
        </Avatar>
      );
    });
  }

  if (starter.length < 11) return <></>;
  return (
    <Box flex={1} display="flex" height="100%">
      <Box flex={1} position="relative" height="100%">
        {renderPosition(GOALKEEPER)}
      </Box>
      <Box flex={1} position="relative" height="100%">
        {renderPosition(DEFENDER)}
      </Box>
      <Box flex={1} position="relative" height="100%">
        {renderPosition(MIDFIELDER)}
      </Box>
      <Box flex={1} position="relative" height="100%">
        {renderPosition(FORWARD)}
      </Box>
    </Box>
  );
}
