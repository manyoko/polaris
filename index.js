const express = require("express");
const app = express();
const port = 3005;
const orderRoutes = require('./routes/orderRoutes');
const productsRoutes  = require('./routes/productsRoute');
const customersRoute  = require('./routes/customerRoutes');
const vehicleRoute = require('./routes/addVehicle');
const mongoose = require('mongoose');
const vehicleRouter = require("./routes/addVehicle");
const userRoute = require('./routes/userRoutes');
require('dotenv').config();
const exphbs = require("express-handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { credentials } = require('./config');
const Handlebars = require('handlebars');
const authMiddleware = require("./controll/userAuth");


app.use(cookieParser(credentials.cookieSecret))

// setting a folder axpress has to look for static files
app.use(express.static(__dirname + '/static')) 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// view configuration
app.set("view engine", "hbs")
app.engine("hbs", exphbs.engine({  handlebars: allowInsecurePrototypeAccess(Handlebars), defaultLayout: 'index', extname : "hbs",layoutsDir: __dirname + "/views" ,partialsDir: __dirname + "/views/partials"}));


// setting the view folder
app.set("views", path.join(__dirname, "views"))



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
  secret: credentials.cookieSecret,
  resave: false,
  //saveUniinitialized: false,
  store: store,
  expires: 30*60*1000, //30 minutes,
  secure: false // set true for production
  

 }))




 app.get('/', (req, res) => {
  res.render("main");
   
})
// use order routes middleware

app.use('/general', require('./routes/generalRoutes'))

app.use('/api/orders/', orderRoutes)
app.use('/products', authMiddleware, productsRoutes)
app.use('/api/customers/', customersRoute)
app.use('/api/vehicles/', vehicleRoute)
app.use('/users/', userRoute)



// asimple route


app.get('/', (req, res) => {
  res.cookie('monster', 'nom nom');
  res.cookie('signed_monster', 'nom nom', { signed: true, httpOnly : true })
  
  res.render("main")
})


app.listen(port, () => {
   console.log(`listening at port ${port}`)
})