$(function(){
    var shoesData = [{name:"Nike", price:199.00 }, {name:"Loafers", price:59.00 }, {name:"Wing Tip", price:259.00 }];

    var items = null;

    //Get the HTML from the template   in the script tag
    var theTemplateScript = jQuery("#shoe-template").html(); 
    
   //Compile the template
    var theTemplate = Handlebars.compile (theTemplateScript); 
    $(".shoesNav").append (theTemplate(shoesData));
});

// A function to open a get XMLHttpRequest and retrive json data
function getJsonData(url, callback){
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", url, true);

    xhReq.onreadystatechange = function(){
    	if(xhReq.readyState ==4 && xhReq.status == 200){
	    var jsonObject = JSON.parse(xhReq.responseText);
	    callback.apply(xhReq);
	}
    };

    xhReq.send(null);
}

// Call getJsonData
window.addEventListener("load", getJsonData("http://api.wunderground.com/api/77e9aa2c2c07e232/hourly/q/SG/Singapore.json",
function(){
    // Parse json reponse text to json data object 
    var jsonData = JSON.parse(this.responseText);
    var weatherDataScript = jQuery("#weather-data").html(); 
    var weatherData = Handlebars.compile (weatherDataScript); 

    // Populate MyTable with jsonData
    $(".Mytable").append (weatherData(jsonData));
    
    // Populate line chart with jsonData
    loadLineChart(jsonData);
}));




function loadLineChart(jsonData){
    var data = {
	labels: [],
	datasets: [
	    {
		label: "Temperature, °C",
		fillColor: "rgba(220,220,220,0.2)",
		strokeColor: "rgba(151,187,205,1)",
		pointColor: "rgba(220,220,220,1)",
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: "rgba(220,220,220,1)",
		data: []
	    }
	]
    }

    // Populate data and labels with jsonData
    for (var i = 0; i < jsonData.hourly_forecast.length-15; i++) {
	// Populate time
	data.labels.push(jsonData.hourly_forecast[i].FCTTIME.civil);

	// Populate temperature
    	data.datasets[0].data.push(jsonData.hourly_forecast[i].temp.metric);
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

    // Display line chart when hourly forecast tab is selected
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	e.target // newly activated tab
      	var ctx = documentGetElement("myChart").getContext("2d");
    	var myLineChart = new Chart(ctx).LineAlt(data, {
	    scaleLabel: "          <%=value%>",
	    scaleLineColor: "rgba(0,0,0,1)",
	    scaleLineWidth: 2,
	    scaleOverride: true,
	    scaleSteps: 7,
	    scaleStartValue: 26,
	    scaleStepWidth: 1,
	    responsive: true,
	    animation: true,
	    showScale: true,
	    showTooltips: false
	});
    });

}

function documentGetElement(id){
    return document.getElementById(id);
}

