<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float: left" type="button" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddCode">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <div class="AM-topR" style = "float: right; margin-right: 3.9%; margin-bottom: 25px;">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" placeholder="code" v-model.trim = "scode">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchCode"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>代码</th>
                <th>描述</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.code}}</td>
                <td>{{agent.msg}}</td>
                <td>
                    <button type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent.code, agent.msg, agent._id)">
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="codeList(pageN, size)">{{pageN}}</a>
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
                            <label class="col-sm-2 control-label">代码 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="代码" v-model.trim="newCode">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">描述 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="描述" v-model.trim="newMsg">
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
                    <button type="button" class="btn btn-primary" @click="addCode">确认</button>
                </div>
            </div>
        </div>
    </div>
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
                            <label class="col-sm-2 control-label">代码 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="代码" v-model.trim="code">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">描述 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="描述" v-model.trim="msg">
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
            name: "",
            newCode: "",
            newMsg: "",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            scode: "",
            code: "",
            msg: "",
            agencyUpID: "",
            AMtips1: "",
            AMtips2: ""
        }
    },

    methods: {
        codeList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/ruler/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "code": that.scode
                },
                success: function(data){
                    let r_code = data.returncode;
                    if(r_code == 200){
                        that.agentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.codeList(data.data.totalPageNum, size);
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
                    } else if (r_code == '301') {
                        console.log('参数错误');
                    } else if (r_code == '104') {
                        // console.log('code-104');
                        // debugger;
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.codeList(that.page, that.size)});
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
        resetUpdate(code, msg, id) {
            this.upTips1 = '';
            this.upTips2 = '';
            this.code = code;
            this.msg = msg;
            this.agencyUpID = id;
        },
        update() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            if (that.code == '') {
                that.upTips1 = '请填写代码';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if (that.msg == '') {
                that.upTips1 = '请填写描述';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/ruler/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "id": that.agencyUpID,
                        "code": that.code,
                        "msg": that.msg
                    },
                    success: function(data) {
                        let r_code = data.returncode;
                        if(r_code == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.codeList(that.page, that.size)
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
        searchCode() {
            const that = this;
            that.page = 1;
            that.codeList(that.page, that.size);
        },
        resetaddCode() {
            const that = this;
            that.newCode = "";
            that.newMsg = "";
        },
        addCode() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.newCode == '') {
                that.addATips1 = '请填写代码';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newMsg == '') {
                that.addATips1 = '请填写描述';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/ruler/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "code": that.newCode,
                        "msg": that.newMsg
                    },
                    success: function(data) {
                        let r_code = data.returncode;
                        if(r_code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            that.codeList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if (r_code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addCode);
                        } else if (r_code == '302') {
                            that.addATips1 = '服务器错误';
                            setTimeout(function() {
                                that.addATips1 = '';
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
        pageBegin() {
            const that = this;
            that.page = 1;
            that.codeList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.codeList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.codeList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.codeList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 7);
        this.$store.dispatch('subChanger', 'sub6');

        this.codeList(this.page, this.size);
        // console.log(this.$store.state.tabIndex);
        // this.adminList(this.page, this.size, this.name);
    }
}
</script>
