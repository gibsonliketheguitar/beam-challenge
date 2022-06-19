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
import Papa from "papaparse";

export default function ImportTeam() {
  const theme: any = useTheme();
  const [open, setOpen] = useState(true);
  const [rosterFile, setRoster] = useAtom(rosterAtom);
  const [importError, setImportError] = useState(false);
  const validCSV =
    !!rosterFile && rosterFile.type === "text/csv" && !importError;

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
    const file: any = e.target.files;
    if (file.length === 0) return;
    if (file) setRoster(file[0]);
    Papa.parse(file[0], {
      header: true,
      complete: (result) => {
        const INVALID_CSV = hasEmptyField(result);
        setImportError(() => (INVALID_CSV ? true : false));
      },
    });

    const hasEmptyField = ({ data }: any) => {
      for (let i = 0; i < data.length; i++) {
        const ROW = data[i];
        for (let [_, value] of Object.entries(ROW)) {
          if (value === "") return true;
        }
      }
      return false;
    };
  };

  console.log(validCSV);

  return (
    <>
      <ImportBtn
        onClick={onOpen}
        size="medium"
        variant={validCSV ? "outlined" : "contained"}
      >
        {validCSV ? "Re-Import Team" : "Import Team"}
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
            <Typography mb={1} color={theme.palette.text.primary}>
              Roster File
            </Typography>
            <TextField
              error={!validCSV}
              disabled={true}
              placeholder="No file selected"
              variant="outlined"
              value={rosterFile ? rosterFile.name : ""}
              sx={{
                color: theme.palette.text.disabled,
                width: "max-content",
                paddingRight: theme.spacing(2),
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
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
            <Box mt={1}>
              <Typography hidden={!importError} variant="h5" color="error">
                Error
              </Typography>
              <Typography mt={0.5} color={theme.palette.text.disabled}>
                {importError
                  ? "Your sheet is missing data. Please ensure all cells are filled out"
                  : "File must be in .csv"}
              </Typography>
            </Box>
            <Box mt={1} hidden={!validCSV}>
              <Typography> File Summary</Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  disabled={!validCSV}
                  variant="contained"
                  onClick={() => setRoster()}
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  Import
                </Button>
              </Box>
            </Box>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
