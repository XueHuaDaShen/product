<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float: left; margin-top: 3px;" type="button" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddUnion">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <div class="AM-topR" style = "float: right; margin-right: 3.9%; margin-bottom: 25px;">
            <input type="number" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入pid" v-model.trim = "serPid">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchUnion"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th class="AM-agentID">工会id</th>
                <th>pid</th>
                <th>loginname</th>
                <th>serial_no</th>
                <th>title</th>
                <th>type</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.pid}}</td>
                <td>{{agent.loginname}}</td>
                <td>{{agent.serial_no}}</td>
                <td>{{agent.title||''}}</td>
                <td>{{agent.type==1 ? '主播' : '视频'}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent.pid, agent.serial_no, agent.type, agent.title, agent._id)">编辑</a></li>
                            <li><a href="javascript: void(0)" @click="deleteList(agent._id)">删除</a></li>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="unionList(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>
    <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg"><!--  videoUpload -->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">类型 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" v-model.trim="type">
                                    <option value="">类型</option>
                                    <option value="1">推荐主播</option>
                                    <!-- <option value="2">推荐小视频</option> -->
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">pid (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="pid" v-model.trim="pid" @change="pidChange()">
                            </div>
                        </div>
                        <div class="form-group" v-show="is_check">
                            <label for="inputEmail1" class="col-sm-2 control-label">选择视频 (*)</label>
                            <div class="col-sm-10">
                                <div class="videoUploadImgBox">
                                    <div v-for="(obj, index) in videoImgList">
                                        <input type="radio" class="videoUploadRadio" style="height:89%" :value="obj.shortid" name="r1" v-model.trim="shortid">
                                        <i class="fa fa-check videoUploadCheckImg" style="height:89%" aria-hidden="true"></i>
                                        <span><video :src="obj.playback_url" controls="controls" style="height:100%;width:auto"></video></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-show="is_check">
                            <label for="inputEmail1" class="col-sm-2 control-label">title (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="title" v-model.trim="title">
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
                    <button type="button" class="btn btn-primary" @click="addUnion">{{ type!=2 ? '确认' : ( is_check ? '确认' : '查找')}}</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">类型 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" v-model.trim="reType" disabled>
                                    <option value="">类型</option>
                                    <option value="1">推荐主播</option>
                                    <!-- <option value="2">推荐小视频</option> -->
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">serial_no (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="serial_no" v-model.trim="agencyN">
                            </div>
                        </div>
                        <div class="form-group" v-show="reType == 2">
                            <label for="inputEmail1" class="col-sm-2 control-label">title (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="title" v-model.trim="reTitle">
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
            serPid: "",
            name: "",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            agencyN: "",
            agencyUpID: "",
            AMtips1: "",
            AMtips2: "",
            type: "",
            pid: "",
            shortid: "",
            title: "",
            loginname: "",
            loginid: "",
            reType: "",
            rePid: "",
            reShortid: "",
            reTitle: "",
            reLoginname: "",
            reLoginid: "",
            videoImgList: [],
            videoImgUrl: "",
            is_check: false
        }
    },

    methods: {
        unionList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/custom/recommend/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "pid": that.serPid
                },
                success: function(data){
                    let code = data.returncode;
                    // console.log(data)
                    if(code == 200){
                        that.agentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.unionList(data.data.totalPageNum, size);
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
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.unionList(that.page, that.size)});
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
        searchUnion() {
            const that = this;
            that.page = 1;
            that.unionList(that.page, that.size);
        },
        resetUpdate(pid, serial_no, type, title, id) {
            this.upTips1 = '';
            this.upTips2 = '';
            this.rePid = pid;
            this.reType = type;
            this.reTitle = title;
            this.agencyN = serial_no;
            this.agencyUpID = id;
        },
        update() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            if( that.reType == '' ){
                that.upTips1 = '请选择type';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.agencyN == '') {
                that.upTips1 = '请填写serial_no';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.reType == 2 && that.reTitle == '' ) {
                that.upTips1 = '请填写title';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/custom/recommend/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "_id": that.agencyUpID,
                        "type": that.reType,
                        "serial_no": that.agencyN,
                        "title": that.reTitle
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.unionList(that.page, that.size)
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        } else if (code == '400') {
                            that.upTips1 = '用户不存在';
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
        resetaddUnion() {
            const that = this;
            that.pid = "";
            that.type = "";
            that.shortid = "";
            that.title = "";
            that.loginname = "";
            that.loginid = "";
            that.videoImgList = [];
            that.is_check = false;
        },
        addUnion() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if(that.type == '') {
                that.addATips1 = '请选择type';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.pid == '') {
                that.addATips1 = '请填写pid';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if(that.type == 1) {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/custom/recommend/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "type": that.type,
                        "pid": that.pid
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            that.unionList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addUnion);
                        } else if (code == '400') {
                            that.addATips1 = '用户不存在';
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
            } else if(that.type == 2) {
                if( !that.is_check ){
                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/custom/recommend/check',
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        type: "POST",
                        data: {
                            "pid": that.pid
                        },
                        success: function(data){
                            if (data.returncode == '200') {
                                that.videoImgList = data.data.video;
                                if(that.videoImgList == ''){
                                    that.addATips1 = '此用户暂时没有审核通过的小视频';
                                    that.loginname = '';
                                    that.loginid = '';
                                    that.is_check = false;
                                    setTimeout(function() {
                                        that.addATips1 = '';
                                    }, 500);
                                }else{
                                    that.loginname = data.data.loginname;
                                    that.loginid = data.data.loginid;
                                    that.is_check = true;
                                }
                                // that.AMtips1 = '操作成功';
                                // that.unionList(that.page, that.size);
                                // setTimeout(function() {
                                //     that.AMtips1 = '';
                                // }, 1000);
                            } else if (data.returncode == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addUnion);
                            } else if (data.returncode == '400') {
                                that.addATips1 = '用户不存在';
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
                }else{
                    if( that.shortid == '' ) {
                        that.addATips1 = '请填选择视频';
                        setTimeout(function() {
                            that.addATips1 = '';
                        }, 500);
                        return false;
                    } else if( that.title == '' ) {
                        that.addATips1 = '请填写title';
                        setTimeout(function() {
                            that.addATips1 = '';
                        }, 500);
                        return false;
                    } else {
                        $.ajax({
                            url: that.$store.state.rootUrl3 + '/custom/recommend/create',
                            headers: {
                                "token": localStorage.getItem('A-TOKEN')
                            },
                            type: "POST",
                            data: {
                                "pid": that.pid,
                                "type": that.type,
                                "loginname": that.loginname,
                                "loginid": that.loginid,
                                "shortid": that.shortid,
                                "title": that.title
                            },
                            success: function(data){
                                let code = data.returncode;
                                if(code == '200') {
                                    that.addATips1 = '';
                                    that.addATips2 = '操作成功';
                                    that.unionList(that.page, that.size)
                                    setTimeout(function() {
                                        that.addATips2 = '';
                                        $('#addAgentModal').modal('hide');
                                    }, 500);
                                } else if (code == '104') {
                                    utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addUnion);
                                } else if (code == '400') {
                                    that.addATips1 = '用户不存在';
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
                }
            }
        },
        deleteList(id) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/custom/recommend/del',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "_id": id
                },
                success: function(data){
                    if (data.returncode == '200') {
                        that.AMtips1 = '操作成功';
                        that.unionList(that.page, that.size);
                        setTimeout(function() {
                            that.AMtips1 = '';
                        }, 1000);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.deleteList(id)});
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

        // getVideo() {
        //     if(this.type == 1){
        //         console.log(1)
        //     }
        // },

        pidChange() {
            this.is_check = false;
            this.videoImgList = [];
        },


        pageBegin() {
            const that = this;
            that.page = 1;
            that.unionList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.unionList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.unionList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.unionList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 46);
        this.$store.dispatch('subChanger', 'sub9');

        this.unionList(this.page, this.size);
    }
}
</script>
