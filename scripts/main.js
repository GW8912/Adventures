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
    xhReq.open("GET", "http://api.openweathermap.org/data/2.5/forecast/daily?q=singapore&mode=json&units=metric&cnt=7");
    xhReq.addEventListener("readystatechange", function(){
	if(xhReq.readyState ==4 && xhReq.status == 200){
	    var jsonObject = JSON.parse(xhReq.responseText);

	    var data = {
		labels: [1, 2, 3, 4, 5, 6, 7],
		datasets: [
		    {
			label: "Temperature, °C",
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

	    var epochTime = 1460610000;
    
	    var localTime = new Date(0);
	    localTime.setUTCSeconds(epochTime);

	    for (i = 0; i < data.datasets[0].data.length; i++) {
		localTime = new Date(0);
		epochTime = jsonObject.list[i].dt; 	
		localTime.setUTCSeconds(epochTime);
		data.labels[i] = localTime.getUTCDate() + "/" + (localTime.getUTCMonth()+1);
    
    		data.datasets[0].data[i] =jsonObject.list[i].temp.max; // covert K to C

    	    }    

	    Chart.types.Line.extend({
		name: "LineAlt",
		draw: function () {
		    Chart.types.Line.prototype.draw.apply(this, arguments);

		    var ctx = this.chart.ctx;
		    ctx.save();
		    // text alignment and color
		    ctx.textAlign = "center";
		    ctx.textBaseline = "bottom";
		    ctx.fillStyle = this.options.scaleFontColor;
		    // position
		    var x = this.scale.xScalePaddingLeft * 0.4;
		    var y = this.chart.height / 2;
		    // change origin
		    ctx.translate(x, y)
		    // rotate text
		    ctx.rotate(-90 * Math.PI / 180);
		    ctx.fillText(this.datasets[0].label, 0, 0);
		    ctx.restore();
		}
	    });

    	    setTimeout(function(){
    		var ctx = document.getElementById("myChart").getContext("2d")
    		var myLineChart = new Chart(ctx).LineAlt(data, {
		    scaleLabel: "          <%=value%>"
		});
    	    }, 1500);

	}
    });
    xhReq.send();
    
})


function documentGetElement(id){
    return document.getElementById(id);
}

