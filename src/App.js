import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import React from 'react';
import {Container} from '@mui/material';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


export default function App(){
    return (
        <Router>
        <Container  maxWidth='lg'>
            <Navbar/>
                <Routes>
                <Route path="/" exact Component={Home}/>
                <Route path="/auth" exact Component={Auth}/>
                </Routes>
        </Container>
        </Router>
    );
}