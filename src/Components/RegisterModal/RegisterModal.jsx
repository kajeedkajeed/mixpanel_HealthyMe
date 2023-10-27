import React, { useContext, useState } from 'react'
import { AppContext } from '../Context'
import { Modal } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import '../LoginModal/LoginModal.css'
import { TextField, Button } from '@mui/material';
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from 'react';

const RegisterModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { open, handleClose, handleLogin } = props;
  const navigate = useNavigate();
  const formMethods = useForm();
  const { register, handleSubmit } = formMethods;

  const onSubmit = (data) => {
    console.log('register >>> ', data);
    handleLogin();
  }

  const handleCloseModel = () => {
    handleClose();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModel}
      >
        <div className="wrapper">
        <div className="login-container">
          <div className="close-modal" onClick={handleCloseModel}>x</div>
          <h3>Sign up</h3>
          <FormProvider {...formMethods}>
            <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-container">
                <TextField className="mui-TextField" type="text" label="Email" variant="outlined" name="Email" {...register('registerEmail')}/>
                <TextField className="mui-TextField" type="password" label="password" variant="outlined" name="password" {...register('registerPassword')}/>
                <TextField className="mui-TextField" type="number" label="Phone" variant="outlined" name="phone" {...register('registerPhone')}/>
                <TextField className="mui-TextField" type="text" label="gender" variant="outlined" name="gender" {...register('registerGender')}/>
              </div>
              <Button className="mui-button" type="submit" variant="contained">Register</Button>
            </form>
          </FormProvider>
        </div>
      </div>
      </Modal>
    </div>
    
  )
}

export default RegisterModal
