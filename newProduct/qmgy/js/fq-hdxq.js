$(".green").each(function(){
	$(this).on("tap",function(){
		var text=$(this).text();
		if(text=="显示备注"){
			$(this).text("隐藏备注");
			$(this).parent().next().show();
		}else{
			$(this).text("显示备注");
			$(this).parent().next().hide();
		}
	})
})