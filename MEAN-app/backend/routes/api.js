const express = require('express');
const Car = require('../modules/car');
const Router = express.Router();

Router.get('/car', (req, res,next)=>{
    Car.getCarByTitle('PMW', (err, car)=>{
        if(err) res.send(err);
        else res.send(car);
    })
});

Router.post('/car', (req, res, next)=>{
    var newcar = new Car({
        password: req.body.password,
        title: req.body.title,
        model: req.body.model,
        year: req.body.year,
        available: req.body.available
    });
    Car.addCar(newcar, (err, car)=>{
    if(err) res.json({err:true, msg: "failed to create user"})
    else res.json({err:false, msg: "user was created"})
      })
   });

Router.put('/car/:id', (req, res,next)=>{
    Car.findByIdAndUpdate({_id: req.params.id}, req.body).then((car)=>res.send(car));
});

Router.delete('/car/:id', (req, res,next)=>{
    Car.findByIdAndRemove({_id: req.params.id}).then((car)=>res.send(car));
});

module.exports = Router;
