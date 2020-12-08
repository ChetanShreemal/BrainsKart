const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/User');
const Order = require('../models/Order');
const PRODUCT_TAX = 5.0;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authenticate = require('../middleware/authenticate');
let cartItems = [];
let userInfo = {
    name : '',
    email : '',
    mobile : ''
};


// calc Total
let calcTotal = () =>{
    let tmp = 0;
    if(cartItems.length === 0){
        return 0;
    }
    else{
        for(let cartItem of cartItems){
            tmp += (cartItem.price * cartItem.qty);
        }
    }
    return tmp;
};

// calc Tax
let calcTax = () =>{
    return calcTotal() * PRODUCT_TAX / 100;
};

// calc grand Total
let calcGrandTotal = () => {
    return calcTotal() + calcTax();
};



/*
    USAGE : to receive all Cart Items for payment slip
    URL	/order/send-cart
    Fields	cartItems
    Method	POST
    Access	PRIVATE
 */
router.post('/send-cart', authenticate , async (request, response) => {
    try {
        cartItems = [...request.body];
        /*
            TESTING
         */
        for(let cartItem of cartItems){
            console.log(cartItem.name);
        }

        let user = await User.findById(request.user.id);
        if(user){
            userInfo = {
                name : user.name,
                email : user.email,
                mobile : user.address.mobile
            };
        }
        response.status(200).json({ msg : 'cartItems are stored'});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({msg : error.message});
    }
});

/*
    Sent Stripe Session Information to Client
 */
router.get('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items : [
                {
                    price_data: {
                        currency: 'INR',
                        product_data: {
                            name: 'BrainKart Items'
                        },
                        unit_amount: calcGrandTotal()*100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.HEROKU_SERVER_URL}/order/order-success`,
            cancel_url: `${process.env.HEROKU_SERVER_URL}/order/order-failure`,
        });
        console.log(session.id);
        res.json(session);
    }
    catch (error) {
        console.error(error);
    }
});

// for successful payment, place an order and send a success page
router.get('/order-success', async (request , response) => {
    try {
        let user = {
            name : userInfo.name,
            email : userInfo.email,
            mobile : userInfo.mobile
        }
        let newItems = cartItems.map(cartItem => {
            return {
                name : cartItem.name,
                price : cartItem.price,
                qty : cartItem.qty
            }
        });
        let order = new Order({
            name : user.name,
            email : user.email,
            mobile : user.mobile,
            tax : calcTax(),
            total : calcTotal(),
            items : [...newItems]
        });
        order = await order.save();
        response.sendFile(path.join(__dirname, '..' , 'views' , 'order-success.html'));
    }
    catch (error){
        console.error(error);
        response.status(500).json({msg : error.message});
    }
});

// for failure payment
router.get('/order-failure', (request , response) => {
    response.status(200).json({
        result : 'success',
        message : 'Payment is failed'
    });
});

// fetch all orders
// /order/all
router.get('/all', authenticate, async (request , response) => {
    try {
        let user = await User.findById(request.user.id);
        let orders = await Order.find({email : user.email});
        response.status(200).json({orders : orders});
    }
    catch (error){
        console.error(error);
        response.status(500).json({msg : error.message});
    }
});

module.exports = router;
