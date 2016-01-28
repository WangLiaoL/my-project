$(".tab-tip li").on("mouseover",function(){
    var $index=$(this).index();
    $(this).addClass("select").siblings().removeClass("select");
    $(this).parents(".mt").next(".mc").children(".tab_r").children().removeClass("show-tab_r").eq($index).addClass("show-tab_r");
});
