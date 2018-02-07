<template id="">
<div class="">
    <div class="AM-top" style="text-align:left; margin-top: 10px;">
        <button type="button" class="btn btn-primary AM-add" data-toggle="modal" data-target="#myModal" @click="resetAdd" style="margin-left: 0">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <!-- Modal -->
        <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增banner</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">文字信息 (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control"  placeholder="文字信息" v-model.trim="adminAdd1">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">图片地址 (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="图片地址" v-model.trim="adminAdd2">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">链接地址 (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="链接地址" v-model.trim="adminAdd3">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">类型 (*)</label>
                                <div class="col-sm-10">
                                    <select class="form-control" v-model.trim="type">
                                        <option value="">请选择类型</option>
                                        <option value="1">活动图</option>
                                        <option value="2">启动图</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" v-if="type==2">
                                <label class="col-sm-2 control-label">倒计时 (*)</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" placeholder="倒计时" v-model.trim="countDown">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">顺序 (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="顺序" v-model.trim="adminAdd4">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label hasMR">方式 (*)</label>
                                <select class="form-control acName col-sm-10" v-model="adminAdd5">
                                    <option>
                                        web
                                    </option>
                                    <option>
                                        user_profile
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">PID (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="PID" v-model.trim="adminAdd6">
                                </div>
                            </div>
                            <div class="form-group rolelist">
                                <label class="col-sm-2 control-label">国家(*)</label>
                                <div class="col-sm-10" style="text-align:left">
                                    <label class="adminrole">
                                        <input type="checkbox" value="ALL" v-model.trim="newcc" @click="newcheckbox">
                                        全部
                                    </label>
                                    <label class="adminrole">   
                                        <input type="checkbox" value="TH" v-model.trim="newcc">
                                        泰国
                                    </label>
                                    <label class="adminrole">
                                        <input type="checkbox" value="KH" v-model.trim="newcc">
                                        柬埔寨
                                    </label>
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
    <table class="table table-striped table-hover AM-table" style = "table-layout: fixed">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>文字信息</th>
                <th>图片地址</th>
                <th>链接地址</th>
                <th>顺序</th>
                <th>方式</th>
                <th>PID</th>
                <th>国家</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.content}}</td>
                <td style="overflow: hidden"><a data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(admin.img)" style="color:#777;font-size:24px;cursor: pointer" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                <td><a style="color:#777;font-size:24px" target="_blank" data-toggle='modal' data-target="#showHTMLModal" @click="getHTMLurl(admin.url)"><i class="fa fa-external-link-square" aria-hidden="true"></i></a></td>
                <td>{{admin.seq}}</td>
                <td>{{admin.action}}</td>
                <td>{{admin.pid}}</td>
                <td>{{admin.cc.join(",")}}</td>
                <td><i v-bind:class="admin.is_forbid == 0 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="changeState(admin.is_forbid, admin._id)">启用/禁用</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.content, admin.img, admin.url,admin.seq, admin.action, admin.pid, admin.cc, admin.type, admin.count_down)">编辑信息</a></li>
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
    <div class="modal fade bs-example-modal-lg" id="showHTMLModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                                        <iframe :src="showHTMLUrl" frameborder="0"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">url (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="url" v-model.trim="showHTMLUrl" readOnly>
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
    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改信息</h4>
                </div>
                <div class="modal-body">
                    <div class="hideM">
                        {{adminUpID}}
                    </div>
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">文字信息 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control"  placeholder="文字信息" v-model.trim="adminUp1">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">图片地址 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="图片地址" v-model.trim="adminUp2">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">链接地址 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="链接地址" v-model.trim="adminUp3">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">类型 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newType">
                                    <option value="">请选择类型</option>
                                    <option value="1">活动图</option>
                                    <option value="2">启动图</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="newType==2">
                            <label class="col-sm-2 control-label">倒计时 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="倒计时" v-model.trim="newCountDown">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">顺序 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="顺序" v-model.trim="adminUp4">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label hasMR">方式 (*)</label>
                            <select class="form-control acName col-sm-10" v-model="adminUp5">
                              <option>
                                  web
                              </option>
                              <option>
                                  user_profile
                              </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">PID (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="PID" v-model.trim="adminUp6">
                            </div>
                        </div>
                        <div class="form-group rolelist">
                            <label class="col-sm-2 control-label">国家(*)</label>
                            <div class="col-sm-10" style="text-align:left">
                                <label class="adminrole">
                                    <input type="checkbox" value="ALL" v-model.trim="cc" @click="checkAll()">
                                    全部
                                </label>
                                <label class="adminrole">
                                    <input type="checkbox" value="TH" v-model.trim="cc">
                                    泰国
                                </label>
                                <label class="adminrole">
                                    <input type="checkbox" value="KH" v-model.trim="cc">
                                    柬埔寨
                                </label>
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
            upTips1: '',
            upTips2: '',
            adminUpID: '',
            adminUp1: '',
            adminUp2: '',
            adminUp3: '',
            adminUp4: '',
            adminUp5: '',
            adminUp6: '',
            pageL: [],
            name: '',
            adminAdd1: '',
            adminAdd2: '',
            adminAdd3: '',
            adminAdd4: '',
            adminAdd5: '',
            adminAdd6: '',
            cc: [],
            newcc: [],
            pcc: [],
            showImgUrl: '',
            showHTMLUrl: '',

            type: '',
            countDown: '',
            newType: '',
            newCountDown: ''
        }
    },

    methods: {
        resetAdd() {
            this.adminAdd1 = '';
            this.adminAdd2= '';
            this.adminAdd3 = '';
            this.adminAdd4 = '';
            this.adminAdd5 = '';
            this.adminAdd6 = ''
            this.addTips = '';
            this.addTips2 = '';
            this.newcc = [];
            this.pcc = [];
            this.type = '';
            this.countDown = '';
        },
        getImgUrl(url) {
            this.showImgUrl = url||'图片不存在';
        },
        getHTMLurl(url) {
            this.showHTMLUrl = url||'地址不存在';
        },
        addAdmin() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';
            if (that.adminAdd1 === '' || that.adminAdd2 === '' || that.adminAdd3 === '' || that.adminAdd4 === '' || that.adminAdd5 === '' || that.adminAdd6 === '') {
                this.addTips = '请把信息补充完整';
                setTimeout(function() {
                    that.addTips = ''
                }, 1000)
            } else if (isNaN(parseInt(that.adminAdd4)) || isNaN(parseInt(that.adminAdd6))) {
                that.addTips = '顺序和PID请输入正确的数字';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else if( that.type == ''){
                that.addTips = '请选择类型';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else if( that.type == 2 && that.countDown == '' ){
                that.addTips = '请填写倒计时';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else if (that.newcc.length == 0) {
                that.addTips = '请选择至少一个国家';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            }else {
                if( that.newcc.indexOf("ALL") > -1 ){
                    that.pcc = ["ALL"];
                }else{
                    that.pcc = that.newcc;
                }
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/banner/create',
                    type: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: JSON.stringify({
                        "content": that.adminAdd1,
                        "img": that.adminAdd2,
                        "url": that.adminAdd3,
                        "seq": that.adminAdd4,
                        "action": that.adminAdd5,
                        "pid": that.adminAdd6,
                        "cc": that.pcc,
                        "type": that.type,
                        "count_down": that.countDown
                    }),
                    success: function(data) {
                        if (data.returncode == '301') {
                            that.addTips = '参数错误，请重新输入正确的信息';
                        } else if (data.returncode == '200') {
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
                })
            }
        },

        adminList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/banner/list',
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
                            that.adminList(that.page, that.size);
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

        changeState(initForbidState, id) {
            const that = this;
            that.AMtips1 = '';
            that.AMtips2 = '';
            if (initForbidState == 0) {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/banner/disable',
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
                    url: that.$store.state.rootUrl3 + '/banner/enable',
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
            }
        },

        searchAdmin() {
            const that = this;
            that.page = 1;
            that.adminList(that.page, that.size);
        },

        resetUpdate(id, content, img, url, seq, action, pid, cc, type, count_down) {
            this.adminUpID = id;
            this.adminUp1 = content;
            this.adminUp2 = img;
            this.adminUp3 = url;
            this.adminUp4 = seq;
            this.adminUp5 = action;
            this.adminUp6 = pid;
            this.newType = type;
            this.newCountDown = count_down;
            if(cc.indexOf("ALL") > -1){
                this.cc = ["ALL", "TH", "KH"]
            }else{
                this.cc = cc;
            }
            this.pcc = [];
            this.upTips1 = '';
            this.upTips2 = '';
        },



        update() {
            const that = this;
            if (that.adminUp1 === '' || that.adminUp2 === '' || that.adminUp3 === '' || that.adminUp4 === '' || that.adminUp5 === '' || that.adminUp6 === '') {
                this.upTips1 = '请把信息补充完整';
                setTimeout(function() {
                    that.upTips1 = ''
                }, 1000)
            } else if (isNaN(parseInt(that.adminUp4)) || isNaN(parseInt(that.adminUp6))) {
                that.upTips1 = '顺序和PID请输入正确的数字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
            } else if( that.newType == ''){
                that.upTips1 = '请选择类型';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
            } else if( that.newType == 2 && that.newCountDown == '' ){
                that.upTips1 = '请填写倒计时';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
            } else if (that.cc.length == 0) {
                that.upTips1 = '请选择至少一个国家';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
            } else {
                if( that.cc.indexOf("ALL") > -1 ){
                    that.pcc = ["ALL"];
                }else{
                    that.pcc = that.cc;
                }
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/banner/update',
                    type: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: JSON.stringify({
                        "id": that.adminUpID,
                        "content": that.adminUp1,
                        "img": that.adminUp2,
                        "url": that.adminUp3,
                        "seq": that.adminUp4,
                        "action": that.adminUp5,
                        "pid": that.adminUp6,
                        "cc": that.pcc,
                        "type": that.newType,
                        "count_down": that.newCountDown
                    }),
                    success: function(data) {
                        if (data.returncode == '301') {
                            that.upTips = '参数错误，请重新输入正确的信息';
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


        checkAll() {
            if(this.cc.indexOf("ALL")>-1){
                this.cc.push("TH", "KH")
            }else{
                this.cc = [];
            }
        },

        newcheckbox() {
            if(this.newcc.indexOf("ALL")>-1){
                this.newcc.push("TH", "KH")
            }else{
                this.newcc = [];
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
        this.$store.dispatch('tabChanger', 9);
        this.$store.dispatch('subChanger', 'sub4');

        this.adminList(this.page, this.size);
    }
}
</script>
