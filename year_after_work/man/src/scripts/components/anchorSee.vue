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
                <td>{{agent.num_charm}}</td>
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
        <div class="modal fade bs-example-modal-lg" id="check" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
            _export() {
                const that = this;
                var url = that.$store.state.rootUrl3 + '/host/export';
                var data = "union=" + that.searchunion + "&pid=" + that.searchpid + "&loginname=" + that.searchloginname + "&is_signed=" + that.sign + "&begintime=" + that.beginTime + "&endtime=" + that.endTime
                window.location = url + "?" + data;
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
                this.contract_type = 'A';
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
                                that.check(id, realname, age, idcard, facebook_link, instagram_link, line_id, pid, loginname, salary, account_name, account_no, sex, union, unionid, phone, create_at)
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
            this.$store.dispatch('tabChanger', 44);
            this.$store.dispatch('subChanger', 'sub2');
            this.anchorList(this.page, this.size);
            this.unionList(this.page, this.size)
        }
    }
</script>
