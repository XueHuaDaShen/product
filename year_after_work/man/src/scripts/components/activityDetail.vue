<template id="">
    <div class="">
        <div class="AM-top" style="margin-top: 10px;">
            <span class="AM-tips1" style="left:0;top: 18px;">{{AMtips1}}</span>
            <span class="AM-tips2">{{AMtips2}}</span>
            <div class="AM-topInfo per" style="-webkit-box-pack: end;padding-right:9%">
                <select class="form-control record-info" style="width:15%" name="" id="exampleInputEmail1" v-model.trim="searchActivity">
                    <option value="">Activity NO.</option>
                    <option v-for = "type in activity" v-bind:value="type._id">
                        {{type.name}}
                    </option>
                </select>
                <!-- <select class="form-control record-info" name="" id="exampleInputEmail1" v-model.trim="searchType">
                    <option value="1">All</option>
                    <option value="2">User</option>
                    <option value="3">Robot</option>
                </select> -->
                <!-- <input type="number" class="form-control record-info" id="exampleInputEmail1" placeholder="PID"
                       v-model.trim="searchpid"> -->
                <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAnchor"></i>
            </div>

        </div>
        <table class="table table-striped table-bordered table-hover AM-table">
            <!-- <caption class = "AM-cap">代理商信息</caption> -->
            <thead>
                <tr>
                    <!-- <th class="AM-agentID">代理商id</th> -->
                    <th style="text-align:center;" rowspan='2'>Round</th>
                    <th style="text-align:center;" colspan='4'>All</th>
                    <th style="text-align:center;" colspan='4'>User</th>
                </tr>
                <tr>
                    <th>Amount</th>
                    <th>Right</th>
                    <th>Wrong</th>
                    <th>Extra</th>
                    <th>Amount</th>
                    <th>Right</th>
                    <th>Wrong</th>
                    <th>Extra</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(agent, index) in agentL">
                    <!-- <td class="AM-agentID">{{agent._id}}</td> -->
                    <td>{{agent.round}}</td>
                    <td>{{agent.num_total}}</td>
                    <td>{{agent.num_right}}</td>
                    <td>{{agent.num_wrong}}</td>
                    <td>{{agent.num_revive}}</td>
                    <td>{{agent.num_true_total}}</td>
                    <td>{{agent.num_true_right}}</td>
                    <td>{{agent.num_true_wrong}}</td>
                    <td>{{agent.num_true_revive}}</td>
                </tr>
            </tbody>
        </table>
        <nav class="AMnav">
            <ul class="pagination" v-if="pagesShow">
                <li><a href="javascript:void(0);" @click="pageBegin">Begin</a></li>
                <li><a href="javascript:void(0);" @click="pagePre">&laquo;</a></li>
                <div class="pageL">
                    <li v-for="pageN in pageL">
                        <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''"
                           @click="weinnerList(pageN, size)">{{pageN}}</a>
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
                moment: moment,
                agentL: [],
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

                activity: [],
                searchType: '1',
                searchpid: "",
                searchActivity: '',
                amount: '',
            }
        },

        methods: {
            weinnerList(page, size) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/million/answer/detail',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "post",
                    data: {
                        "millionid": that.searchActivity
                    },
                    success: function (data) {
                        let code = data.returncode;
                        console.log(data);
                        if (code == 200) {
                            that.agentL = data.data.answer;
                            // that.amount = data.data.count;
                            // that.pagesShow = true;
                            // if (page > data.totalPage) {
                            //     that.weinnerList(data.totalPage, size);
                            //     return false;
                            // } else if (page <= 0) {
                            //     return false;
                            // } else {
                            //     that.page = page;
                            //     that.pageL = [];
                            //     let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                            //     let maxPage = Math.min(data.totalPage, Math.ceil(page / 5) * 5);
                            //     // console.log(maxPage);
                            //     for (let i = pageStart; i <= maxPage; i++) {
                            //         that.pageL.push(i);
                            //     }
                            //     that.AMtips1 = '请求成功';
                            //     ;
                            //     setTimeout(function () {
                            //         that.AMtips1 = '';
                            //     }, 500);
                            // }
                        } else if (code == '301') {
                            console.log('参数错误');
                        } else if (code == '104') {
                            // console.log('code-104');
                            // debugger;
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.weinnerList(that.page, that.size)
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
            //获取活动
            getGuessList() {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/million/list',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        "page": 1,
                        "size": 999
                    },
                    success: function(data){
                        let code = data.returncode;
                        // console.log(data.data.data)
                        if(code == 200){
                            that.activity = data.data.data;
                        } else if (code == '301') {
                            console.log('Parameter error');
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.getGuessList()});
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

            //筛选已经结束的活动
            checkActivityData(data) {
                var arr = [];
                for(var i in data){
                    if(data[i].status!=2){
                        arr.push(data[i])
                    }
                }
                return arr;
            },
            searchAnchor() {
                const that = this;
                that.page = 1;
                that.weinnerList(that.page, that.size);
            },

            pageBegin() {
                const that = this;
                that.page = 1;
                that.weinnerList(that.page, that.size);
            },
            pageEnd() {
                const that = this;
                that.page = Number.POSITIVE_INFINITY;
                that.weinnerList(that.page, that.size);
            },
            pagePre() {
                const that = this;
                if (that.page > 1) {
                    that.page--;
                    that.weinnerList(that.page, that.size);
                } else {
                    return false;
                }

            },
            pageNext() {
                const that = this;
                that.page++;
                that.weinnerList(that.page, that.size);
            },

        },

        mounted() {
            this.$store.dispatch('tabChanger', 73);
            this.$store.dispatch('subChanger', 'sub10');
            // this.weinnerList(this.page, this.size);
            this.getGuessList()
        }
    }
</script>
