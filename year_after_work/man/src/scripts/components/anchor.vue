<template id="">
    <div class="">
        <div class="AM-top" style="margin-top: 10px;">
            <span class="AM-tips1" style="left:0;top: 18px;">{{AMtips1}}</span>
            <span class="AM-tips2">{{AMtips2}}</span>
            <div class="AM-topInfo per">
                <button type="button" style="margin-right:20px;" class="btn btn-primary" @click="_export">导出</button>
                <select class="form-control record-info" name="" id="exampleInputEmail1" v-model.trim="searchunion">
                    <option value="">选择工会</option>
                    <option v-for="union in unionL" v-bind:value="union.name">{{union.name}}</option>
                </select>
                <input type="text" class="form-control record-info" id="exampleInputEmail1" placeholder="PID"
                       v-model.trim="searchpid">
                <input type="text" class="form-control record-info" id="exampleInputEmail1" placeholder="Loginname"
                       v-model.trim="searchloginname">
                <select class="form-control record-info" name="" id="exampleInputEmail1" v-model.trim="sign">
                    <option value="">选择状态</option>
                    <option value="0">没签约</option>
                    <option value="1">签约</option>
                </select>
                <label>开始时间：</label>
                <input type="date" class="form-control record-month" style="width: 12%;" id="exampleInputEmail1"
                       v-model.trim="beginTime">
                <label>结束时间：</label>
                <input type="date" class="form-control record-month" style="width: 12%;" id="exampleInputEmail1"
                       v-model.trim="endTime">
                <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAnchor"></i>
            </div>

        </div>
        <table class="table table-striped table-hover AM-table">
            <!-- <caption class = "AM-cap">代理商信息</caption> -->
            <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>用户PID</th>
                <th>昵称</th>
                <th>粉丝数</th>
                <th>分享数</th>
                <th>新增粉丝数</th>
                <th>总播放天数</th>
                <th>总播放时长</th>
                <th>总收益</th>
                <th>公会名称</th>
                <th>热度</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.pid}}</td>
                <td style="max-width:150px;overflow:hidden;">{{agent.loginname}}</td>
                <td>{{agent.num_follower}}</td>
                <td>{{agent.num_share}}</td>
                <td>{{agent.add_follers_num}}</td>
                <td>{{agent.num_play_day}}</td>
                <td>{{agent.play_length}}</td>
                <td>{{agent.num_revenue}}</td>
                <td style="max-width:150px;overflow:hidden;">{{agent.union}}</td>
                <td style="cursor: pointer;" data-toggle='modal' data-target="#updateCharmModal"
                    @click="updateLoginId(agent.loginid, agent.num_charm)">{{agent.num_charm}}
                </td>
                <td><i v-bind:class="agent.is_forbid == 0 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'"
                       aria-hidden="true"></i></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="detail(agent.loginid)">查看</a></li>
                            <li v-if="agent.is_forbid==1"><a href="javascript: void(0)"
                                   @click="changeState(0, agent.loginid, agent.device_tokens)">启用</a></li>
                            <li v-if="agent.is_forbid==0"><a href="javascript: void(0)" data-toggle='modal' data-target="#banModal"
                                   @click="rulerList(agent.loginid, agent.device_tokens)">禁用</a></li>
                            <li><a href="javascript: void(0)" @click="rescission(agent.loginid)">解约</a></li>
                            <li><a href="javascript: void(0)" @click="disable_pic(agent.loginid)">禁用头像</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#changeUnionModal" @click="getAnchorInfo(agent.loginid, agent.pid, agent.loginname, agent.union)">转工会</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#check"
                                   @click="check(agent.pid)">查看申请详情</a></li>
                        </ul>
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
                        <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''"
                           @click="anchorList(pageN, size)">{{pageN}}</a>
                    </li>
                </div>
                <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
                <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
            </ul>
        </nav>
        <div class="modal fade bs-example-modal-lg" id="changeUnionModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">改变工会</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Pid (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  placeholder="Pid" v-model.trim="cPid" readOnly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">loginname (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  placeholder="loginname" v-model.trim="cLoginname" readOnly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">union (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  placeholder="union" v-model.trim="cUnion" readOnly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label hasMR">选择工会 (*)</label>
                                <select class="form-control acName col-sm-10" v-model.trim="cUnionId">
                                    <option v-for="union in unionL" v-bind:value="[union._id, union.name]">{{union.name}}</option>
                                </select>
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
                        <button type="button" class="btn btn-primary" @click="changeUnion">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="direct" style="display:none">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel" style="text-align: center">直播时长信息</h4>
            </div>
            <div class="col-sm-6">
                <div style="margin-top:10px;"><label>每天直播时长</label></div>
                <table class="table table-striped table-hover AM-table" style="margin-top:15px;">
                    <!-- <caption class = "AM-cap">代理商信息</caption> -->
                    <thead>
                    <tr>
                        <th>日期</th>
                        <th>直播时长</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(direct, index) in day_num">
                        <td>{{direct.date}}</td>
                        <td>{{direct.len}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-sm-6">
                <div style="margin-top:10px;"><label>每月直播时长</label></div>
                <table class="table table-striped table-hover AM-table" style="margin-top:15px;">
                    <!-- <caption class = "AM-cap">代理商信息</caption> -->
                    <thead>
                    <tr>
                        <th>月份</th>
                        <th>直播时长</th>
                        <th>直播天数</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(direct, index) in month_num">
                        <td>{{direct.date}}</td>
                        <td>{{direct.len}}</td>
                        <td>{{direct.num}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal fade bs-example-modal-lg" id="updateCharmModal" tabindex="-1" role="dialog"
             aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">更新热度</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="inputEmail1" class="col-sm-2 control-label">热度 (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" id="inputEmail1" class="form-control" placeholder="热度"
                                           v-model.trim="num_charm">
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
                        <button type="button" class="btn btn-primary" @click="updateCharm">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bs-example-modal-lg" id="banModal" tabindex="-1" role="dialog"
             aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">禁播</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="inputEmail1" class="col-sm-2 control-label">违禁条例 (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="rul">
                                        <option v-for="ruler in rulerL" v-bind:value="ruler.code">{{ruler.msg}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">制裁措施 (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" id="exampleInputEmail1"
                                            v-model.trim="measures">
                                        <option value="1">封号24小时</option>
                                        <option value="3">封号3天</option>
                                        <option value="7">封号1周</option>
                                        <option value="30">封号1月</option>
                                        <option value="9999">永久封号</option>
                                    </select>
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
                        <button type="button" class="btn btn-primary" @click="changeState(1)">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bs-example-modal-lg" id="check" tabindex="-1" role="dialog"
             aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">申请详情</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">realname</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="realname" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">nickname</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="nickname" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">sex</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model.trim="sex" disabled>
                                        <option value="">请选择性别</option>
                                        <option value="1">男</option>
                                        <option value="2">女</option>
                                        <option value="0">已婚女</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">age</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="age" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">idcard</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="idcard" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">phone</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="phone" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">facebook_link</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="facebook_link" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">instagram_link</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="instagram_link" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">line_id</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="line_id" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label hasMR">工会名称 (*)</label>
                                <select class="form-control acName col-sm-10" disabled>
                                    <option v-bind:value="unionid">
                                        {{union}}

                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">pid</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" disabled v-model.trim="pid" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">loginname</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="loginname" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">salary</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="salary" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">合约类型</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model.trim="contract_type" disabled>
                                        <option value="">请选择合约类型</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">account_no</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="account_no" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">account_name</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model.trim="account_name" disabled>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">申请时间</label>
                                <div class="col-sm-10">
                                    <input type="date" class="form-control" disabled v-model.trim="sub_time" disabled>
                                </div>
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
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="update">确认</button>
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
                moment: moment,
                agentL: [],
                unionL: [],
                rulerL: [],
                rul: "",
                measures: "",
                searchunion: "",
                searchpid: "",
                searchloginname: "",
                sign: "",
                beginTime: "",
                endTime: "",
                day_num: "",
                month_num: "",
                loginid: "",
                num_charm: "",
                device_tokens: "",
                addATips1: "",
                addATips2: "",
                upTips1: "",
                upTips2: "",
                page: 1,
                size: 10,
                pagesShow: false,
                pageL: [],
                AMtips1: "",
                AMtips2: "",
                realname: '',
                nickname: '',
                age: '',
                idcard: '',
                facebook_link: '',
                instagram_link: '',
                line_id: '',
                pid: '',
                loginname: '',
                salary: '',
                account_name: '',
                sex: '',
                union: '',
                unionid: '',
                phone: '',
                account_no: '',
                sub_time: '',
                cPid: '',
                cLoginname: '',
                cUnion: '',
                cLoginId: '',
                cUnionId: [],

                contract_type: 'A'
            }
        },

        methods: {
            anchorList(page, size) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/host/list',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        "page": page,
                        "size": size,
                        "union": that.searchunion,
                        "pid": that.searchpid,
                        "loginname": that.searchloginname,
                        "is_signed": that.sign,
                        "begintime": that.beginTime,
                        "endtime": that.endTime
                    },
                    success: function (data) {
                        let code = data.returncode;
                        // console.log(data);
                        if (code == 200) {
                            that.agentL = data.data.data;
                            that.pagesShow = true;
                            if (page > data.data.totalPageNum) {
                                that.anchorList(data.data.totalPageNum, size);
                                return false;
                            } else if (page <= 0) {
                                return false;
                            } else {
                                that.page = page;
                                that.pageL = [];
                                let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                                let maxPage = Math.min(data.data.totalPageNum, Math.ceil(page / 5) * 5);
                                // console.log(maxPage);
                                for (let i = pageStart; i <= maxPage; i++) {
                                    that.pageL.push(i);
                                }
                                that.AMtips1 = '请求成功';
                                ;
                                setTimeout(function () {
                                    that.AMtips1 = '';
                                }, 500);
                            }
                        } else if (code == '301') {
                            console.log('参数错误');
                        } else if (code == '104') {
                            // console.log('code-104');
                            // debugger;
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.anchorList(that.page, that.size)
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
            },
            unionList() {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/union/list',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        "page": 1,
                        "size": 999
                    },
                    success: function (data) {
                        let code = data.returncode;
                        if (code == 200) {
                            that.unionL = data.data.data;
                        } else if (code == '301') {
                            console.log('参数错误');
                        } else if (code == '104') {
                            // console.log('code-104');
                            // debugger;
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.unionList()
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
            },
            searchAnchor() {
                const that = this;
                that.page = 1;
                that.anchorList(that.page, that.size);
            },
            rulerList(loginid, device_tokens) {
                const that = this;
                that.loginid = loginid;
                that.device_tokens = device_tokens;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/host/ruler/list',
                    type: "GET",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.rulerL = data.data;
                            setTimeout(function () {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.rulerList(loginid, device_tokens)
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
            },
            _export() {
                const that = this;
                var url = that.$store.state.rootUrl3 + '/host/export';
                var data = "union=" + that.searchunion + "&pid=" + that.searchpid + "&loginname=" + that.searchloginname + "&is_signed=" + that.sign + "&begintime=" + that.beginTime + "&endtime=" + that.endTime
                window.location = url + "?" + data;
            },
            rescission(id) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/host/rescission',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "loginid": id
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            setTimeout(function () {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.rescission(id)
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
            },
            detail(loginid) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/host/detail',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "loginid": loginid
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.day_num = data.data.day;
                            that.month_num = data.data.month;
                            $(".direct").show();
                            setTimeout(function () {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.detail(loginid)
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
            },
            updateLoginId(loginid, num_charm) {
                this.loginid = loginid;
                this.num_charm = num_charm;
            },
            updateCharm() {
                const that = this;
                if (that.num_charm < 0 || that.num_charm > 1000) {
                    that.addATips1 = '请输入0--1000的数字';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 1000);
                    return false;
                } else {
                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/host/hot/update',
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        type: "POST",
                        data: {
                            "loginid": that.loginid,
                            "num_charm": that.num_charm
                        },
                        success: function (data) {
                            if (data.returncode == '200') {
                                that.addATips2 = '操作成功';
                                that.anchorList(that.page, that.size);
                                setTimeout(function () {
                                    $('#updateCharmModal').modal('hide');
                                    that.addATips2 = '';
                                }, 1000);
                            } else if (data.returncode == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                    that.updateCharm()
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
            changeState(initState, id, device_tokens) {
                const that = this;
                that.AMtips1 = '';
                that.AMtips2 = '';
                if (initState == 1) {
                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/host/forbid',
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        type: "POST",
                        data: {
                            "loginid": that.loginid,
                            "duration": that.measures,
                            "regulation": that.rul,
                            "device_tokens": that.device_tokens
                        },
                        success: function (data) {
                            if (data.returncode == '200') {
                                that.addATips2 = '操作成功';
                                that.anchorList(that.page, that.size);
                                setTimeout(function () {
                                    that.addATips2 = '';
                                    $('#banModal').modal('hide');
                                }, 1000);
                            } else if (data.returncode == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                    that.changeState(initState)
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
                } else {
                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/host/deforbid',
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        type: "POST",
                        data: {
                            "loginid": id,
                            "device_tokens": device_tokens
                        },
                        success: function (data) {
                            if (data.returncode == '200') {
                                that.AMtips1 = '操作成功';
                                that.anchorList(that.page, that.size);
                                setTimeout(function () {
                                    that.AMtips1 = '';
                                }, 1000);
                            } else if (data.returncode == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                    that.changeState(initState, id, device_tokens)
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
            check(pid){
                const that = this;
                this.realname = '';
                this.nickname = '';
                this.age = '';
                this.idcard = '';
                this.facebook_link = '';
                this.instagram_link = '';
                this.line_id = '';
                this.pid = '';
                this.loginname = '';
                this.salary = '';
                this.account_name = '';
                this.sex = '';
                this.union = '';
                this.unionid = '';
                this.phone = '';
                this.account_no = '';
                this.sub_time = '';
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/host/apply/show',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "pid": pid
                    },
                    async: false,
                    success: function (data) {
                        let code = data.returncode;
                        if (code == 200) {
                            that.realname = data.data.realname;
                            that.nickname = data.data.nickname;
                            that.age = data.data.age;
                            that.idcard = data.data.idcard;
                            that.facebook_link = data.data.facebook_link;
                            that.instagram_link = data.data.instagram_link;
                            that.line_id = data.data.line_id;
                            that.pid = data.data.pid;
                            that.loginname = data.data.loginname;
                            that.salary = data.data.salary;
                            that.account_name = data.data.account_name;
                            that.account_no = data.data.account_no;
                            that.sex = data.data.sex;
                            that.union = data.data.union;
                            that.unionid = data.data.unionid;
                            that.phone = data.data.phone;
                            that.contract_type = data.data.contract_type;
                            if (data.data.create_at) {
                                that.sub_time = moment(data.data.create_at).format('YYYY-MM-DD');
                            }
                        } else if (code == '301') {
                            console.log('参数错误');
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.check(pid)
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
            },
            update() {
                $('#check').modal('hide');
                // const that = this;
                // if (that.realname == '') {
                //     that.upTips1 = '请填写真实名字';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // } else if (that.nickname == '') {
                //     that.upTips1 = '请填写小名';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // } else if (that.age == '') {
                //     that.upTips1 = '请输入年龄';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // } else if (that.idcard == '') {
                //     that.upTips1 = '请输入身份证';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // } else if (that.facebook_link == '') {
                //     that.upTips1 = '请输入facebook链接';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // } else if (that.instagram_link == '') {
                //     that.upTips1 = '请输入instagram链接';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // } else if (that.line_id == '') {
                //     that.upTips1 = '请输入line id';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // }else if (that.loginname == '') {
                //     that.upTips1 = '请输入loginname';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // } else if (that.salary == '') {
                //     that.upTips1 = '请输入工资';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // }  else if (that.account_name == '') {
                //     that.upTips1 = '请输入银行名称';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // } else if (that.account_no == '') {
                //     that.upTips1 = '请输入银行卡号';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // } else if (that.sex == '') {
                //     that.upTips1 = '请选择性别';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // }  else if (that.unionid == '') {
                //     that.upTips1 = '请选择工会';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // } else if (that.phone == '') {
                //     that.upTips1 = '请输入电话号';
                //     setTimeout(function() {
                //         that.upTips1 = '';
                //     }, 500);
                //     return false;
                // }else{
                //     $.ajax({
                //         url: this.$store.state.rootUrl3 + '/host/apply/update',
                //         type: "POST",
                //         headers: {
                //             "token": localStorage.getItem('A-TOKEN')
                //         },
                //         data: {
                //             "realname": that.realname,
                //             "nickname": that.nickname,
                //             "age": that.age,
                //             "idcard": that.idcard,
                //             "facebook_link": that.facebook_link,
                //             "instagram_link": that.instagram_link,
                //             "line_id": that.line_id,
                //             "pid": that.pid,
                //             "loginname": that.loginname,
                //             "salary": that.salary,
                //             "account_name": that.account_name,
                //             "sex": that.sex,
                //             "union": that.union,
                //             "unionid": that.unionid,
                //             "phone": that.phone,
                //             "account_no": that.account_no
                //         },
                //         success: function(data) {
                //             if (data.returncode == '200') {
                //                 that.upTips1 = '';
                //                 that.upTips2 = '操作成功';
                //                 that.anchorList(that.page, that.size);
                //                 setTimeout(function() {
                //                     that.upTips2 = '';
                //                     $('#check').modal('hide');
                //                 }, 500);
                //             } else if (data.returncode == '104') {
                //                 utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                //             }  else {
                //                 utils.handleLogOut(data.returncode, that);
                //             }
                //         },
                //         fail: function() {
                //             console.log('Ajax Error');
                //             utils.loginAgain(that);
                //         }
                //     });
                // }
            },

            disable_pic(loginid) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/host/avatar/forbid',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "loginid": loginid,
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.anchorList(that.page, that.size);
                            setTimeout(function () {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.disable_pic(loginid)
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
            },

            getAnchorInfo(loginid, pid, loginname, union) {
                this.cLoginId = loginid;
                this.cPid = pid;
                this.cLoginname = loginname;
                this.cUnion = union;
            },

            changeUnion() {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/host/transfer',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "loginid": that.cLoginId,
                        "union": that.cUnionId[1],
                        "unionid": that.cUnionId[0]
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            that.addATips2 = '操作成功';
                            setTimeout(function () {
                                that.addATips2 = '';
                                $('#changeUnionModal').modal('hide');
                                that.anchorList(that.page, that.size);
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.changeUnion);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function () {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            },

            pageBegin() {
                const that = this;
                that.page = 1;
                that.anchorList(that.page, that.size);
            },
            pageEnd() {
                const that = this;
                that.page = Number.POSITIVE_INFINITY;
                that.anchorList(that.page, that.size);
            },
            pagePre() {
                const that = this;
                if (that.page > 1) {
                    that.page--;
                    that.anchorList(that.page, that.size);
                } else {
                    return false;
                }

            },
            pageNext() {
                const that = this;
                that.page++;
                that.anchorList(that.page, that.size);
            },

        },

        mounted() {
            this.$store.dispatch('tabChanger', 20);
            this.$store.dispatch('subChanger', 'sub2');
            this.anchorList(this.page, this.size);
            this.unionList(this.page, this.size)
        }
    }
</script>
