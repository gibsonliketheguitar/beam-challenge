import React, { useState } from "react";
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
import Papa from "papaparse";

import { importModalAtom, rosterAtom } from "../../store/atom";
import CloseIcon from "../../assets/CloseIcon";
import IconButton from "@mui/material/IconButton";
import { useUpdateAtom } from "jotai/utils";

export default function ImportTeam() {
  const theme: any = useTheme();
  const [open, setOpen] = useAtom(importModalAtom);
  const [importData, setImportData] = useState([]);
  const [importFile, setImportFile] = useState<any | null>(null);
  const [importError, setImportError] = useState(false);
  const setRoster = useUpdateAtom(rosterAtom);

  const validCSV =
    !!importFile &&
    importFile.type === "text/csv" &&
    importData.length > 0 &&
    !importError;

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
    if (file) setImportFile(file[0]);

    Papa.parse(file[0], {
      header: true,
      complete: (result: any) => {
        const INVALID_CSV = hasEmptyField(result);
        if (!INVALID_CSV) {
          setImportData(result.data);
        }
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

  function getPlayerSummaryArr() {
    if (!validCSV) return [];
    const playerType: any = new Map([["totalPlayer", 0]]);

    importData.forEach(({ Position }) => {
      const count = (playerType.get(Position) || 0) + 1;
      const totalPlayer = playerType.get("totalPlayer") + 1;

      playerType.set(Position, count);
      playerType.set("totalPlayer", totalPlayer);
    });

    let result = [];
    for (const [key, value] of playerType) {
      if (key === "totalPlayer") result[0] = ["Total Players", value];
      if (key === "Goalkeeper") result[1] = ["Goalkeeper", value];
      if (key === "Defender") result[2] = ["Defender", value];
      if (key === "Midfielder") result[3] = ["Midfielder", value];
      if (key === "Forward") result[4] = ["Forward", value];
    }

    return result;
  }

  function renderPlayerSummaryTable() {
    const arr: any = getPlayerSummaryArr();
    const colHead = arr.map((ele: any) => (
      <th scope="col">
        {
          <Typography
            variant="h5"
            color={theme.palette.text.disabled}
            align="left"
          >
            {ele[0]}
          </Typography>
        }
      </th>
    ));
    const col = arr.map((ele: any) => (
      <td>
        {
          <Typography
            variant="body1"
            color={theme.palette.text.secondary}
            align="left"
          >
            {ele[1]}
          </Typography>
        }
      </td>
    ));

    return (
      <span>
        <Typography
          variant="h5"
          color={theme.palette.text.primary}
          mt={3}
          mb={3}
        >
          File Summary
        </Typography>
        <table style={{ tableLayout: "fixed", width: "100%" }}>
          <tr>{colHead}</tr>
          <tr>{col}</tr>
        </table>
      </span>
    );
  }

  const onUpdateRosterFile = () => {
    if (!validCSV) return false;
    setRoster(importData);
    onClose();
  };
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
              <Typography variant="h4">Importer</Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider
              sx={{
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
              }}
            />
            <Typography
              variant="h5"
              mt={2}
              mb={1}
              color={theme.palette.text.primary}
            >
              Roster File
            </Typography>
            <TextField
              error={!validCSV}
              disabled={true}
              placeholder="No file selected"
              variant="outlined"
              value={!!importFile ? importFile.name : ""}
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
                  : "File must be in .csv format"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: validCSV ? "flex" : "none",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              mt={1}
            >
              {renderPlayerSummaryTable()}
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
                  onClick={onUpdateRosterFile}
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
