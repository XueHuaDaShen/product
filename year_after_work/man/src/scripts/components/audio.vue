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
                <th>loginname</th>
                <th>pid</th>
                <th>num_share</th>
                <th>num_follower</th>
                <th>play_length</th>
                <th>num_revenue</th>
                <th>union</th>
                <th>num_charm</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td style="display: none;">{{agent.loginid}}</td>
                <td>{{agent.loginname}}</td>
                <td>{{agent.pid}}</td>
                <td>{{agent.num_share}}</td>
                <td style = "max-width: 200px; word-break: break-all;">{{agent.num_follower}}</td>
                <td>{{agent.play_length}}</td>
                <td>{{agent.num_revenue}}</td>
                <td>{{agent.union}}</td>
                <td>{{agent.num_charm}}</td>

                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#stopModal" @click="deleteRtc(agent.pid)">
                      禁用
                    </button>
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


    <div class="modal fade bs-example-modal-lg" id="stopModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">禁用连麦</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style="font-size: 16px;">
                        是否确定禁用连麦
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
                            <label class="col-sm-2 control-label">Pid</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="Pid" v-model.trim="adminPid">
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
                    <button type="button" class="btn btn-primary" @click="addLive()">确认</button>
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
            delPid: ''
        }
    },

    methods: {
        unionList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/host/rtc/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    page: page,
                    sizes: size
                },
                success: function(data) {
                    let code = data.returncode;
                    if (code == 200) {
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


        deleteRtc(pid) {
            this.delPid = pid;
        },


        stopLive() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/host/rtc/disable',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    'pid': that.delPid
                },
                success: function(data) {
                    let code = data.returncode;
                    console.log(data)
                    if (code == 200) {
                        that.upTips2 = '操作成功';
                        that.unionList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#stopModal').modal('hide');
                        }, 500);
                    } else if (code == '304') {
                        that.upTips1 = '用户不存在';
                        that.unionList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips1 = '';
                        }, 500);
                    } else if (code == '305') {
                        that.upTips1 = '重复提交';
                        that.unionList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips1 = '';
                        }, 500);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.stopLive);
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
            that.upTips2 = '';
            that.upTips1 = '';
        },
        addLive() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            if (that.adminPid === '') {
                that.upTips1 = '请把信息补充完整';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1500);
            } else if (isNaN(that.adminPid)) {
                that.upTips1 = '请填写正确的Pid';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1500);
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/host/rtc/save',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        'pid': that.adminPid
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
                        } else if (code == '304') {
                            that.upTips1 = '用户不存在';
                            that.unionList(that.page, that.size);
                            setTimeout(function() {
                                that.upTips1 = '';
                            }, 500);
                        } else if (code == '305') {
                            that.upTips1 = '重复提交';
                            that.unionList(that.page, that.size);
                            setTimeout(function() {
                                that.upTips1 = '';
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addLive);
                        }  else {
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
        this.$store.dispatch('tabChanger', 36);
        this.$store.dispatch('subChanger', 'sub9');

        this.unionList(this.page, this.size);
    }
}
</script>
