import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from './Context'
import { Mixpanel } from '../mixpanel';

const AddToCart = ({ mealItems }) => {

  const { addToCart } = useContext(AppContext);
  const { _id, title, image, category, description, price } = mealItems;
  const [amount, setAmount] = useState(1);

  const addCartItem = (_id, title, image, category, description, price, amount) => {
    // console.log('addCartItem >>> ', _id, title, image, category, description, price, amount)
    // mixpanel - item_added
    Mixpanel.track(
      'item_added',
      {
        item_ids: _id,
        item_quantity: amount,
        currency:'INR'
      }
    );

    addToCart(_id, title, image, category, description, price, amount);

  };


  return (
    <div>
      <Link to='/cart'>
        <button className='btn-cart'
          onClick={() => addCartItem(_id, title, image, category, description, price, amount)}>
          Add To Cart
        </button>
      </Link>

    </div>
  )
}

export default AddToCart
