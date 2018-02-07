<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <div class="AM-topR" style = "float: right; margin-right: 5%; margin-bottom: 25px;">
            <input type="text" class="form-control AM-search" style="width:30%" placeholder="请输入pid" v-model.trim = "videoPid">
            <select class="form-control record-info" name=""  v-model.trim="status" style = "display: inline-block; width: 30%; position:relative; top: 0;">
                <option value="">选择状态</option>
                <option value="1">已上传</option>
                <option value="3">待审核</option>
                <option value="4">审核通过</option>
                <option value="5">自动审核拒绝</option>
                <option value="6">自动审核复审</option>
                <option value="7">审核不通过</option>
                <option value="8">禁播</option>
            </select>
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchUnion"></i>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <thead>
            <tr>
                <th class="AM-agentID">工会id</th>
                <th>pid</th>
                <th>title</th>
                <th>num_scan</th>
                <th>video/img</th>
                <th>size</th>
                <th>short_no</th>
                <th>create_at</th>
                <th>isDelete</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.pid}}</td>
                <td>{{agent.title}}</td>
                <td>{{agent.num_scan}}</td>
                <td><i data-toggle='modal' data-target="#updateModal" style="font-size:24px;cursor: pointer;" @click="getVideoImg(agent.playback_url, agent.thumbnail)" class="fa fa-video-camera" aria-hidden="true"></i></td>
                <td>{{dealSize(agent.size)}}</td>
                <td>{{agent.short_no}}</td>
                <td>{{moment(agent.create_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{agent.is_deleted=='1'?'已删除':'未删除'}}</td>
                <td>{{is_status(agent.status)}}</td>
                <td>
                    <!-- <button type="button" :disabled="(agent.status==5||agent.status==6)?false:true" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#ImgExamModal" @click="getImgList(agent.videoid, agent.playback_url, agent.shortid)">
                      审核
                    </button> -->
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li data-toggle='modal' data-target="#ImgExamModal" v-if="(agent.status==5||agent.status==6)?true:false"><a href="javascript: void(0)" @click="getImgList(agent.videoid, agent.playback_url, agent.shortid)">审核</a></li>
                            <li data-toggle='modal' data-target="#forbidModal1" @click="getShortid(agent.shortid)" v-if="agent.status != 8"><a href="javascript: void(0)">禁播</a></li>
                            <li data-toggle='modal' data-target="#forbidModal2" @click="getShortid(agent.shortid)" v-if="agent.status == 8"><a href="javascript: void(0)">解禁</a></li>
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
    <div class="modal fade bs-example-modal-lg" id="forbidModal1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">禁播视频</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style="font-size: 16px;">
                        是否确定禁播该视频
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
                    <button type="button" class="btn btn-primary" @click="forbidFn1">确认</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="forbidModal2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">解禁视频</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style="font-size: 16px;">
                        是否确定解禁该视频
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
                    <button type="button" class="btn btn-primary" @click="forbidFn2">确认</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">video/img</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <div class="col-sm-12">
                                <div class="col-sm-6"><video :src="videoUrl" controls="controls" style="width:100%;height:auto"></video></div>
                                <div class="col-sm-6"><img :src="imgUrl" style="width:100%;hieght:auto"></div>
                            </div>
                        </div>
                        <div class="addTips">
                            {{upTips1}}
                        </div>
                        <div class="addTips">
                            {{upTips2}}
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

    <div class="modal fade bs-example-modal-lg" id="ImgExamModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg videoUpload">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">审核</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <div class="col-sm-12">
                                <div class="col-sm-3"><video :src="videoUrl" controls="controls" style="width:100%;hieght:auto"></video></div>
                                <div class="col-sm-9">
                                    <div class="videoExamBox">
                                        <div v-for="(obj, index) in videoImgList">
                                            <div :class="obj.porn===undefined?'visibilityHide':'visibilityShow'">
                                                <p>鉴黄：<em :class="obj.porn==2?'nor':'sex'">{{obj.porn==0?'色情':(obj.porn==1?'性感':'正常')}}</em></p>
                                                <p>危险：<em :class="obj.danger==0?'nor':'fear'">{{obj.danger==0?'正常':'暴恐'}}</em></p>
                                            </div>
                                            <span><img :src="obj.url"></span>
                                        </div>
                                    </div>
                                </div>
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
                    <button type="button" class="btn btn-primary" @click="videoExam(4)">通过</button>
                    <button type="button" class="btn btn-default" @click="videoExam(7)">不通过</button>
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
            videotutulive: "",
            videoUrl: "",
            imgUrl: "",
            status: "",
            videoImgList: [],
            videoImgUrl: "",
            videoShortId: "",
            examId: "",
            shortid: "",
            videoPid: "",
            moment: moment
        }
    },

    methods: {
        unionList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/shortvideo/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "status": that.status,
                    "pid": that.videoPid
                },
                success: function(data){
                    // console.log(data)
                    let code = data.returncode;
                    if(code == 200){
                        that.agentL = data.data.data;
                        // that.videotutulive = data.data.v_url;
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

        getImgList(videoid, video, id) {
            const that = this;
            that.videoUrl = video;
            that.examId = id;
            that.upTips1 = '';
            that.upTips2 = '';
            $.ajax({
                url: that.$store.state.rootUrl3 + '/shortvideo/screenhot/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "get",
                data: {
                    "videoid": videoid,
                    "type": "t2"
                },
                success: function (data) {
                    that.videoImgList = data.data;
                    // that.videoShortId = data.data.id;
                    // that.is_frame = true;
                    // that.frame_show = false;
                },
                fail: function () {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            })
        },

        getVideoImg(video, img) {
            const that = this;
            // this.videoUrl = this.videotutulive+video;
            this.videoUrl = video;
            this.imgUrl = img;
            console.log()
            $("#updateModal").on("hide.bs.modal", function(){
                that.videoUrl = "";
                that.imgUrl = "";
            })
        },


        is_status(status) {
            switch(status){
                case 1:
                    return "已上传";
                    break;
                case 2:
                    return "待审核";
                    break;
                case 3:
                    return "待审核";
                    break;
                case 4:
                    return "审核通过";
                    break;
                case 5:
                    return "自动审核拒绝";
                    break;
                case 6:
                    return "自动审核复审";
                    break;
                case 7:
                    return "审核不通过";
                    break;
                case 8:
                    return "禁播";
                    break;
            }
        },

        dealSize(size) {
            if( size ){
                if( size/1024 < 1000 ){
                    return (size/1024).toFixed(2) + "KB";
                } else {
                    return (size/1024/1024).toFixed(2) + "M";
                }
            } else {
                return "0KB";
            }
        },

        getShortid(id) {
            this.shortid = id;
        },

        forbidFn1() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/shortvideo/forbid',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    'shortid': that.shortid
                },
                success: function(data) {
                    let code = data.returncode;
                    // console.log(data)
                    if (code == 200) {
                        that.upTips2 = '请求成功';
                        that.unionList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#forbidModal1').modal('hide');
                        }, 500);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.forbidFn1);
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

        forbidFn2() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/shortvideo/deforbid',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    'shortid': that.shortid
                },
                success: function(data) {
                    let code = data.returncode;
                    // console.log(data)
                    if (code == 200) {
                        that.upTips2 = '请求成功';
                        that.unionList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#forbidModal2').modal('hide');
                        }, 500);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.forbidFn2);
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
        // videoExam(id, type, path, md5) {
        //     const that = this;
        //     var status = 0;
        //     var is_md5 = md5? md5.toString()+"."+type.slice(type.lastIndexOf("/")+1):"";
        //     if(type){
        //         status = 5;
        //     }else{
        //         status = 4;
        //     }
        //     $.ajax({
        //         url: that.$store.state.rootUrl3 + '/shortvideo/check',
        //         headers: {
        //             "token": localStorage.getItem('A-TOKEN')
        //         },
        //         type: "POST",
        //         data: {
        //             "id": id,
        //             "status": status
        //             // "key": is_md5,
        //             // "path": path
        //         },
        //         success: function(data){
        //             if (data.returncode == '200') {
        //                 that.AMtips1 = '操作成功';
        //                 that.unionList(that.page, that.size);
        //                 setTimeout(function() {
        //                     that.AMtips1 = '';
        //                 }, 1000);
        //             } else if (data.returncode == '104') {
        //                 utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.deleteList(id)});
        //             } else if (data.returncode == '304') {
        //                 that.AMtips2 = '该工会下有用户，不能删除';
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


        videoExam(status) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/shortvideo/check',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "shortid": that.examId,
                    "status": status
                    // "key": is_md5,
                    // "path": path
                },
                success: function(data){
                    if (data.returncode == '200') {
                        that.upTips2 = '操作成功';
                        setTimeout(function() {
                            that.upTips2 = '';
                            that.unionList(that.page, that.size);
                            $('#ImgExamModal').modal('hide');
                        }, 500);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.videoExam(that.examId, status)});
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
        this.$store.dispatch('tabChanger', 43);
        this.$store.dispatch('subChanger', 'sub8');

        this.unionList(this.page, this.size);
    }
}
</script>
