<template id="">
<div class="">
    <div class="myIssue-wrap">
        <div class="myIssue-top">
            <div class="top-content">
                <img src="img/avatar.jpg" />
                Tutu Live Quiz Hunter
            </div>

            <div class="my-question-tip my-question-tip-ok">{{myQuestionTipOk}}</div>
            <div class="my-question-tip my-question-tip-err">{{myQuestionTipErr}}</div>
        </div>
        <div class="activity-list" v-if="!activity_start">
            <div class="activity-info">
                <div class="guess-activity">
                    <label>Activity NO. :</label>
                    <select class="form-control" style="width:50%" v-model.trim="checkAct">
                        <option value="">Please select activity</option>
                        <option v-for = "type in activity" v-bind:value="[type._id, type.seconds]">
                            {{type.name}}
                        </option>
                    </select>
                    <div class="myTip">{{myTip}}</div>
                </div>
                <div class="activity-start-btn">
                    <button class="start-btn" :disabled="isClick" @click="startActivityFn" data-target="#startModel">Start</button>
                </div>
            </div>
        </div>
        <div class="activity-start" v-if="activity_start&&!isResult">
            <div class="question-wrap current-questions-num" v-if="!isSendQuestion">{{questionTextFn(currentQuestionNum)}}</div>
            <!-- <div class="question-wrap current-questions" v-if="isSendQuestion&&!isSendAnswer">1.以下“吃鸡”模式手游不属于网易的是？</div> -->
            <div class="question-wrap current-questions" v-if="isSendQuestion&&!isSendAnswer">
                <h4 class="question-title">{{currentQuestions}}</h4>
                <div class="options" v-for="(v,k) in questionOptions">
                    <em class="options-title-tag">{{optionsTitle[k]}}</em>
                    <p>{{v.content}}</p>
                </div>
            </div>
            <div class="question-wrap updateQuestionWrap" style="padding:0;" v-if="isSendAnswer">
                <div style="padding:3% 8%;">
                    <!-- <h4 class="question-title">1.以下“吃鸡”模式手游不属于网易的是？</h4> -->
                    <h4 class="question-title">{{currentQuestions}}</h4>
                    <!-- <div class="options options-err">
                        <em class="options-title-tag">A</em>
                        <p>荒野行动</p>
                        <span class="people-winner">20000人</span>
                    </div>
                    <div class="options options-err">
                        <em class="options-title-tag">A</em>
                        <p>荒野行动</p>
                        <span class="people-winner">20000人</span>
                    </div>
                    <div class="options options-ok">
                        <em class="options-title-tag">A</em>
                        <p>荒野行动</p>
                        <span class="people-winner">20000人</span>
                    </div> -->
                    <div class="options" :class="v.id==answerOk?'options-ok':'options-err'" v-for="(v,k) in questionOptions">
                        <em class="options-title-tag">{{optionsTitle[k]}}</em>
                        <p>{{v.content}}</p>
                        <span :class="v.id==answerOk?'people-winner':'people-loser'">{{v.num+' people'}}</span>
                    </div>
                </div>
                <div style="padding-bottom:6%;">
                    <!-- <h6 class="question-reback">This time, <span class="people-reback">12,000 people</span> used the resurrection card.</h6> -->
                    <h6 class="question-reback">This time, <span class="people-reback">{{toThousands(winner)}}&nbsp;people</span> used the resurrection card.</h6>
                    <div class="question-explain-wrap">
                        <h6 class="question-explain-title">A brief introduction to the question：</h6>
                        <div class="question-explain-content">
                            <p class="introduce" :class="isDropDown?'introduce-down':'introduce-up'">{{introduce}}</p>
                            <span class="myDrop" @click="isDropDown=!isDropDown" :class="isDropDown?'drop-down':'drop-up'"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="operation-btn">
                <button :disabled="pre" class="mybtn prev-question" @click="prevQuestionFn" :class="currentQuestionNum==1?'disabled':''" >Prev</button>
                <button :disabled="que" class="mybtn question-question" :class="isSendQuestion?'disabled':''" @click="sendQuestionFn" >Question</button>
                <button :disabled="ans" class="mybtn question-answer" :class="isSendQuestion?(countDown>0?'disabled':(!isSendAnswer?'':'disabled')):'disabled'" @click="sendAnswerFn($event)">Answer</button>
                <button :disabled="next" class="mybtn next-question" :class="isSendAnswer?'':'disabled'" @click="nextQuestionFn">Next</button>
            </div>
            <div class="question-countDown" v-if="countDown>0">
                <span class="count-down">{{countDown}}</span>
            </div>
        </div>
        <div class="activity-end" v-if="isResult">
            <div class="result-wrap" v-if="isSendPrize">
                <div class="result-txt-wrap this-prize">
                    <div class="result-txt-txt this-prize-txt">Money</div>
                    <div class="result-txt-num this-prize-num">{{ (prizeNum || 0) + (prizeType==1?' Diamonds':' THB') }}</div>
                </div>
                <div class="result-txt-wrap this-winner">
                    <div class="result-txt-txt this-winner-txt">Winners</div>
                    <div class="result-txt-num this-winner-num">{{resultWinner}} People</div>
                </div>
                <div class="result-txt-wrap this-per">
                    <div class="result-txt-txt this-per-txt">Average</div>
                    <div class="result-txt-num this-per-num">{{ (ave_prize || 0) + (prizeType==1?' Diamonds':' THB') }}</div>
                </div>
            </div>
            <div class="result-btn">
                <button class="send-result" v-if="isSendPrize">Results</button>
                <button class="send-prize" :disabled="prize" @click="sendPrizeFn" v-if="!isSendPrize">Prize</button>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="startModel" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                            class="sr-only">Close</span></button>
                    <h4 class="modal-title" style="text-align: center">Start</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <h5 style="text-align: center;">Are you sure about the start？</h5>
                        <div class="addTips">
                            {{errorTip}}
                        </div>
                        <div class="addTips2">
                            {{successTip}}
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" :disabled="isClick" @click="activityStartFn">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import utils from '../utils/utils.js';
export default {
    data() {
        return {
            ct: 5,//s 倒计时
            successTip: '',
            errorTip: '',
            myQuestionTipOk: '',
            myQuestionTipErr: '',
            // questionText:['一','二','三','四','五','六','七','八','九','十','十一','十二'],
            myTip: '',
            winner: '',
            currentQuestionNum: 1,
            currentQuestions: '',

            prizeNum: '',
            resultWinner: '',
            ave_prize: '',

            questionOptions: [],
            optionsTitle: ['A', 'B', 'C'],

            answerOk: '',

            countDown: 0,

            activity: [],
            checkAct: '',
            activityId: '',

            examId: '',

            activity_start: false,
            isClick: false,

            isSendQuestion: false,
            isSendAnswer: false,

            isCountDown: false,

            isResult: false,

            isDropDown: true,

            isSendPrize: false,
            prizeType: '',
            introduce: '',

            pre: false,
            next: false,
            que: false,
            ans: false,
            prize: false,

        }
    },

    methods: {
        //设置按钮disabled
        setBtnDisabled(btn){
            const that = this;
            this[btn] = true;
            setTimeout(function(){
                that[btn] = false;
            },3000)
        },
        //数据排序
        byOrder(data) {
            var newarr = [];
            var newarr2 = [];
            for(var i in data){
                newarr.push(data[i].order)
            }
            newarr.sort(order);
            for(var i in newarr){
                for(var j in data){
                    if(data[j].order==newarr[i]){
                        newarr2.push(data[j])
                    }
                }
            }
            function order(x,y){
                return x-y
            }
            return newarr2;
        },
        //是否是空对象
        isEmptyObject(e) {  
            var t;  
            for (t in e)  
                return !1;  
            return !0  
        },
        //千分 数值
        toThousands(num) {
        　　var re=/\d{1,3}(?=(\d{3})+$)/g;
        　　var n1=(num || 0).toString().replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
        　　return n1;
        },
        //选择活动
        startActivityFn() {
            const that = this;
            this.activityId = this.checkAct[0]||'';
            if(this.activityId === '') {
                this.myTip = 'Please select activity';
                setTimeout(function(){
                    that.myTip = '';
                },1500)
                return false
            };
            $("#startModel").modal("show");
        },
        //发奖
        sendPrizeFn() {
            const that = this;
            this.setBtnDisabled('prize');
            // this.isClick = true;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/million/exam/give_award',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "post",
                data: {
                    "millionid": that.activityId
                },
                success: function(data){
                    // that.isClick = false;
                    let code = data.returncode;
                    var data = data.data;
                    // console.log(data)
                    if(code == 200){
                        that.prizeNum = data.numPrize;
                        that.ave_prize = data.avePrize;
                        that.resultWinner = data.numWinner;
                        that.prizeType = data.type;
                        that.isSendPrize = true;
                        that.myQuestionTipOk = 'Operation is successful';
                        setTimeout(function(){
                            that.myQuestionTipOk = '';
                        },1500)
                    } else if (code == '301') {
                        that.isSendPrize = false;
                        // console.log('Parameter error');
                        that.myQuestionTipErr = 'Parameter error';
                        setTimeout(function(){
                            that.myQuestionTipErr = '';
                        },1500)
                    } else if (code == '303') {
                        that.isSendPrize = false;
                        // console.log('Parameter error');
                        that.myQuestionTipErr = 'Server error';
                        setTimeout(function(){
                            that.myQuestionTipErr = '';
                        },1500)
                    } else if (code == '306') {
                        that.isSendPrize = false;
                        // console.log('Parameter error');
                        that.myQuestionTipErr = 'The room is not open';
                        setTimeout(function(){
                            that.myQuestionTipErr = '';
                        },1500)
                    } else if (code == '104') {
                        that.isSendPrize = false;
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.sendPrizeFn()});
                    } else {
                        that.isSendPrize = false;
                       utils.handleLogOut(data.returncode, that);
                    }
                },
                error: function() {
                    console.log('Ajax Error');
                    // that.isClick = false;
                    that.isSendPrize = false;
                    alert('The network has been disconnected')
                }

            })
        },
        //当前题目
        questionTextFn(q) {
            // return '第'+this.questionText[q-1]+'题';
            return 'Questions '+ q;
        },
        //上一题
        prevQuestionFn() {
            const that = this;
            // return false;
            if( this.currentQuestionNum == 1 )return false;
            if( this.isCountDown )return false;
            if( this.isSendQuestion && !this.isSendAnswer )return false;
            this.setBtnDisabled('pre');
            // this.isClick = true;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/million/exam/pre',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "post",
                data: {
                    "millionid": that.activityId,
                    "round": that.currentQuestionNum
                },
                success: function(data){
                    let code = data.returncode;
                    // that.isClick = false;
                    var data = data.data;
                    console.log(data)
                    if(code == 200){

                        // that.isSendQuestion = true;
                        // that.isSendAnswer = true;
                        that.currentQuestionNum = data.round;
                        that.currentQuestionStatusFn(data.status)
                        that.currentQuestions = data.round+'.'+data.stem;
                        that.questionOptions = that.byOrder(data.option);
                        that.answerOk = data.answer;
                        that.winner = data.num_revive;
                        that.introduce = data.intro;
                        that.myQuestionTipOk = 'Operation is successful';
                        setTimeout(function(){
                            that.myQuestionTipOk = '';
                        },1000)
                    } else if (code == '301') {
                        // console.log('Parameter error');
                        that.myQuestionTipErr = 'Parameter error';
                        setTimeout(function(){
                            that.myQuestionTipErr = '';
                        },1000)
                    } else if (code == '303') {
                        // console.log('Parameter error');
                        that.myQuestionTipErr = 'Server error';
                        setTimeout(function(){
                            that.myQuestionTipErr = '';
                        },1000)
                    } else if (code == '305') {
                        // console.log('Parameter error');
                        that.myQuestionTipErr = 'The room is not open';
                        setTimeout(function(){
                            that.myQuestionTipErr = '';
                        },1000)
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.prevQuestionFn()});
                    } else {
                       utils.handleLogOut(data.returncode, that);
                    }
                },
                error: function() {
                    console.log('Ajax Error');
                    // that.isClick = false;
                    alert('The network has been disconnected')
                }

            })
        },
        //下一题
        nextQuestionFn() {
            if(!this.isSendAnswer)return false;
            this.setBtnDisabled('next');
            // this.isClick = true;
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/million/exam/next',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "post",
                data: {
                    "millionid": that.activityId,
                    "round": that.currentQuestionNum*1+1
                },
                success: function(data){
                    let code = data.returncode;
                    // that.isClick = false;
                    var data = data.data;
                    // console.log(data)
                    if(code == 200){
                        that.currentQuestionNum = data.round;
                        that.currentQuestionStatusFn(data.status);
                        that.currentQuestions = data.round+'.'+data.stem;
                        that.examId = data._id;
                        that.questionOptions = that.byOrder(data.option);
                        that.answerOk = data.answer;
                        that.winner = data.num_revive;
                        that.introduce = data.intro;
                        // this.countDown = 0;

                        // that.isSendQuestion = false;
                        // that.isSendAnswer = false;
                        that.myQuestionTipOk = 'Operation is successful';
                        setTimeout(function(){
                            that.myQuestionTipOk = '';
                        },1000)
                    } else if (code == '201') {
                        that.isResult = true;
                    } else if (code == '301') {
                        // console.log('Parameter error');
                        that.myQuestionTipErr = 'Parameter error';
                        setTimeout(function(){
                            that.myQuestionTipErr = '';
                        },1000)
                    } else if (code == '303') {
                        // console.log('Parameter error');
                        that.myQuestionTipErr = 'Server error';
                        setTimeout(function(){
                            that.myQuestionTipErr = '';
                        },1000)
                    }  else if (code == '305') {
                        // console.log('Parameter error');
                        that.myQuestionTipErr = 'There are still unanswered questions.';
                        setTimeout(function(){
                            that.myQuestionTipErr = '';
                        },1000)
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.nextQuestionFn()});
                    } else {
                       utils.handleLogOut(data.returncode, that);
                    }
                },
                error: function() {
                    console.log('Ajax Error');
                    // that.isClick = false;
                    alert('The network has been disconnected')
                }

            })

            // this.countDown = 0;

            // this.isSendQuestion = false;
            // this.isSendAnswer = false;
        },
        //捕捉 开始模态框 隐藏事件
        handleModelHide() {
            const that = this;
            $("#startModel").on("hidden.bs.modal", function(){
                that.isClick = false;
            })
        },
        //倒计时
        countDownFn() {
            const that = this;
            this.countDown = this.ct+this.checkAct[1];
            this.isSendQuestion = true;
            this.isCountDown = true;
            var st = setInterval(function(){
                if( that.countDown > 0 ){
                    that.countDown--
                }else{
                    that.countDown=0;
                    that.isCountDown = false;
                    clearInterval(st);
                }
            },1000)
        },
        //发题
        sendQuestionFn() {
            const that = this;
            if( !this.isSendQuestion ){
                this.setBtnDisabled('que');
                // this.isClick = true;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/million/exam/send',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "post",
                    data: {
                        "millionid": that.activityId,
                        "millionexamid": that.examId
                    },
                    success: function(data){
                        // that.isClick = false;
                        let code = data.returncode;
                        var data = data.data;
                        // console.log(data)
                        if(code == 200){
                            // that.currentQuestionNum = data.round;
                            // that.currentQuestionStatusFn(data.status)
                            // that.currentQuestions = data.round+'.'+data.stem;
                            // that.examId = data._id;
                            that.myQuestionTipOk = 'Operation is successful';
                            that.countDownFn();
                            setTimeout(function(){
                                that.myQuestionTipOk = '';
                            },1500)
                        } else if (code == '301') {
                            // console.log('Parameter error');
                            that.myQuestionTipErr = 'Parameter error';
                            setTimeout(function(){
                                that.myQuestionTipErr = '';
                            },1500)
                        } else if (code == '303') {
                            // console.log('Parameter error');
                            that.myQuestionTipErr = 'Server error';
                            setTimeout(function(){
                                that.myQuestionTipErr = '';
                            },1500)
                        } else if (code == '305') {
                            // console.log('Parameter error');
                            that.myQuestionTipErr = 'Check to see if there are questions that have not been sent.';
                            setTimeout(function(){
                                that.myQuestionTipErr = '';
                            },1500)
                        } else if (code == '306') {
                            // console.log('Parameter error');
                            that.myQuestionTipErr = 'Subject disorder';
                            setTimeout(function(){
                                that.myQuestionTipErr = '';
                            },1500)
                        } else if (code == '307') {
                            // console.log('Parameter error');
                            that.myQuestionTipErr = 'Repeat submission';
                            setTimeout(function(){
                                that.myQuestionTipErr = '';
                            },1500)
                        } else if (code == '308') {
                            // console.log('Parameter error');
                            that.myQuestionTipErr = 'The room is not open';
                            setTimeout(function(){
                                that.myQuestionTipErr = '';
                            },1500)
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.sendQuestionFn()});
                        } else {
                           utils.handleLogOut(data.returncode, that);
                        }
                    },
                    error: function() {
                        console.log('Ajax Error');
                        // that.isClick = false;
                        alert('The network has been disconnected')
                    }

                })
            }else{
                // this.isSendQuestion = false;
                return false;
            }
        },
        //发答案
        sendAnswerFn(){
            const that = this;
            if( this.isSendQuestion && !that.isSendAnswer && this.countDown==0 ){
                this.setBtnDisabled('ans');
                // this.isClick = true;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/million/answer/send',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "post",
                    data: {
                        "millionid": that.activityId,
                        "millionexamid": that.examId
                    },
                    success: function(data){
                        // that.isClick = false;
                        let code = data.returncode;
                        var data = data.data;
                        // console.log(data)
                        if(code == 200){
                            that.isSendAnswer = true;
                            that.currentQuestionNum = data.round;
                            that.currentQuestionStatusFn(data.status)
                            that.currentQuestions = data.round+'.'+data.stem;
                            that.questionOptions = that.byOrder(data.option);
                            that.answerOk = data.answer;
                            that.winner = data.num_revive;
                            that.myQuestionTipOk = 'Operation is successful';
                            setTimeout(function(){
                                that.myQuestionTipOk = '';
                            },1500)
                        } else if (code == '301') {
                            // console.log('Parameter error');
                            that.myQuestionTipErr = 'Parameter error';
                            setTimeout(function(){
                                that.myQuestionTipErr = '';
                            },1500)
                        } else if (code == '303') {
                            // console.log('Parameter error');
                            that.myQuestionTipErr = 'Server error';
                            setTimeout(function(){
                                that.myQuestionTipErr = '';
                            },1500)
                        } else if (code == '305') {
                            // console.log('Parameter error');
                            that.myQuestionTipErr = 'The room is not open';
                            setTimeout(function(){
                                that.myQuestionTipErr = '';
                            },1500)
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.sendAnswerFn()});
                        } else {
                           utils.handleLogOut(data.returncode, that);
                        }
                    },
                    error: function() {
                        console.log('Ajax Error');
                        // that.isClick = false;
                        alert('The network has been disconnected')
                    }

                })
            }else{
                return false;
            }
        },
        //获取活动
        getGuessList() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/million/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": 1,
                    "size": 999
                },
                success: function(data){
                    let code = data.returncode;
                    // console.log(data.data.data)
                    if(code == 200){
                        that.activity = that.checkActivityData(data.data.data);
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.getGuessList()});
                    } else {
                       utils.handleLogOut(data.returncode, that);
                    }
                },
                error: function() {
                    console.log('Ajax Error');
                    alert('The network has been disconnected')
                }

            })
        },

        //筛选已经结束的活动
        checkActivityData(data) {
            var arr = [];
            for(var i in data){
                if(data[i].status!=2){
                    arr.push(data[i])
                }
            }
            return arr;
        },

        //开始活动，获取当前的题目
        activityStartFn() {
            const that = this;
            this.setBtnDisabled('isClick');
            // this.isClick = true;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/million/exam/current',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "millionid": that.activityId
                },
                success: function(data){
                    let code = data.returncode;
                    // that.isClick = false;
                    // console.log(data)
                    var data = data.data;
                    if(code == 200){
                        that.successTip = 'Operation is successful';
                        setTimeout(function(){
                            that.successTip = '';
                            that.activity_start = true;
                            $("#startModel").modal('hide');
                        },1500)
                        // if(that.isEmptyObject(data)){
                        //     that.currentQuestionNum = 1;
                        //     return false;
                        // }
                        that.questionOptions = that.byOrder(data.option);
                        // console.log(that.questionOptions)
                        that.currentQuestionNum = data.round;
                        that.currentQuestionStatusFn(data.status)
                        that.currentQuestions = data.round+'.'+data.stem;
                        that.answerOk = data.answer;
                        that.winner = data.num_revive;
                        that.examId = data._id;
                        that.introduce = data.intro;
                    } else if (code == '301') {
                        // console.log('Parameter error');
                        that.errorTip = 'Parameter error';
                        setTimeout(function(){
                            that.errorTip = '';
                            that.activity_start = false;
                            $("#startModel").modal('hide');
                        },1500)
                    } else if (code == '303') {
                        // console.log('Parameter error');
                        that.errorTip = 'Server error';
                        setTimeout(function(){
                            that.errorTip = '';
                            that.activity_start = false;
                            $("#startModel").modal('hide');
                        },1500)
                    } else if (code == '304') {
                        // console.log('Parameter error');
                        that.errorTip = 'The current activity has no question, please add the question.';
                        setTimeout(function(){
                            that.errorTip = '';
                            that.activity_start = false;
                            $("#startModel").modal('hide');
                        },1500)
                    } else if (code == '305') {
                        // console.log('Parameter error');
                        that.errorTip = 'The activity has come to an end';
                        setTimeout(function(){
                            that.errorTip = '';
                            that.activity_start = false;
                            $("#startModel").modal('hide');
                        },1500)
                    } else if (code == '306') {
                        // console.log('Parameter error');
                        that.errorTip = 'Please open a Quiz Hunter room first.';
                        setTimeout(function(){
                            that.errorTip = '';
                            that.activity_start = false;
                            $("#startModel").modal('hide');
                        },1500)
                    } else if (code == '307') {
                        // console.log('Parameter error');
                        that.errorTip = 'The room is not open';
                        setTimeout(function(){
                            that.errorTip = '';
                            that.activity_start = false;
                            $("#startModel").modal('hide');
                        },1500)
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.activityStartFn()});
                    } else {
                       utils.handleLogOut(data.returncode, that);
                    }
                },
                error: function() {
                    console.log('Ajax Error');
                    // that.isClick = false;
                    alert('The network has been disconnected')
                }

            })
        },

        //当前题目的状态
        currentQuestionStatusFn(status) {
            const that = this;
            if( status == 0 ){//初始

                that.isSendQuestion = false;
                that.isSendAnswer = false;
            } else if( status == 1 ){//已发题目

                that.isSendQuestion = true;
                that.isSendAnswer = false;
            } else if( status == 2 ){//题目、答案都已发送
                that.countDown = 0;

                that.isSendQuestion = true;
                that.isSendAnswer = true;
            }
        }

    },





    mounted() {
        this.$store.dispatch('tabChanger', 69);
        this.$store.dispatch('subChanger', 'sub10');
        // console.log(this.$store.state.tabIndex);
        // console.log(this.$store.state.subIndex);
        this.getGuessList();
        this.handleModelHide();


    }
}
</script>
