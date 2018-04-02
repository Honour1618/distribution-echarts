/*
 * 
 * 公司五力详细信息
 * 
 * */

$(function(){
	
	radarDataObj(chartNameArr , chartDataArr);

	$(".more_area_btn").bind("click" , function(){
		var thisObj = $(this);
		if( thisObj.attr("data-type") == "0" ){
			$(".content_div").css({"height" : "auto"});
			thisObj.attr("data-type" , "1").html("点击收起");
		}
		else{
			
			$(".content_div").css({"height" : "0"});
			thisObj.attr("data-type" , "0").html("点击展开详细测评结果");
		}
	});
	
});


function radarDataObj(chartNameArr , chartDataArr){
	
	
	var data = {
            labels: chartNameArr,
            datasets: [
            {
	            label: "",
	            fillColor: "rgba(214,249,254,0.5)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#dcdcdc",
	            pointHighlightFill: "#dcdcdc",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: chartDataArr
            },
            {
                label: "default",
                fillColor: "rgba(247,62,25,0)",
                strokeColor: "rgba(247,62,25,0)",
                pointColor: "rgba(247,62,25,0)",
                pointStrokeColor: "rgba(247,62,25,0)",
                pointHighlightFill: "rgba(247,62,25,0)",
                pointHighlightStroke: "rgba(247,62,25,0)",
                data: [1, 1, 1, 1, 1]
             }]
        };
		var options = {
            //Boolean - Whether to show lines for each scale point
            scaleShowLine : true,
            showTooltips:false,
            //Boolean - Whether we show the angle lines out of the radar
            angleShowLineOut : true,

            //Boolean - Whether to show labels on the scale
            scaleShowLabels : false,

            // Boolean - Whether the scale should begin at zero
            scaleBeginAtZero : true,

            //String - Colour of the angle line
            angleLineColor : "rgba(238,238,238,1)",
            scaleLineColor:"rgba(238,238,238,1)",

            //Number - Pixel width of the angle line
            angleLineWidth : 1,

            //String - Point label font declaration
            pointLabelFontFamily : "'Arial'",

            //String - Point label font weight
            pointLabelFontStyle : "normal",

            //Number - Point label font size in pixels
            pointLabelFontSize : 16,

            //String - Point label font colour
            pointLabelFontColor : "#333333",

            //Boolean - Whether to show a dot for each point
            pointDot : true,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 3,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

            }

		var ctx = document.getElementById("myChart").getContext("2d");		
		var myRadarChart = new Chart(ctx).Radar(data, options);
	
	
}