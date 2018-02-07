
//线上
var rootUrl = 'https://dee.tutulive.tv:8446/api/v1/man';
var serverUrl = 'http://api.tutulive.tv/api/v2.3';


//阿里云
// var rootUrl = 'http://123.56.6.6:8018/api/v1/man';
// var serverUrl = 'http://123.56.6.6:3000/api/v2.3';


var u = navigator.userAgent,
    app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var down_url = isiOS ? 'https://appsto.re/th/mpbFfb.i' : 'https://play.google.com/store/apps/details?id=com.nice.tutulive&hl=zh-CN';

var rankUrl = "http://www.tutulive.tv/quizranking/index.html";

var url = location.search.split("?")[1];
var urlArr = url.split("&");

var obj={};
for(var i in urlArr){
    var v = urlArr[i].split("=");
    obj[v[0]]=v[1];
}
// alert(obj.loginid)

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
} 

//千分 数值
function toThousands(num) {
　　var re=/\d{1,3}(?=(\d{3})+$)/g;
　　var n1=(num || 0).toString().replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
　　return n1;
}

//分享
function shareFollow() {
    // alert("follow");
    var query_data = {
    	action:'share',
		platforms: ['FACEBOOK', 'GOOGLE', 'TWITTER', 'LINE'],
		content: 'I\'m playing QuizHunter in Tutu Live!',
        url: 'http://www.tutulive.tv/million/th/invite.html?loginid='+obj.loginid,
        // url: 'http://www.deelive.tv/million/th/invite.html?loginid='+obj.loginid,
        title: 'Come and win cash prize for getting answers right!',
        link: "http://i1.live.aisoqu.com/qh_share_logo_1116.png"
    };
    // query_data.loginid = loginid;
    if (window.webkit == null) {
        window.JSBridge.invoke('share', JSON.stringify(query_data));
        window.JSBridge.invoke('user_profile', JSON.stringify(query_data));
    } else {
        window.webkit.messageHandlers.JSBridge.postMessage(['invoke', 'share', JSON.stringify(query_data)]);
    }
}

function refresh(){
    location.reload();
}

//进入直播间
function inliveingroom(liveid, url) {
    //alert("in live room");
    var query_data = {};
    query_data.liveid = liveid;
    query_data.url = url;
    if (window.webkit == null) {
        window.JSBridge.invoke('live', JSON.stringify(query_data));
    } else {
        window.webkit.messageHandlers.JSBridge.postMessage(['invoke', 'live', JSON.stringify(query_data)]);
    }
}

//提现
function withdraw(withdraw) {
    // alert("in live room");
    var query_data = {};
    query_data.withdraw = withdraw;
    query_data.min = 500;
    query_data.max = 100000;
    if (window.webkit == null) {
        window.JSBridge.invoke('withdraw', JSON.stringify(query_data));
    } else {
        window.webkit.messageHandlers.JSBridge.postMessage(['invoke', 'withdraw', JSON.stringify(query_data)]);
    }
}