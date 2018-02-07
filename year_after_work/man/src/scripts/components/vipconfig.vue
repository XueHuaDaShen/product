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
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增vip</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">animationid (*)</label>
                                <div class="col-sm-10">
                                    <select name="" id="" class="form-control" v-model.trim="addanimationid">
                                        <option value="">请选择动画</option>
                                        <option v-for="animation in animationL" v-bind:value="animation._id">{{ animation.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">icon (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputEmail3" placeholder="icon" v-model.trim="addIcon">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">level</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputEmail3" placeholder="level" v-model.trim="addLevel">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">vipname (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputEmail3" placeholder="vipname" v-model.trim="addVIPname">
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
                        <button type="button" class="btn btn-primary" @click="addVIP">确认</button>
                    </div>
                </div>
            </div>
        </div>



        <div class="AM-topR" style = "float:right; margin-right: .9%; margin-bottom: 25px; width: 35%;">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" style = "width: 38%;" placeholder="请输入vipname" v-model.trim="svipname">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchAdmin" ></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>icon</th>
                <th>level</th>
                <th>vipname</th>
                <th>创建时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td><a data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(admin.icon)" style="color:#777;font-size:24px;cursor:pointer" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                <td>{{admin.level}}</td>
                <td>{{admin.name}}</td>
                <td>{{moment(admin.create_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td><i v-bind:class="admin.enabled == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="changeState(admin.enabled, admin._id)">启用/禁用</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.level, admin.name, admin.icon, admin.animationid)">编辑信息</a></li>
                        </ul>
                    </div>
                </td>
            </tr>

        </tbody>
    </table>
    <div class="modal fade bs-example-modal-lg" id="showImgModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">video</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <div class="col-sm-12">
                                <div class="col-sm-12"style="display: -webkit-box;-webkit-box-pack: center;">
                                    <div class="showImg">
                                        <img :src="showImgUrl" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">url (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="url" v-model.trim="showImgUrl" readOnly>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal">确认</button>
                </div>
            </div>
        </div>
    </div>
    <nav class="AMnav">
        <ul class="pagination">
            <li><a href="javascript:void(0);" @click="pageBegin">Begin</a></li>
            <li><a href="javascript:void(0);" @click="pagePre">&laquo;</a></li>
            <div class="pageL">
                <li v-for="pageN in pageL">
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="vipList(pageN, size)">{{pageN}}</a>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改vip</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">animationid (*)</label>
                            <div class="col-sm-10">
                                <select name="" id="" class="form-control" v-model.trim="animationid">
                                    <option value="">请选择动画</option>
                                    <option v-for="animation in animationL" v-bind:value="animation._id">{{ animation.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">icon (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputEmail3" placeholder="icon" v-model.trim="icon">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">level</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputEmail3" placeholder="level" v-model.trim="level">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">vipname (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputEmail3" placeholder="vipname" v-model.trim="name">
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
const moment = require('moment');
export default {
    data() {
        return {
            AMtips1: '',
            AMtips2: '',
            svipname: '',
            addanimationid: '',
            addIcon: '',
            addLevel: '',
            addVIPname: '',
            animationid: '',
            icon: '',
            level: '',
            name: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            adminL: [],
            upTips1: '',
            upTips2: '',
            adminUpID: '',
            moment: moment,
            pageL: [],
            animationL: [],
            showImgUrl: ''
        }
    },

    methods: {
        resetAdd() {
            this.addIcon = '';
            this.addLevel = '';
            this.addVIPname = '';
            this.addanimationid = '';
            this.addTips1 = '';
            this.addTips2 = '';
            this.animationList()
        },
        getImgUrl(url) {
            this.showImgUrl = url||'图片不存在';
        },
        addVIP() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            if( that.addanimationid == '' ){
                this.addTips = '请选择动画';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.addIcon ) {
                this.addTips = '请输入icon';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( that.addLevel === '' ) {
                this.addTips = '请输入level';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( isNaN(that.addLevel) ) {
                this.addTips = '请输入正确的level';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.addVIPname ) {
                this.addTips = '请输入addVIPname';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/vipconfig/create',
                    type: "POST",
                    data: {
                        animationid: that.addanimationid,
                        icon: that.addIcon,
                        name: that.addVIPname,
                        level: that.addLevel
                    },
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#myModal').modal('hide');
                                that.vipList(that.page, that.size);
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addVIP);
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

        vipList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/vipconfig/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "name": that.svipname
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.adminL = [];
                        that.adminL = data.data.data;
                        if (page > data.data.totalPageNum) {
                            that.vipList(data.data.totalPageNum, that.size);
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
                            that.vipList(that.page, that.size)
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
                    url: that.$store.state.rootUrl3 + '/vipconfig/disable',
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
                            that.vipList(that.page, that.size);
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
                    url: that.$store.state.rootUrl3 + '/vipconfig/enable',
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
                            that.vipList(that.page, that.size);
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
            }
        },
        animationList() {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/animation/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": 1,
                    "size": 999
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.animationL = data.data.data;
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.animationList);
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
        searchAdmin() {
            const that = this;
            that.page = 1;
            that.vipList(that.page, that.size);
        },

        resetUpdate(id, level, name, icon, animationid) {
            this.adminUpID = id;
            this.level = level;
            this.name = name;
            this.icon = icon;
            this.animationid = animationid;
            this.addTips1 = '';
            this.addTips2 = '';
            this.animationList();
        },



        update() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            var startT = [that.vipStartYMD, that.vipStartHMS].join(" ");
            var stopT = [that.vipStopYMD, that.vipStopHMS].join(" ");
            if( that.animationid == '' ){
                this.addTips = '请选择动画';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.icon ) {
                this.addTips = '请输入icon';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( that.level === '' ) {
                this.addTips = '请输入level';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( isNaN(that.level) ) {
                this.addTips = '请输入正确的level';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else if ( !that.name ) {
                this.addTips = '请输入addVIPname';
                setTimeout(function() {
                    that.addTips = '';
                }, 500);
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/vipconfig/update',
                    type: "POST",
                    data: {
                        id: that.adminUpID,
                        animationid: that.animationid,
                        icon: that.icon,
                        name: that.name,
                        level: that.level
                    },
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#updateModal').modal('hide');
                                that.vipList(that.page, that.size);
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
        },



        pageBegin() {
            const that = this;
            that.page = 1;
            that.vipList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.vipList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.vipList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.vipList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 26);
        this.$store.dispatch('subChanger', 'sub5');

        this.vipList(this.page, this.size);
    }
}
</script>
