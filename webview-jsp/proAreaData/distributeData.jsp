<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/content/common/tag.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<title>壮苗项目全国分布系统</title>
<link rel="shortcut icon" href="${ctx}/file/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" href="${ctx}/file/commonCss/sm.min.css">
<link rel="stylesheet" href="${ctx}/file/commonCss/baseh5.css">
<link rel="stylesheet" href="${ctx}/file/proAreaData/css/proAreaData.css">
<script type='text/javascript' src='${ctx}/file/commonJs/zepto.min.js' charset='utf-8'></script>
<script type='text/javascript' src='${ctx}/file/commonJs/sm.min.js' charset='utf-8'></script>
</head>
<body>
	<div class="page-group">
		<div class="page page-current" id='home_page'>
			<!-- <header class="bar bar-nav">
				<h1 class='title'>壮苗项目省份排行榜</h1>
			</header> -->
			<div class="content" id="prjDistribute" style="background:url(${ctx}/file/proAreaData/images/distribute_bg.jpg) 0 0 no-repeat;background-size:cover;"></div>
	        <!-- 添加 class infinite-scroll 和 data-distance  向下无限滚动可不加infinite-scroll-bottom类，这里加上是为了和下面的向上无限滚动区分-->
	        <div class="content infinite-scroll infinite-scroll-bottom" data-distance="100">
				<!-- <div class="content" id="prjProvince"></div>横向柱状图一 -->
	            <div class="list-block">
	                <ul class="content" id="prjProvince">
						<c:forEach var="addr" items="${prjNumList }" varStatus = "status">
							<li class="address_specific">
								<a href="#rate_project_idea" class="address_link">
									<span class="address_name">${addr.address }</span>
									<div class="address_progress address_progress${status.count }">
										<i></i>
									</div>
									<span class="address_num">
										${addr.cnt }家
									</span>
									<img src="${ctx}/file/proAreaData/images/prj_classify.png" class="direction_icon"/>
								</a>
							</li>
							<script type="text/javascript">
								var addrNum = "${addr.cnt }";
								var top1 = "${top1}";
								var percent = addrNum * 100 /top1 ;
								var count = "${status.count }";
								var progressNum = 'address_progress'+ count;
								if(percent >= 100){
									percent = 100;
								}
								$("."+progressNum).find("i").css({width:percent+"%"});
							</script>
						</c:forEach>
			  	   </ul>
	          </div>
	          <!-- 加载提示符 -->
	          <div class="infinite-scroll-preloader">
	              <div class="preloader"></div>
	          </div>
	      </div>
		</div>
		 		
		<div class="page" id='rate_project_idea'>
			<div class="pro_desc">
				<h2>地区行业分布</h2>
				<select id="pickerArea" onchange="checkCircleArea();">
					<option value="">全国</option>
					<c:forEach var="addr" items="${provinceList }" varStatus="status">
						<option value="${addr}">${addr}</option>
					</c:forEach>
				</select>
				<img src="${ctx}/file/proAreaData/images/downTrangle.png" class="downTrangle" />
			</div>
			<div class="content" id="prjAreaDis"></div>
			<div class="pro_finance">
				<h2>融资阶段分布</h2>
				<select id="pickerFinance" onchange="checkBarArea();">
					<option value="">全部行业</option>
        			<c:forEach var="prj" items="${indList }" varStatus="status">
        				<option value="${prj.fieldVal}">${prj.fieldValChNm}</option>
        			</c:forEach>
        		</select>
        		<img src="${ctx}/file/proAreaData/images/downTrangle.png" class="downTrangle" />
			</div>
			<div class="content" id="prjFinanceDis"></div>
			<div id="finStage"></div>
		</div>
		<div class="page" id='specific_project_idea'>
			<div class="buttons-tab prj_sum">
				<a class="tab-link prj_arlready_sum active button" href="#specific_pro_idea">已发起项目</a>
				<a class="tab-link prj_other_sum button" href="#other_project_idea">其他项目</a>
			</div>
			<div class="content">
				<div class="content-block">
					<div class="tabs">
						<div id="specific_pro_idea" class="tab active">
					        <div class="content-block">
					        	<div id="morePrj"></div>
					        </div>
					    </div>
					    <div id="other_project_idea" class="tab">
					        <div class="content-block">
					          <div id="otherPrj"></div>
					        </div>
					    </div>
				    </div>
				</div>
			</div>
			<div class="common_mask"></div>
	   		<div class="loadingPic"></div>
	   		<!-- 页面警示框 -->
			<div class="alertShow">
				<span></span>
			</div>
		</div>
		<!-- <div class="page" id='other_project_idea'>
			<div class="prj_sum">
				<a class="prj_arlready_sum" href="#specific_project_idea">已发起项目</a>
				<a class="prj_other_sum prj_current" href="#other_project_idea">其他项目</a>
			</div>
			<div class="common_mask"></div>
	   		<div class="loadingPic"></div>
		</div> -->
	</div>

<script type='text/javascript' src="${ctx}/file/helpData/js/echarts.js"></script>
<script type='text/javascript' src="${ctx}/file/helpData/js/china.js"></script>
<script type='text/javascript' src="${ctx}/file/proAreaData/build/dist/echarts.js"></script>
<script type="text/javascript" src="${ctx}/file/proAreaData/js/proAreaData.js?ver=1.0"></script>
<script type='text/javascript'>
	var webroot = "${ctx}";
	var finStageListArr =[];
	var finStageArr =[];
	<c:forEach  var="fname" items="${finStageList}" varStatus="status">
	finStageListArr.push('${fname.fieldValChNm}');
	finStageArr.push('${fname.fieldVal}');
	</c:forEach>
//	console.log('${finStageList}');
</script>
</body>
</html>