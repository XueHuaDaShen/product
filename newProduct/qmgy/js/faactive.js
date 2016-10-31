function faactive(){
	$(".double").find("b").each(function(){
		$(this).on("tap",function(){
			if($(this).attr("class")=="on"){
				$(this).removeClass("on")
			}else{
				$(this).addClass("on")
			}
		})
	})
	$(".single").find("b").each(function(){
		$(this).on("tap",function(){
			$(this).addClass("on").siblings("b").removeClass("on")
		})
	})
}
faactive();