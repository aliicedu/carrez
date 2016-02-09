
var GETleboncoin= function(url){

var request = require('request');
var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var json = require('../carrez/leboncoin.json'); //load the schema
var app     = express();




request(url, function(error, response, body)
	{		
		if(!error)
		{
    var $ = cheerio.load(body); //load the body of the html code 

     json.properties.price = parseInt($("[itemprop='price']").text().replace(" ", ""));
     json.properties.zip = $("[itemprop='postalCode']").text();
     json.properties.city = $("[itemprop='addressLocality']").text();

	 var table_infos = $("[class='lbcParams criterias']>table >tr >td");

	 
	 json.properties.type = table_infos[0].children[0].data;
	 json.properties.rooms = table_infos[1].children[0].data;
	 json.properties.surface = parseInt(table_infos[2].children[0].data);
	  
	  //console.log(json.property.property_type);
	  fs.writeFile('output.json', JSON.stringify(json,null,4),function(err) {
	})
	  




}
} );

}

//var url = 'http://www.leboncoin.fr/ventes_immobilieres/866515268.htm?ca=12_s'; // bad deal

 var url = 'http://www.leboncoin.fr/ventes_immobilieres/922251926.htm?ca=12_s'; // good deal

GETleboncoin(url);

exports.GETleboncoin = GETleboncoin;