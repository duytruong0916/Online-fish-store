const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    
    title: {type:String, require: true},
    gender: {type:String, required:true},
    size: {type:String, required:true},
    category: {type:String, required:true },
    price: {type:String, required:true },
    productImage: {type:String, required:true },
    status: {type:String, required:true }

})
const Halfmoon = module.exports = mongoose.model('Product',ProductSchema);
