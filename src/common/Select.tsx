import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectOption({ id, label, field, options }: any) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${label}label`}>{label}</InputLabel>
        <Select {...field} labelId={id} id={id} label={label}>
          {options.map((ele: any) => (
            <MenuItem value={ele.value}>{ele.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
