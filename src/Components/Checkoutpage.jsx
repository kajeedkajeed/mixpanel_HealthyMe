import React, { useContext, useState } from 'react'
import { AppContext } from './Context'
import axios from 'axios'
import { FaCcMastercard } from 'react-icons/fa'
import { RiVisaFill } from 'react-icons/ri'
import {SiPhonepe} from 'react-icons/si'
import {SiGooglepay} from 'react-icons/si'
import {FaApplePay} from 'react-icons/fa'
import {SiPaytm} from 'react-icons/si'
import { Modal, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from 'react';
import { Mixpanel } from '../mixpanel';



const Checkoutpage = () => {

  const {total_items, total_amount, cart, emptyCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [isPayNow, setIsPayNow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formMethods = useForm();
  const { register, handleSubmit } = formMethods;

  const onSubmit = (data) => {
    console.log('data of payment >>> ', data);
    console.log('cart >>> ', cart);
    const allCartID = cart.map((item) => item._id);
    
    // mixpanel - checkout_viewed
    Mixpanel.track(
      'checkout_viewed',
      {
        item_ids: allCartID,
        total_items : total_items,
        order_total:total_amount,
        currency:'INR'
      }
    );


    setIsSuccess(true);
    setIsPayNow(false);
  };

  /*const checkOutHandler = async (total_amount, user) => {

    const { data: { key } } = await axios.get("https://healthyme-payment-mrf7u.ondigitalocean.app/api/getkey")
    const { data: { order } } = await axios.post('https://healthyme-payment-mrf7u.ondigitalocean.app/api/checkout', {
      total_amount,
      user
    })
    console.log(order);
    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      //name: order.user.name,
      description: "Test Transaction",
      image: "https://healthyme-logo.blr1.cdn.digitaloceanspaces.com/authLogo.png",
      order_id: order.id,
      callback_url: "https://healthyme-payment-mrf7u.ondigitalocean.app/api/paymentverification",
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9999988888"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#154726"
      }
    };
    const razor = new window.Razorpay(options);
    // razor.open();

  }

  onClick={() => checkOutHandler(total_amount, user)}
  */

  const checkOutHandler = () => {
    setIsPayNow(true);
  };

  const handleCloseModel = () => {
    setIsPayNow(false);
    setIsSuccess(false);
  };

  const handleGoToCart = () => {
    // mixpanel - purchase_completed
    const allCartID = cart.map((item) => item._id);
    const totalItems = cart.reduce((acc, item) => ({ ...acc, total: acc.total + item.amount }), { total: 0 });

    Mixpanel.track(
      'purchase_completed',
      {
        shipping_method: 'delivery',
        medthod : 'credit',
        total_items: totalItems.total,
        item_ids: allCartID,
        order_total: total_amount,
        currency:'INR',
        add_lifetime_value: 3500
      }
    );

    emptyCart();
    navigate("/cart");
  }

  return (
    <section className='checkout-pg'>
      <button onClick={() => checkOutHandler()}>Pay Now</button>
      <table className='table table-hover caption-top'>
        <caption>UPI Details for Payment</caption>
        <thead>
          <tr>
            <th>Payment Network</th>
            <th>Card Number	</th>
            <th>CVV/UPI</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><FaCcMastercard /> Mastercard IND</td>
            <td>5267 3181 8797 5449</td>
            <td>Random CVV</td>
            <td>Any future date</td>
          </tr>
          <tr>
            <td> <RiVisaFill /> Visa IND</td>
            <td>4111 1111 1111 1111</td>
            <td>Random CVV	</td>
            <td>Any future date</td>
          </tr>
        {/*
          <tr>
            <td><FaCcMastercard /> Mastercard International</td>
            <td>5555 5555 5555 4444</td>
            <td>Random CVV	</td>
            <td>Any future date</td>
          </tr>

          <tr>
            <td> <RiVisaFill /> Visa International</td>
            <td>4012 8888 8888 1881</td>
            <td>Random CVV	</td>
            <td>Any future date</td>
          </tr>
        */}  
          <tr>
            <td> UPI</td>
            <td> <SiPhonepe/> <SiGooglepay/> <FaApplePay/> <SiPaytm/> </td>
            <td>success@razorpay</td>
            <td>Any future date</td>
          </tr>
        </tbody>
      </table>
      <Modal
        open={isPayNow}
        onClose={handleCloseModel}
      >
        <div className="wrapper">
        <div className="login-container">
          <div className="close-modal" onClick={handleCloseModel}>x</div>
          <h3>Payment</h3>
          <div className="sub-title">
            <span>HealthyMe</span>
          </div>
          <FormProvider {...formMethods}>
            <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-container">
                <TextField className="mui-TextField" type="text" label="Card Number" variant="outlined" name="cardNumber" {...register('cardNumber')} required />
                <TextField className="mui-TextField" type="text" label="Expiry" variant="outlined" name="expiry" {...register('expiry')} required/>
                <TextField className="mui-TextField" type="text" label="Card holder name" variant="outlined" name="cardHolderName" {...register('cardHolderName')} required/>
                <TextField className="mui-TextField" type="text" label="CVV" variant="outlined" name="cvv" {...register('cvv')} required/>
              </div>
              <div>
                <div> <b>Total amount: {total_amount} </b> </div>
                <br /> <br />
                <Button className="mui-button" type="submit" variant="contained">Pay now</Button>
              </div>
            </form>
          </FormProvider>
        </div>

        
      </div>
      </Modal>
      <Modal
        open={isSuccess}
        onClose={handleCloseModel}
      >
        <div className="wrapper">
        <div className="login-container">
          <div className="close-modal" onClick={handleCloseModel}>x</div>
          <h2><b /> Payment Successful <b /></h2>
          <br /> <br />
          <h3>Total amount: {total_amount}</h3>
          <div className="sub-title">
            <span></span>
            <br /> <br />
          </div>
          <div>
            <Button className="mui-button" variant="contained" onClick={handleGoToCart}>Go back to cart</Button>
          </div>
        </div>
      </div>
      </Modal>
    </section>
  )
}

export default Checkoutpage
