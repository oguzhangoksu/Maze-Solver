import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function ModeSelect(props) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    props.sendDataToParent(event.target.value)
    
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Mode</InputLabel>
        <Select value={selectedValue} onChange={handleChange}>
          <MenuItem value={"Block"}>Block</MenuItem>
          <MenuItem value={"Target"}>Target Location</MenuItem>
          <MenuItem value={"Current"}>Current Location</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}