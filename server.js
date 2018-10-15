const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./server/config/keys.js');
var twilio = require('twilio');
const flights = require('./server/data/flights.js');
var request = require("request");
// require('./server/config/kairos.js');


// Configures Express server.
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Allows for html to be properly rendered
app.use(express.static(__dirname + '/client'));

// Creates variable for port configutation
const Port = process.env.PORT || 3000; //making port


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

// Route for TSA Checkin/ Faial Recognition
app.get('/tsa', (req,res) => res.sendFile(__dirname + '/client/tsaCheckin.html'));


// API.ai Chatbot integration.
app.get('/chatbot', (req, res) => res.sendFile(__dirname + '/client/chatbot.html'))


// The code belows pertains to the Twilio API
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



// TSA Wait time
// request({
// method: 'POST',
// url: 'https://apps.tsa.dhs.gov/MyTSAWebService/GetConfirmedWaitTimes.ashx?ap=MCO&output=json',
// }, function (error, response, body) {
// console.log('Status:', response.body);
// JSON.stringify(response.headers);
//
// });

// https://apps.tsa.dhs.gov/MyTSAWebService/GetConfirmedWaitTimes.ashx?ap=RDU&output=json
// https://apps.tsa.dhs.gov/MyTSAWebService/GetConfirmedWaitTimes.ashx?ap=DCA



// request("http://www.sitepoint.com", function(error, response, body) {
//   console.log(body);
// });


// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_");
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





// The Code below contains information related to Kairos Facial recognitiion and Blockchain

// Detects faces and returns demographics
app.get( '/enroll', (req,res) => {
  console.log(req.body);
request({
  method: 'POST',
  url: 'https://api.kairos.com/enroll',
  headers: {
    'Content-Type': 'application/json',
    'app_id': keys.kairos.app_id,
    'app_key': keys.kairos.app_key
  },
  body: "{  \"image\": \"https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/03/27/09/meghan-markle-27.03.18.jpg?w968\",  \"subject_id\": \"Elizabeth\",  \"gallery_name\": \"MyGallery\"}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  });
});

// Takes face and compares it to images in gallery
app.get('/verify', (req,res) => {
  request({
  method: 'POST',
  url: 'https://api.kairos.com/verify',
  headers: {
    'Content-Type': 'application/json',
    'app_id': keys.kairos.app_id,
    'app_key': keys.kairos.app_key
  },
  body: "{  \"image\": \"https://static.standard.co.uk/s3fs-public/thumbnails/image/2018/03/27/09/meghan-markle-27.03.18.jpg?w968\",  \"gallery_name\": \"MyGallery\",  \"subject_id\": \"Elizabeth\"}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  console.log(body.confidence);
  res.sendFile(__dirname + '/client/approvedFace.html');

  });
});


// Takes faces and matches them to faces in gallery
app.get('/recognize', (req,res) => {
  request({
  method: 'POST',
  url: 'https://private-anon-44c1b5179f-kairos.apiary-mock.com/recognize',
  headers: {
    'Content-Type': 'application/json',
    'app_id': keys.kairos.app_id,
    'app_key': keys.kairos.app_key
  },
  body: "{  \"image\": \"http://media.kairos.com/kairos-elizabeth.jpg\",  \"gallery_name\": \"MyGallery\"}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  });
});

// Takes photos and returns facial features
app.get('/detect', (req,res) => {
  request({
  method: 'POST',
  url: 'https://private-anon-44c1b5179f-kairos.apiary-mock.com/enroll',
  headers: {
    'Content-Type': 'application/json',
    'app_id': keys.kairos.app_id,
    'app_key': keys.kairos.app_key
  },
  body: "{  \"image\": \"http://media.kairos.com/kairos-elizabeth.jpg\",  \"subject_id\": \"Elizabeth\",  \"gallery_name\": \"MyGallery\"}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  });
});


// Lists all galleries I've created
app.get('/gallery/list_all', (req, res) => {
  request({
  method: 'POST',
  url: 'https://private-anon-44c1b5179f-kairos.apiary-mock.com/gallery/list_all',
  headers: {
    'app_id': keys.kairos.app_id,
    'app_key': keys.kairos.app_key
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
});
