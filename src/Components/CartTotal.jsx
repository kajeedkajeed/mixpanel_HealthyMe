import React, { useContext, useState } from 'react'
import { AppContext } from './Context'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Modal } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import LoginContainer from './LoginModal/LoginModal';
import RegisterModal from './RegisterModal/RegisterModal';
import { Mixpanel } from '../mixpanel';

const CartTotal = () => {
  const { total_amount, total_items, loginWithRedirect, currentUser, logout, generateCurrentUser } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const handleGoToLogin = () => {
    setOpenModal(true);
    setOpenRegisterModal(false);
 // mixpanel - login_started
    Mixpanel.track(
      'login_started',
      {
        page_name: 'Cart',
      }
    );
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

     Mixpanel.track(
      'sign_up_started',
      {
        'page_name': 'Cart',
      }
   );

  }

  const handleLogout = () => {
    console.log('logout');
    generateCurrentUser(null);
    Mixpanel.reset();
  }

  return (
    <div>
      <article className='cart-bill'>
        <p>Billing</p>
        <h4>Total Items: {total_items}</h4>
        <h3>Order Total: &#8377; {total_amount}</h3>
        {currentUser ?
          <div className='btn-logout'>
            <Link to='/checkout'>
              <button className='btn-checkout btn-pymnt'>Checkout</button>
            </Link>
            <PersonRemoveIcon className='btn-logout-icon' onClick={handleLogout} />
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
