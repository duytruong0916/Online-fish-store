const User = require('../modules/user');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router()
const passport = require('passport');
const config = require('../config/database.js');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middlewares/check_auth.js')

router.get("/user/login", checkAuth, (req,res)=>{
    res.json({success: true, msg: "Successfully logged in!"})
})
router.post('/user/profile',checkAuth,(req,res)=>{
    User.findUser(req.body.email, (err, user)=>{
        if(err) res.send(err);
        else{
            return res.json({user: user})
        }
    })
})
//router.get('/user/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
//    return res.json({ user: req.user })
//})
router.get('/user/:username', (req, res) => {

    User.findUser(req.params.email, (err, data) => {
        if (err) return res.send(err);
        else return res.send(data);
    })
})
// Register request
router.post('/user/register', (req, res) => {
    User.findOne({ email: req.body.email }, (err, email) => {
        if (err) res.send(err)
        if (email) {
            return res.json({
                success: false,
                msg: "This email address is already associated with an account"
            })
        }
        else {
            bcrypt.hash(req.body.password, 10).then(hash => {
                const newuser = new User({
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    password: hash,
                    address: req.body.address,
                    email: req.body.email,
                    phone: req.body.phone,
                    birthday: req.body.birthday,
                    orders: [{title: "unknown", price: '80', description: 'unknown'}]
                });
                newuser.save().then(result => {
                    return res.json({
                        success: true,
                        msg: "User Created"
                    });
                })
                    .catch(err => {
                        return res.json({ error: err });
                    });
            })
        }
    })
})
// Authentiticate request
router.post('/user/authenticate', (req, res) => {
    User.findUser(req.body.email, (err, user) => {
        if (err) return res.send(err);
        if (!user) {
            return res.json({success: false, msg: "INVALID EMAIL" });
        }
        else {
            User.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ data: user }, config.secret, { expiresIn: "1h" });
                    return res.json({
                        msg: "Successfully Authenticated",
                        success: true,
                        expirationTime: 3600,
                        token:'Bearer '+ token,
                        user: {
                            lastname: user.lastname,
                            firstname: user.firstname,
                        }
                    });
                } else
                    return res.json({ success: false, msg: "INVALID PASSWORD" });
            });
        }
    });
});

module.exports = router;
