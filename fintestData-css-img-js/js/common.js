

$(function(){
	var localUrl = window.location.href;
	wechatConfig(shareTitle , shareDesc_s , localUrl.split("#")[0]);
});

//分享引导
function shareFriend(){
	$("#share_mask").fadeIn(500);
	$("#share_mask").bind("click" , function(){
		$(this).fadeOut(500);
	});
}
//wechat share
function wechatConfig(shareTitle , shareDesc , link){
	var dataForWeixin={
		appId:	shareAppId,//"wx52222341d8f2e13f"
		imgUrl: link.split("/Ptl")[0] + "/file/fintest/img/share_ico.png",
		link:	link,
		title:	shareTitle,
		desc:	shareDesc
	};
	
	var jsapi_a = "jsapi_ticket="+ shareTicket +"&noncestr="+ shareNonceStr +"&timestamp="+ shareTimestamp +"&url="+window.location.href;
	var signature = hex_sha1(jsapi_a);
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: shareAppId, // 必填，公众号的唯一标识
	    timestamp:shareTimestamp, // 必填，生成签名的时间戳 
	    nonceStr: shareNonceStr, // 必填，生成签名的随机串 
	    signature: signature,// 必填，签名，见附录1
	    jsApiList: [
	        'checkJsApi',
	        'onMenuShareTimeline',
	        'onMenuShareAppMessage',
	        'onMenuShareQQ',
	        'onMenuShareWeibo'
	    ]
	});
	wx.ready(function () {
		wx.onMenuShareAppMessage(dataForWeixin);
		wx.onMenuShareTimeline(dataForWeixin);
		wx.onMenuShareQQ(dataForWeixin);
		wx.onMenuShareWeibo(dataForWeixin);
	});
	wx.error(function(res){
	    //config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		//alert(res);
	});

}
