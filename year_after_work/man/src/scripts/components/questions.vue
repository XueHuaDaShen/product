<style scope>
.answer{
    border:none;
    box-shadow:0 0 0 0;
    color:#000;
}
.answer:focus{
    outline:none;
    box-shadow:0 0 0 0;
}
.answer-ok{
    background:#67C23A;
}
.answer-err{
    background:#F56C6C;
}
.answer::-webkit-input-placeholder {
  color: #666;
}
.answer:-moz-placeholder {
  color: #666;
}
.answer:-ms-input-placeholder {
  color: #666;
}
.answer-ok[readonly] {
    cursor:inherit; 
    background-color: #67C23A; 
    opacity: 1;
}
.answer-err[readonly] {
    cursor:inherit; 
    background-color: #F56C6C; 
    opacity: 1;
}
.myused{
    color:#67C23A;
}
</style>
<template id="">
<div class="">
    <div class="AM-top"  style="text-align: left; margin-top: 10px;">
        <button type="button" class="btn btn-primary AM-add" data-toggle="modal" data-target="#myModal" @click="resetAdd">New Question</button>
        <span class="AM-tips1" style="left:40%;">{{AMtips1}}</span>
        <span class="AM-tips2" style="left:40%;">{{AMtips2}}</span>
        <!-- Modal -->
        <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">New Question</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Question (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  placeholder="Question" v-model.trim="newTopic">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Options (*)</label>
                                <div class="col-sm-10">
                                    <!-- <div style="position:relative;">
                                        <span class="fa fa-check form-control-feedback" style="line-height:34px;color:green"></span>
                                        <input type="text" class="fa fa-check form-control answer answer-ok" style="margin-bottom:5px;"  placeholder="input correct asewer here" v-model.trim="newTopic">
                                    </div>
                                    <div style="position:relative;">
                                        <span class="fa fa-times form-control-feedback" style="line-height:34px;color:red"></span>
                                        <input type="text" class="form-control answer answer-err" style="margin-bottom:5px;"  placeholder="input wrong answer 1 here" v-model.trim="newTopic">
                                    </div>
                                    <div style="position:relative;">
                                        <span class="fa fa-times form-control-feedback" style="line-height:34px;color:red"></span>
                                        <input type="text" class="form-control answer answer-err"  placeholder="input wrong answer 2 here" v-model.trim="newTopic">
                                    </div> -->
                                    <input type="text" class="fa fa-check form-control answer answer-ok" style="margin-bottom:5px;"  placeholder="input correct asewer here" v-model.trim="newAnswerOk">
                                    <input type="text" class="form-control answer answer-err" style="margin-bottom:5px;"  placeholder="input wrong answer 1 here" v-model.trim="newAnswerErr1">
                                    <input type="text" class="form-control answer answer-err"  placeholder="input wrong answer 2 here" v-model.trim="newAnswerErr2">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Difficulty level (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="newLevel">
                                        <option value="1">easy</option>
                                        <option value="2">medium</option>
                                        <option value="3">hard</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label hasMR">Category (*)</label>
                                <select class="form-control acName col-sm-10" v-model="newCategory">
                                    <option value="">Please select the category</option>
                                    <option v-for = "type in typeList" v-bind:value="type._id">
                                        {{type.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Introduce (*)</label>
                                <div class="col-sm-10">
                                    <textarea style="resize:none;" class="form-control" v-model="newIntroduce" name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <div class="addTips">
                                {{addTips}}
                            </div>
                            <div class="addTips2">
                                {{addTips2}}
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" :disabled="isClick" @click="addTopicFn">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="AM-topR" style = "float:right; margin-right: 3.9%; margin-bottom: 25px;">
            <input type="text" class="form-control AM-search"  placeholder="请输入活动名称" v-model.trim="searchname">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAdmin"></i>
        </div> -->


    </div>
    <table class="table table-striped table-hover AM-table" style="table-layout: fixed;">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <td class="AM-agentID">ID</td>
                <th style="width:40%">Question</th>
                <th>Level</th>
                <th>Category</th>
                <!-- <th>status</th> -->
                <th>operation</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in questionsDataList">
                <td class="AM-agentID">{{admin._id}}</td>
                <td style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;" @click="getQuestionFn(admin.stem, admin.option, admin.answer, '', '', 'question', '')" data-target="#questionModal">{{admin.stem}}</td>
                <td>{{isLevel(admin.level)}}</td>
                <td>{{admin.dict_name}}</td>
                <!-- <td :class="admin.status==1?'myused' : ''">{{isStatus(admin.status)}}</td> -->
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            Select
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" v-if="admin.status==0" data-target="#updateModal" @click="resetUpdate(admin._id,  admin.stem, admin.option, admin.level, admin.dictid, admin.answer, admin.intro)">update</a></li>
                            <li><a href="javascript: void(0)" data-target="#questionModal" @click="getQuestionFn(admin.stem, admin.option, admin.answer, admin.level, admin.dictid, 'detail', admin.intro)">detail</a></li>
                            <!-- <li><a href="javascript: void(0)" v-if="admin.status==0" data-toggle='modal' data-target="#joinModel" @click="getJoinExamIdFn(admin._id)">Add to activity</a></li> -->
                            <!-- <li><a href="javascript: void(0)" v-if="admin.status==0" data-toggle='modal' data-target="#deleteModel" @click="getDeleteIdFn(admin._id)">delete</a></li> -->
                        </ul>
                    </div>
                </td>
            </tr>

        </tbody>
    </table>
    <div class="modal fade bs-example-modal-lg" id="questionModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">{{isDetail?'Detail':'Question'}}</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Question (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" readOnly v-model.trim="questionExam">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Options (*)</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly class="fa fa-check form-control answer" :class=" v.id==questionAnswer ? 'answer-ok' : 'answer-err' " v-for="v in questionOption" style="margin-bottom:5px;" :value="v.content">
                            </div>
                        </div>
                        <div class="form-group" v-if="isDetail">
                            <label class="col-sm-2 control-label">Difficulty level (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" disabled name="" id="exampleInputEmail1" v-model.trim="questionLevel">
                                    <option value="1">easy</option>
                                    <option value="2">medium</option>
                                    <option value="3">hard</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="isDetail">
                            <label class="col-sm-2 control-label hasMR">Category (*)</label>
                            <select class="form-control acName col-sm-10" disabled v-model.trim="questionClass">
                                <option value="">Please select the category</option>
                                <option v-for = "type in typeList" v-bind:value="type._id">
                                    {{type.name}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group" v-if="isDetail">
                            <label class="col-sm-2 control-label">Introduce (*)</label>
                            <div class="col-sm-10">
                                <textarea readOnly style="resize:none;" class="form-control" v-model="introduce" name="" id="" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                        <div class="addTips">
                            {{addTips}}
                        </div>
                        <div class="addTips2">
                            {{addTips2}}
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <nav class="AMnav">
        <ul class="pagination">
            <li><a href="javascript:void(0);" @click="pageBegin">Begin</a></li>
            <li><a href="javascript:void(0);" @click="pagePre">&laquo;</a></li>
            <div class="pageL">
                <li v-for="pageN in pageL">
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="questionsListFn(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>

    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">Update Question</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Question (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control"  placeholder="Question" v-model.trim="updateTopic">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Options (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="fa fa-check form-control answer answer-ok" style="margin-bottom:5px;"  placeholder="input correct asewer here" v-model.trim="updateAnswerOk">
                                <input type="text" class="form-control answer answer-err" style="margin-bottom:5px;"  placeholder="input wrong answer 1 here" v-model.trim="updateAnswerErr1">
                                <input type="text" class="form-control answer answer-err"  placeholder="input wrong answer 2 here" v-model.trim="updateAnswerErr2">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Difficulty level (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="updateLevel">
                                    <option value="1">easy</option>
                                    <option value="2">medium</option>
                                    <option value="3">hard</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label hasMR">Category (*)</label>
                            <select class="form-control acName col-sm-10" v-model.trim="updateCategory">
                                <option value="">Please select the category</option>
                                <option v-for = "type in typeList" v-bind:value="type._id">
                                    {{type.name}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Introduce (*)</label>
                            <div class="col-sm-10">
                                <textarea style="resize:none;" class="form-control" v-model="updateIntroduce" name="" id="" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </form>
                    <div class="addTips">
                        {{upTips1}}
                    </div>
                    <div class="addTips2">
                        {{upTips2}}
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" :disabled="isClick" @click="update">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="joinModel" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">Join the guessing</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label hasMR">Category (*)</label>
                            <select class="form-control acName col-sm-10" v-model.trim="millionid">
                                <option value="">Please select issue</option>
                                <option v-for = "type in issueData" v-bind:value="type._id">
                                    {{type.name}}
                                </option>
                            </select>
                        </div>
                        <div class="addTips">
                            {{upTips1}}
                        </div>
                        <div class="addTips2">
                            {{upTips2}}
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" :disabled="isClick" @click="joinFn">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="deleteModel" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                            class="sr-only">Close</span></button>
                    <h4 class="modal-title" style="text-align: center">Delete</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <h5 style="text-align: center;">Are you sure to delete this question ？ </h5>

                        <div class="addTips">
                            {{delTips1}}
                        </div>
                        <div class="addTips2">
                            {{delTips2}}
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" :disabled="isClick" @click="deleteQuestionFn">Confirm</button>
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
            AMtips1: '',
            AMtips2: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            questionsDataList: [],
            upTips1: '',
            upTips2: '',
            pageL: [],
            name: '',
            searchname: '',

            typeList: [],
            newTopic: '',
            newAnswerOk: '',
            newAnswerErr1: '',
            newAnswerErr2: '',

            newLevel: '1',
            newCategory: '',
            newIntroduce: '',

            introduce: '',

            updateId: '',
            updateTopic: '',
            updateAnswerOk: '',
            updateAnswerErr1: '',
            updateAnswerErr2: '',

            updateLevel: '1',
            updateCategory: '',
            updateIntroduce: '',

            leaveId: '',
            questionExam: '',
            questionOption: '',
            questionAnswer: '',
            questionLevel: '',
            questionClass: '',

            isDetail: false,
            examId: '',
            issueData: [],
            millionid: '',
            isClick: false,
            deleteId: '',
            delTips1: '',
            delTips2: '',
        }
    },

    methods: {

        //展示 question
        getQuestionFn(exam, option, answer, level, classifi, status, intro) {
            const that = this;
            this.questionExam = exam;
            this.questionOption = option;
            this.questionAnswer = answer;
            this.introduce = intro;
            if(status == 'detail'){
                this.isDetail = true;
                this.questionLevel = level;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/dict/getall',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        "code": 'million_dict'
                    },
                    success: function(data){
                        let code = data.returncode;
                        // console.log(data)
                        if(code == 200){
                            that.typeList = data.data;
                            that.questionClass = classifi||'';
                        } else if (code == '304') {
                            that.addATips = 'Do without a dictionary';
                            setTimeout(function() {
                                that.addATips = '';
                            }, 1500);
                        } else if (code == '301') {
                            console.log('Parameter error');
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.getQuestionFn(exam, option, answer, level, classifi, status)});
                        }  else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function() {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }

                })
            }else{
                this.isDetail = false;
            }
            this.$nextTick(function(){
                $('#questionModal').modal('show');
            })
        },

        isStatus(status){
            // console.log(row)
            switch(status){
                case 0: return 'Available';
                case 1: return 'Occupied';
            }
        },

        isLevel(level) {
            switch(level){
                case 1: return 'easy';
                case 2: return 'medium';
                case 3: return 'hard';
            }
        },


        resetAdd() {
            this.newTopic = '';
            this.newAnswerOk = '';
            this.newAnswerErr1 = '';
            this.newAnswerErr2 = '';

            this.newLevel = '1';
            this.newCategory = '';
            this.newIntroduce = '';
            this.show();
        },

        addTopicFn() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            if( that.newTopic === '' ){
                this.addTips = 'Please fill out the exam';
                setTimeout(function() {
                    that.addTips = ''
                }, 1000)
            } else if( that.newAnswerOk === '' || that.newAnswerErr1 === '' || that.newAnswerErr2 === '' ){
                that.addTips = 'Please complete the options.';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else if( that.newLevel === '' ){
                that.addTips = 'Please choose the difficulty degree.';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else if( that.newCategory === '' ){
                that.addTips = 'Please select category';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else if( that.newIntroduce === '' ){
                that.addTips = 'Please fill in a brief introduction';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else {
                that.isClick = true;
                var answerOk = CryptoJS.MD5(that.newAnswerOk).toString().slice(-6);
                var answerErr1 = CryptoJS.MD5(that.newAnswerErr1).toString().slice(-6);
                var answerErr2 = CryptoJS.MD5(that.newAnswerErr2).toString().slice(-6);
                var arr1 = [answerOk, answerErr1, answerErr2];
                var arr2 = ['newAnswerOk', 'newAnswerErr1', 'newAnswerErr2'];
                var option = [];
                for(var i=0; i<arr1.length; i++){
                    var obj = {};
                    obj.id = arr1[i];
                    obj.content = that[arr2[i]];
                    obj.order = Math.floor(Math.floor(Math.random() * 1000000));
                    option.push(obj);
                }
                // option[answerOk] = that.newAnswerOk;
                // option[answerErr1] = that.newAnswerErr1;
                // option[answerErr2] = that.newAnswerErr2;
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/exam/create',
                    type: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: JSON.stringify({
                        "stem": that.newTopic,
                        "option": option,
                        "answer": answerOk,
                        "level": that.newLevel,
                        "dictid": that.newCategory,
                        "intro": that.newIntroduce
                    }),
                    success: function(data) {
                        that.isClick = false;
                        if (data.returncode == '301') {
                            that.addTips = 'Parameter error';
                            setTimeout(function() {
                                that.addTips = '';
                            }, 1000);
                        } else if (data.returncode == '303') {
                            that.addTips = 'Server error';
                            setTimeout(function() {
                                that.addTips = '';
                            }, 1000);
                        } else if (data.returncode == '302') {
                            that.addTips = 'Current administrator unassigned area';
                            setTimeout(function() {
                                that.addTips = '';
                            }, 1000);
                        } else if (data.returncode == '200') {
                            that.addTips2 = 'Operation is successful';
                            setTimeout(function() {
                                $('#myModal').modal('hide');
                                that.addTips2 = '';
                                that.questionsListFn(that.page, that.size);
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addTopicFn);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }

                    },
                    fail: function() {
                        that.isClick = false;
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }
        },

        questionsListFn(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/exam/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.questionsDataList = [];
                        that.questionsDataList = data.data.data;
                        if (page > data.data.totalPageNum) {
                            that.questionsListFn(data.data.totalPageNum, size);
                            return false;
                        } else if (page <= 0) {
                            return false;
                        } else {
                            that.page = page;
                            that.pageL = [];
                            let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                            let maxPage = Math.min(data.data.totalPageNum, Math.ceil(page / 5) * 5);
                            for (let i = pageStart; i <= maxPage; i++) {
                                that.pageL.push(i);
                            }
                            that.AMtips1 = 'The request is successful';;
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }

                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.questionsListFn(that.page, that.page)
                        });
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        },

        searchAdmin() {
            this.questionsListFn(this.page, this.size);
        },



        resetUpdate(id, stem, option, level, dictid, answer, intro) {
            const that = this;
            var index = 0;
            for(var i in option){
                if( option[i].id == answer ){
                    index = i;
                }
            }
            this.updateId = id;
            this.updateTopic = stem;
            this.updateAnswerOk = option[index].content;
            this.updateAnswerErr1 =  option[1].content;
            this.updateAnswerErr2 =  option[2].content;

            this.updateLevel = level||'';

            this.updateIntroduce = intro;

            this.upTips1 = '';
            this.upTips2 = '';
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/getall',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "code": 'million_dict'
                },
                success: function(data){
                    let code = data.returncode;
                    // console.log(data)
                    $('#updateModal').modal('show');
                    if(code == 200){
                        that.typeList = data.data;
                        that.updateCategory = dictid||'';
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '304') {
                        that.upTips1 = 'Do without a dictionary';
                        setTimeout(function() {
                            that.upTips1 = '';
                        }, 1500);
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.resetUpdate(id, stem, option, level, dictid)});
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
        },


        update() {
            const that = this;
            if ( that.updateTopic === '' ) {
                this.upTips1 = 'Please fill out the exam';
                setTimeout(function() {
                    that.upTips1 = ''
                }, 1000)
            } else if( that.updateAnswerOk === '' || that.updateAnswerErr1 === '' || that.updateAnswerErr2 === '' ){
                that.upTips1 = 'Please complete the options.';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
            } else if ( that.updateLevel === '' ) {
                that.upTips1 = 'Please choose the difficulty degree.';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
            } else if( that.updateCategory === '' ){
                that.upTips1 = 'Please select category';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
            } else if( that.updateIntroduce === '' || that.updateIntroduce === null || that.updateIntroduce === undefined ){
                that.upTips1 = 'Please fill in a brief introduction';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
            } else {
                that.isClick = true;
                var answerOk = CryptoJS.MD5(that.updateAnswerOk).toString().slice(-6);
                var answerErr1 = CryptoJS.MD5(that.updateAnswerErr1).toString().slice(-6);
                var answerErr2 = CryptoJS.MD5(that.updateAnswerErr2).toString().slice(-6);
                var arr1 = [answerOk, answerErr1, answerErr2];
                var arr2 = ['updateAnswerOk', 'updateAnswerErr1', 'updateAnswerErr2'];
                var option = [];
                for(var i=0; i<arr1.length; i++){
                    var obj = {};
                    obj.id = arr1[i];
                    obj.content = that[arr2[i]];
                    obj.order = Math.floor(Math.floor(Math.random() * 1000000));
                    option.push(obj);
                }
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/exam/update',
                    type: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: JSON.stringify({
                        "id": that.updateId,
                        "stem": that.updateTopic,
                        "option": option,
                        "answer": answerOk,
                        "level": that.updateLevel,
                        "dictid": that.updateCategory,
                        "intro": that.updateIntroduce
                    }),
                    success: function(data) {
                        that.isClick = false;
                        if (data.returncode == '301') {
                            that.upTips1 = 'Parameter error';
                            setTimeout(function() {
                                that.upTips1 = '';
                            }, 1000);
                        } else if (data.returncode == '302') {
                            that.upTips1 = 'Current administrator unassigned area';
                            setTimeout(function() {
                                that.upTips1 = '';
                            }, 1000);
                        } else if (data.returncode == '200') {
                            that.upTips1 = '';
                            that.upTips2 = 'Operation is successful';
                            that.questionsListFn(that.page, that.size);
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        }  else {
                            utils.handleLogOut(data.returncode, that);
                        }

                    },
                    fail: function() {
                        that.isClick = false;
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }
        },

        getDeleteIdFn (id) {
            this.deleteId = id;
        },
        deleteQuestionFn() {
            const that = this;
            that.isClick = true;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/exam/remove',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "get",
                data: {
                    "id": that.deleteId
                },
                success: function (data) {
                    that.isClick = false;
                    if (data.returncode == '200') {
                        that.delTips2 = 'Operation is successful';
                        that.ziDicListFn(that.ziPage, that.size);
                        setTimeout(function () {
                            that.delTips2 = '';
                            $('#deleteModel').modal('hide');
                        }, 500);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.deleteQuestionFn);
                    } else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function () {
                    that.isClick = false;
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        },
        getJoinExamIdFn (id) {
            this.examId = id;
            this.millionid = '';
            this.getIssueData();
        },
        //获取期号列表
        getIssueData() {
            const that = this;
            that.issueData = [];
            $.ajax({
                url: that.$store.state.rootUrl3 + '/million/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "get",
                data: {
                    "page": 1,
                    "size": 999
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        console.log(data)
                        that.issueData = data.data.data;
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.getIssueData);
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
        },

        joinFn() {
            const that = this;
            that.isClick = true;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/million/exam/create',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "examid": that.examId,
                    "millionid": that.millionid,
                    "round": that.round
                },
                success: function(data){
                    that.isClick = false;
                    let code = data.returncode;
                    if(code == 200){
                        that.upTips1 = '';
                        that.upTips2 = 'Operation is successful';
                        that.questionsListFn(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#joinModel').modal('hide');
                        }, 500);
                    } else if (code == '306') {
                        that.upTips2 = '';
                        that.upTips1 = 'The limit of activity topic is full.';
                        setTimeout(function() {
                            that.upTips1 = '';
                            $('#joinModel').modal('hide');
                        }, 1500);
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.joinFn);
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    that.isClick = false;
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
        },


        pageBegin() {
            const that = this;
            that.page = 1;
            that.questionsListFn(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.questionsListFn(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.questionsListFn(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.questionsListFn(that.page, that.size);
        },

        show() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/getall',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "code": 'million_dict'
                },
                success: function(data){
                    let code = data.returncode;
                    console.log(data)
                    if(code == 200){
                        that.typeList = data.data;
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '304') {
                        that.addTips = 'Do without a dictionary';
                        setTimeout(function() {
                            that.addTips = '';
                        }, 1500);
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.show);
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
        },

    },


    mounted() {
        this.$store.dispatch('tabChanger', 66);
        this.$store.dispatch('subChanger', 'sub10');

        // console.log(this.$store.state.tabIndex);
        this.questionsListFn(this.page, this.size);
    }
}
</script>
