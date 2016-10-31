function qmgy($scope){

}
function iscroll($scope){
	var img=document.getElementsByTagName('img');
	for(var i=0; i<img.length; i++){
		img[i].onload=function(){
			new IScroll("section",{
				click: true
			})
		}
	}
}
function one(){
	location.reload();
}
angular.module("myapp")
	.controller("qmgy",qmgy)
	.controller("iscroll",iscroll)
	.controller("one",one)