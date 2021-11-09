
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const basicRoutes = require('./routes/basicRoutes');
const port = 3000;


// express app
const app = express();

// connect to database
// const dbURI = 'mongodb://localhost:27017/Url_shortner'
const dbURI = 'mongodb+srv://deepak_121:deepak_121@cluster0.z7bhc.mongodb.net/Url-shortner?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=>{

        //listen over requests
        app.listen(process.env.PORT  || port, ()=>{
            console.log('Listening to port '+ port);
        });
    })
    .catch(err => {console.log(err)});


// registered view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// public
app.use(express.static('public'));

// middle-ware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));


// basic routes
app.use('/', basicRoutes);


// default route
app.use((req, res)=>{
    res.status(404).render('basic/404', { title: '404' , stylesheet: "/css/index.css"});
});