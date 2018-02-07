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
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增vip</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group" v-show="show1">
                                <label class="col-sm-2 control-label">Pid (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputEmail3" placeholder="Pid" v-model.trim="addPid">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">vipconfig</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="addvipConfigId">
                                        <option v-for="configId in configL" v-bind:value="configId._id">{{configId.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">taskid (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="addTaskId">
                                        <option v-for="taskId in taskL" v-bind:value="taskId._id">{{taskId.title}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-2 control-label">vip开始时间 (*)</label>
                                <div class="col-sm-10">
                                    <div class="col-sm-12 img_info_box">
                                        <div class="img_info">
                                            <input type="date" id="inputEmail3" class="form-control" v-model.trim="addvipStartYMD">
                                        </div>
                                        <div class="img_info">
                                            <input type="time" id="inputEmail3" class="form-control" v-model.trim="addvipStartHMS">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-2 control-label">vip结束时间 (*)</label>
                                <div class="col-sm-10">
                                    <div class="col-sm-12 img_info_box">
                                        <div class="img_info">
                                            <input type="date" id="inputEmail3" class="form-control" v-model.trim="addvipStopYMD">
                                        </div>
                                        <div class="img_info">
                                            <input type="time" id="inputEmail3" class="form-control" v-model.trim="addvipStopHMS">
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



        <div class="AM-topR" style = "float:right; margin-right: 4.9%; margin-bottom: 25px; width: 39%;">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" style = "float: left; width: 38%;" placeholder="请输入Pid" v-model.trim="spid">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" style = "float: left; width: 38%;" placeholder="请输入vipname" v-model.trim="svipname">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAdmin" style = "float: left;"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>Pid</th>
                <th>用户id</th>
                <th>用户名</th>
                <th>vipname</th>
                <th>创建时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.pid}}</td>
                <td>{{admin.loginid}}</td>
                <td>{{admin.loginname}}</td>
                <td>{{admin.vipname}}</td>
                <td>{{moment(admin.create_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td><i v-bind:class="admin.enabled == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="changeState(admin.enabled, admin._id)">启用/禁用</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.pid, admin.taskid, admin.vipconfigid, admin.start_at, admin.stop_at)">编辑信息</a></li>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改用户信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group" v-show="show1">
                            <label class="col-sm-2 control-label">Pid (*)</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly class="form-control" id="inputEmail3" placeholder="Pid" v-model.trim="pid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">vipconfig</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="vipConfigId">
                                    <option v-for="configId in configL" v-bind:value="configId._id">{{configId.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">taskid (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="taskId">
                                    <option v-for="taskId in taskL" v-bind:value="taskId._id">{{taskId.title}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">vip开始时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" id="inputEmail3" class="form-control" v-model.trim="vipStartYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" id="inputEmail3" class="form-control" v-model.trim="vipStartHMS">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">vip结束时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" id="inputEmail3" class="form-control" v-model.trim="vipStopYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" id="inputEmail3" class="form-control" v-model.trim="vipStopHMS">
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
            spid: '',
            svipname: '',
            configL: [],
            taskL: [],
            addvipConfigId: '',
            addPid: '',
            addTaskId: '',
            vipConfigId: '',
            vipName: '',
            pid: '',
            taskId: '',
            taskName: '',
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
            show1: true,
            show2: false,
            addvipStartYMD: "",
            addvipStartHMS: "",
            addvipStopYMD: "",
            addvipStopHMS: "",
            vipStartYMD: "",
            vipStartHMS: "",
            vipStopYMD: "",
            vipStopHMS: "",
            country: "",
        }
    },

    methods: {
        resetAdd() {
            this.addvipConfigId = '';
            this.addPid = '';
            this.addTaskId = '';
            this.addvipStartYMD = '';
            this.addvipStartHMS = '';
            this.addvipStopYMD = '';
            this.addvipStopHMS = '';
            this.addTips1 = '';
            this.addTips2 = '';
            this.getId()
        },
        getId() {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/vipconfig/list',
                type: "GET",
                data: {
                    "page": 1,
                    "size": 999
                },
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                async: false,
                success: function(data) {
                    if (data.returncode == '200') {
                        that.configL = data.data.data;
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.getId);
                    } else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
            $.ajax({
                url: this.$store.state.rootUrl3 + '/activity/list',
                type: "GET",
                data: {
                    "page": 1,
                    "size": 999
                },
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                async: false,
                success: function(data) {
                    if (data.returncode == '200') {
                        that.taskL = data.data.data;
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.getId);
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
            var startT = [that.addvipStartYMD, that.addvipStartHMS].join(" ");
            var stopT = [that.addvipStopYMD, that.addvipStopHMS].join(" ");
            if ( that.addPid === '' ) {
                this.addTips = '请输入Pid';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( isNaN(that.addPid) ) {
                this.addTips = '请输入正确的Pid';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.addvipConfigId ) {
                this.addTips = '请输入addvipConfigId';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.addTaskId ) {
                this.addTips = '请输入addTaskId';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( that.addvipStartYMD == '' || that.addvipStartHMS == '' ) {
                this.addTips = '请输入vip开始时间';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( that.addvipStopYMD == '' || that.addvipStopHMS == '' ) {
                this.addTips = '请输入vip结束时间';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/vip/create',
                    type: "POST",
                    data: {
                        pid: that.addPid,
                        vipconfigid: that.addvipConfigId,
                        taskid: that.addTaskId,
                        start_at: startT,
                        stop_at: stopT
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
                url: this.$store.state.rootUrl3 + '/vip/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "pid": that.spid,
                    "vipname": that.svipname
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

        changeState(initState, id) {
            const that = this;
            that.AMtips1 = '';
            that.AMtips2 = '';
            if (initState == 1) {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/vip/disable',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": id
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.vipList(that.page, that.size);
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                                that.changeState(initState, id)
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
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/vip/enable',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": id
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.vipList(that.page, that.size);
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                                that.changeState(initState, id)
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
            }
        },

        searchAdmin() {
            const that = this;
            that.page = 1;
            that.vipList(that.page, that.size);
        },

        resetUpdate(id, pid, taskid, vipconfigid, start_at, stop_at) {
            var startTime = moment(start_at).format('YYYY-MM-DD HH:mm:ss');
            var stopTime = moment(stop_at).format('YYYY-MM-DD HH:mm:ss');
            this.adminUpID = id;
            this.pid = pid;
            this.taskId = taskid;
            this.vipConfigId = vipconfigid;
            this.vipStartYMD = startTime.split(" ")[0];
            this.vipStartHMS = startTime.split(" ")[1];
            this.vipStopYMD = stopTime.split(" ")[0];
            this.vipStopHMS = stopTime.split(" ")[1];
            this.addTips1 = '';
            this.addTips2 = '';
            this.getId()
        },



        update() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            var startT = [that.vipStartYMD, that.vipStartHMS].join(" ");
            var stopT = [that.vipStopYMD, that.vipStopHMS].join(" ");
            if ( that.pid === '' ) {
                this.addTips = '请输入Pid';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( isNaN(that.pid) ) {
                this.addTips = '请输入正确的Pid';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.vipConfigId ) {
                this.addTips = '请输入addvipConfigId';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.taskId ) {
                this.addTips = '请输入addTaskId';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( that.vipStartYMD == '' || that.vipStartHMS == '' ) {
                this.addTips = '请输入vip开始时间';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( that.vipStopYMD == '' || that.vipStopHMS == '' ) {
                this.addTips = '请输入vip结束时间';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/vip/update',
                    type: "POST",
                    data: {
                        id: that.adminUpID,
                        pid: that.pid,
                        vipconfigid: that.vipConfigId,
                        taskid: that.taskId,
                        start_at: startT,
                        stop_at: stopT
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
        this.$store.dispatch('tabChanger', 27);
        this.$store.dispatch('subChanger', 'sub9');

        this.vipList(this.page, this.size);
    }
}
</script>
