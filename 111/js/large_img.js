;(function(){

    for(var i=1;i<=total;i++){
        var m=ma;//5
        // if(i%4==0) m=0;
        var m=i%4==0?0:ma;
        imghtml+='<li style="width:'+imgw+'px;height:'+imgw+'px;background:red;margin-right:'+m+'px;margin-bottom:'+ma+'px" class=" animated flash "><canvas id="cvs'+i+'" width="'+imgw+'" height="'+imgw+'"></canvas></li>';
        //创建图片对象
        var img=new Image();
        //img.index=i;
        (function(n){
            img.onload=function(){
                //将图片回执到cavas中：
                //var cvs=$("#cvs"+this.index);
                var cvs=document.getElementById("cvs"+n)
                var cxt=cvs.getContext("2d");
                var w=this.width;
                var h=this.height;
                cvs.width=w;
                cvs.height=h;
                cxt.drawImage(this,0,0,w,h)

            }

        })(i)

        img.src="img/"+i+".jpg";
        $('#small').html(imghtml);

        //点击显示大图
        showimg();
    }
    //点击显示大图
    function showimg(){
        $("#small").on("click","li",function(){
            $("#big").show();
            var src=$(this).find("canvas").attr("id").substr(3);
            //console.log(src)

            change(src);
            changesize(src);

        })
        //点击大盒子显示小图
        $("#big").on("click",function(){
            $(this).hide();
        })

    }
    //左右滑动切换图片
    function change(src){
        $("#big").on({"swipeLeft":function(){
            //下一张
            var total=15;
            src++;
            //console.log(src)
            if(src>total)src=total;
            changesize(src);
            $("#bigimg").attr("src","img/"+src+".large.jpg")
                .addClass("animated bounceInRight ")
                .on("webkitAnimationEnd",function(){
                    $(this).removeClass("animated bounceInRight ");
                });

        },"swipeRight":function(){
            //前一张
            src--;
            if(src<1)src=1;
            changesize(src);
            $("#bigimg").attr("src","img/"+src+".large.jpg")
                .addClass("animated bounceInLeft")
                .on("webkitAnimationEnd",function(){
                    $(this).removeClass("animated bounceInLeft")
                });
        }})

    }
    function changesize(src){
        var bigimg=new Image();
        bigimg.onload=function(){
            $("#bigimg").attr("src","img/"+src+".large.jpg");
            var bigw=this.width;
            var bigh=this.height;
            if(bigw>bigh){
                $("#bigimg").css({
                    "width":"100%",
                    "height":"auto"
                })
            }else{
                $("#bigimg").css({
                    "width":"auto",
                    "height":"100%"
                })

            }


        }
        bigimg.src="img/"+src+".large.jpg";
    }

})(jQuery);