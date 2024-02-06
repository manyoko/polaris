const express = require("express");
const app = express();
const port = 3005;
const orderRoutes = require('./routes/orderRoutes');

// middleware to parse JSON in requet body
app.use(express.json());

// use order routes middleware
app.use('/api', orderRoutes);

// asimple route
app.get('/', (req, res) => {
    res.send("welcome to POLARIS PHARMACEUTICALS ORDERING AND DELIVERY API")
})



// start the server

app.listen(port, () => {
    console.log(`the server is running at port ${port}`)
})