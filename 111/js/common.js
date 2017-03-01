var BaseUrl="http://192.168.1.15:8080";
BaseUrl="";

function goDownload(){
	location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.hsd.yixiuge";	
} 
function getSmallImageUrl(url){
	//url="http://a.app.qq.com/o/simple.jsp?pkgname=com.hsd.yixiuge.jpeg";
	var url1=url.substr(url.lastIndexOf('.'));
	var url2=url.substr(0,url.lastIndexOf('.')); 
	return url2+"_small"+url1;
} 

_VGET=function(K){localStorage.getItem(K)};
_VSET=function(K,V){localStorage.getItem(K,V)};
_VDEL=function(K){localStorage.remove(K)};