const express = require('express');
const router = express.Router();


/*
    USAGE : Accept Stripe Payments
    URL	/payment/pay
    Fields	Product , token
    Method	POST
    Access	PRIVATE
 */
router.get('/order-success', (request , response) => {
    response.status(200).json({
        result : 'success',
        message : 'Payment is success'
    });
});

router.get('/order-failure', (request , response) => {
    response.status(200).json({
        result : 'success',
        message : 'Payment is success'
    });
});



module.exports = router;
