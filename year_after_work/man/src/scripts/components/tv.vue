<template id="">
<div class="">
    <div class="AM-top"  style="text-align:right; margin-right: 8.3%; margin-top: 10px;">
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>

        <div class="AM-topR">
            <input type="Number" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入pid" v-model.trim="pid">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchTv"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>Pid</th>
                <th>主播名称</th>
                <th>房间人数</th>
                <th>开始时间</th>
                <th>有效时长(min)</th>
                <th>Hot</th>
                <th>热度</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tv in tvL">
                <td class="AM-agentID">{{tv.liveid}}/{{tv.loginid}}</td>
                <td>{{tv.pid}}</td>
                <td>{{tv.hostname}}</td>
                <td>{{tv.num_audience}}</td>
                <td>{{moment(tv.create_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{Math.floor(tv.interval_val/60)}}</td>
                <td><i v-bind:class="tv.is_signed == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                <td>{{tv.num_charm}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(tv.liveid, tv.pid, tv.hostname, tv.num_charm)">调整热度</a></li>
                            <li><a href="javascript: void(0)"  @click="changeState(tv.is_signed, tv.liveid)">加入/移出hot</a></li>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="tvList(pageN, size)">{{pageN}}</a>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改热度</h4>
                </div>
                <div class="modal-body">
                    <div class="hideM">
                        {{liveUpId}}
                    </div>
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Pid</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="liveUpPid" disabled="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">主播名称</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="liveUpHostname" disabled="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">热度</label>
                            <div class="col-sm-10">
                                <input type="Number" class="form-control" placeholder="请输入热度" v-model.trim="hotN">
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
            AMtips1: '',
            AMtips2: '',
            adminN: '',
            adminE: '',
            adminR: '',
            adminP: '',
            adminA: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            tvL: [],
            upTips1: '',
            upTips2: '',
            liveUpId: '',
            liveUpPid: '',
            liveUpHostname: '',
            pageL: [],
            userid: '',
            hotN: '',
            pid: ''
        }
    },

    methods: {

        tvList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/live/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "pid": that.pid
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.tvL = [];
                        that.tvL = data.data.data;
                        if (page > data.data.totalPageNum) {
                            that.tvList(data.data.totalPageNum, size);
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
                            that.tvList(that.page, that.size)
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
                    url: that.$store.state.rootUrl3 + '/live/hot/remove',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "liveid": id,
                        "sign": 0
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.tvList(that.page, that.size);
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
                    url: that.$store.state.rootUrl3 + '/live/hot/join',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "liveid": id,
                        "sign": 1
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.tvList(that.page, that.size);
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

        searchTv() {
            const that = this;
            that.page = 1;
            that.tvList(that.page, that.size);
        },

        resetUpdate(liveid, pid, hostname, hotN) {
            this.liveUpId = liveid;
            this.liveUpPid = pid;
            this.liveUpHostname = hostname;
            this.hotN = hotN;
            this.upTips1 = '';
            this.upTips2 = '';
        },



        update() {
            const that = this;
            if (isNaN(parseInt(that.hotN)) ) {
                that.upTips1 = '请输入数字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else if ( that.hotN < 0 || that.hotN > 1000 ) {
                that.upTips1 = '请输入0--1000的数字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/live/hot/update',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "liveid": that.liveUpId,
                        "num_charm": that.hotN
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.tvList(that.page, that.size);
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function(data) {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }
        },

        pageBegin() {
            const that = this;
            that.page = 1;
            that.tvList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.tvList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.tvList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.tvList(that.page, that.size);
        },

    },


    mounted() {
        this.$store.dispatch('tabChanger', 23);
        this.$store.dispatch('subChanger', 'sub4');

        this.tvList(this.page, this.size);
    }
}
</script>
