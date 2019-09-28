const jwt = require('jsonwebtoken');
const config = require('../config/database.js');
module.exports = (req, res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.secret);
        next();
    }catch(error){
        res.json({success: false, msg: 'Auth failed!'})
    }
}
