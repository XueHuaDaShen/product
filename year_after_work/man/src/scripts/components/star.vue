<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float:left" type="button" class="btn btn-primary AM-add" data-toggle="modal" data-target="#myModal" @click="resetAdd">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <!-- Modal -->
        <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增直播间</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">pid (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="pid" v-model.trim="addpid">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail1" class="col-sm-2 control-label">类型 (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" v-model.trim="addtype">
                                        <!-- <option value="">类型</option> -->
                                        <!-- <option value="0">Default</option> -->
                                        <option value="1">Live House</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail1" class="col-sm-2 control-label">直播间名字 (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" v-model.trim="addhostpid">
                                        <option value="">直播间名字</option>
                                        <option v-for="data in change_data" :value="data.pid">{{data.loginname}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">标题 (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="标题" v-model.trim="addtitle">
                                </div>
                            </div>
                            <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">开始时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" class="form-control" v-model.trim="addstartYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" class="form-control" placeholder="HH:MM:SS" v-model.trim="addstartHMS">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">结束时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" class="form-control" v-model.trim="addstopYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" class="form-control" v-model.trim="addstopHMS">
                                    </div>
                                </div>
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
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="addVIP">确认</button>
                    </div>
                </div>
            </div>
        </div>



        <div class="AM-topR" style = "float:right; margin-right: .9%; margin-bottom: 25px; width: 35%;">
            <select class="form-control" name="" id="exampleInputEmail1" style = "width: 38%;display:inline" v-model.trim="status">
                <option value="">请选择状态</option>
                <option value="0">未直播</option>
                <option value="1">直播中</option>
                <option value="2">已播完</option>
            </select>
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAdmin" ></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>pid</th>
                <th>loginname</th>
                <th>直播间名称</th>
                <th>类型</th>
                <th>标题</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.pid}}</td>
                <td>{{admin.loginname}}</td>
                <td>{{admin.hostloginname}}</td>
                <td>{{admin.type==1?'Live House':'Default'}}</td>
                <td>{{admin.title}}</td>
                <td>{{moment(admin.start_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{moment(admin.stop_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{getStatus(admin.status)}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#changeModal" @click="getValue(admin.pid, admin.loginid, admin.type, admin.hostloginid)">切换直播间</a></li>
                            <li><a href="javascript: void(0)" @click="deleteroom(admin._id)">删除</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.pid, admin.type, admin.title, admin.hostpid, admin.start_at, admin.stop_at)">编辑信息</a></li>
                        </ul>
                    </div>
                </td>
            </tr>

        </tbody>
    </table>

    <nav class="AMnav">
        <ul class="pagination">
            <li><a href="javascript:void(0);" @click="pageBegin">Begin</a></li>
            <li><a href="javascript:void(0);" @click="pagePre">&laquo;</a></li>
            <div class="pageL">
                <li v-for="pageN in pageL">
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="vipList(pageN, size)">{{pageN}}</a>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改直播间</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">pid (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="pid" v-model.trim="pid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">类型 (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" v-model.trim="type">
                                        <!-- <option value="">类型</option> -->
                                        <option value="1">Live House</option>
                                    </select>
                                </div>
                        </div>
                        <div class="form-group">
                                <label for="inputEmail1" class="col-sm-2 control-label">直播间名字 (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" v-model.trim="hostpid">
                                        <option value="">直播间名字</option>
                                        <option v-for="data in change_data" :value="data.pid">{{data.loginname}}</option>
                                    </select>
                                </div>
                            </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">标题 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="标题" v-model.trim="title">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">开始时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" class="form-control" v-model.trim="startYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" class="form-control" v-model.trim="startHMS">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">结束时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" class="form-control" v-model.trim="stopYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" class="form-control" v-model.trim="stopHMS">
                                    </div>
                                </div>
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="update">确认</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="changeModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">切换直播间</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style="font-size: 16px;">
                        是否确定切换房间
                    </div>
                    <div class="addTips">
                        {{addTips}}
                    </div>
                    <div class="addTips2">
                        {{addTips2}}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="changeState">确认</button>
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
            AMtips1: '',
            AMtips2: '',
            change_pid: '',
            change_loginid: '',
            change_type: '',
            change_hostloginid: '',
            change_data: [],
            status: '',
            addpid: '',
            addtype: '1',
            addtitle: '',
            addhostpid: '',
            addstartYMD: '',
            addstartHMS: '',
            addstopYMD: '',
            addstopHMS: '',
            pid: '',
            type: '',
            title: '',
            hostpid: '',
            startYMD: '',
            startHMS: '',
            stopYMD: '',
            stopHMS: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            adminL: [],
            upTips1: '',
            upTips2: '',
            adminUpID: '',
            moment: moment,
            pageL: [],
            animationL: [],
        }
    },

    methods: {
        getUTCDateTime(time) {
            var t = new Date(time);
            var d = t.getUTCDate(),
                y = t.getUTCFullYear(),
                M = t.getUTCMonth()+1,
                h = t.getUTCHours(),
                m = t.getUTCMinutes(),
                s = t.getUTCSeconds();
            var newTime = y+'-'+M+'-'+d + ' ' + h+':'+m+':'+s;
            return newTime;
        },
        resetAdd() {
            const that = this;
            this.addpid = '';
            this.addtype = '1';
            this.addtitle = '';
            this.addhostpid = '';
            this.addstartYMD = "";
            this.addstartHMS = "";
            this.addstopYMD = "";
            this.addstopHMS = "";
            this.addTips1 = '';
            this.addTips2 = '';
            $.ajax({
                url: that.$store.state.rootUrl3 + '/live/concert/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": 1,
                    "size": 999,
                    "type": that.addtype
                },
                success: function(data) {
                    let code = data.returncode;
                    if (code == 200) {
                        var data = data.data.data;
                        that.change_data = [];
                        that.change_data = data;
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.resetAdd);
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
        addVIP() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            var startT = [that.addstartYMD, that.addstartHMS].join(" ");
            var stopT = [that.addstopYMD, that.addstopHMS].join(" ");
            // console.log('开始时间', startT)
            // console.log('结束时间', stopT)
            var startUTC = that.getUTCDateTime(startT);
            var stopUTC = that.getUTCDateTime(stopT);
            // console.log('utc---S:', startUTC)
            // console.log('utc---E:', stopUTC)
            if ( that.addpid === '' ) {
                this.addTips = '请输入pid';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( isNaN(that.addpid) ) {
                this.addTips = '请输入正确的pid';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.addtype ) {
                this.addTips = '请输入类型';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.addhostpid ) {
                this.addTips = '请选择房间名';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.addtitle ) {
                this.addTips = '请输入标题';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if(!that.addstartYMD || !that.addstartHMS){
                that.addTips = '请填写开始时间';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
                return false;
            } else if(!that.addstopYMD || !that.addstopHMS){
                that.addTips = '请填写结束时间';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
                return false;
            } else if(startT>stopT) {
                that.addTips = '结束时间必须超过开始时间';
                setTimeout(function() {
                    that.addTips = '';
                }, 1500);
                return false
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/livehouse/create',
                    type: "POST",
                    data: {
                        pid: that.addpid,
                        title: that.addtitle,
                        type: that.addtype,
                        hostpid: that.addhostpid,
                        start_at: startUTC,
                        stop_at: stopUTC
                    },
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#myModal').modal('hide');
                                that.vipList(that.page, that.size);
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addVIP);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function() {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                });
            }
        },

        vipList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/livehouse/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "status": that.status
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.adminL = [];
                        that.adminL = data.data.data;
                        if (page > data.data.totalPageNum) {
                            that.vipList(data.data.totalPageNum, that.size);
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

                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.vipList(that.page, that.size)
                        });
                    } else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        },


        getValue(pid, loginid, type, hostloginid) {
            const that = this;
            this.change_pid = pid;
            this.change_loginid = loginid;
            this.change_type = type;
            this.change_hostloginid = hostloginid;
        },

        changeState() {
            const that = this;
            that.AMtips1 = '';
            that.AMtips2 = '';
            $.ajax({
                url: that.$store.state.rootUrl3 + '/livehouse/change',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "pid": that.change_pid,
                    "loginid": that.change_loginid,
                    "type": that.change_type,
                    "hostloginid": that.change_hostloginid
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.addTips2 = '操作成功';
                        that.vipList(that.page, that.size);
                        setTimeout(function() {
                            that.addTips2 = '';
                        }, 1000);
                        $('#changeModal').modal('hide');
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.changeState);
                    } else if (data.returncode == '301') {
                        that.addTips = '参数错误';
                        setTimeout(function() {
                            that.addTips = '';
                        }, 1000);
                    } else if (data.returncode == '302') {
                        that.addTips = '正在直播用户置状态以播完失败';
                        setTimeout(function() {
                            that.addTips = '';
                        }, 1000);
                    } else if (data.returncode == '303') {
                        that.addTips = '切换用户不在直播';
                        setTimeout(function() {
                            that.addTips = '';
                        }, 1000);
                    } else if (data.returncode == '304') {
                        that.addTips = '切换用户失败';
                        setTimeout(function() {
                            that.addTips = '';
                        }, 1000);
                    } else if (data.returncode == '305') {
                        that.addTips = '更新待直播用户失败';
                        setTimeout(function() {
                            that.addTips = '';
                        }, 1000);
                    } else if (data.returncode == '306') {
                        that.addTips = '直播间不存在';
                        setTimeout(function() {
                            that.addTips = '';
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
        searchAdmin() {
            const that = this;
            that.page = 1;
            that.vipList(that.page, that.size);
        },

        resetUpdate(id, pid, type, title, hostpid, start_at, stop_at) {
            var startTime = moment(start_at).format('YYYY-MM-DD HH:mm:ss');
            var stopTime = moment(stop_at).format('YYYY-MM-DD HH:mm:ss');
            const that = this;
            this.adminUpID = id;
            this.pid = pid;
            this.type = type;
            this.title = title;
            this.hostpid = hostpid;
            this.startYMD = startTime.split(" ")[0];
            this.startHMS = startTime.split(" ")[1];
            this.stopYMD = stopTime.split(" ")[0];
            this.stopHMS = stopTime.split(" ")[1];
            this.addTips1 = '';
            this.addTips2 = '';
            $.ajax({
                url: that.$store.state.rootUrl3 + '/live/concert/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": 1,
                    "size": 999
                },
                success: function(data) {
                    let code = data.returncode;
                    if (code == 200) {
                        var data = data.data.data;
                        that.change_data = [];
                        that.change_data = data;
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.resetUpdate(id, pid, type, title, hostpid, start_at, stop_at);
                        });
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



        update() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            var startT = [that.startYMD, that.startHMS].join(" ");
            var stopT = [that.stopYMD, that.stopHMS].join(" ");
            // console.log('开始时间', startT)
            // console.log('结束时间', stopT)
            var startUTC = that.getUTCDateTime(startT);
            var stopUTC = that.getUTCDateTime(stopT);
            // console.log('utc---S:', startUTC)
            // console.log('utc---E:', stopUTC)
            if ( that.pid === '' ) {
                this.addTips = '请输入pid';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( isNaN(that.pid) ) {
                this.addTips = '请输入正确的pid';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.type ) {
                this.addTips = '请输入类型';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.hostpid ) {
                this.addTips = '请选择房间名';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.title ) {
                this.addTips = '请输入标题';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if(!that.startYMD || !that.startHMS){
                that.addTips = '请填写开始时间';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
                return false;
            } else if(!that.stopYMD || !that.stopHMS){
                that.addTips = '请填写结束时间';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
                return false;
            } else if(startT>stopT) {
                that.addTips = '结束时间必须超过开始时间';
                setTimeout(function() {
                    that.addTips = '';
                }, 1500);
                return false
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/livehouse/update',
                    type: "POST",
                    data: {
                        id: that.adminUpID,
                        pid: that.pid,
                        type: that.type,
                        title: that.title,
                        hostpid: that.hostpid,
                        start_at: startUTC,
                        stop_at: stopUTC
                    },
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#updateModal').modal('hide');
                                that.vipList(that.page, that.size);
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function() {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                });
            }
        },


        deleteroom(id) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/livehouse/delete',
                type: "POST",
                data: {
                    id: id
                },
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.AMtips1 = '操作成功';
                        setTimeout(function() {
                            that.vipList(that.page, that.size);
                        }, 1000);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){
                            that.deleteroom(id)
                        });
                    } else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        },

        getStatus(status) {
            var statusTxt = '';
            if( status == 0 ){
                statusTxt = '未直播';
            }else if( status == 1 ){
                statusTxt = '直播中';
            }else if( status == 2 ){
                statusTxt = '已播完';
            }
            return statusTxt;
        },

        pageBegin() {
            const that = this;
            that.page = 1;
            that.vipList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.vipList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.vipList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.vipList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 34);
        this.$store.dispatch('subChanger', 'sub4');

        this.vipList(this.page, this.size);
    }
}
</script>
