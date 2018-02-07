<template id="">
<div class="">
    <div class="AM-top" style="margin-top: 10px;">
        <button style="float:left;margin-bottom: 25px" type="button" class="btn btn-primary AM-add" data-toggle="modal" data-target="#myModal" @click="resetAdd">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>

    </div>
    <table class="table table-striped table-hover AM-table" style="table-layout: fixed;">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>Loginname</th>
                <th>PID</th>
                <th>LiveID</th>
                <th>push_stream</th>
                <th>pull_stream</th>
                <th>Type</th>
                <th>Delay (Millisecond)</th>
                <th>Area</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td style="display: none;">{{agent.loginid}}</td>
                <td>{{agent.loginname}}</td>
                <td>{{agent.pid}}</td>
                <td style = "max-width: 200px; word-break: break-all;">{{agent.liveid}}</td>
                <td style = "max-width: 200px; word-break: break-all;">{{agent.push_stream}}</td>
                <td style = "max-width: 200px; word-break: break-all;">{{agent.pull_stream}}</td>
                <td>{{roomType(agent.type)}}</td>
                <td>{{agent.delay}}</td>
                <td>{{agent.cc}}</td>
                <td><i v-bind:class="agent.status == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>

                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="resetChange(agent.status, agent.liveid, agent.loginid, agent.type)">开启/关闭房间</a></li>
                            <li v-if="agent.status == 0"><a href="javascript: void(0)" @click="getRoomIdFn(agent.pid, agent.type, agent.robot_ratio, agent.delay, agent.cc)" data-toggle="modal" data-target="#updateModal">编辑</a></li>
                            <li><a href="javascript: void(0)" @click="resetDel(agent.pid)" data-toggle="modal" data-target="#delModal">删除</a></li>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="unionList(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>

    <div class="modal fade bs-example-modal-lg" id="startModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">开启房间 -- 请选择横竖屏</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="radio-inline" style="height: 20px; font-size: 16px; margin:0 20px;">
                                <input type="radio" name="inlineRadioOptions" v-model = "picked" id="inlineRadio1" value="0"> 竖屏
                            </label>
                            <label class="radio-inline" style="height: 20px; font-size: 16px; margin:0 20px;">
                                <input type="radio" name="inlineRadioOptions" v-model = "picked" id="inlineRadio2" value="1"> 横屏
                            </label>
                        </div>

                        <!-- <span>Picked: {{ picked }}</span> -->
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
                    <button type="button" class="btn btn-primary" @click="startLive">确认</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="stopModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">关闭房间</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style="font-size: 16px;">
                        是否确定关闭房间
                    </div>
                    <div class="addTips">
                        {{upTips1}}
                    </div>
                    <div class="addTips2">
                        {{upTips2}}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="stopLive">确认</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="delModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">删除房间</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style="font-size: 16px;">
                        是否确定删除 Pid {{delPid}} 房间
                    </div>
                    <div class="addTips">
                        {{upTips1}}
                    </div>
                    <div class="addTips2">
                        {{upTips2}}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="delCon(delPid)">确认</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Pid (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="Pid" v-model.trim="adminPid">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-2 control-label">type (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="adminType">
                                    <option value="0">Default</option>
                                    <option value="1">Live House</option>
                                    <option value="2">Music Hour Landscape</option>
                                    <!--<option value="3">Nice TV</option>-->
                                    <option value="4">Music Hour Portrait</option>
                                    <option value="5">Answer the questions on the room</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="adminType==5">
                            <label class="col-sm-2 control-label">robot_ratio (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="robot_ratio" v-model.trim="robot_ratio">
                            </div>
                        </div>
                        <div class="form-group" v-if="adminType==5">
                            <label class="col-sm-2 control-label">Delay (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="Delay (Millisecond)" v-model.trim="newDelay">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label hasMR">Area (*)</label>
                            <select class="form-control acName col-sm-10" v-model="newArea">
                                <option value="">Please select the area</option>
                                <option v-for = "type in typeList" v-bind:value="type.code">
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="addLive()">确认</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">编辑</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Pid (*)</label>
                            <div class="col-sm-10">
                                <input type="number" disabled class="form-control" placeholder="Pid" v-model.trim="updatePid">
                            </div>
                        </div>

                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">type (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="updateType" disabled>
                                    <option value="5">Answer the questions on the room</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">robot_ratio (*)</label>
                            <div class="col-sm-10">
                                <input type="nember" disabled class="form-control" placeholder="robot_ratio" v-model.trim="update_robot_ratio">
                            </div>
                        </div> -->
                        <div class="form-group" v-if="updateType==5">
                            <label class="col-sm-2 control-label">Delay (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="Delay (Millisecond)" v-model.trim="updateDelay">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label hasMR">Area (*)</label>
                            <select class="form-control acName col-sm-10" v-model.trim="updateArea">
                                <option value="">Please select the area</option>
                                <option v-for = "type in typeList" v-bind:value="type.code">
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateRoomFn">确认</button>
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
            union_name: "",
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
            AMtips1: "",
            AMtips2: "",
            liveid: "",
            loginid: "",
            push_stream: "",
            screenDirection: '',
            picked: '',
            adminPid: '',
            adminType: '',
            delPid: '',
            robot_ratio: '',

            updatePid: '',
            updateType: '',
            update_robot_ratio: '',

            typeList: [],
            newArea: '',
            newDelay: '',
            updateArea: '',
            updateDelay: '',
        }
    },

    methods: {
        roomType(val){
            switch(val){
                case 0: return 'Default';
                case 1: return 'Live House';
                case 2: return 'Music Hour Landscape';
                case 4: return 'Music Hour Portrait';
                case 5: return 'Answer the questions on the room';
            }
        },

        getRoomIdFn(id, type, robot_ratio, delay, cc) {
            const that = this;
            this.updatePid = id;
            this.updateType = type;
            this.update_robot_ratio = robot_ratio;
            this.updateDelay = delay;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/ownarea/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                // data: {
                //     "code": 'V2000'
                // },
                success: function(data){
                    let code = data.returncode;
                    console.log(data)
                    if(code == 200){
                        that.typeList = data.data;
                        that.updateArea = cc;
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.getRoomIdFn(id, type, robot_ratio, delay, cc)});
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

        updateRoomFn() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            
            if ( that.updateType == 5 && that.updateDelay === '') {
                that.upTips1 = 'Please fill in the delay time';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1500);
            } else if ( that.updateArea === '') {
                that.upTips1 = 'Please select the area';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1500);
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/liveuser/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        'pid': that.updatePid,
                        // "type": that.updateType,
                        // "robot_ratio": that.update_robot_ratio,
                        "delay": that.updateDelay,
                        "cc": that.updateArea
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if (code == '200') {
                            that.upTips2 = '操作成功';
                            that.unionList(that.page, that.size);
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 1500);
                        } else if (code == '303') {
                            that.upTips1 = '参数错误';
                            setTimeout(function() {
                                that.upTips1 = '';
                            }, 1500);
                        } else if (code == '301') {
                            that.upTips1 = '服务器错误';
                            setTimeout(function() {
                                that.upTips1 = '';
                            }, 1500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.updateRoomFn);
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
        unionList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/live/concert/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    type: "0,1,2,4,5",
                    page: page,
                    sizes: size
                },
                success: function(data) {
                    let code = data.returncode;
                    console.log(data);
                    if (code == 200) {
                        console.log(data.data.data);
                        that.agentL = data.data.data;
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
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.unionList(page, size);
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

        resetChange(status, liveid, loginid, type) {
            const that = this;
            that.liveid = liveid;
            that.loginid = loginid;
            that.type = type;
            that.upTips1 = '';
            that.upTips2 = '';
            if (status == 0) {
                $('#startModal').modal('show');
                that.picked = 0;
            } else if (status == 1) {
                $('#stopModal').modal('show');
            }
        },

        startLive() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/live/concert/save',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    'screen_orientation': that.picked,
                    'loginid': that.loginid,
                    "type": that.type
                },
                success: function(data) {
                    let code = data.returncode;
                    console.log(data)
                    if (code == 200) {
                        that.upTips2 = '操作成功';
                        that.unionList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#startModal').modal('hide');
                        }, 500);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.startLive);
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

        stopLive() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/live/concert/stop',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    'liveid': that.liveid
                },
                success: function(data) {
                    let code = data.returncode;
                    console.log(data)
                    if (code == 200) {
                        that.upTips2 = '请求成功';
                        that.unionList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#stopModal').modal('hide');
                        }, 500);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.stopLive);
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

        resetDel(pid) {
            this.delPid = pid;
        },

        delCon(delPid) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/liveuser/delete',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    'pid': delPid
                },
                success: function(data) {
                    let code = data.returncode;
                    // console.log(data)
                    if (code == 200) {
                        that.upTips2 = '请求成功';
                        that.unionList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#delModal').modal('hide');
                        }, 500);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.delCon);
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

        resetAdd() {
            const that = this;
            that.adminPid = '';
            that.adminType = 0;
            that.robot_ratio = '';
            that.upTips2 = '';
            that.upTips1 = '';
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/ownarea/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                // data: {
                //     "code": 'V2000'
                // },
                success: function(data){
                    let code = data.returncode;
                    console.log(data)
                    if(code == 200){
                        that.typeList = data.data;
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.resetAdd);
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
        addLive() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            
            if (that.adminPid === '' || that.adminType == '') {
                that.upTips1 = '请把信息补充完整';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1500);
            } else if (that.newArea === '') {
                that.upTips1 = 'Please select the area';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1500);
            }
             else if (that.adminType == 5 && that.newDelay === '') {
                that.upTips1 = 'Please fill in the delay time';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1500);
            } else if (isNaN(that.adminPid)) {
                that.upTips1 = '请填写正确的Pid';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1500);
            } else if (that.adminType == 5 && that.robot_ratio === '') {
                that.upTips1 = '请填写robot_ratio';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1500);
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/liveuser/save',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        'pid': that.adminPid,
                        'type': that.adminType,
                        "robot_ratio": that.robot_ratio,
                        "delay": that.newDelay,
                        "cc": that.newArea
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if (code == '200') {
                            that.upTips2 = '操作成功';
                            that.unionList(that.page, that.size);
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#myModal').modal('hide');
                            }, 500);
                        } else if (code == '303') {
                            that.upTips1 = '参数错误';
                            setTimeout(function() {
                                that.upTips1 = '';
                            }, 500);
                        } else if (code == '306') {
                            that.upTips1 = '用户已存在';
                            setTimeout(function() {
                                that.upTips1 = '';
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addLive);
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


    },

    mounted() {
        this.$store.dispatch('tabChanger', 33);
        this.$store.dispatch('subChanger', 'sub4');

        this.unionList(this.page, this.size);
    }
}
</script>
