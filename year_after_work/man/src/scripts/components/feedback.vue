<template id="">
<div class="">
    <div class="AM-top"  style="text-align: left; margin-top: 10px;">
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>Pid</th>
                <th>Loginname</th>
                <th>Email</th>
                <th>Type</th>
                <th>Content</th>
                <th>Image</th>
                <th style="width:150px">Create time</th>
                <th>Replies</th>
                <th>Operation</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.pid}}</td>
                <td>{{admin.username}}</td>
                <td>{{admin.contact}}</td>
                <td>{{admin.category}}</td>
                <td>{{admin.content}}</td>
                <td><a style="color:#777;font-size:24px;cursor: pointer;" target="_blank" data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(admin.image_url)"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                <td>{{moment(admin.create_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td><i v-bind:class="admin.status == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" v-if="admin.status!=1" data-toggle='modal' data-target="#updateModal" @click="getReplyid(admin._id)">回复</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#delModal" @click="feedbackDetial(admin._id)">详情</a></li>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">Image</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div v-if="imgUrl.length==0" style="text-align:center;">没有反馈图</div>
                        <div v-if="imgUrl.length>0" style="width:100%;display: -webkit-box;-webkit-box-pack: center;">
                            <div class="col-sm-4" v-for="url in imgUrl" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-box-pack: justify;">
                                <div class="col-sm-12">
                                    <div class="showImg">
                                        <img :src="url" alt="" style="margin-bottom:10px;">
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <input type="text" class="form-control" placeholder="url" :value="url" readOnly>
                                </div>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">回复</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div style="padding:5px 0;">回复内容：</div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                <textarea style="resize:none;" class="form-control" v-model="newContent" name="" id="" cols="30" rows="10"></textarea>
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
                    <button type="button" class="btn btn-primary" @click="replyFn">确认</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="delModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">Details</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Type (*)</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly class="form-control" v-model.trim="category">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Feedback (*)</label>
                            <div class="col-sm-10">
                                <textarea style="resize:none;" readOnly class="form-control" v-model="content" name="" id="" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">administrator (*)</label>
                            <div class="col-sm-10">
                                <input type="text" readOnly class="form-control" v-model.trim="adminid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">Reply (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model.trim="replyContent">
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
                    <button type="button" class="btn btn-primary" @click="updateReplyFn">确认</button>
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
            moment: moment,
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            adminL: [],
            pageL: [],
            upTips1: '',
            upTips2: '',

            imgUrl: [],

            category: '',
            content: '',
            adminid: '',
            replyid: '',
            replyContent: '',

            newContent: '',

            feedbackid: '',
        }
    },

    methods: {

        adminList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/feedback/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "pageNum": page,
                    "pageSize": size,
                    "taskname": that.searchname,
                },
                success: function(data) {
                    console.log(data)
                    if (data.returncode == '200') {
                        that.adminL = [];
                        that.adminL = data.data.data;
                        if (page > data.data.totalPage) {
                            that.adminList(data.data.totalPage, size);
                            return false;
                        } else if (page <= 0) {
                            return false;
                        } else {
                            that.page = page;
                            that.pageL = [];
                            let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                            let maxPage = Math.min(data.data.totalPage, Math.ceil(page / 5) * 5);
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

        getImgUrl(url) {
            console.log(url)
            this.imgUrl = url;
        },



        getReplyid(id) {
            this.feedbackid = id;
            this.newContent = '';
        },

        feedbackDetial (id) {
            const that = this;
            that.category = "";
            that.content = "";
            that.adminid = "";
            that.replyContent = "";
            that.replyid = "";
            $.ajax({
                url: that.$store.state.rootUrl3 + '/feedback/detail',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "get",
                data: {
                    "_id": id
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        that.category = data.data.category;
                        that.content = data.data.content;
                        that.adminid = data.data.replyid.adminname;
                        that.replyid = data.data.replyid._id;
                        that.replyContent = data.data.replyid.content;
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){ that.feedbackDetial(id) });
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            })
            
        },

        updateReplyFn() {
            const that = this;
            if (that.replyContent === '') {
                this.upTips1 = '请填写回复内容';
                setTimeout(function() {
                    that.upTips1 = ''
                }, 1000)
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/feedback/editReply',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "_id": that.replyid,
                        "content": that.replyContent
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.adminList(that.page, that.size);
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#delModal').modal('hide');
                            }, 500);
                        } else if (data.returncode == '303') {
                            that.upTips1 = '请求错误';
                            that.upTips2 = '';
                            setTimeout(function() {
                                that.upTips1 = '';
                            }, 1500);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.replyFn);
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




        replyFn() {
            const that = this;
            if (that.newContent === '') {
                this.upTips1 = '请填写回复内容';
                setTimeout(function() {
                    that.upTips1 = ''
                }, 1000)
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/feedback/reply',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "_id": that.feedbackid,
                        "content": that.newContent
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.adminList(that.page, that.size);
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (data.returncode == '303') {
                            that.upTips1 = '请求错误';
                            that.upTips2 = '';
                            setTimeout(function() {
                                that.upTips1 = '';
                            }, 1500);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.replyFn);
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
        this.$store.dispatch('tabChanger', 63);
        this.$store.dispatch('subChanger', 'sub9');

        // console.log(this.$store.state.tabIndex);
        this.adminList(this.page, this.size);
    }
}
</script>
