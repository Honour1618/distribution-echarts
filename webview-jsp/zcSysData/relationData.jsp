<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/content/common/tag.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<title>关系图谱</title>
<link rel="shortcut icon" href="${ctx}/file/favicon.ico" type="image/x-icon" />
 <link rel="stylesheet" href="${ctx}/file/commonCss/sm.min.css">
 <link rel="stylesheet" href="${ctx}/file/commonCss/baseh5.css">
<link rel="stylesheet" href="${ctx}/file/proAreaData/css/relationshipChart.css">

</head>
<body style="font-size:62.5%">
<div class="page">
<!--         <header class="bar bar-nav">
            <a class="icon icon-left pull-left back" href="#page1" data-transition='slide-out'>
         
			 </a>
            <a class="button button-link button-nav pull-left close-btn" href="##" data-transition='slide-out'>
                	关闭
            </a>
            <h1 class="title">关系图谱</h1>
        </header> -->
        <div class="content">
        	<div class="main-box" >
				<div id="main"  class="themain"></div>
			</div>
        </div>
        <nav class="bar bar-tab">
		<div class="btnBox">
    		<a class="moreFans" onclick="gotoActivity('2');" href="javascript:window.open('FaS');"></a>
		</div>
</nav>
        
</div>
<script type="text/javascript" src="${ctx}/file/commonJs/jquery.min.js"></script>
<script src="${ctx}/file/helpData/js/echarts.min.js"></script>
<script type='text/javascript' src='${ctx}/file/commonJs/zepto.min.js' charset='utf-8'></script>
<script type='text/javascript' src='${ctx}/file/commonJs/sm.min.js' charset='utf-8'></script> 
<script type='text/javascript' src='${ctx}/file/proAreaData/js/relationshipChart.js'></script>
<script type="text/javascript">
 var webroot = "${ctx}";
 var userId="${userId}";
 console.log(userId);
 var url="PtlShow!getFrms.action";
 var Obj2=new DataSet();
 Obj2.type="gx";
 Obj2.contentHeightAuto();
 Obj2.initialiseChart(url,Obj2,userId);
 
</script>
</body>
</html>