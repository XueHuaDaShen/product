
<template id="">
<div class="">
    <div class="AM-top" style="text-align:right; margin-right: 8.3%; margin-top: 10px;">

        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>

        <div class="AM-topR">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入Pid" v-model.trim="name" style="width: 40%;">
            <select class="form-control record-info" name=""  v-model.trim="signS" style = "display: inline-block; width: 30%; position:relative; top: 0;">
                <option value="">选择状态</option>
                <option value="1">审核通过</option>
                <option value="2">已拒绝</option>
            </select>
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAdmin"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table" style="table-layout: fixed;">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>Pid</th>
                <th>性别</th>
                <th>姓名</th>
                <th>电话</th>
                <th>申请公会</th>
                <th>申请时间</th>
                <th>审核时间</th>
                <th>签约时间</th>
                <th>审核状态</th>
                <th>薪水</th>
                <th>合约类型</th>
                <th>考核标准</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}/{{admin.unionid}}/{{admin.kpitype}}</td>
                <td>{{admin.pid}}</td>
                <td>{{sexM(admin.sex)}}</td>
                <td>{{admin.realname}}</td>
                <td>{{admin.phone}}</td>
                <td>{{admin.union}}</td>
                <td>{{moment(admin.create_at).format('YYYY-MM-DD')}}</td>
                <td>{{moment(admin.update_at).format('YYYY-MM-DD')}}</td>
                <td>{{moment(admin.sign_at).format('YYYY-MM-DD')}}</td>
                <td>{{statusM(admin.status)}}</td>
                <td>{{admin.salary}}</td>
                <td>{{admin.contract_type}}</td>
                <td>{{admin.kpiname}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#check" @click="check(admin._id, admin.realname, admin.nickname, admin.age, admin.idcard, admin.facebook_link, admin.instagram_link, admin.line_id, admin.pid, admin.loginname, admin.salary, admin.account_name, admin.account_no, admin.sex, admin.union, admin.unionid, admin.phone, admin.create_at, admin.contract_type)">编辑</a></li>
                            <li><a href="javascript: void(0)" @click="deleteList(admin._id, admin.status, admin.loginid)">删除</a></li>
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

    <div class="modal fade bs-example-modal-lg" id="check" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">申请详情</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">realname</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="realname">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">nickname</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="nickname">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">sex</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="sex">
                                    <option value="">请选择性别</option>
                                    <option value="1">男</option>
                                    <option value="2">女</option>
                                    <option value="0">已婚女</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">age</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="age">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">idcard</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="idcard">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">phone</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="phone">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">facebook_link</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="facebook_link">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">instagram_link</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="instagram_link">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">line_id</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="line_id">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label hasMR">工会名称 (*)</label>
                            <select class="form-control acName col-sm-10">
                                <option v-bind:value="unionid">
                                    {{union}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">pid</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" disabled v-model.trim="pid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">loginname</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="loginname">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">salary</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="salary">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">合约类型</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="contract_type">
                                    <option value="">请选择合约类型</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">account_no</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="account_no">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">account_name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="account_name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">申请时间</label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" disabled v-model.trim="sub_time">
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
const moment = require('moment');
export default {
    data() {
        return {
            moment: moment,
            AMtips1: '',
            AMtips2: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            adminL: [],
            upTips1: '',
            upTips2: '',
            flag: 'default',
            pageL: [],
            name: '',
            signS: '',
            realname: '',
            nickname: '',
            age: '',
            idcard: '',
            facebook_link: '',
            instagram_link: '',
            line_id: '',
            pid: '',
            loginname: '',
            salary: '',
            account_name: '',
            sex: '',
            union: '',
            unionid: '',
            phone: '',
            account_no: '',
            sub_time: '',
            contract_type: 'A'
        }
    },

    computed: {

    },

    methods: {
        sexM: function(sex) {
            if (sex == 1) {
                return '男';
            } else if (sex == 2) {
                return '女';
            } else if (sex == 0) {
                return '未知';
            }
        },

        statusM: function(status) {
            if (status == 0) {
                return '未签约';
            } else if (status == 1) {
                return "审核通过";
            } else if (status == 2) {
                return '已拒绝';
            }
        },

        adminList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/host/apply/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "flag": that.flag,
                    "pid": that.name,
                    "status": that.signS
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

        update() {
            const that = this;
            if (that.realname == '') {
                that.upTips1 = '请填写真实名字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.nickname == '') {
                that.upTips1 = '请填写小名';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.age == '') {
                that.upTips1 = '请输入年龄';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.idcard == '') {
                that.upTips1 = '请输入身份证';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.facebook_link == '') {
                that.upTips1 = '请输入facebook链接';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.instagram_link == '') {
                that.upTips1 = '请输入instagram链接';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.line_id == '') {
                that.upTips1 = '请输入line id';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.loginname == '') {
                that.upTips1 = '请输入loginname';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.salary == '') {
                that.upTips1 = '请输入工资';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.contract_type == '') {
                that.upTips1 = '请选择合约类型';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.account_name == '') {
                that.upTips1 = '请输入银行名称';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.account_no == '') {
                that.upTips1 = '请输入银行卡号';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.sex == '') {
                that.upTips1 = '请选择性别';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }  else if (that.unionid == '') {
                that.upTips1 = '请选择工会';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.phone == '') {
                that.upTips1 = '请输入电话号';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else{
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/host/apply/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "realname": that.realname,
                        "nickname": that.nickname,
                        "age": that.age,
                        "idcard": that.idcard,
                        "facebook_link": that.facebook_link,
                        "instagram_link": that.instagram_link,
                        "line_id": that.line_id,
                        "pid": that.pid,
                        "loginname": that.loginname,
                        "salary": that.salary,
                        "account_name": that.account_name,
                        "sex": that.sex,
                        "union": that.union,
                        "unionid": that.unionid,
                        "phone": that.phone,
                        "account_no": that.account_no,
                        "contract_type": that.contract_type
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.adminList(that.page, that.size)
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#check').modal('hide');
                            }, 500);
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
        },


        check(id, realname, nickname, age, idcard, facebook_link, instagram_link, line_id, pid, loginname, salary, account_name, account_no, sex, union, unionid, phone, create_at, contract_type){
            const that = this;
            this.realname = realname;
            this.nickname = nickname;
            this.age = age;
            this.idcard = idcard;
            this.facebook_link = facebook_link;
            this.instagram_link = instagram_link;
            this.line_id = line_id;
            this.pid = pid;
            this.loginname = loginname;
            this.salary = salary;
            this.account_name = account_name;
            this.account_no = account_no;
            this.sex = sex;
            this.union = union;
            this.unionid = unionid;
            this.phone = phone;
            this.sub_time = moment(create_at).format('YYYY-MM-DD');
            this.contract_type = contract_type||'A';
        },

        deleteList(id, status, loginid) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/host/apply/delete',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": id,
                    "status": status,
                    "loginid": loginid
                },
                success: function(data){
                    if (data.returncode == '200') {
                        that.AMtips1 = '操作成功';
                        that.adminList(that.page, that.size);
                        setTimeout(function() {
                            that.AMtips1 = '';
                        }, 1000);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.deleteList(id, status, loginid)});
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

        searchAdmin() {
            const that = this;
            that.page = 1;
            // console.log(that.name)
            if( !that.signS == '' || !that.name == '' ){
                that.flag = '';
            }else{
                that.flag = 'default';
            }
            that.adminList(that.page, that.size);
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
        this.$store.dispatch('tabChanger', 6);
        this.$store.dispatch('subChanger', 'sub2');

        // console.log(this.$store.state.tabIndex);
        this.adminList(this.page, this.size);
        //this.adminList(this.page, this.size, this.name);
    }
}
</script>
