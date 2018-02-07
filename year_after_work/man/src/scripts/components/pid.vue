<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float: left" type="button" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddCode">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <form class="AM-topL form-inline" style="text-align:right;">
            <input type="number" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入source_pid" v-model.trim="source_pid">
            <input type="number" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入current_pid" v-model.trim="current_pid">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchCode" style="margin-right:5%;"></i>
        </form>
    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>source_pid</th>
                <th>reason</th>
                <th>current_pid</th>
                <th>op_admin</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.source_pid}}</td>
                <td>{{agent.reason}}</td>
                <td>{{agent.current_pid}}</td>
                <td>{{agent.op_admin}}</td>
            </tr>
        </tbody>
    </table>
    <nav class="AMnav">
        <ul class="pagination" v-if="pagesShow">
            <li><a href="javascript:void(0);" @click="pageBegin">Begin</a></li>
            <li><a href="javascript:void(0);" @click="pagePre">&laquo;</a></li>
            <div class="pageL">
                <li v-for="pageN in pageL">
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="codeList(pageN, size)">{{pageN}}</a>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">source_pid (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" style="width: 60%;height: 32px;padding-top: 6px;float: left" placeholder="pid" v-model.trim="sourcePid" @change="resetPid">
                                <input class="btn btn-default" type="button" value="检查" style="float:left;height: 32px;margin: 0 30px;" @click="checkPid(sourcePid)"/>
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
                                <!-- <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Failure">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    未直播
                                </div> -->
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Error">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    Pid 不存在
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">reason (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="reason" v-model.trim="reason">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">current_pid (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="current_pid" v-model.trim="currentPid">
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
                    <button type="button" class="btn btn-primary" @click="addCode">确认</button>
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
            agentL: [],
            name: "",
            newCode: "",
            newMsg: "",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            scode: "",
            code: "",
            msg: "",
            agencyUpID: "",
            AMtips1: "",
            AMtips2: "",
            upshow3: false,
            upshow3Success: 0,
            upshow3Failure: false,
            upshow3Error: false,
            sourcePid: "",
            currentPid: "",
            reason: "",
            source_pid: "",
            current_pid: ""
        }
    },

    methods: {
        codeList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/pidlog/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "source_pid": that.source_pid,
                    "current_pid": that.current_pid
                },
                success: function(data){
                    let r_code = data.returncode;
                    // console.log(data)
                    if(r_code == 200){
                        that.agentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.codeList(data.data.totalPageNum, size);
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
                            that.AMtips1 = '请求成功';;
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }
                    } else if (r_code == '301') {
                        console.log('参数错误');
                    } else if (r_code == '104') {
                        // console.log('code-104');
                        // debugger;
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.codeList(that.page, that.size)});
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
        resetPid() {
            const that = this;
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
        searchCode() {
            const that = this;
            that.page = 1;
            that.codeList(that.page, that.size);
        },
        resetaddCode() {
            const that = this;
            that.upshow3 = false;
            that.upshow3Success = 0;
            that.upshow3Error = false;
            that.upshow3Failure = false;
            that.sourcePid = "";
            that.reason = "";
            that.currentPid = "";
        },
        addCode() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.sourcePid == '') {
                that.addATips1 = '请填写pid';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.upshow3Success == 0) {
                that.addATips1 = '请检测pid';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.upshow3Success == 2) {
                that.addATips1 = 'pid不可用';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.reason == '') {
                that.addATips1 = '请填写reason';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.currentPid == '') {
                that.addATips1 = '请填写修改后的pid';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/pidlog/save',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "source_pid": that.sourcePid,
                        "reason": that.reason,
                        "current_pid": that.currentPid
                    },
                    success: function(data) {
                        let r_code = data.returncode;
                        if(r_code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            that.codeList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if (r_code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addCode);
                        } else if (r_code == '302') {
                            that.addATips1 = '变更的PID已存在';
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
            }
        },
        pageBegin() {
            const that = this;
            that.page = 1;
            that.codeList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.codeList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.codeList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.codeList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 54);
        this.$store.dispatch('subChanger', 'sub9');

        this.codeList(this.page, this.size);
        // console.log(this.$store.state.tabIndex);
        // this.adminList(this.page, this.size, this.name);
    }
}
</script>
