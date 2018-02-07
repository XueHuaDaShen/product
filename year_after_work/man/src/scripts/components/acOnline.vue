<template id="">
<div class="">
    <div class="AM-top"  style="text-align: left; margin-top: 10px;">
        <button type="button" class="btn btn-primary AM-add" data-toggle="modal" data-target="#myModal" @click="resetAdd">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <!-- Modal -->
        <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增主播活动</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">新增方式 (*)</label>
                                <div class="col-sm-10" style="text-align:left">
                                    <label class="adminrole">
                                        <input type="radio" name="add" value="1" v-model.trim="newtype">
                                        单个添加
                                    </label>
                                    <label class="adminrole">   
                                        <input type="radio" name="add" value="2" v-model.trim="newtype">
                                        批量添加
                                    </label>
                                </div>
                            </div>
                            <div class="form-group" v-if="newtype==1">
                                <label class="col-sm-2 control-label">Pid (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control"  placeholder="Pid" v-model.trim="adminAdd1">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label hasMR">活动名称 (*)</label>
                                <select class="form-control acName col-sm-10" v-model="acID">
                                  <option v-for = "ac in acL" v-bind:value="ac._id">
                                      {{ac.title}}
                                  </option>
                                </select>
                            </div>
                            <div class="addTips">
                                {{addTips}}
                            </div>
                            <div class="addTips2">
                                {{addTips2}}
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="addAdmin">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="AM-topR" style = "float:right; margin-right: 3.9%; margin-bottom: 25px;">
            <input type="text" class="form-control AM-search"  placeholder="请输入活动名称" v-model.trim="searchname">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAdmin"></i>
        </div>


    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>Pid</th>
                <th>活动名称</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.pid}}</td>
                <td>{{admin.taskname}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id,  admin.pid, admin.taskname)">编辑信息</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#delModal" @click="resetDel(admin._id, admin.pid, admin.taskname)">删除</a></li>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="adminList(pageN, size)">{{pageN}}</a>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改信息</h4>
                </div>
                <div class="modal-body">
                    <div class="hideM">
                        {{adminUpID}}
                    </div>
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">PID (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="PID" v-model.trim="adminUp6">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label hasMR">活动名称 (*)</label>
                            <select class="form-control acName col-sm-10" v-model="upacID">
                              <option v-for = "ac in acL" v-bind:value="ac._id">
                                  {{ac.title}}
                              </option>
                            </select>
                        </div>
                    </form>
                    <div class="addTips">
                        {{upTips1}}
                    </div>
                    <div class="addTips2">
                        {{upTips2}}
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="update">确认</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="delModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">删除主播活动</h4>
                </div>
                <div class="modal-body">
                    <div class="hideM">
                        {{delID}}
                    </div>
                    <h5>确认删除  Pid <span class = "acdel1">{{delPid}}</span> 的 <span class = acdel1>{{delN}}</span>  活动吗</h5>
                    <div class="addTips">
                        {{upTips1}}
                    </div>
                    <div class="addTips2">
                        {{upTips2}}
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="delAc">确认</button>
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
            AMtips1: '',
            AMtips2: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            adminL: [],
            upTips1: '',
            upTips2: '',
            newtype: 1,
            adminUpID: '',
            adminUp1: '',
            adminUp2: '',
            adminUp3: '',
            adminUp4: '',
            adminUp5: '',
            adminUp6: '',
            pageL: [],
            name: '',
            adminAdd1: '',
            acID: '',
            upacID: '',
            acL: [],
            adminUpTN: '',
            delID: '',
            delPid: '',
            delN: '',
            searchname: '',
        }
    },

    methods: {
        resetAdd() {
            this.adminAdd1 = '';
            this.newtype = 1;
            this.addTips = '';
            this.addTips2 = '';
            this.acID = '';
            this.acL = [];
            this.show();
        },

        addAdmin() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            if( that.newtype == 1 && that.adminAdd1 === '' ){
                this.addTips = '请填写PID';
                setTimeout(function() {
                    that.addTips = ''
                }, 1000)
            } else if( that.acID === '' ){
                that.addTips = '请选择活动';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/host/activity/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "taskid": that.acID,
                        "pid": that.adminAdd1,
                        "type": that.newtype
                    },
                    success: function(data) {
                        if (data.returncode == '301') {
                            that.addTips = '输入的Pid不存在或参数错误';
                        } else if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#myModal').modal('hide');
                                that.adminList(that.page, that.size);
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addAdmin);
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

        adminList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/host/activity/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "taskname": that.searchname,
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.adminL = [];
                        that.adminL = data.data.data;
                        if (page > data.data.totalPageNum) {
                            that.adminList(data.data.totalPageNum, size);
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
                            that.adminList(that.page, that.page)
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

        searchAdmin() {
            this.adminList(this.page, this.size);
        },



        resetUpdate(id, pid, taskname) {
            this.adminUpTN = '';
            this.adminUpID = id;
            this.adminUp6 = pid;
            this.adminUpTN = taskname;
            this.upTips1 = '';
            this.upTips2 = '';
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/activity/list',
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
                    if(code == 200){
                        that.acL = data.data.data;
                        for (let i = 0; i < data.data.data.length; i++) {
                            if (data.data.data[i].title === that.adminUpTN) {
                                that.upacID = data.data.data[i]._id;
                            }
                        }
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){
                            that.resetUpdate(id, pid, taskname);
                        });
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

        resetDel (id, pid, name) {
            this.delID = id;
            this.delPid = pid;
            this.delN = name;
        },

        delAc() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/host/activity/delete',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": that.delID
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        that.upTips1 = '';
                        that.upTips2 = '操作成功';
                        that.adminList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#delModal').modal('hide');
                        }, 500);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.delAc);
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



        update() {
            const that = this;
            if (that.adminUp6 === '' || that.upacID === '') {
                this.upTips1 = '请把信息补充完整';
                setTimeout(function() {
                    that.upTips1 = ''
                }, 1000)
            } else if (isNaN(parseInt(that.adminUp6))) {
                that.upTips1 = '请输入正确的Pid';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/host/activity/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "id": that.adminUpID,
                        "taskid": that.upacID,
                        "pid": that.adminUp6
                    },
                    success: function(data) {
                        if (data.returncode == '301') {
                            that.upTips1 = '输入的Pid不存在或参数错误';
                        } else if (data.returncode == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.adminList(that.page, that.size);
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        }  else {
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

        show() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/activity/list',
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
                    if(code == 200){
                        that.acL = data.data.data;
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.show);
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

    },


    mounted() {
        this.$store.dispatch('tabChanger', 14);
        this.$store.dispatch('subChanger', 'sub9');

        // console.log(this.$store.state.tabIndex);
        this.adminList(this.page, this.size);
    }
}
</script>
