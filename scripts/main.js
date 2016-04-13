$(function(){
    var shoesData = [{name:"Nike", price:199.00 }, {name:"Loafers", price:59.00 }, {name:"Wing Tip", price:259.00 }];

    var items = null;

    //Get the HTML from the template   in the script tag
    var theTemplateScript = jQuery("#shoe-template").html(); 
    
   //Compile the template
    var theTemplate = Handlebars.compile (theTemplateScript); 
    $(".shoesNav").append (theTemplate(shoesData));
});

$(function(){
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Singapore");
    xhReq.addEventListener("readystatechange", function(){
	if(xhReq.readyState ==4 && xhReq.status == 200){
	    var jsonObject = JSON.parse(xhReq.responseText);
	    jsonObject["main"].temp = Math.round(jsonObject["main"].temp-273) // covert K to C
	    var weatherDataScript = jQuery("#weather-data").html(); 
	    var weatherData = Handlebars.compile (weatherDataScript); 
	    $(".weather").append (weatherData(jsonObject));

	}
    });
    xhReq.send();
})

function documentGetElement(id){
    return document.getElementById(id);
}

