import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Menu } from '@mui/material';

export default function AlgorithmSelection(props) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    props.sendDataToParent(event.target.value)
    
  };

  return (
    <Box sx={{ minWidth: 120 ,marginTop:"20px"}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Solving Algorithm</InputLabel>
        <Select value={selectedValue} onChange={handleChange}>
          <MenuItem value={"BFS"}>BFS Shortest Path Algorithm</MenuItem>
          <MenuItem value={"Djkstra"}>Djkstra Shortest Path Algorithm</MenuItem>
          <MenuItem value={"Manhattan"}>A* Algorithm(Manhattan Distance)</MenuItem>
          <MenuItem value={"Diagonal"}>A* Algorithm(Diagonal Distance)</MenuItem>
          <MenuItem value={"Eucledian"}>A* Algorithm(Eucledian Distance)</MenuItem>
          <MenuItem value={"Chebysev"}>A* Algorithm(Chebysev Distance)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}