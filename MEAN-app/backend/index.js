const express = require('express');
const app = express();                           //set up express app
const config = require('./config/database.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');            //connect to database
const morgan = require('morgan');                //for displaying the request
const passport = require('passport');            //for user anthentication
var cors = require('cors')                       //for the front-end to connect to the server

//connect mongoose
mongoose.connect(config.database,{useCreateIndex: true, useNewUrlParser: true }, (err)=>{
    if(err){
        console.log('ERROR WHEN CONNECTING: ' + err)
          }
    else {
        console.log('you are connected to the Mongoose database server')
         }
});
mongoose.Promise= global.Promise;
app.use(morgan('dev'));                          //morgan middleware 'for displaying the requests'
app.use(cors());                                 //cors middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));                     //bodypaser middleware

app.use(passport.initialize());
require('./config/passport')(passport);
app.use(express.static(__dirname + '/public'));

app.use('/api', require('./routes/userapi'));   //Initialize routes
app.use('/api', require('./routes/product-api'));     //Initialize routes
app.use('/uploads',express.static('uploads'));

//listening for requests
//const PORT = process.env.PORT || 3000 ;
//app.listen(process.env.PORT ||3000, () => console.log(`Server started on PORT ${PORT}`));
module.exports = app;
