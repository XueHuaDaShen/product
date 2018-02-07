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
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增抽奖</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">name (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="name" v-model.trim="newname">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">type (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model.trim="newtype">
                                        <option value="">请选择类型</option>
                                        <option value="1">领券</option>
                                        <option value="2">抽奖</option>
                                    </select>
                                </div>
                            </div>
                            <!-- <div class="form-group">
                                <label class="col-sm-2 control-label">unit (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model.trim="newunit">
                                        <option value="">请选择类型</option>
                                        <option value="1"></option>
                                        <option value="2">ticket</option>
                                        <option value="3"></option>
                                    </select>
                                </div>
                            </div> -->
                            <div class="form-group">
                                <label class="col-sm-2 control-label">award (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" placeholder="award" v-model.trim="newaward">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">cost (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" placeholder="cost" v-model.trim="newcost">
                                </div>
                            </div>
                            <div class="form-group" v-show="newtype==2">
                                <label class="col-sm-2 control-label">num_of_lottery (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" placeholder="num_of_lottery" v-model.trim="newnum_of_lottery=newtype=='1'?0:newnum_of_lottery">
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
                <th>name</th>
                <th>type</th>
                <th>unit</th>
                <th>award</th>
                <th>cost</th>
                <th>num_of_lottery</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.name}}</td>
                <td>{{is_type(admin.type)}}</td>
                <td>{{is_unit(admin.unit)}}</td>
                <td>{{admin.award}}</td>
                <td>{{admin.cost}}</td>
                <td>{{admin.num_of_lottery}}</td>
                <td>{{is_status(admin.status)}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="changeState(admin.status, admin._id)">开始/结束</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.name,admin.type, admin.unit, admin.award, admin.cost, admin.num_of_lottery)">编辑信息</a></li>
                            <li><a href="javascript: void(0)" @click="draw(admin._id)">抽奖</a></li>
                            <li><a href="javascript: void(0)" @click="winning(admin._id)">中奖列表</a></li>
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
                            <label class="col-sm-2 control-label">name (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="name" v-model.trim="name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">type (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="type">
                                    <option value="">请选择类型</option>
                                    <option value="1">领券</option>
                                    <option value="2">抽奖</option>
                                </select>
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">unit (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="unit">
                                    <option value="">请选择类型</option>
                                    <option value="1"></option>
                                    <option value="2">ticket</option>
                                    <option value="3"></option>
                                </select>
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label class="col-sm-2 control-label">award (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="award" v-model.trim="award">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">cost (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="cost" v-model.trim="cost">
                            </div>
                        </div>
                        <div class="form-group" v-show="type==2">
                            <label class="col-sm-2 control-label">num_of_lottery (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="num_of_lottery" v-model.trim="num_of_lottery=type=='1'?0:num_of_lottery">
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

    <!-- <div class="modal fade bs-example-modal-lg" id="delModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                    <button type="button" class="btn btn-primary" data-dismiss="modal">确认</button>
                </div>
            </div>
        </div>
    </div> -->


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
            type: '',
            name: '',
            award: '',
            cost: '',
            unit: 2,
            num_of_lottery: '',
            liveID: '',
            newtype: '',
            newname: '',
            newaward: '',
            newcost: '',
            newunit: 2,
            newnum_of_lottery: '',
            // delID: '',
            // delPid: '',
            // delN: '',
            // searchname: '',
            liveList: []
        }
    },

    methods: {

        resetAdd() {
            this.addTips = '';
            this.addTips2 = '';
            this.newname = '';
            this.newtype = '';
            this.newaward = '';
            this.newcost = '';
            this.newnum_of_lottery = '';
        },

        addAdmin() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            if (that.newname === '' || that.newtype === '' || that.newaward === '' || that.newcost === '') {
                this.addTips = '请把信息补充完整';
                setTimeout(function() {
                    that.addTips = ''
                }, 1000)
            } else if(that.newtype == '2' && that.newnum_of_lottery === '') {
                this.addTips = '请把信息补充完整';
                setTimeout(function() {
                    that.addTips = ''
                }, 1000)
            } else if ( that.newaward < 0 ) {
                this.addATips = 'award为正值';
                setTimeout(function() {
                    that.addATips = '';
                }, 1000);
                return false;
            } else if ( that.newcost < 0 ) {
                this.addATips = 'cost为正值';
                setTimeout(function() {
                    that.addATips = '';
                }, 1000);
                return false;
            } else if ( that.newnum_of_lottery < 1 ) {
                this.addATips = 'num_of_lottery必须大于0';
                setTimeout(function() {
                    that.addATips = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/lottery/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "name": that.newname,
                        "type": that.newtype,
                        "unit": that.newunit,
                        "award": that.newaward,
                        "cost": that.newcost,
                        "num_of_lottery": that.newnum_of_lottery
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
                url: this.$store.state.rootUrl3 + '/lottery/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size
                },
                success: function(data) {
                    console.log(data)
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

        resetUpdate(id, name, type, unit, award, cost, num_of_lottery) {
            this.adminUpID = id;
            this.name = name;
            this.type = type;
            // this.unit = unit;
            this.award = award;
            this.cost = cost;
            this.num_of_lottery = num_of_lottery;
            this.upTips1 = '';
            this.upTips2 = '';
        },

        draw(id) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/lottery/draw',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "lotteryid": id
                },
                success: function(data){
                    let code = data.returncode;
                    console.log(data)
                    if(code == 200){
                        that.AMtips1 = '';
                        that.AMtips1 = '发送成功';
                        setTimeout(function() {
                            that.adminList(that.page, that.size);
                        }, 1000);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.delAc);
                    } else if (code == '304') {
                        that.AMtips2 = '活动不存在';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
                    } else if (code == '305') {
                        that.AMtips2 = '重复提交';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
                    } else if (code == '306') {
                        that.AMtips2 = '活动已结束或尚未开始';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
                    } else if (code == '307') {
                        that.AMtips2 = '抽奖次数已用尽';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
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

        winning(id) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/lottery/winner/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "get",
                data: {
                    "id": id
                },
                success: function(data){
                    let code = data.returncode;
                    console.log(data)
                    // if(code == 200){
                    //     that.AMtips1 = '';
                    //     that.AMtips1 = '发送成功';
                    //     setTimeout(function() {
                    //         that.adminList(that.page, that.size);
                    //     }, 1000);
                    // } else if (code == '301') {
                    //     console.log('参数错误');
                    // } else if (code == '104') {
                    //     utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.delAc);
                    // } else if (code == '106'|| code == '102' || code == '103') {
                    //     utils.loginAgain(that);
                    // } else if (code == '304') {
                    //     that.AMtips2 = '未找到红包';
                    //     setTimeout(function() {
                    //         that.AMtips2 = '';
                    //     }, 2000);
                    // } else if (code == '305') {
                    //     that.AMtips2 = '红包已经发过';
                    //     setTimeout(function() {
                    //         that.AMtips2 = '';
                    //     }, 2000);
                    // } else if (code == '306') {
                    //     that.AMtips2 = '直播房间不存在';
                    //     setTimeout(function() {
                    //         that.AMtips2 = '';
                    //     }, 2000);
                    // } else if (code == '307') {
                    //     that.AMtips2 = '直播已结束';
                    //     setTimeout(function() {
                    //         that.AMtips2 = '';
                    //     }, 2000);
                    // }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
        },

        update() {
            const that = this;
            if (that.name === '' || that.type === '' || that.award === '' || that.cost === '') {
                this.upTips1 = '请把信息补充完整';
                setTimeout(function() {
                    that.upTips1 = ''
                }, 1000)
            } else if(that.type == '2' && that.num_of_lottery === '') {
                this.addTips = '请把信息补充完整';
                setTimeout(function() {
                    that.addTips = ''
                }, 1000)
            } else if ( that.award < 0 ) {
                this.addATips = 'award为正值';
                setTimeout(function() {
                    that.addATips = '';
                }, 1000);
                return false;
            } else if ( that.cost < 0 ) {
                this.addATips = 'cost为正值';
                setTimeout(function() {
                    that.addATips = '';
                }, 1000);
                return false;
            } else if ( that.num_of_lottery < 1 ) {
                this.addATips = 'num_of_lottery必须大于0';
                setTimeout(function() {
                    that.addATips = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/lottery/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "id": that.adminUpID,
                        "name": that.name,
                        "type": that.type,
                        "unit": that.unit,
                        "award": that.award,
                        "cost": that.cost,
                        "num_of_lottery": that.num_of_lottery
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

        is_unit(unit) {
            switch(unit){
                // case 0:
                //     return "初始化";
                //     break;
                // case 1:
                //     return "已发";
                //     break;
                case 2:
                    return "ticket";
                    break;
            }
        },
        is_type(type) {
            switch(type){
                case '1':
                    return "领票";
                    break;
                case '2':
                    return "抽奖";
                    break;
            }
        },

        is_status(status) {
            switch(status){
                case 0:
                    return "初始化";
                    break;
                case 1:
                    return "开始";
                    break;
                case 2:
                    return "已结束";
                    break;
            }
        },

        changeState(initForbidState, id) {
            const that = this;
            that.AMtips1 = '';
            that.AMtips2 = '';
            if (initForbidState == 1) {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/lottery/stop',
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
            } else if(initForbidState == 0) {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/lottery/start',
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
                        } else if (data.returncode == '305') {
                            that.AMtips2 = '活动已开始或已结束';
                            setTimeout(function() {
                                that.AMtips2 = '';
                            }, 2000);
                        } else if (data.returncode == '306') {
                            that.AMtips2 = '当前已有抽奖活动正在进行';
                            setTimeout(function() {
                                that.AMtips2 = '';
                            }, 2000);
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
        this.$store.dispatch('tabChanger', 41);
        this.$store.dispatch('subChanger', 'sub5');

        // console.log(this.$store.state.tabIndex);
        this.adminList(this.page, this.size);
    }
}
</script>
