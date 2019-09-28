const Product = require('../modules/product');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const name = file.originalname.toLowerCase().split(" ").join('-');
        cb(null, name);
    }
})
const upload = multer({ storage: storage });
//API POST
router.post('/product/upload', upload.single('image'), (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const product = new Product({
        title: req.body.title,
        gender: req.body.gender,
        size: req.body.size,
        category: req.body.category,
        price: req.body.price,
        status: req.body.status,
        productImage: url + '/uploads/' + req.file.filename
    })
    product.save()
        .then(product => {
            res.json({
                success: true,
                msg: "Product added successfully",
                product: {
                    id: product._id,
                    title: product.tile,
                    gender: product.gender,
                    size: product.size,
                    price :product.price,
                    category: product.category,
                    productImage: product.productImage,
                    status: product.status
                }
            });
        })
})

//Api GET
router.get('/product', (req, res, next) => {
    Product.find({})
        .then(product => {
            res.json({
                success: true,
                msg: "successfully",
                product: product
            });
        })
})
//Api GET
router.get('/product/:title', (req, res) => {

    Product.find({title: req.params.title})
    .then(product => {
        res.json({
            success: true,
            msg: "successfully",
            product: product
        });
    })
})
router.get('/product/:title', (req, res) => {

    Product.find({title: req.params.title})
    .then(product => {
        res.json({
            success: true,
            msg: "successfully",
            product: product
        });
    })
})
router.get('/product/:title.:subtitle', (req, res) => {
    const subtitle = req.params.subtitle;
    const title = req.params.title;
    switch(subtile){
        case 'mdragon':
        case 'mfancy':
        case 'mkoi':
        case 'maoe':
        case 'msuper':
                Product.find({title:title, gender: 'male'})
                .then(product => {
                    res.json({
                        success: true,
                        msg: "successfully",
                        product: product
                    });
                })

    }
})
module.exports = router;