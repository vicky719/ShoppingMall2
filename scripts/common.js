
var new_element=null;
new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","scripts/placeholder.js");
document.body.appendChild(new_element);

$(function(){
 mains.init();
});
var mains={
    init:function(){
        this.event();
    },
    event:function(){
        //右侧边栏
        //登陆悬浮层
        var nvlogin=$(".nav-login,.tlogin");
        var lylogin=$(".login-layer");
        var checkbox=$(".login-box .checkbox>i");
        var ckx=$(".ckbox");
        //显示
        nvlogin.click(function(){
            lylogin.show();
        });
        //关闭
        $(".ico-fork").click(function(){
            lylogin.hide();
        });
        //自动登录勾选
        function showckbox(){
            if(ckx.val()=="0"){
                checkbox.append("<i></i>");
                ckx.val("1");
            }else{
                checkbox.find("i").remove();
                ckx.val("0");
            }
        }
        checkbox.click(function(){
            showckbox();
        });
        //显示购物车
        var nav_r=$(".nav-r");
        var nr_car=$(".nav-r .nav-car");
        var nr_main=$(".nr-main");
        nr_car.click(function(e){
            e.stopPropagation();
            var that=$(this);
            var isShow=nr_main.attr("isShow");
            if(isShow=="false"){
                nav_r.animate({'right':'270px'},400);
                nr_main.attr("isShow","true");
                that.addClass("active");
            }
            if(isShow=="true"){
                closeCar(that);
            }
        });
        //关闭购物车
        $(".nr-main .close").click(function(){
            closeCar(nr_car);
        });
        function closeCar(dom){
            dom.removeClass("active");
            nav_r.animate({'right':'0px'},400);
            nr_main.attr("isShow","false")
        }
        $("body:not(.nav-car)").click(function(){
            var isShow=nr_main.attr("isShow");
            if(isShow=="true"){
                closeCar(nr_car);
            }
        });
        //回到顶点
        $(".nav-top").click(function(){
            $(window).scrollTop(0);
        });
        }
};