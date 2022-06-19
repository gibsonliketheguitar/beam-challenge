import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useAtom } from "jotai";
import {
  Box,
  Button,
  Modal,
  Typography,
  styled,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";

import { rosterAtom } from "../../store/atom";
import CloseIcon from "../../assets/CloseIcon";
import IconButton from "@mui/material/IconButton";

export default function ImportTeam() {
  const theme: any = useTheme();
  const [open, setOpen] = useState(true);
  const [rosterFile, setRoster] = useAtom(rosterAtom);
  const validRosterFile = !!rosterFile && rosterFile.type === "text/csv";

  const ImportBtn = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
  }));

  const ModalContent = styled(Box)(({ theme }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "80%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #494949",
    borderRadius: theme.spacing(1),
    boxShadow: theme.spacing(3),
    padding: theme.spacing(2),
  }));

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onFileUpload = (e: any) => {
    const file: any = e.target.files[0];
    if (file) setRoster(file);
  };

  useEffect(() => {
    console.log(rosterFile);
  }, [rosterFile]);

  return (
    <>
      <ImportBtn
        onClick={onOpen}
        size="medium"
        variant={validRosterFile ? "outlined" : "contained"}
      >
        {validRosterFile ? "Re-Import Team" : "Import Team"}
      </ImportBtn>
      <Box>
        <Modal open={open} onClose={onClose}>
          <ModalContent>
            <Box
              sx={{
                display: "flex",
                justifySelf: "stretch",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h3">Importer</Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider
              sx={{
                marginTop: theme.spacing(),
                marginBottom: theme.spacing(1),
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography mb={1} color={theme.palette.text.primary}>
                Roster File
              </Typography>
              <TextField
                error={validRosterFile}
                disabled={true}
                placeholder="No file selected"
                variant="outlined"
                value={rosterFile ? rosterFile.name : ""}
                sx={{
                  color: theme.palette.text.disabled,
                  width: theme.spacing(40),
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment variant="filled" position="end">
                      <Button
                        color="primary"
                        variant="outlined"
                        component="label"
                      >
                        <Typography color={theme.palette.text.secondary}>
                          Select File
                        </Typography>
                        <input
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          style={{ display: "none" }}
                          type="file"
                          onChange={(e: any) => onFileUpload(e)}
                        />
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography mt={1} color={theme.palette.text.disabled}>
                File must be in .csv
              </Typography>
            </Box>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
