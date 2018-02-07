<style scope>
.use{
    color:#67C23A;
}
.used{
    color:#F56C6C;
}
.finish{
    color:#E6A23C;
}
</style>
<template id="">
<div class="">
    <div class="fuDic" v-if="!detail">
        <div class="AM-top" style="text-align:left">
            <button type="button" style="margin-left:0;margin-top:8px;" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetFuDicFn">New Activity</button>
            <span class="AM-tips1" style="left:40%">{{AMtips1}}</span>
            <span class="AM-tips2" style="left:40%">{{AMtips2}}</span>
        </div>
        <table class="table table-striped table-hover AM-table">
            <!-- <caption class = "AM-cap">代理商信息</caption> -->
            <thead>
                <tr>
                    <th class="AM-agentID">代理商id</th>
                    <th style="min-width:110px;">NO.</th>
                    <th>Status</th>
                    <th>Room</th>
                    <th>Type</th>
                    <th>Questions</th>
                    <th>Max revive</th>
                    <th>Due(s)</th>
                    <th>Prize</th>
                    <th>Mean</th>
                    <th>Player</th>
                    <th>Winner</th>
                    <th>Start time</th>
                    <th>Operation</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(agent, index) in fuDicDataList">
                    <td class="AM-agentID">{{agent._id}}</td>
                    <td>{{agent.name}}</td>
                    <td :class="agent.status==1?'use' : (agent.status==2?'finish':(agent.status==3?'used':''))">{{activityStatus(agent.status)}}</td>
                    <td>{{agent.pid}}</td>
                    <td>{{isType(agent.type)}}</td>
                    <td>{{agent.num_round}}</td>
                    <td>{{agent.max_revive}}</td>
                    <td>{{agent.seconds}}</td>
                    <td>{{agent.num_prize}}</td>
                    <td>{{agent.ave_prize}}</td>
                    <td>{{agent.num_player}}</td>
                    <td>{{agent.num_winner}}</td>
                    <td>{{moment(agent.start_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                    
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                                Select
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="javascript: void(0)" @click="seeInfo(agent._id, agent.name, agent.status, agent.num_round)">Generate Q</a></li>
                                <li><a href="javascript: void(0)" @click="getUpdatePar(agent._id, agent.name, agent.type, agent.num_round, agent.num_prize, agent.start_at, agent.seconds, agent.max_revive, agent.liveuserid)" data-toggle='modal'
                                       data-target="#updateAgentModal">update</a></li>
                            </ul>

                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="AMnav">
            <ul class="pagination" v-if="fuPageShow">
                <li><a href="javascript:void(0);" @click="pageBegin(fuDicListFn, fuPage)">Begin</a></li>
                <li><a href="javascript:void(0);" @click="pagePre(fuDicListFn, fuPage)">&laquo;</a></li>
                <div class="pageL">
                    <li v-for="pageN in fuPageList">
                        <a href="javascript:void(0);" v-bind:class="pageN == fuPage ? 'activePage2' : ''"
                           @click="fuDicListFn(pageN, size)">{{pageN}}</a>
                    </li>
                </div>
                <li><a href="javascript:void(0);" @click="pageNext(fuDicListFn, fuPage)">&raquo;</a></li>
                <li><a href="javascript:void(0);" @click="pageEnd(fuDicListFn, fuPage)">End</a></li>
            </ul>
        </nav>
        <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">New quizzes</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Issue (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" readOnly id="inputEmail1" class="form-control" placeholder="Issue" v-model.trim="fu_newIssue">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail4" class="col-sm-2 control-label">Start time (*)</label>
                                <div class="col-sm-10">
                                    <input @change="new_handleChangeTime" type="datetime-local" style="width: 50%;" id="inputEmail1" class="form-control" v-model.trim="fu_newStart_time">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Live Room (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="fu_newLiveroom">
                                        <option value="">Please select the room type.</option>
                                        <option v-for="k in roomType" :value="k._id">{{k.loginname}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Round (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" id="inputEmail1" class="form-control" placeholder="Round" v-model.trim="fu_newRound">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Count down (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" id="inputEmail1" class="form-control" placeholder="Count down" v-model.trim="fu_newCountDown">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail4" class="col-sm-2 control-label">Type (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="fu_newType">
                                        <option value="">Please select the reward type.</option>
                                        <option value="1">diamonds</option>
                                        <option value="2">cash</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Bonus (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" id="inputEmail1" class="form-control" placeholder="Bonus" v-model.trim="fu_newPrize">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Max revive (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" id="inputEmail1" class="form-control" placeholder="Max revive" v-model.trim="fu_newMax_revive">
                                </div>
                            </div>
                            <div class="addTips">
                                {{addATips1}}
                            </div>
                            <div class="addTips2">
                                {{addATips2}}
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" :disabled="isClick" @click="addFuDicFn">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bs-example-modal-lg" id="updateAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">Update quizzes</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Issue (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" readOnly id="inputEmail1" class="form-control" placeholder="Issue" v-model.trim="fu_updateIssue">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail4" class="col-sm-2 control-label">Start time (*)</label>
                                <div class="col-sm-10">
                                    <input @change="update_handleChangeTime" type="datetime-local" style="width: 50%;" id="inputEmail1" class="form-control" v-model.trim="fu_updateStart_time">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Live Room (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="fu_updateLiveroom">
                                        <option value="">Please select the room type.</option>
                                        <option v-for="k in roomType" :value="k._id">{{k.loginname}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Round (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" id="inputEmail1" class="form-control" placeholder="Round" v-model.trim="fu_updateRound">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Count down (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" id="inputEmail1" class="form-control" placeholder="Count down" v-model.trim="fu_updateCountDown">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail4" class="col-sm-2 control-label">Type (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="fu_updateType">
                                        <option value="">Please select the reward type.</option>
                                        <option value="1">diamonds</option>
                                        <option value="2">cash</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Bonus (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" id="inputEmail1" class="form-control" placeholder="Bonus" v-model.trim="fu_updatePrize">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Max revive (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" id="inputEmail1" class="form-control" placeholder="Bonus" v-model.trim="fu_updateMax_revive">
                                </div>
                            </div>
                            <div class="addTips">
                                {{addATips1}}
                            </div>
                            <div class="addTips2">
                                {{addATips2}}
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" :disabled="isClick" @click="updateFuDicFn">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ziDic" v-if="detail">
        <div class="AM-top" style="margin-top: 10px;">
            <button style="float: left; margin-top: 3px; margin-right:5%;" type="button" class="btn btn-primary AM-add" @click="goBack">BACK
            </button>
            <button style="float: left; margin-top: 3px; margin-right:5%;" type="button" class="btn btn-primary AM-add"
                     @click="resetZiDicFn">Generate
            </button>
            <button style="float: left; margin-top: 3px;" type="button" data-target="#copyModal" class="btn btn-primary AM-add"
                     @click="getGuessList">Copy
            </button>
            <span class="AM-tips1" style="left:40%">{{info2AMtips1}}</span>
            <span class="AM-tips2" style="left:40%">{{info2AMtips2}}</span>
        </div>
        <table class="table table-striped table-hover AM-table">
            <!-- <caption class = "AM-cap">代理商信息</caption> -->
            <thead>
                <tr>
                    <th class="AM-agentID">代理商id</th>
                    <th>NO.</th>
                    <th style="width:30%">Question</th>
                    <th>Level</th>
                    <th>Category</th>
                    <th>round</th>
                    <th>status</th>
                    <th>operation</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(agent, index) in ziDicDataList">
                    <td class="AM-agentID">{{agent._id}}</td>
                    <td>{{fuDicName}}</td>
                    <td style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{agent.exam.stem}}</td>
                    <td>{{agent.exam.level}}</td>
                    <td>{{agent.exam.dict_name}}</td>
                    <td>{{agent.round}}</td>
                    <td :class="agent.status==1?'use' : (agent.status==2?'used':'')">{{isStatus(agent.status)}}</td>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                                Select
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li v-if="fuStatus==0&&agent.status==0"><a href="javascript: void(0)" @click="getZiDicIdFn(agent._id, agent.examid)" data-toggle='modal'
                                       data-target="#delModalZiDic">Delete</a></li>
                                <li><a href="javascript: void(0)" data-target="#questionModal" @click="getQuestionFn(agent.exam)">Detail</a></li>
                                <li><a href="javascript: void(0)" data-target="#editQuestionInfoModal" @click="editQuestionFn(agent.exam, agent.examid)">Edit</a></li>
                            </ul>

                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="AMnav">
            <ul class="pagination" v-if="ziPageShow">
                <li><a href="javascript:void(0);" @click="pageBegin(ziDicListFn, ziPage)">Begin</a></li>
                <li><a href="javascript:void(0);" @click="pagePre(ziDicListFn, ziPage)">&laquo;</a></li>
                <div class="pageL">
                    <li v-for="pageN in ziPageList">
                        <a href="javascript:void(0);" v-bind:class="pageN == ziPage ? 'activePage2' : ''"
                           @click="ziDicListFn(pageN, size)">{{pageN}}</a>
                    </li>
                </div>
                <li><a href="javascript:void(0);" @click="pageNext(ziDicListFn, ziPage)">&raquo;</a></li>
                <li><a href="javascript:void(0);" @click="pageEnd(ziDicListFn, ziPage)">End</a></li>
            </ul>
        </nav>
        <div class="modal fade bs-example-modal-lg" id="questionModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">Exam</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Exam (*)</label>
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
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Difficulty level</label>
                                <div class="col-sm-10">
                                    <select class="form-control" disabled name="" id="exampleInputEmail1" v-model.trim="questionLevel">
                                        <option value="">Please choose the difficulty degree.</option>
                                        <option value="1">easy</option>
                                        <option value="2">medium</option>
                                        <option value="3">hard</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label hasMR">Category (*)</label>
                                <select class="form-control acName col-sm-10" disabled v-model.trim="questionClass">
                                    <option value="">Please select the category</option>
                                    <option v-for = "type in typeList" v-bind:value="type._id">
                                        {{type.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Introduce (*)</label>
                                <div class="col-sm-10">
                                    <textarea readOnly style="resize:none;" class="form-control" v-model="introduce" name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <div class="addTips">
                                {{addATips1}}
                            </div>
                            <div class="addTips2">
                                {{addATips2}}
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
        <div class="modal fade bs-example-modal-lg" id="editQuestionInfoModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">Edit</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Exam (*)</label>
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
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Difficulty level (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" disabled name="" id="exampleInputEmail1" v-model.trim="questionLevel">
                                        <option value="">Please choose the difficulty degree.</option>
                                        <option value="1">easy</option>
                                        <option value="2">medium</option>
                                        <option value="3">hard</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label hasMR">Category (*)</label>
                                <select class="form-control acName col-sm-10" disabled v-model.trim="questionClass">
                                    <option value="">Please select the category</option>
                                    <option v-for = "type in typeList" v-bind:value="type._id">
                                        {{type.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Introduce (*)</label>
                                <div class="col-sm-10">
                                    <textarea style="resize:none;" class="form-control" v-model="introduce" name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <div class="addTips">
                                {{addATips1}}
                            </div>
                            <div class="addTips2">
                                {{addATips2}}
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" :disabled="isClick" @click="editQuestionConfirmFn">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bs-example-modal-lg" id="delModalZiDic" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                class="sr-only">Close</span></button>
                        <h4 class="modal-title" style="text-align: center">Delete</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <h5 style="text-align: center;">Are you sure to delete the current question ?</h5>

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
                        <button type="button" class="btn btn-primary" :disabled="isClick" @click="delZiDicFn">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bs-example-modal-lg" id="copyModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                class="sr-only">Close</span></button>
                        <h4 class="modal-title" style="text-align: center">Copy Activity</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label hasMR">Activity NO. (*)</label>
                                <select class="form-control acName col-sm-10" v-model.trim="activityNo">
                                    <option value="">Please select activity</option>
                                    <option v-for = "type in activity" v-bind:value="[type._id, type.num_round]">
                                        {{type.name}}
                                    </option>
                                </select>
                            </div>

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
                        <button type="button" class="btn btn-primary" :disabled="isClick" @click="copyActivityFn">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import utils from '../utils/utils.js';
const moment = require('moment');
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export default {
    data() {
        return {
            moment: moment,
            //父类 字典
            fuDicDataList: [],
            fuDicName: "",
            fu_newIssue: "",
            fu_newStart_time: "",
            fu_newType: "",
            fu_newCountDown: "",
            fu_newPrize: "",
            fu_newRound: "",
            fu_newMax_revive: '',
            fu_newLiveroom: '',

            fuStatus: '',

            fu_updateIssue: "",
            fu_updateStart_time: "",
            fu_updateType: "",
            fu_updateCountDown: "",
            fu_updatePrize: "",
            fu_updateRound: "",
            fu_updateMax_revive: "",
            fu_updateLiveroom: '',

            fuDicId: '',

            fuPage: 1,
            fuPageShow: true,
            fuPageList: [],

            //子类 字典
            ziDicDataList: [],
            ziDicName: "",
            zi_newIssue: "",
            zi_newStart_time: "",

            ziDicId: '',
            delExamId: '',

            ziPage: 1,
            ziPageShow: false,
            ziPageList: [],

            detail: false,

            questionExam: '',
            questionOption: '',
            questionAnswer: '',
            questionLevel: '',
            questionClass: '',

            typeList: [],

            addATips1: "",
            addATips2: "",
            delTips1: "",
            delTips2: "",
            upTips1: "",
            upTips2: "",
            size: 10,
            pagesShow: false,
            agencyN: "",
            agencyU: "",
            agencyUpID: "",
            AMtips1: "",
            AMtips2: "",
            info2AMtips1: "",
            info2AMtips2: "",

            examId: '',
            isClick: false,
            prizeId: '',

            introduce: "",
            editId: '',
            activity: [],
            activityNo: '',
            round: '',

            roomType: [],
        }
    },

    methods: {
        handleModalHide() {
            const that = this;
            $("#addAgentModal").on("hidden.bs.modal", function(){
                that.isClick = false;
            })
            $("#updateAgentModal").on("hidden.bs.modal", function(){
                that.isClick = false;
            })
            $("#sendAnswer").on("hidden.bs.modal", function(){
                that.isClick = false;
            })
            $("#delModalZiDic").on("hidden.bs.modal", function(){
                that.isClick = false;
            })
            $("#copyModal").on("hidden.bs.modal", function(){
                that.isClick = false;
            })
        },
        activityStatus(status) {
            switch(status){
                case 0: return 'Waiting';
                case 1: return 'Beginning';
                case 2: return 'Finished';
                case 3: return 'End';
            }
        },
        isType(type) {
            switch(type){
                case 1: return 'diamonds';
                case 2: return 'cash';
            }
        },
        isAve(ave) {
            return ave + 'THB/人'
        },
        isStatus(status){
            // console.log(row)
            switch(status){
                case 0: return 'Available';
                case 1: return 'Using';
                case 2: return 'Occupied';
            }
        },
        new_handleChangeTime() {
            this.fu_newIssue = new Date(this.fu_newStart_time).Format("yyyyMMddhhmm");
        },
        update_handleChangeTime() {
            this.fu_updateIssue = new Date(this.fu_updateStart_time).Format("yyyyMMddhhmm");
        },
        getQuestionFn(exam) {
            const that = this;
            this.questionExam = exam.stem;
            this.questionOption = exam.option;
            this.questionAnswer = exam.answer;
            this.questionLevel = exam.level;
            this.introduce = exam.intro;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/getall',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "code": "million_dict"
                },
                success: function(data){
                    let code = data.returncode;
                    // console.log(data)
                    if(code == 200){
                        that.typeList = data.data;
                        that.questionClass = exam.dictid||'';
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '304') {
                        that.addATips1 = 'Do without a dictionary';
                        setTimeout(function() {
                            that.addATips1 = '';
                        }, 1500);
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.getQuestionFn(exam)});
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
            this.$nextTick(function(){
                $('#questionModal').modal('show');
            })
        },
        editQuestionFn(exam, id) {
            const that = this;
            this.questionExam = exam.stem;
            this.questionOption = exam.option;
            this.questionAnswer = exam.answer;
            this.questionLevel = exam.level;
            this.introduce = exam.intro;
            this.editId = id;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/getall',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "code": "million_dict"
                },
                success: function(data){
                    let code = data.returncode;
                    // console.log(data)
                    if(code == 200){
                        that.typeList = data.data;
                        that.questionClass = exam.dictid||'';
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '304') {
                        that.addATips1 = 'Do without a dictionary';
                        setTimeout(function() {
                            that.addATips1 = '';
                        }, 1500);
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.editQuestionFn(exam)});
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
            this.$nextTick(function(){
                $('#editQuestionInfoModal').modal('show');
            })
        },
        editQuestionConfirmFn() {
            const that = this;
            if( that.introduce === '' ){
                that.addATips1 = 'Please fill in a brief introduction';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
            } else {
                that.isClick = true;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/exam/updateintro',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "post",
                    data: {
                        "id": that.editId,
                        "intro": that.introduce
                    },
                    success: function(data){
                        that.isClick = false;
                        let code = data.returncode;
                        // console.log(data)
                        if(code == 200){
                            that.addATips2 = 'Operation is successful';
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#editQuestionInfoModal').modal('hide');
                                that.ziDicListFn(that.ziPage, that.size);
                            }, 1000);
                        } else if (code == '301') {
                            console.log('Parameter error');
                            that.addATips1 = 'Parameter error';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 1000);
                        } else if (code == '303') {
                            that.addATips1 = 'Server error';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 2000);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.editQuestionConfirmFn);
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
        //父类 字典
        //列表
        fuDicListFn(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/million/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size
                },
                success: function(data){
                    let code = data.returncode;
                    // console.log(data)
                    if(code == 200){
                        that.fuDicDataList = data.data.data;
                        that.fuPageShow = true;
                        that.fuPageList = [1];
                        if (page > data.data.totalPageNum) {
                            that.fuDicListFn(data.data.totalPageNum, size);
                            return false;
                        } else if (page <= 0) {
                            return false;
                        } else {
                            that.fuPage = page;
                            that.fuPageList = [];
                            let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                            let maxPage = Math.min(data.data.totalPageNum, Math.ceil(page / 5) * 5);
                            for (let i = pageStart; i <= maxPage; i++) {
                                that.fuPageList.push(i);
                            }
                            that.AMtips1 = 'The request is successful';;
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.fuDicListFn(that.fuPage, that.size)});
                    } else {
                       utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
        },
        //新增
        resetFuDicFn() {
            const that = this;
            that.fu_newIssue = "";
            that.fu_newStart_time = "";
            that.fu_newType = "";
            that.fu_newCountDown = "";
            that.fu_newPrize = "";
            that.fu_newRound = "";
            that.fu_newMax_revive = "3";
            that.fu_newLiveroom = '';
            $.ajax({
                url: that.$store.state.rootUrl3 + '/liveuser/getall',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "get",
                data: {
                    "type": 5
                },
                success: function(data){
                    let code = data.returncode;
                    // console.log(data)
                    if(code == 200){
                        that.roomType = data.data;
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.getGuessList()});
                    } else {
                       utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
        },
        addFuDicFn() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.fu_newStart_time === '') {
                that.addATips1 = 'Please fill in the start time.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_newLiveroom === '') {
                that.addATips1 = 'Please select the room type.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_newRound === '') {
                that.addATips1 = 'Please fill in the round.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_newCountDown === '') {
                that.addATips1 = 'Please fill in the countdown.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_newType === '') {
                that.addATips1 = 'Please select the reward type.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_newPrize === '') {
                that.addATips1 = 'Please fill in the award amount.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_newMax_revive === '') {
                that.addATips1 = 'Please fill in the maximum resurrection times.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                that.isClick = true;
                // var time = new Date(that.fu_newStart_time).Format("yyyy-MM-ddThh:mm:ss");
                var time = new Date(that.fu_newStart_time);
                var num = '';
                // console.log(time)
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/million/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "name": that.fu_newIssue,
                        "type": that.fu_newType,
                        "num_prize": that.fu_newPrize,
                        "num_round": that.fu_newRound,
                        "start_at": time,
                        "seconds": that.fu_newCountDown,
                        "max_revive": that.fu_newMax_revive,
                        "liveuserid": that.fu_newLiveroom
                    },
                    success: function(data) {
                        that.isClick = false;
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = 'Operation is successful';
                            that.fuDicListFn(that.fuPage, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addFuDicFn);
                        } else if (code == '302') {
                            that.addATips1 = 'Current administrator unassigned area';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 1500);
                        } else if (code == '301') {
                            that.addATips1 = 'Parameter Error';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 1500);
                        } else if (code == '303') {
                            that.addATips1 = 'Server Error';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 1500);
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
        //update
        getUpdatePar(id, name, type, num_round, num_prize, start_at, seconds, max_revive, roomtype) {
            const that = this;
            that.fuDicId = id;
            that.fu_updateIssue = name;
            that.fu_updateType = type;
            that.fu_updateRound = num_round;
            that.fu_updatePrize = num_prize;
            that.fu_updateStart_time = new Date(start_at).Format("yyyy-MM-ddThh:mm:ss");
            // console.log(that.fu_updateStart_time)
            that.fu_updateCountDown = seconds;
            that.fu_updateMax_revive = max_revive;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/liveuser/getall',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "get",
                data: {
                    "type": 5
                },
                success: function(data){
                    let code = data.returncode;
                    // console.log(data)
                    if(code == 200){
                        that.roomType = data.data;
                        that.fu_updateLiveroom = roomtype;
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.getGuessList()});
                    } else {
                       utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
        },
        updateFuDicFn() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.fu_updateStart_time === '') {
                that.addATips1 = 'Please fill in the start time.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_updateLiveroom === '') {
                that.addATips1 = 'Please select the room type.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_updateRound === '') {
                that.addATips1 = 'Please fill in the round.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_updateCountDown === '') {
                that.addATips1 = 'Please fill in the countdown.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_updateType === '') {
                that.addATips1 = 'Please select the reward type.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_updatePrize === '') {
                that.addATips1 = 'Please fill in the award amount.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_updateMax_revive === '' || that.fu_updateMax_revive === null ) {
                that.addATips1 = 'Please fill in the maximum resurrection times.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                that.isClick = true;
                var time = new Date(that.fu_updateStart_time);
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/million/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "id": that.fuDicId,
                        "name": that.fu_updateIssue,
                        "type": that.fu_updateType,
                        "num_prize": that.fu_updatePrize,
                        "num_round": that.fu_updateRound,
                        "start_at": time,
                        "seconds": that.fu_updateCountDown,
                        "max_revive": that.fu_updateMax_revive,
                        "liveuserid": that.fu_updateLiveroom
                    },
                    success: function(data) {
                        that.isClick = false;
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = 'Operation is successful';
                            that.fuDicListFn(that.fuPage, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#updateAgentModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.updateFuDicFn);
                        } else if (code == '302') {
                            that.addATips1 = 'Current administrator unassigned area';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 1500);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function() {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }
        },
        //子类 字典
        //返回到 父字典
        goBack() {
            const that = this;
            setTimeout(function(){that.detail = false;},100)
            this.fuDicListFn(this.fuPage, this.size);
            that.ziPageShow = false;
        },
        //获取活动
        getGuessList() {
            $("#copyModal").modal('show');
            const that = this;
            this.activityNo = '';
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
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
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
            console.log(arr)
            return arr;
        },
        copyActivityFn() {
            const that = this;
            var round = this.activityNo[1];
            if( round != that.round ){
                that.delTips1 = 'The number of questions in the two activities is inconsistent';
                setTimeout(function() {
                    that.delTips1 = '';
                }, 1500);
                return false;
            }else{
                that.isClick = true;
                $.ajax({
                url: that.$store.state.rootUrl3 + '/million/exam/copy',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "millionid": that.fuDicId,
                    "target_millionid": that.activityNo[0]
                },
                type: "GET",
                success: function (data) {
                    that.isClick = false;

                    if (data.returncode == '200') {
                        that.delTips2 = 'Operation is successful';
                        that.ziDicListFn(this.ziPage, this.size);
                        setTimeout(function () {
                            that.delTips2 = '';
                            $('#copyModal').modal('hide');
                        }, 1000);
                    } else if (data.returncode == '301') {
                        that.delTips1 = 'Parameter error';
                        setTimeout(function() {
                            that.delTips1 = '';
                        }, 1500);
                    } else if (data.returncode == '303') {
                        that.delTips1 = 'Server error';
                        setTimeout(function() {
                            that.delTips1 = '';
                        }, 1500);
                    } else if (data.returncode == '305') {
                        that.delTips1 = 'The activity has a test question that does not allow copy';
                        setTimeout(function() {
                            that.delTips1 = '';
                        }, 1500);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.delZiDicFn);
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
            }
        },
        //列表
        seeInfo(id, name, status, round) {
            const that = this;
            this.fuDicId = id;
            this.fuDicName = name;
            this.ziPage = 1;
            this.fuStatus = status;
            this.round = round;
            this.fuPageShow = false;
            this.ziDicListFn(this.ziPage, this.size);
            setTimeout(function(){that.detail = true;},100)
        },
        ziDicListFn(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/million/exam/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "millionid": that.fuDicId,
                    "page": page,
                    "size": size
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        console.log(data)
                        that.ziDicDataList = data.data.data;
                        that.ziPageShow = true;
                        that.ziPageList = [1];
                        if (page > data.data.totalPageNum) {
                            that.ziDicListFn(data.data.totalPageNum, size);
                            return false;
                        } else if (page <= 0) {
                            return false;
                        } else {
                            that.ziPage = page;
                            that.ziPageList = [];
                            let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                            let maxPage = Math.min(data.data.totalPageNum, Math.ceil(page / 5) * 5);
                            for (let i = pageStart; i <= maxPage; i++) {
                                that.ziPageList.push(i);
                            }
                            that.info2AMtips1 = 'The request is successful';;
                            setTimeout(function() {
                                that.info2AMtips1 = '';
                            }, 500);
                        }
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.ziDicListFn(that.ziPage, that.size)});
                    } else {
                       utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
        },
        //新增
        resetZiDicFn() {
            const that = this;
            // that.zi_newIssue = "";
            // that.zi_newStart_time = "";
            $.ajax({
                url: that.$store.state.rootUrl3 + '/million/exam/randomadd',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "millionid": that.fuDicId
                },
                type: "POST",
                success: function (data) {
                    console.log(data)
                    if (data.returncode == '200') {
                        that.ziDicListFn(this.ziPage, this.size);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.resetZiDicFn);
                    } else if (data.returncode == '305') {
                        that.info2AMtips2 = 'The subject is full.';
                        setTimeout(function() {
                            that.info2AMtips2 = '';
                        }, 2000);
                    } else if (data.returncode == '306') {
                        that.info2AMtips2 = 'The question bank is not enough.';
                        setTimeout(function() {
                            that.info2AMtips2 = '';
                        }, 2000);
                    } else if (data.returncode == '301') {
                        that.info2AMtips2 = 'Parameter error';
                        setTimeout(function() {
                            that.info2AMtips2 = '';
                        }, 2000);
                    } else if (data.returncode == '302') {
                        that.info2AMtips2 = 'Current administrator unassigned area';
                        setTimeout(function() {
                            that.info2AMtips2 = '';
                        }, 2000);
                    } else if (data.returncode == '307') {
                        that.info2AMtips2 = 'The current person is not the administrator of this activity.';
                        setTimeout(function() {
                            that.info2AMtips2 = '';
                        }, 2000);
                    } else if (data.returncode == '303') {
                        that.info2AMtips2 = 'Server error';
                        setTimeout(function() {
                            that.info2AMtips2 = '';
                        }, 2000);
                    } else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function () {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        },
        //删除
        getZiDicIdFn(id, examid) {
            this.ziDicId = id;
            this.delExamId = examid;
        },
        delZiDicFn() {
            const that = this;
            that.isClick = true;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/million/exam/delete',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": that.ziDicId,
                    "examid": that.delExamId
                },
                success: function (data) {
                    that.isClick = false;
                    if (data.returncode == '200') {
                        that.delTips2 = 'Operation is successful';
                        that.ziDicListFn(that.ziPage, that.size);
                        setTimeout(function () {
                            that.delTips2 = '';
                            $('#delModalZiDic').modal('hide');
                        }, 1000);
                    } else if (data.returncode == '301') {
                        that.delTips1 = 'Parameter error';
                        setTimeout(function() {
                            that.delTips1 = '';
                            $('#delModalZiDic').modal('hide');
                        }, 1500);
                    } else if (data.returncode == '303') {
                        that.delTips1 = 'Server error';
                        setTimeout(function() {
                            that.delTips1 = '';
                            $('#delModalZiDic').modal('hide');
                        }, 1500);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.delZiDicFn);
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

        pageBegin(callback, page) {
            const that = this;
            page = 1;
            callback(page, that.size);
        },
        pageEnd(callback, page) {
            const that = this;
            page = Number.POSITIVE_INFINITY;
            callback(page, that.size);
        },
        pagePre(callback, page) {
            const that = this;
            if (page > 1) {
                page--;
                callback(page, that.size);
            } else {
                return false;
            }

        },
        pageNext(callback, page) {
            const that = this;
            page++;
            callback(page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 68);
        this.$store.dispatch('subChanger', 'sub10');
        this.fuDicListFn(this.fuPage, this.size);
        this.handleModalHide();
    }
}
</script>
