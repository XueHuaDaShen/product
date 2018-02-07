
var start = false;

function changeWrap(){
    if( start ){
        $(".optionbj").show();
    }else{
        $(".optionbj").hide();
    }
}

// 长链接
$.comet.connect(comet_host, comet_port, 'tv');
$.comet.on('connect', function() {
    console.log('connect success~~~');
});
// prize
$.comet.on('send_award', function(data) {
    console.log('result:', data);
    start = true;
    changeWrap()
    setResult(data)
})
function setResult(data){
    var money = data.numPrize || 0;
    var winner = data.numWinner || 0;
    var ave = data.avePrize || 0;
    var millionid = data.millionid;
    $(".this-prize-num").html(toThousands(money)+data.unit);
    $(".this-winner-num").html(winner+' People');
    $(".this-per-num").html(toThousands(ave)+data.unit);
    $.ajax({
        url: serverUrl + '/million/prize',
        type: 'POST',
        data: {
            millionid: millionid
            // millionid: '5a5dfa870027de26655d1a11'
        },
        success: function(data){
            // console.log(data)
            setListData(data.data)
        },
        fail: function(data){

        }
    })
}
function setListData(data){
    var num = data.prize;
    var list = data.list;
    var str = '';
    var avatarurl = '';
    for(var i in list){
        
        if( list[i].avatar.indexOf('i1.live.aisoqu.com') > -1 ){
            avatarurl = '?imageView2/1/w/100/h/100';
        }else{
            avatarurl = '';
        }

        str += '<li><div class="avatar"><img src="'+list[i].avatar+avatarurl+'"></div><div class="name">'+list[i].loginname+'</div><div class="num">'+num+'</div></li>'
    }
    $("#list").html(str);
    avatarStyle();
}
function avatarStyle(){
    $(".avatar").each(function(){
        $(this).css({
            height: $(this).width()
        })
    })
}
avatarStyle()