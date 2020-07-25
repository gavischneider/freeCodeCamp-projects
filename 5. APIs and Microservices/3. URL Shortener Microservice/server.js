'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var shortUrl = require('node-url-shortener');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Shorten URL API endpoint
app.get("/api/shorturl/new/:url", function(req, res){
  const urlToShorten = req.param.url;
  let shortenedUrl;
  
  // Shorten URL - via the node-url-shortener package
  shortUrl.short(urlToShorten, function(err, url){
    console.log(url);
    shortenedUrl = url;
});
  
  res.json({original_url: urlToShorten, short_url: shortenedUrl});
})


app.listen(port, function () {
  console.log('Node.js listening ...');
});