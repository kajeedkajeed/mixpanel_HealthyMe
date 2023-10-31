import React, { useContext, useState } from 'react'
import { AppContext } from './Context'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Modal } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import LoginContainer from './LoginModal/LoginModal';
import RegisterModal from './RegisterModal/RegisterModal';

const CartTotal = () => {
  const { total_amount, total_items, loginWithRedirect, user, logout } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const handleGoToLogin = () => {
    setOpenModal(true);
    setOpenRegisterModal(false);
  }

  const handleClose = () => {
    setOpenModal(false);
  }

  const handleRegisterClose = () => {
    setOpenRegisterModal(false);
  }

  const handleSignUp = () => {
    console.log('handleSignUp >>>> ');
    setOpenRegisterModal(true);
    setOpenModal(false);

    /**
     * mixpanel
     * mixpanel track >>> page_name
     */
  }

  return (
    <div>
      <article className='cart-bill'>
        <p>Billing</p>
        <h4>Total Items: {total_items}</h4>
        <h3>Order Total: &#8377; {total_amount}</h3>
        {user ?
          <div className='btn-logout'>
            <Link to='/checkout'>
              <button className='btn-checkout btn-pymnt'>Checkout</button>
            </Link>
            <PersonRemoveIcon className='btn-logout-icon' onClick={() => logout({ returnTo: window.location.origin })} />
          </div> :
          <button className='btn-checkout btn-login' onClick={handleGoToLogin}> < PersonAddIcon />Login to Checkout</button>
        }
      </article>
      <LoginContainer open={openModal} handleClose={handleClose} handleSignUp={handleSignUp} />
      <RegisterModal open={openRegisterModal} handleClose={handleRegisterClose} handleLogin={handleGoToLogin} />
    </div>
  )
}

export default CartTotal
