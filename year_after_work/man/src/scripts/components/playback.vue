<template id="">
    <div class="">
        <div class="info1">
            <div class="AM-top" style="margin-top: 10px;">
                <button style="float: left; margin-top: 3px;" type="button" class="btn btn-primary AM-add"
                        data-toggle='modal' data-target="#addAgentModal" @click="resetaddUnion($event)">新增
                </button>
                <span class="AM-tips1">{{AMtips1}}</span>
                <span class="AM-tips2">{{AMtips2}}</span>

            </div>
            <table class="table table-striped table-hover AM-table" style="margin-top: 60px;">
                <thead>
                <tr>
                    <th class="AM-agentID">序号</th>
                    <th>Pid</th>
                    <th>序号</th>
                    <th>房间名</th>
                    <th>封面图</th>
                    <th>详情图</th>
                    <th>文字简介</th>
                    <th>创建时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(agent, index) in agentL">
                    <td class="AM-agentID">{{agent._id}}</td>
                    <td>{{agent.pid}}</td>
                    <td>{{agent.order_no}}</td>
                    <td>{{agent.housename}}</td>
                    <td style="overflow: hidden"><a style="color:#777;font-size:24px;cursor: pointer;" data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(agent.cover)" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                    <td style="overflow: hidden"><a style="color:#777;font-size:24px;cursor: pointer;" data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(agent.detail_avatar)" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                    <td>{{agent.summary}}</td>
                    <td>{{moment(agent.create_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                    <td>
                        <i v-bind:class="agent.status == 0 ? 'fa fa-ellipsis-h AM-ellipsis' : ( agent.status == 1 ?'fa fa-check AM-check' : 'fa fa-times AM-times')"
                           aria-hidden="true"></i></td>

                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                                选择
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="javascript: void(0)" @click="seeInfo(agent._id)">详情</a></li>
                                <li><a href="javascript: void(0)"
                                       @click="resetUpdate(agent._id, agent.pid, agent.order_no, agent.housename, agent.cover, agent.detail_avatar, agent.summary, $event)"
                                       data-toggle='modal' data-target="#updateModal">编辑</a></li>
                                <li><a href="javascript: void(0)" @click="getVideo(agent._id)" data-toggle='modal'
                                       data-target="#delModal">删除</a></li>
                                <li><a href="javascript: void(0)" @click="startVideo(agent._id)">启用</a></li>
                                <li><a href="javascript: void(0)" @click="stopVideo(agent._id)">禁用</a></li>
                            </ul>

                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <nav class="AMnav">
                <ul class="pagination" v-if="pagesShow">
                    <li><a href="javascript:void(0);" @click="pageBegin(unionList, page, '')">Begin</a></li>
                    <li><a href="javascript:void(0);" @click="pagePre(unionList, page, '')">&laquo;</a></li>
                    <div class="pageL">
                        <li v-for="pageN in pageL">
                            <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''"
                               @click="unionList(pageN, size, '')">{{pageN}}</a>
                        </li>
                    </div>
                    <li><a href="javascript:void(0);" @click="pageNext(unionList, page, '')">&raquo;</a></li>
                    <li><a href="javascript:void(0);" @click="pageEnd(unionList, page, '')">End</a></li>
                </ul>
            </nav>
            <div class="modal fade bs-example-modal-lg" id="showImgModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
            <div class="modal fade bs-example-modal-lg" id="delModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <h4 class="modal-title" style="text-align: center">删除</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <h5 style="text-align: center;">是否确定删除？</h5>

                                <div class="addTips">
                                    {{delTips1}}
                                </div>
                                <div class="addTips2">
                                    {{delTips2}}
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="delVideo">确认</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <h4 class="modal-title" style="text-align: center">视频集锦</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">房间名 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="name" v-model.trim="newname">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Pid (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" style="width: 60%;height: 32px;padding-top: 6px;float: left" placeholder="pid" v-model.trim="newpid" @change="resetPid">
                                        <input class="btn btn-default" type="button" value="检查" style="float:left;height: 32px;margin: 0 30px;" @click="checkPid(newpid)"/>
                                        <div class="spinner" style="margin: 6px; float: right; margin-right: 30px;"
                                             v-if="upshow3">
                                            <div class="spinner-container container1">
                                                <div class="circle1"></div>
                                                <div class="circle2"></div>
                                                <div class="circle3"></div>
                                                <div class="circle4"></div>
                                            </div>
                                            <div class="spinner-container container2">
                                                <div class="circle1"></div>
                                                <div class="circle2"></div>
                                                <div class="circle3"></div>
                                                <div class="circle4"></div>
                                            </div>
                                            <div class="spinner-container container3">
                                                <div class="circle1"></div>
                                                <div class="circle2"></div>
                                                <div class="circle3"></div>
                                                <div class="circle4"></div>
                                            </div>
                                        </div>


                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Success==1">
                                            <i class="fa fa-check AM-check" aria-hidden="true"></i>
                                            正在直播
                                        </div>
                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Failure">
                                            <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                            未直播
                                        </div>
                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Error">
                                            <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                            Pid 不存在
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">封面图 (*)</label>
                                    <div class="col-sm-10" id="filep1">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload1" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep1" readOnly>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">详情图 (*)</label>
                                    <div class="col-sm-10" id="filep2">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload2" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep2" readOnly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">文字简介 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="summary" v-model.trim="newintro">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">序号 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="serial number" v-model.trim="newserial">
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
                            <button type="button" class="btn btn-primary" @click="addUnion">确认</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <h4 class="modal-title" style="text-align: center">视频集锦</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">房间名 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="name"
                                               v-model.trim="updatename">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Pid (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control"
                                               style="width: 30%;height: 32px;padding-top: 6px;float: left"
                                               placeholder="pid" v-model.trim="updatepid" @change="resetPid">
                                        <input class="btn btn-default" type="button" value="检查"
                                               style="float:left;height: 32px;margin: 0 30px;" @click="checkPid(updatepid)"/>
                                        <div class="spinner" style="margin: 6px; float: right; margin-right: 30px;"
                                             v-if="upshow3">
                                            <div class="spinner-container container1">
                                                <div class="circle1"></div>
                                                <div class="circle2"></div>
                                                <div class="circle3"></div>
                                                <div class="circle4"></div>
                                            </div>
                                            <div class="spinner-container container2">
                                                <div class="circle1"></div>
                                                <div class="circle2"></div>
                                                <div class="circle3"></div>
                                                <div class="circle4"></div>
                                            </div>
                                            <div class="spinner-container container3">
                                                <div class="circle1"></div>
                                                <div class="circle2"></div>
                                                <div class="circle3"></div>
                                                <div class="circle4"></div>
                                            </div>
                                        </div>


                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Success==1">
                                            <i class="fa fa-check AM-check" aria-hidden="true"></i>
                                            正在直播
                                        </div>
                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Failure">
                                            <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                            未直播
                                        </div>
                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Error">
                                            <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                            Pid 不存在
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">封面图 (*)</label>
                                    <div class="col-sm-10" id="filep3">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload3" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep3" readOnly>

<!-- 

                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="imgOk1">
                                            <i class="fa fa-check AM-check" aria-hidden="true"></i>
                                            上传成功
                                        </div>
                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="imgChecked1">
                                            <i class="fa fa-check AM-check" aria-hidden="true"></i>
                                            已选择，请上传
                                        </div>
                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="imgFail1">
                                            <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                            上传失败
                                        </div>
                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="imgCheck1">
                                            <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                            请选择
                                        </div>
                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="imgUpLoad1">
                                            <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                            请上传
                                        </div>
 -->
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">详情图 (*)</label>
                                    <div class="col-sm-10" id="filep4">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload4" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep4" readOnly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">文字简介 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="summary" v-model.trim="updateintro">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">序号 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="serial number" v-model.trim="updateserial">
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
                            <button type="button" class="btn btn-primary" @click="update">确认</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="info2" style="display:none;">
            <div class="AM-top" style="margin-top: 10px;">
                <button style="float: left; margin-top: 3px; margin-right:5%;" type="button" class="btn btn-primary AM-add" @click="goBack">返回上一页
                </button>
                <button style="float: left; margin-top: 3px;" type="button" class="btn btn-primary AM-add"
                        data-toggle='modal' data-target="#info2AddAgentModal" @click="info2ResetaddUnion">新增主播
                </button>
                <span class="AM-tips1" style="left:30%">{{info2AMtips1}}</span>
                <span class="AM-tips2">{{info2AMtips2}}</span>

            </div>
            <table class="table table-striped table-hover AM-table" style="margin-top: 60px;">
                <thead>
                <tr>
                    <th class="AM-agentID">序号</th>
                    <th>序号</th>
                    <th>主播ID</th>
                    <th>主播名字</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(agent, index) in info2AgentL">
                    <td class="AM-agentID">{{agent._id}}</td>
                    <td>{{agent.order_no}}</td>
                    <td>{{agent.pid}}</td>
                    <td>{{agent.loginname}}</td>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                                选择
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="javascript: void(0)" @click="info2GetVideoId(agent.id)">视频列表</a></li>
                                <!-- <li><a href="javascript: void(0)"
                                       @click="resetUpdate(agent._id, agent.pid, agent.order_no, agent.housename, agent.cover, agent.detail_avatar, agent.summary)"
                                       data-toggle='modal' data-target="#updateModal">编辑</a></li> -->
                                <li><a href="javascript: void(0)" @click="info2GetHostId(agent.id)" data-toggle='modal'
                                       data-target="#info2DelModal">删除</a></li>
                            </ul>

                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <nav class="AMnav">
                <ul class="pagination" v-if="info2PagesShow">
                    <li><a href="javascript:void(0);" @click="pageBegin(info2List, info2Page, highlightsid)">Begin</a></li>
                    <li><a href="javascript:void(0);" @click="pagePre(info2List, info2Page, highlightsid)">&laquo;</a></li>
                    <div class="pageL">
                        <li v-for="pageN in info2PageL">
                            <a href="javascript:void(0);" v-bind:class="pageN == info2Page ? 'activePage2' : ''"
                               @click="info2List(pageN, size, highlightsid)">{{pageN}}</a>
                        </li>
                    </div>
                    <li><a href="javascript:void(0);" @click="pageNext(info2List, info2Page, highlightsid)">&raquo;</a></li>
                    <li><a href="javascript:void(0);" @click="pageEnd(info2List, info2Page, highlightsid)">End</a></li>
                </ul>
            </nav>
            <div class="info2VideoBox" style="display:none;position:relative;">
                <div class="AM-top" style="margin-top: 10px;">
                    <button style="float: left; margin-top: 3px;" type="button" class="btn btn-primary AM-add"
                            data-toggle='modal' data-target="#info2AddVideoModal" @click="info2ResetAddVideo($event)">新增视频
                    </button>
                    <span class="AM-tips1">{{info2VideoAMtips1}}</span>
                    <span class="AM-tips2">{{info2VideoAMtips2}}</span>

                </div>
                <table class="table table-striped table-hover AM-table" style="margin-top: 60px;">
                    <thead>
                    <tr>
                        <th class="AM-agentID">序号</th>
                        <th>序号</th>
                        <th>封面图</th>
                        <th>播放地址</th>
                        <th>playback_date</th>
                        <th>创建时间</th>
                        <th>类型</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(agent, index) in info2VideoAgentL">
                        <td class="AM-agentID">{{agent._id}}</td>
                        <td>{{agent.order_no}}</td>
                        <td style="overflow: hidden"><a data-toggle='modal' data-target="#showImgModal2" style="color:#777;font-size:24px;cursor: pointer;" target="_blank" @click="getImgUrl(agent.cover)"><i class="fa fa-file-image-o" aria-hidden="true"></i></a></td>
                        <!-- <td style="overflow: hidden"><a v-bind:href="agent.playback_url" style="color:#777;font-size:24px" target="_blank">&raquo;</a></td> -->
                        <td><i data-toggle='modal' data-target="#videoModal" style="color:#777;font-size:24px;cursor: pointer;" @click="getVideoImg(agent.playback_url)" class="fa fa-video-camera" aria-hidden="true"></i></td>
                        <td>{{moment(agent.playback_date).format('YYYY-MM-DD HH:mm:ss')}}</td>
                        <td>{{moment(agent.create_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                        <td>{{agent.type}}</td>
                        <td>
                            <div class="btn-group">
                                <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                                    选择
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <!-- <li><a href="javascript: void(0)" @click="info2GetVideoList(agent.id)">编辑</a></li> -->
                                    <!-- <li><a href="javascript: void(0)"
                                           @click="info2VideoResetUpdate(agent._id, agent.type, agent.order_no, agent.cover, agent.playback_url, agent.playback_date, $event)"
                                           data-toggle='modal' data-target="#info2UpdateVideoModal">编辑</a></li> -->
                                    <li><a href="javascript: void(0)" @click="info2delVideoId(agent._id)" data-toggle='modal'
                                           data-target="#info2DelVideoModal">删除</a></li>
                                </ul>

                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <nav class="AMnav">
                    <ul class="pagination" v-if="info2VideoPagesShow">
                        <li><a href="javascript:void(0);" @click="pageBegin(info2GetVideoList, info2VideoPage, info2VideoId)">Begin</a></li>
                        <li><a href="javascript:void(0);" @click="pagePre(info2GetVideoList, info2VideoPage, info2VideoId)">&laquo;</a></li>
                        <div class="pageL">
                            <li v-for="pageN in info2VideoPageL">
                                <a href="javascript:void(0);" v-bind:class="pageN == info2VideoPage ? 'activePage2' : ''"
                                   @click="info2GetVideoList(pageN, size, info2VideoId)">{{pageN}}</a>
                            </li>
                        </div>
                        <li><a href="javascript:void(0);" @click="pageNext(info2GetVideoList, info2VideoPage, info2VideoId)">&raquo;</a></li>
                        <li><a href="javascript:void(0);" @click="pageEnd(info2GetVideoList, info2VideoPage, info2VideoId)">End</a></li>
                    </ul>
                </nav>
            </div>
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
            <div class="modal fade bs-example-modal-lg" id="info2DelModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <h4 class="modal-title" style="text-align: center">删除</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <h5 style="text-align: center;">是否确定删除？</h5>

                                <div class="addTips">
                                    {{delTips1}}
                                </div>
                                <div class="addTips2">
                                    {{delTips2}}
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="info2DelHost">确认</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade bs-example-modal-lg" id="info2DelVideoModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <h4 class="modal-title" style="text-align: center">删除</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <h5 style="text-align: center;">是否确定删除？</h5>

                                <div class="addTips">
                                    {{delTips1}}
                                </div>
                                <div class="addTips2">
                                    {{delTips2}}
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="info2DelVideo">确认</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade bs-example-modal-lg" id="info2AddAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <h4 class="modal-title" style="text-align: center">新增主播</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">主播ID (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="id" v-model.trim="info2HostId" @blur="getHost">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">主播名 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled placeholder="name" v-model.trim="info2HostName">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">序号 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="serial number" v-model.trim="info2Serial">
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
                            <button type="button" class="btn btn-primary" @click="info2AddUnion">确认</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade bs-example-modal-lg" id="info2AddVideoModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <h4 class="modal-title" style="text-align: center">新增视频</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">liveid (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" style="width: 60%;height: 32px;padding-top: 6px;float: left" placeholder="liveid" v-model.trim="newliveid" @change="resetPid">
                                        <input class="btn btn-default" type="button" value="检查" style="float:left;height: 32px;margin: 0 30px;" @click="checkLiveid(newliveid)"/>
                                        <div class="spinner" style="margin: 6px; float: right; margin-right: 30px;"
                                             v-if="upshow3">
                                            <div class="spinner-container container1">
                                                <div class="circle1"></div>
                                                <div class="circle2"></div>
                                                <div class="circle3"></div>
                                                <div class="circle4"></div>
                                            </div>
                                            <div class="spinner-container container2">
                                                <div class="circle1"></div>
                                                <div class="circle2"></div>
                                                <div class="circle3"></div>
                                                <div class="circle4"></div>
                                            </div>
                                            <div class="spinner-container container3">
                                                <div class="circle1"></div>
                                                <div class="circle2"></div>
                                                <div class="circle3"></div>
                                                <div class="circle4"></div>
                                            </div>
                                        </div>


                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Success==1">
                                            <i class="fa fa-check AM-check" aria-hidden="true"></i>
                                            可用
                                        </div>
                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Failure">
                                            <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                            不可用
                                        </div>
                                        <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Error">
                                            <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                            liveid 不存在
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">封面图 (*)</label>
                                    <div class="col-sm-10" id="filep5">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload5" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" v-model.trim="filep5" readOnly>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">播放地址 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="url" v-model.trim="info2VideoNewUrl" readOnly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">创建时间 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="创建时间" v-model.trim="createTime" readOnly>
                                    </div>
                                </div>
                                <!-- <div class="form-group">
                                    <label for="inputEmail3" class="col-sm-2 control-label">时间 (*)</label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-12 img_info_box">
                                            <div class="img_info">
                                                <input type="date" class="form-control" v-model.trim="info2VideoNewYMD">
                                            </div>
                                            <div class="img_info">
                                                <input type="time" class="form-control" placeholder="HH:MM:SS" v-model.trim="info2VideoNewHMS">
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                                <!-- <div class="form-group">
                                    <label class="col-sm-2 control-label">时间 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="time"
                                               v-model.trim="info2VideoNewTime">
                                    </div>
                                </div> -->
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">类型 (*)</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" name="" v-model.trim="info2VideoNewType">
                                            <option value="">类型</option>
                                            <option value="0">回放</option>
                                            <option value="1">小视频</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">序号 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="serial number" v-model.trim="info2VideoNewSerial">
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
                            <button type="button" class="btn btn-primary" @click="info2VideoAdd">确认</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade bs-example-modal-lg" id="info2UpdateVideoModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <h4 class="modal-title" style="text-align: center">修改视频</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">封面图 (*)</label>
                                    <div class="col-sm-10" id="filep6">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload6" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep6" readOnly>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">播放地址 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="url" v-model.trim="info2VideoUrl">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputEmail3" class="col-sm-2 control-label">时间 (*)</label>
                                    <div class="col-sm-10">
                                        <div class="col-sm-12 img_info_box">
                                            <div class="img_info">
                                                <input type="date" class="form-control" v-model.trim="info2VideoYMD">
                                            </div>
                                            <div class="img_info">
                                                <input type="time" class="form-control" placeholder="HH:MM:SS" v-model.trim="info2VideoHMS">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="form-group">
                                    <label class="col-sm-2 control-label">时间 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="time"
                                               v-model.trim="info2VideoTime">
                                    </div>
                                </div> -->
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">类型 (*)</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" name="" v-model.trim="info2VideoType">
                                            <option value="">类型</option>
                                            <option value="0">回放</option>
                                            <option value="1">小视频</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">序号 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="serial number" v-model.trim="info2VideoSerial">
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
                            <button type="button" class="btn btn-primary" @click="info2VideoUpdate">确认</button>
                        </div>
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
                qiniuDomain: 'http://i1.live.aisoqu.com/',
                agentL: [],
                moment: moment,
                newname: "",
                newavatar: 'http://www.qqxoo.com/uploads/allimg/170504/14002I561-10.jpg',
                newdetailavatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497256285840&di=42bb446d2052309661832abb42d9f2cd&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201508%2F27%2F20150827184112_JHy5S.jpeg',
                newintro: '',
                newserial: '',
                newpid: "",
                newliveid: "",

                updatename: "",
                updateavatar: "",
                updatedetailavatar: "",
                updateintro: '',
                updateserial: '',
                updatepid: "",

                upshow1: false,
                upshow2: false,
                upshow3: false,
                upshow3Success: 0,
                upshow3Failure: false,
                upshow3Error: false,
                imgFile1: "",
                imgFile2: "",


                addATips1: "",
                addATips2: "",
                upTips1: "",
                upTips2: "",
                delTips1: "",
                delTips2: "",
                page: 1,
                size: 10,
                pagesShow: false,
                pageL: [],
                agencyN: "",
                agencyUpID: "",
                playersID: "",
                AMtips1: "",
                AMtips2: "",
                info2AMtips1: "",
                info2AMtips2: "",
                info2VideoAMtips1: "",
                info2VideoAMtips2: "",
                countryID: "",
                newAcStartYMD: '',
                newAcStartHMS: '',
                newAcStopYMD: '',
                newAcStopHMS: '',
                players: [],
                newplayers: [
                    {
                        name: "",
                        order: null,
                        avatar: '',
                        voter_color: '',
                        voter_name: ''
                    },
                    {
                        name: "",
                        order: null,
                        avatar: '',
                        voter_color: '',
                        voter_name: ''
                    }
                ],
                medi_players: [],
                medi_newplayers: [],
                matchUrl: /^(((ht|f)tps?):\/\/)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,

                info2Page: 1,
                info2Size: 10,
                info2PagesShow: false,
                info2PageL: [],
                info2AgentL: [],
                info2HostId: '',
                info2HostName: '',
                info2Serial: '',
                info2LoginId: '',
                info2LoginName: '',
                info2Avatar: '',
                highlightsid: '',
                is_host: false,
                info2delId: '',

                info2VideoPage: 1,
                info2VideoSize: 10,
                info2VideoPagesShow: false,
                info2VideoPageL: [],
                info2VideoAgentL: [],
                info2VideoId: '',
                info2VideoNewImg: 'http://ali2.a.yximgs.com/upic/2017/06/05/09/BMjAxNzA2MDUwOTQ4NTlfNDI1MTg2MjkwXzIzMjYxNDI4OTFfMV8z_low.webp?tag=1-1496784944-h-0-inxtgfmzni-689752c3fc20fa80',
                info2VideoNewUrl: 'http://s1.live.aisoqu.com/BMjAxNzA2MDUwOTQ4NTlfNDI1MTg2MjkwXzIzMjYxNDI4OTFfMV8z_hd.mp4',
                info2VideoNewTime: '',
                info2VideoNewType: '',
                info2VideoNewSerial: '',
                info2VideoNewYMD: '',
                info2VideoNewHMS: '',

                info2VideoImg: '',
                info2VideoUrl: '',
                info2VideoTime: '',
                info2VideoType: '',
                info2VideoSerial: '',
                info2VideoYMD: '',
                info2VideoHMS: '',
                info2VideoUpdateId: '',
                info2DelVideoId: '',
                upload1: null,
                upload2: null,
                upload3: null,
                upload4: null,
                upload5: null,
                upload6: null,
                filep1: '',
                filep2: '',
                filep3: '',
                filep4: '',
                filep5: '',
                filep6: '',

                imgOk1: false,
                imgChecked1: false,
                imgFail1: false,
                imgCheck1: false,
                imgUpLoad1: false,

                imgOk2: false,
                imgChecked2: false,
                imgFail2: false,
                imgCheck2: false,
                imgUpLoad2: false,

                createTime: '',
                videoPlaybackUrl: '',
                myVideoHtml: '',
                myVideoPlay: '',
                showImgUrl: ''
            }
        },

        methods: {
            // getVideoImg(url) {
            //     const that = this;
            //     this.videoPlaybackUrl = url;
            //     this.myVideoHtml = '<video id="myVideo" style="height:500px" class="video-js vjs-default-skin" controls preload="auto" data-setup="{}"><source id="myUpdateVideo" src="'+url+'" type="application/x-mpegURL"></video>';
            //     $("#onlyOne").html(this.myVideoHtml);
            //     var videoUrl = document.getElementById('myUpdateVideo').getAttribute("src");
            //     if( videoUrl.lastIndexOf(".mp4") > -1 ){
            //         document.getElementById('myUpdateVideo').setAttribute("type", "video/mp4");
            //     }
            //     videojs('myVideo');
            // },
            // getImgUrl(url) {
            //     this.showImgUrl = url||'图片不存在';
            // },
            // clearVideo() {
            //     const that = this;
            //     $('#videoModal').on('hide.bs.modal', function () {
            //         $("#onlyOne").html("");
            //         videojs.getPlayers()['myVideo'].dispose();
            //         that.myVideoHtml = '';
            //     })
            // },
            getVideoImg(url) {
                const that = this;
                that.videoPlaybackUrl = url;
                if( that.videoPlaybackUrl === '' || that.videoPlaybackUrl === undefined ){
                    $("#onlyOne").html('视频不存在');
                }else{
                    that.myVideoHtml = '<video id="myVideo" class="video-js vjs-default-skin" controls preload="auto" data-setup="{}"><source id="myUpdateVideo" src="'+url+'" type="application/x-mpegURL"></video>';
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
                    if( that.videoPlaybackUrl === '' || that.videoPlaybackUrl === undefined ){
                        that.videoPlaybackUrl = '';
                    }else{
                        that.videoPlaybackUrl = '';
                        videojs.getPlayers()['myVideo'].dispose();
                        that.myVideoHtml = '';
                    }
                })
            },
            unionList(page, size, id) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/highlights/list',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        "page": page,
                        "size": size
                    },
                    success: function (data) {
                        let code = data.returncode;
                        // console.log(data)
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
                                setTimeout(function () {
                                    that.AMtips1 = '';
                                }, 500);
                            }
                        } else if (code == '301') {
                            console.log('参数错误');
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.unionList(that.page, that.size)
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


            getFileValues() {
                const that = this;
                that.upload1 = null;
                that.upload2 = null;
                that.upload3 = null;
                that.upload4 = null;
                that.upload5 = null;
                that.upload6 = null;
                for(var i = 0; i < 6; i++){
                    that.uploadImg('upload'+(i+1), 'filep'+(i+1));
                }
            },


            resetaddUnion() {
                const that = this;
                that.addATips1 = '';
                that.addATips2 = '';
                that.newname = "";
                that.newpid = "";
                that.filep1 =  "";
                that.filep2=  "";
                that.newintro = "";
                that.newserial = "";

                that.upshow1 = false;
                that.upshow2 = false;
                that.upshow3 = false;
                that.upshow3Success = 0;
                that.upshow3Failure = false;
                that.upshow3Error = false;


                // that.uploadImg();
            },

            resetUpdate(id, pid, order_no, housename, cover, detail_avatar, summary, e) {
                
                const that = this;
                that.getVideo(id);
                that.upshow3 = false;
                that.upshow3Success = 0;
                that.upshow3Failure = false;
                that.upshow3Error = false;
                that.updatepid = pid?pid:'';
                that.updateserial = order_no;
                that.updatename = housename;
                that.filep3 = cover;
                that.filep4 = detail_avatar;
                that.updateintro = summary;


            },

            uploadImg(fileId, filepId) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/qiniu/img/token',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "post",
                    success: function (data) {
                        that[fileId] = Qiniu.uploader({
                            runtimes: 'html5,flash,html4',    //上传模式,依次退化
                            browse_button: fileId,       //上传选择的点选按钮，**必需**
                            // uptoken_url: data.data.uptoken,            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                            uptoken : data.data.uptoken, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                            // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                            save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
                            domain: that.qiniuDomain,   //bucket 域名，下载资源时用到，**必需**
                            get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                            container: filepId,           //上传区域DOM ID，默认是browser_button的父元素，
                            max_file_size: '100mb',           //最大文件体积限制
                            // flash_swf_url: 'libs/Moxie.swf',  //引入flash,相对路径
                            max_retries: 3,                   //上传失败最大重试次数
                            dragdrop: true,                   //开启可拖曳上传
                            drop_element: filepId,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                            chunk_size: '4mb',                //分块上传时，每片的体积
                            auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                            init: {
                                'FilesAdded': function(up, files) {

                                    // console.log($(fileId))
                                    that[filepId] = '';
                                    plupload.each(files, function(file) {
                                        // 文件添加进队列后,处理相关的事情
                                    });
                                },
                                'BeforeUpload': function(up, file) {
                                    // 每个文件上传前,处理相关的事情
                                },
                                'UploadProgress': function(up, file) {
                                    // 每个文件上传时,处理相关的事情
                                },
                                'FileUploaded': function(up, file, info) {
                                    // 每个文件上传成功后,处理相关的事情
                                    // 其中 info 是文件上传成功后，服务端返回的json，形式如
                                    // {
                                    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                                    //    "key": "gogopher.jpg"
                                    //  }
                                    // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                                    // var domain = up.getOption('domain');
                                    // var res = parseJSON(info);
                                    // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                                    that[filepId] = that.qiniuDomain + JSON.parse(info.response).key;

                                },
                                'Error': function(up, err, errTip) {
                                    //上传出错时,处理相关的事情
                                    console.log('失败')
                                },
                                'UploadComplete': function() {
                                    //队列文件处理完毕后,处理相关的事情
                                },
                                'Key': function(up, file) {

                                    
                                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                                    // 该配置必须要在 unique_names: false , save_key: false 时才生效

                                    var key = "";
                                    // do something with key here
                                    return key
                                }
                            }
                        });
                    },
                    fail: function () {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            },




            resetPid() {
                const that = this;
                that.upshow3Success = 0;
                that.upshow3Failure = false;
                that.upshow3Error = false;
            },

            checkPid(pid) {
                const that = this;
                that.upshow3 = true;
                that.upshow3Success = 0;
                that.upshow3Error = false;
                that.upshow3Failure = false;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/live/get',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        pid: pid
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            if (!that.isEmptyObject(data.data)) {
                                that.upshow3 = false;
                                that.upshow3Error = false;
                                that.upshow3Failure = false;
                                that.upshow3Success = 1;
                            } else {
                                that.upshow3 = false;
                                that.upshow3Error = false;
                                that.upshow3Failure = true;
                                that.upshow3Success = 2;
                            }

                        } else if (data.returncode == 303 || 301) {
                            that.upshow3 = false;
                            that.upshow3Failure = false;
                            that.upshow3Success = 2;
                            that.upshow3Error = true;
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){
                                that.checkPid(pid);
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

            checkLiveid(liveid) {
                const that = this;
                that.upshow3 = true;
                that.upshow3Success = 0;
                that.upshow3Error = false;
                that.upshow3Failure = false;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/live/get',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        liveid: liveid
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            if (!that.isEmptyObject(data.data)) {
                                that.upshow3 = false;
                                that.upshow3Error = false;
                                that.upshow3Failure = false;
                                that.upshow3Success = 1;
                                that.info2VideoNewUrl = data.data.playback_url || '';
                                that.createTime = data.data.create_at ? that.moment(data.data.create_at).format('YYYY-MM-DD HH:mm:ss') : '';
                                that.filep5 = data.data.livesnapshot;
                            } else {
                                that.upshow3 = false;
                                that.upshow3Error = false;
                                that.upshow3Failure = true;
                                that.upshow3Success = 2;
                            }

                        } else if (data.returncode == 303 || 301) {
                            that.upshow3 = false;
                            that.upshow3Failure = false;
                            that.upshow3Success = 2;
                            that.upshow3Error = true;
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){
                                that.checkLiveid(liveid);
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

            isEmptyObject(e) {
                let t;
                for (t in e)
                    return !1;
                return !0
            },


            addUnion() {
                const that = this;
                that.addATips1 = '';
                that.addATips2 = '';
                if (that.newname === '' || that.newintro === '' || that.newserial === '' ) {
                    that.addATips1 = '请把信息补充完整';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if( that.filep1 === '' || that.imgChecked1 ) {
                    that.addATips1 = '上传封面图';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if( that.filep2 === '' || that.imgChecked2 ) {
                    that.addATips1 = '请上传详情图';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if ( that.newpid !== '' ){
                    if ( that.upshow3Success == 0 ){
                        that.addATips1 = '请检查pid';
                        setTimeout(function () {
                            that.addATips1 = '';
                        }, 1000);
                        return false;
                    } else if ( that.upshow3Success == 2 ){
                        that.addATips1 = '此 Pid 不满足正在直播的条件';
                        setTimeout(function () {
                            that.addATips1 = '';
                        }, 1000);
                        return false;
                    } else {
                        $.ajax({
                            url: that.$store.state.rootUrl3 + '/highlights/create',
                            type: "POST",
                            headers: {
                                "token": localStorage.getItem('A-TOKEN')
                            },
                            data: {
                                housename: that.newname,
                                pid: that.newpid,
                                order_no: that.newserial,
                                cover: that.filep1,
                                detail_avatar: that.filep2,
                                summary: that.newintro
                            },
                            success: function (data) {
                                let code = data.returncode;
                                if (code == '200') {
                                    that.addATips1 = '';
                                    that.addATips2 = '操作成功';
                                    setTimeout(function () {
                                        that.addATips2 = '';
                                        $('#addAgentModal').modal('hide');
                                        that.unionList(that.page, that.size)
                                    }, 500);
                                } else if (code == '104') {
                                    utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addUnion);
                                } else {
                                    utils.handleLogOut(data.returncode, that);
                                }
                            },
                            fail: function () {
                                console.log('Ajax Error');
                                utils.loginAgain(that);
                            }
                        })
                    }
                    
                } else {

                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/highlights/create',
                        type: "POST",
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        data: {
                            housename: that.newname,
                            pid: that.newpid,
                            order_no: that.newserial,
                            cover: that.filep1,
                            detail_avatar: that.filep2,
                            summary: that.newintro
                        },
                        success: function (data) {
                            let code = data.returncode;
                            if (code == '200') {
                                that.addATips1 = '';
                                that.addATips2 = '操作成功';
                                setTimeout(function () {
                                    that.addATips2 = '';
                                    $('#addAgentModal').modal('hide');
                                    that.unionList(that.page, that.size)
                                }, 500);
                            } else if (code == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addUnion);
                            } else {
                                utils.handleLogOut(data.returncode, that);
                            }
                        },
                        fail: function () {
                            console.log('Ajax Error');
                            utils.loginAgain(that);
                        }
                    })
                }
            },

            delVideo() {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/highlights/del',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": that.agencyUpID
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            that.delTips2 = '操作成功';
                            that.unionList(that.page, that.size);
                            setTimeout(function () {
                                that.delTips2 = '';
                                $('#delModal').modal('hide');
                            }, 500);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.delVideo);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function () {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                });
            },


            getVideo(id) {
                this.agencyUpID = id;
                this.addATips1 = '';
                this.addATips2 = '';
            },

            startVideo(id) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/highlights/enable',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": id
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.unionList(that.page, that.size);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){
                                that.startVideo(id);
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
            stopVideo(id) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/highlights/disable',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": id
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.unionList(that.page, that.size);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){
                                that.stopVideo(id);
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

            update() {
                const that = this;
                if (that.updatename === '' || that.updateintro === '' || that.updateserial === '') {
                    that.addATips1 = '请把信息补充完整';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if( that.filep3 === '' || that.imgChecked1 ) {
                    that.addATips1 = '上传封面图';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if( that.filep4 === '' || that.imgChecked2 ) {
                    that.addATips1 = '请上传详情图';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if ( that.updatepid !== '' || that.updatepid != '' ){
                    if ( that.upshow3Success == 0 ){
                        that.addATips1 = '请检查pid';
                        setTimeout(function () {
                            that.addATips1 = '';
                        }, 1000);
                        return false;
                    } else if ( that.upshow3Success == 2 ){
                        that.addATips1 = '此 Pid 不满足正在直播的条件';
                        setTimeout(function () {
                            that.addATips1 = '';
                        }, 1000);
                        return false;
                    } else {
                        $.ajax({
                            url: that.$store.state.rootUrl3 + '/highlights/update',
                            headers: {
                                "token": localStorage.getItem('A-TOKEN')
                            },
                            type: "POST",
                            data: {
                                id: that.agencyUpID,
                                housename: that.updatename,
                                pid: that.updatepid,
                                order_no: that.updateserial,
                                cover: that.filep3,
                                detail_avatar: that.filep4,
                                summary: that.updateintro
                            },
                            success: function (data) {
                                if (data.returncode == '200') {
                                    that.addATips1 = '';
                                    that.addATips2 = '操作成功';
                                    setTimeout(function () {
                                        that.addATips2 = '';
                                        $('#updateModal').modal('hide');
                                        that.unionList(that.page, that.size)
                                    }, 500);
                                } else if (data.returncode == '104') {
                                    utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                                } else {
                                    utils.handleLogOut(data.returncode, that);
                                }
                            },
                            fail: function () {
                                console.log('Ajax Error');
                                utils.loginAgain(that);
                            }
                        })
                    }
                } else {
                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/highlights/update',
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        type: "POST",
                        data: {
                            id: that.agencyUpID,
                            housename: that.updatename,
                            pid: that.updatepid,
                            order_no: that.updateserial,
                            cover: that.filep3,
                            detail_avatar: that.filep4,
                            summary: that.updateintro
                        },
                        success: function (data) {
                            if (data.returncode == '200') {
                                that.addATips1 = '';
                                that.addATips2 = '操作成功';
                                setTimeout(function () {
                                    that.addATips2 = '';
                                    $('#updateModal').modal('hide');
                                    that.unionList(that.page, that.size)
                                }, 500);
                            } else if (data.returncode == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                            } else {
                                utils.handleLogOut(data.returncode, that);
                            }
                        },
                        fail: function () {
                            console.log('Ajax Error');
                            utils.loginAgain(that);
                        }
                    })
                }

            },

            startVOTE(id) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/versus/vote/start',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": id
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.unionList(that.page, that.size);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.startVOTE(id)
                            });
                        } else if (data.returncode == '304') {
                            that.AMtips2 = '活动不存在';
                            setTimeout(function () {
                                that.AMtips2 = '';
                            }, 2000);
                        } else if (data.returncode == "305") {
                            that.AMtips2 = '活动已开始或已结束';
                            setTimeout(function () {
                                that.AMtips2 = '';
                            }, 2000);
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
            stopVOTE(id) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/versus/vote/stop',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": id
                    },
                    success: function (data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.unionList(that.page, that.size);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.stopVOTE(id)
                            });
                        } else if (data.returncode == '304') {
                            that.AMtips2 = '活动不存在';
                            setTimeout(function () {
                                that.AMtips2 = '';
                            }, 2000);
                        } else if (data.returncode == "305") {
                            that.AMtips2 = '活动已开始或已结束';
                            setTimeout(function () {
                                that.AMtips2 = '';
                            }, 2000);
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


            create_info(arr) {
                const that = this;
                that.newpname = "";
                that.neworder = "";
                that.filep1 = "";
                that.newcolor = "";
                that.newvotername = "";
                arr.push({
                    name: that.newpname,
                    order: that.neworder,
                    avatar: that.filep1,
                    voter_color: that.newcolor,
                    voter_name: that.newvotername
                },)
            },

            del_info(index, arr) {
                arr.splice(index, 1)
            },

            is_status(status){
                switch (status) {
                    case 0:
                        return "未开始";
                        break;
                    case 1:
                        return "开始";
                        break;
                    case 2:
                        return "已结束";
                        break;
                    case 3:
                        return "正在兑奖";
                        break;
                }
            },

            pageBegin(callback, page, id) {
                const that = this;
                page = 1;
                callback(page, that.size, id);
            },
            pageEnd(callback, page, id) {
                const that = this;
                page = Number.POSITIVE_INFINITY;
                callback(page, that.size, id);
            },
            pagePre(callback, page, id) {
                const that = this;
                if (page > 1) {
                    page--;
                    callback(page, that.size, id);
                } else {
                    return false;
                }

            },
            pageNext(callback, page, id) {
                const that = this;
                page++;
                callback(page, that.size, id);
            },



            seeInfo(id) {
                $('.info2').show().siblings().hide();
                this.highlightsid = id;
                this.info2List(this.info2Page, this.size, id)
            },

            goBack() {
                $('.info1').show().siblings().hide();
                this.unionList(this.page, this.size);
                $(".info2VideoBox").hide();
            },

            info2List(page, size, id) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/highlights/host/list',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        "page": page,
                        "size": size,
                        "highlightsid": id
                    },
                    success: function (data) {
                        let code = data.returncode;
                        // console.log(data)
                        if (code == 200) {
                            that.info2AgentL = data.data.data;
                            that.info2PagesShow = true;
                            if (page > data.data.totalPageNum) {
                                that.info2List(data.data.totalPageNum, size, id);
                                return false;
                            } else if (page <= 0) {
                                return false;
                            } else {
                                that.info2Page = page;
                                that.info2PageL = [];
                                let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                                let maxPage = Math.min(data.data.totalPageNum, Math.ceil(page / 5) * 5);
                                for (let i = pageStart; i <= maxPage; i++) {
                                    that.info2PageL.push(i);
                                }
                                that.info2AMtips1 = '请求成功';
                                setTimeout(function () {
                                    that.info2AMtips1 = '';
                                }, 500);
                            }
                        } else if (code == '301') {
                            console.log('参数错误');
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.info2List(that.info2Page, that.size, id)
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

            getHost() {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/host/get',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        "pid": that.info2HostId
                    },
                    success: function (data) {
                        var result = data.data;
                        if (data.returncode == '200') {
                            // that.addATips2 = '操作成功';
                            that.info2LoginId = result.loginid;
                            that.info2HostName = result.loginname;
                            that.info2Avatar = result.avatar;
                            that.is_host = true;
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.getHost);
                        } else if (data.returncode == '301') {
                            that.addATips1 = 'pid输入有误';
                            that.is_host = false;
                            setTimeout(function () {
                                that.addATips1 = '';
                            }, 2000);
                        } else if (data.returncode == "303") {
                            that.addATips1 = '找不到您所输入的主播';
                            that.is_host = false;
                            setTimeout(function () {
                                that.addATips1 = '';
                            }, 2000);
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

            info2ResetaddUnion() {
                const that = this;
                that.addATips1 = '';
                that.addATips2 = '';
                that.info2HostId = '';
                that.info2HostName = '';
                that.info2Serial = '';
                that.info2LoginId = '';
                that.info2LoginName = '';
                that.info2Avatar = '';

                that.imgChecked1 = false;
                that.imgFail1 = false;
                that.imgCheck1 = false;
                that.imgUpLoad1 = false;
                that.imgOk1 = false;
            },

            info2AddUnion() {
                const that = this;
                that.addATips1 = '';
                that.addATips2 = '';
                if (that.info2HostId === '' || that.info2HostName === '' || that.info2Serial === '' ) {
                    that.addATips1 = '请把信息补充完整';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else {

                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/highlights/host/add',
                        type: "POST",
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        data: {
                            "loginname": that.info2HostName,
                            "pid": that.info2HostId,
                            "order_no": that.info2Serial,
                            "avatar": that.info2Avatar,
                            "loginid": that.info2LoginId,
                            "highlightsid": that.highlightsid
                        },
                        success: function (data) {
                            let code = data.returncode;
                            if (code == '200') {
                                that.addATips1 = '';
                                that.addATips2 = '操作成功';
                                setTimeout(function () {
                                    that.addATips2 = '';
                                    $('#info2AddAgentModal').modal('hide');
                                    that.info2List(that.info2Page, that.size, that.highlightsid)
                                }, 500);
                            } else if (code == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.info2AddUnion);
                            } else {
                                utils.handleLogOut(data.returncode, that);
                            }
                        },
                        fail: function () {
                            console.log('Ajax Error');
                            utils.loginAgain(that);
                        }
                    })
                }
            },

            info2GetHostId(id) {
                this.info2delId = id;
            },

            info2DelHost() {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/highlights/host/del',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": that.info2delId
                    },
                    success: function (data) {
                        var result = data.data;
                        if (data.returncode == '200') {
                            that.delTips2 = '操作成功';
                            that.info2List(that.info2Page, that.size,  that.highlightsid);
                            setTimeout(function () {
                                that.delTips2 = '';
                                $('#info2DelModal').modal('hide');
                            }, 500);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.info2DelHost );
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


            info2GetVideoId(id) {
                const that = this;
                that.info2VideoId = id;
                $(".info2VideoBox").show();
                that.info2GetVideoList(that.info2VideoPage, that.size, that.info2VideoId)
            },

            info2GetVideoList(page, size, id) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/highlights/video/list',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        "page": page,
                        "size": size,
                        "hostid": id
                    },
                    success: function (data) {
                        let code = data.returncode;
                        if (code == 200) {
                            that.info2VideoAgentL = data.data.data;
                            that.info2VideoPagesShow = true;
                            if (page > data.data.totalPageNum) {
                                that.info2GetVideoList(data.data.totalPageNum, size, id);
                                return false;
                            } else if (page <= 0) {
                                return false;
                            } else {
                                that.info2VideoPage = page;
                                that.info2VideoPageL = [];
                                let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                                let maxPage = Math.min(data.data.totalPageNum, Math.ceil(page / 5) * 5);
                                for (let i = pageStart; i <= maxPage; i++) {
                                    that.info2VideoPageL.push(i);
                                }
                                that.info2VideoAMtips1 = '请求成功';
                                setTimeout(function () {
                                    that.info2VideoAMtips1 = '';
                                }, 500);
                            }
                        } else if (code == '301') {
                            console.log('参数错误');
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function () {
                                that.info2GetVideoList(that.info2VideoPage, that.size, that.info2VideoId)
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

            info2ResetAddVideo(e) {
                
                const that = this;
                that.addATips1 = "";
                that.addATips2 = "";
                that.newliveid = "";
                that.filep5 = "";
                that.info2VideoNewUrl = "";
                that.info2VideoNewYMD = "";
                that.info2VideoNewHMS = "";
                that.info2VideoNewType = "";
                that.info2VideoNewSerial = "";

                that.imgChecked1 = false;
                that.imgFail1 = false;
                that.imgCheck1 = false;
                that.imgUpLoad1 = false;
                that.imgOk1 = false;

                that.upshow1 = false;
                that.upshow2 = false;
                that.upshow3 = false;
                that.upshow3Success = 0;
                that.upshow3Failure = false;
                that.upshow3Error = false;
            },

            info2VideoAdd() {
                const that = this;
                // if ( that.filep5 === '' || that.imgChecked1 ) {
                //     that.addATips1 = '上传封面图';
                //     setTimeout(function () {
                //         that.addATips1 = '';
                //     }, 500);
                //     return false;
                // } else 
                // else if ( !that.matchUrl.test( that.info2VideoNewUrl ) ){
                //     that.addATips1 = '请填写正确video路径';
                //     setTimeout(function () {
                //         that.addATips1 = '';
                //     }, 1000);
                //     return false;
                // }that.info2VideoNewUrl === '' || that.info2VideoNewYMD === '' || that.info2VideoNewHMS === '' || 
                if( that.newliveid === '' ) {

                    that.addATips1 = '请输入liveid';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;

                } else if( that.upshow3Success == 0 ) {

                    that.addATips1 = '请检查liveID';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;

                } else if( that.upshow3Success == 2 ) {

                    that.addATips1 = '此liveID不符合要求';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                    
                } else if( that.filep5 == '' || that.info2VideoNewUrl == '' || that.createTime == '' ) {

                    that.addATips1 = '此房间没有可供播放的视频';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;

                } else if ( that.info2VideoNewType === '' ){

                    that.addATips1 = '请选择类型';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;

                } else if ( that.info2VideoNewSerial === '' ){

                    that.addATips1 = '请输入序号';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;

                } else {

                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/highlights/video/add',
                        type: "POST",
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        data: {
                            "hostid": that.info2VideoId,
                            "type": that.info2VideoNewType,
                            "cover": that.filep5,
                            // "create_at": ,
                            "liveid": that.newliveid,
                            "playback_url": that.info2VideoNewUrl,
                            // "playback_date": [that.info2VideoNewYMD, that.info2VideoNewHMS].join(" "),
                            "playback_date": that.createTime,
                            "order_no": that.info2VideoNewSerial
                        },
                        success: function (data) {
                            let code = data.returncode;
                            if (code == '200') {
                                that.addATips1 = '';
                                that.addATips2 = '操作成功';
                                setTimeout(function () {
                                    that.addATips2 = '';
                                    $('#info2AddVideoModal').modal('hide');
                                    that.info2GetVideoList(that.info2VideoPage, that.size, that.info2VideoId)
                                }, 500);
                            } else if (code == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.info2VideoAdd);
                            } else {
                                utils.handleLogOut(data.returncode, that);
                            }
                        },
                        fail: function () {
                            console.log('Ajax Error');
                            utils.loginAgain(that);
                        }
                    })
                }
            },


            info2VideoResetUpdate(id, type, order_no, cover, playback_url, playback_date, e) {
                
                const that = this;
                var videoTime = moment(playback_date).format('YYYY-MM-DD HH:mm:ss');
                that.info2VideoUpdateId = id;
                that.info2VideoType = type;
                that.info2VideoSerial = order_no;
                that.filep6 = cover;
                that.info2VideoUrl = playback_url;
                that.info2VideoYMD = videoTime.split(" ")[0];
                that.info2VideoHMS = videoTime.split(" ")[1];

                that.imgChecked1 = false;
                that.imgFail1 = false;
                that.imgCheck1 = false;
                that.imgUpLoad1 = false;
                that.imgOk1 = false;
            },

            info2VideoUpdate() {
                const that = this;
                if ( that.filep6 === '' || that.imgChecked1 ) {
                    that.addATips1 = '请上传封面图';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if ( that.info2VideoUrl === '' || that.info2VideoYMD === '' || that.info2VideoHMS === '' || that.info2VideoType === '' || that.info2VideoSerial === '' ){

                    that.addATips1 = '请把信息补充完整';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;


                } else if ( !that.matchUrl.test( that.info2VideoUrl ) ){
                    that.addATips1 = '请填写正确video路径';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 1000);
                    return false;
                } else {

                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/highlights/video/update',
                        type: "POST",
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        data: {
                            "id": that.info2VideoUpdateId,
                            "type": that.info2VideoType,
                            "cover": that.filep6,
                            "playback_url": that.info2VideoUrl,
                            "playback_date": [that.info2VideoYMD, that.info2VideoHMS].join(" "),
                            "order_no": that.info2VideoSerial
                        },
                        success: function (data) {
                            let code = data.returncode;
                            if (code == '200') {
                                that.addATips1 = '';
                                that.addATips2 = '操作成功';
                                setTimeout(function () {
                                    that.addATips2 = '';
                                    $('#info2UpdateVideoModal').modal('hide');
                                    that.info2GetVideoList(that.info2VideoPage, that.size, that.info2VideoId)
                                }, 500);
                            } else if (code == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.info2VideoUpdate);
                            } else {
                                utils.handleLogOut(data.returncode, that);
                            }
                        },
                        fail: function () {
                            console.log('Ajax Error');
                            utils.loginAgain(that);
                        }
                    })
                }
            },

            info2delVideoId(id) {
                this.info2DelVideoId = id;
            },

            info2DelVideo() {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/highlights/video/del',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": that.info2DelVideoId
                    },
                    success: function (data) {
                        var result = data.data;
                        if (data.returncode == '200') {
                            that.delTips2 = '操作成功';
                            that.info2GetVideoList(that.info2VideoPage, that.size, that.info2VideoId)
                            setTimeout(function () {
                                that.delTips2 = '';
                                $('#info2DelVideoModal').modal('hide');
                            }, 500);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.info2DelVideo );
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function () {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }

        },




        mounted() {
            this.$store.dispatch('tabChanger', 49);
            this.$store.dispatch('subChanger', 'sub8');
            this.getFileValues();
            this.unionList(this.page, this.size);
            this.clearVideo();
        }
    }
</script>
