<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float:left" type="button" class="btn btn-primary AM-add" data-toggle="modal" data-target="#myModal" @click="resetAdd">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <!-- Modal -->
        <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增用户</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">类型</label>
                                <div class="col-sm-10">
                                    <select class=" form-control" name="" v-model.trim = "addType" @change = "showCon(addType)">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group" v-show="show1">
                                <label class="col-sm-2 control-label">Pid (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputEmail3" placeholder="Pid" v-model.trim="addPid">
                                </div>
                            </div>

                            <div class="form-group" v-show="show2">
                                <label class="col-sm-2 control-label">Country (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputEmail3" placeholder="Country" v-model.trim="addCountry">
                                </div>
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



        <div class="AM-topR" style = "float:right; margin-right: 3.9%; margin-bottom: 25px; width: 39%;">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" style = "float: left; width: 38%;" placeholder="请输入Pid" v-model.trim="pid">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" style = "float: left; width: 38%;" placeholder="请输入Country" v-model.trim="country">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAdmin" style = "float: left;"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>type</th>
                <th>Pid</th>
                <th>Country</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.type}}</td>
                <td>{{admin.pid}}</td>
                <td>{{admin.country}}</td>
                <td><i v-bind:class="admin.enabled == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="changeState(admin.enabled, admin._id)">启用/禁用</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.type, admin.pid, admin.country)">编辑信息</a></li>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改用户信息</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">类型</label>
                            <div class="col-sm-10">
                                <select class=" form-control" name="" v-model.trim = "addType" @change = "showCon(addType)">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group" v-show="show1">
                            <label class="col-sm-2 control-label">Pid (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputEmail3" placeholder="Pid" v-model.trim="addPid">
                            </div>
                        </div>

                        <div class="form-group" v-show="show2">
                            <label class="col-sm-2 control-label">Country (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputEmail3" placeholder="Country" v-model.trim="addCountry">
                            </div>
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
            AMtips1: '',
            AMtips2: '',
            addType: '',
            addPid: '',
            addCountry: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            country: '',
            pid: '',
            adminL: [],
            upTips1: '',
            upTips2: '',
            adminUpID: '',
            pageL: [],
            show1: true,
            show2: false,
        }
    },

    methods: {
        showCon(addType) {
                if (addType == 2) {
                    this.show1 = true;
                    this.show2 =false;
                } else if (addType == 1) {
                    this.show1 = false;
                    this.show2 = true;
                }
        },

        resetAdd() {
            this.addType = '2';
            this.addPid = '';
            this.addCountry = '';
            this.show1 = true;
            this.show2 = false;
            this.addTips1 = '';
            this.addTips2 = '';
        },

        addAdmin() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            if (that.addType == 2) {
                if (that.addPid === '') {
                    this.addTips = '请输入Pid';
                    setTimeout(function() {
                        that.addTips = '';
                    }, 500);
                } else if (isNaN(that.addPid)) {
                    this.addTips = '请输入正确的Pid';
                    setTimeout(function() {
                        that.addTips = '';
                    }, 500);
                } else {
                    $.ajax({
                        url: this.$store.state.rootUrl3 + '/policy/create',
                        type: "POST",
                        data: {
                            type: 2,
                            pid: that.addPid,
                        },
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        success: function(data) {
                            if (data.returncode == '200') {
                                that.addTips2 = '操作成功';
                                setTimeout(function() {
                                    $('#myModal').modal('hide');
                                    that.adminList(that.page, that.size);
                                }, 1000);
                            } else if (data.returncode == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addAdmin);
                            }  else {
                                utils.handleLogOut(data.returncode, that);
                            }
                        },
                        fail: function() {
                            console.log('Ajax Error');
                            utils.loginAgain(that);
                        }
                    });
                }
            } else if (that.addType == 1) {
                if (that.addCountry === '') {
                    this.addTips = '请输入Pid';
                } else {
                    $.ajax({
                        url: this.$store.state.rootUrl3 + '/policy/create',
                        type: "POST",
                        data: {
                            type: 1,
                            country: that.addCountry,
                        },
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        success: function(data) {
                            if (data.returncode == '200') {
                                that.addTips2 = '操作成功';
                                setTimeout(function() {
                                    $('#myModal').modal('hide');
                                    that.adminList(that.page, that.size);
                                }, 1000);
                            } else if (data.returncode == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addAdmin);
                            }  else {
                                utils.handleLogOut(data.returncode, that);
                            }
                        },
                        fail: function() {
                            console.log('Ajax Error');
                            utils.loginAgain(that);
                        }
                    });
                }
            }

        },

        adminList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/policy/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "pid": that.pid,
                    "country": that.country,
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
                            that.AMtips1 = '请求成功';;
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }

                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.adminList(that.page, that.size)
                        });
                    } else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        },

        changeState(initState, id) {
            const that = this;
            that.AMtips1 = '';
            that.AMtips2 = '';
            if (initState == 1) {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/policy/disable',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": id
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.adminList(that.page, that.size);
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                                that.changeState(initState, id)
                            });
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function() {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/policy/enable',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": id
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.adminList(that.page, that.size);
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                                that.changeState(initState, id)
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
            }
        },

        searchAdmin() {
            const that = this;
            that.page = 1;
            that.adminList(that.page, that.size);
        },

        resetUpdate(id, type, pid, country) {
            this.adminUpID = id;
            this.addType = type;
            this.addPid = pid;
            this.addCountry = country;
            this.addTips1 = '';
            this.addTips2 = '';
            if (type == 2) {
                this.show1 = true;
                this.show2 = false;
            } else if (type == 1) {
                this.show1 = false;
                this.show2 = true;
            }
        },



        update() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            if (that.addType == 2) {
                if (that.addPid === '') {
                    this.addTips = '请输入Pid';
                    setTimeout(function() {
                        that.addTips = '';
                    }, 500);
                } else if (isNaN(that.addPid)) {
                    this.addTips = '请输入正确的Pid';
                    setTimeout(function() {
                        that.addTips = '';
                    }, 500);
                } else {
                    $.ajax({
                        url: this.$store.state.rootUrl3 + '/policy/update',
                        type: "POST",
                        data: {
                            id: that.adminUpID,
                            type: 2,
                            pid: that.addPid,
                        },
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        success: function(data) {
                            if (data.returncode == '200') {
                                that.addTips2 = '操作成功';
                                setTimeout(function() {
                                    $('#updateModal').modal('hide');
                                    that.adminList(that.page, that.size);
                                }, 1000);
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
                    });
                }
            } else if (that.addType == 1) {
                if (that.addCountry === '') {
                    this.addTips = '请输入Pid';
                } else {
                    $.ajax({
                        url: this.$store.state.rootUrl3 + '/policy/update',
                        type: "POST",
                        data: {
                            id: that.adminUpID,
                            type: 1,
                            country: that.addCountry,
                        },
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        success: function(data) {
                            if (data.returncode == '200') {
                                that.addTips2 = '操作成功';
                                setTimeout(function() {
                                    $('#updateModal').modal('hide');
                                    that.adminList(that.page, that.size);
                                }, 1000);
                            } else if (data.returncode == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                            } else {
                                utils.handleLogOut(data.returncode, that);
                            }
                        },
                        fail: function() {
                            console.log('Ajax Error');
                            utils.loginAgain(that);
                        }
                    });
                }
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

    },





    mounted() {
        this.$store.dispatch('tabChanger', 3);
        this.$store.dispatch('subChanger', 'sub9');

        this.adminList(this.page, this.size);
    }
}
</script>
