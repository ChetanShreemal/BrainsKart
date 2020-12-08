const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const {validationResult , body} = require('express-validator');
/*
    USAGE : Upload a Product
    URL	/product/upload
    Fields	name , brand , price , qty , image , category , description , usage
    Method	POST
    Access	PRIVATE

 */
router.post('/upload',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('brand').notEmpty().withMessage('Brand is required'),
        body('price').notEmpty().withMessage('Price is required'),
        body('qty').notEmpty().withMessage('Qty is required'),
        body('image').notEmpty().withMessage('Image is required'),
        body('category').notEmpty().withMessage('Category is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('usage').notEmpty().withMessage('Usage is required'),
    ]
    ,async (request , response) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : errors.array()});
    }
    try {
        // get the form data
        let newProduct = {
            name : request.body.name,
            brand : request.body.brand,
            price : request.body.price,
            qty : request.body.qty,
            image : request.body.image,
            category : request.body.category,
            description : request.body.description,
            usage : request.body.usage
        };

        // check any product is already exists or not
        let product = await Product.findOne({name : newProduct.name});
        if(product){
            return response.status(401).json({
                msg : 'Product is already exists'
            })
        }
        // insert into database
        product = new Product(newProduct);
        product = await product.save();
        response.status(200).json({
            result : 'Successfully Uploaded',
            product : product
        });
    }
    catch (error) {
        response.status(500).json({
            errors : [
                {msg : error.message}
            ]
        })
    }
});

/*
    USAGE : Get Men's Collection
    URL	/product/men
    Fields	No-fields
    Method	GET
    Access	PUBLIC
 */
router.get('/men', async (request , response) => {
   try {
        let products = await Product.find({category : 'MEN'});
        response.status(200).json(products);
   }
   catch (error) {
       response.status(500).json({
           errors : [
               {msg : error.message}
           ]
       });
   }
});

/*
    USAGE : Get Women's Collection
    URL	/product/women
    Fields	No-fields
    Method	GET
    Access	PUBLIC
 */
router.get('/women', async (request , response) => {
    try {
        let products = await Product.find({category : 'WOMEN'});
        response.status(200).json(products);
    }
    catch (error) {
        response.status(500).json({
            errors : [
                {msg : error.message}
            ]
        });
    }
});

/*
    USAGE : Get Kid's Collection
    URL	/product/kids
    Fields	No-fields
    Method	GET
    Access	PUBLIC
 */
router.get('/kids', async (request , response) => {
    try {
        let products = await Product.find({category : 'KIDS'});
        response.status(200).json(products);
    }
    catch (error) {
        response.status(500).json({
            errors : [
                {msg : error.message}
            ]
        });
    }
});

/*
    USAGE : Get Single Product
    URL	/product/:id
    Fields	No-fields
    Method	GET
    Access	PUBLIC
 */
router.get('/:id', async (request , response) => {
    let productId = request.params.id;
    try {
        let product = await Product.findById(productId);
        response.status(200).json(product);
    }
    catch (error) {
        response.status(500).json({
            errors : [
                {msg : error.message}
            ]
        });
    }
});

module.exports = router;
