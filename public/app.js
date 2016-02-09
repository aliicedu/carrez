var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var JSONleboncoin = require('./output');
var JSONmeilleuragents =  require('./output2');

var ma = require('./meilleuragents');
var lbc = require('./leboncoin');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/server', function(req, res){

//res.render('./views/mainpage');

app.use(express.static(__dirname + '/public'));
res.sendFile( __dirname  + '/index.html');
  //__dirname : It will resolve the project folder.



}) ;

app.post('/server', function(req, res) {

var url = req.param("url"); 
		
	console.log(url);	

 var deal = ma.GETmeilleuragents();
 console.log(deal);
 if(deal  == true){
 res.sendFile( __dirname  + '/good.html');
 }
 
 if(deal  == false){
 res.sendFile( __dirname  + '/bad.html');
 }
 
});


app.listen('8080')
console.log('Server launch at port : 8080');




