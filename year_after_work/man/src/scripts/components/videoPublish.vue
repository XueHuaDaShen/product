<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
       <!--  <div class="AM-topR" style = "float: right; margin-right: 3.9%; margin-bottom: 25px;">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入视频名称" v-model.trim = "name">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchUnion"></i>
        </div> -->

    </div>
    <table class="table table-striped table-hover AM-table">
        <thead>
            <tr>
                <th class="AM-agentID">工会id</th>
                <th>title</th>
                <th>tags</th>
                <th>type</th>
                <th>video/img</th>
                <th>size</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.title}}</td>
                <td>{{agent.tags}}</td>
                <td>{{agent.type}}</td>
                <td data-toggle='modal' data-target="#videoModal" style="cursor: pointer;" @click="getVideoImg(agent.name, agent.thumbnail)"><i class="fa fa-video-camera" aria-hidden="true"></i></td>
                <td>{{Math.round(agent.size/1024)+"KB"}}</td>
                <td>{{is_status(agent.status)}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li v-show="agent.status==2"><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="videoPublish(agent.videoid, agent._id)">发布</a></li>
                            <li v-show="agent.status==1"><a href="javascript: void(0)" @click="videoFrame(agent._id, agent.type, agent.path)">抽帧</a></li>
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
    <div class="modal fade bs-example-modal-lg" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
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
                                <div class="col-sm-6"><video :src="videoUrl" controls="controls" style="width:100%;hieght:auto"></video></div>
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
    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg videoUpload">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">video/img</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">选择封面 (*)</label>
                            <div class="col-sm-10">
                                <div class="videoUploadImgBox">
                                    <div v-for="(obj, index) in videoImgList">
                                        <input type="radio" class="videoUploadRadio" :value="[obj.path, obj.id]" name="r1" v-model.trim="videoImgUrl">
                                        <i class="fa fa-check videoUploadCheckImg" aria-hidden="true"></i>
                                        <span><img :src="obj.url"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">tags (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-2" v-for="(obj, index) in newtags">
                                    <input type="text" class="form-control" placeholder="tags" style="padding-right:24px;" v-model.trim="videoImgTag=obj.tag">
                                    <button type="button" :class="newtags.length>1? 'sign_show':'sign_hide'" @click="del_info(index, newtags)" class="pk_del btn btn-danger btnAMsmall" style="right:18px;bottom:3px;">-</button>
                                </div>
                                <button type="button" class="btn btn-primary btnAMsmall" style="margin-top:3px;" @click="create_info(newtags)">+</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">title (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="title" v-model.trim="newtitle">
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
                    <button type="button" class="btn btn-primary" @click="publish()">确认</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
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
            agencyN: "",
            agencyUpID: "",
            AMtips1: "",
            AMtips2: "",
            videotutulive: "",
            videoUrl: "",
            imgUrl: "",
            videoImgList: [],
            videoImgTag: "",
            newtags: [],
            newtitle: "",
            videoImgUrl: [],
            videoImgPath: "",
            videoImgId: "",
            videoImgType: "",
            videoShortId: ""
        }
    },

    methods: {
        unionList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/short/video/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "status": {"$gt":0,"$lt":3}
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        that.agentL = data.data.data;
                        that.videotutulive = data.data.v_url;
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
        // searchUnion() {
        //     const that = this;
        //     that.page = 1;
        //     that.unionList(that.page, that.size);
        // },

        getVideoImg(video, img) {
            const that = this;
            this.videoUrl = this.videotutulive+video;
            this.imgUrl = img;
            $("#updateModal").on("hide.bs.modal", function(){
                that.videoUrl = "";
                that.imgUrl = "";
            })
        },


        is_status(status) {
            switch(status){
                case 1:
                    return "未抽帧";
                    break;
                case 2:
                    return "未发布";
                    break;
            }
        },

        videoPublish(videoid, id) {
            this.newtags = [{"tag": ""}];
            this.newtitle = "";
            this.videoShortId = id;
            this.videoImgList = [];
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/short/video/publishimg',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "get",
                data: {
                    "videoid": videoid
                },
                success: function(data){
                    if (data.returncode == '200') {
                        that.videoImgList = data.data
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.videoPublish(videoid)});
                    } else if (data.returncode == '304') {
                        // that.AMtips2 = '该工会下有用户，不能删除';
                        // setTimeout(function() {
                        //     that.AMtips2 = '';
                        // }, 2000);
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


        publish() {
            const that = this;
            var is_tags = false;
            for(var i in this.newtags ){
                if( this.newtags[i].tag === "" ){
                    is_tags = true;
                    break
                }else{
                    is_tags = false;
                }
            }
            if ( that.videoImgUrl == "" ||  that.videoImgUrl === ""  ) {
                that.upTips1 = '请填选择封面';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else if ( is_tags ) {
                that.upTips1 = '请填写tags';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else if ( that.newtitle == "" ||  that.newtitle === ""  ) {
                that.upTips1 = '请填写title';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1000);
                return false;
            } else {
                that.videoImgPath = that.videoImgUrl[0];
                that.videoImgId = that.videoImgUrl[1];
                var arr = that.videoImgPath.split(".");
                that.videoImgType = arr[arr.length-1];
                var tagStr = [];
                for(var i in that.newtags){
                    tagStr.push(that.newtags[i].tag);
                }
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/short/video/publish',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "videoid": that.videoShortId,
                        "path": that.videoImgPath,
                        "key": that.videoImgId.toString()+"."+that.videoImgType,
                        "tags": tagStr.join(),
                        "title": that.newtitle
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            setTimeout(function() {
                                that.unionList(that.page, that.size);
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.publish);
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


        videoFrame(id, type, path) {
            const that = this;
            this.videoImgList = [];
            $.ajax({
                url: that.$store.state.rootUrl3 + '/short/video/frame',
                type: "POST",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "id": id,
                    "type": type,
                    "path": path
                },
                success: function(data) {
                    let code = data.returncode;
                    if(code == '200') {
                        $('#updateModal').modal('show');
                        that.videoImgList = data.data.screens;
                        that.videoShortId = data.data.shortid;
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){
                            that.videoFrame(id, type, path)
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
        },

        create_info(arr) {
            const that = this;
            that.videoImgTag = "";
            arr.push({
                "tag": that.videoImgTag
            })
        },

        del_info(index, arr) {
            arr.splice(index,1)
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
        this.$store.dispatch('tabChanger', 45);
        this.$store.dispatch('subChanger', 'sub8');

        this.unionList(this.page, this.size);
    }
}
</script>
