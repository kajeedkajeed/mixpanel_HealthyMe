import React, { useContext, useState } from 'react'
import { AppContext } from './Context'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Modal } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import LoginContainer from './LoginModal/LoginModal';

const CartTotal = () => {
  const { total_amount, total_items, loginWithRedirect, user, logout } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);

  const handleGoToLogin = () => {
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
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
      <LoginContainer open={openModal} handleClose={handleClose} />
    </div>
  )
}

export default CartTotal
