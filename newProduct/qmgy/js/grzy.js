function change(){
	if($("#fq").css("left")=="0px"){
		$(".footer").hide()
	}else{
		$(".footer").show()
	}
}
$(".huodong").find("span").each(function(){
	$(this).on("tap",function(){
		var text=$(this).attr("id");
		$(".huodong").find("span").removeClass("on")
		$(this).addClass("on");
		$(text).css("left",0).siblings().css("left","100%");
		change()
	})
})