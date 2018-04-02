

var bodyWidth = 0;
var scaleNum = 0;
$(function(){
	
	bodyWidth = $("body").width();
    scaleNum = bodyWidth/600;
    noticeListObj(noticeArrObj);
	makeChinaMap(mapProjectsDataArr);
	$("#area_main option").eq(0).attr('selected',true);
	$("#dimension_main option").eq(0).attr('selected',true);
	setTimeout(function(){	
		makeDimensionCanvas(pieValDataArr , pieLabelsDataArr);
		
	} , 1000);

	
	$("#area_main select").change(function(){
		var thisVal = this.value;
		if( thisVal == "0" ){			
			$("#map_area_link").attr("data-type" , "0");	
		}
		else{
			$("#map_area_link").attr("data-type" , "1");
		}
		$.ajax({
		    type: "POST", //用POST方式传输 
		    dataType: "json", //数据格式:JSON
		    url: 'PtlTest!getRessAjax.action', //目标地址 
		    data: { "nosession": true,"compRang" : thisVal},//nosession 未登录ajax 请求有效
		    error: function (XMLHttpRequest, textStatus, errorThrown) { 
		    	alert(errorThrown);
		    },
		    success: function (msg){
		    	//console.log(msg);
		    	if( msg.result == 0){
		    		makeChinaMap(msg.valData);
			    	$("#area_main .project_num_span").html("项目总计：" + msg.numberTotal);
		    	}
			}
		});
		$("#map_area").show();
		$("#table_cvs").hide();
		$("#area_main .content_area").css({	
	    	height:scaleNum * 500
	    });
		
	});
	
	$("#dimension_main select").change(function(){
		var thisVal = this.value;
		$.ajax({
		    type: "POST", //用POST方式传输 
		    dataType: "json", //数据格式:JSON
		    url: 'PtlTest!getSelsAjax.action', //目标地址 
		    data: { "nosession": true,"sels" : thisVal},//nosession 未登录ajax 请求有效
		    error: function (XMLHttpRequest, textStatus, errorThrown) { 
		    	alert(errorThrown);
		    },
		    success: function (msg){
		    	//console.log(msg);
		    	pieValDataArr = [];
		    	pieLabelsDataArr = [];
		    	$.each(msg.lists , function(k , v){		    		
		    		pieValDataArr.push(parseInt(v.ext1));
		    		pieLabelsDataArr.push(v.fieldValChNm);
		    	});
		    	makeDimensionCanvas(pieValDataArr , pieLabelsDataArr);
			}
		});
	});
	
	//点击展开
	$(".more_area_btn").bind("click" , function(){
		var thisObj = $(this);
		if( thisObj.attr("data-type") == "0" ){
			$("#map_area_link").css({
				"height" : "auto"
			});
			thisObj.attr("data-type" , "1").html("点击收起");
		}
		else{
			
			$("#map_area_link").css({
				"height" : "60px"
			});
			thisObj.attr("data-type" , "0").html("点击展开");
		}
	});
});


//行业柱状图数据请求
function localBarDataObj(obj , localStr){
	$.ajax({
	    type: "POST", //用POST方式传输 
	    dataType: "json", //数据格式:JSON
	    url: 'PtlTest!getRessRangAjax.action', //目标地址 
	    data: { "nosession": true,"address" : localStr},//nosession 未登录ajax 请求有效
	    error: function (XMLHttpRequest, textStatus, errorThrown) { 
	    	alert(errorThrown);
	    },
	    success: function (msg){
	    	if( msg.result == 0 ){
		    	makeTableMap(msg.valRangData);
	    	}
	    
		}
	});
	
	
}
//某行业公司集合
function companyInfoDataObj(obj , str){
	var industryVal = $("#area_main select").val();
	window.location.href= webroot + "/PtlTest!search.action?address=" + str + "&industry=" + industryVal;
	/*
	$.ajax({
	    type: "POST", //用POST方式传输 
	    dataType: "json", //数据格式:JSON
	    url: 'PtlTest!getRessCompAjax.action', //目标地址 
	    data: { "nosession": true,"address" : str},//nosession 未登录ajax 请求有效
	    error: function (XMLHttpRequest, textStatus, errorThrown) { 
	    	alert(errorThrown);
	    },
	    success: function (msg){
	    	console.log(msg);
	    	if( msg.result == 0 ){
	    		
	    		var html = '<li class="second"><span class="compName_span"><strong>公司名</strong></span><span class="compTime_span"><strong>评测日期</strong></span></li>';
	    		$.each(msg.lists , function(k , v){
	    			if( k%2 == 0 ){
	    				html += '<li><a class="compName_span" href="'+ webroot +'/PtlTest!getCompSelsAjax.action?id='+ v.objId + '">'+ v.compName +'</a><span class="compTime_span">'+ v.crtTime +'</span></li>';	
	    			}
	    			else{
	    				html += '<li class="second"><a class="compName_span" href="'+ webroot +'/PtlTest!getCompSelsAjax.action?id='+ v.objId + '">'+ v.compName +'</a><span class="compTime_span">'+ v.crtTime +'</span></li>';
	    			}	
	    		});
	    		$("#companyInfo_list ul").html(html);
	    	}
		}
	});	*/
	//$("#companyInfo_list").show();
	//$("#map_area , #table_cvs").hide();
//	$("#area_main .content_area").css({	
	 //   height:"auto"
	//});
}

//中国地图生成
function makeChinaMap(mapData){
	
	//**********************************************中国地图绘制开始**********************************************************
	
	$("#map_area").html("");
	var R = Raphael("map_area", 600, 500);
	//调用绘制地图方法
    paintMap(R , mapData);
	var textAttr = {
        "fill": "#333",
        "font-size": "12px",
        "cursor": "pointer"
    };   
    for (var state in china) {
		china[state]['path'].color = Raphael.getColor(0.9);	
        (function (st, state) {
			//获取当前图形的中心坐标
        
            var xx = st.getBBox().x + (st.getBBox().width / 2);
            var yy = st.getBBox().y + (st.getBBox().height / 2);
			
            //***修改部分地图文字偏移坐标
            switch (china[state]['name']) {
                case "江苏":
                    xx += 5;
                    yy -= 10;
                    break;
                case "河北":
                    xx -= 10;
                    yy += 20;
                    break;
                case "天津":
                    xx += 10;
                    yy += 10;
                    break;
                case "上海":
                    xx += 10;
                    break;
                case "广东":
                    yy -= 10;
                    break;
                case "澳门":
                    yy += 10;
                    break;
                case "香港":
                    xx += 20;
                    yy += 5;
                    break;
                case "甘肃":
                    xx -= 40;
                    yy -= 30;
                    break;
                case "陕西":
                    xx += 5;
                    yy += 10;
                    break;
                case "内蒙古":
                    xx -= 15;
                    yy += 65;
                    break;
                default:
            }
			//写入文字

			china[state]['text'] = R.text(xx, yy, china[state]['name']).attr(textAttr);		
         })(china[state]['path'], state);
    }
	
    //地图定位
    
    $("#map_area").css({
    	"transform" : "scale("+ scaleNum +")",
    	"top" : (scaleNum -1) * 250,
    	"left" : (scaleNum -1) * 300
    });
    $("#area_main .content_area").css({	
    	height:scaleNum * 500
    });
    $("#dimension_main .content_area").css({	
    	height:bodyWidth
    });
    
    
  	//*****************************************中国地图绘制结束*****************************************************
}

//柱状表格生成
function makeTableMap(dataArr ){
	$("#table_cvs").remove();
	$("#area_main .content_area").append('<canvas id="table_cvs" style="display:none;"></canvas>');
	$("#map_area").hide();
	$("#table_cvs").show();
	var data = {
		labels: compRangStrArr,
		datasets: [
			{
				label: "",
				fillColor: "rgba(32,167,188,0.8)",
				strokeColor: "rgba(238,238,238,0.8)",		
				data: dataArr
			}
		]
	};
	var options = {
		//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
		scaleBeginAtZero : true,
		
		//Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,
		
		//String - Colour of the grid lines
		scaleGridLineColor : "rgba(0,0,0,.05)",
		
		//Number - Width of the grid lines
		scaleGridLineWidth : 1,
		
		//Boolean - Whether to show horizontal lines (except X axis)
		scaleShowHorizontalLines: true,
		
		//Boolean - Whether to show vertical lines (except Y axis)
		scaleShowVerticalLines: true,
		
		//Boolean - If there is a stroke on each bar
		barShowStroke : true,
		
		//Number - Pixel width of the bar stroke
		barStrokeWidth : 2,
		
		//Number - Spacing between each of the X value sets
		barValueSpacing : 5,
		
		//Number - Spacing between data sets within X values
		barDatasetSpacing : 1
	};
	var ctx = $("#table_cvs").get(0).getContext("2d");
	var myBarChart = new Chart(ctx).Bar(data, options);
}

//饼状图生成

function makeDimensionCanvas(pieValDataArr , pieLabelsDataArr){
	
	$("#dimension_main .content_area").html("");
	$("#dimension_main .content_area").html('<canvas id="dimension_cvs"></canvas>');
	var dataArr = [];
	var colorArr = ["#ea4d96", "#9dcd46" , "#3290de" , "#3290de" , "#3290de" , "#3290de" , "#3290de"];
	$.each(pieValDataArr , function(k , v){	
		dataArr[k] = {
			value:v,
			label:pieLabelsDataArr[k],
			color:colorArr[k],
			labelColor : 'white',
			labelFontSize : '12'
				
		};
		$("#dimension_ul li span").eq(k).css({
			"background" : colorArr[k]
			
		});
		$("#dimension_ul li a").eq(k).html(pieLabelsDataArr[k]+"(" + pieValDataArr[k]+")");
	});
	var options = {
		//Boolean - Whether we should show a stroke on each segment
		segmentShowStroke : true,
		
		//String - The colour of each segment stroke
		segmentStrokeColor : "#fff",
		
		//Number - The width of each segment stroke
		segmentStrokeWidth : 2,
		
		//Number - The percentage of the chart that we cut out of the middle
		percentageInnerCutout : 0, // This is 0 for Pie charts
		
		//Number - Amount of animation steps
		animationSteps : 100,
		
		//String - Animation easing effect
		animationEasing : "easeOutBounce",
		
		//Boolean - Whether we animate the rotation of the Doughnut
		animateRotate : true,
		
		//Boolean - Whether we animate scaling the Doughnut from the centre
		animateScale : false,
	//	tooltipEvents: [],
	//	showTooltips: true,
		onAnimationComplete: function() {
	//	    this.showTooltip(this.segments, true);
		    
		    $("#dimension_ul").show();
		},
		//tooltipTemplate: "<%= label %>（<%= value %>）"
		
	};
	var ctx = $("#dimension_cvs").get(0).getContext("2d");
	var myPieChart = new Chart(ctx).Pie(dataArr,options);
	        
}

//点击地区名称
function getRessRangAjax(obj , str){
	
//	var localStr = $(obj).attr("data-local");
	var linkType = $("#map_area_link").attr("data-type");
	if( linkType == "0" ){
		localBarDataObj(obj , str);	
	}
	else{
		companyInfoDataObj(obj , str);
	}
}

//公告函数
var noticeTimer = null;
var noticeAjaxTimer = null;
function noticeListObj(noticeArrObj){
	clearInterval(noticeTimer);
	clearInterval(noticeAjaxTimer);
	noticeTimer = setInterval(function(){
		$("#notice_bar ul").animate({"margin-top" : "-40px"} , 1000 , function(){
			for(var i=0; i<= 4 ; i++){
				if( i <= 3){
					//var newCName = $("#notice_bar ul li").eq(i+1).find(".compname").html();
					//var newUName = $("#notice_bar ul li").eq(i+1).find(".username").html();
					//var newTimer = $("#notice_bar ul li").eq(i+1).find(".timer").html();
					
				//	$("#notice_bar ul li").eq(i).find(".compname").html(newCName);
				//	$("#notice_bar ul li").eq(i).find(".username").html(newUName);
				//	$("#notice_bar ul li").eq(i).find(".timer").html(newTimer);
					var newStr =  $("#notice_bar ul li").eq(i+1).html();
					$("#notice_bar ul li").eq(i).html(newStr);
				}
				else{
					/*var newCName = $("#notice_bar ul li").eq(0).find(".compname").html();
					var newUName = $("#notice_bar ul li").eq(0).find(".username").html();
					var newTimer = $("#notice_bar ul li").eq(0).find(".timer").html();
					$("#notice_bar ul li").eq(4).find(".compname").html(newCName);
					$("#notice_bar ul li").eq(4).find(".username").html(newUName);
					$("#notice_bar ul li").eq(4).find(".timer").html(newTimer);	*/
					var newStr =  $("#notice_bar ul li").eq(0).html();
					$("#notice_bar ul li").eq(4).html(newStr);
					
				}	
			}
			$("#notice_bar ul").css({
				"margin-top" : "0"
			});
		});
		
	} , 5000);
	
	//公告定时请求机制
	noticeAjaxTimer = setInterval(function(){
		$.ajax({
		    type: "POST", //用POST方式传输 
		    dataType: "json", //数据格式:JSON
		    url: 'PtlTest!getTfAjax.action', //目标地址 
		    data: { "nosession": true},//nosession 未登录ajax 请求有效
		    error: function (XMLHttpRequest, textStatus, errorThrown) { 
		    	//alert(errorThrown);
		    },
		    success: function (msg){
		    	
				for(var i=0; i<= 4 ; i++){
					$("#notice_bar ul li").eq(i).find(".compname").html(msg.lists[i].compName);
					$("#notice_bar ul li").eq(i).find(".username").html(msg.lists[i].userName);
					$("#notice_bar ul li").eq(i).find(".timer").html(msg.lists[i].crtTimeStr);
				}
			}
		});
		
	} , 60000);
	
}

















