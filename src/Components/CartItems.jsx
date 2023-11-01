import React, { useContext } from 'react'
import { AppContext } from './Context'
import AmountButtons from './AmountButtons';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Mixpanel } from '../mixpanel';

const CartItems = ({ _id, title, price, image, amount }) => {
  
  const { cart, total_amount, removeMeal, increaseAmount, decreaseAmount } = useContext(AppContext);


  const onRemoveCartItem = (id) => {
    // console.log('cart >>> ', cart);
    // console.log('cart item >>> ', )
    const cartItem = cart.find(item => item._id === id);
    // mixpanel - item_removed
    Mixpanel.track(
      'item_removed',
      {
        item_ids: id,
        total_items: cartItem.amount,
        order_total: total_amount,
        currency:'INR'
      }
    );
  };

  return (
    <section className='all-cart-items'>
      <Card sx={{ maxWidth: '100vw', }}>
        <CardActionArea>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <CardMedia
              component={'img'}
              height='200'
              width='150'
              image={image}
            />
            <CardContent>
              <Typography variant='h6'>
                {title}
                <br />
                &#8377; {price}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography className='Qtys' variant='h6'>
                Qty:{amount}
              </Typography>
            </CardContent>
            <CardActions>
              <AmountButtons _id={_id} amount={amount} increaseAmount={increaseAmount} decreaseAmount={decreaseAmount} />
            </CardActions>
            <CardActions>
              <DeleteIcon color='error'  onClick={() => {onRemoveCartItem(_id); removeMeal(_id); }} />
            </CardActions>
          </Box>
        </CardActionArea>
      </Card>
      <div>
      
      </div>
    </section>
  )
}

export default CartItems
