<template id="">
<div class="">
    <div class="AM-top" style="margin-top: 10px;">
        <span class="AM-tips1" style="top:17px;left:120px;">{{AMtips1}}</span>
        <span class="AM-tips2" style="top:17px;left:120px;">{{AMtips2}}</span>
        <div class="AM-topInfo per" style="-webkit-box-pack:end;padding-right:9%">
            <button style = "position:absolute;left:0;" type="button" class="btn btn-primary AM-add" data-toggle="modal" data-target="#myModal" @click="resetAdd">新增候选人</button>
            <input type="text" style="margin-right:10px;" class="form-control record-month" id="exampleInputEmail1" placeholder="请输入PID" v-model.trim="searchPid">
            <select class="form-control record-month" v-model="searchType" style="margin-right:10px;">
                <option value="">请选择Type</option>
                <option value="0">直播间</option>
                <option value="1">Livehouse</option>
                <option value="2">niceTV</option>
                <option value="3">music hour</option>
            </select>
            <select class="form-control record-month" v-model="searchTaskid" style="margin-right:10px;">
                <option value="">请选择TaskID</option>
                <option v-for="taskId in taskL" v-bind:value="taskId._id">{{taskId.title}}</option>
            </select>
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchCandidate" ></i>
        </div>
        <!-- Modal -->
    </div>
    <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增候选人</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">PID (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="inputEmail3" placeholder="PID" v-model.trim="newpid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">type</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="newtype">
                                    <option value="">请选择Type</option>
                                    <!-- <option value="0">直播间</option> -->
                                    <option value="1">Livehouse</option>
                                    <option value="2">niceTV</option>
                                    <option value="3">music hour</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">taskid (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="newtaskid">
                                    <option value="">请选择</option>
                                    <option v-for="taskId in taskL" v-bind:value="taskId._id">{{taskId.title}}</option>
                                </select>
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
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>PID</th>
                <th>loginname</th>
                <th>type</th>
                <th>num_votes</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.pid}}</td>
                <td>{{admin.loginname}}</td>
                <td>{{ isType(admin.type) }}</td>
                <td>{{admin.num_votes}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" data-toggle="modal" data-target="#deleteModal" @click="getCandidatePid(admin._id, admin.pid)">删除</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.pid, admin.loginname, admin.type)">编辑信息</a></li>
                        </ul>
                    </div>
                </td>
            </tr>

        </tbody>
    </table>
    <div class="modal fade bs-example-modal-lg" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">删除候选人</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div style="text-align:center;">
                                确认删除 PID 为 {{delPID}} 的候选人吗？
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
                        <button type="button" class="btn btn-primary" @click="deleteCandidate">确认</button>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="candidateList(pageN, size)">{{pageN}}</a>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改vip</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">PID (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" id="inputEmail3" readOnly v-model.trim="updatePid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">LoginName (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputEmail3" readOnly v-model.trim="updateName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">type</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="updateType">
                                    <option value="">请选择</option>
                                    <!-- <option value="0">直播间</option> -->
                                    <option value="1">Livehouse</option>
                                    <option value="2">niceTV</option>
                                    <option value="3">music hour</option>
                                </select>
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
            searchPid: '',
            searchType: '',
            searchTaskid: '',
            animationid: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            adminL: [],
            upTips1: '',
            upTips2: '',
            moment: moment,
            pageL: [],

            taskL: [],
            newtaskid: '',
            newpid: '',
            newtype: '',
            taskid: '',
            pid: '',
            type: '',

            delID: '',
            delPID: '',

            updateId: '',
            updatePid: '',
            updateName: '',
            updateType: ''
        }
    },

    methods: {
        resetAdd() {
            this.newpid = '';
            this.newtype = '';
            this.newtaskid = '';
            this.addTips1 = '';
            this.addTips2 = '';
            this.getTaskId();
        },
        addVIP() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            if( that.newpid === '' ){
                this.addTips = '请填写PID';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( that.newtype === '' ) {
                this.addTips = '请填写type';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( that.newtaskid == '' ) {
                this.addTips = '请选择taskID';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/vote/candidate/add',
                    type: "POST",
                    data: {
                        pid: that.newpid,
                        type: that.newtype,
                        taskid: that.newtaskid
                    },
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#myModal').modal('hide');
                                that.candidateList(that.page, that.size);
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

        candidateList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/vote/candidate/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "pid": that.searchPid,
                    "type": that.searchType,
                    "taskid": that.searchTaskid
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        console.log(data)
                        that.adminL = [];
                        that.adminL = data.data.data;
                        if (page > data.data.totalPageNum) {
                            that.candidateList(data.data.totalPageNum, that.size);
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
                            that.candidateList(that.page, that.size)
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

        getCandidatePid(id, pid) {
            const that = this;
            that.delID = id;
            that.delPID = pid;
            that.addTips = '';
            that.addTips2 = '';
        },
        deleteCandidate() {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/vote/candidate/remove',
                type: "POST",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "_id": that.delID
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.addTips2 = '操作成功';
                        setTimeout(function() {
                            that.addTips2 = '';
                            $('#deleteModal').modal('hide');
                            that.candidateList(that.page, that.size);
                        }, 1000);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.deleteCandidate);
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
        getTaskId() {
            const that = this;
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
        searchCandidate() {
            const that = this;
            that.page = 1;
            that.candidateList(that.page, that.size);
        },

        resetUpdate(id, pid, name, type) {
            this.updateId = id;
            this.updatePid = pid;
            this.updateName = name;
            this.updateType = type;
            this.addTips1 = '';
            this.addTips2 = '';
        },



        update() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            var startT = [that.vipStartYMD, that.vipStartHMS].join(" ");
            var stopT = [that.vipStopYMD, that.vipStopHMS].join(" ");
            if( that.updateType === '' ){
                this.addTips = '请选择类型';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/vote/candidate/updateType',
                    type: "POST",
                    data: {
                        _id: that.updateId,
                        type: that.updateType
                    },
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#updateModal').modal('hide');
                                that.candidateList(that.page, that.size);
                            }, 1000);
                        } else if (data.returncode == '301' || data.returncode == '303') {
                            that.addTips1 = '请求失败';
                            setTimeout(function() {
                                that.addTips1 = '';
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

        isType(type) {
            switch(type){
                case 0: return '直播间';
                case 1: return 'Livehouse';
                case 2: return  'niceTV';
                case 3: return  'music hour';
            }
        },

        pageBegin() {
            const that = this;
            that.page = 1;
            that.candidateList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.candidateList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.candidateList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.candidateList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 61);
        this.$store.dispatch('subChanger', 'sub5');
        this.getTaskId();
        this.candidateList(this.page, this.size);
    }
}
</script>
