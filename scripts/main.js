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

$(function loadLineChart(){


    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=Singapore&units=metric");
    xhReq.addEventListener("readystatechange", function(){
	    if(xhReq.readyState ==4 && xhReq.status == 200){
		var jsonObject = JSON.parse(xhReq.responseText);

    var data = {
	labels: ["14:00", "17:00", "20:00", "23:00", "02:00", "05:00", "08:00"],
	datasets: [
	    {
		label: "Temperature",
		fillColor: "rgba(220,220,220,0.2)",
		strokeColor: "rgba(220,220,220,1)",
		pointColor: "rgba(220,220,220,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(220,220,220,1)",
		data: [1, 2, 3, 4, 5, 6, 7]
	    }
	]
    }

    for (i = 0; i < data.datasets[0].data.length; i++) { 
	data.datasets[0].data[i] =jsonObject.list[i].main.temp; // covert K to C

    }    

		setTimeout(function(){
		    var ctx = document.getElementById("myChart").getContext("2d")
		    var myLineChart = new Chart(ctx).Line(data);
		}, 1500);

	}
    });
    xhReq.send();
    


})


function documentGetElement(id){
    return document.getElementById(id);
}

