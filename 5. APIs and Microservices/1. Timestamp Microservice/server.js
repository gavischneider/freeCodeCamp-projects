// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Get request for the /date path
// dateVal is the first param
app.get('/api/timestamp/:dateVal', function(req, res){
  const dateVal = req.params.dateVal;
  
    //if date string is empty --> new Date()
    let date;
    if (!dateVal) {
        date = new Date();
    } else {
        // dateVal is not empty
        // Check if date is a number
        if (!isNaN(dateVal)) {
            date = new Date(parseInt(dateVal));
        } else {
            date = new Date(dateVal);
        }

    }
    //if date string is invalid
    if (date.toString() === 'Invalid Date') {
        res.send({ error: date.toString() })
    } else {
        res.send({ unix: date.getTime(), utc: date.toUTCString() });
    }
});

app.get('/api/timestamp/', function(req, res){
  let date = new Date();
  res.send({ unix: date.getTime(), utc: date.toUTCString() });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});