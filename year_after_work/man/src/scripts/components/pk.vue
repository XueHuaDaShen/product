<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float: left; margin-top: 3px;" type="button" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddUnion">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>

    </div>
    <table class="table table-striped table-hover AM-table">
        <thead>
            <tr>
                <th class="AM-agentID">活动id</th>
                <th>name</th>
                <!-- <th>type</th> -->
                <th>开始时间</th>
                <th>结束时间</th>
                <th>投票时长(s)</th>
                <th>活动时长(s)</th>
                <th>最大投票次数</th>
                <th>每次投票消费票数</th>
                <th>中奖后每笔返票数</th>
                <th>活动状态</th>
                <th>投票状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.name}}</td>
                <!-- <td>{{agent.type}}</td> -->
                <td>{{moment(agent.start_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{moment(agent.stop_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{agent.vote_duration}}</td>
                <td>{{agent.versus_duration}}</td>
                <td>{{agent.max_votes}}</td>
                <td>{{agent.tickets_per_vote}}</td>
                <td>{{agent.tickets_per_award}}</td>
                <td>{{is_status(agent.status)}}</td>
                <td>{{is_status(agent.vote)}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li v-show="agent.status == 0"><a href="javascript: void(0)" @click="startAC(agent._id)">开始活动</a></li>
                            <li v-show="agent.status == 1"><a href="javascript: void(0)" @click="getAC(agent._id)" data-toggle='modal' data-target="#stopAcModel">关闭活动</a></li>
                            <li v-show="agent.vote == 0"><a href="javascript: void(0)" @click="startVOTE(agent._id)">开始投票</a></li>
                            <li v-show="agent.vote == 1"><a href="javascript: void(0)" @click="stopVOTE(agent._id)">关闭投票</a></li>
                        </ul>
                        <!-- <ul class="dropdown-menu" role="menu" style="min-width:0">
                            <li><a href="javascript: void(0)"><button :disabled="agent.status!=0" @click="startAC(agent._id)" class="btn btn-primary btnAMsmall">开始活动</button></a></li>
                            <li><a href="javascript: void(0)"><button :disabled="agent.status!=1" @click="stopAC(agent._id)" class="btn btn-primary btnAMsmall">关闭活动</button></a></li>
                            <li><a href="javascript: void(0)"><button :disabled="agent.vote!=0" @click="startVOTE(agent._id)" class="btn btn-primary btnAMsmall">开始投票</button></a></li>
                            <li><a href="javascript: void(0)"><button :disabled="agent.vote!=1" @click="stopVOTE(agent._id)" class="btn btn-primary btnAMsmall">关闭投票</button></a></li>
                        </ul> -->
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <nav class="AMnav">
        <ul class="pagination" v-if="pagesShow">
            <li><a href="javascript:void(0);" @click="pageBegin">Begin</a></li>
            <li><a href="javascript:void(0);" @click="pagePre">&laquo;</a></li>
            <div class="pageL">
                <li v-for="pageN in pageL">
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="unionList(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>
    <div class="modal fade bs-example-modal-lg" id="stopAcModel" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">关闭活动</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="radio-inline" style="height: 20px; font-size: 16px; margin:0 20px;" v-for="(player, index) in players">
                                <input type="radio" name="inlineRadioOptions" v-model.trim = "playersID" id="inlineRadio1" :value="player.playerid"> {{player.name}}
                            </label>
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="stopAC">确认</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增活动</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">name (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="name" v-model.trim="newname">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Pid (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" style="width: 60%;height: 32px;padding-top: 6px;float: left" placeholder="pid" v-model.trim="newpid" @change="resetPid">
                                <input class="btn btn-default" type="button" value="检查" style="float:left;height: 32px;margin: 0 30px;" @click="checkPid(newpid)"/>
                                <div class="spinner" style="margin: 6px; float: right; margin-right: 30px;"
                                     v-if="upshow3">
                                    <div class="spinner-container container1">
                                        <div class="circle1"></div>
                                        <div class="circle2"></div>
                                        <div class="circle3"></div>
                                        <div class="circle4"></div>
                                    </div>
                                    <div class="spinner-container container2">
                                        <div class="circle1"></div>
                                        <div class="circle2"></div>
                                        <div class="circle3"></div>
                                        <div class="circle4"></div>
                                    </div>
                                    <div class="spinner-container container3">
                                        <div class="circle1"></div>
                                        <div class="circle2"></div>
                                        <div class="circle3"></div>
                                        <div class="circle4"></div>
                                    </div>
                                </div>


                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Success==1">
                                    <i class="fa fa-check AM-check" aria-hidden="true"></i>
                                    正在直播
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Failure">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    未直播
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Error">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    Pid 不存在
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3not">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    请输入 Pid
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">type (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newtype">
                                    <option value="">请选择房间</option>
                                    <option value="1">999房间活动</option>
                                </select>
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">活动时长 (秒)</label>
                            <div class="col-sm-10">
                                <input type="number" min="0" class="form-control" placeholder="活动时长" v-model.trim="newversus">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">投票时长 (秒)</label>
                            <div class="col-sm-10">
                                <input type="number" min="0" class="form-control" placeholder="投票时长" v-model.trim="newvote">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">活动开始时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" class="form-control" v-model.trim="newAcStartYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" class="form-control" placeholder="HH:MM:SS" v-model.trim="newAcStartHMS">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">活动结束时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" class="form-control" v-model.trim="newAcStopYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" class="form-control" v-model.trim="newAcStopHMS">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">每次投票数 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" min="0" placeholder="每次投票数" v-model.trim="newtickets_per_vote">
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">最大投票次数 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" min="0" placeholder="最大投票次数" v-model.trim="newmax_votes">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">每次投票消费票数 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" min="0" placeholder="每次投票消费票数" v-model.trim="newtickets_per_vote">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">中奖后每笔返票数 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" min="0" placeholder="中奖后每笔返票数" v-model.trim="newtickets_per_award">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">players (*)</label>
                            <div class="col-sm-10" style="position:relative;">
                                <div class="col-sm-12">
                                    <div class="col-sm-4" style="position:relative;"  v-for="(obj, index) in medi_newplayers">
                                        <div class="col-sm-12">
                                            <span class="control-label">name:</span><input type="text" id="inputEmail3" class="form-control pk_players" placeholder="name" v-model.trim="newpname=obj.name">
                                        </div>
                                        <div class="col-sm-12">
                                            <span class="control-label pk_players">voter_color:</span>
                                            <select class="form-control" style="display:inline" v-model.trim="newcolor=obj.voter_color">
                                                <option value="">请选择颜色</option>
                                                <option value="purple">紫色</option>
                                                <option value="roseColor">玫瑰色</option>
                                                <option value="skyBlue">天蓝色</option>
                                                <option value="orange">橘色</option>
                                                <option value="orangeRed">橘红色</option>
                                                <option value="green">绿色</option>
                                                <option value="blue">蓝色</option>
                                                <option value="red">红色</option>
                                                <option value="pink">粉色</option>
                                                <option value="navyBlue">深蓝色/藏青色</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-12">
                                            <span class="control-label">voter_name:</span><input type="text" id="inputEmail3" class="form-control pk_players" placeholder="voter_name" v-model.trim="newvotername=obj.voter_name">
                                        </div>
                                        <div class="col-sm-12">
                                            <span class="control-label">order:</span><input type="number" id="inputEmail3" min="0" class="form-control pk_players" placeholder="order" v-model.trim="neworder=obj.order">
                                        </div>
                                        <div class="col-sm-12">
                                            <span class="control-label">avatar:</span><input type="text" id="inputEmail3" class="form-control o_pk_players" placeholder="avatar" v-model.trim="newavatar=obj.avatar">
                                        </div>
                                        <button type="button" :class="medi_newplayers.length<3? 'sign_hide':'sign_show'" @click="del_info(index, medi_newplayers)" class="pk_del btn btn-danger btnAMsmall">-</button>
                                    </div>
                                </div>
                                <button id="pk_add" type="button" class="btn btn-primary btnAMsmall" @click="create_info(medi_newplayers)">+</button>
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="addUnion">确认</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import utils from '../utils/utils.js';
const moment = require('moment');
export default {
    data() {
        return {
            agentL: [],
            moment: moment,
            newname: "",
            newpname: "",
            newtype: "",
            newversus: "",
            newvote: "",
            newcolor: "",
            newvotername: "",
            neworder: "",
            newavatar: "",
            newtickets_per_vote: "",
            newtickets_per_award: "",
            newmax_votes: "",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            agencyN: "",
            agencyUpID: "",
            playersID: "",
            AMtips1: "",
            AMtips2: "",
            countryID: "",
            newAcStartYMD: '',
            newAcStartHMS: '',
            newAcStopYMD: '',
            newAcStopHMS: '',
            players: [],
            newplayers: [
                {
                    name: "",
                    order: null,
                    avatar: '',
                    voter_color: '',
                    voter_name: ''
                },
                {
                    name: "",
                    order: null,
                    avatar: '',
                    voter_color: '',
                    voter_name: ''
                }
            ],
            medi_players: [],
            medi_newplayers: [],
            matchUrl: /^(((ht|f)tps?):\/\/)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,
            upshow3: false,
            upshow3Success: 0,
            upshow3Failure: false,
            upshow3Error: false,
            upshow3not: false,
            newpid: ''
        }
    },

    methods: {

        resetPid() {
            const that = this;
            that.upshow3Success = 0;
            that.upshow3Failure = false;
            that.upshow3Error = false;
            that.upshow3not = false;
        },

        checkPid(pid) {
            const that = this;
            if( that.newpid === '' ){
                that.upshow3not = true;
                setTimeout(function(){
                    that.upshow3not = false;
                },500)
            }else{
                that.upshow3 = true;
                that.upshow3Success = 0;
                that.upshow3Error = false;
                that.upshow3Failure = false;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/live/get',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        pid: pid
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            if (!that.isEmptyObject(data.data)) {
                                that.upshow3 = false;
                                that.upshow3Error = false;
                                that.upshow3Failure = false;
                                that.upshow3Success = 1;
                            } else {
                                that.upshow3 = false;
                                that.upshow3Error = false;
                                that.upshow3Failure = true;
                                that.upshow3Success = 2;
                            }

                        } else if (data.returncode == 303 || 301) {
                            that.upshow3 = false;
                            that.upshow3Failure = false;
                            that.upshow3Success = 2;
                            that.upshow3Error = true;
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){
                                that.checkPid(pid);
                            });
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function () {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }
            
        },

        isEmptyObject(e) {
            let t;
            for (t in e)
                return !1;
            return !0
        },


        unionList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/versus/list',
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
                        that.agentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.unionList(data.data.totalPageNum, size);
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
                            that.AMtips1 = '请求成功';;
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.unionList(that.page, that.size)});
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
        
        resetaddUnion() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            that.newname =  "";
            that.newpid = "";
            that.newpname =  "";
            that.newtype =  "";
            that.newversus =  "";
            that.newvote =  "";
            that.newcolor =  "";
            that.newvotername =  "";
            that.newmax_votes = "";
            that.newtickets_per_vote = "";
            that.newtickets_per_award = "";
            that.neworder =  "";
            that.newavatar =  "";
            that.newAcStartYMD =  "";
            that.newAcStartHMS =  "";
            that.newAcStopYMD =  "";
            that.newAcStopHMS =  "";
            that.newplayers = [
                {
                    name: "",
                    order: null,
                    avatar: '',
                    voter_color: '',
                    voter_name: ''
                },
                {
                    name: "",
                    order: null,
                    avatar: '',
                    voter_color: '',
                    voter_name: ''
                }
            ];
            that.medi_newplayers = that.newplayers;
        },
        addUnion() {
            const that = this;
            var startT = [that.newAcStartYMD, that.newAcStartHMS].join(" ");
            var stopT = [that.newAcStopYMD, that.newAcStopHMS].join(" ");
            that.newplayers = that.medi_newplayers;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.newname === '') {
                that.addATips1 = '请填写name';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( that.newpid === '' ) {
                this.addATips1 = '请输入pid';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.upshow3Success != 1 ) {
                this.addATips1 = '该主播不在直播状态';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newversus === '' ) {
                this.addATips1 = '请填写活动时长';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newversus < 0 ) {
                this.addATips1 = '活动时长为正值';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newvote === '' ) {
                this.addATips1 = '请填写投票时长';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newvote < 0 ) {
                this.addATips1 = '投票时长为正值';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newvote > that.newversus ) {
                this.addATips1 = '投票时长必须小于活动时长';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if(!that.newAcStartYMD || !that.newAcStartHMS){
                that.addATips1 = '请填写活动开始时间';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if(!that.newAcStopYMD || !that.newAcStopHMS){
                that.addATips1 = '请填写活动结束时间';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if(startT>stopT) {
                that.addATips1 = '活动结束时间必须超过活动开始时间';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1500);
                return false
            } else if ( that.newmax_votes === '' ) {
                this.addATips1 = '请填写最大投票次数';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newmax_votes < 0 ) {
                this.addATips1 = '最大投票次数为正值';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newtickets_per_vote === '' ) {
                this.addATips1 = '请填写每次投票消费票数';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newtickets_per_vote < 0 ) {
                this.addATips1 = '每次投票消费票数为正值';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newtickets_per_award === '' ) {
                this.addATips1 = '请填写中奖后每笔返票数';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newtickets_per_award < 0 ) {
                this.addATips1 = '中奖后每笔返票数为正值';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else {
                if(that.newtype == '1' ) {
                    if( !that.newpname || !that.newcolor || !that.newvotername || !that.neworder ){
                        that.addATips1 = '请填写players信息';
                        setTimeout(function() {
                            that.addATips1 = '';
                        }, 1500);
                        return false;
                    }
                }
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/versus/create',
                    type: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    dataType: 'json',
                    data: JSON.stringify({
                        name: that.newname,
                        pid: that.newpid*1,
                        vote_duration: that.newvote,
                        versus_duration: that.newversus,
                        start_at: startT,
                        stop_at: stopT,
                        tickets_per_vote: that.newtickets_per_vote,
                        tickets_per_award: that.newtickets_per_award,
                        max_votes: that.newmax_votes,
                        players: that.newplayers
                    }),
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                                that.unionList(that.page, that.size)
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addUnion);
                        } else if (code == '304') {
                            that.addATips1 = '主播尚未开播';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 500);
                        } else if (code == '305') {
                            that.addATips1 = '活动已开始，不能创建';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 500);
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


        getAC(id) {
            this.agencyUpID = id;
            this.playersID = '';
            this.addATips1 = '';
            this.addATips2 = '';
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/player/query',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "get",
                data: {
                    "versusid": that.agencyUpID
                },
                success: function(data){
                    if (data.returncode == '200') {
                        that.players = data.data;
                        console.log(that.players)
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){ that.getAC() });
                    } else if ( data.returncode == '106'|| data.returncode == '102' || data.returncode == '103' ) {
                        utils.loginAgain(that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            })
        },

        startAC(id) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/versus/start',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": id
                },
                success: function(data){
                    if (data.returncode == '200') {
                        that.AMtips1 = '操作成功';
                        that.unionList(that.page, that.size);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.startAC);
                    } else if (data.returncode == '304') {
                        that.AMtips2 = '活动不存在';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
                    } else if( data.returncode == "305" ) {
                        that.AMtips2 = '有其他活动已开始或已结束';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
                    } else if( data.returncode == "306" ) {
                        that.AMtips2 = '有其他活动已开始';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
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
        stopAC() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/versus/stop',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": that.agencyUpID,
                    "playerid": that.playersID
                },
                success: function(data){
                    if (data.returncode == '200') {
                        that.addATips2 = '操作成功';
                        setTimeout(function() {
                            $('#stopAcModel').modal('hide');
                            that.unionList(that.page, that.size);
                        }, 1000);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.stopAC);
                    } else if (data.returncode == '304') {
                        that.addATips1 = '活动不存在';
                        setTimeout(function() {
                            that.addATips1 = '';
                        }, 1000);
                    } else if( data.returncode == "305" ) {
                        that.addATips1 = '活动已开始或已结束';
                        setTimeout(function() {
                            that.addATips1 = '';
                        }, 1000);
                    } else if( data.returncode == "306" ) {
                        that.addATips1 = '请不要重复提交';
                        setTimeout(function() {
                            that.addATips1 = '';
                        }, 1000);
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
        startVOTE(id) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/versus/vote/start',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": id
                },
                success: function(data){
                    if (data.returncode == '200') {
                        that.AMtips1 = '操作成功';
                        that.unionList(that.page, that.size);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.startVOTE(id)});
                    } else if (data.returncode == '304') {
                        that.AMtips2 = '活动不存在';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
                    } else if( data.returncode == "305" ) {
                        that.AMtips2 = '活动已开始或已结束';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
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
        stopVOTE(id) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/versus/vote/stop',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": id
                },
                success: function(data){
                    if (data.returncode == '200') {
                        that.AMtips1 = '操作成功';
                        that.unionList(that.page, that.size);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.stopVOTE(id)});
                    }  else if (data.returncode == '304') {
                        that.AMtips2 = '活动不存在';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
                    } else if( data.returncode == "305" ) {
                        that.AMtips2 = '活动已开始或已结束';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
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



        create_info(arr) {
            const that = this;
            that.newpname = "";
            that.neworder = "";
            that.newavatar = "";
            that.newcolor = "";
            that.newvotername = "";
            arr.push({
                name: that.newpname,
                order: that.neworder,
                avatar: that.newavatar,
                voter_color: that.newcolor,
                voter_name: that.newvotername
            },)
        },

        del_info(index, arr) {
            arr.splice(index,1)
        },

        is_status(status){
            switch(status){
                case 0:
                  return "未开始";
                  break;
                case 1:
                  return "开始";
                  break;
                case 2:
                  return "已结束";
                  break;
                case 3:
                  return "正在兑奖";
                  break;
            }
        },

        pageBegin() {
            const that = this;
            that.page = 1;
            that.unionList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.unionList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.unionList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.unionList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 39);
        this.$store.dispatch('subChanger', 'sub5');

        this.unionList(this.page, this.size);
    }
}
</script>
