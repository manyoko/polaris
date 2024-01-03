const express = require("express");
const app = express();
const port = 3005;
const orderRoutes = require('./routes/orderRoutes');
const productsRoute  = require('./routes/productsRoute');
const customersRoute  = require('./routes/customerRoutes');
const vehicleRoute = require('./routes/addVehicle');
const mongoose = require('mongoose');
const vehicleRouter = require("./routes/addVehicle");
const userRoute = require('./routes/userRoutes');

const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);


// mongoose.connect('mongodb://localhost/', { useNewUrlParser: true, useUnifiedTopology: true}) <== instead of localhost:27017 use 127.0.0.1:27017
mongoose.connect('mongodb://127.0.0.1:27017/polaris', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to mongodb!'))
const db = mongoose.connection;

//check Mongodb connection
db.once('open', () => {
    console.log('once again checking for local mongoDB connection')
})


const store = new MongoStore({
  uri: 'mongodb://127.0.0.1:27017/polaris',
 collection: 'sessions'
})

app.use(session({
  secret: 'a93f8aeb866edc2f068923b176658e6bceb02576958905c091a8cce8650f8d876285ee',
  resave: false,
  //saveUniinitialized: false,
  store: store,
  expires: 30*60*1000, //30 minutes,
  secure: false // set true for production
  

}))

// middleware to parse JSON in requet body
app.use(express.json());

// use order routes middleware
app.use('/api/orders/', orderRoutes);
app.use('/api/products/', productsRoute)
app.use('/api/customers/', customersRoute)
app.use('/api/vehicles/', vehicleRoute)
app.use('/api/users/', userRoute)



// asimple route
app.get('/', (req, res) => {
    res.send("welcome to POLARIS PHARMACEUTICALS ORDERING AND DELIVERY API")
})

app.listen(port, () => {
   console.log(`listening at port ${port}`)
})