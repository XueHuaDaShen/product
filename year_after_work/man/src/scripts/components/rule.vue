<template id="">
<div class="">
    <div class="AM-top" style="margin-top: 10px;">
        <span class="AM-tips1" style="left:0;top: 18px;">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <div class="AM-topInfo per" style="-webkit-box-pack:end;padding-right:10%">
            <select class="form-control record-info" style="width:14%" name="" id="exampleInputEmail1" v-model.trim="is_signed">
                <option value="">选择主播类别</option>
                <option value="1">签约主播</option>
                <option value="0">路人主播</option>
            </select>
            <input type="text" class="form-control record-info" id="exampleInputEmail1" placeholder="pid" v-model.trim = "pid">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAnchor"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>用户ID</th>
                <th>用户PID</th>
                <th>用户名称</th>
                <th>规则ID</th>
                <th>规则名称</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.loginid}}</td>
                <td>{{agent.pid}}</td>
                <td style="max-width:150px;overflow:hidden;">{{agent.loginname}}</td>
                <td>{{agent.rule_id}}</td>
                <td>{{agent.rule_name}}</td>
                <td>
                    <button type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent.loginname, agent.rule_name, agent.rule_id, agent.loginid)">
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="paylogList(pageN, size)">{{pageN}}</a>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">更新</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">用户名称 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="用户名称" v-model.trim="loginname">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">规则名称 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="selector" v-model.trim="updateId">
                                    <option v-for="ruler in ruleL" v-bind:value="ruler.id">{{ruler.name}}</option>
                                </select>
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
export default {
    data() {
        return {
            agentL: [],
            ruleL: [],
            loginname: "",
            loginid: "",
            rule_id: "",
            rule_name: "",
            pid: "",
            is_signed: "",
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
            updateId: ""
        }
    },

    methods: {
        paylogList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/hostrulemapping/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "pid": that.pid,
                    "type": that.is_signed
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
        resetUpdate(loginname, rule_name, rule_id, loginid) {

            const that = this;
            this.upTips1 = '';
            this.upTips2 = '';
            this.loginname = loginname;
            this.rule_name = rule_name;
            this.loginid = loginid;
            this.rule_id = rule_id;

            this.updateId = rule_id;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/robotrule/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": 1,
                    "size": 999
                },
                async: false,
                success: function(data){
                    // console.log(data)
                    let code = data.returncode;
                    if(code == 200){
                        that.ruleL = data.data.data;

                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        // console.log('code-104');
                        // debugger;
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.resetUpdate(loginname, rule_name, rule_id, loginid)});
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
        update() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.loginname == '') {
                that.upTips1 = '请填写用户名';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/hostrulemapping/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        "rule_id": that.updateId,
                        "rule_name": $("#selector").find("option:selected").text(),
                        "users": [{
                            "loginid": that.loginid,
                            "loginname": that.loginname
                        }]
                    }),
                    success: function(data) {
                        let r_code = data.returncode;
                        if(r_code == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.paylogList(that.page, that.size)
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (r_code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        } else if (r_code == '302') {
                            that.upTips1 = '服务器错误';
                            setTimeout(function() {
                                that.upTips1 = '';
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
        searchAnchor() {
            const that = this;
            that.page = 1;
            that.paylogList(that.page, that.size);
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
        this.$store.dispatch('tabChanger', 11);
        this.$store.dispatch('subChanger', 'sub9');

        this.paylogList(this.page, this.size);
        // console.log(this.$store.state.tabIndex);
        // this.adminList(this.page, this.size, this.name);
    }
}
</script>
