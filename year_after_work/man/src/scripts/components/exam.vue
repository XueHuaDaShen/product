
<template id="">
<div class="">
    <div class="AM-top" style="text-align:right; margin-right: 8.3%; margin-top: 10px;">

        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>

        <div class="AM-topR">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入Pid" v-model.trim="name" style="width: 40%;">
            <select class="form-control record-info" name=""  v-model.trim="signS" style = "display: inline-block; width: 30%; position:relative; top: 0;">
                <option value="">选择状态</option>
                <option value="0">未签约</option>
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
                            <li :class="admin.status == 0? 'sign_show' : 'sign_hide'" ><a href="javascript: void(0)" data-toggle='modal' data-target="#signModal" @click="resetsign(admin._id, admin.pid, admin.unionid, admin.union, admin.salary, admin.kpitype, moment(admin.sign_at).format('YYYY-MM-DD'), admin.realname, admin.nickname, admin.age, admin.idcard, admin.facebook_link, admin.instagram_link, admin.line_id, admin.loginname, admin.account_name, admin.account_no, admin.sex,  admin.phone, moment(admin.create_at).format('YYYY-MM-DD'), admin.status, admin.contract_type)">签约</a></li>
                            <li :class="admin.status == 0? 'sign_show' : 'sign_hide'"><a href="javascript: void(0)" data-toggle='modal' data-target="#rejectModal" @click="resetreject(admin._id, admin.pid, admin.realname)">拒绝</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#check" @click="check(admin._id, admin.realname, admin.nickname, admin.age, admin.idcard, admin.facebook_link, admin.instagram_link, admin.line_id, admin.pid, admin.loginname, admin.salary, admin.account_name, admin.account_no, admin.sex, admin.union, admin.unionid, admin.phone, admin.create_at)">查看申请详情</a></li>
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

    <div class="modal fade bs-example-modal-lg" id="signModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">签约</h4>
                </div>
                <div class="modal-body">
                    <div class="hideM">
                        {{adminUpID}}
                    </div>
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Pid</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="adminUpPid" disabled="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">loginname</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="loginname" disabled="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">realname</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="realname" disabled="">
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label hasMR">工会名称 (*)</label>
                            <select class="form-control acName col-sm-10" v-model="upUnion" :disabled="isDisabled">
                              <option v-for = "union in unionL" v-bind:value="union._id">
                                  {{union.name}}
                              </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">薪水</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="adminUpS" :disabled="isDisabled">
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
                            <label class="col-sm-2 control-label">考核标准</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="inputEmail1" v-model.trim="kpi" :disabled="isDisabled">
                                    <option v-for="kpi in kpiL" v-bind:value="kpi.type">{{kpi.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">签约时间</label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" v-model.trim="adminUpD" :disabled="isDisabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">nickname</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="nickname" :disabled="isDisabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">sex</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="sex" :disabled="isDisabled">
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
                                <input type="text" class="form-control" v-model.trim="age" :disabled="isDisabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">idcard</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="idcard" :disabled="isDisabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">phone</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="phone" :disabled="isDisabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">facebook_link</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="facebook_link" :disabled="isDisabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">instagram_link</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="instagram_link" :disabled="isDisabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">line_id</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="line_id" :disabled="isDisabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">account_no</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="account_no" :disabled="isDisabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">account_name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="account_name" :disabled="isDisabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">申请时间</label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" disabled v-model.trim="sub_time" disabled="">
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
                    <button type="button" class="btn btn-primary" @click="sign">确认</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="rejectModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">拒绝</h4>
                </div>
                <div class="modal-body" style = "text-align: center">
                    <div class="hideM">
                        {{delID}}
                    </div>
                    <h5>确认拒绝  Pid <span class = "acdel1">{{delPid}} </span> Name <span class = "acdel1">{{realname}} </span>的申请吗</h5>
                    <div class="addTips">
                        {{upTips1}}
                    </div>
                    <div class="addTips2">
                        {{upTips2}}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="reject">确认</button>
                </div>
            </div>
        </div>
    </div>

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
                                <input type="text" class="form-control" v-model.trim="realname" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">nickname</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="nickname" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">sex</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="sex" disabled>
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
                                <input type="text" class="form-control" v-model.trim="age" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">idcard</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="idcard" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">phone</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="phone" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">facebook_link</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="facebook_link" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">instagram_link</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="instagram_link" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">line_id</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="line_id" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label hasMR">工会名称 (*)</label>
                            <select class="form-control acName col-sm-10" disabled>
                                <option v-bind:value="unionid">
                                    {{union}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">pid</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" disabled v-model.trim="pid" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">loginname</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="loginname" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">salary</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="salary" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">合约类型</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="contract_type" disabled>
                                    <option value="">请选择合约类型</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">account_no</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="account_no" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">account_name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="account_name" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">申请时间</label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" disabled v-model.trim="sub_time" disabled>
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
            adminUpID: '',
            adminUpPid: '',
            adminUpD: '',
            pageL: [],
            name: '',
            userid: '',
            upUnion: '',
            unionL: [],
            delID: '',
            delPid: '',
            adminUpS: '',
            signS: '',
            kpi: '',
            kpiL: [],
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
            isDisabled: false,
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

        statusDis: function(sta) {
            const that = this;
            if (sta == 1) {
                that.isDisabled = true;
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

        update() {
            $('#check').modal('hide');
            // const that = this;
            // if (that.realname == '') {
            //     that.upTips1 = '请填写真实名字';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // } else if (that.nickname == '') {
            //     that.upTips1 = '请填写小名';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // } else if (that.age == '') {
            //     that.upTips1 = '请输入年龄';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // } else if (that.idcard == '') {
            //     that.upTips1 = '请输入身份证';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // } else if (that.facebook_link == '') {
            //     that.upTips1 = '请输入facebook链接';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // } else if (that.instagram_link == '') {
            //     that.upTips1 = '请输入instagram链接';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // } else if (that.line_id == '') {
            //     that.upTips1 = '请输入line id';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // } else if (that.loginname == '') {
            //     that.upTips1 = '请输入loginname';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // } else if (that.salary == '') {
            //     that.upTips1 = '请输入工资';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // }  else if (that.account_name == '') {
            //     that.upTips1 = '请输入银行名称';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // } else if (that.account_no == '') {
            //     that.upTips1 = '请输入银行卡号';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // } else if (that.sex == '') {
            //     that.upTips1 = '请选择性别';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // }  else if (that.unionid == '') {
            //     that.upTips1 = '请选择工会';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // } else if (that.phone == '') {
            //     that.upTips1 = '请输入电话号';
            //     setTimeout(function() {
            //         that.upTips1 = '';
            //     }, 500);
            //     return false;
            // }else{
            //     $.ajax({
            //         url: this.$store.state.rootUrl3 + '/host/apply/update',
            //         type: "POST",
            //         headers: {
            //             "token": localStorage.getItem('A-TOKEN')
            //         },
            //         data: {
            //             "realname": that.realname,
            //             "nickname": that.nickname,
            //             "age": that.age,
            //             "idcard": that.idcard,
            //             "facebook_link": that.facebook_link,
            //             "instagram_link": that.instagram_link,
            //             "line_id": that.line_id,
            //             "pid": that.pid,
            //             "loginname": that.loginname,
            //             "salary": that.salary,
            //             "account_name": that.account_name,
            //             "sex": that.sex,
            //             "union": that.union,
            //             "unionid": that.unionid,
            //             "phone": that.phone,
            //             "account_no": that.account_no
            //         },
            //         success: function(data) {
            //             if (data.returncode == '200') {
            //                 that.upTips1 = '';
            //                 that.upTips2 = '操作成功';
            //                 that.adminList(that.page, that.size)
            //                 setTimeout(function() {
            //                     that.upTips2 = '';
            //                     $('#check').modal('hide');
            //                 }, 500);
            //             } else if (data.returncode == '104') {
            //                 utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
            //             } else if (data.returncode == '304' || data.returncode == '106' || data.returncode == '102' || data.returncode == '103') {
            //                 utils.loginAgain(that);
            //             }
            //         },
            //         fail: function() {
            //             console.log('Ajax Error');
            //             utils.loginAgain(that);
            //         }
            //     });
            // }
        },

        resetsign(id, pid, unionid, union, salary, kpi, signAt, realname, nickname, age, idcard, facebook_link, instagram_link, line_id, loginname, account_name, account_no, sex,  phone, create_at, sta, contract_type) {
            this.isDisabled = false;
            this.kpi = kpi;
            this.adminUpD = signAt;
            this.adminUpID = id;
            this.adminUpPid = pid;
            this.adminUpS = salary;
            this.realname = realname;
            this.nickname = nickname;
            this.age = age;
            this.union = union;
            this.idcard = idcard;
            this.facebook_link = facebook_link;
            this.instagram_link = instagram_link;
            this.line_id = line_id;
            this.loginname = loginname;
            this.account_name = account_name;
            this.sex = sex;
            this.phone = phone;
            this.account_no = account_no;
            this.sub_time = create_at;
            this.contract_type = contract_type||'A';
            this.upUnion = '';
            this.upTips1 = '';
            this.upTips2 = '';
            const that = this;
            that.unionL = [];
            that.statusDis(sta);
            $.ajax({
                url: that.$store.state.rootUrl3 + '/union/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": 1,
                    "size": 999
                },
                async: false,
                success: function(data) {
                    let code = data.returncode;
                    if (code == 200) {
                        that.unionL = data.data.data;
                        for (let i = 0; i < data.data.data.length; i++) {
                            if (unionid === data.data.data[i]._id) {
                                that.upUnion = unionid;
                            }
                            console.log(unionid + '/' + data.data.data[i]._id);
                        }
                        $.ajax({
                            url: that.$store.state.rootUrl3 + '/kpi/list',
                            headers: {
                                "token": localStorage.getItem('A-TOKEN')
                            },
                            type: "GET",
                            data: {
                                "page": 1,
                                "size": 999
                            },
                            async: false,
                            success: function(data) {
                                let code = data.returncode;
                                if (code == 200) {
                                    that.kpiL = data.data.data;
                                } else if (code == '301') {
                                    console.log('参数错误');
                                } else if (code == '104') {
                                    utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                                        that.resetsign(id, pid, unionid, salary, kpi, signAt, realname, nickname, age, idcard, facebook_link, instagram_link, line_id, loginname, account_name, account_no, sex,  phone, create_at, sta, contract_type)
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
                            that.resetsign(that.id, that.pid)
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

        },

        resetreject(id, pid, realname) {
            this.delID = id;
            this.delPid = pid;
            this.realname = realname
        },

        check(id, realname, nickname, age, idcard, facebook_link, instagram_link, line_id, pid, loginname, salary, account_name, account_no, sex, union, unionid, phone, create_at){
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
        },

        sign() {
            const that = this;
            if (isNaN(parseInt(that.adminUpS)) ) {
                that.upTips1 = '请在薪水一栏中输入数字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else if (that.adminUpD === '' || that.kpi === '' || that.adminUpS === '' || that.upUnion === '' || that.kpi === '' || that.kpi === undefined) {
                that.upTips1 = '请把信息补充完整';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else if (that.contract_type == '') {
                that.upTips1 = '请选择合约类型';
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
            } else if (isNaN(parseInt(that.idcard)) || that.idcard.length!=13) {
                that.upTips1 = '身份证为13位数字';
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
            } else if (that.account_name == '') {
                that.upTips1 = '请输入银行名称';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (isNaN(parseInt(that.account_no)) || that.account_no.length!=10) {
                that.upTips1 = '银行卡号为10位数字';
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
            } else if (isNaN(parseInt(that.phone)) || that.phone.length!=10) {
                that.upTips1 = '电话号为10位数字';
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
                        "pid": that.adminUpPid,
                        "loginname": that.loginname,
                        "salary": that.adminUpS,
                        "account_name": that.account_name,
                        "sex": that.sex,
                        "union": that.union,
                        "unionid": that.upUnion,
                        "phone": that.phone,
                        "account_no": that.account_no,
                        "contract_type": that.contract_type
                    },
                    success: function(data) {
                        console.log(data)
                        if (data.returncode == '200') {
                            $.ajax({
                                url: that.$store.state.rootUrl3 + '/host/apply/signup',
                                headers: {
                                    "token": localStorage.getItem('A-TOKEN')
                                },
                                type: "POST",
                                data: {
                                    "id": that.adminUpID,
                                    "pid": that.adminUpPid,
                                    "unionid": that.upUnion,
                                    "salary": that.adminUpS,
                                    "kpitype": that.kpi,
                                    "sign_at": that.adminUpD,
                                    "nickname": that.nickname,
                                    "age": that.age,
                                    "idcard": that.idcard,
                                    "facebook_link": that.facebook_link,
                                    "instagram_link": that.instagram_link,
                                    "line_id": that.line_id,
                                    "loginname": that.loginname,
                                    "account_name": that.account_name,
                                    "sex": that.sex,
                                    "phone": that.phone,
                                    "account_no": that.account_no,
                                    "contract_type": that.contract_type
                                },
                                success: function(data) {
                                    if (data.returncode == '200') {
                                        that.upTips1 = '';
                                        that.upTips2 = '签约成功';
                                        that.adminList(that.page, that.size);
                                        setTimeout(function() {
                                            that.upTips2 = '';
                                            $('#signModal').modal('hide');
                                        }, 500);

                                    } else if (data.returncode == '104') {
                                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.sign);
                                    } else if (data.returncode == '301') {
                                       that.upTips1 = '参数错误';
                                       setTimeout(function() {
                                            that.upTips1 = '';
                                        }, 500);
                                   } else {
                                        utils.handleLogOut(data.returncode, that);
                                    }
                                },
                                fail: function(data) {
                                    console.log('Ajax Error');
                                    utils.loginAgain(that);
                                }
                            })
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.sign);
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

        },

        reject(id, pid) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/host/apply/reject',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": that.delID,
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.upTips1 = '';
                        that.upTips2 = '拒绝成功';
                        that.adminList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#rejectModal').modal('hide');
                        }, 500);

                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.reject(id, pid);
                        });
                    } else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function(data) {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            })

        },

        
        searchAdmin() {
            const that = this;
            that.page = 1;
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
        this.$store.dispatch('tabChanger', 21);
        this.$store.dispatch('subChanger', 'sub2');

        // console.log(this.$store.state.tabIndex);
        this.adminList(this.page, this.size);
        //this.adminList(this.page, this.size, this.name);
    }
}
</script>
