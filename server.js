const express = require('express');
const bodyParser = require('body-parser');
const keys = require('./server/config/keys.js');



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
