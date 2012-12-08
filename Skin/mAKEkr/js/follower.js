$(document).ready(function(){
    $(window).scroll(function() {
        var position = $(window).scrollTop(); // 현재 스크롤바의 위치값을 반환합니다.
        if(position>33){
            $("#breadcrumbs").addClass("fixed");
			$(".makekr_controlbox").addClass("fixed");
        }else{
            $("#breadcrumbs").removeClass("fixed");
			$(".makekr_controlbox").removeClass("fixed");
        }
    });
});