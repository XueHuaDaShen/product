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
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增管理员</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">邮箱 (*)</label>
                                <div class="col-sm-10">
                                    <input type="email" class="form-control" placeholder="邮箱" v-model.trim="adminE">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">用户名 (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="用户名" v-model.trim="adminN">
                                </div>
                            </div>

                            <!-- <div class="form-group">
                                <label class="col-sm-2 control-label">角色</label>
                                <div class="col-sm-10">
                                    <input type="email" class="form-control" placeholder="请输入代表角色的数字" v-model.trim="adminR">
                                </div>
                            </div> -->
                            <div class="form-group">
                                <label class="col-sm-2 control-label">电话</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="电话" v-model.trim="adminP">
                                </div>
                            </div>
                            <!-- <div class="form-group">
                                <label class="col-sm-2 control-label">地址</label>
                                <div class="col-sm-10">
                                    <input type="email" class="form-control" placeholder="地址" v-model.trim="adminA">
                                </div>
                            </div> -->
                            <div class="form-group rolelist">
                                <label class="col-sm-2 control-label">角色(*)</label>
                                <div class="col-sm-10" style="text-align:left">
                                    <label v-for="role in roleL" class="adminrole">
                                                <input type="checkbox" v-bind:value="role._id" v-model="checkedRoles">
                                                {{role.name}}
                                    </label>
                                </div>
                            </div>
                            <div class="form-group rolelist">
                                <label class="col-sm-2 control-label">系统(*)</label>
                                <div class="col-sm-10" style="text-align:left">
                                    <label v-for="sys in systemL" class="adminrole">
                                                <input type="checkbox" v-bind:value="sys.id" v-model="addsystemL">
                                                {{sys.app_id}}
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label hasMR">Area (*)</label>
                                <select class="form-control acName col-sm-10" v-model="newArea">
                                    <option value="">Please select the area</option>
                                    <option v-for = "type in typeList" v-bind:value="type.code">
                                        {{type.name}}
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
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入管理员名字" v-model.trim="name">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAdmin"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>Email</th>
                <th>名字</th>
                <!-- <th>角色</th> -->
                <th>电话</th>
                <!-- <th>地址</th> -->
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}/{{admin.userid}}</td>
                <td>{{admin.email}}</td>
                <td>{{admin.name}}</td>
                <!-- <td>{{admin.role}}</td> -->
                <td>{{admin.phone}}</td>
                <!-- <td>{{admin.address}}</td> -->
                <td><i v-bind:class="admin.enabled == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="changeState(0, admin._id)">启用</a></li>
                            <li><a href="javascript: void(0)" @click="changeState(1, admin._id)">禁用</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.name, admin.email,admin.phone,admin.address, admin.role, admin.userid, admin.cc)">编辑信息</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#resetModal" @click="resetP(admin.userid, admin.email)">修改密码</a></li>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改管理员信息</h4>
                </div>
                <div class="modal-body">
                    <div class="hideM">
                        {{adminUpID}}
                    </div>
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" v-model.trim="adminUpE" disabled="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">名字</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="管理员名字" v-model.trim="adminUpN">
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">角色</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail2" class="form-control" placeholder="代表角色的数字" v-model.trim="adminUpR">
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label class="col-sm-2 control-label">电话</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="电话" v-model.trim="adminUpP">
                            </div>
                        </div>
                        <div class="form-group rolelist">
                            <label class="col-sm-2 control-label">角色</label>
                            <div class="col-sm-10">
                                <label v-for="role in roleL" class="adminrole">
                                            <input type="checkbox" v-bind:value="role._id" v-model="checkedRoles">
                                            {{role.name}}
                                </label>
                            </div>
                        </div>
                        <div class="form-group rolelist">
                            <label class="col-sm-2 control-label">系统(*)</label>
                            <div class="col-sm-10" style="text-align:left">
                                <label v-for="sys in systemL" class="adminrole">
                                            <input type="checkbox" v-bind:value="sys.id" v-model="updatesystemL">
                                            {{sys.app_id}}
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label hasMR">Area (*)</label>
                            <select class="form-control acName col-sm-10" v-model="updateArea">
                                <option value="">Please select the area</option>
                                <option v-for = "type in typeList" v-bind:value="type.code">
                                    {{type.name}}
                                </option>
                            </select>
                        </div>
                        <!-- {{checkedRoles}}
                        {{roleidL}} -->
                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">地址</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="地址" v-model.trim="adminUpA">
                            </div>
                        </div> -->
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

    <div class="modal fade bs-example-modal-lg" id="resetModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改密码</h4>
                </div>
                <div class="modal-body">
                    <div class="hideM">
                        {{userid}}
                    </div>
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" v-model.trim="adminUpE" disabled="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">原密码</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" placeholder="原密码" v-model.trim="oldP">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">新密码</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" placeholder="新密码" v-model.trim="newP1">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">确认密码</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" placeholder="确认密码" v-model.trim="newP2">
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">地址</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="地址" v-model.trim="adminUpA">
                            </div>
                        </div> -->
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
                    <button type="button" class="btn btn-primary" @click="updateP">确认</button>
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
            adminN: '',
            adminE: '',
            adminR: '',
            adminP: '',
            adminA: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            adminL: [],
            defaultPassword: 'tutulive123',
            upTips1: '',
            upTips2: '',
            adminUpID: '',
            adminUpN: '',
            adminUpE: '',
            adminUpR: '',
            adminUpP: '',
            adminUpA: '',
            pageL: [],
            name: '',
            oldP: '',
            newP1: '',
            newP2: '',
            userid: '',
            updateuserid: '',
            roleL: [],
            systemL: [],
            addsystemL: [],
            updatesystemL: [],
            checkedRoles: [],
            roleidL: [],
            typeList: [],
            newArea: '',
            updateArea: '',
        }
    },

    methods: {
        resetAdd() {
            this.adminN = '';
            this.adminE = '';
            this.adminR = '';
            this.adminP = '';
            this.adminA = '';
            this.addTips = '';
            this.addTips2 = '';

            this.roleL = [];
            this.systemL = [];
            this.addsystemL = [];
            this.checkedRoles = [];
            this.roleidL = [];
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/auth/role/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": 1,
                    "size": 999
                },
                success: function(data) {
                    let code = data.returncode;
                    if (code == 200) {
                        that.roleL = data.data.data;
                        $.ajax({
                            url: that.$store.state.rootUrl + '/app/list',
                            headers: {
                                "token": localStorage.getItem('A-TOKEN')
                            },
                            type: "GET",
                            data: {
                                "page": 1,
                                "size": 999
                            },
                            success: function(data) {
                                let code = data.returncode;
                                if (code == 200) {
                                    that.systemL = data.data;
                                } else if (code == '301') {
                                    console.log('参数错误');
                                } else if (code == '104') {
                                    utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.resetAdd);
                                }  else {
                                    utils.handleLogOut(data.returncode, that);
                                }
                            },
                            fail: function() {
                                console.log('Ajax Error');
                                utils.loginAgain(that);
                            }

                        })

                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.resetAdd);
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/getall',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "code": 'V2000'
                },
                success: function(data){
                    let code = data.returncode;
                    // console.log(data)
                    if(code == 200){
                        that.typeList = data.data;
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '304') {
                        that.upTips1 = 'Do without a dictionary';
                        setTimeout(function() {
                            that.upTips1 = '';
                        }, 1500);
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.resetAdd);
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

        addAdmin() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            
            if (that.adminN == '') {
                this.addTips = '请输入用户名';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else if (that.newArea == '') {
                that.addTips = 'Please select the area';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else if (!(/^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(that.adminE))) {
                that.addTips = '请输入正确的邮箱地址';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else if (that.checkedRoles.length == 0) {
                that.addTips = '请选择至少一个角色';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl + '/user/save',
                    type: "POST",
                    data: {
                        "username": that.adminN,
                        "email": that.adminE,
                        "password": CryptoJS.MD5(that.defaultPassword).toString(),
                        "cc": that.newArea
                    },
                    success: function(data) {

                        if (data.returncode == '305') {
                            that.addTips = '用户Email已存在';
                        } else if (data.returncode == '303') {
                            that.addTips = '服务器内部错误';
                        } else if (data.returncode == '200') {
                            const adminid = data.data.id;
                            $.ajax({
                                url: that.$store.state.rootUrl + '/app/auth',
                                headers: {
                                    "token": localStorage.getItem('A-TOKEN'),
                                    'Content-Type': 'application/json'
                                },
                                type: "POST",
                                data: JSON.stringify({
                                    "user_id": adminid,
                                    "ids": that.addsystemL
                                }),
                                dataType: "JSON",
                                success: function(data) {
                                    if (data.returncode == '200') {
                                        $.ajax({
                                            url: that.$store.state.rootUrl3 + '/admin/create',
                                            headers: {
                                                "token": localStorage.getItem('A-TOKEN')
                                            },
                                            type: "POST",
                                            data: {
                                                "userid": adminid,
                                                "name": that.adminN,
                                                "email": that.adminE,
                                                "phone": that.adminP,
                                                "enabled": 1,
                                                    // "role": that.adminR,
                                                    // "address": that.adminA
                                                "cc": that.newArea
                                            },
                                            success: function(data) {
                                                if (data.returncode == '200') {
                                                    let _id = data.data._id;
                                                    $.ajax({
                                                        url: that.$store.state.rootUrl3 + '/auth/role/user/update',
                                                        headers: {
                                                            "token": localStorage.getItem('A-TOKEN')
                                                        },
                                                        type: "POST",
                                                        data: {
                                                            "user_id": _id,
                                                            "ids": that.checkedRoles.join(",")
                                                        },
                                                        success: function(data) {
                                                            if (data.returncode == 200) {
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
                                                        }
                                                    });

                                                } else if (data.returncode == '104') {
                                                    utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addAdmin);

                                                }  else if (data.returncode == '302') {
                                                    that.addTips = '用户Email已存在';
                                                } else {
                                                    utils.handleLogOut(data.returncode, that);
                                                }
                                            },
                                            fail: function() {
                                                console.log('Ajax Error');
                                                utils.loginAgain(that);
                                            }
                                        })

                                    } else if (data.returncode == '104') {
                                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addAdmin);
                                    }  else if (data.returncode == '302') {
                                        that.addTips = '用户Email已存在';
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
                url: this.$store.state.rootUrl3 + '/admin/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "name": that.name
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

        changeState(initState, id) {
            const that = this;
            that.AMtips1 = '';
            that.AMtips2 = '';
            if (initState == 1) {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/admin/disable',
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
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/admin/enable',
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

        resetUpdate(id, name, email, phone, address, role, userid, cc) {
            this.adminUpID = id;
            this.adminUpN = name;
            this.adminUpE = email;
            this.adminUpP = phone;
            this.updateuserid = userid;
            // this.adminUpA = address;
            // this.adminUpR = role;
            this.roleL = [];
            this.systemL = [];
            this.checkedRoles = [];
            this.updatesystemL = [];
            this.roleidL = [];
            this.upTips1 = '';
            this.upTips2 = '';
            const that = this;
            that.menuidL = [];
            $.ajax({
                url: that.$store.state.rootUrl3 + '/auth/role/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": 1,
                    "size": 999
                },
                success: function(data) {
                    let code = data.returncode;
                    if (code == 200) {
                        that.roleL = data.data.data;
                        for (let i = 0; i < data.data.data.length; i++) {
                            that.roleidL.push(data.data.data[i]._id);
                        }

                        $.ajax({
                            url: that.$store.state.rootUrl3 + '/auth/role/user/list',
                            headers: {
                                "token": localStorage.getItem('A-TOKEN')
                            },
                            type: "GET",
                            data: {
                                "user_id": id
                            },
                            success: function(data) {
                                if (data.returncode == '200') {
                                    for (let i = 0; i < data.data.length; i++) {
                                        for (let j = 0; j < that.roleidL.length; j++) {
                                            if (data.data[i]._id == that.roleidL[j]) {
                                                that.checkedRoles.push(data.data[i]._id);
                                            }
                                        }
                                    }
                                    $.ajax({
                                        url: that.$store.state.rootUrl + '/app/list',
                                        headers: {
                                            "token": localStorage.getItem('A-TOKEN')
                                        },
                                        type: "GET",
                                        data: {
                                            "user_id": userid
                                        },
                                        success: function(data) {
                                            if (data.returncode == '200') {
                                                that.systemL = data.data;
                                                for (let i = 0; i < data.data.length; i++) {
                                                    if (data.data[i].checked == '1') {
                                                        that.updatesystemL.push(data.data[i].id);
                                                    }
                                                    
                                                }
                                            } else if (data.returncode == '104') {
                                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                                                    that.resetUpdate(id, email, phone, address, role)
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
                                } else if (data.returncode == '104') {
                                    utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                                        that.resetUpdate(id, email, phone, address, role)
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
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.resetUpdate(id, email, phone, address, role)
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
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/getall',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "code": 'V2000'
                },
                success: function(data){
                    let code = data.returncode;
                    // console.log(data)
                    if(code == 200){
                        that.typeList = data.data;
                        that.updateArea = cc||'';
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '304') {
                        that.upTips1 = 'Do without a dictionary';
                        setTimeout(function() {
                            that.upTips1 = '';
                        }, 1500);
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.resetAdd);
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


        resetP(id, email) {
            this.userid = id;
            this.adminUpE = email;
            this.oldP = '';
            this.newP1 = '';
            this.newP2 = '';
            this.upTips1 = '';
            this.upTips2 = '';

        },

        update() {
            const that = this;
            
            if (that.adminUpN == '') {
                that.upTips1 = '用户名不能为空';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else if (that.updateArea == '') {
                that.upTips1 = 'Please select the area';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(that.adminUpE))) {
                that.upTips1 = '请输入正确的邮箱地址';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/admin/update',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "name": that.adminUpN,
                        "id": that.adminUpID,
                        // "role": that.adminUpR,
                        "phone": that.adminUpP,
                        "cc": that.updateArea
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            $.ajax({
                                url: that.$store.state.rootUrl + '/app/auth',
                                headers: {
                                    "token": localStorage.getItem('A-TOKEN'),
                                    'Content-Type': 'application/json'
                                },
                                type: "POST",
                                data: JSON.stringify({
                                    "user_id": that.updateuserid,
                                    "ids": that.updatesystemL
                                }),
                                dataType: "JSON",
                                success: function(data) {
                                    if (data.returncode == '200') {
                                        $.ajax({
                                            url: that.$store.state.rootUrl3 + '/auth/role/user/update',
                                            headers: {
                                                "token": localStorage.getItem('A-TOKEN')
                                            },
                                            type: "POST",
                                            data: {
                                                "user_id": that.adminUpID,
                                                "ids": that.checkedRoles.join(","),
                                                "cc": that.updateArea
                                            },
                                            success: function(data) {
                                                if (data.returncode == 200) {
                                                    // that.upTips1 = '';
                                                    // that.upTips2 = '操作成功';
                                                    // that.adminList(that.page, that.size);
                                                    // setTimeout(function() {
                                                    //     that.upTips2 = '';
                                                    //     $('#updateModal').modal('hide');
                                                    // }, 500);
                                                    $.ajax({
                                                        url: that.$store.state.rootUrl + '/user/update',
                                                        headers: {
                                                            "token": localStorage.getItem('A-TOKEN')
                                                        },
                                                        type: "post",
                                                        data: {
                                                            "id": that.updateuserid,
                                                            "cc": that.updateArea
                                                        },
                                                        success: function(data){
                                                            let code = data.returncode;
                                                            // console.log(data)
                                                            if(code == 200){
                                                                that.upTips1 = '';
                                                                that.upTips2 = '操作成功';
                                                                that.adminList(that.page, that.size);
                                                                setTimeout(function() {
                                                                    that.upTips2 = '';
                                                                    $('#updateModal').modal('hide');
                                                                }, 500);
                                                            } else if (code == '104') {
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
                                                } else if (data.returncode == '104') {
                                                    utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                                                } else {
                                                    utils.handleLogOut(data.returncode, that);
                                                }
                                            },
                                            fail: function() {
                                                console.log('Ajax Error');
                                            }
                                        });

                                    } else if (data.returncode == '104') {
                                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);

                                    } else if (data.returncode == '302') {
                                        that.addTips = '用户Email已存在';
                                    } else {
                                        utils.handleLogOut(data.returncode, that);
                                    }
                                },
                                fail: function() {
                                    console.log('Ajax Error');
                                    utils.loginAgain(that);
                                }
                            })

                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function(data) {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }
        },

        updateP() {
            const that = this;
            if (that.oldP == "" || that.newP1 == "" || that.newP2 == "") {
                that.upTips1 = '请把密码填写完整';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else if (that.newP1 != that.newP2) {
                that.upTips1 = '新密码两次不一致';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else if (that.oldP == that.newP1) {
                that.upTips1 = '新密码与原密码重复，请重新输入密码';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl + '/user/modifypass',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "user_id": that.userid,
                        "password": CryptoJS.MD5(that.oldP).toString(),
                        "new_pass": CryptoJS.MD5(that.newP1).toString()
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.upTips2 = '修改密码成功';
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#resetModal').modal('hide');
                            }, 1000);
                        } else if (data.returncode == '305') {
                            that.upTips1 = '原密码错误，请重新输入原密码';
                            that.oldP = '';
                            setTimeout(function() {
                                that.upTips2 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.updateP);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
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

    },





    mounted() {
        this.$store.dispatch('tabChanger', 4);
        this.$store.dispatch('subChanger', 'sub1');
        this.adminList(this.page, this.size);
    }
}
</script>
