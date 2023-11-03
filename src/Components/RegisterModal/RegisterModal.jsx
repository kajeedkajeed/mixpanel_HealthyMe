import { v4 as uuidv4 } from 'uuid';
import React, { useContext, useState } from 'react'
import { AppContext } from '../Context'
import { Modal } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import './registerModal.css';
import { TextField, Button, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from 'react';
import { Mixpanel } from '../../mixpanel';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const RegisterModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { open, handleClose, handleLogin } = props;
  const navigate = useNavigate();
  const formMethods = useForm();
  const { register, handleSubmit, setValue } = formMethods;

  const onSubmit = (data) => {
    // mixpanel - sign_up_completed
    Mixpanel.identify(uuidv4());
    Mixpanel.people.set({
      name: data.registerEmail,
      $email: data.registerEmail,
      user_phone: data.registerPhone,
      user_gender: data.registerGender,
    });
    Mixpanel.track(
      'sign_up_completed',
      {
        user_email: data.registerEmail,
        created_date: dayjs().utc().format(),
        signup_method: 'Email',
        user_phone: data.registerPhone,
        user_gender: data.registerGender,
      }
    );

    handleLogin();
  }

  const handleCloseModel = () => {
    handleClose();
  }

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue('registerGender', event.target.value);
  };

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
                <TextField className="mui-TextField" type="text" label="Email" variant="outlined" name="Email" {...register('registerEmail')} required/>
                <TextField className="mui-TextField" type="password" label="password" variant="outlined" name="password" {...register('registerPassword')} required/>
                <TextField className="mui-TextField" type="number" label="Phone" variant="outlined" name="phone" {...register('registerPhone')} required/>
                {/* <TextField className="mui-TextField" type="text" label="gender" variant="outlined" name="gender" {...register('registerGender')}/> */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    {...register('registerGender')}
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
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
