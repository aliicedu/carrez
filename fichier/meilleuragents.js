var request = require('request');
var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var json = require('../carrez/meilleursagents'); //load the schema
var data = require('./output');

var location = data.properties.city.toLowerCase()+'-'+data.properties.zip;
var url = 'https://www.meilleursagents.com/prix-immobilier/'+location+'/#estimates';
//var url = 'https://www.meilleursagents.com/prix-immobilier/nanterre-92000/#estimates'; 

request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body); //load the body of the html code

    var price2 = data.properties.price / data.properties.surface;
 



		var prices = $('.small-4.medium-2.columns').map(function () {
			return Number($(this).text().match(/[0-9,]/g).join("").replace(",", "."));
		}).slice(3);


		if (data.properties.type == "Appartement") {
			prices = prices.slice(0, 3);
			
		}
		else if (data.properties.type == "Maison") {
			prices = prices.slice(3, 6);
		}
		else {
			prices = prices.slice(6);

		}
		



if(price2<prices[1]){
	json.properties.good_deal = 'yes';
}

else if (price2>prices[1]){
	json.properties.good_deal = 'no';
}

else if (price2=prices[1]){
	json.properties.good_deal = 'yes';
}




json.properties.type = data.properties.type;
json.properties.rooms = data.properties.rooms;
json.properties.surface = data.properties.surface;
json.properties.price_m2 = price2;
json.properties.city = data.properties.city;
json.properties.zip = data.properties.zip;
json.properties.average = prices[1];




fs.writeFile('output2.json', JSON.stringify(json,null,4),function(err) {
	})	
  } 
	else {
    console.log("We’ve encountered an error: " + error);
}
});