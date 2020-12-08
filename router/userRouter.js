const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const {body , validationResult} = require('express-validator');
const authenticate = require('../middleware/authenticate');

/*
    USAGE : Register a User
    URL	/user/register
    Fields	name , email , password
    Method	POST
    Access	PUBLIC
 */
router.post('/register',
    [
        body('name').notEmpty().withMessage('Name is Required'),
        body('email').notEmpty().withMessage('Email is Required'),
        body('password').notEmpty().withMessage('Password is Required'),
    ]
    , async (request , response) => {
        let errors = validationResult(request);
        if(!errors.isEmpty()){
            return response.status(401).json({
                errors : errors.array()
            })
        }
    try {
        let { name , email , password } = request.body;

        // if the user already exists
        let user = await User.findOne({email : email});
        if(user){
            return response.status(401).json({
                errors : [
                    { msg : 'User is Already Exists'}
                ]
            });
        }

        // encrypt the password
        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password , salt);

        // gravatar for email
        let avatar = gravatar.url(email, {
            s : '200',
            r : 'pg',
            d : 'mm'
        });

        // admin false
        let isAdmin = false;

        // empty address
        let address = {
            flat : ' ',
            street : ' ',
            landmark: ' ',
            city : ' ',
            state : ' ',
            country : ' ',
            pin : ' ',
            mobile : ' '
        };

        // store into database
        user = new User({name , email , password, avatar , isAdmin , address});
        user = await user.save();
        response.status(200).json({
            result : 'Registration is Success'
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors : [
                {msg : `Server Error ${error}`}
            ]
        });
    }
});

/*
    USAGE : Login a User
    URL	/user/login
    Fields	email , password
    Method	POST
    Access	PUBLIC
 */
router.post('/login', [
    body('email').notEmpty().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is Required'),
], async (request , response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({
            errors : errors.array()
        })
    }

    try {
        let {email , password} = request.body;

        // check email is exists or not
        let user = await User.findOne({email : email});
        if(!user){
            return response.status(401).json({
                errors : [
                    { msg : 'Invalid Credentials'}
                ]
            });
        }

        // check password
        let isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return response.status(401).json({
                errors : [
                    { msg : 'Invalid Credentials'}
                ]
            });
        }

        // create a json web token and send to client
        let payload = {
            user : {
                id : user.id,
                name : user.name
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn : 36000000}, (err, token) => {
            if(err) throw err;
            response.status(200).json({
                result : 'Login Success',
                token : token,
                user : user
            });
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors : [
                {msg : `Server Error ${error}`}
            ]
        });
    }
});

/*
    USAGE : Get User Info
    URL	/user/
    Fields	no-fields
    Method	POST
    Access	PRIVATE
 */
router.get('/', (request , response) => {
    response.status(200).json({
        result : 'success',
        message : 'Get User Info'
    });
});

/*
    USAGE : Create / Update Address
    URL	/user/address
    Fields	flat , street , landmark , city , state , country , pin , mobile
    Method	POST
    Access	PRIVATE

 */
router.post('/address', authenticate ,
    [
        body('flat').notEmpty().withMessage('Flat is Required'),
        body('street').notEmpty().withMessage('Street is Required'),
        body('landmark').notEmpty().withMessage('Landmark is Required'),
        body('city').notEmpty().withMessage('City is Required'),
        body('state').notEmpty().withMessage('State is Required'),
        body('country').notEmpty().withMessage('Country is Required'),
        body('pin').notEmpty().withMessage('Pin is Required'),
        body('mobile').notEmpty().withMessage('Mobile is Required'),
    ]
    , async (request , response) => {
    try {
        let address = {
            flat : request.body.flat,
            street : request.body.street,
            landmark : request.body.landmark,
            city : request.body.city,
            state : request.body.state,
            country : request.body.country,
            pin : request.body.pin,
            mobile : request.body.mobile
        };
        // get user Information
        let user = await User.findById(request.user.id);
        if(!user){
            return response.status(401).json({
                errors : [
                    {msg : 'User is not Exists'}
                ]
            });
        }
        user.address = address;
        user = await user.save(); // save to database
        response.status(200).json({
            result : 'Address is updated',
            user : user
        });
    }
    catch (error) {
        console.error(error);
        response.status(500).json({
            errors : [
                {msg : `Server Error ${error}`}
            ]
        });
    }
});

module.exports = router;
