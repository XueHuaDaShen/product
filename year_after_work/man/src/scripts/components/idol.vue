<template id="">
<div class="">
    <div class="AM-top" style="text-align:left">
        <button type="button" style="margin-left:0;margin-top:8px;" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddMenu">New</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <div class="AM-topR" style = "float:right; margin-right: .9%; margin-bottom: 25px;">
            <select class="form-control record-info" style="width:30%;display:inline-block" name="" id="exampleInputEmail1" v-model.trim="searchTaskId">
                <option value="">请选择</option>
                <option v-for="taskId in taskL" v-bind:value="taskId._id">{{taskId.title}}</option>
            </select>
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" style = "width: 38%;" placeholder="Please enter the PID" v-model.trim="searchPid">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAdmin" ></i>
        </div>
    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>pid</th>
                <th>fb_live_time</th>
                <th>fb_post_id</th>
                <th>num_comment</th>
                <th>num_like</th>
                <th>num_share</th>
                <th>num_view</th>
                <th>score</th>
                <th>operation</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.pid}}</td>
                <td>{{agent.fb_live_time}}</td>
                <td>{{agent.fb_post_id}}</td>
                <td>{{agent.num_comment}}</td>
                <td>{{agent.num_like}}</td>
                <td>{{agent.num_share}}</td>
                <td>{{agent.num_view}}</td>
                <td>{{agent.score}}</td>
                <td>
                    <button type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent._id, agent.fb_live_time, agent.fb_post_id, agent.num_view, agent.num_like, agent.num_comment, agent.num_share, agent.fb_link, agent.taskid)">
                      Édition
                    </button>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="menuList(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>
    <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">New</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">pid (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" style="width: 55%;height: 32px;padding-top: 6px;float: left" placeholder="pid" v-model.trim="newpid" @change="resetPid">
                                <input class="btn btn-default" type="button" value="Check" style="float:left;height: 32px;margin: 0 30px;" @click="checkPid(newpid)"/>
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
                                    Pid is available
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Error">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    Pid does not exist
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">taskID (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="newTaskId">
                                    <option value="">请选择</option>
                                    <option v-for="taskId in taskL" v-bind:value="taskId._id">{{taskId.title}}</option>
                                </select>
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-sm-2 control-label">fb_live_time (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" id="inputEmail3" class="form-control" v-model.trim="newfb_live_timeYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" id="inputEmail3" class="form-control" v-model.trim="newfb_live_timeHMS">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">fb_post_id</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="fb_post_id" v-model.trim="newfb_post_id">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">num_view</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="num_view" v-model.trim="newnum_view">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">num_like</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="num_like" v-model.trim="newnum_like">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">num_comment</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="num_comment" v-model.trim="newnum_comment">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">num_share</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="num_share" v-model.trim="newnum_share">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">fb_link</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="fb_link" v-model.trim="newfb_link">
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">cancel</button>
                    <button type="button" class="btn btn-primary" @click="addMenu">confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">Édition</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">pid (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" style="width: 60%;height: 32px;padding-top: 6px;float: left" placeholder="pid" v-model.trim="pid" @change="resetPid">
                                <input class="btn btn-default" type="button" value="检查" style="float:left;height: 32px;margin: 0 30px;" @click="checkPid(pid)"/>
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
                                    Pid 可用
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Error">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    Pid 不存在
                                </div>
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label class="col-sm-2 control-label">taskID (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="exampleInputEmail1" v-model.trim="taskId">
                                    <option value="">请选择</option>
                                    <option v-for="taskId in taskL" v-bind:value="taskId._id">{{taskId.title}}</option>
                                </select>
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-sm-2 control-label">fb_live_time (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" id="inputEmail3" class="form-control" v-model.trim="fb_live_timeYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" id="inputEmail3" class="form-control" v-model.trim="fb_live_timeHMS">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">fb_post_id</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="fb_post_id" v-model.trim="fb_post_id">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">num_view</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="num_view" v-model.trim="num_view">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">num_like</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="num_like" v-model.trim="num_like">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">num_comment</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="num_comment" v-model.trim="num_comment">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">num_share</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="num_share" v-model.trim="num_share">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">fb_link</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="fb_link" v-model.trim="fb_link">
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">cancel</button>
                    <button type="button" class="btn btn-primary" @click="update">confirm</button>
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
            searchTaskId: '',
            taskL: [],
            agentL: [],
            newpid: "",
            newfb_live_timeYMD: "",
            newfb_live_timeHMS: "",
            newfb_post_id: "",
            newnum_view: 0,
            newnum_like: 0,
            newnum_comment: 0,
            newnum_share: 0,
            newfb_link: '',
            newTaskId: '',

            pid: "",
            fb_live_timeYMD: "",
            fb_live_timeHMS: "",
            fb_post_id: "",
            num_view: 0,
            num_like: 0,
            num_comment: 0,
            num_share: 0,
            fb_link: '',
            taskId: '',

            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            agencyUpID: "",
            AMtips1: "",
            AMtips2: "",
            searchPid: "",

            upshow3: false,
            upshow3Success: 0,
            upshow3Error: false,
            upshow3Failure: false,
            matchUrl: /^(((ht|f)tps?):\/\/)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/
        }
    },

    methods: {
        menuList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/activityrecord/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "taskid": that.searchTaskId,
                    "pid": that.searchPid
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        // console.log(data);
                        that.agentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.menuList(data.data.totalPageNum, size);
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
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.menuList(that.page, that.size)});
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
        getTaskIdList() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/activity/getall',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        // console.log(data);
                        that.taskL = data.data;
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.menuList(that.page, that.size)});
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
            that.menuList(that.page, that.size);
        },
        resetPid() {
            const that = this;
            that.upshow3 = false;
            that.upshow3Success = 0;
            that.upshow3Failure = false;
            that.upshow3Error = false;
        },
        checkPid(pid) {
            const that = this;
            that.upshow3 = true;
            that.upshow3Success = 0;
            that.upshow3Error = false;
            that.upshow3Failure = false;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/user/get',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    pid: pid
                },
                success: function (data) {
                    if (data.returncode == '200') {
                        
                        that.upshow3 = false;
                        that.upshow3Error = false;
                        that.upshow3Failure = false;
                        that.upshow3Success = 1;

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
        },
        resetUpdate(id, fb_live_time, fb_post_id, num_view, num_like, num_comment, num_share, fb_link, taskid) {
            this.agencyUpID = id;
            this.fb_live_timeYMD = fb_live_time.split(" ")[0];
            this.fb_live_timeHMS = fb_live_time.split(" ")[1];
            this.fb_post_id = fb_post_id;
            this.num_view = num_view;
            this.num_like = num_like;
            this.num_comment = num_comment;
            this.num_share = num_share;
            this.fb_link = fb_link || '';
            this.taskId = taskid;
        },
        update() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            var fb_live_time = [that.fb_live_timeYMD, that.fb_live_timeHMS].join(" ");
            if (that.fb_live_timeYMD == '' && that.fb_live_timeHMS == '') {
                that.addATips1 = 'Please enter the fb_live_time';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.fb_link != '' && !that.matchUrl.test(that.fb_link) ) {
                that.addATips1 = 'Please fill in the correct form fb_link';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.taskId == ''  ) {
                that.addATips1 = 'Please select taskID';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/activityrecord/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        'fb_live_time': fb_live_time,
                        'fb_post_id': that.fb_post_id,
                        'num_view': that.num_view,
                        'num_like': that.num_like,
                        'num_comment': that.num_comment,
                        'num_share': that.num_share,
                        'fb_link': that.fb_link,
                        "id": that.agencyUpID,
                        "taskid": that.taskId
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = 'Operation is successful';
                            that.menuList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
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
        resetaddMenu() {
            this.newpid = "";
            this.newfb_live_timeYMD = "";
            this.newfb_live_timeHMS = "";
            this.newfb_post_id = "";
            this.newnum_view = 0;
            this.newnum_like = 0;
            this.newnum_comment = 0;
            this.newnum_share = 0;
            this.newfb_link = '';
            this.newTaskId = '';
            this.upshow3 = false;
            this.upshow3Success = 0;
            this.upshow3Error = false;
            this.upshow3Failure = false;
        },
        addMenu() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            var newfb_live_time = [that.newfb_live_timeYMD, that.newfb_live_timeHMS].join(" ");
            if (that.newpid == '') {
                that.addATips1 = 'Please enter the PID';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            }else if (that.upshow3Success == 0) {
                that.addATips1 = 'Please check the PID';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            }else if (that.upshow3Success == 2) {
                that.addATips1 = 'Pid does not conform to the rules';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if (that.newfb_live_timeYMD == '' && that.newfb_live_timeHMS == '') {
                that.addATips1 = 'Please enter the fb_live_time';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newfb_link != '' && !that.matchUrl.test(that.newfb_link) ) {
                that.addATips1 = 'Please fill in the correct form fb_link';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newTaskId == ''  ) {
                that.addATips1 = 'Please select taskID';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/activityrecord/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        'pid': that.newpid,
                        'fb_live_time': newfb_live_time,
                        'fb_post_id': that.newfb_post_id,
                        'num_view': that.newnum_view,
                        'num_like': that.newnum_like,
                        'num_comment': that.newnum_comment,
                        'num_share': that.newnum_share,
                        'fb_link': that.newfb_link,
                        'taskid': that.newTaskId
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = 'Operation is successful';
                            that.menuList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if(code == '302') {
                            that.addATips1 = 'Pid existing';
                            that.addATips2 = '';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 1000);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addMenu);
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
        pageBegin() {
            const that = this;
            that.page = 1;
            that.menuList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.menuList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.menuList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.menuList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 58);
        this.$store.dispatch('subChanger', 'sub9');
        this.getTaskIdList();
        this.menuList(this.page, this.size);
    }
}
</script>
