import React, { useContext, useEffect } from 'react'
import { AppContext } from './Context'
import { Link } from 'react-router-dom';
import CartItems from './CartItems';
import CartTotal from './CartTotal';
import { BsCart4 } from 'react-icons/bs'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material';
import SocialMedia from './SocialMedia';
import { Mixpanel } from '../mixpanel';

const Cart = () => {
  const { cart, clearCart, total_amount } = useContext(AppContext);

  const handleCartViewed = () => {
    const allCartID = cart.map((item) => item._id);
    const totalItems = cart.reduce((acc, item) => ({ ...acc, total: acc.total + item.amount }), { total: 0 });

    // mixpanel cart_viewed
    Mixpanel.track(
      'cart_viewed',
      {
        item_ids: allCartID,
        total_items: totalItems?.total,
        order_total: total_amount,
        currency: 'INR'
      }
   );

  };

  useEffect(() => {
    handleCartViewed();
  }, []);

  if (cart.length < 1) {
    return <section className='empty-cart-items'>
      <div className='empty-title'>
        your
        <span> <BsCart4 className='empty-cart' /> </span>
        cart is empty!
      </div>
      <Link to='/shop'>
        <button className='empty-shop-now'>
          Shop Now!
        </button>
      </Link>
    </section>
  }

  return (
    <section className='cart-items'>
      <div className='cart-top-sec'>
        <Link to='/shop'>
          <Button variant="outlined" color="success">
            Shop More ?
          </Button>
        </Link>
        <span>
          <h2>Your Total: &#8377; {total_amount}</h2>
        </span>

      </div>

      {
        cart.map(item => {
          return (
            <CartItems key={item._id} {...item} />
          )
        })
      }


      <div className='cart-footer'>
        <div className='col-6'>

          <Link to='/shop'>
            <Button className='btn-cart' variant="outlined" color="success">
              Shop More ?
            </Button>
          </Link>

          <Button className='btn-clear-cart' onClick={clearCart} variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Clear Cart
          </Button>

          <SocialMedia />

        </div>

        <div className='col-6'>
          <CartTotal />
        </div>

      </div>

    </section>
  )
}

export default Cart
