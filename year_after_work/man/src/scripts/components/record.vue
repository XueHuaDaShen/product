<template id="">
<div class="">
    <div class="AM-top" style="position:absolute;width:100%;">
        <span class="AM-tips1" style="left:15px;">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <div class="AM-topInfo per" style="margin-top: 10px;">
            <label>总用户量：</label>
            <input type="text" readOnly="true" class="form-control record-info" id="exampleInputEmail1" placeholder="" v-model.trim = "mUsercount">
            <label>收益（元）：</label>
            <input type="text" readOnly="true" class="form-control record-info" id="exampleInputEmail1" placeholder="" v-model.trim = "mRevenue">
            <label>月活：</label>
            <input type="text" readOnly="true" class="form-control record-info" id="exampleInputEmail1" placeholder="" v-model.trim = "mAu">
            <label>充值人数：</label>
            <input type="text" readOnly="true" class="form-control record-info" id="exampleInputEmail1" placeholder="" v-model.trim = "mRecharge_num">
            <label>月份：</label>
            <input type="month" class="form-control record-month" id="exampleInputEmail1" v-model.trim = "month">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchRole(recordMList, monthpage)"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table" style="margin-bottom:0;margin-top:70px;">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>日期</th>
                <th>日活跃用户</th>
                <th>登录用户量</th>
                <th>新增用户量</th>
                <th>收益</th>
                <th>充值人数</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(month, index) in monthL">
                <td class="AM-agentID">{{month._id}}</td>
                <td>{{month.date}}</td>
                <td>{{month.dau}}</td>
                <td>{{month.dal}}</td>
                <td>{{month.increment}}</td>
                <td>{{month.revenue}}</td>
                <td>{{month.recharge_num}}</td>
            </tr>
        </tbody>
    </table>
    <nav class="AMnav" style="margin-bottom:50px">
        <ul class="pagination" v-if="monthpagesShow">
            <li><a href="javascript:void(0);" @click="pageBegin(recordMList, monthpage)">Begin</a></li>
            <li><a href="javascript:void(0);" @click="pagePre(recordMList, monthpage)">&laquo;</a></li>
            <div class="pageL">
                <li v-for="pageMN in pageML">
                    <a href="javascript:void(0);" v-bind:class="pageMN == monthpage ? 'activePage2' : ''" @click="recordMList(pageMN, size)">{{pageMN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext(recordMList, monthpage)">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd(recordMList, monthpage)">End</a></li>
        </ul>
    </nav>
    <div class="AM-top" style="position:absolute;width:100%;">
        <span class="AM-tips1" style="left:0;top:7px;">{{AMtips3}}</span>
        <span class="AM-tips2">{{AMtips4}}</span>
        <div class="AM-topInfo per" style="padding-right:10.2%;-webkit-box-pack:end">
            <label>年份：</label>
            <input type="text" class="form-control record-year" style="width:17.9%" id="exampleInputEmail1" placeholder="YYYY" v-model.trim = "year">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchRole(recordYList, yearpage)"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table" style="margin-bottom:0;margin-top:125px;">
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>日期</th>
                <th>月活跃用户</th>
                <th>收益</th>
                <th>充值人数</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(year, index) in yearL">
                <td class="AM-agentID">{{year._id}}</td>
                <td>{{year.date}}</td>
                <td>{{year.mau}}</td>
                <td>{{year.revenue}}</td>
                <td>{{year.recharge_num}}</td>
            </tr>
        </tbody>
    </table>
    <nav class="AMnav" style="margin-bottom:50px">
        <ul class="pagination" v-if="yearpagesShow">
            <li><a href="javascript:void(0);" @click="pageBegin(recordYList, yearpage)">Begin</a></li>
            <li><a href="javascript:void(0);" @click="pagePre(recordYList, yearpage)">&laquo;</a></li>
            <div class="pageL">
                <li v-for="pageYN in pageYL">
                    <a href="javascript:void(0);" v-bind:class="pageYN == yearpage ? 'activePage2' : ''" @click="recordYList(pageYN, size)">{{pageYN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext(recordYList, yearpage)">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd(recordYList, yearpage)">End</a></li>
        </ul>
    </nav>

</div>
</template>

<script>
var times = new Date();
var y = times.getFullYear();
var m = times.getMonth()+1;
import utils from '../utils/utils.js';
export default {
    data() {
        return {
            monthL: [],
            yearL: [],
            month: y+ "-" + ( m>9 ? m : "0"+ m ),
            mUsercount: "",
            mRevenue: "",
            mAu: "",
            mRecharge_num: "",
            year: y,
            yDau: "",
            yRevenue: "",
            yDal: "",
            yRecharge_num: "",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            monthpage: 1,
            yearpage: 1,
            size: 10,
            monthpagesShow: false,
            yearpagesShow: false,
            pageML: [],
            pageYL: [],
            AMtips1: "",
            AMtips2: "",
            AMtips3: "",
            AMtips4: ""
        }
    },

    methods: {
        recordMList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/statistics/daily/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "date": that.month
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        that.monthL = data.data.data;
                        that.monthpagesShow = true;
                        that.mUsercount = data.data.usercount;
                        that.mAu = data.data.mau;
                        that.mRevenue = data.data.revenue;
                        that.mRecharge_num = data.data.recharge_num;
                        if (page > data.data.totalPageNum) {
                            that.recordMList(data.data.totalPageNum, size);
                            return false;
                        } else if (page <= 0) {
                            return false;
                        } else {
                            that.monthpage = page;
                            that.pageML = [];
                            let monthpageStart = Math.floor((page - 1) / 5) * 5 + 1;
                            let monthmaxPage = Math.min(data.data.totalPageNum, Math.ceil(page / 5) * 5);
                            for (let i = monthpageStart; i <= monthmaxPage; i++) {
                                that.pageML.push(i);
                            }
                            that.AMtips1 = '请求成功';;
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.recordMList(that.monthpage, that.size)});
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
        recordYList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/statistics/month/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "date": that.year
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        that.yearL = data.data.data;
                        that.yearpagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.recordYList(data.data.totalPageNum, size);
                            return false;
                        } else if (page <= 0) {
                            return false;
                        } else {
                            that.yearpage = page;
                            that.pageYL = [];
                            let yearpageStart = Math.floor((page - 1) / 5) * 5 + 1;
                            let yearmaxPage = Math.min(data.data.totalPageNum, Math.ceil(page / 5) * 5);
                            for (let i = yearpageStart; i <= yearmaxPage; i++) {
                                that.pageYL.push(i);
                            }
                            that.AMtips3 = '请求成功';;
                            setTimeout(function() {
                                that.AMtips3 = '';
                            }, 500);
                        }
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.recordYList(that.yearpage, that.size)});
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
        searchRole(callback, page) {
            const that = this;
            page = 1;
            callback(page, that.size);
        },
        pageBegin(callback, page) {
            const that = this;
            page = 1;
            callback(page, that.size);
        },
        pageEnd(callback, page) {
            const that = this;
            page = Number.POSITIVE_INFINITY;
            callback(page, that.size);
        },
        pagePre(callback, page) {
            const that = this;
            if (page > 1) {
                page--;
                callback(page, that.size);
            } else {
                return false;
            }

        },
        pageNext(callback, page) {
            const that = this;
            page++;
            callback(page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 19);
        this.$store.dispatch('subChanger', 'sub7');

        this.recordMList(this.monthpage, this.size);
        this.recordYList(this.yearpage, this.size);
    }
}
</script>
