<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float: left" type="button" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddVideo">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <div class="AM-topInfo per" style="width:auto;-webkit-box-pack:end;padding-right:10%">
            <!-- <select class="form-control record-info" style="width:14%" name="" id="exampleInputEmail1" v-model.trim="searchCategory">
                <option value=''>请选择category</option>
                <option value='liveVideoMsg'>主播动态</option>
                <option value='shortVideoMsg'>最新短视频</option>
                <option value='platformMsg'>平台消息</option>
                <option value='myMsg'>我的消息</option>
            </select> -->
            <select class="form-control record-info" style="width:14%" name="" id="exampleInputEmail1" v-model.trim="searchStatus">
                <option value="">选择状态</option>
                <option value="0">未发送</option>
                <option value="1">已发送</option>
            </select>
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchCode"></i>
        </div>
    </div>
    <table class="table table-striped table-hover AM-table">
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>category</th>
                <th>target</th>
                <th>type</th>
                <th>title</th>
                <th>content</th>
                <th>status</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{isCategory(agent.category)}}</td>
                <td>{{agent.target}}</td>
                <td>{{isType(agent.type)}}</td>
                <td>{{agent.title}}</td>
                <td>{{agent.content}}</td>
                <td>{{agent.status==1?'已发送':'未发送'}}</td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent._id, agent.category, agent.target, agent.type, agent.title, agent.content, agent.pid)">编辑</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#delModal" @click="getBroadID(agent._id)">删除</a></li>
                            <li v-if="agent.status==0"><a href="javascript: void(0)" @click="sendBroadcast(agent._id)">发送</a></li>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="codeList(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>
    <div class="modal fade bs-example-modal-lg" id="delModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">删除广播</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style="font-size: 16px;">
                        确定要删除该条广播吗？
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
                            <label class="col-sm-2 control-label">category (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control col-sm-10" v-model="newcategory" disabled>
                                    <option value=''>请选择category</option>
                                    <option value='liveVideoMsg'>主播动态</option>
                                    <option value='shortVideoMsg'>最新短视频</option>
                                    <option value='platformMsg'>平台消息</option>
                                    <option value='myMsg'>我的消息</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">target (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control col-sm-10" v-model="newtarget" disabled>
                                    <option value=''>请选择目标</option>
                                    <option value='toUser'>toUser</option>
                                    <option value='toFollower'>toFollower</option>
                                    <option value='toAll'>toAll</option>
                                    <option value='toPush'>toPush</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">type (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control col-sm-10" v-model="newtype" @change="resetType('newpid', 'newurl')">
                                    <option value=''>请选择类型</option>
                                    <option value='0'>无跳转</option>
                                    <option value='1'>直播间</option>
                                    <option value='2'>个人主页</option>
                                    <option value='3'>web页</option>
                                    <option value='4'>系统消息页</option>
                                    <option value='5'>排行榜</option>
                                    <option value='6'>充值</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="newtype==1">
                            <label class="col-sm-2 control-label">pid (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" style="width: 60%;height: 32px;padding-top: 6px;float: left" placeholder="pid" v-model.trim="newpid" @change="resetPid">
                                <input class="btn btn-default" type="button" value="检查" style="float:left;height: 32px;margin: 0 30px;" @click="checkPid(newpid)"/>
                                <div class="spinner" style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3">
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
                        <div class="form-group" v-if="newtype==2||newtype==5">
                            <label class="col-sm-2 control-label">pid (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" style="width: 60%;height: 32px;padding-top: 6px;float: left" placeholder="pid" v-model.trim="newpid" @change="resetPid">
                                <input class="btn btn-default" type="button" value="检查" style="float:left;height: 32px;margin: 0 30px;" @click="checkPid2(newpid)"/>
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
                                    Pid 可用
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Error">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    Pid 不存在
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-if="newtype==3">
                            <label class="col-sm-2 control-label">url (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="url" v-model.trim="newurl">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">title (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="title" v-model.trim="newtitle">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">content (*)</label>
                            <div class="col-sm-10">
                                <textarea name="" id="" cols="30" rows="3" class="form-control" v-model.trim="newcontent" style="resize: none;"></textarea>
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
                            <label class="col-sm-2 control-label">category (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control col-sm-10" v-model="category" disabled>
                                    <option value=''>请选择category</option>
                                    <option value='liveVideoMsg'>主播动态</option>
                                    <option value='shortVideoMsg'>最新短视频</option>
                                    <option value='platformMsg'>平台消息</option>
                                    <option value='myMsg'>我的消息</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">target (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control col-sm-10" v-model="target" disabled>
                                    <option value=''>请选择目标</option>
                                    <option value='toUser'>toUser</option>
                                    <option value='toFollower'>toFollower</option>
                                    <option value='toAll'>toAll</option>
                                    <option value='toPush'>toPush</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">type (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control col-sm-10" v-model="type" @change="resetType('pid', 'url')">
                                    <option value=''>请选择类型</option>
                                    <option value='0'>无跳转</option>
                                    <option value='1'>直播间</option>
                                    <option value='2'>个人主页</option>
                                    <option value='3'>web页</option>
                                    <option value='4'>系统消息页</option>
                                    <option value='5'>排行榜</option>
                                    <option value='6'>充值</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="type==1">
                            <label class="col-sm-2 control-label">pid (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" style="width: 60%;height: 32px;padding-top: 6px;float: left" placeholder="pid" v-model.trim="pid" @change="resetPid">
                                <input class="btn btn-default" type="button" value="检查" style="float:left;height: 32px;margin: 0 30px;" @click="checkPid(pid)"/>
                                <div class="spinner" style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3">
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
                        <div class="form-group" v-if="type==2||type==5">
                            <label class="col-sm-2 control-label">pid (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" style="width: 60%;height: 32px;padding-top: 6px;float: left" placeholder="pid" v-model.trim="pid" @change="resetPid">
                                <input class="btn btn-default" type="button" value="检查" style="float:left;height: 32px;margin: 0 30px;" @click="checkPid2(pid)"/>
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
                                    Pid 可用
                                </div>
                                <div style="margin: 6px; float: right; margin-right: 30px;" v-if="upshow3Error">
                                    <i class="fa fa-times AM-times" aria-hidden="true"></i>
                                    Pid 不存在
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-if="type==3">
                            <label class="col-sm-2 control-label">url (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="url" v-model.trim="url">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">title (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="title" v-model.trim="title">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">content (*)</label>
                            <div class="col-sm-10">
                                <textarea name="" id="" cols="30" rows="3" class="form-control" v-model.trim="content" style="resize: none;"></textarea>
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">loginid</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="loginid" v-model.trim="loginid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">pid</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail1" class="form-control" placeholder="pid" v-model.trim="pid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">loginname</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="loginname" v-model.trim="loginname">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">avatar</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="avatar" v-model.trim="avatar">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">liveid</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="liveid" v-model.trim="liveid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">videoid</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="videoid" v-model.trim="videoid">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">url</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="url" v-model.trim="url">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">os</label>
                            <div class="col-sm-10">
                                <select class="form-control col-sm-10" v-model="os">
                                    <option value=''>请选择os</option>
                                    <option value='0'>apple</option>
                                    <option value='1'>android</option>
                                    <option value='2'>all</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">area</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="area" v-model.trim="area">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">effective_time (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" id="inputEmail3" class="form-control" v-model.trim="EffectiveYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" id="inputEmail3" class="form-control" v-model.trim="EffectiveHMS">
                                    </div>
                                </div>
                            </div>
                        </div> -->
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
            broadID: "",
            
            newcategory: "platformMsg",
            newtarget: "toAll",
            newtype: "",
            newtitle: "",
            newcontent: "",
            newpid: "",
            newurl: "",

            category: "",
            target: "",
            type: "",
            title: "",
            content: "",
            pid: "",
            url: "",

            updateID: "",
            status: "",
            searchStatus: "",
            searchCategory: "platformMsg",

            upshow3: false,
            upshow3Success: 0,
            upshow3Error: false,
            upshow3Failure: false,

            matchUrl: /^(((ht|f)tps?):\/\/)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/
        }
    },

    methods: {
        codeList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/messageCenter/find',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size,
                    // "category": that.searchCategory,
                    "status": that.searchStatus
                },
                success: function(data){
                    let r_code = data.returncode;
                    // console.log(data)
                    if(r_code == 200){
                        that.agentL = data.data;
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
                            that.AMtips1 = '请求成功';
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

        resetPid() {
            const that = this;
            that.upshow3 = false;
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
        checkPid2(pid) {
            const that = this;
            that.upshow3 = true;
            that.upshow3Success = 0;
            that.upshow3Error = false;
            that.upshow3Failure = false;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/user/get',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    pid: pid
                },
                success: function (data) {
                    if (data.returncode == '200') {
                        
                        that.upshow3 = false;
                        that.upshow3Error = false;
                        that.upshow3Failure = false;
                        that.upshow3Success = 1;

                    } else if (data.returncode == 303 || 301) {
                        that.upshow3 = false;
                        that.upshow3Failure = false;
                        that.upshow3Success = 2;
                        that.upshow3Error = true;
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){
                            that.checkPid2(pid);
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
        resetType(pid, url) {
            this[pid] = '';
            this[url] = '';
            this.newurl = '';
            this.upshow3 = false;
            this.upshow3Success = 0;
            this.upshow3Error = false;
            this.upshow3Failure = false;
        },

        resetUpdate(id, category, target, type, title, content, pid) {
            this.upTips1 = '';
            this.upTips2 = '';
            this.updateID = id;
            this.category = category;
            this.target = target;
            this.type = type;
            this.title = title;
            this.content = content;
            // this.loginid = loginid;
            this.pid = pid||'';
            // this.loginname = loginname;
            // this.avatar = avatar;
            // this.liveid = liveid;
            // this.videoid = videoid;
            // this.url = url;
            // this.os = os;
            // this.area = area;
            // this.EffectiveYMD = effective_time.split(" ")[0];
            // this.EffectiveHMS = effective_time.split(" ")[1];
            this.upshow3 = false;
            this.upshow3Success = 0;
            this.upshow3Error = false;
            this.upshow3Failure = false;
        },
        update() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            if (that.category == '') {
                that.upTips1 = '请选择category';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if (that.target == '') {
                that.upTips1 = '请选择target';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if (that.type === '') {
                that.upTips1 = '请选择type';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if (that.type == 1 && that.pid == '') {
                that.upTips1 = '请输入pid';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if (that.type == 1 && that.upshow3Success == 0) {
                that.upTips1 = '请检查pid';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if (that.type == 1 && that.upshow3Success == 2) {
                that.upTips1 = 'pid不符合规则';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if ((that.type == 2 || that.type == 5) && that.pid == '') {
                that.upTips1 = '请输入pid';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if ((that.type == 2 || that.type == 5) && that.upshow3Success == 0) {
                that.upTips1 = '请检查pid';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if ((that.type == 2 || that.type == 5) && that.upshow3Success == 2) {
                that.upTips1 = 'pid不符合规则';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if (that.type == 3 && that.url == '') {
                that.upTips1 = '请输入url';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if ( that.type == 3 && !that.matchUrl.test(that.url) ) {
                that.upTips1 = '请输入正确的url';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if (that.title == '') {
                that.upTips1 = '请填写title';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }else if (that.content == '') {
                that.upTips1 = '请填写content';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/messageCenter/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "id": that.updateID,
                        "category": that.category,
                        "target": that.target,
                        "type": that.type,
                        "title": that.title,
                        "content": that.content,
                        "pid": that.pid,
                        "url": that.url
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
            this.newcategory = "platformMsg";
            this.newtarget = "toAll";
            this.newtype = "";
            this.newtitle = "";
            this.newcontent = "";
            this.newpid = "";
            this.newurl = '';

            this.upshow3 = false;
            this.upshow3Success = 0;
            this.upshow3Error = false;
            this.upshow3Failure = false;
        },
        addVideo() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.newcategory == '') {
                that.addATips1 = '请选择category';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newtarget == '') {
                that.addATips1 = '请选择target';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newtype === '') {
                that.addATips1 = '请选择type';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newtype == 1 && that.newpid == '') {
                that.addATips1 = '请输入pid';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newtype == 1 && that.upshow3Success == 0) {
                that.addATips1 = '请检查pid';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newtype == 1 && that.upshow3Success == 2) {
                that.addATips1 = 'pid不符合规则';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if ((that.newtype == 2 || that.newtype == 5) && that.newpid == '') {
                that.addATips1 = '请输入pid';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if ((that.newtype == 2 || that.newtype == 5) && that.upshow3Success == 0) {
                that.addATips1 = '请检查pid';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if ((that.newtype == 2 || that.newtype == 5) && that.upshow3Success == 2) {
                that.addATips1 = 'pid不符合规则';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newtype == 3 && that.newurl == '') {
                that.addATips1 = '请输入url';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if ( that.newtype == 3 && !that.matchUrl.test(that.newurl) ) {
                that.addATips1 = '请输入正确的url';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newtitle == '') {
                that.addATips1 = '请填写title';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }else if (that.newcontent == '') {
                that.addATips1 = '请填写content';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/messageCenter/add',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "category": that.newcategory,
                        "target": that.newtarget,
                        "type": that.newtype,
                        "title": that.newtitle,
                        "content": that.newcontent,
                        "pid": that.newpid,
                        "url": that.newurl
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

        getBroadID(id) {
            this.upTips1 = '';
            this.upTips2 = '';
            this.broadID = id;
        },

        deleteList() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/messageCenter/remove',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    'id': that.broadID
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
        sendBroadcast(id) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/messageCenter/Broadcast',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    'id': id
                },
                success: function(data) {
                    let code = data.returncode;
                    // console.log(data)
                    if (code == 200) {
                        that.codeList(that.page, that.size);
                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '303') {
                        that.AMtips2 = data.msg;
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 1000);
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
        isCategory(v) {
            switch(v){
                case 'liveVideoMsg':
                    return '主播动态';
                case 'shortVideoMsg':
                    return '最新短视频';
                case 'platformMsg':
                    return '平台消息';
                case 'myMsg':
                    return '我的消息';
                default:
                    return v;
            }
        },
        isType(v) {
            switch(v){
                case 0:
                    return '无跳转';
                case 1:
                    return '直播间';
                case 2:
                    return '个人主页';
                case 3:
                    return 'web页';
                case 4:
                    return '系统消息页';
                case 5:
                    return '排行榜';
                case 6:
                    return '充值';
                default:
                    return v;
            }
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
        this.$store.dispatch('tabChanger', 56);
        this.$store.dispatch('subChanger', 'sub9');

        this.codeList(this.page, this.size);
        // console.log(this.$store.state.tabIndex);
        // this.adminList(this.page, this.size, this.name);
    }
}
</script>
