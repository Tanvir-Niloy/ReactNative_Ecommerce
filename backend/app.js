const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const colors = require('colors')
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');



app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'native-fullecommerce'
})
.then(()=>{
    console.log('Database Connection is ready...'.cyan.underline.bold)
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(5000, ()=>{

    console.log('server is running http://localhost:5000'.yellow.underline.bold);
})