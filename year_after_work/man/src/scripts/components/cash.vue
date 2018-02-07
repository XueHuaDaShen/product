<template id="">
<div class="">
    <div class="AM-top" style="margin-top: 10px;">
        <span class="AM-tips1" style="left:0;top: 52px;">{{AMtips1}}</span>
        <span class="AM-tips2" style="top: 52px;">{{AMtips2}}</span>
        <div class="AM-topInfo per" style="-webkit-box-pack:end;padding-right:10%">
            <button type="button" style="margin-right:20px;" class="btn btn-primary" @click="_export(page, size)">导出</button>
            <input type="number" class="form-control record-info" id="exampleInputEmail1" placeholder="pid" v-model.trim = "searchPid">
            <label>Begin：</label>
            <input type="date" class="form-control record-month" style="width: 12%;margin-right:15px;line-height:normal;" id="exampleInputEmail1"
                   v-model.trim="beginTime">
            <label>End：</label>
            <input type="date" class="form-control record-month" style="width: 12%;margin-right:15px;line-height:normal;" id="exampleInputEmail1"
                   v-model.trim="endTime">
            <select class="form-control record-info" style="width:14%" name="" id="exampleInputEmail1" v-model.trim="searchStatus">
                <option value="">Please select status</option>
                <!-- <option value="0">The initial state</option> -->
                <option value="1">New</option>
                <option value="2">Success full</option>
                <option value="4">Failed</option>
            </select>
            <input type="text" class="form-control record-info" id="exampleInputEmail1" placeholder="loginname" v-model.trim = "searchName">
            <!-- <input type="number" class="form-control record-info" id="exampleInputEmail1" placeholder="order_no" v-model.trim = "searchOrder"> -->
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAnchor"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>PID</th>
                <th>Loginname</th>
                <th>Name</th>
                <!-- <th>Email</th> -->
                <th>Bank Account N0.</th>
                <th>Apply</th>
                <th>Type</th>
                <th>Swift</th>
                <th>Create_at</th>
                <th>Update_at</th>
                <th>Status</th>
                <th>Operation</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.pid}}</td>
                <td>{{agent.loginname}}</td>
                <td>{{agent.fullName}}</td>
                <!-- <td>{{agent.email}}</td> -->
                <td>{{agent.card_no}}</td>
                <td>{{ agent.type == 1 ? agent.coins : agent.cash }}</td>
                <td>{{isType(agent.type)}}</td>
                <td>{{agent.swift}}</td>
                <td>{{moment(agent.create_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{moment(agent.update_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{isStatus(agent.status)}}</td>
                <td>
                    <!-- <button v-if="agent.status==0||agent.status==1" type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#updateModal" @click="examFn(agent._id)">
                      Audit
                    </button> -->
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            Select
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <!-- <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="examFn(agent._id)">Audit</a></li> -->
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#detailModal" @click="getDetail(agent.pid, agent.loginname, agent.fullName, agent.idcard, agent.phone, agent.email, agent.swift, agent.card_no, agent.coins, agent.cash, agent.type, agent.message, agent.status)">Detail</a></li>
                        </ul>
                    </div>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">Transfer Result</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Result (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="selector" v-model.trim="newStatus">
                                    <option value="">Please select status</option>
                                    <option value="2">Success full</option>
                                    <option value="4">Failed</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Reworks (*)</label>
                            <div class="col-sm-10">
                                <textarea style="resize:none;" class="form-control" v-model="newMessage" name="" id="" cols="30" rows="10"></textarea>
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="confirmExam">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">Detail</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Pid</label>
                            <div class="col-sm-10">
                                <input type="number" readOnly id="inputEmail1" class="form-control" placeholder="pid" v-model.trim="pid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Loginname</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly id="inputEmail1" class="form-control" placeholder="loginname" v-model.trim="loginname">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly id="inputEmail1" class="form-control" placeholder="Name" v-model.trim="name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">ID Card NO.</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly id="inputEmail1" class="form-control" placeholder="ID Card" v-model.trim="idcard">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Phone NO.</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly id="inputEmail1" class="form-control" placeholder="Phone" v-model.trim="phone">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly id="inputEmail1" class="form-control" placeholder="Email" v-model.trim="email">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Bank Name</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly id="inputEmail1" class="form-control" placeholder="Bank Name" v-model.trim="bankName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Bank Account NO.</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly id="inputEmail1" class="form-control" placeholder="Bank Account NO." v-model.trim="bankNum">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Apply</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly id="inputEmail1" class="form-control" placeholder="Apply" v-model.trim="apply">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Transfer Amount</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly id="inputEmail1" class="form-control" placeholder="Transfer Amount" v-model.trim="transfer">
                            </div>
                        </div>
                        <div class="form-group" v-if="status != 1 && status != 0">
                            <label class="col-sm-2 control-label">Process Result</label>
                            <div class="col-sm-10">
                                <select class="form-control" disabled name="" id="selector" v-model.trim="status">
                                    <option value="">Please select status</option>
                                    <option value="0">The initial state</option>
                                    <option value="1">New</option>
                                    <option value="2">Success full</option>
                                    <option value="4">Failed</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="status != 1 && status != 0">
                            <label class="col-sm-2 control-label">Reworks</label>
                            <div class="col-sm-10">
                                <textarea readOnly style="resize:none;" class="form-control" v-model="message" name="" id="" cols="30" rows="10"></textarea>
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Confirm</button>
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
            agentL: [],
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
            beginTime: '',
            endTime: '',

            updateId: "",
            newMessage: "",
            newStatus: "",

            pid: '',
            loginname: '',
            name: '',
            idcard: '',
            phone: '',
            email: '',
            bankName: '',
            bankNum: '',
            apply: '',
            transfer: '',
            status: '',
            message: '',

            searchStatus: '',
            searchName: '',
            searchOrder: '',
            searchPid: '',
        }
    },

    methods: {
        paylogList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/cash/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "pageNum": page,
                    "pageSize": size,
                    "status": that.searchStatus,
                    "loginname": that.searchName,
                    "order_no": that.searchOrder,
                    "start_at": that.beginTime,
                    "stop_at": that.endTime,
                    "pid": that.searchPid
                },
                success: function(data){
                    let code = data.returncode;
                    console.log(data);
                    if(code == 200){
                        that.agentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPage) {
                            that.paylogList(data.data.totalPage, size);
                            return false;
                        } else if (page <= 0) {
                            return false;
                        } else {
                            that.page = page;
                            that.pageL = [];
                            let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                            let maxPage = Math.min(data.data.totalPage, Math.ceil(page / 5) * 5);
                            // console.log(maxPage);
                            for (let i = pageStart; i <= maxPage; i++) {
                                that.pageL.push(i);
                            }
                            that.AMtips1 = 'The request is successful';;
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }
                    } else if (code == '301') {
                        console.log('Parameter error');
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
        getDetail(pid, loginname, fullName, idcard, phone, email, swift, card_no, coins, cash, type, message, status) {
            this.pid = pid;
            this.loginname = loginname;
            this.name = fullName;
            this.idcard = idcard;
            this.phone = phone;
            this.email = email;
            this.bankName = swift;
            this.bankNum = card_no;
            this.apply = type==1? coins + ' Fishball' : cash + ' THB';
            this.transfer = (cash||0) + ' THB';
            this.status = status;
            this.message = message;
        },
        examFn(id) {

            const that = this;
            this.upTips1 = '';
            this.upTips2 = '';
            this.updateId = id;
            this.newMessage = '';
            this.newStatus = '';

        },
        confirmExam() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.newMessage == '') {
                that.upTips1 = 'Please fill in the audit information.';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.newStatus == '') {
                that.upTips1 = 'Please select audit status.';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/cash/review',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    dataType: 'json',
                    data: {
                        "_id": that.updateId,
                        "message": that.newMessage,
                        "status": that.newStatus
                    },
                    success: function(data) {
                        let r_code = data.returncode;
                        if(r_code == '200') {
                            that.upTips1 = '';
                            that.upTips2 = 'Operation is successful';
                            that.paylogList(that.page, that.size)
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (r_code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        } else if (r_code == '302') {
                            that.upTips1 = 'Server error';
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
        getCc() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/cash/getarea',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "get",
                success: function(data) {
                    // console.log(data)
                    if (data.returncode == '200') {
                        that.cc = data.data.cc;
                        that.paylogList(that.page, that.size)
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.getCc);
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
        _export(page, size) {
            const that = this;
            var url = that.$store.state.rootUrl3 + '/cash/list';
            var data = "pid=" + that.searchPid + "&loginname=" + that.searchName + "&start_at=" + that.beginTime + "&stop_at=" + that.endTime + "&status=" + that.searchStatus + "&isexport=1" + "&cc="+that.cc;
            window.location = url + "?" + data;
        },
        isType(type) {
            switch(type){
                case 0: return 'THB';
                case 1: return 'Fishball';
                case 2: return 'THB';
            }
        },
        isStatus(status){
            switch(status){
                case 0: return 'The initial state';
                case 1: return 'New';
                case 2: return 'Success full';
                case 4: return 'Failed';
            }
            // switch(status){
            //     case 0: return '初始状态';
            //     case 1: return '金币扣除';
            //     case 2: return '处理完成';
            //     case 4: return '处理出错';
            // }
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
        this.$store.dispatch('tabChanger', 65);
        this.$store.dispatch('subChanger', 'sub3');

        this.getCc();
        // console.log(this.$store.state.tabIndex);
        // this.adminList(this.page, this.size, this.name);
    }
}
</script>
