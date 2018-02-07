<template id="">
<div class="">
	<div class="AM-top">

        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <form class="AM-topL form-inline" style="text-align:right;">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入pid" v-model.trim="SAR">
            <input type="date" class="form-control AM-search" v-model.trim="time1">
            <input type="date" class="form-control AM-search" v-model.trim="time2">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="SvideoPlaybackList" style="margin-right:5%;"></i>
        </form>

    </div>
    <table class="table table-striped table-hover AM-table" style="margin-top: 60px;">
        <thead>
        <tr>
            <th class="AM-agentID">pid</th>
            <th>pid</th>
            <th>hostname</th>
            <th>头像</th>
            <th>播放地址</th>
            <th>创建时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(agent, index) in info2VideoAgentL">
            <td class="AM-agentID">{{agent.pid}}</td>
            <td>{{agent.pid}}</td>
            <td>{{agent.hostname}}</td>
            <td style="overflow: hidden"><a data-toggle='modal' data-target="#showImgModal2" style="color:#777;font-size:24px;cursor: pointer;" target="_blank" @click="getImgUrl(agent.avatar)"><i class="fa fa-file-image-o" aria-hidden="true"></i></a></td>
            <td><i data-toggle='modal' data-target="#videoModal" style="color:#777;font-size:24px;cursor: pointer;" @click="getVideoImg(agent.playback_url)" class="fa fa-video-camera" aria-hidden="true"></i></td>
            <td>{{moment(agent.create_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
        </tr>
        </tbody>
    </table>
    <nav class="AMnav">
        <ul class="pagination">
            <li><a href="javascript:void(0);" @click="pageBegin">Begin</a></li>
            <li><a href="javascript:void(0);" @click="pagePre">&laquo;</a></li>
            <div class="pageL">
                <li v-for="pageN in pageL">
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="videoPlaybackList(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>

    <div class="modal fade bs-example-modal-lg" id="showImgModal2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">img</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <div class="col-sm-12">
                                <div class="col-sm-12"style="display: -webkit-box;-webkit-box-pack: center;">
                                    <div class="showImg">
                                        <img :src="showImgUrl">
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
</div>
</template>

<script>
var times = new Date();
var y = times.getFullYear();
var m = times.getMonth()+1;
var d = times.getDate();
var newTime = new Date(y,m-1, d-6)
import utils from '../utils/utils.js';
const moment = require('moment');
export default {
	data() {
		return {
			AMtips1: '',
			AMtips2: '',
			moment: moment,
			SAR: '',
			time1: moment(newTime).format('YYYY-MM-DD'),
			time2: moment(times).format('YYYY-MM-DD'),
			showImgUrl: '',
			info2VideoAgentL: [],
			myVideoHtml: '',
			page: 1,
			size: 10,
			pageL: [],
			videoPlaybackUrl: '',
		}
	},
	methods: {

		getVideoImg(url) {
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
        getImgUrl(url) {
            this.showImgUrl = url||'图片不存在';
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

		videoPlaybackList(page, size) {
			const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/live/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "h_status": 2,
                    "begintime": that.time1,
                    "endtime": that.time2,
                    "pid": that.SAR
                },
                success: function (data) {
                    let code = data.returncode;
                    console.log(data)
                    if (code == 200) {
                        that.info2VideoAgentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.videoPlaybackList(data.data.totalPageNum, size);
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
                            that.AMtips1 = '请求成功';
                            setTimeout(function () {
                                that.AMtips1 = '';
                            }, 500);
                        }
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                            that.videoPlaybackList(that.page, that.size)
                        });
                    } else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function () {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
		},

		SvideoPlaybackList() {
			this.videoPlaybackList(this.page, this.size)
		},

		pageBegin() {
            const that = this;
            that.page = 1;
            that.videoPlaybackList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.videoPlaybackList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.videoPlaybackList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.videoPlaybackList(that.page, that.size);
        },
	},
	mounted() {
		this.$store.dispatch('tabChanger', 53);
        this.$store.dispatch('subChanger', 'sub8');

        this.videoPlaybackList(this.page, this.size);
        this.clearVideo();
	}
}
</script>