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

// connect backend to the homepage
app.get('/', (req, res) => res.sendFile(__dirname+'/client/index.html'));

// connect backend to checkin page
app.get('/checkin', (req, res) => res.sendFile(__dirname+'/client/checkin.html'));

//connect backend to payment
app.get('/navigate', (req, res) => res.sendFile(__dirname+'/client/navigate.html'));
