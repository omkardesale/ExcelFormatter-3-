
var txt, title, subTitle, unit;
function myFunction(graphType){
	document.getElementById('barContainer').style.display = 'none';
	//document.getElementById('placeholderDiv').style.display = 'none';
	txt = $("#text").val();
	title = $("#title").val();
	subTitle = $("#subTitle").val();
	unit = $("#unit").val();
	
		// Get form
	var form = $('#fileUploadForm')[0];

	// Create an FormData object 
	var data = new FormData(form);
	
	
	$("#container").show();
	
	$.ajax({
		url: "http://localhost:8070/graphData", 
		type: "POST",
		enctype: 'multipart/form-data',
		data: data,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 600000,
		success: function(result) {
			result = JSON.parse(result);
			Highcharts.chart('container', {
				chart: {
					type: graphType
				},
				title: {
					text: title
				},
				subtitle: {
					text: subTitle
				},
				xAxis: {
					categories: result.categories,
					crosshair: true
				},
				yAxis: {
					min: 0,
					title: {
						text: txt
					}
				},
				tooltip: {
					headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y:.1f} ' + unit + '</b></td></tr>',
					footerFormat: '</table>',
					shared: true,
					useHTML: true
				},
				
				// plotOptions: {
				// 	series: {
				// 		stacking: 'normal'
				// 	}
				// },
				series: result.seriesData
			})
		}
	});
}

function dynamicGraphFunction(){
	txt = $("#text").val();
	title = $("#title").val();
	subTitle = $("#subTitle").val();
	unit = $("#unit").val();
	
	 // Get form
	var form = $('#fileUploadForm')[0];

	// Create an FormData object 
	var data = new FormData(form);
	
	
	$("#container").show();
	
	$.ajax({
		url: "http://localhost:8070/graphData", 
		type: "POST",
		enctype: 'multipart/form-data',
		data: data,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 600000,
		success: function(result) {
			result = JSON.parse(result);
			 let addedTime = 0;
			 let i = 0;

			function requestData(chart) {
			var series = chart.series[0],
				shift = series.data.length > 10;
			chart.series[0].addPoint({
				x: new Date(result.categories[i]).getTime() + addedTime,
				y: parseInt(result.seriesData[0].data[i])
			}, true, shift);
			addedTime += 1000;
			i++;
			}

			$(document).ready(function() {
			var chart = new Highcharts.Chart({
				chart: {
				renderTo: 'container',
				animation: Highcharts.svg,
				defaultSeriesType: 'line',
				events: {
					load: function() {
					setInterval(function() {
						requestData(chart)
					}, 1000);
					}
				}
				},
				title: {
				text: title
				},
				xAxis: {
				type: 'datetime',
				tickPixelInterval: 150,
				maxZoom: 20 * 1000
				},
				yAxis: {
				minPadding: 0.2,
				maxPadding: 0.2,
				title: {
					text: 'Value',
					margin: 80
				}
				},
				series: [{
				name: subTitle,
				data: []
				}]
			});
			});
		}
	});
}

function dynamicBarFunction(){

	txt = $("#text").val();
	title = $("#title").val();
	subTitle = $("#subTitle").val();
	unit = $("#unit").val();
	
	 // Get form
	var form = $('#fileUploadForm')[0];

	// Create an FormData object 
	var data = new FormData(form);
	
	
	$("#barContainer").show();

	$.ajax({
		url: "http://localhost:8070/graphData", 
		type: "POST",
		enctype: 'multipart/form-data',
		data: data,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 600000,
		success: function(){
			var chart = new CanvasJS.Chart("barContainer", {
				
				axisY: {
					title: "Temperature (°C)",
					suffix: " °C"
				},
				data: [{
					type: "column",	
					yValueFormatString: "#,### °C",
					indexLabel: "{y}",
					dataPoints: result.seriesData
				}]
			});
			
			function updateChart() {
				var boilerColor, deltaY, yVal;
				var dps = chart.options.data[0].dataPoints;
				for (var i = 0; i < dps.length; i++) {
					deltaY = Math.round(2 + Math.random() *(-2-2));
					yVal = deltaY + dps[i].y > 0 ? dps[i].y + deltaY : 0;
					boilerColor = yVal > 200 ? "#FF2500" : yVal >= 170 ? "#FF6000" : yVal < 170 ? "#4CAF50 " : null;
					dps[i] = {label: "Boiler "+(i+1) , y: yVal, color: boilerColor};
				}
				chart.options.data[0].dataPoints = dps; 
				chart.render();
			};
			updateChart();
			
			setInterval(function() {updateChart()}, 500);
			
		}
	})
}

function getData(){
	document.getElementById('dataPlaceholder').style.display = "none";
	txt = $("#text").val();
	title = $("#title").val();
	subTitle = $("#subTitle").val();
	unit = $("#unit").val();
	
		// Get form
	var form = $('#fileUploadForm')[0];

	// Create an FormData object 
	var data = new FormData(form);
	
	
	$("#container").show();
	
	$.ajax({
		url: "http://localhost:8070/graphData", 
		type: "POST",
		enctype: 'multipart/form-data',
		data: data,
		processData: false,
		contentType: false,
		cache: false,
		timeout: 600000,
		success: function(result) {
			result = JSON.parse(result);
			console.log(result);
			console.log(result.categories);
			console.log(result.seriesData[0].data[0]);
			console.log(result.seriesData.length);
			console.log(result.seriesData)
			console.log(result.seriesData[0].data.length);

			var matrix = [];
			for(var i=0; i<result.seriesData.length; i++) {
				matrix[i] = [];
				for(var j=0; j<result.seriesData[i].data.length; j++) {
					matrix[i][j] = result.seriesData[i].data[j];
				}
			}

			var newMatrix = [];
			for(var i = 0; i < matrix.length; i++){
				for(var j = 0; j < matrix[i].length; j++){
					newMatrix[j]=[];
					for(var k = 0; k < matrix.length; k++){
						newMatrix[j][k] = matrix[k][j];
					}
				}
			}
			console.log("new Matrix");
			console.log(newMatrix);
			console.log(newMatrix[0].length);

			var inputDataTable=$("<table/>").attr("id","mytable");
			$("#tableDiv").append(inputDataTable);

			$("#mytable").append("tr"+"<th>"+result.seriesFirstName+"</th>"+"</tr>")

			for(i = 0; i <  result.seriesData.length; i++){
				var rowHeading =  "";
				completeRowOne = rowHeading + "<th>" + result.seriesData[i].name + "</th>";
				$("#mytable").append(completeRowOne);
			}

			for(i = 0; i < newMatrix.length;i++){
				var tr = "<tr>";
				var td = "";
				for(j = 0; j < newMatrix[i].length; j++){
					categoriesRow = "<td>" + result.categories[i] + "</td>";
					td = td + "<td>" + newMatrix[i][j] + "</td>";
				}
				completeRowTwo = tr + categoriesRow + td ; 
				$("#mytable").append(completeRowTwo);
				$("#mytable").append("</tr>");
			}
			console.log($('#tableDiv'));
		}
	});
}

function inputFileName(){
	alert("input");
	var input = document.getElementById( 'file-upload' );
	var infoArea = document.getElementById( 'file-upload-filename' );

	input.addEventListener( 'change', showFileName );

	function showFileName( event ) {
	var input = event.srcElement;
	var fileName = input.files[0].name;
	infoArea.textContent = 'File name: ' + fileName;
	}
}

