<template id="">
    <div class="">
        <div class="info1">
            <div class="AM-top" style="margin-top: 10px;">
                <button style="float: left; margin-top: 3px;" type="button" class="btn btn-primary AM-add"
                        data-toggle='modal' data-target="#addAgentModal" @click="resetaddTopic($event)">新增主题
                </button>
                <span class="AM-tips1">{{AMtips1}}</span>
                <span class="AM-tips2">{{AMtips2}}</span>

            </div>
            <table class="table table-striped table-hover AM-table" style="margin-top: 60px;">
                <thead>
                <tr>
                    <th class="AM-agentID">序号</th>
                    <th>主题名称</th>
                    <th>主题图片</th>
                    <th>order</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(agent, index) in agentL">
                    <td class="AM-agentID">{{agent._id}}</td>
                    <td>{{agent.name}}</td>
                    <td style="overflow: hidden"><a style="color:#777;font-size:24px;cursor: pointer;" data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(agent.img_url)" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                    <td>{{agent.order}}</td>
                    <td>
                        <i v-bind:class="agent.enable == 0 ? 'fa fa-ellipsis-h AM-ellipsis' : ( agent.enable == 1 ?'fa fa-check AM-check' : 'fa fa-times AM-times')"
                           aria-hidden="true"></i></td>

                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                                选择
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="javascript: void(0)" @click="seeInfo(agent._id, agent.name)">表情列表</a></li>
                                <li><a href="javascript: void(0)"
                                       @click="resetTopicUpdate(agent._id, agent.name, agent.img_url, agent.order)"
                                       data-toggle='modal' data-target="#updateModal">编辑</a></li>
                                <li><a href="javascript: void(0)" @click="getEmoticonId(agent._id)" data-toggle='modal'
                                       data-target="#delModal">删除</a></li>
                                <li v-if="agent.enable==0" ><a href="javascript: void(0)" @click="startEmoticon(agent._id)">启用</a></li>
                                <li v-if="agent.enable==1" ><a href="javascript: void(0)" @click="stopEmoticon(agent._id)">禁用</a></li>
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
                            <h4 class="modal-title" id="myModalLabel" style="text-align: center">Image</h4>
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
                            <h4 class="modal-title" style="text-align: center">新增主题</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">主题名 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="name" v-model.trim="newname">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">order (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="order" v-model.trim="newTopicOrder">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">封面图 (*)</label>
                                    <div class="col-sm-10" id="filep1">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload1" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep1" readOnly>

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
                            <button type="button" class="btn btn-primary" @click="addTopic">确认</button>
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
                            <h4 class="modal-title" style="text-align: center">修改主题</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">主题名 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="name"
                                               v-model.trim="updatename">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">order (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" placeholder="order"
                                               v-model.trim="updateTopicOrder">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">主题图片 (*)</label>
                                    <div class="col-sm-10" id="filep2">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload2" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep2" readOnly>
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
                        data-toggle='modal' data-target="#emoticonAddAgentModal" @click="emoticonResetAddFn">新增表情
                </button>
                <span class="AM-tips1" style="left:30%">{{info2AMtips1}}</span>
                <span class="AM-tips2">{{info2AMtips2}}</span>

            </div>
            <table class="table table-striped table-hover AM-table" style="margin-top: 60px;">
                <thead>
                <tr>
                    <th class="AM-agentID">序号</th>
                    <th>主题名称</th>
                    <th>主题图片</th>
                    <th>zh</th>
                    <th>en</th>
                    <th>th</th>
                    <th>order</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(agent, index) in info2AgentL">
                    <td class="AM-agentID">{{agent._id}}</td>
                    <td>{{agent.topic_name}}</td>
                    <td style="overflow: hidden"><a style="color:#777;font-size:24px;cursor: pointer;" data-toggle='modal' data-target="#showImgModal1" @click="getImgUrl(agent.topic_img_url)" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                    <td style="overflow: hidden"><a style="color:#777;font-size:24px;cursor: pointer;" data-toggle='modal' data-target="#ZHshowImgModal" @click="getImgUrl(agent.zh.url)" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                    <td style="overflow: hidden"><a style="color:#777;font-size:24px;cursor: pointer;" data-toggle='modal' data-target="#ENshowImgModal" @click="getImgUrl(agent.en.url)" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                    <td style="overflow: hidden"><a style="color:#777;font-size:24px;cursor: pointer;" data-toggle='modal' data-target="#THshowImgModal" @click="getImgUrl(agent.th.url)" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                    <th>{{agent.order}}</th>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                                选择
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="javascript: void(0)"
                                       @click="resetEmoticonUpdate(agent._id, agent.zh, agent.en, agent.th, agent.order)"
                                       data-toggle='modal' data-target="#emoticonUpdateModal">编辑</a></li>
                                <li><a href="javascript: void(0)" @click="info2GetHostId(agent._id)" data-toggle='modal'
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
            <div class="modal fade bs-example-modal-lg" id="showImgModal1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title" id="myModalLabel" style="text-align: center">Image</h4>
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
            <div class="modal fade bs-example-modal-lg" id="ZHshowImgModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title" id="myModalLabel" style="text-align: center">Image</h4>
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
            <div class="modal fade bs-example-modal-lg" id="ENshowImgModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title" id="myModalLabel" style="text-align: center">Image</h4>
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
            <div class="modal fade bs-example-modal-lg" id="THshowImgModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title" id="myModalLabel" style="text-align: center">Image</h4>
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
            <div class="modal fade bs-example-modal-lg" id="showImgModal2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title" id="myModalLabel" style="text-align: center">Image</h4>
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
            <div class="modal fade bs-example-modal-lg" id="emoticonAddAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <h4 class="modal-title" style="text-align: center">新增表情</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">主题名称 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="test" class="form-control" v-model.trim="topic_name" readOnly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">order (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model.trim="emoticonNewOrder">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">ZH (*)</label>
                                    <div class="col-sm-10" id="filep3">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload3" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep3" readOnly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">EN (*)</label>
                                    <div class="col-sm-10" id="filep4">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload4" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep4" readOnly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">TH (*)</label>
                                    <div class="col-sm-10" id="filep5">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload5" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep5" readOnly>
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
                            <button type="button" class="btn btn-primary" @click="emoticonAddFn">确认</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade bs-example-modal-lg" id="emoticonUpdateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                    class="sr-only">Close</span></button>
                            <h4 class="modal-title" style="text-align: center">修改表情</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">主题名称 (*)</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model.trim="topic_name" readOnly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">order (*)</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model.trim="emoticonUpdateOrder">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">ZH (*)</label>
                                    <div class="col-sm-10" id="filep6">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload6" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep6" readOnly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">EN (*)</label>
                                    <div class="col-sm-10" id="filep7">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload7" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep7" readOnly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">TH (*)</label>
                                    <div class="col-sm-10" id="filep8">
                                        <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload8" class="myfile" ref="img1">
                                        <input type="text" class="form-control" style="width:60%" :value="filep8" readOnly>
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
                            <button type="button" class="btn btn-primary" @click="emoticonUpdateFn">确认</button>
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

                updatename: "",

                newTopicOrder: "",
                updateTopicOrder: "",

                emoticonNewOrder: "",
                emoticonUpdateOrder: "",


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
                agencyUpID: "",
                AMtips1: "",
                AMtips2: "",
                info2AMtips1: "",
                info2AMtips2: "",

                matchUrl: /^(((ht|f)tps?):\/\/)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,

                info2Page: 1,
                info2Size: 10,
                info2PagesShow: false,
                info2PageL: [],
                info2AgentL: [],
                highlightsid: '',
                info2delId: '',

                upload1: null,
                upload2: null,
                upload3: null,
                upload4: null,
                upload5: null,
                upload6: null,
                upload7: null,
                upload8: null,
                filep1: '',
                filep2: '',
                filep3: '',
                filep4: '',
                filep5: '',
                filep6: '',
                filep7: '',
                filep8: '',

                showImgUrl: '',

                topic_name: '',
                emoticonUpdateId: ''
            }
        },

        methods: {
            getImgUrl(url) {
                this.showImgUrl = url||'图片不存在';
            },
            unionList(page, size, id) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/emoticon/topic/list',
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
                that.upload7 = null;
                that.upload8 = null;
                for(var i = 0; i < 8; i++){
                    that.uploadImg('upload'+(i+1), 'filep'+(i+1));
                }
            },

            modelHidden() {
                $('#addAgentModal').on('hidden.bs.modal', function () {
                    // alert(1)
                    $(".moxie-shim-html5").remove();
                })
                $('#updateModal').on('hidden.bs.modal', function () {
                    // alert(1)
                    $(".moxie-shim-html5").remove();
                })
                $('#emoticonUpdateModal').on('hidden.bs.modal', function () {
                    // alert(1)
                    $(".moxie-shim-html5").remove();
                })
                $('#emoticonAddAgentModal').on('hidden.bs.modal', function () {
                    // alert(1)
                    $(".moxie-shim-html5").remove();
                })
            },


            resetaddTopic() {
                const that = this;
                that.addATips1 = '';
                that.addATips2 = '';
                that.newname = "";
                that.filep1 =  "";
                that.newTopicOrder = "";


                that.uploadImg('upload1', 'filep1');


                // that.uploadImg();
            },

            resetTopicUpdate(id, name, img_url, order) {
                
                const that = this;
                that.getEmoticonId(id);

                that.updatename = name?name:'';
                that.updateTopicOrder = order;
                that.filep2 = img_url;
                that.uploadImg('upload2', 'filep2');

            },

            resetEmoticonUpdate(id, zh, en, th, order) {
                
                const that = this

                that.emoticonUpdateId = id;
                that.emoticonUpdateOrder = order;
                that.filep6 = zh.url;
                that.filep7 = en.url;
                that.filep8 = th.url;

                that.uploadImg('upload6', 'filep6');
                that.uploadImg('upload7', 'filep7');
                that.uploadImg('upload8', 'filep8');

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

            isEmptyObject(e) {
                let t;
                for (t in e)
                    return !1;
                return !0
            },


            addTopic() {
                const that = this;
                that.addATips1 = '';
                that.addATips2 = '';
                if (that.newname === '') {
                    that.addATips1 = '请填写主题名称';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if( that.newTopicOrder === '' ) {
                    that.addATips1 = '请填写order';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if( that.filep1 === '' ) {
                    that.addATips1 = '请上传主题图片';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else {

                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/emoticon/topic/create',
                        type: "POST",
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        data: {
                            name: that.newname,
                            order: that.newTopicOrder,
                            img_url: that.filep1
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
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addTopic);
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
                    url: that.$store.state.rootUrl3 + '/emoticon/topic/del',
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


            getEmoticonId(id) {
                this.agencyUpID = id;
                this.addATips1 = '';
                this.addATips2 = '';
            },

            startEmoticon(id) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/emoticon/topic/enable',
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
                                that.startEmoticon(id);
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
            stopEmoticon(id) {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/emoticon/topic/diable',
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
                                that.stopEmoticon(id);
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
                if (that.updatename === '') {
                    that.addATips1 = '请填写主题名称';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if( that.updateTopicOrder === '' ) {
                    that.addATips1 = '请填写order';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if( that.filep2 === '' ) {
                    that.addATips1 = '请上传主题图片';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else {
                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/emoticon/topic/update',
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        type: "POST",
                        data: {
                            id: that.agencyUpID,
                            name: that.updatename,
                            order: that.updateTopicOrder,
                            img_url: that.filep2
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



            seeInfo(id, name) {
                $('.info2').show().siblings().hide();
                this.highlightsid = id;
                this.topic_name = name;
                console.log(this.topic_name)
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
                    url: that.$store.state.rootUrl3 + '/emoticon/list',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    data: {
                        "page": page,
                        "size": size,
                        "topicid": id
                    },
                    success: function (data) {
                        let code = data.returncode;
                        console.log(data)
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

            emoticonResetAddFn() {
                const that = this;
                that.addATips1 = '';
                that.addATips2 = '';

                that.filep3 = '';
                that.filep4 = '';
                that.filep5 = '';
                that.emoticonNewOrder = "";

                that.uploadImg('upload3', 'filep3');
                that.uploadImg('upload4', 'filep4');
                that.uploadImg('upload5', 'filep5');
            },

            emoticonAddFn() {
                const that = this;
                that.addATips1 = '';
                that.addATips2 = '';
                if (that.emoticonNewOrder === '') {
                    that.addATips1 = '请填写order';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if (that.filep3 === '') {
                    that.addATips1 = '请上传 ZH 表情';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if (that.filep4 === '') {
                    that.addATips1 = '请上传 EN 表情';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if (that.filep5 === '') {
                    that.addATips1 = '请上传 TH 表情';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else {

                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/emoticon/create',
                        type: "POST",
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        data: {
                            "order": that.emoticonNewOrder,
                            "zh_url": that.filep3,
                            "en_url": that.filep4,
                            "th_url": that.filep5,
                            "topicid": that.highlightsid
                        },
                        success: function (data) {
                            let code = data.returncode;
                            if (code == '200') {
                                that.addATips1 = '';
                                that.addATips2 = '操作成功';
                                setTimeout(function () {
                                    that.addATips2 = '';
                                    $('#emoticonAddAgentModal').modal('hide');
                                    that.info2List(that.info2Page, that.size, that.highlightsid)
                                }, 500);
                            } else if (code == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.emoticonAddFn);
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

            emoticonUpdateFn() {
                const that = this;
                that.addATips1 = '';
                that.addATips2 = '';
                if (that.emoticonUpdateOrder === '') {
                    that.addATips1 = '请填写order';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if (that.filep6 === '') {
                    that.addATips1 = '请上传 ZH 表情';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if (that.filep7 === '') {
                    that.addATips1 = '请上传 EN 表情';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else if (that.filep8 === '') {
                    that.addATips1 = '请上传 TH 表情';
                    setTimeout(function () {
                        that.addATips1 = '';
                    }, 500);
                    return false;
                } else {

                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/emoticon/update',
                        type: "POST",
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        data: {
                            "id": that.emoticonUpdateId,
                            "order": that.emoticonUpdateOrder,
                            "zh_url": that.filep6,
                            "en_url": that.filep7,
                            "th_url": that.filep8,
                            "topicid": that.highlightsid
                        },
                        success: function (data) {
                            let code = data.returncode;
                            if (code == '200') {
                                that.addATips1 = '';
                                that.addATips2 = '操作成功';
                                setTimeout(function () {
                                    that.addATips2 = '';
                                    $('#emoticonUpdateModal').modal('hide');
                                    that.info2List(that.info2Page, that.size, that.highlightsid)
                                }, 500);
                            } else if (code == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.emoticonUpdateFn);
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
                    url: that.$store.state.rootUrl3 + '/emoticon/del',
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


        },




        mounted() {
            this.$store.dispatch('tabChanger', 64);
            this.$store.dispatch('subChanger', 'sub9');
            // this.getFileValues();
            this.modelHidden();
            this.unionList(this.page, this.size);
        }
    }
</script>
