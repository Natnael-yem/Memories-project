import React, { useEffect, useState } from 'react';
import {AppBar, Avatar, Button, Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

import memories from '../../images/logo192.png';

function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    useEffect(()=>{
        const token = user?.token;
        
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[])
    return (
        <div>
            <AppBar className='appBar' position='static' color="inherit">
                <div className='bandContainer'>
                <Typography to="/" component={Link} className='heading' variant='h3' align="center">Memories</Typography>
                <img className='image' src={memories} alt="memories" width="40" />
            </div>
            <Toolbar className='toolbar'>
                {user ? (
                    <div className='profile'>
                        <Avatar className='purple' alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className='userName' variant='h6'>{user.result.name}</Typography>
                        <button variant="contained" className='logout' color="secondary">logout</button>
                    </div>
                ): (
                <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
