<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float: left" type="button" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddVideo">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <form class="AM-topL form-inline" style="text-align:right;">
            <input type="number" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入short_no" v-model.trim="searchShort">
            <input type="number" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入week_no" v-model.trim="searchWeek">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchCode" style="margin-right:5%;"></i>
        </form>
    </div>
    <table class="table table-striped table-hover AM-table">
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>loginname</th>
                <th>short_no</th>
                <th>order_no</th>
                <th>week_no</th>
                <th>video</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.video.loginname}}</td>
                <td>{{agent.video.short_no}}</td>
                <td>{{agent.video.order_no}}</td>
                <td>{{agent.video.week_no}}</td>
               <td><i data-toggle='modal' data-target="#videoModal" style="color:#777;font-size:24px;cursor: pointer;" @click="getVideoUrl(agent.video.playback_url)" class="fa fa-video-camera" aria-hidden="true"></i></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent.video.short_no, agent.video.order_no, agent.video.week_no)">编辑</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#delModal" @click="getVideoNum(agent.video.short_no)">删除</a></li>
                        </ul>
                    </div>
                    <!-- <button type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent.code, agent.msg, agent._id)">
                      编辑
                    </button> -->
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
    <div class="modal fade bs-example-modal-lg" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
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
                                <div class="col-sm-12" id="onlyOne" style="display: -webkit-box;-webkit-box-pack: center;">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">url (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="url" v-model.trim="videoPlaybackUrl" readOnly>
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
    <div class="modal fade bs-example-modal-lg" id="delModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">删除小视频</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style="font-size: 16px;">
                        是否确定删除该小视频吗
                    </div>
                    <div class="addTips">
                        {{upTips1}}
                    </div>
                    <div class="addTips2">
                        {{upTips2}}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="deleteList">确认</button>
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
                            <label class="col-sm-2 control-label">short_no (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="short_no" v-model.trim="newshort_no">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">order_no (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="order_no" v-model.trim="neworder_no">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">week_no (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="week_no" v-model.trim="newweek_no">
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
                    <button type="button" class="btn btn-primary" @click="addVideo">确认</button>
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
                            <label class="col-sm-2 control-label">short_no (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="short_no" v-model.trim="short_no" readOnly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">order_no (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="order_no" v-model.trim="order_no">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">week_no (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="week_no" v-model.trim="week_no">
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
            name: "",
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
            sourcePid: "",
            videoNum: "",
            newshort_no: "",
            neworder_no: "",
            newweek_no: "",
            short_no: "",
            order_no: "",
            week_no: "",

            searchWeek: "",
            searchShort: "",

            videoPlaybackUrl: ""
        }
    },

    methods: {
        codeList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/shortvideosort/findShortVideosSort',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "con": "con",
                    "short_no": that.searchShort,
                    "week_no": that.searchWeek
                },
                success: function(data){
                    let r_code = data.returncode;
                    console.log(data)
                    if(r_code == 200){
                        that.agentL = data.videos;
                        that.pagesShow = true;
                        if (page > data.totalPageNum) {
                            that.codeList(data.totalPageNum, size);
                            return false;
                        } else if (page <= 0) {
                            return false;
                        } else {
                            that.page = page;
                            that.pageL = [];
                            let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                            let maxPage = Math.min(data.totalPageNum, Math.ceil(page / 5) * 5);
                            // console.log(maxPage);
                            for (let i = pageStart; i <= maxPage; i++) {
                                that.pageL.push(i);
                            }
                            that.AMtips1 = '请求成功';;
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }
                    } else if (r_code == '303') {
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


        resetUpdate(short_no, order_no, week_no) {
            this.upTips1 = '';
            this.upTips2 = '';
            this.short_no = short_no;
            this.order_no = order_no;
            this.week_no = week_no;
        },
        getVideoUrl(url) {
            const that = this;
            that.videoPlaybackUrl = url;
            if( that.videoPlaybackUrl === '' || that.videoPlaybackUrl === undefined ){
                that.videoPlaybackUrl = '视频不存在';
                $("#onlyOne").html('视频不存在');
            }else{
                that.myVideoHtml = '<video id="myVideo" style="height:500px" class="video-js vjs-default-skin" controls preload="auto" data-setup="{}"><source id="myUpdateVideo" src="'+url+'" type="application/x-mpegURL"></video>';
                $("#onlyOne").html(that.myVideoHtml);
                var videoUrl = document.getElementById('myUpdateVideo').getAttribute("src");
                if( videoUrl.lastIndexOf(".mp4") > -1 ){
                    document.getElementById('myUpdateVideo').setAttribute("type", "video/mp4");
                }
                videojs('myVideo');
            }
            
        },
        clearVideo() {
            const that = this;
            $('#videoModal').on('hide.bs.modal', function () {
                $("#onlyOne").html("");
                if( that.videoPlaybackUrl === '' || that.videoPlaybackUrl === undefined || that.videoPlaybackUrl == '视频不存在' ){
                    that.videoPlaybackUrl = '';
                }else{
                    that.videoPlaybackUrl = '';
                    videojs.getPlayers()['myVideo'].dispose();
                    that.myVideoHtml = '';
                }
                
            })
        },
        update() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            if (that.short_no == '') {
                that.upTips1 = '请填写编号';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if (that.order_no == '') {
                that.upTips1 = '请填写权重';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if (that.week_no == '') {
                that.upTips1 = '请填写第几周';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/shortvideosort/updateShortVideoSort',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "short_no": that.short_no,
                        "order_no": that.order_no,
                        "week_no": that.week_no
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
                            that.upTips1 = '服务器错误';
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
        resetaddVideo() {
            const that = this;
            this.newshort_no = "";
            this.neworder_no = "";
            this.newweek_no = "";
        },
        addVideo() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.newshort_no == '') {
                that.addATips1 = '请填写编号';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.neworder_no == '') {
                that.addATips1 = '请填写权重';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newweek_no == '') {
                that.addATips1 = '请填写第几周';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/shortvideosort/saveShortVideoSort',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "short_no": that.newshort_no,
                        "order_no": that.neworder_no,
                        "week_no": that.newweek_no
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
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addVideo);
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

        getVideoNum(id) {
            this.videoNum = id;
        },

        deleteList() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/shortvideosort/removeShortVideoSort',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    'short_no': that.videoNum
                },
                success: function(data) {
                    let code = data.returncode;
                    // console.log(data)
                    if (code == 200) {
                        that.upTips2 = '请求成功';
                        that.codeList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#delModal').modal('hide');
                        }, 500);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.deleteList);
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
        this.$store.dispatch('tabChanger', 55);
        this.$store.dispatch('subChanger', 'sub9');

        this.codeList(this.page, this.size);
        this.clearVideo();
        // console.log(this.$store.state.tabIndex);
        // this.adminList(this.page, this.size, this.name);
    }
}
</script>
