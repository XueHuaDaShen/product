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
                <th>Award video</th>
                <th>Number of praise</th>
                <th>operation</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.pid}}</td>
                <td>{{admin.loginname}}</td>
                <td><i data-toggle='modal' data-target="#updateModal" style="font-size:24px;cursor: pointer;" @click="getVideoFn(admin.playback_url)" class="fa fa-video-camera" aria-hidden="true"></i></td>
                <td>{{admin.val}}</td>
                <td>
                    <button type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#delModal" @click="getDelId(admin.shortid)">
                      filter
                    </button>
                    <!-- <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#delModal" @click="getDelId(admin.shortid)">删除</a></li>
                        </ul>
                    </div> -->
                </td>
            </tr>

        </tbody>
    </table>

    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">video</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <div class="col-sm-12" style="display:-webkit-box;-webkit-box-pack:center;">
                                <div class="col-sm-8"><video :src="videoUrl" controls="controls" style="width:100%;height:auto"></video></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">url (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="url" v-model.trim="videoUrl" readOnly>
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Confirm</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bs-example-modal-lg" id="delModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">Filter video</h4>
                </div>
                <div class="modal-body">
                    <!-- Pid <span class = "acdel1">{{delPid}}</span> 的 <span class = acdel1>{{delN}}</span> -->
                    <h5 style="text-align:center;">Do you confirm the filtering of this video</h5>
                    <div class="addTips">
                        {{upTips1}}
                    </div>
                    <div class="addTips2">
                        {{upTips2}}
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="filterFn">Confirm</button>
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
            addTips: '',
            addTips2: '',
            adminL: [],
            upTips1: '',
            upTips2: '',
            filterId: '',
            videoUrl: ''
        }
    },

    methods: {

        adminList() {
            const that = this;
            $.ajax({
                url: 'http://123.56.6.6:8040/api/v2/bi/rank/dec/videorank',
                // url: 'https://dee.tutulive.tv:8447/api/v2/bi/rank/dec/videorank',
                type: "GET",
                success: function(data) {
                    if (data.returncode == '200') {
                        that.adminL = [];
                        that.adminL = data.data;
                        that.AMtips1 = 'Request success';;
                        setTimeout(function() {
                            that.AMtips1 = '';
                        }, 500);

                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.adminList);
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

        getDelId(id) {
            this.filterId = id;
        },

        getVideoFn(url) {
            const that = this;
            this.videoUrl = url;
            console.log()
            $("#updateModal").on("hide.bs.modal", function(){
                that.videoUrl = "";
                that.imgUrl = "";
            })
        },

        filterFn() {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/cache/dec/ignorevideo/add',
                type: "post",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    shortid: that.filterId
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.upTips1 = '';
                        that.upTips2 = 'Successful operation';
                        that.adminList();
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#delModal').modal('hide');
                        }, 500);

                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.filterFn);
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        }

    },


    mounted() {
        this.$store.dispatch('tabChanger', 62);
        this.$store.dispatch('subChanger', 'sub9');

        // console.log(this.$store.state.tabIndex);
        this.adminList();
    }
}
</script>
