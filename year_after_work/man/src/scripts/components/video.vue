<template id="">
<div class="">
    <div class="AM-top" style="margin-top: 10px; overflow: hidden;">
        <button style="float: left; margin-right: 50px;" type="button" class="btn btn-primary AM-add">路人列表</button>
        <button style="float: left" type="button" class="btn btn-primary AM-add">主播列表</button>

        <div class="AM-topR" style="float: right; margin-right: 3.9%; margin-bottom: 25px;">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入Pid" v-model.trim="pid">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true"></i>
        </div>



    </div>

    <div class="panel panel-default">
        <!-- Default panel contents -->
        <!-- <div class="panel-heading">Panel heading</div> -->
        <div class="panel-body">
            <ul class='videoul'>
                <li v-for="videoUnit in videoL">
                    <div class="thumbnail">
                        <div :id=renameid(videoUnit.liveid)>
                            <video :id=videoUnit.liveid  width=280 height=200 class="video-js vjs-default-skin" controls :poster=videoUnit.livesnapshot>
                            </video>
                        </div>
                    </div>
                    <div class="caption">
                        <p>PID: {{videoUnit.pid}} </p>
                        <p>用户名: {{videoUnit.pid}} </p>
                        <button type="button" class="btn btn-primary">刷新</button>
                    </div>
                </li>
            </ul>
        </div>


        <!-- html += '<div class="thumbnail">';
        html += '<div id="s_' + video.liveid + '">';
        html += '<video id="' + video.liveid + '" width=280 height=200 class="video-js vjs-default-skin" controls poster="' + video.livesnapshot + '"> </video>';
        html += '</div>';
        html += '<div class="caption">';
        html += '<p>PID:' + video.pid + '</p>';
        html += '<p>用户名:' + video.hostname + '</p>';
        html += '<p>';
        html += '<button type="button" class="btn btn-primary" value="' + video.liveid + '#' + video.andr_pull_stream + "#" + video.liveid + '">刷新</button>';
        html += '<button type="button" class="btn btn-danger"  value="' + video.liveid + '#' + video.loginid + '" data-toggle="modal" data-target="#liveModal" data-whatever="@getbootstrap">禁播</button>';
        html += '</p>';
        html += '</div>';
        html += '</div>'; -->



        <!-- List group -->
        <!-- <ul class="list-group">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
        </ul> -->
    </div>

    <nav class="AMnav">
        <ul class="pagination" v-if="pagesShow" style="width: 80%; display: flex; justify-content: space-between; margin: 0 auto;">
            <li><a style="margin: 0 15px; border-radius: 5px;" href="javascript:void(0);" @click="pageBegin">Begin</a></li>
            <li><a style="margin: 0 15px; border-radius: 5px;" href="javascript:void(0);" @click="pagePre">&nbsp;&nbsp;前一页&nbsp;&nbsp;</a></li>
            <div class="pageL" style="width: 40%; margin: 0 auto; display: flex; justify-content: center">
                <li v-for="pageN in pageL">
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="List(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a style="margin: 0 15px; border-radius: 5px;" href="javascript:void(0);" @click="pageNext">&nbsp;&nbsp;后一页&nbsp;&nbsp;</a></li>
            <li><a style="margin: 0 15px; border-radius: 5px;" href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>
</div>
</template>

<script>
import utils from '../utils/utils.js';

export default {
    data() {
        return {
            'pid': '',
            'page': 1,
            'size': 12,
            'pageL': [],
            'videoL': [],
            'isSigned': 0,
        }
    },

    methods: {
        loadLiveVideoList(page, size) {
            const that = this;
            //clear video in cache
            //delete videojs.getPlayers();
            for (var key in videojs.getPlayers()) {
                videojs.getPlayers()[key].dispose();
                delete videojs.getPlayers()[key];
            }

            // $("#user_role").empty();
            that.videoL = [];
            $.ajax({
                url: that.$store.state.rootUrl3 + "/live/list",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    "status": 1,
                    "isSigned": that.isSigned,
                    "pid": that.pid
                },
                success: function(data) {
                    console.log(data)

                    if (utils.handlerErr(that, data.returncode, function() {
                            that.loadLiveVideoList(page, size)
                        })) {
                        // console.log(data.returncode);
                        that.videoL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.loadLiveVideoList(data.data.totalPageNum, size);
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
                            // that.AMtips1 = '请求成功';
                            // setTimeout(function() {
                            //     that.AMtips1 = '';
                            // }, 500);
                        }




                        var ids = [];
                        var html = '';
                        for (var i = 0; i < data.length; i++) {
                            var video = data[i];
                            html += '<div class="col-sm-6 col-md-4">';
                            html += '<div class="thumbnail">';
                            html += '<div id="s_' + video.liveid + '">';
                            html += '<video id="' + video.liveid + '" width=280 height=200 class="video-js vjs-default-skin" controls poster="' + video.livesnapshot + '"> </video>';
                            html += '</div>';
                            html += '<div class="caption">';
                            html += '<p>PID:' + video.pid + '</p>';
                            html += '<p>用户名:' + video.hostname + '</p>';
                            html += '<p>';
                            html += '<button type="button" class="btn btn-primary" value="' + video.liveid + '#' + video.andr_pull_stream + "#" + video.liveid + '">刷新</button>';
                            html += '<button type="button" class="btn btn-danger"  value="' + video.liveid + '#' + video.loginid + '" data-toggle="modal" data-target="#liveModal" data-whatever="@getbootstrap">禁播</button>';
                            html += '</p>';
                            html += '</div>';
                            html += '</div>';

                            html += '</div>';
                        }


                        $("#user_role").append(html);

                        for (var j = 0; j < data.length; j++) {
                            var v = data[j];
                            play(v.liveid, v.andr_pull_stream);
                        }
                    }



                    if (code == 200) {
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
                            that.AMtips1 = '请求成功';
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.unionList(that.page, that.size)
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

            // $.get(that.$store.state.rootUrl3 + "/live/list", {
            //     "page": that.page,
            //     "size": that.size,
            //     "status": 1,
            //     "isSigned": "isSinged",
            //     "pid": that.pid
            // }, function(result) {
            //     if (utils.handlerErr(that, result)) {
            //         alert('344')
            //         var data = result.data.data;
            //         if (pageNum == 0) {
            //             $(".previous").toggleClass("disabled", true);
            //         } else {
            //             $(".previous").toggleClass("disabled", false);
            //         }
            //         totalPageNum = Math.ceil(result.data.total / pageSize) - 1;
            //         if (pageNum >= totalPageNum) {
            //             $(".next").toggleClass("disabled", true);
            //         } else {
            //             $(".next").toggleClass("disabled", false);
            //         }
            //
            //
            //         var ids = [];
            //         var html = '';
            //         for (var i = 0; i < data.length; i++) {
            //             var video = data[i];
            //             html += '<div class="col-sm-6 col-md-4">';
            //             html += '<div class="thumbnail">';
            //             html += '<div id="s_' + video.liveid + '">';
            //             html += '<video id="' + video.liveid + '" width=280 height=200 class="video-js vjs-default-skin" controls poster="' + video.livesnapshot + '"> </video>';
            //             html += '</div>';
            //             html += '<div class="caption">';
            //             html += '<p>PID:' + video.pid + '</p>';
            //             html += '<p>用户名:' + video.hostname + '</p>';
            //             html += '<p>';
            //             html += '<button type="button" class="btn btn-primary" value="' + video.liveid + '#' + video.andr_pull_stream + "#" + video.liveid + '">刷新</button>';
            //             html += '<button type="button" class="btn btn-danger"  value="' + video.liveid + '#' + video.loginid + '" data-toggle="modal" data-target="#liveModal" data-whatever="@getbootstrap">禁播</button>';
            //             html += '</p>';
            //             html += '</div>';
            //             html += '</div>';
            //
            //             html += '</div>';
            //         }
            //
            //
            //         $("#user_role").append(html);
            //
            //         for (var j = 0; j < data.length; j++) {
            //             var v = data[j];
            //             play(v.liveid, v.andr_pull_stream);
            //         }
            //     }
            //
            // });
        },

        renameid(id) {
            return 's_' + id;
        },
        renamevalue(liveid, stream) {
            return liveid + '#' + stream
        },

        List() {

        },

        pagesShow() {

        },

        pageBegin() {
            const that = this;
            that.page = 1;
            that.List(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.List(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.List(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.List(that.page, that.size);
        },




    },

    mounted() {
        this.$store.dispatch('tabChanger', 35);
        this.loadLiveVideoList(this.page, this.size);
    }
}
</script>
