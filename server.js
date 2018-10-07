const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./server/config/keys.js');
var twilio = require('twilio');
const flights = require('./server/data/flights.js');
var request = require("request");



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
app.get('/navigate', (req, res) => res.sendFile(__dirname+'/client/checkin.html'));

//connect backend to payment
app.get('/travel', (req, res) => res.sendFile(__dirname+'/client/travel.html'));

// Route for Payment page
app.get('/payment', (req,res) => res.sendFile(__dirname + '/client/payment.html'));

const accountSid = keys.twilio.accountSid;
const authToken = keys.twilio.authToken;
const client = require('twilio')(accountSid, authToken);

app.get('/message', (req,res) => {
  client.messages
    .create({
       body: 'Hey, you need to leave now to make your flight.',
       from: '+18508054624',
       to: '+13865069094'
     })
    .then(message => console.log(message.sid))
    .done();

});




// request("http://www.sitepoint.com", function(error, response, body) {
//   console.log(body);
// });


// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
app.post( '/pay', (req,res) => {

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
const token = req.body.stripeToken; // Using Express

const charge = stripe.charges.create({
  amount: 3000,
  currency: 'usd',
  description: 'Luggage Checkin',
  source: token,
});
res.sendFile(__dirname + '/client/index.html');
});
