// This file is to add Kaios API which would allow for facial recognition
// and also includes blockchain verification which can be used for TSA checkIn.

var request = require("request");


// Detects faces and returns demographics
app.get( '/enroll', (req,res) => {
request({
  method: 'POST',
  url: 'https://private-anon-44c1b5179f-kairos.apiary-mock.com/enroll',
  headers: {
    'Content-Type': 'application/json',
    'app_id': '4985f625',
    'app_key': 'aa9e5d2ec3b00306b2d9588c3a25d68e'
  },
  body: "{  \"image\": \"http://media.kairos.com/kairos-elizabeth.jpg\",  \"subject_id\": \"Elizabeth\",  \"gallery_name\": \"MyGallery\"}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});

});
