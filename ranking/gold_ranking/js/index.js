;(function($){
    function init(){
        var user_w = $(".user").width();
        var user2_w = $(".user2").width();
        var win_w = $(document).width();
        $(".user").css("height", user_w+"px");
        $(".user2").css("height", user2_w+"px");
        $(".list li").css("height", win_w*.2+"px");
        $(".list1").css("margin-top",-win_w*.2+"px");
        $(".list2").css("margin-top",-win_w*.2+"px");
    }
    init()

    var url1 = 'https://dee.tutulive.tv:8446/api/v1/man/activity/union/list?month=2017-04&taskid=123cdbc48e08eaf00b06507e&flag=diamond&page=1&size=999';
    var url2 = 'https://dee.tutulive.tv:8446/api/v1/man/activity/union/list?month=2017-04&taskid=123cdbc48e08eaf00b06507e&page=1&size=999';
    var url3 = 'https://dee.tutulive.tv:8446/api/v1/man/activity/rank/list?month=2017-04&taskid=123cdbc48e08eaf00b06507e&flag=consume&page=1&size=8';
    
    var page = 1;
    var size = 999;
    var flag = 'first';

    

    $(".user").on("click",function(){
        var loginid = $(this).find("img").attr("data-loginid");
        if(loginid){
            follow(loginid);
        }
        
    })

    $(".head1").on("click",function(){
        $('.head1').attr('src', 'img/head1checked.png');
        $('.head2').attr('src', 'img/head2check.png');
        $(".week").hide()
        req1()
    })

    $(".head2").on("click",function(){
        $('.head1').attr('src', 'img/head1check.png');
        $('.head2').attr('src', 'img/head2checked.png');
        $(".week").show();
        req2(flag)
    })
    req1()
    req3()

    $(".first").on("click",function(){
        var _time = new Date();
        if (_time*1 > (new Date('2017/04/02 23:59:59'))*1){
            $(".first").find("img").eq(0).attr("src", "img/week1ed.png");
            $(".second").find("img").eq(0).attr("src", "img/week2.png");
            $(".third").find("img").eq(0).attr("src", "img/week3.png");
            $(".fouth").find("img").eq(0).attr("src", "img/week4.png");
            req2('first')
        }
        
    })
    $(".second").on("click",function(){
        var _time = new Date();
        if (_time*1 > (new Date('2017/04/09 23:59:59'))*1){
            $(".first").find("img").eq(0).attr("src", "img/week1.png");
            $(".second").find("img").eq(0).attr("src", "img/week2ed.png");
            $(".third").find("img").eq(0).attr("src", "img/week3.png");
            $(".fouth").find("img").eq(0).attr("src", "img/week4.png");
            req2('second')
        }
    })
    $(".third").on("click",function(){
        var _time = new Date();
        if (_time*1 > (new Date('2017/04/16 23:59:59'))*1){
            $(".first").find("img").eq(0).attr("src", "img/week1.png");
            $(".second").find("img").eq(0).attr("src", "img/week2.png");
            $(".third").find("img").eq(0).attr("src", "img/week3ed.png");
            $(".fouth").find("img").eq(0).attr("src", "img/week4.png");
            req2('third')
        }
    })
    $(".fouth").on("click",function(){
        var _time = new Date();
        if (_time*1 > (new Date('2017/04/23 23:59:59'))*1){
            $(".first").find("img").eq(0).attr("src", "img/week1.png");
            $(".second").find("img").eq(0).attr("src", "img/week2.png");
            $(".third").find("img").eq(0).attr("src", "img/week3.png");
            $(".fouth").find("img").eq(0).attr("src", "img/week4ed.png");
            req2('fouth')
        }
    })





    function req1() {
        $.ajax({
            url: url1,
            type: 'GET',
            success: function(data) {
                var value = data.data;
                var str = '';
                var _style1 = '';
                var img_url1 = '';
                $('.user').find("img").attr({
                    'src': value[0].avatar,
                    'data-loginid': ''
                });


                for (var i = 0; i < value.length; i++) {
                    if( i < 9 ){
                        _style1 = ''
                    }else{
                        _style1 = 'left:-1px;'
                    }

                    if( value[i].avatar ){
                        img_url1 = 'background:url('+value[i].avatar+') no-repeat;background-size: cover;';
                    }else{
                        img_url1 = '';
                    }

                    str += '<li><div class="anchor" style="'+img_url1+'" onclick=req4(\''+value[i].unionid+','+value[i].avatar+'\')><img src="img/anchor.png" alt=""><em  style="'+_style1+'">'+(i+1)+'</em></div><div class="loginname">'+value[i].unionname+'</div><div class="yudan">'+value[i].range+'</div></li>'
                    
                }

                $('.list1').html(str);

            },
            fail: function() {
                console.log('Ajax Error');
            }
        });
    }

    function req2(flag) {
        $.ajax({
            url: url2 + '&flag=' + flag,
            type: 'GET',
            success: function(data) {
                var value = data.data;
                var str = '';
                var _style2 = '';
                var img_url2 = '';
                $('.user').find("img").attr({
                    'src': value[0].avatar,
                    'data-loginid': value[0].loginid
                });

                for (var i = 0; i < value.length; i++) {

                    if( i < 9 ){
                        _style2 = '';
                    }else{
                        _style2 = 'left:38%;';
                    }

                    if( value[i].avatar ){
                        img_url2 = 'background:url('+value[i].avatar+') no-repeat;background-size: cover;';
                    }else{
                        img_url2 = '';
                    }

                    str += '<li><div class="gold" style="'+img_url2+'" onclick=follow(\'' + value[i].loginid + '\')><img src="img/gold.png" alt=""><em style="'+_style2+'">'+(i+1)+'</em></div><div class="loginname">'+value[i].loginname+'</div><div class="yudan">'+value[i][flag]+'</div><div class="follow" onclick=follow(\'' + value[i].loginid + '\')><img src="img/follow.png" alt=""></div></li>';
                    
                }

                $('.list1').html(str);

            },
            fail: function() {
                console.log('Ajax Error');
            }
        });
    }

    function req3() {
        $.ajax({
            url: url3,
            type: 'GET',
            success: function(data) {
                var value = data.data.data;
                var str = '';
                var _style3 = '';
                var img_url3 = '';
                $('.user2').find("img").attr('src', value[0].avatar);
                $(".user2").on("click",function(){
                    follow(value[0].loginid);
                })


                for (var i = 0; i < value.length; i++) {
                    if( i < 9 ){
                        _style3 = ''
                    }else{
                        _style3 = 'left:38%;'
                    }
                    //console.log(i+"------"+value[i].avatar)
                    if( value[i].avatar ){
                        img_url3 = 'background:url('+value[i].avatar+') no-repeat;background-size: cover;';
                    }else{
                        img_url3 = '';
                    }
                    str += '<li><div class="gold" style="'+img_url3+'" onclick=follow(\'' + value[i].loginid + '\')><img src="img/gold.png" alt=""><em style="'+_style3+'">'+(i+1)+'</em></div><div class="loginname">'+value[i].loginname+'</div><div class="yudan">'+value[i].add_diamond+'</div></li>';

                }

                $('.list2').html(str);


            },
            fail: function() {
                console.log('Ajax Error');
            }
        });
    }


})(jQuery)