<template id="">
<div class="">
    <div class="AM-top" style="margin-top: 10px;overflow: hidden;">
        <button style="float:left" type="button" class="btn btn-primary AM-add" data-toggle="modal" data-target="#myModal" @click="resetAdd">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <!-- Modal -->
        <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增机器人规则</h4>
                    </div>
                    <div class="modal-body">
                        <form name="myForm">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label for="name" class="col-sm-3 control-label">规则名称</label>

                                        <div class="col-sm-9">
                                            <input type="text" name="name" v-model.trim="adminName" class="form-control" id="name" required="" placeholder="请填入规则名称">
                                        </div>
                                    </div>

                                    <div class="form-group row clearfix">
                                        <label for="is_leave" class="col-sm-3 control-label">离开房间</label>

                                        <div class="col-sm-9">
                                            <select class="form-control" name="" id="is_leave" v-model.trim='adminLeave'>
                                                <option value="0">离开</option>
                                                <option value="1">不离开</option>
                                            </select>
                                            <!-- <input type="number" name="is_leave" v-model.trim="adminLeave" min="0" max="1"  class="form-control"
                                                placeholder="0 离开，1 不离开" required=""> -->

                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label for="send_random_rate" class="col-sm-3 control-label">发言几率[0,99]</label>

                                        <div class="col-sm-9">
                                            <input type="number" name="send_random_rate" v-model.trim="adminSpeak" min="1" max="99" class="form-control" placeholder="请填入0-99内的整数" id="send_random_rate" required="">


                                        </div>
                                    </div>

                                    <div class="form-group row clearfix">
                                        <label for="zan_rate" class="col-sm-3 control-label">点赞几率[0,99]</label>

                                        <div class="col-sm-9">
                                            <input type="number" name="zan_rate" v-model.trim="adminGood" class="form-control" id="zan_rate" placeholder="请填入0-99内的整数" required="">
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label for="df_join_time_range" class="col-sm-3 control-label">默认加入时间</label>

                                        <div class="col-sm-9">
                                            <input type="number" name="df_join_time_range" v-model.trim="adminDAddT" class="form-control" id="df_join_time_range" required="" placeholder="请填入非负整数">

                                        </div>
                                    </div>

                                    <div class="form-group row clearfix">
                                        <label for="df_leave_time_range" class="col-sm-3 control-label">默认离开时间</label>

                                        <div class="col-sm-9">
                                            <input type="number" name="df_leave_time_range" v-model="adminDLeaveT" class="form-control" id="df_leave_time_range" required="" placeholder="请填入非负整数">
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label for="df_join_num_range2" class="col-sm-3 control-label">默认加入数量</label>

                                        <div class="col-sm-9">
                                            <input type="text" name="df_join_num_range2" v-model.trim="adminDAddN1" class="form-control" id="df_join_num_range2" required="" style="width: 45%; float: left;" placeholder="非负整数">
                                            <span style="display: inline-block; height: 34px; line-height: 34px;">---</span>
                                            <input type="text" name="join_num_range3" v-model.trim="adminDAddN2" class="form-control" required="" style="width: 45%; float: right" placeholder="非负整数">
                                        </div>
                                    </div>



                                    <div class="form-group row clearfix">
                                        <label for="df_leave_num_range" class="col-sm-3 control-label">默认离开数量</label>

                                        <div class="col-sm-9">
                                            <input type="text" name="df_leave_num_range" v-model.trim="adminDLeaveN" placeholder="非负整数" class="form-control" id="df_leave_num_range" required="">
                                        </div>
                                    </div>
                                </div>



                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label for="join_num_range" class="col-sm-3 control-label">加入数量</label>

                                        <div class="col-sm-9">
                                            <input type="text" name="join_num_range" v-model.trim="adminAddN1" class="form-control" id="join_num_range" required="" style="width: 45%; float: left;" placeholder="非负整数">
                                            <span style="display: inline-block; height: 34px; line-height: 34px;">---</span>
                                            <input type="text" name="join_num_range" v-model.trim="adminAddN2" class="form-control" required="" style="width: 45%; float: right" placeholder="非负整数">
                                        </div>
                                    </div>



                                    <div class="form-group row clearfix">
                                        <label for="leave_num_range" class="col-sm-3 control-label">离开数量</label>

                                        <div class="col-sm-9">
                                            <input type="text" name="leave_num_range" v-model.trim="adminLeaveN1" class="form-control" id="leave_num_range" required="" style="width: 45%; float: left;" placeholder="非负整数">
                                            <span style="display: inline-block; height: 34px; line-height: 34px;">---</span>
                                            <input type="text" name="leave_num_range" v-model.trim="adminLeaveN2" class="form-control" required="" style="width: 45%; float: right" placeholder="非负整数">
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label for="join_time_range" class="col-sm-3 control-label">加入时间</label>

                                        <div class="col-sm-9">
                                            <input type="number" name="join_time_range" v-model.trim="adminAddT" class="form-control" id="join_time_range" required="" placeholder="非负整数">
                                        </div>
                                    </div>



                                    <div class="form-group row clearfix">
                                        <label for="leave_time_range" class="col-sm-3 control-label">离开时间</label>

                                        <div class="col-sm-9">
                                            <input type="number" name="leave_time_range" v-model.trim="adminLeaveT" class="form-control" id="leave_time_range" required="" placeholder="非负整数">


                                        </div>
                                    </div>
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


    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>规则名称</th>
                <th>默认加入人数</th>
                <th>默认加入时间</th>
                <th>默认离开时间</th>
                <th>加入人数</th>
                <th>加入时间</th>
                <th>离开时间</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin.id}}</td>
                <td>{{admin.name}}</td>
                <td>{{admin.df_join_num_range}}</td>
                <td>{{admin.df_join_time_range}}</td>
                <td>{{admin.df_leave_time_range}}</td>
                <td>{{admin.join_num_range}}</td>
                <td>{{admin.join_time_range}}</td>
                <td>{{admin.leave_time_range}}</td>
                <td>
                    <div class="btn-group">
                        <div class="btn-group">
                            <button type="button" class="btn btnAMsmall btn-primary" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin.id, admin.name, admin.df_join_time_range, admin.df_join_num_range, admin.df_leave_time_range, admin.df_leave_num_range, admin.join_num_range, admin.join_time_range, admin.leave_num_range, admin.leave_time_range, admin.send_random_rate, admin.zan_rate, admin.is_leave)">
                                编辑
                            </button>
                        </div>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改机器人规则</h4>
                </div>
                <div class="modal-body">
                    <div class="hideM">
                        {{adminUpID}}
                    </div>
                    <form name="myForm">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group row clearfix">
                                    <label for="name" class="col-sm-3 control-label">规则名称</label>

                                    <div class="col-sm-9">
                                        <input type="text" name="name" v-model.trim="adminName" class="form-control" id="name" required="" placeholder="请填入规则名称">
                                    </div>
                                </div>

                                <div class="form-group row clearfix">
                                    <label for="is_leave" class="col-sm-3 control-label">离开房间</label>

                                    <div class="col-sm-9">
                                        <select class="form-control" name="" id="is_leave" v-model.trim='adminLeave'>
                                            <option value="0">离开</option>
                                            <option value="1">不离开</option>
                                        </select>
                                        <!-- <input type="number" name="is_leave" v-model.trim="adminLeave" min="0" max="1"  class="form-control"
                                            placeholder="0 离开，1 不离开" required=""> -->

                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group row clearfix">
                                    <label for="send_random_rate" class="col-sm-3 control-label">发言几率[0,99]</label>

                                    <div class="col-sm-9">
                                        <input type="number" name="send_random_rate" v-model.trim="adminSpeak" min="1" max="99" class="form-control" placeholder="请填入0-99内的整数" id="send_random_rate" required="">


                                    </div>
                                </div>

                                <div class="form-group row clearfix">
                                    <label for="zan_rate" class="col-sm-3 control-label">点赞几率[0,99]</label>

                                    <div class="col-sm-9">
                                        <input type="number" name="zan_rate" v-model.trim="adminGood" class="form-control" id="zan_rate" placeholder="请填入0-99内的整数" required="">
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-6">
                                <div class="form-group row clearfix">
                                    <label for="df_join_time_range" class="col-sm-3 control-label">默认加入时间</label>

                                    <div class="col-sm-9">
                                        <input type="number" name="df_join_time_range" v-model.trim="adminDAddT" class="form-control" id="df_join_time_range" required="" placeholder="请填入非负整数">

                                    </div>
                                </div>

                                <div class="form-group row clearfix">
                                    <label for="df_leave_time_range" class="col-sm-3 control-label">默认离开时间</label>

                                    <div class="col-sm-9">
                                        <input type="number" name="df_leave_time_range" v-model="adminDLeaveT" class="form-control" id="df_leave_time_range" required="" placeholder="请填入非负整数">
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-6">
                                <div class="form-group row clearfix">
                                    <label for="df_join_num_range2" class="col-sm-3 control-label">默认加入数量</label>

                                    <div class="col-sm-9">
                                        <input type="text" name="df_join_num_range2" v-model.trim="adminDAddN1" class="form-control" id="df_join_num_range2" required="" style="width: 45%; float: left;" placeholder="非负整数">
                                        <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center;">---</span>
                                        <input type="text" name="join_num_range3" v-model.trim="adminDAddN2" class="form-control" required="" style="width: 45%; float: right" placeholder="非负整数">
                                    </div>
                                </div>



                                <div class="form-group row clearfix">
                                    <label for="df_leave_num_range" class="col-sm-3 control-label">默认离开数量</label>

                                    <div class="col-sm-9">
                                        <input type="text" name="df_leave_num_range" v-model.trim="adminDLeaveN" placeholder="非负整数" class="form-control" id="df_leave_num_range" required="">
                                    </div>
                                </div>
                            </div>



                            <div class="col-md-6">
                                <div class="form-group row clearfix">
                                    <label for="join_num_range" class="col-sm-3 control-label">加入数量</label>

                                    <div class="col-sm-9">
                                        <input type="text" name="join_num_range" v-model.trim="adminAddN1" class="form-control" id="join_num_range" required="" style="width: 45%; float: left;" placeholder="非负整数">
                                        <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center;">---</span>
                                        <input type="text" name="join_num_range" v-model.trim="adminAddN2" class="form-control" required="" style="width: 45%; float: right" placeholder="非负整数">
                                    </div>
                                </div>



                                <div class="form-group row clearfix">
                                    <label for="leave_num_range" class="col-sm-3 control-label">离开数量</label>

                                    <div class="col-sm-9">
                                        <input type="text" name="leave_num_range" v-model.trim="adminLeaveN1" class="form-control" id="leave_num_range" required="" style="width: 45%; float: left;" placeholder="非负整数">
                                        <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center;">---</span>
                                        <input type="text" name="leave_num_range" v-model.trim="adminLeaveN2" class="form-control" required="" style="width: 45%; float: right" placeholder="非负整数">
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-6">
                                <div class="form-group row clearfix">
                                    <label for="join_time_range" class="col-sm-3 control-label">加入时间</label>

                                    <div class="col-sm-9">
                                        <input type="number" name="join_time_range" v-model.trim="adminAddT" class="form-control" id="join_time_range" required="" placeholder="非负整数">
                                    </div>
                                </div>



                                <div class="form-group row clearfix">
                                    <label for="leave_time_range" class="col-sm-3 control-label">离开时间</label>

                                    <div class="col-sm-9">
                                        <input type="number" name="leave_time_range" v-model.trim="adminLeaveT" class="form-control" id="leave_time_range" required="" placeholder="非负整数">


                                    </div>
                                </div>
                            </div>

                        </div>



                        <div class="addTips">
                            {{addTips}}
                        </div>
                        <div class="addTips2">
                            {{addTips2}}
                        </div>
                    </form>
                    <!-- <div class="addTips">
                        {{upTips1}}
                    </div>
                    <div class="addTips2">
                        {{upTips2}}
                    </div> -->
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
            adminName: '',
            adminLeave: '',
            adminDAddT: '',
            adminDLeaveT: '',
            adminAddN1: '',
            adminAddN2: '',
            adminLeaveN1: '',
            adminLeaveN2: '',
            adminSpeak: '',
            adminGood: '',
            adminDAddN1: '',
            adminDAddN2: '',
            adminDLeaveN: '',
            adminAddT: '',
            adminLeaveT: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            adminL: [],
            upTips1: '',
            upTips2: '',
            pageL: [],
            name: '',
            userid: '',
            adminUpID: '',
        }
    },

    methods: {
        resetAdd() {
            this.adminName = '';
            this.adminLeave = 0;
            this.adminDAddT = 180;
            this.adminDLeaveT = 10;
            this.adminAddN1 = 2;
            this.adminAddN2 = 10;
            this.adminLeaveN1 = 1;
            this.adminLeaveN2 = 10;
            this.adminSpeak = 5;
            this.adminGood = 10;
            this.adminDAddN1 = 50;
            this.adminDAddN2 = 100;
            this.adminDLeaveN = 1;
            this.adminAddT = 70;
            this.adminLeaveT = 140;
            this.addTips2 = '';
            this.addTips2 = '';
        },

        addAdmin() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            if (that.adminName === '' || that.adminLeave === '' || that.adminDAddT === '' || that.adminDLeaveT === '' || that.adminAddN1 === '' || that.adminAddN2 === '' || that.adminLeaveN1 === '' || that.adminLeaveN2 === '' || that.adminSpeak ===
                '' || that.adminGood === '' || that.adminDAddN1 === '' || that.adminDAddN2 === '' || that.adminDLeaveN === '' || that.adminAddT === '' || that.adminLeaveT === '') {
                this.addTips = '请把信息补充完整';
                setTimeout(function() {
                    that.addTips = '';
                }, 2000);
            } else if (parseInt(that.adminSpeak) > 99 || parseInt(that.adminSpeak) < 0 || parseInt(that.adminGood) > 99 || parseInt(that.adminSGood) < 0) {
                that.addTips = '发言几率和点赞几率必须在0-99之间';
                setTimeout(function() {
                    that.addTips = '';
                }, 2000);
            } else if (parseInt(that.adminDAddT) < 0 || parseInt(that.adminDLeaveT) < 0 || parseInt(that.adminAddN1) < 0 || parseInt(that.adminAddN2) < 0 || parseInt(that.adminLeaveN1) < 0 || parseInt(that.adminLeaveN2) < 0 || parseInt(that.adminDAddN1) <
                0 || parseInt(that.adminDAddN2) < 0 || parseInt(that.adminDLeaveN) < 0 || parseInt(that.adminAddT) < 0 || parseInt(that.adminLeaveT) < 0) {
                that.addTips = '所有数字项请填入非负整数';
                setTimeout(function() {
                    that.addTips = '';
                }, 2000);
            } else if (parseInt(that.adminAddN2) < parseInt(that.adminAddN1) || parseInt(that.adminLeaveN2) < parseInt(that.adminLeaveN1) || parseInt(that.adminDAddN2) < parseInt(that.adminDAddN1)) {
                that.addTips = '包含两项的第二项不得小于第一项';
                setTimeout(function() {
                    that.addTips = '';
                }, 2000);
            } else if (isNaN(parseInt(that.adminDAddT)) || isNaN(parseInt(that.adminDLeaveT)) || isNaN(parseInt(that.adminAddN1)) || isNaN(parseInt(that.adminAddN2)) || isNaN(parseInt(that.adminLeaveN1)) || isNaN(parseInt(that.adminLeaveN2)) ||
                isNaN(parseInt(that.adminDAddN1)) || isNaN(parseInt(that.adminDAddN2)) || isNaN(parseInt(that.adminDLeaveN)) || isNaN(parseInt(that.adminAddT)) || isNaN(parseInt(that.adminLeaveT)) || isNaN(parseInt(that.adminSpeak)) || isNaN(
                    parseInt(that.adminGood))) {
                that.addTips = '所有数字项请填入非负整数';
                setTimeout(function() {
                    that.addTips = '';
                }, 2000);
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/robotrule/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "name": that.adminName,
                        "is_leave": that.adminLeave,
                        "df_join_time_range": parseInt(that.adminDAddT),
                        "df_leave_time_range": parseInt(that.adminDLeaveT),
                        "df_join_num_range": parseInt(that.adminDAddN1) + ',' + parseInt(that.adminDAddN2),
                        "df_leave_num_range": parseInt(that.adminDLeaveN),
                        "join_num_range": parseInt(that.adminAddN1) + ',' + parseInt(that.adminAddN2),
                        "join_time_range": parseInt(that.adminAddT),
                        "leave_num_range": parseInt(that.adminLeaveN1) + ',' + parseInt(that.adminLeaveN2),
                        "leave_time_range": parseInt(that.adminLeaveT),
                        "send_random_rate": parseInt(that.adminSpeak),
                        "zan_rate": parseInt(that.adminGood),
                    },
                    success: function(data) {
                        if (data.returncode == '301') {
                            that.addTips = '请输入正确的参数';
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
                url: this.$store.state.rootUrl3 + '/robotrule/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.adminL = [];
                        // console.log(data);
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
                            // console.log(maxPage);
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


        resetUpdate(id, name, df_join_time_range, df_join_num_range, df_leave_time_range, df_leave_num_range, join_num_range, join_time_range, leave_num_range, leave_time_range, send_random_rate, zan_rate, is_leave) {
            this.adminUpID = id;
            this.adminName = name;
            this.adminLeave = is_leave;
            this.adminDAddT = df_join_time_range;
            this.adminDLeaveT = df_leave_time_range;
            this.adminAddN1 = join_num_range.split(',')[0];
            this.adminAddN2 = join_num_range.split(',')[1];
            this.adminLeaveN1 = leave_num_range.split(',')[0];
            this.adminLeaveN2 = leave_num_range.split(',')[1];
            this.adminSpeak = send_random_rate;
            this.adminGood = zan_rate;
            this.adminDAddN1 = df_join_num_range.split(',')[0];
            this.adminDAddN2 = df_join_num_range.split(',')[1];
            this.adminDLeaveN = df_leave_num_range;
            this.adminAddT = join_time_range;
            this.adminLeaveT = leave_time_range;
            // this.upTips1 = '';
            // this.upTips2 = '';
            this.addTips2 = '';
            this.addTips2 = '';

        },



        update() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            if (that.adminName === '' || that.adminLeave === '' || that.adminDAddT === '' || that.adminDLeaveT === '' || that.adminAddN1 === '' || that.adminAddN2 === '' || that.adminLeaveN1 === '' || that.adminLeaveN2 === '' || that.adminSpeak ===
                '' || that.adminGood === '' || that.adminDAddN1 === '' || that.adminDAddN2 === '' || that.adminDLeaveN === '' || that.adminAddT === '' || that.adminLeaveT === '') {
                this.addTips = '请把信息补充完整';
                setTimeout(function() {
                    that.addTips = '';
                }, 2000);
            } else if (parseInt(that.adminSpeak) > 99 || parseInt(that.adminSpeak) < 0 || parseInt(that.adminGood) > 99 || parseInt(that.adminSGood) < 0) {
                that.addTips = '发言几率和点赞几率必须在0-99之间';
                setTimeout(function() {
                    that.addTips = '';
                }, 2000);
            } else if (parseInt(that.adminDAddT) < 0 || parseInt(that.adminDLeaveT) < 0 || parseInt(that.adminAddN1) < 0 || parseInt(that.adminAddN2) < 0 || parseInt(that.adminLeaveN1) < 0 || parseInt(that.adminLeaveN2) < 0 || parseInt(that.adminDAddN1) <
                0 || parseInt(that.adminDAddN2) < 0 || parseInt(that.adminDLeaveN) < 0 || parseInt(that.adminAddT) < 0 || parseInt(that.adminLeaveT) < 0) {
                that.addTips = '所有数字项请填入非负整数';
                setTimeout(function() {
                    that.addTips = '';
                }, 2000);
            } else if (parseInt(that.adminAddN2) < parseInt(that.adminAddN1) || parseInt(that.adminLeaveN2) < parseInt(that.adminLeaveN1) || parseInt(that.adminDAddN2) < parseInt(that.adminDAddN1)) {
                that.addTips = '包含两项的第二项不得小于第一项';
                setTimeout(function() {
                    that.addTips = '';
                }, 2000);
            } else if (isNaN(parseInt(that.adminDAddT)) || isNaN(parseInt(that.adminDLeaveT)) || isNaN(parseInt(that.adminAddN1)) || isNaN(parseInt(that.adminAddN2)) || isNaN(parseInt(that.adminLeaveN1)) || isNaN(parseInt(that.adminLeaveN2)) ||
                isNaN(parseInt(that.adminDAddN1)) || isNaN(parseInt(that.adminDAddN2)) || isNaN(parseInt(that.adminDLeaveN)) || isNaN(parseInt(that.adminAddT)) || isNaN(parseInt(that.adminLeaveT)) || isNaN(parseInt(that.adminSpeak)) || isNaN(
                    parseInt(that.adminGood))) {
                that.addTips = '所有数字项请填入非负整数';
                setTimeout(function() {
                    that.addTips = '';
                }, 2000);
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/robotrule/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "id": that.adminUpID,
                        "name": that.adminName,
                        "is_leave": that.adminLeave,
                        "df_join_time_range": parseInt(that.adminDAddT),
                        "df_leave_time_range": parseInt(that.adminDLeaveT),
                        "df_join_num_range": parseInt(that.adminDAddN1) + ',' + parseInt(that.adminDAddN2),
                        "df_leave_num_range": parseInt(that.adminDLeaveN),
                        "join_num_range": parseInt(that.adminAddN1) + ',' + parseInt(that.adminAddN2),
                        "join_time_range": parseInt(that.adminAddT),
                        "leave_num_range": parseInt(that.adminLeaveN1) + ',' + parseInt(that.adminLeaveN2),
                        "leave_time_range": parseInt(that.adminLeaveT),
                        "send_random_rate": parseInt(that.adminSpeak),
                        "zan_rate": parseInt(that.adminGood),
                    },
                    success: function(data) {
                        if (data.returncode == '301') {
                            that.addTips = '请输入正确的参数';
                        } else if (data.returncode == '200') {
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
        this.$store.dispatch('tabChanger', 10);
        this.$store.dispatch('subChanger', 'sub5');

        // console.log(this.$store.state.tabIndex);
        this.adminList(this.page, this.size);
    }
}
</script>
