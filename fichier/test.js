var request = require('request');
var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var json2 = require('../carrez/meilleursagents'); //load the schema

request(url, function (error, response, body) {
  if (!error) {
 
    var $ = cheerio.load(body); //load the body of the html code 

	var price2 = data.properties.price / data.properties.area,
		location = data.properties.location.city.toLowerCase()+'-'+data.properties.location.zip,
		url = "https://www.meilleursagents.com/prix-immobilier/"+location+"/#estimates";
	
	var env = require('jsdom').env;
	env(url, function (errors, window) {
		var $ = require('jquery')(window);

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

		var ret_data = {
				type: data.property.type,
				city: data.property.location.city,
				zip: data.property.location.postal_code,
				price2: price2,
				good_deal: (price2 < prices[1]),
				reference_price: {
					lowest: prices[0],
					average: prices[1],
					highest: prices[2]
				}
			};


			 fs.writeFile('output3.json', JSON.stringify(json2,null,4),function(err) {
	})
			}
 
  } else {
    console.log("We’ve encountered an error: " + error);
}

});