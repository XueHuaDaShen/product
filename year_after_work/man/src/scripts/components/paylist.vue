<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float: left; margin-bottom: 25px;" type="button" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddCode">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <!-- <div class="AM-topR" style = "float: right; margin-right: 3.9%; margin-bottom: 25px;">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" placeholder="code" v-model.trim = "scode">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchCode"></i>
        </div> -->

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>用户等级</th>
                <th>名称</th>
                <th>所属平台</th>
                <th>支付方式代码</th>
                <th>跳转方式</th>
                <th>支付方式图标</th>
                <th>描述</th>
                <th>跳转URL</th>
                <th>支付成功回调地址</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.level}}</td>
                <td>{{agent.name}}</td>
                <td>{{agent.os==null?"":(agent.os==0?"ios":"google")}}</td>
                <td>{{agent.code}}</td>
                <td>{{agent.action==null?"":(agent.action==0?"native":"web")}}</td>
                <td><i data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(agent.icon_url)" style="font-size:24px;cursor: pointer;" class="fa fa-image" aria-hidden="true"></i></td>
                <td>{{agent.desc}}</td>
                <td>{{agent.redirect_url}}</td>
                <td>{{agent.callback_url}}</td>
                <td><i v-bind:class="agent.status == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="changeState(agent.status, agent._id)">启用/禁用</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent._id, agent.level, agent.name, agent.os, agent.code, agent.action, agent.icon_url, agent.desc, agent.redirect_url, agent.callback_url)">编辑</a></li>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="codeList(pageN, size)">{{pageN}}</a>
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
    <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">


                            <label for="inputEmail1" class="col-sm-2 control-label">用户等级</label>


                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="level" v-model.trim="newlevel">
                            </div>
                        </div>
                        <div class="form-group">

                            <label for="inputEmail1" class="col-sm-2 control-label">名称</label>

                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="name" v-model.trim="newname">
                            </div>
                        </div>
                        <div class="form-group">


                            <label for="inputEmail1" class="col-sm-2 control-label">所属平台</label>


                            <div class="col-sm-10">
                                <select class="form-control" name="" v-model.trim="newos">
                                    <option value="">选择os</option>
                                    <option value="0">ios</option>
                                    <option value="1">google</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">


                            <label for="inputEmail1" class="col-sm-2 control-label">支付方式代码</label>


                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="code" v-model.trim="newcode">
                            </div>
                        </div>
                        <div class="form-group">


                            <label for="inputEmail1" class="col-sm-2 control-label">跳转方式</label>


                            <div class="col-sm-10">
                                <select class="form-control" name="" v-model.trim="newaction">
                                    <option value="">选择action</option>
                                    <option value="0">native</option>
                                    <option value="1">web</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">


                            <label for="inputEmail1" class="col-sm-2 control-label">支付方式图标</label>


                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="icon_url" v-model.trim="newicon_url">
                            </div>
                        </div>
                        <div class="form-group">


                            <label for="inputEmail1" class="col-sm-2 control-label">描述</label>


                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="desc" v-model.trim="newdesc">
                            </div>
                        </div>
                        <div class="form-group">


                            <label for="inputEmail1" class="col-sm-2 control-label">跳转URL</label>

                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="redirect_url" v-model.trim="newredirect_url">
                            </div>
                        </div>
                        <div class="form-group">


                            <label for="inputEmail1" class="col-sm-2 control-label">支付成功回调地址</label>


                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="callback_url" v-model.trim="newcallback_url">
                            </div>
                        </div>
                        <div class="addTips">
                            {{addATips1}}
                        </div>
                        <div class="addTips2">
                            {{addATips2}}
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="addCode">确认</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">更新</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">用户等级</label>


                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="level" v-model.trim="level">
                            </div>
                        </div>
                        <div class="form-group">


                            <label  class="col-sm-2 control-label">名称</label>

                            <div class="col-sm-10">
                                <input type="text"  class="form-control" placeholder="name" v-model.trim="name">
                            </div>
                        </div>
                        <div class="form-group">

                            <label  class="col-sm-2 control-label">所属平台</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" v-model.trim="os">
                                    <option value="">选择os</option>
                                    <option value="0">ios</option>
                                    <option value="1">google</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">


                            <label class="col-sm-2 control-label">支付方式代码</label>


                            <div class="col-sm-10">
                                <input type="text"  class="form-control" placeholder="code" v-model.trim="code">
                            </div>
                        </div>
                        <div class="form-group">


                            <label class="col-sm-2 control-label">跳转方式</label>


                            <div class="col-sm-10">
                                <select class="form-control" name=""  v-model.trim="action">
                                    <option value="">选择action</option>
                                    <option value="0">native</option>
                                    <option value="1">web</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">


                            <label  class="col-sm-2 control-label">支付方式图标</label>


                            <div class="col-sm-10">
                                <input type="text"  class="form-control" placeholder="icon_url" v-model.trim="icon_url">
                            </div>
                        </div>
                        <div class="form-group">


                            <label class="col-sm-2 control-label">描述</label>


                            <div class="col-sm-10">
                                <input type="text"  class="form-control" placeholder="desc" v-model.trim="desc">
                            </div>
                        </div>
                        <div class="form-group">


                            <label class="col-sm-2 control-label">跳转URL</label>


                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="redirect_url" v-model.trim="redirect_url">
                            </div>
                        </div>
                        <div class="form-group">


                            <label class="col-sm-2 control-label">支付成功回调地址</label>


                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="callback_url" v-model.trim="callback_url">
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
export default {
    data() {
        return {
            agentL: [],
            newname: "",
            newcode: "",
            newos: "",
            newaction: "",
            newicon_url: "",
            newdesc: "",
            newlevel: "",
            newredirect_url: "",
            newcallback_url: "",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            scode: "",
            name: "",
            code: "",
            os: "",
            action: "",
            icon_url: "",
            desc: "",
            level: "",
            redirect_url: "",
            callback_url: "",
            agencyUpID: "",
            AMtips1: "",
            AMtips2: "",
            matchUrl: /^(((ht|f)tps?):\/\/)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,
            showImgUrl: ""
        }
    },

    methods: {
        codeList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/provider/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size
                },
                success: function(data){
                    let r_code = data.returncode;
                    if(r_code == 200){
                        that.agentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.codeList(data.data.totalPageNum, size);
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
                    } else if (r_code == '301') {
                        console.log('参数错误');
                    } else if (r_code == '104') {
                        // console.log('code-104');
                        // debugger;
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.codeList(that.page, that.size)});
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
        getImgUrl(url) {
            this.showImgUrl = url||'图片不存在';
        },
        resetUpdate(id, level, name, os, code, action, icon_url, desc, redirect_url, callback_url) {
            this.upTips1 = '';
            this.upTips2 = '';
            this.level = level;
            this.name = name;
            this.os = os;
            this.code = code;
            this.action = action;
            this.icon_url = icon_url;
            this.desc = desc;
            this.redirect_url = redirect_url;
            this.callback_url = callback_url;
            this.agencyUpID = id;
        },
        update() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            if (that.level === '') {
                that.upTips1 = '请填写等级';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(that.level) ) {
                that.upTips1 = '请在level中填写数字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.name == '') {
                that.upTips1 = '请填写name';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.os === '') {
                that.upTips1 = '请填写os';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.code == '' || that.code == undefined ) {
                that.upTips1 = '请填写code';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(that.code) ) {
                that.upTips1 = '请在code中填写数字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.action === '' || that.action == undefined ) {
                that.upTips1 = '请填写action';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if ( !that.matchUrl.test(that.icon_url) ) {
                that.upTips1 = '请填写正确icon_url';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.desc == '' || that.desc == undefined ) {
                that.upTips1 = '请填写desc';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if ( !that.matchUrl.test(that.redirect_url) ) {
                that.upTips1 = '请填写正确redirect_url';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if ( !that.matchUrl.test(that.callback_url) ) {
                that.upTips1 = '请填写正确callback_url';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/provider/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "id": that.agencyUpID,
                        "name": that.name,
                        "code": that.code,
                        "os": that.os,
                        "action": that.action,
                        "icon_url": that.icon_url,
                        "desc": that.desc,
                        "level": that.level,
                        "redirect_url": that.redirect_url,
                        "callback_url": that.callback_url
                    },
                    success: function(data) {
                        let r_code = data.returncode;
                        if(r_code == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.codeList(that.page, that.size)
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (r_code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        } else if (r_code == '302') {
                            that.upTips1 = 'code已注册';
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
        searchCode() {
            const that = this;
            that.page = 1;
            that.codeList(that.page, that.size);
        },
        resetaddCode() {
            const that = this;
            this.newname = "";
            this.newcode = "";
            this.newos = "";
            this.newaction = "";
            this.newicon_url = "";
            this.newdesc = "";
            this.newlevel = "";
            this.newredirect_url = "";
            this.newcallback_url = "";
        },
        addCode() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.newlevel === '') {
                that.addATips1 = '请填写等级';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(that.newlevel) ) {
                that.addATips1 = '请在level中填写数字';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newname == '') {
                that.addATips1 = '请填写name';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newos == '') {
                that.addATips1 = '请填写os';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newcode == '') {
                that.addATips1 = '请填写code';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(that.newcode) ) {
                that.addATips1 = '请在code中填写数字';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newaction == '') {
                that.addATips1 = '请填写action';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( !that.matchUrl.test(that.newicon_url) ) {
                that.addATips1 = '请填写正确icon_url';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newdesc == '') {
                that.addATips1 = '请填写desc';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( !that.matchUrl.test(that.newredirect_url) ) {
                that.upTips1 = '请填写正确redirect_url';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if ( !that.matchUrl.test(that.newcallback_url) ) {
                that.upTips1 = '请填写正确callback_url';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/provider/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "name": that.newname,
                        "code": that.newcode,
                        "os": that.newos,
                        "action": that.newaction,
                        "icon_url": that.newicon_url,
                        "desc": that.newdesc,
                        "level": that.newlevel,
                        "redirect_url": that.newredirect_url,
                        "callback_url": that.newcallback_url
                    },
                    success: function(data) {
                        let r_code = data.returncode;
                        if(r_code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            that.codeList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if (r_code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addCode);
                        } else if (r_code == '302') {
                            that.addATips1 = '服务器错误';
                            setTimeout(function() {
                                that.addATips1 = '';
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

        changeState(initForbidState, id) {
            const that = this;
            that.AMtips1 = '';
            that.AMtips2 = '';
            if (initForbidState == 0) {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/provider/permit',
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
                            that.codeList(that.page, that.size);
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
                    url: that.$store.state.rootUrl3 + '/provider/forbid',
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
                            that.codeList(that.page, that.size);
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

        pageBegin() {
            const that = this;
            that.page = 1;
            that.codeList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.codeList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.codeList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.codeList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 17);
        this.$store.dispatch('subChanger', 'sub6');

        this.codeList(this.page, this.size);
        // console.log(this.$store.state.tabIndex);
        // this.adminList(this.page, this.size, this.name);
    }
}
</script>
