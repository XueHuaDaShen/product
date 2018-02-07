<template id="">
<div class="">
    <div class="AM-top" style="margin-top: 10px;">
        <span class="AM-tips1" style="left:0;top: 18px;">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <div class="AM-topInfo per">
            <button type="button" style="margin-right:20px;" class="btn btn-primary" @click="_export">导出</button>
            <input type="text" class="form-control record-info" id="exampleInputEmail1" placeholder="付款方" v-model.trim = "payer">
            <select class="form-control record-info" name="" id="exampleInputEmail1" v-model.trim="status">
                <option value="">选择状态</option>
                <option value="1">提交</option>
                <option value="2">处理中</option>
                <option value="3">成功</option>
                <option value="4">失败</option>
            </select>
            <label>开始时间：</label>
            <input type="date" class="form-control record-month" id="exampleInputEmail1" v-model.trim = "beginTime">
            <label>结束时间：</label>
            <input type="date" class="form-control record-month" id="exampleInputEmail1" v-model.trim = "endTime">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAnchor"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>收款方</th>
                <th>付款方</th>
                <th>付款金额</th>
                <th>状态</th>
                <th>创建时间</th>
                <th>凭据</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.payee}}</td>
                <td style="max-width:150px;overflow:hidden;">{{agent.payer}}</td>
                <td>{{agent.amount}}</td>
                <td>{{agent.status}}</td>
                <td>{{moment(agent.create_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td style="max-width:150px;overflow:hidden;white-space:nowrap;">{{agent.content}}</td>
            </tr>
        </tbody>
    </table>
    <nav class="AMnav">
        <ul class="pagination" v-if="pagesShow">
            <li><a href="javascript:void(0);" @click="pageBegin">Begin</a></li>
            <li><a href="javascript:void(0);" @click="pagePre">&laquo;</a></li>
            <div class="pageL">
                <li v-for="pageN in pageL">
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="paylogList(pageN, size)">{{pageN}}</a>
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
            agentL: [],
            payer: "",
            status: "",
            beginTime: "",
            endTime: "",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            moment: moment,
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            AMtips1: "",
            AMtips2: ""
        }
    },

    methods: {
        paylogList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/paylog/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "payer": that.payer,
                    "status": that.status,
                    "begintime": that.beginTime,
                    "endtime": that.endTime
                },
                success: function(data){
                    let code = data.returncode;
                    // console.log(data);
                    if(code == 200){
                        that.agentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.paylogList(data.data.totalPageNum, size);
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
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        // console.log('code-104');
                        // debugger;
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.paylogList(that.page, that.size)});
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
        searchAnchor() {
            const that = this;
            that.page = 1;
            that.paylogList(that.page, that.size);
        },
        _export() {
            const that = this;
            var url= that.$store.state.rootUrl3 + '/paylog/export';
            var data= "payer="+ that.payer +"&status="+ that.status +"&begintime="+ that.beginTime +"&endtime="+ that.endTime
            //console.log(url+"?"+data)
            window.location = url+"?"+data;
        },
        pageBegin() {
            const that = this;
            that.page = 1;
            that.paylogList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.paylogList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.paylogList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.paylogList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 18);
        this.$store.dispatch('subChanger', 'sub7');

        this.paylogList(this.page, this.size);
        // console.log(this.$store.state.tabIndex);
        // this.adminList(this.page, this.size, this.name);
    }
}
</script>
