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
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增红包</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">type (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model.trim="newtype">
                                        <option value="">请选择类型</option>
                                        <option value="1">ticket</option>
                                        <option value="2">diamond</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">name (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="红包名字" v-model.trim="newname">
                                </div>
                            </div>
                            <div v-show="newtype==1">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">红包数量 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="红包数量" v-model.trim="newnumber">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">单个红包金额 (票)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="单个红包金额" v-model.trim="newred_size">
                                    </div>
                                </div>
                            </div>
                            <div v-show="newtype==2">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">红包总金额 (钻石)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="红包总金额" v-model.trim="newamount">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">单个红包最大金额 (钻石)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="单个红包最大金额" v-model.trim="newmax_size">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">红包持续时间 (秒)</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" placeholder="红包持续时间" v-model.trim="newexpire_time">
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
        <!-- <div class="AM-topR" style = "float:right; margin-right: 3.9%; margin-bottom: 25px;">
            <input type="text" class="form-control AM-search"  placeholder="请输入活动名称" v-model.trim="searchname">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAdmin"></i>
        </div> -->


    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>红包类型</th>
                <th>红包名字</th>
                <th>红包数量</th>
                <th>单个红包金额（票）</th>
                <th>红包总金额（钻石）</th>
                <th>单个红包最大金额（钻石）</th>
                <th>红包持续时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.type==1?'ticket':'diamond'}}</td>
                <td>{{admin.name}}</td>
                <td>{{admin.num}}</td>
                <td>{{admin.size}}</td>
                <td>{{admin.amount}}</td>
                <td>{{admin.max_size || 0}}</td>
                <td>{{admin.expire_time}}</td>
                <td>{{is_status(admin.status)}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li v-show="admin.status==0"><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.name, admin.type, admin.num, admin.size, admin.amount, admin.max_size, admin.expire_time)">编辑信息</a></li>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改红包</h4>
                </div>
                <div class="modal-body">
                    <div class="hideM">
                        {{adminUpID}}
                    </div>
                    <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">type (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model.trim="type">
                                        <option value="">请选择类型</option>
                                        <option value="1">ticket</option>
                                        <option value="2">diamond</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">name (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="红包名字" v-model.trim="name">
                                </div>
                            </div>
                            <div v-show="type==1">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">红包数量 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="红包数量" v-model.trim="number">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">单个红包金额 (票)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="单个红包金额" v-model.trim="red_size">
                                    </div>
                                </div>
                            </div>
                            <div v-show="type==2">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">红包总金额 (钻石)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="红包总金额" v-model.trim="amount">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">单个红包最大金额 (钻石)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="单个红包最大金额" v-model.trim="max_size">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">红包持续时间 (秒)</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" placeholder="红包持续时间" v-model.trim="expire_time">
                                </div>
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
            adminUpID: '',
            pageL: [],
            name: '',
            type: '',
            number: '',
            amount: '',
            max_size: '',
            red_size: '',
            expire_time: '',
            liveID: '',
            newtype: '',
            newnumber: '',
            newamount: '',
            newmax_size: '',
            newred_size: '',
            newexpire_time: '',
            newname: '',
            newliveID: '',
            serPID: '',
            is_pid: false,
            liveList: []
        }
    },

    methods: {

        getLiveIDList() {
            const that = this;
            if( that.serPID === '' ){
                this.addTips = '请输入pid';
                setTimeout(function() {
                    that.addTips = ''
                }, 1000)
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/live/list',
                    type: "GET",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "pid": that.serPID
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.liveList = [];
                            that.liveList = data.data.data;
                            if( that.liveList ){
                                that.is_pid = true;
                            }else{
                                that.is_pid = false;
                                that.addTips = "当前用户没有直播";
                                setTimeout(function(){
                                    that.addTips = "";
                                },1000)
                            }
                            
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.getLiveIDList);
                        } else if (data.returncode == '303' ){
                            that.is_pid = false;
                            that.addTips = "pid不存在";
                            setTimeout(function(){
                                that.addTips = "";
                            },1000)
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

        resetAdd() {
            this.addTips = '';
            this.addTips2 = '';
            this.newliveID = '';
            this.newtype = '';
            this.newnumber = '';
            this.newred_size = '';
            this.newamount = '';
            this.newmax_size = '';
            this.newexpire_time = '';
            this.newname = '';
            this.liveList = [];
            this.serPID = '';
            this.is_pid = false;
        },

        addAdmin() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            
            if( that.newtype === '' ){
                this.addTips = '请选择type';
                setTimeout(function() {
                    that.addTips = ''
                }, 1000)
            } else if( that.newtype == 1 ){
                if (that.newnumber === '' || that.newname === '' || that.newred_size === '' || that.newexpire_time === '') {
                    this.addTips = '请把信息补充完整';
                    setTimeout(function() {
                        that.addTips = ''
                    }, 1000)
                } else {
                    $.ajax({
                        url: this.$store.state.rootUrl3 + '/redpacket/create',
                        type: "POST",
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        data: {
                            "type": that.newtype,
                            "name": that.newname,
                            "num": that.newnumber,
                            "size": that.newred_size,
                            "expire_time": that.newexpire_time
                        },
                        success: function(data) {
                            if (data.returncode == '301') {
                                that.addTips = '参数错误';
                                setTimeout(function() {
                                    that.addTips = '';
                                }, 1000);
                            } else if (data.returncode == '200') {
                                that.addTips2 = '操作成功';
                                setTimeout(function() {
                                    $('#myModal').modal('hide');
                                    that.adminList(that.page, that.size);
                                }, 1000);
                            } else if (data.returncode == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addAdmin);
                            } else if (data.returncode == '305') {
                                that.addTips = '请不要重复提交';
                                setTimeout(function() {
                                    that.addTips = '';
                                }, 1000);
                            } else if (data.returncode == '306') {
                                that.addTips = '直播房间不存在';
                                setTimeout(function() {
                                    that.addTips = '';
                                }, 1000);
                            } else if (data.returncode == '307') {
                                that.addTips = '直播已结束';
                                setTimeout(function() {
                                    that.addTips = '';
                                }, 1000);
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
            } else if( that.newtype == 2 ){
                if ( that.newamount === '' || that.newname === '' || that.newmax_size === '' || that.newexpire_time === '') {
                    this.addTips = '请把信息补充完整';
                    setTimeout(function() {
                        that.addTips = ''
                    }, 1000)
                } else if(that.newmax_size >30 ){
                    this.addTips = '单个红包最大金额为30';
                    setTimeout(function() {
                        that.addTips = ''
                    }, 1000)
                } else {
                    $.ajax({
                        url: this.$store.state.rootUrl3 + '/redpacket/create',
                        type: "POST",
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        data: {
                            "type": that.newtype*1,
                            "name": that.newname,
                            "amount": that.newamount,
                            "max_size": that.newmax_size,
                            "expire_time": that.newexpire_time
                        },
                        success: function(data) {
                            if (data.returncode == '301') {
                                that.addTips = '参数错误';
                                setTimeout(function() {
                                    that.addTips = '';
                                }, 1000);
                            } else if (data.returncode == '200') {
                                that.addTips2 = '操作成功';
                                setTimeout(function() {
                                    $('#myModal').modal('hide');
                                    that.adminList(that.page, that.size);
                                }, 1000);
                            } else if (data.returncode == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addAdmin);
                            } else if (data.returncode == '305') {
                                that.addTips = '请不要重复提交';
                                setTimeout(function() {
                                    that.addTips = '';
                                }, 1000);
                            } else if (data.returncode == '306') {
                                that.addTips = '直播房间不存在';
                                setTimeout(function() {
                                    that.addTips = '';
                                }, 1000);
                            } else if (data.returncode == '307') {
                                that.addTips = '直播已结束';
                                setTimeout(function() {
                                    that.addTips = '';
                                }, 1000);
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
            }
            
                
        },

        adminList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/redpacket/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size
                },
                success: function(data) {
                    // console.log(data)
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



        resetUpdate(id, name, type, num, red_size, amount, max_size, expire_time) {
            this.adminUpID = id;
            this.name = name;
            this.type = type;
            this.number = num;
            this.red_size = red_size;
            this.amount = amount;
            this.max_size = max_size;
            this.expire_time = expire_time;
            this.upTips1 = '';
            this.upTips2 = '';
        },

        // sendRed(id) {
        //     const that = this;
        //     $.ajax({
        //         url: that.$store.state.rootUrl3 + '/redpacket/dispatch',
        //         headers: {
        //             "token": localStorage.getItem('A-TOKEN')
        //         },
        //         type: "POST",
        //         data: {
        //             "id": id
        //         },
        //         success: function(data){
        //             let code = data.returncode;
        //             if(code == 200){
        //                 that.AMtips1 = '';
        //                 that.AMtips1 = '发送成功';
        //                 setTimeout(function() {
        //                     that.adminList(that.page, that.size);
        //                 }, 1000);
        //             } else if (code == '301') {
        //                 console.log('参数错误');
        //             } else if (code == '104') {
        //                 utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.delAc);
        //             } else if (code == '304') {
        //                 that.AMtips2 = '未找到红包';
        //                 setTimeout(function() {
        //                     that.AMtips2 = '';
        //                 }, 2000);
        //             } else if (code == '305') {
        //                 that.AMtips2 = '红包已经发过';
        //                 setTimeout(function() {
        //                     that.AMtips2 = '';
        //                 }, 2000);
        //             } else if (code == '306') {
        //                 that.AMtips2 = '直播房间不存在';
        //                 setTimeout(function() {
        //                     that.AMtips2 = '';
        //                 }, 2000);
        //             } else if (code == '307') {
        //                 that.AMtips2 = '直播已结束';
        //                 setTimeout(function() {
        //                     that.AMtips2 = '';
        //                 }, 2000);
        //             } else {
        //                 utils.handleLogOut(data.returncode, that);
        //             }
        //         },
        //         fail: function() {
        //             console.log('Ajax Error');
        //             utils.loginAgain(that);
        //         }

        //     })
        // },

        update() {
            const that = this;
                    console.log(typeof that.type)
            if( that.type === '' ){
                this.upTips1 = '请选择type';
                setTimeout(function() {
                    that.upTips1 = ''
                }, 1000)
            } else if( that.type == 1 ){
                if ( that.number === '' || that.name === '' || that.red_size === '' || that.expire_time === '' ) {
                    this.upTips1 = '请把信息补充完整';
                    setTimeout(function() {
                        that.upTips1 = ''
                    }, 1000)
                } else {
                    $.ajax({
                        url: this.$store.state.rootUrl3 + '/redpacket/update',
                        type: "POST",
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        data: {
                            "id": that.adminUpID,
                            "name": that.name,
                            "type": that.type*1,
                            "num": that.number,
                            "size": that.red_size,
                            "expire_time": that.expire_time
                        },
                        success: function(data) {
                            if (data.returncode == '301') {
                                that.upTips1 = '参数错误';
                                setTimeout(function() {
                                    that.upTips1 = '';
                                }, 1000);
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
                            } else if (data.returncode == '305') {
                                that.upTips1 = '请不要重复提交';
                                setTimeout(function() {
                                    that.upTips1 = '';
                                }, 1000);
                            } else if (data.returncode == '306') {
                                that.upTips1 = '直播房间不存在';
                                setTimeout(function() {
                                    that.upTips1 = '';
                                }, 1000);
                            } else if (data.returncode == '307') {
                                that.upTips1 = '直播已结束';
                                setTimeout(function() {
                                    that.upTips1 = '';
                                }, 1000);
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
            } else if(that.type == 2 ){
                if ( that.amount === '' || that.name === '' || that.max_size === '' || that.expire_time === '' ) {
                    this.upTips1 = '请把信息补充完整';
                    setTimeout(function() {
                        that.upTips1 = ''
                    }, 1000)
                } else if(that.max_size > 30 ){
                    this.upTips1 = '单个红包最大金额为30';
                    setTimeout(function() {
                        that.upTips1 = ''
                    }, 1000)
                } else {
                    $.ajax({
                        url: this.$store.state.rootUrl3 + '/redpacket/update',
                        type: "POST",
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        data: {
                            "id": that.adminUpID,
                            "name": that.name,
                            "type": that.type*1,
                            "amount": that.amount,
                            "max_size": that.max_size,
                            "expire_time": that.expire_time
                        },
                        success: function(data) {
                            if (data.returncode == '301') {
                                that.upTips1 = '参数错误';
                                setTimeout(function() {
                                    that.upTips1 = ''
                                }, 1000)
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
                            } else if (data.returncode == '305') {
                                that.upTips1 = '请不要重复提交';
                                setTimeout(function() {
                                    that.upTips1 = '';
                                }, 1000);
                            } else if (data.returncode == '306') {
                                that.upTips1 = '直播房间不存在';
                                setTimeout(function() {
                                    that.upTips1 = '';
                                }, 1000);
                            } else if (data.returncode == '307') {
                                that.upTips1 = '直播已结束';
                                setTimeout(function() {
                                    that.upTips1 = '';
                                }, 1000);
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
            }
            
        },

        is_status(status) {
            switch(status){
                case 0:
                    return "初始化";
                    break;
                case 1:
                    return "已发";
                    break;
                case 2:
                    return "作废";
                    break;
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
        this.$store.dispatch('tabChanger', 40);
        this.$store.dispatch('subChanger', 'sub4');

        // console.log(this.$store.state.tabIndex);
        this.adminList(this.page, this.size);
    }
}
</script>
