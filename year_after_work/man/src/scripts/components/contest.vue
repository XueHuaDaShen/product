<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float: left" type="button" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddVideo">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <!-- <form class="AM-topL form-inline" style="text-align:right;">
            <input type="number" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入short_no" v-model.trim="searchShort">
            <input type="number" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入week_no" v-model.trim="searchWeek">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchCode" style="margin-right:5%;"></i>
        </form> -->
    </div>
    <table class="table table-striped table-hover AM-table">
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>pid</th>
                <th>loginname</th>
                <th>code</th>
                <th>contestName</th>
                <th>rank</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.pid}}</td>
                <td>{{agent.loginname}}</td>
                <td>{{agent.code}}</td>
                <td>{{agent.name}}</td>
                <td>{{agent.rank}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#delModal" @click="getAnchorID(agent._id, '晋级')">晋级</a></li>
                            <li v-if="agent.rank>1"><a href="javascript: void(0)" data-toggle='modal' data-target="#delModal" @click="getAnchorID(agent._id, '降级')">降级</a></li>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="codeList(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>
    <div class="modal fade bs-example-modal-lg" id="delModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">{{contest}}</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style="font-size: 16px;">
                        确定将该主播{{contest}}吗？
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
                    <button type="button" class="btn btn-primary" @click="deleteList">确认</button>
                </div>
            </div>
        </div>
    </div>
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
                            <label class="col-sm-2 control-label">contestName (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="contestName" v-model.trim="newname">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">code (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="code" v-model.trim="newcode">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="col-sm-2 control-label">pid (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" style="width: 60%;height: 32px;padding-top: 6px;float: left" placeholder="pid" v-model.trim="newpid" @change="resetPid">
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
                                    Pid 可用
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Error">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    Pid 不存在
                                </div>
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
                    <button type="button" class="btn btn-primary" @click="addVideo">确认</button>
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

            anchorID: "",
            
            newname: "",
            newcode: "",
            newpid: "",

            upshow3: false,
            upshow3Success: 0,
            upshow3Error: false,
            upshow3Failure: false,

            searchShort: "",
            searchWeek: "",

            contest: ""
        }
    },

    methods: {
        codeList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/match/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size
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
                            that.AMtips1 = '请求成功';
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }
                    } else if (r_code == '303') {
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

        // searchCode() {
        //     const that = this;
        //     that.page = 1;
        //     that.codeList(that.page, that.size);
        // },
        resetaddVideo() {
            const that = this;
            this.newname = "";
            this.newcode = "";
            this.newpid = "";

            this.upshow3 = false;
            this.upshow3Success = 0;
            this.upshow3Error = false;
            this.upshow3Failure = false;
        },
        addVideo() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.newname == '') {
                that.addATips1 = '请选择contestName';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newcode == '') {
                that.addATips1 = '请选择code';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newpid == '') {
                that.addATips1 = '请输入pid';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.upshow3Success == 0) {
                that.addATips1 = '请检查pid';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.upshow3Success == 2) {
                that.addATips1 = 'pid不符合规则';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/match/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "name": that.newname,
                        "code": that.newcode,
                        "pid": that.newpid
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
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addVideo);
                        } else if (r_code == '302') {
                            that.addATips1 = '服务器错误';
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

        getAnchorID(id, contest) {
            this.upTips1 = '';
            this.upTips2 = '';
            this.anchorID = id;
            this.contest = contest;
        },

        deleteList() {
            const that = this;
            var url = this.contest == '降级'? '/match/demote':'/match/promote';
            $.ajax({
                url: that.$store.state.rootUrl3 + url,
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    'id': that.anchorID
                },
                success: function(data) {
                    let code = data.returncode;
                    // console.log(data)
                    if (code == 200) {
                        that.upTips2 = '请求成功';
                        that.codeList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#delModal').modal('hide');
                        }, 500);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.deleteList);
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
        this.$store.dispatch('tabChanger', 57);
        this.$store.dispatch('subChanger', 'sub9');

        this.codeList(this.page, this.size);
        // console.log(this.$store.state.tabIndex);
        // this.adminList(this.page, this.size, this.name);
    }
}
</script>
