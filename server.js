const express = require('express');
const bodyParser = require('body-parser');
//const keys = require('./server/config/keys.js');



// Configures Express server.
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Allows for html to be properly rendered
app.use(express.static(__dirname + '/client'));

// Creates variable for port configutation
const Port = 3000



app.listen(Port, () => {
  console.log("Your server is now running on Port: " + Port + "." );
});

app.get('/', (req, res) => res.sendFile(__dirname+'/client/index.html'));// connect backend to the homepage
app.get('/checkin', (req, res) => res.sendFile(__dirname+'/client/checkin.html'));// connect backend to checkin page
//app.get('/payment', (req, res) => res.sendFile(__dirname+'/client/payment.html'));//connect backend to payment
