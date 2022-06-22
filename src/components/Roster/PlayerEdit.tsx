import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { useAtom } from "jotai";
import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "../../assets/CloseIcon";
import NATIONS from "../../assets/data/countries.json";
import POSITIONS from "../../assets/data/position.json";

import { rosterAtom } from "../../store/atom";
import { classNames } from "react-select/dist/declarations/src/utils";

interface IFormInput {
  "Player Name": string;
  "Jersey Number": string;
  Starter: string;
  Position: any;
  Height: string;
  Weight: string;
  Nationality: any;
  Appearances: string;
  "Minutes Played": string;
}

export default function PlayerEdit({
  open = false,
  setOpen,
  anchorOwner,
  closeParentPopover,
}: any) {
  const theme: any = useTheme();
  const [roster, setRoster] = useAtom(rosterAtom);
  const [playerData, setPlayer] = useState<any>({});
  const { control, handleSubmit, formState } = useForm<IFormInput>();
  const { isDirty } = formState;
  const noChange = !isDirty;

  const onCloseEditAndParentPopover = () => {
    setOpen(false);
    closeParentPopover();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    //if (disableSubmit) return;
    setRoster((prev: any) =>
      prev.map((player: any) =>
        player["Player Name"] === player[anchorOwner.current]
          ? {
              ...data,
              Nationality: data["Nationality"].value,
              Position: data["Position"].value,
            }
          : player
      )
    );
    onCloseEditAndParentPopover();
  };

  const NATION_OPTIONS: any = NATIONS.map((nation) => {
    return {
      value: nation,
      label: nation[0].toUpperCase() + nation.slice(1),
    };
  });

  const POSITION_OPTIONS: any = POSITIONS.map((position) => {
    return {
      value: position,
      label: position[0].toUpperCase() + position.slice(1),
    };
  });

  //TODO reset react hook form data, missing something.
  //probably don't even need this use effect
  useEffect(() => {
    if (anchorOwner.current === null) return;
    const data = roster.filter(
      (player: any) => player["Player Name"] === anchorOwner.current
    )[0];
    setPlayer(data);
  }, [anchorOwner.current]);

  if (!open) return <></>;
  return (
    <Dialog open={open} onClose={onCloseEditAndParentPopover}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(3),
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
            <Typography variant="h5" mb={1}>
              EditPlayer
            </Typography>
            <IconButton onClick={onCloseEditAndParentPopover}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box mb={2} sx={{ display: "flex" }}>
            <Controller
              name="Player Name"
              control={control}
              defaultValue={playerData["Player Name"]}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Player Name"
                  sx={{
                    flex: 2,
                    marginRight: theme.spacing(1.5),
                    borderRadius: theme.spacing(1),
                  }}
                />
              )}
            />
            <Controller
              name="Jersey Number"
              control={control}
              defaultValue={playerData["Jersey Number"]}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Jersey Number"
                  sx={{ flex: 1, borderRadius: theme.spacing(1) }}
                />
              )}
            />
          </Box>
          <Box mb={2} sx={{ display: "flex" }}>
            <Controller
              name="Height"
              control={control}
              defaultValue={playerData["Height"]}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Height"
                  sx={{
                    flex: 4,
                    marginRight: theme.spacing(1.5),
                    borderRadius: theme.spacing(1),
                  }}
                />
              )}
            />
            <Controller
              name="Weight"
              control={control}
              defaultValue={playerData["Weight"]}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Weight"
                  sx={{ flex: 3, borderRadius: theme.spacing(1) }}
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="Nationality"
              control={control}
              defaultValue={playerData["Nationality"]}
              render={({ field }) => (
                <Select
                  {...field}
                  options={NATION_OPTIONS}
                  //label="Nationality"
                  //sx={{ width: "100%", borderRadius: theme.spacing(1) }}
                />
              )}
            />
          </Box>
          <Box mb={2}>
            <Controller
              name="Position"
              control={control}
              defaultValue={playerData["Position"]}
              render={({ field }) => (
                <Select {...field} options={POSITION_OPTIONS} />
              )}
            />
          </Box>
          <Box>
            <Typography>Starter</Typography>
            <Controller
              name="Starter"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  aria-label="Starter"
                  defaultValue={playerData["Starter"]}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              )}
            />
          </Box>
          <Box
            mt={2}
            p={1}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              className="button"
              disabled={noChange}
              color="primary"
              variant="contained"
              type="submit"
            >
              Edit
            </Button>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
}
