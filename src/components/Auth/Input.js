import React from 'react'
import './style.css';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material'
import Visibilty from '@mui/icons-material/Visibility'
import VisibiltyOff from '@mui/icons-material/VisibilityOff'
function Input({half, name, label, type, handleChange, handleShowPassword, autoFocus}) {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                onChange={handleChange}
                variant ="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibilty/> : <VisibiltyOff/>}
                                </IconButton>
                        </InputAdornment>
                    ),
                    }: {}}
                />

        </Grid>
    )
}

export default Input
