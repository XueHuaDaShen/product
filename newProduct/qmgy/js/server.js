$(".single").find("b").each(function(){
	$(this).on("tap",function(){
		$(this).addClass("on").siblings("b").removeClass("on")
	})
})