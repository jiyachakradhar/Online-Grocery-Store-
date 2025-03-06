import React from 'react'
import { Button }from '@mui/material'
export const Logout = () => {
    const button={
        marginRight:'20px', 
        fontSize:'1.2rem',
        fontweignt:'700', 
        padding:'0.3rem 1.4rem'};
  return (
    <Button style= {button} color="error" variant="contained">Logout</Button>
  )
}
