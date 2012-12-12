jQuery(function($){
	var list_toggle = 0;
	
	$("#fileList").height($(window).height());
	$(".control_page").height($(window).height()-68);
	$(window).resize(function(){
		$("#fileList").height($(window).height());
		$(".control_page").height($(".main").height()-4);
	});
	$("a.fullscreen_toggle").click(function(){
		$("#header").animate({height: 'toggle'}, 200, 'swing');
	});
	$("a.header_togglelistview").click(function(){
		$("#fileList").animate({width: 'toggle'}, 200, 'swing');
		if(list_toggle == 1){ $("#wrap").css('margin', '0'); list_toggle = 0; }
		else {
			$("#wrap").css("margin", "0 0 0 220px");
			list_toggle = 1;
		}
	});
});