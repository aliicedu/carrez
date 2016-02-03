var request = require('request');
var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var json = require('../carrez/leboncoin'); //load the schema
var url = 'http://www.leboncoin.fr/ventes_immobilieres/919297729.htm?ca=12_s';

request(url, function (error, response, body) {
  if (!error) {

    var $ = cheerio.load(body); //load the body of the html code 

     json.properties.price = parseInt($("[itemprop='price']").text().replace(" ", ""));
     json.properties.zip = $("[itemprop='postalCode']").text();
     json.properties.city = $("[itemprop='addressLocality']").text();

	 var table_infos = $("[class='lbcParams criterias']>table >tr >td");

	 
	 json.properties.type = table_infos[1].children[0].data;
	 json.properties.rooms = table_infos[2].children[0].data;
	 json.properties.surface = parseInt(table_infos[3].children[0].data);
	  
	  //console.log(json.property.property_type);
	  fs.writeFile('output.json', JSON.stringify(json,null,4),function(err) {
	})
	  
      
  } else {
    console.log("We’ve encountered an error: " + error);
}
});