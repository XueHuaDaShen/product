function Drop(wrapper,opt){
	//获取首页的值
	var obj = window.localStorage.obj;
    var objs = JSON.parse(obj);
    var title = objs.title;//名字
    var id = objs.id;//id  //点击获取的id
    var totalPageSize;
    $.ajaxSetup({  
	    async : false  
	}); 
    $.get("http://www.yxg2.com/api/workpost/list.do?page.currentPage=1&questionsComment.questionId="+id,function(data){
        totalPageSize = JSON.parse(data).page.totalPageSize;
    });
	var _default={
		currentpage: 1,
		totalPageSize: totalPageSize,
		up:{
			u_box:$("<div class='u_box'></div>"),
			u_sf:"<p>释放刷新</p>",
			u_loading:"<p class='loading'>正在刷新中......</p>"
		},
		load:null
	}
	this.isHave=false;
	this.wrapper=typeof wrapper==="string"?document.getElementById(wrapper):wrapper;
	for(var i in opt){
		_default[i]=opt[i]
	}
	this.settings=_default;
	this.bindEvent();
}
Drop.prototype={
	bindEvent:function(){
		var that=this,
			WinH=this.wrapper.offsetHeight,
			conH=this.wrapper.children[0].offsetHeight,
			u_box=this.settings.up.u_box,
			u_loading=this.settings.up.u_loading,
			u_sf=this.settings.up.u_sf;
		function sFn(e){
			e.touches=e.touches||e.originalEventTouches;
			that.startY=e.touches[0].clientY;
			that.sTop=that.wrapper.scrollTop;
		}
		function mFn(e){
			e.touches=e.touches||e.originalEventTouches;
			that.offsetY=e.touches[0].clientY-that.startY;
			if(that.offsetY<0){
				//向上
				that.direction="up";
			}
			var abs=Math.abs(that.offsetY),h,html;
			//满足三个条件 向下刷新 
			//1、上拉 2、滚动条距离为0 3、refresh 存在
			var hh=conH-WinH;
			if(that.direction=="up"&&that.sTop>=hh&&that.settings.load){//满足向上拉
				//判断有没有添加过容器 如果没有添加则添加 添加了就不添加
				if(!that.isHave){
					u_box.appendTo(that.wrapper);					
				}if(abs>50 && abs<100){
					h=50+(abs-50)*0.5;
					html=u_sf;
				}else{
					h=100+(abs-100)*0.2;
					html=u_sf;
				}
				u_box.css("height",h+"px").css("-webkit-transition","none");
				u_box.html(html);
				that.isHave=true;
			}

		}
		function eFn(){
			//console.log(that.settings.totalPageSize)总页数
			if(!that.isHave) return false;
			if(that.direction=="up"){
				var box=u_box,
					loading=u_loading;
				if( that.settings.load ){
					if( that.settings.currentpage < that.settings.totalPageSize+1 ){
						that.settings.load(that)
						that.settings.currentpage++;
					}
				}
			}
			box.css({"transition":"height .5s","height":"50px"}).html(loading);
		}
		this.wrapper.addEventListener("touchstart",sFn,false);
		this.wrapper.addEventListener("touchmove",mFn,false);
		this.wrapper.addEventListener("touchend",eFn,false);
	}
}