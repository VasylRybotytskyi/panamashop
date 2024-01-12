import { Box, TextField, MenuItem } from "@mui/material";

const SelectUi = ({ title, array, onChange, value }) => {
  return (
    <Box width="w-full sm:250px">
      <TextField
        label={title}
        select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        size="small"
      >
        {array.map(({ value, label }, index) => (
          <MenuItem key={index} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default SelectUi;
