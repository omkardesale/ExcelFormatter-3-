
var txt, title, subTitle, unit;
function myFunction(graphType){
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
				
				/*plotOptions: {
					series: {
						stacking: 'normal'
					}
				},*/
				series: result.seriesData
			})
		}
	});
}