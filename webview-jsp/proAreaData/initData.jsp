<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/content/common/tag.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<title>全国项目分布系统——入口</title>
<link rel="shortcut icon" href="${ctx}/file/favicon.ico" type="image/x-icon" />

</head>
<body style="margin:0px;">
<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<div id="wrap_main" style="background: url(${ctx}/file/proAreaData/images/proDisSys.png) 0 0 no-repeat;background-size: cover;">
	<div id="main" style="background: url(${ctx}/file/proAreaData/images/proDisSysLine.png) 0 0 no-repeat;background-size: cover;"></div>
	<div id="centerCap" style="background:url(${ctx}/file/proAreaData/images/centerCap.png) 0 0 no-repeat;background-size:cover;position:absolute;top: 0;"></div>
</div>

</body>
<script type="text/javascript" src="${ctx}/file/commonJs/jquery.min.js"></script>
<!-- 引入 echarts.js -->
<script src="${ctx}/file/helpData/js/echarts.js"></script>
<script src="${ctx}/file/helpData/js/china.js"></script>
<script type="text/javascript">
var webroot = "${ctx}";
$(function(){
	$("#wrap_main,#main,#centerCap").css({
		width:$(window).width(),
		height:parseInt($(window).width() * 9)/16
	});
	
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));

	// 指定图表的配置项和数据
	var geoCoordMap = {
	    '上海': [121.4648,31.2891],
	    '哈尔滨': [127.9688,45.368],
	    '长春': [125.8154,44.2584],
	    '沈阳': [123.1238,42.1216],
	    '北京': [116.4551,40.2539],
	    '天津': [117.4219,39.4189],
	    '石家庄': [114.4995,38.1006],
	    '济南': [117.1582,36.8701],
	    '太原': [112.3352,37.9413],
	    '郑州': [113.4668,34.6234],
	    '南京': [118.8062,31.9208],
	    '合肥': [117.29,32.0581],
	    '武汉': [114.3896,30.6628],
	    '杭州': [119.5313,29.8773],
	    '南昌': [116.0046,28.6633],
	    '长沙': [113.0823,28.2568],
	    '福州': [119.4543,25.9222],
	    '广州': [113.5107,23.2196],
	    '南宁': [108.479,23.1152],
	    '海口': [110.3893,19.8516],
	    '呼和浩特': [111.4124,40.4901],
	    '乌鲁木齐': [87.9236,43.5883],
	    '西安': [109.1162,34.2004],
	    '银川': [106.3586,38.1775],
	    '兰州': [103.5901,36.3043],
	    '西宁': [101.4038,36.8207],
	    '拉萨': [91.1865,30.1465],
	    '成都': [103.9526,30.7617],
	    '昆明': [102.9199,25.4663],
	    '贵阳': [106.6992,26.7682],
	    '重庆': [107.7539,30.1904]
	};

	var SHData = [
	    [{name:'上海'},{name:'哈尔滨',value:80}],
	    //[{name:'上海'},{name:'长春',value:90}],
	    [{name:'上海'},{name:'沈阳',value:80}],
	    [{name:'上海'},{name:'北京',value:70}],
	    [{name:'上海'},{name:'天津',value:60}],
	    //[{name:'上海'},{name:'石家庄',value:50}],
	    [{name:'上海'},{name:'济南',value:40}],
	    [{name:'上海'},{name:'太原',value:30}],
	    //[{name:'上海'},{name:'郑州',value:20}],
	    //[{name:'上海'},{name:'南京',value:20}],
	    //[{name:'上海'},{name:'合肥',value:30}],
	    [{name:'上海'},{name:'武汉',value:29}],
	    [{name:'上海'},{name:'杭州',value:30}],
	    [{name:'上海'},{name:'南昌',value:30}],
	    [{name:'上海'},{name:'长沙',value:10}],
	    //[{name:'上海'},{name:'福州',value:40}],
	    [{name:'上海'},{name:'广州',value:30}],
	    [{name:'上海'},{name:'南宁',value:20}],
	    [{name:'上海'},{name:'郑州',value:20}],
	    [{name:'上海'},{name:'海口',value:60}],
	    [{name:'上海'},{name:'呼和浩特',value:10}],
	    [{name:'上海'},{name:'乌鲁木齐',value:10}],
	    [{name:'上海'},{name:'西安',value:20}],
	    [{name:'上海'},{name:'银川',value:20}],
	    [{name:'上海'},{name:'兰州',value:30}],
	    [{name:'上海'},{name:'西宁',value:30}],
	    [{name:'上海'},{name:'拉萨',value:30}],
	    [{name:'上海'},{name:'成都',value:20}],
	    [{name:'上海'},{name:'昆明',value:30}]
	    //[{name:'上海'},{name:'贵阳',value:20}],
	    //[{name:'上海'},{name:'重庆',value:10}]
	];

	//var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

	var convertData = function (data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var dataItem = data[i];
	        var fromCoord = geoCoordMap[dataItem[0].name];
	        var toCoord = geoCoordMap[dataItem[1].name];
	        if (fromCoord && toCoord) {
	            res.push({
	                fromName: dataItem[0].name,
	                toName: dataItem[1].name,
	                coords: [fromCoord, toCoord]
	            });
	        }
	    }
	    return res;
	};

	var series = [];
	[ ['上海', SHData]].forEach(function (item, i) {
	    series.push({
	        type: 'lines',
	        zlevel: 1,
	        effect: {
	            show: true,
	            period: 6,
	            trailLength: 0.7,
	            color: 'rgba(255,255,255,0.5)',
	            symbolSize: 3
	        },
	        lineStyle: {
	            normal: {
	                color: 'rgba(255,255,255,0.8)',
	                width: 0,
	                curveness: 0.2
	            }
	        },
	        data: convertData(item[1])
	    },
	    {
	        type: 'lines',
	        zlevel: 2,
	        symbol: 'circle',//image://'+ webroot +'/file/proAreaData/images/starCenter.png
	        symbolSize: 3,
	        effect: {
	            show: true,
	            period: 3,
	            trailLength: 0,
	            symbol: 'circle',
	            symbolSize: 0
	        },
	        lineStyle: {
	            normal: {
	                color: 'rgba(255,255,255,0.8)',
	                width: 1,
	                opacity: 0.6,
	                curveness: 0.2
	            },
	            
	        },
	        data: convertData(item[1])
	    },
	    {
	        type: 'effectScatter',
	        coordinateSystem: 'geo',
	        zlevel: 2,
	        rippleEffect: {
	            brushType: 'stroke'
	        },
	        label: {
	            normal: {
	                show: false,
	                position: 'right',
	                formatter: '{b}'
	            }
	        },
	        symbolSize: function (val) {
	            return val[2] / 20;
	        },
	        itemStyle: {
	            normal: {
	                color: '#fff'
	            }
	        },
	        data: item[1].map(function (dataItem) {
	            return {
	                name: dataItem[1].name,
	                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
	            };
	        })
	    });
	});

	option = {
	    backgroundColor: '${ctx}/file/proAreaData/images/proDisSys.png',
	    title : {
	        text: '爱就投全国辐射图',
	        //subtext: '数据纯属虚构',
	        left: 'left',
	        padding: [10, 12],
	        textStyle : {
	        	fontSize:12,
	            color: 'rgba(255,255,255,0.5)'
	        }
	    },
	    tooltip : {
	        trigger: 'item'
	    },
	    legend: {
	        orient: 'vertical',
	        top: 'bottom',
	        left: 'right',
	        data:'上海 Top10',
	        textStyle: {
	            color: '#fff'
	        },
	        selectedMode: 'single'
	    },
	    geo: {
	        map: 'china',
	        label: {
	            emphasis: {
	                show: false
	            }
	        },
	        //roam: true,
	        itemStyle: {
	            normal: {
	            	borderWidth:2,
	            	label: {
	                    show: false
	                },
	                areaColor: 'rgba(255,255,255,0)',
	                borderColor: '#5c95d3'//1c4a9f
	            },
	            emphasis: {
	                areaColor: 'rgba(14,44,107,0.5)',
	                borderColor: '#b7d6f8'
	            }
	        }
	    },
	    series: series
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	//加上这一句即可
	//window.onresize = myChart.resize();
	/* window.addEventListener("resize",function(){

	    myChart.resize();

	}); */
	
	
});


</script>
</html>