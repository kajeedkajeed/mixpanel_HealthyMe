import React, { useContext, useState } from 'react'
import { AppContext } from '../Context'
import { Modal } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import './loginModal.css';
import { TextField, Button } from '@mui/material';
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from 'react';

const LoginContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { open, handleClose } = props;
  const { total_amount, total_items, loginWithRedirect, user, logout, generateCurrentUser, currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const formMethods = useForm();
  const { register, handleSubmit } = formMethods;

  const onSubmit = (data) => {
    console.log('on submit >>> ', data);
    generateCurrentUser(data.email);
  }

  const handleCloseModel = () => {
    console.log('close model');
    handleClose();
  }

  useEffect(() => {
    console.log('currentUser >>> ', currentUser);
  }, [currentUser]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModel}
      >
        <div className="wrapper">
        <div className="login-container">
          <div className="close-modal" onClick={handleCloseModel}>x</div>
          <h3>Welcome</h3>
          <div>
            <span>Log in to HealthyMe</span>
          </div>
          <FormProvider {...formMethods}>
            <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-container">
                <TextField className="mui-TextField" type="text" label="Email" variant="outlined" name="Email" {...register('email')}/>
                <TextField className="mui-TextField" type="password" label="password" variant="outlined" name="password" {...register('password')}/>
              </div>
              <Button className="mui-button" type="submit" variant="contained">LOG IN</Button>
            </form>
          </FormProvider>
          <div className="sign-up-container">Don't have an account? <div className="sign-up-text">Sign up</div></div>
        </div>
      </div>
      </Modal>
    </div>
    
  )
}

export default LoginContainer
