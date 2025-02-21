import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ScreenLoader({ inline }) {
  if(inline){
    return ( <Box sx={{ display: 'flex', width: "100%", alignItems: "center", justifyContent: "center" }}>
      <CircularProgress />
    </Box>)
  }
  
  return (
    <Box sx={{ display: 'flex', height: "100vh", width: "100%", alignItems: "center", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}
