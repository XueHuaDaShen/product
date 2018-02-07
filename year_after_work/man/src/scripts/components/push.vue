<template id="">
<div class="">
    <div class="AM-top" style="text-align:left;">
        <button type="button" style="margin-left:0;margin-top:8px;" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddMenu">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>类型</th>
                <th>PID</th>
                <th>标题</th>
                <th style="max-width: 300px;">推送内容</th>
                <th>操作系统</th>
                <th>地区</th>
                <th>是否已经推送</th>
                <th>创建时间</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.type}}</td>
                <td>{{agent.pid}}</td>
                <td>{{agent.title}}</td>
                <td style="max-width: 300px;">{{agent.content}}</td>
                <td>{{agent.os}}</td>
                <td>{{agent.area}}</td>
                <td>{{agent.push_num}}</td>
                <td>{{moment(agent.create_time).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="_push(agent._id, agent.type, agent.pid, agent.url, agent.title, agent.content, agent.os, agent.area, agent.effective_time, agent.avatar)">推送</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent.type, agent.pid, agent.url, agent._id, agent.title, agent.content, agent.os, agent.area, agent.effective_time, avatar)">编辑信息</a></li>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="pushList(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>
    <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增推送</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">类型 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="inputEmail1" v-model.trim="newType">
                                    <option value="">类型</option>
                                    <option value="2">个人主页</option>
                                    <option value="3">web页</option>
                                    <option value="4">系统消息页</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">PID (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="PID" v-model.trim="newPid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">标题 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="标题" v-model.trim="newTitle">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">推送内容 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="推送内容" v-model.trim="newContent">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">操作系统 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="inputEmail1" v-model.trim="newOs">
                                    <option value="">操作系统</option>
                                    <option value="0">iOS</option>
                                    <option value="1">Android</option>
                                    <option value="2">全部</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">地区 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="inputEmail1" v-model.trim="newArea">
                                    <option value="">地区</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="All">All</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">生效时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" id="inputEmail3" class="form-control" v-model.trim="newEffectiveYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" id="inputEmail3" class="form-control" v-model.trim="newEffectiveHMS">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">url (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="url" v-model.trim="newUrl">
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
                    <button type="button" class="btn btn-primary" @click="addMenu">确认</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">更新推送</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">类型 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="inputEmail1" v-model.trim="type">
                                    <option value="2">个人主页</option>
                                    <option value="3">web页</option>
                                    <option value="4">系统消息页</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">PID (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="PID" v-model.trim="pid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">标题 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="标题" v-model.trim="title">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">推送内容 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="推送内容" v-model.trim="content">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">操作系统 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="inputEmail1" v-model.trim="os">
                                    <option value="0">iOS</option>
                                    <option value="1">Android</option>
                                    <option value="2">全部</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">地区 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" id="inputEmail1" v-model.trim="area">
                                    <option value="Thailand">Thailand</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="All">All</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">生效时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" id="inputEmail3" class="form-control" v-model.trim="effectiveYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" id="inputEmail3" class="form-control" v-model.trim="effectiveHMS">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">url (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="url" v-model.trim="url">
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
            agentL: [],
            type: "",
            pid: "",
            title: "",
            content: "",
            os: "",
            area: "",
            push_num: "",
            effectiveYMD: "",
            effectiveHMS: "",
            url: "",
            avatar: "http://i1.live.aisoqu.com/tutu_logo_60x60.png",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            moment: moment,
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            newType: "",
            newPid: "",
            newTitle: "",
            newContent: "",
            newOs: "",
            newArea: "",
            newEffectiveYMD: "",
            newEffectiveHMS: "",
            newUrl: "",
            agencyUpID: "",
            AMtips1: "",
            AMtips2: ""
        }
    },



    methods: {
        pushList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/push/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        that.agentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.pushList(data.data.totalPageNum, size);
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
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.pushList(that.page, that.size)});
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
        resetUpdate(type, pid, url, id, title, content, os, area, effective, avatar) {
            var effective = moment(effective).format('YYYY-MM-DD HH:mm:ss');
            this.upTips1 = '';
            this.upTips2 = '';
            this.type = type;
            this.pid = pid;
            this.url = url;
            this.title = title;
            this.content = content;
            this.os = os;
            this.area = area;
            this.effectiveYMD = effective.split(" ")[0];
            this.effectiveHMS = effective.split(" ")[1];
            this.avatar = avatar;
            this.agencyUpID = id;
        },
        update() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            var effective_time = [that.effectiveYMD, that.effectiveHMS].join(" ");
            if (that.type == '') {
                that.upTips1 = '请填写类型';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.pid == '') {
                that.upTips1 = '请输入PID';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.title == '') {
                that.upTips1 = '请输入标题';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.content == '') {
                that.upTips1 = '请输入内容';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.os == '') {
                that.upTips1 = '请输入操作系统';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.area == '') {
                that.upTips1 = '请输入地区';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.effective == '') {
                that.upTips1 = '请输入生效时间';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.url == '') {
                that.upTips1 = '请输入url';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/push/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "id": that.agencyUpID,
                        "type": that.type,
                        "pid": that.pid,
                        "url": that.url,
                        "title": that.title,
                        "content": that.content,
                        "os": that.os,
                        "area": that.area,
                        "effective_time": effective_time,
                        "avatar": that.avatar
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.pushList(that.page, that.size)
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        } else if (code == '302') {
                            that.upTips1 = '菜单已存在，请更换代菜单名称';
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
        resetaddMenu() {
            const that = this;
            this.newType = "";
            this.newPid = "";
            this.newTitle = "";
            this.newContent = "";
            this.newOs = "";
            this.newEffectiveYMD = "";
            this.newEffectiveHMS = "";
            this.newUrl = "";
            this.newArea = "";
        },
        addMenu() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            var effective_time = [that.newEffectiveYMD, that.newEffectiveHMS].join(" ");
            if (that.newType == '') {
                that.addATips1 = '请填写类型';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newPid == '') {
                that.addATips1 = '请输入PID';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newTitle == '') {
                that.addATips1 = '请输入标题';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newContent == '') {
                that.addATips1 = '请输入内容';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newOs == '') {
                that.addATips1 = '请输入操作系统';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newArea == '') {
                that.addATips1 = '请输入地区';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newEffectiveYMD == '' || that.newEffectiveHMS == '') {
                that.addATips1 = '请输入生效时间';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newUrl == '') {
                that.addATips1 = '请输入url';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/push/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "type": that.newType,
                        "pid": that.newPid,
                        "url": that.newUrl,
                        "title": that.newTitle,
                        "content": that.newContent,
                        "os": that.newOs,
                        "area": that.newArea,
                        "effective_time": effective_time,
                        "avatar": that.avatar
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            that.pushList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addMenu);
                        } else if (code == '302') {
                            that.addATips1 = '路径重复，请更换路径';
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
        _push(id, type, pid, url, title, content, os, area, effective_time, avatar) {
            const that = this;
            that.AMtips1 = '';
            that.AMtips2 = '';
            $.ajax({
                url: that.$store.state.rootUrl3 + '/push/apply',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": id,
                    "type": type,
                    "pid": pid,
                    "url": url,
                    "title": title,
                    "content": content,
                    "os": os,
                    "area": area,
                    "effective_time": effective_time,
                    "avatar": avatar
                },
                success: function(data) {
                    console.log(data.returncode)
                    if (data.returncode == '200') {
                        that.AMtips1 = '操作成功';
                        that.pushList(that.page, that.size);
                        setTimeout(function() {
                            that.AMtips1 = '';
                        }, 1000);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that._push(id, type, pid, url, title, content, os, area, effective_time, avatar)});
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
        pageBegin() {
            const that = this;
            that.page = 1;
            that.pushList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.pushList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.pushList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.pushList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 12);
        this.$store.dispatch('subChanger', 'sub4');

        this.pushList(this.page, this.size);
    }
}
</script>
