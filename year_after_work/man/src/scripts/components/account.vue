<template id="">
<div class="">
    <div class="AM-top" style="margin-top: 10px;">
        <span class="AM-tips1" style="top:17px;left:50px;">{{AMtips1}}</span>
        <span class="AM-tips2" style="top:17px;left:50px;">{{AMtips2}}</span>
        <div class="AM-topInfo per" style="-webkit-box-pack:end;padding-right:9%">
            <button type="button" style="margin-right:20px;" class="btn btn-primary" data-toggle='modal' data-target="#Modal">结算</button>
            <button type="button" style="margin-right:20px;" class="btn btn-primary" @click="_export">导出</button>
            <input type="month" style="margin-right:20px;" class="form-control record-month" id="exampleInputEmail1" v-model.trim = "month">
            <select class="form-control record-month" v-model="unionid">
                <option value="">请选择工会</option>
                <option v-for="union in unionL" v-bind:value="union._id">{{union.name}}</option>
            </select>
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAccount"></i>
        </div>
        <!-- Modal -->
    </div>
    <div class="modal fade bs-example-modal-lg" id="Modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                            class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">确认结算</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style="font-size: 16px;">
                        是否确定结算

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
                    <button type="button" class="btn btn-primary" @click="account">确认</button>
                </div>
            </div>
        </div>
    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>主播id</th>
                <th>主播名称</th>
                <th>主播工会</th>
                <th>银行卡号</th>
                <th>基本工资</th>
                <th>超额工资</th>
                <th>总工资</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td>{{admin.pid}}</td>
                <td>{{admin.loginname}}</td>
                <td>{{admin.union}}</td>
                <td>{{admin.account_no}}</td>
                <td>{{ admin.base_pay ? parseInt(admin.base_pay) : 0 }}</td>
                <td>{{ admin.performance ? parseInt(admin.performance) : 0 }}</td>
                <td>{{ (admin.base_pay+admin.performance) ? parseInt(admin.base_pay+admin.performance) : 0 }}</td>
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
            unionid: '',
            unionL: [],
        }
    },

    methods: {

        adminList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/settlement/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "month": that.month,
                    "unionid": that.unionid
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
        getUnionList() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/union/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": that.page,
                    "size": 999
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        that.unionL = data.data.data;
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.getUnionList);
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
        searchAccount() {
            this.adminList(this.page, this.size);
        },
        _export() {
            const that = this;
            var url = that.$store.state.rootUrl3 + '/settlement/export';
            var data = "month="+ that.month +"&unionid="+ that.unionid
            //console.log(url+"?"+data)
            window.location = url+"?"+data;
        },

        account() {
            this.upTips1 = "";
            this.upTips2 = "";
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/settlement/balance',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "month": that.month,
                    "unionid": that.unionid
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        that.upTips2 = '请求成功';
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#Modal').modal('hide');
                        }, 1000);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '303') {
                        that.upTips1 = '结算错误';
                        setTimeout(function() {
                            that.upTips1 = '';
                            $('#Modal').modal('hide');
                        }, 1000);
                    } else if (code == '305') {
                        that.upTips1 = '已经结算过了';
                        setTimeout(function() {
                            that.upTips1 = '';
                            $('#Modal').modal('hide');
                        }, 1000);
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.account);
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
        this.$store.dispatch('tabChanger', 29);
        this.$store.dispatch('subChanger', 'sub3');

        this.adminList(this.page, this.size);
        this.getUnionList();
    }
}
</script>
