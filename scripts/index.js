$(function () {
    main.init();
});
var main = {
    init: function () {
        this.style();
        this.event();
        this.renderNext();
    },
    style: function () {
        $(".Brandsale li:nth-child(even)").css({"width": "110px"});
    },
    event: function () {
        //*************疯狂抢购*****************//
        //tab切换
        var tab = $(".tab li");
        var pages = $(".Panicbuying .pages>ul");
        tab.bind("click mouseover", function () {
            var $this = $(this);
            var index = $this.index();
            if (index == 2) {
                $this.addClass("active").siblings("li").removeClass("active");
                $this.css({"border-right": "none"});
            } else {
                $this.addClass("active").siblings("li").removeClass("active");
                $this.siblings("li").css({"border-right": "1px solid #dedede"});
            }
            pages.not(index).removeClass("active").eq(index).addClass("active");
        });
        //公告滚动
        scrollNews();
        function scrollNews() {
            var settime;
            $(".n-main").hover(function () {
                clearInterval(settime);
            }, function () {
                settime = setInterval(function () {
                    var $first = $(".n-main ul:first-child");     //选取div下的第一个ul 而不是li；
                    var height = $first.find("li:first-child").height();      //获取第一个li的高度，为ul向上移动做准备；
                    $first.animate({"marginTop": -height + "px"}, 600, function () {
                        $first.css({marginTop: 0}).find("li:first").appendTo($first); //设置上边距为零，为了下一次移动做准备
                    });
                }, 3000);
            }).trigger("mouseleave");       //trigger()方法的作用是触发被选元素的制定事件类型

        }

        //显示隐藏全部商品分类
        var arrow = $(".nav .ico-arrow");
        var list_l = $(".nav .list_l");
        arrow.click(function () {
            if (list_l.is(":visible")) {
                list_l.slideUp(400);
            } else {
                list_l.slideDown(400);
            }
        });
    },
    renderNext: function () {
        var that = this;
        that.showData("家用健康器械","healthapparatus");
        that.showData("保健品","healthproducts");
        that.showData("健康食品","healthfood");
        that.showData("复合养生套装","healthpackage");
    },
     showData:function(type,dom){
         //$(".loading").show();
         $.getJSON(
             "data/"+dom+".json",
             function (data) {
                 var dt=data.data;
                 var str="",str2="";
                 $.each(dt,function(key,value){
                     if(key<3){
                         if(key==1){
                             str+=" <li class='l2'><a href=''><img src='"+value.ImgUrl+"' alt=''/></a></li>";
                         }else{
                             str+="<li><div class='p-img'><a href=''><img src='"+value.ImgUrl+"' alt=''/></a></div>" +
                                 "<div class='p-info'><div class='p-name'><a href=''>"+value.Name+"</a></div>" +
                                 "<div class='p-price'>￥"+value.Price+"</div></div></li>";
                         }
                     }else{
                         if(key==1){
                             str2+=" <li class='l2'><a href=''><img src='"+value.ImgUrl+"' alt=''/></a></li>";
                         }else{
                             str2+="<li><div class='p-img'><a href=''><img src='"+value.ImgUrl+"' alt=''/></a></div>" +
                                 "<div class='p-info'><div class='p-name'><a href=''>"+value.Name+"</a></div>" +
                                 "<div class='p-price'>￥"+value.Price+"</div></div></li>";
                         }
                     }
                 });
                 $("."+dom+" .pr-list ul:first-child").append(str);
                 $("."+dom+" .pr-list ul:nth-child(2)").append(str2);
                 $("."+dom+" .loading").hide();
             });
     }
};
