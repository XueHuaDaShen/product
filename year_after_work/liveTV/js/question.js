var start = false;
var optionsTitle = ['A', 'B', 'C'];


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
// 发题
$.comet.on('send_exam', function(data) {
    console.log('发题：', data);
    start = true;
    setQuestion(data)
})
// 发答案
$.comet.on('send_answer', function(data) {
    console.log('发答案：', data);
    start = true;
    setAnswer(data)
})

function setQuestion(data){
    isSendQuestion = true;
    isSendAnswer = false;
    var options = byOrder(data.option);
    var stem = data.stem;
    var round = data.round;
    var title = 'Question '+round;
    var str = '';
    for(var i in options){
        str += '<div class="option"><div class="option-wrap"><em class="option-title">'+optionsTitle[i]+'. </em><span class="option-content">'+options[i].content+'</span></div></div>';
    };
    $(".title").html(title);
    $(".stem").html(stem);
    $(".bot").html(str);
    changeWrap();
}


function setAnswer(data){
    isSendQuestion = false;
    isSendAnswer = true;
    var options = byOrder(data.option);
    var answer = data.answer;
    var stem = data.stem;
    var round = data.round;
    var title = 'Question '+round;
    var str = '';
    var mask = '';
    for(var i in options){
        if( options[i].id == answer ){
            mask = '<div class="mask"></div>';
        }else{
            mask = '';
        }
        str += '<div class="option result"><div class="option-wrap"><em class="option-title">'+optionsTitle[i]+'. </em><span class="option-content">'+options[i].content+'</span></div><div class="people">'+options[i].num+'</div>'+mask+'</div>';
    };
    $(".title").html(title);
    $(".stem").html(stem);
    $(".bot").html(str);
    changeWrap();
}


