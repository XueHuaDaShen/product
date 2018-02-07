;(function($){


$(".getLife").on("click", function(){
    location.href = '../code.html?loginid='+obj.loginid+'&language='+obj.language;;
})
$(".invite-firends").on("click", function(){
    shareFollow();
})
$(".week-rank").on("click", function(){
    // console.log(rankUrl)
    location.href = rankUrl;
})


$(".confirm").on("click", function(){
    var inviteCode = $(".invite-code-num").val();
    if(!inviteCode){
        $(".use").show();
        setTimeout(function(){
            $(".use").hide();
        },1500)
    }else{
        // $(".alert-wrap").hide();
        $(".loading-wrap").show();
        $.ajax({
            url: serverUrl + '/revive/increase',
            // headers: {
            //     "token": localStorage.getItem('A-TOKEN')
            // },
            headers: {
                authorization: decodeURI(obj.token)
            },
            type: "post",
            data: {
                "revive_code": inviteCode,
            },
            success: function(data){
                var code = data.returncode;
                // console.log(data)
                $(".loading-wrap").hide();
                if(code == 200){
                    $(".life-num>span").html(data.num_revive);
                    $(".alert-wrap").hide();
                } else if (code == '302') {
                    $(".used").show();
                    setTimeout(function(){
                        $(".used").hide();
                    },1500)
                } else if (code == '301') {
                    $(".code-err").show();
                    setTimeout(function(){
                        $(".code-err").hide();
                    },1500)
                    console.log('Parameter error');
                } else if (code == '303') {
                    $(".server-err").show();
                    setTimeout(function(){
                        $(".server-err").hide();
                    },1500)
                    console.log('Parameter error');
                }
            },
            fail: function() {
                $(".loading-wrap").hide();
                console.log('Ajax Error');
            }
    
        })
    }
})
$(".cancel").on("click", function(){
    $(".alert-wrap").hide();
})
function getUserData(){
    $.ajax({
        url: rootUrl + '/million/latest',
        type: "post",
        data: {
            "loginid": obj.loginid
            // "cc": obj.cc
            // loginid: '00018b4e7d525eb55a55326b'
        },
        success: function(data){
            var code = data.returncode;
            var callData = data.data;
            // console.log(data)
            if(code == 200){
                userDataCB(callData);
            } else if (code == '301') {
                console.log('Parameter error');
            } else if (code == '303') {
                console.log('Parameter error');
            }
        },
        fail: function() {
            console.log('Ajax Error');
        }

    })
}
getUserData()

function userDataCB(data){
    // console.log(data)
    var ava = '';
    if( data.avatar ){
        ava = data.avatar;
    }else{
        ava = '../img/avatar.png'
    }
    $(".avatar").find("img").attr('src', ava);
    $(".user-name").html(data.loginname);
    if( data.liveid ){
        // $(".goBtn").html("开始答题").attr("data-id", data.liveid);
        $(".goBtn").html("เริ่มตอบคำถาม").attr("data-id", data.liveid);
    }else{
        // $(".goBtn").html("敬请期待").attr("data-id", '');
        $(".goBtn").html("โปรดรอสักครู่").attr("data-id", '');
    }
    if( data.rank ){
        $(".week-rank").find(".des-num").show().html(data.rank);
        $(".week-rank").find(".num-none").hide();
    }else{
        $(".week-rank").find(".des-num").hide()
        $(".week-rank").find(".num-none").show();
    }
    $(".balance").attr("data-cash", data.cash).find(".des-num").html(toThousands(data.cash)+data.unit);
    if(data.start_at){
        var money = data.type== 1 ? ' Diamonds': (data.type==2?' Cash':'');
        $(".start-time").html(new Date(data.start_at).Format("MM-dd hh:mm"))
        $(".prize").html(data.num_prize+ money);
    }else{
        $(".start-time").html('--')
        $(".prize").html('--');
    }
    $(".life-num>span").html(data.num_revive);
}

})(jQuery)