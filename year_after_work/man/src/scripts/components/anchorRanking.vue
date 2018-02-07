<template id="">
<div class="">
    <div class="AM-top" style="margin-top: 10px;">
        <span class="AM-tips1" style="top:17px;left:50px;">{{AMtips1}}</span>
        <span class="AM-tips2" style="top:17px;left:50px;">{{AMtips2}}</span>
        <div class="AM-topInfo per" style="-webkit-box-pack:end;padding-right:9%">
            <button type="button" style="margin-right:20px;" class="btn btn-primary" @click="_export">导出</button>
            <select class="form-control record-month" v-model="nDays">
                <option value="">请选择天数</option>
                <option v-for="union in unionL" v-bind:value="union.size">{{union.val}}</option>
            </select>
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAccount"></i>
        </div>
        <!-- Modal -->
    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>loginname</th>
                <th>pid</th>
                <th>活动奖励</th>
                <th>粉丝增加数量</th>
                <th>收入</th>
                <th>工资</th>
                <th>总分数</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td>{{admin.loginname}}</td>
                <td>{{admin.pid}}</td>
                <td>{{admin.act_revenue}}</td>
                <td>{{admin.fanCount}}</td>
                <td>{{admin.revenue}}</td>
                <td>{{admin.salary}}</td>
                <td>{{admin.score}}</td>
            </tr>

        </tbody>
    </table>

    <nav class="AMnav">
        <ul class="pagination">
            <li><a href="javascript:void(0);" @click="pageBegin">Begin</a></li>
            <li><a href="javascript:void(0);" @click="pagePre">&laquo;</a></li>
            <div class="pageL">
                <li v-for="pageN in pageL">
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="adminList(pageN, size)">{{pageN}}</a>
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

var times = new Date();
var y = times.getFullYear();
var m = times.getMonth()+1;

export default {
    data() {
        return {
            AMtips1: '',
            AMtips2: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            adminL: [],
            upTips1: '',
            upTips2: '',
            pageL: [],
            month: y+ "-" + ( m>9 ? m : "0"+ m ),
            nDays: '',
            unionL: [
                {
                    "size": 10,
                    "val": "前10天"
                },{
                    "size": 20,
                    "val": "前20天"
                },{
                    "size": 30,
                    "val": "前30天"
                },{
                    "size": 40,
                    "val": "前40天"
                },{
                    "size": 50,
                    "val": "前50天"
                },{
                    "size": 60,
                    "val": "前60天"
                },{
                    "size": 70,
                    "val": "前70天"
                },{
                    "size": 80,
                    "val": "前80天"
                },{
                    "size": 90,
                    "val": "前90天"
                },{
                    "size": 100,
                    "val": "前100天"
                },
            ],
        }
    },

    methods: {

        adminList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/host/ranking',
                type: "POST",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "nDays": that.nDays
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.adminL = [];
                        that.adminL = data.data.data;
                        if (page > data.data.totalPageNum) {
                            that.adminList(data.data.totalPageNum, that.size);
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
                            that.AMtips1 = '请求成功';
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }

                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.adminList(that.page, that.size)
                        });
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        },
        searchAccount() {
            this.adminList(this.page, this.size);
        },
        _export() {
            const that = this;
            var url = that.$store.state.rootUrl3 + '/host/ranking/export';
            var data = "isExport=true&nDays="+ that.nDays;
            //console.log(url+"?"+data)
            window.location = url+"?"+data;
        },

        pageBegin() {
            const that = this;
            that.page = 1;
            that.adminList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.adminList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.adminList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.adminList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 51);
        this.$store.dispatch('subChanger', 'sub2');

        this.adminList(this.page, this.size);
    }
}
</script>
