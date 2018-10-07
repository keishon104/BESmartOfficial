const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./server/config/keys.js');
var twilio = require('twilio');




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

const accountSid = keys.twilio.accountSid;
const authToken = keys.twilio.authToken;
const client = require('twilio')(accountSid, authToken);

app.get('/message', (req,res) => {
  client.messages
    .create({
       body: 'Hey, you need to go to the airport!',
       from: '+18508054624',
       to: '+13865069094'
     })
    .then(message => console.log(message.sid))
    .done();

});
