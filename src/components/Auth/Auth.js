import React, { useState } from "react";
import Icon from './icon';
import './style.css';

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GoogleLogin } from "@leecheuk/react-google-login";
import Input from "./Input";
import {useNavigate} from 'react-router-dom'

import { useEffect } from 'react';
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate;
  // const state= null;
  
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: "693343351061-j3niq9th1t31i272seh3ri1cq2g7urb4.apps.googleusercontent.com",
          scope: 'email',
        });
      }
  
      gapi.load('client:auth2', start);
    }, []);

  const handleChange = () =>  {

  };
  const handleSubmit = () => {
    
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);


  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccessful. Try Again Later');
  }
  const googleSuccess =  async(res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try{
      dispatch({type: 'AUTH', data: {result, token}})
      navigate("/");
    }catch(err){
      console.log(err)
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className="paper" elevation={3}>
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="fisrtName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="pasword"
              />
            )}
          </Grid>
          
          <Button
            className="submit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            
          >
            {isSignup ? "SignUp" : "Sign In"}
          </Button>
          <div className="google">
          <GoogleLogin
          clientId="693343351061-j3niq9th1t31i272seh3ri1cq2g7urb4.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className="googleButton"
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> 
          </div>
          <Grid item>
            <Button onClick={switchMode}>
              {isSignup
                ? "Already have an account? Sign In"
                : "Dont't have an account? Sign Up"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
