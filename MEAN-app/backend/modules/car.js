const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const carsSchema = new Schema({
    password: {type:String},
    title: { type:String },
    model: { type:String},
    year:  {type:Number },
    available: {type:Boolean,default: false }
});
const car = module.exports =  mongoose.model('car',carsSchema );

module.exports.getCarByTitle = function(title, callback){
    let query = {title: title};
    car.findOne(query, callback);
}
 
module.exports.addCar = function(newcar, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newcar.password, salt, function(err, hash) {
            if(err) console.log(err);
            newcar.password = hash;
            newcar.save(callback);
        });
    });
}

    
