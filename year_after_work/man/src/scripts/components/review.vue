<template id="">
<div class="">
    <div class="AM-top" style="text-align:left">
        <button type="button" style="margin-left:0;margin-top:8px;" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddMenu">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>version</th>
                <th>banner</th>
                <th>income</th>
                <th>exchange</th>
                <th>withdraw</th>
                <th>activity</th>
                <th>host_acitvity</th>
                <th>million</th>
                <th>os</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.version}}</td>
                <td>{{isStatus(agent.banner)}}</td>
                <td>{{isStatus(agent.income)}}</td>
                <td>{{isStatus(agent.exchange)}}</td>
                <td>{{isStatus(agent.withdraw)}}</td>
                <td>{{isStatus(agent.activity)}}</td>
                <td>{{isStatus(agent.host_activity)}}</td>
                <td>{{isStatus(agent.million)}}</td>
                <td>{{agent.os==0?'IOS':'Andriod'}}</td>
                <td>
                    <button type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent._id, agent.version, agent.banner, agent.income, agent.exchange, agent.withdraw, agent.activity, agent.host_activity, agent.million, agent.os)">
                      编辑
                    </button>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="menuList(pageN, size)">{{pageN}}</a>
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
                            <label class="col-sm-2 control-label">version</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="version" v-model.trim="version">
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-sm-2 control-label">banner</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "banner">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">income</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "income">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">exchage</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "exchange">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">withdraw</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "withdraw">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">activity</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "activity">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">host_activity</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "host_activity">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">million</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "million">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">os</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "os">
                                    <option value="0">IOS</option>
                                    <option value="1">Andriod</option>
                                </select>
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
                    <button type="button" class="btn btn-primary" @click="addMenu">确认</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">编辑</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">version</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="version" v-model.trim="version">
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-sm-2 control-label">banner</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "banner">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">income</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "income">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">exchage</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "exchange">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">withdraw</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "withdraw">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">activity</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "activity">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">host_activity</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "host_activity">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">million</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "million">
                                    <option value="0">开启</option>
                                    <option value="1">关闭</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">os</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "os">
                                    <option value="0">IOS</option>
                                    <option value="1">Andriod</option>
                                </select>
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
                    <button type="button" class="btn btn-primary" @click="update">确认</button>
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
            version: "",
            banner: "",
            income: "",
            exchange: "",
            withdraw: "",
            activity: "",
            host_activity: "1",
            million: "1",
            os: "",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            agencyUpID: "",
            AMtips1: "",
            AMtips2: "",
        }
    },

    methods: {
        menuList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/review/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        // console.log(data);
                        that.agentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.menuList(data.data.totalPageNum, size);
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
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.menuList(that.page, that.size)});
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
        resetUpdate(id, version, banner, income, exchange, withdraw, activity, host_activity, million, os) {
            this.agencyUpID = id;
            this.version = version;
            this.banner = banner;
            this.income = income;
            this.exchange = exchange;
            this.withdraw = withdraw;
            this.activity = activity;
            this.host_activity = host_activity;
            this.million = million;
            this.os = os;
        },
        update() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.version === '') {
                that.addATips1 = '请填写version';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/review/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "banner": that.banner,
                        "income": that.income,
                        "version": that.version,
                        "exchange": that.exchange,
                        "withdraw": that.withdraw,
                        "activity": that.activity,
                        "host_activity": that.host_activity,
                        "million": that.million,
                        "os": that.os,
                        "id": that.agencyUpID
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            that.menuList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
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
        isStatus(status) {
            switch(status){
                case 0:
                    return '开启';
                case 1:
                    return '关闭';
            }
        },
        resetaddMenu() {
            this.version = "";
            this.banner = 1;
            this.income = 1;
            this.exchange = 1;
            this.withdraw = 1;
            this.activity = 1;
            this.host_activity = 1;
            this.million = 1;
            this.os = 1;
        },
        addMenu() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.version === '') {
                that.addATips1 = '请填写version';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/review/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "banner": that.banner,
                        "income": that.income,
                        "version": that.version,
                        "exchange": that.exchange,
                        "withdraw": that.withdraw,
                        "activity": that.activity,
                        "host_activity": that.host_activity,
                        "million": that.million,
                        "os": that.os
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            that.menuList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addMenu);
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
            that.menuList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.menuList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.menuList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.menuList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 25);
        this.$store.dispatch('subChanger', 'sub6');

        this.menuList(this.page, this.size);
    }
}
</script>
