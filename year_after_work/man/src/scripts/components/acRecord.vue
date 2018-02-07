<template id="">
<div class="">
    <div class="AM-top">

        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <form class="AM-topL form-inline">
            <input type="date" class="form-control AM-search" v-model.trim="time1">
            <input type="date" class="form-control AM-search" v-model.trim="time2">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入pid" v-model.trim="SAR">
            <select name="" id="" class="form-control" v-model.trim="type">
                <option value="">请选择类型</option>
                <option value="5">活动充钻</option>
                <option value="6">活动充鱼蛋</option>
            </select>
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="SagentRecord"></i>
        </form>

    </div>
    <table class="table table-striped table-hover AR-table">
        <thead>
            <tr>
                <th>代理商名称</th>
                <th>pid</th>
                <th>loginname</th>
                <th>充值鱼蛋数</th>
                <th>充值钻石数</th>
                <th>充值前</th>
                <th>充值后</th>
                <th>充值时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentLR">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.name}}</td>
                <td>{{agent.pid}}</td>
                <td>{{agent.loginname}}</td>
                <td>{{agent.coins}}</td>
                <td>{{agent.diamonds}}</td>
                <td>{{agent.user_before}}</td>
                <td>{{agent.user_current}}</td>
                <td>{{moment(agent.create_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{getStatus(agent.cancel)}}</td>
                <td>
                    <button type="button" :class="agent.cancel == 0 || agent.cancel == 4 ? 'show' : 'hide'" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#Modal" @click="cancelFn(agent._id)">
                      撤销
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="modal fade bs-example-modal-lg" id="Modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">确认撤销</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style = "font-size: 16px;">
                        撤销之后不可恢复，是否确定撤销？
                    </div>
                </div>
                <div class="addTips2">
                    {{upTips1}}
                </div>
                <div class="addTips">
                    {{upTips2}}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="ackCancel">确认</button>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="agentRecord(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>
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
            pagesShow: false,
            page: 1,
            size: 10,
            pageL: [],
            SAR: '',
            agentLR: [],
            moment: moment,
            time1: '',
            time2: '',
            searchPage: 1,
            type: '',
            pid: '',
            cancelId: '',
            upTips1: "",
            upTips2: "",
        }
    },

    methods: {
        agentRecord(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/activity/recharge/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "pid": that.SAR,
                    "begintime": that.time1,
                    "endtime": that.time2,
                    "type": that.type
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.agentLR = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.agentRecord(data.data.totalPageNum, size);
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
                    } else if (data.returncode == '301') {
                        console.log('参数错误');
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.agentRecord(that.page, that.size)});
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

        cancelFn(id) {
            this.cancelId = id;
        },
        ackCancel() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/activity/cancelrecharge',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": that.cancelId
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.upTips1 = '操作成功';
                        that.upTips2 = '';
                        that.agentRecord(that.page, that.size)
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#Modal').modal('hide');
                        }, 500);
                    } else if (data.returncode == '303'||data.returncode == '400') {
                        that.upTips1 = '';
                        that.upTips2 = '撤销失败';
                        that.agentRecord(that.page, that.size)
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#Modal').modal('hide');
                        }, 500);
                    } else if (data.returncode == '301') {
                        console.log('参数错误');
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.ackCancel);
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

        getStatus(cancel) {
            var statusTxt = '';
            if( cancel == 0 ){
                statusTxt = '充值成功';
            }else if( cancel == 1 ){
                statusTxt = '已撤销';
            }else if( cancel == 2 ){
                statusTxt = '撤销成功';
            }else if( cancel == 3 ){
                statusTxt = '充值失败';
            }else if( cancel == 4 ){
                statusTxt = '撤销失败';
            }
            return statusTxt;
        },

        SagentRecord() {
            // console.log(1);
            const that = this;
            that.page = 1;
            that.agentRecord(that.page, that.size);
        },



        pageBegin() {
            const that = this;
            that.page = 1;
            that.agentRecord(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.agentRecord(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.agentRecord(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.agentRecord(that.page, that.size);
        },
    },

    mounted() {
        // console.log(moment().format());
        // console.log(this.$store.state.tabIndex);
        this.$store.dispatch('tabChanger', 32);
        this.$store.dispatch('subChanger', 'sub7');

        // console.log(this.$store.state.tabIndex);
        this.agentRecord(this.page, this.size);
    }
}
</script>
