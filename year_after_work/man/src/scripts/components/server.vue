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
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增服务器</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">ip (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputEmail3" placeholder="ip" v-model.trim="addip">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">port (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputEmail3" placeholder="port" v-model.trim="addport">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">type</label>
                                <div class="col-sm-10">
                                    <select name="" id="exampleInputEmail1" class="form-control" v-model.trim="addtype">
                                        <option value="">请选择类型</option>
                                        <option value="1">api</option>
                                        <option value="2">长连接</option>
                                        <option value="3">https</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">zone (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputEmail3" placeholder="zone" v-model.trim="addzone">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">weight (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputEmail3" placeholder="weight" v-model.trim="addweight">
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
                        <button type="button" class="btn btn-primary" @click="addServer">确认</button>
                    </div>
                </div>
            </div>
        </div>



        <div class="AM-topR" style = "float:right; margin-right: .9%; margin-bottom: 25px; width: 35%;">
            <select name="" id="exampleInputEmail1" class="form-control AM-search" v-model.trim="stype" style = "width: 38%;" >
                <option value="">请选择类型</option>
                <option value="1">api</option>
                <option value="2">长连接</option>
                <option value="3">https</option>
            </select>
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchServer"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>ip</th>
                <th>port</th>
                <th>type</th>
                <th>zone</th>
                <th>weight</th>
                <th>创建时间</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td>{{admin.ip}}</td>
                <td>{{admin.port}}</td>
                <td>{{ getType(admin.type) }}</td>
                <td>{{admin.zone}}</td>
                <td>{{admin.weight}}</td>
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
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.ip, admin.port, admin.type, admin.zone, admin.weight)">编辑信息</a></li>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="serverList(pageN, size)">{{pageN}}</a>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改服务器</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">ip (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputEmail3" placeholder="ip" v-model.trim="ip">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">port (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputEmail3" placeholder="port" v-model.trim="port">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">type</label>
                            <div class="col-sm-10">
                                <select name="" id="exampleInputEmail1" class="form-control" v-model.trim="type">
                                    <option value="">请选择类型</option>
                                    <option value="1">api</option>
                                    <option value="2">长连接</option>
                                    <option value="3">https</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">zone (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputEmail3" placeholder="zone" v-model.trim="zone">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">weight (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inputEmail3" placeholder="weight" v-model.trim="weight">
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
var testIP = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/
export default {
    data() {
        return {
            AMtips1: '',
            AMtips2: '',
            spid: '',
            addip: '',
            addport: '',
            addtype: '',
            addzone: '',
            addweight: '',
            ip: '',
            port: '',
            type: '',
            zone: '',
            weight: '',
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
            country: "",
            stype: '',
        }
    },

    methods: {
        resetAdd() {
            this.addip = '';
            this.addport = '';
            this.addtype = '';
            this.addzone = '';
            this.addweight = '';
            this.addTips1 = '';
            this.addTips2 = '';
        },
        addServer() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            if ( !that.addip ) {
                this.addTips = '请输入ip';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( !testIP.test( that.addip ) ) {
                this.addTips = '请输入正确的ip';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( that.addport === '' ) {
                this.addTips = '请输入port';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( isNaN(that.addport) ) {
                this.addTips = '请输入正确的port';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( !that.addtype ) {
                this.addTips = '请输入type';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( !that.addzone ) {
                this.addTips = '请输入addzone';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( !that.addweight ) {
                this.addTips = '请输入addweight';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/server/create',
                    type: "POST",
                    data: {
                        ip: that.addip,
                        port: that.addport,
                        zone: that.addzone,
                        type: that.addtype,
                        weight: that.addweight
                    },
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#myModal').modal('hide');
                                that.serverList(that.page, that.size);
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addServer);
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

        serverList(page, size) {
            const that = this;
            // console.log(this.stype)
            $.ajax({
                url: this.$store.state.rootUrl3 + '/server/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                    "type": that.stype
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.adminL = [];
                        that.adminL = data.data.data;
                        if (page > data.data.totalPageNum) {
                            that.serverList(data.data.totalPageNum, that.size);
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
                            that.serverList(that.page, that.size)
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
                    url: that.$store.state.rootUrl3 + '/server/disable',
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
                            that.serverList(that.page, that.size);
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
                    url: that.$store.state.rootUrl3 + '/server/enable',
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
                            that.serverList(that.page, that.size);
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

        searchServer() {
            const that = this;
            that.page = 1;
            that.serverList(that.page, that.size);
        },

        resetUpdate(id, ip, port, type, zone, weight) {
            this.adminUpID = id;
            this.ip = ip;
            this.port = port;
            this.type = type;
            this.zone = zone;
            this.weight = weight;
            this.addTips1 = '';
            this.addTips2 = '';
        },



        update() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            var startT = [that.vipStartYMD, that.vipStartHMS].join(" ");
            var stopT = [that.vipStopYMD, that.vipStopHMS].join(" ");
            if ( !that.ip ){
                this.addTips = '请输入ip';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( !testIP.test( that.ip ) ) {
                this.addTips = '请输入正确的ip';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( that.port === '' ) {
                this.addTips = '请输入port';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( isNaN(that.port) ) {
                this.addTips = '请输入正确的port';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( !that.type ) {
                this.addTips = '请输入type';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( !that.zone ) {
                this.addTips = '请输入zone';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else if ( that.weight === '' ) {
                this.addTips = '请输入weight';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/server/update',
                    type: "POST",
                    data: {
                        id: that.adminUpID,
                        ip: that.ip,
                        type: that.type,
                        zone: that.zone,
                        port: that.port,
                        weight: that.weight
                    },
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#updateModal').modal('hide');
                                that.serverList(that.page, that.size);
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

        getType(type) {
            var txt = '';
            if( type == 1 ){
                txt = 'api'
            }else if( type == 2 ){
                txt = '长连接'
            }else if( type == 3 ){
                txt = 'https'
            }
            return txt;
        },

        pageBegin() {
            const that = this;
            that.page = 1;
            that.serverList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.serverList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.serverList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.serverList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 16);
        this.$store.dispatch('subChanger', 'sub9');

        this.serverList(this.page, this.size);
    }
}
</script>
