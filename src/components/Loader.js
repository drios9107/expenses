import React from 'react'
import {Backdrop, CircularProgress, Typography, Box} from "@mui/material"

const Loader = ({ isLoading,msg='' }) => {
  return <Backdrop
    sx={{ color: '#0848C6', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <Box display='flex' flexDirection='column' justifyContent={'center'} alignItems={'center'}>
      <Box width={50}>
        <CircularProgress color="inherit" />
      </Box>
      {
          msg && <Typography color={'#4c4e64'} variant='body1'>{msg}</Typography>
      }
    </Box>
  </Backdrop>
}

export default Loader
