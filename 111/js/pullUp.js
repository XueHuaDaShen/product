;(function($){
    var currentpage = 1;//当前页
    //获取首页的值
    var obj=window.localStorage.obj;
    var objs=JSON.parse(obj);
    var title=objs.title;//名字
    var id=objs.id;//id  //点击获取的id

    new Drop("details",{
        load:function(that){
            setTimeout(function(){
                $(".u_box").css("height",0).on("webkitTransitionEnd",function(){
                    $(this).remove();
                    that.isHave=false;
                    $.get("http://www.yxg2.com/api/workpost/list.do?page.currentPage="+currentpage+"&questionsComment.questionId="+id,function(data){
                        var e=JSON.parse(data).workposts;
                        var totalPageSize=JSON.parse(data).page.totalPageSize;//总的页数
                        currentpage++;
                        //如果当前页页数大于总的页数,那么当前页=总的页数,否则=当前页
                        currentpage=currentpage>totalPageSize?totalPageSize : currentpage;
                        loadPage(e);
                    })
                });
            },1000);

        }
    });
    function loadPage(e){//加载数据
        var imgstr_temp='<li><img src="http://www.yxg2.com{img}" alt=""/></li>';
        var getstr="";
        for(var l=0;l<e.length;l++){
            var content=JSON.parse(e[l].content);
            var imgstr="";
            for(var k=0;k<content.images.length;k++){
                imgstr+=imgstr_temp.replace("{img}",content.images[k]);
            }

            //console.log(content);

            getstr +='<div class="stu_box">'
                +'<div class="stu_portrait">'
                + '<img src="../img/1.jpg" alt="">'
                + '</div>'
                + '<h3>' + e[l].showName + '<em>' + e[l].modelTime + '</em></h3>'
                + '<div class="stu_title">'
                + '<h4>' + content.text + '</h4>'
                + '<div class="up_img" id="up_img">'
                + '<ul>'
                + imgstr
                + '</ul>'
                + '</div>'
                + '</div>'
                + '<div class="stu_info">'
                + '<ul>'
                + '<li class="list1"><a href="javascript:;"><img src="../img/f2.png" alt=""><span>' + e[l].questionsStatus + '</span></a></li>'
                + '<li class="list2"><a href="javascript:;"><img src="../img/p2.png" alt=""><span>' + e[l].replyCount + '</span></a></li>'
                + '<li class="list3"><a href="javascript:;"><img src="../img/z2.png" alt=""><span>' + e[l].praiseCount + '</span></a></li>'
                + '</ul>'
                +'</div>'
                + '</div>';


        }
        $(".student").append(getstr);
        var length=$(".stu_box").length;
        $(".Count").html(length);
        details.refresh();
    }
})(jQuery);