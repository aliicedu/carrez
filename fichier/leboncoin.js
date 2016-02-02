var request = require('request');
var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var json = require('../carrez/leboncoin'); //load the schema
var url = 'http://www.leboncoin.fr/ventes_immobilieres/918673134.htm?ca=12_s';

request(url, function (error, response, body) {
  if (!error) {

    var $ = cheerio.load(body); //load the body of the html code 

json.properties.price = $("[itemprop='price']").text();
     json.properties.zip = $("[itemprop='postalCode']").text();
     

	 var table_infos = $("[class='lbcParams criterias']>table >tr >td");

	 json.properties.properties_type = table_infos[0].children[0].data;
	 json.properties.rooms = table_infos[1].children[0].data;
	 json.properties.surface = table_infos[2].children[0].data;
	  
	  //console.log(json.property.property_type);
	  fs.writeFile('output.json', JSON.stringify(json,null,4),function(err) {
	})
	  
      
  } else {
    console.log("We’ve encountered an error: " + error);
}
});