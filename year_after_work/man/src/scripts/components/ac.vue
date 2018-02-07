<template id="">
<div class="">
    <div class="AM-top">
        <div class="AM-top"  style="text-align:left">
            <button type="button" style="margin-left:0;margin-top:8px;" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddAc">新增</button>
            <span class="AM-tips1">{{AMtips1}}</span>
            <span class="AM-tips2">{{AMtips2}}</span>
        </div>
    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>类型</th>
                <th>跳转行为</th>
                <th>标题</th>
                <th>跳转地址</th>
                <th>最大投票数</th>
                <th>活动图片</th>
                <th>升级临界值</th>
                <th>活动开始时间</th>
                <th>活动结束时间</th>
                <!-- <th>修改信息</th> -->
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <!-- <tr>
                <td>Tanmay</td>
                <td>43545</td>
                <td>187</td>
                <td>北京</td>
                <td><i class="fa fa-check AM-check" aria-hidden="true"></i></td>
                <td><i class="fa fa-edit AM-edit" aria-hidden="true"></i></td>
            </tr> -->
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.type==1?'图片':(agent.type == 2 ? '投票': '推广')}}</td>
                <td>{{agent.act==1?'跳转web':'没有行为'}}</td>
                <td>{{agent.title}}</td>
                <td><a style="color:#777;font-size:24px" target="_blank" data-toggle='modal' data-target="#showHTMLModal" @click="getHTMLurl(agent.url)"><i class="fa fa-external-link-square" aria-hidden="true"></i></a></td>
                <td>{{agent.max_votes}}</td>
                <td style="overflow: hidden"><a style="color:#777;font-size:24px;cursor: pointer" data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(agent.img.url)" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                <td>{{agent.level[0]}}/{{agent.level[1]}}</td>
                <td>{{moment(agent.start_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td>{{moment(agent.stop_at).format('YYYY-MM-DD HH:mm:ss')}}</td>
                <td><i v-bind:class="agent.enabled == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                <!-- <td><i class="fa fa-edit AM-edit" aria-hidden="true" data-toggle='modal' data-target="#updateModal" @click="resetUpdate"></i></td> -->
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="changeState(1, agent._id)">启用</a></li>
                            <li><a href="javascript: void(0)" @click="changeState(0, agent._id)">禁用</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent.type, agent.act, agent.title, agent._id, agent.url, agent.img, agent.level, agent.enabled, agent.start_at, agent.stop_at, agent.max_votes, agent.cc)">编辑信息</a></li>
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

    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改活动信息</h4>
                </div>
                <div class="modal-body">
                    <!-- <div class="hideM">
                        {{agencyUpID}}/ {{agencyTime}}/ {{agencyDi}}/ {{agencyType}}/ {{agencyS}}
                    </div> -->
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="inputEmail5" class="col-sm-2 control-label">类型 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="acType">
                                    <option value="">请选择类型</option>
                                    <option value="1">图片</option>
                                    <option value="2">投票</option>
                                    <option value="3">推广</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="acType==3">
                            <label class="col-sm-2 control-label hasMR">Area (*)</label>
                            <select class="form-control acName col-sm-10" v-model="updateArea">
                                <option value="">Please select the area</option>
                                <option v-for = "type in typeList" v-bind:value="type.code">
                                    {{type.name}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail2" class="col-sm-2 control-label">跳转行为 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="acAct">
                                    <option value="">请选择行为</option>
                                    <option value="0">没有行为</option>
                                    <option value="1">跳转web</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">标题 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail3" class="form-control" placeholder="标题" v-model.trim="acTitle">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">跳转地址 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail3" class="form-control" placeholder="跳转地址" v-model.trim="acUrl">
                            </div>
                        </div>
                        <div class="form-group" v-if="acType!=3">
                            <label for="inputEmail3" class="col-sm-2 control-label">最大投票数 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail3" class="form-control" placeholder="最大投票数" v-model.trim="max_votes">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">活动图片 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <span class="control-label">Width:</span><input type="number" id="inputEmail3" class="form-control" placeholder="宽" v-model.trim="acImgW">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">height:</span><input type="number" id="inputEmail3" class="form-control" placeholder="高" v-model.trim="acImgH">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">width_ratio:</span><input type="text" id="inputEmail3" class="form-control" placeholder="width_ratio" v-model.trim="acImgWR">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">img_ratio:</span><input type="text" id="inputEmail3" class="form-control" placeholder="img_ratio" v-model.trim="acImgIR">
                                    </div>
                                </div>
                                <div class="col-sm-12 img_info_box" style="margin-top:5px;">
                                    <div class="img_info col-sm-3">
                                        <span class="control-label" style="margin-right:13px;">type:</span>
                                        <select class="form-control" style="width:auto" v-model.trim="acImgType">
                                            <option value="static">static</option>
                                            <option value="dynamic">dynamic</option>
                                        </select>
                                    </div>
                                    <div class="img_info col-sm-9">
                                        <span class="control-label" style="margin-right:11px;">url:</span><input style="width:80%" type="text" id="inputEmail3" class="form-control" placeholder="url" v-model.trim="acImgUrl">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">升级临界值 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <span class="control-label">levelS:</span><input type="number" id="inputEmail3" class="form-control" placeholder="升级临界初始值" v-model.trim="acLevelS">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">levelE:</span><input type="number" id="inputEmail3" class="form-control" placeholder="升级临界结束值" v-model.trim="acLevelE">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">活动开始时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" id="inputEmail3" class="form-control" v-model.trim="acStartYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" id="inputEmail3" class="form-control" v-model.trim="acStartHMS">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">活动结束时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" id="inputEmail3" class="form-control" v-model.trim="acStopYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" id="inputEmail3" class="form-control" v-model.trim="acStopHMS">
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="update">确认</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="showImgModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                                <div class="col-sm-12"style="display: -webkit-box;-webkit-box-pack: center;">
                                    <div class="showImg">
                                        <img :src="showImgUrl" alt="">
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
    <div class="modal fade bs-example-modal-lg" id="showHTMLModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                                <div class="col-sm-12"style="display: -webkit-box;-webkit-box-pack: center;">
                                    <div class="showImg">
                                        <iframe :src="showHTMLUrl" frameborder="0"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">url (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="url" v-model.trim="showHTMLUrl" readOnly>
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
    <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增活动</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="inputEmail5" class="col-sm-2 control-label">类型 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newAcType">
                                    <option value="">请选择类型</option>
                                    <option value="1">图片</option>
                                    <option value="2">投票</option>
                                    <option value="3">推广</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="newAcType==3">
                            <label class="col-sm-2 control-label hasMR">Area (*)</label>
                            <select class="form-control acName col-sm-10" v-model="newArea">
                                <option value="">Please select the area</option>
                                <option v-for = "type in typeList" v-bind:value="type.code">
                                    {{type.name}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail2" class="col-sm-2 control-label">跳转行为 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newAcAct">
                                    <option value="">请选择行为</option>
                                    <option value="0">没有行为</option>
                                    <option value="1">跳转web</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">标题 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail3" class="form-control" placeholder="标题" v-model.trim="newAcTitle">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">跳转地址 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail3" class="form-control" placeholder="跳转地址" v-model.trim="newAcUrl">
                            </div>
                        </div>
                        <div class="form-group" v-if="newAcType!=3">
                            <label for="inputEmail3" class="col-sm-2 control-label">最大投票数 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" id="inputEmail3" class="form-control" placeholder="最大投票数" v-model.trim="newmax_votes">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">活动图片 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <span class="control-label">Width:</span><input type="number" id="inputEmail3" class="form-control" placeholder="宽" v-model.trim="newAcImgW">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">height:</span><input type="number" id="inputEmail3" class="form-control" placeholder="高" v-model.trim="newAcImgH">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">width_ratio:</span><input type="text" id="inputEmail3" class="form-control" placeholder="width_ratio" v-model.trim="newAcImgWR">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">img_ratio:</span><input type="text" id="inputEmail3" class="form-control" placeholder="img_ratio" v-model.trim="newAcImgIR">
                                    </div>
                                </div>
                                <div class="col-sm-12 img_info_box" style="margin-top:5px;">
                                    <div class="img_info col-sm-3">
                                        <span class="control-label" style="margin-right:13px;">type:</span>
                                        <select class="form-control" style="width:auto" v-model.trim="newAcImgType">
                                            <option value="static">static</option>
                                            <option value="dynamic">dynamic</option>
                                        </select>
                                    </div>
                                    <div class="img_info col-sm-9">
                                        <span class="control-label" style="margin-right:11px;">url:</span><input style="width:80%" type="text" id="inputEmail3" class="form-control" placeholder="url" v-model.trim="newAcImgUrl">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">升级临界值 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <span class="control-label">levelS:</span><input type="number" id="inputEmail3" class="form-control" placeholder="升级临界初始值" v-model.trim="newAcLevelS">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">levelE:</span><input type="number" id="inputEmail3" class="form-control" placeholder="升级临界结束值" v-model.trim="newAcLevelE">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">活动开始时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" id="inputEmail3" class="form-control" v-model.trim="newAcStartYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" id="inputEmail3" class="form-control" placeholder="HH:MM:SS" v-model.trim="newAcStartHMS">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">活动结束时间 (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <input type="date" id="inputEmail3" class="form-control" v-model.trim="newAcStopYMD">
                                    </div>
                                    <div class="img_info">
                                        <input type="time" id="inputEmail3" class="form-control" v-model.trim="newAcStopHMS">
                                    </div>
                                </div>
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
                    <button type="button" class="btn btn-primary" @click="addAc">确认</button>
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
            name: '',
            moment: moment,
            agentL: [],
            AMtips1: '',
            AMtips2: '',
            max_votes: '',
            acType: '',
            acAct: '',
            acTitle: '',
            acUrl: '',
            acImgW: '',
            acImgH: '',
            acImgWR: '',
            acImgIR: '',
            acImgType: 'static',
            acImgUrl: '',
            acLevelS: '',
            acLevelE: '',
            acStartYMD: '',
            acStartHMS: '',
            acStopYMD: '',
            acStopHMS: '',
            newmax_votes: '',
            newAcType: '',
            newAcAct: '',
            newAcTitle: '',
            newAcUrl: '',
            newAcImgW: '',
            newAcImgH: '',
            newAcImgWR: '',
            newAcImgIR: '',
            newAcImgType: 'static',
            newAcImgUrl: '',
            newAcLevelS: '',
            newAcLevelE: '',
            newAcStartYMD: '',
            newAcStartHMS: '',
            newAcStopYMD: '',
            newAcStopHMS: '',
            upTips1: '',
            upTips2: '',
            agencyUpID: '',
            addATips1: '',
            addATips2: '',
            SA: '',
            pagesShow: false,
            page: 1,
            size: 10,
            pageL: [],
            showImgUrl: '',
            showHTMLUrl: '',
            typeList: [],
            newArea: '',
            updateArea: '',
        }
    },

    methods: {
        unionList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/activity/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
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
        getImgUrl(url) {
            this.showImgUrl = url||'图片不存在';
        },
        getHTMLurl(url) {
            this.showHTMLUrl = url||'地址不存在';
        },
        resetUpdate(type, act, title, id, url, img, level, enabled, start_at, stop_at, max_votes, cc) {
            var startTime = moment(start_at).format('YYYY-MM-DD HH:mm:ss');
            var stopTime = moment(stop_at).format('YYYY-MM-DD HH:mm:ss');
            this.upTips1 = '';
            this.upTips2 = '';
            this.acType = type;
            this.acAct = act;
            this.acTitle = title;
            this.agencyUpID = id;
            this.acUrl = url;
            this.acImgW = img.width;
            this.acImgH = img.height;
            this.acImgWR = img.width_ratio;
            this.acImgIR = img.img_ratio;
            this.acImgType = img.type;
            this.acImgUrl = img.url;
            this.acLevelS = level[0];
            this.acLevelE = level[1];
            this.acStartYMD = startTime.split(" ")[0];
            this.acStartHMS = startTime.split(" ")[1];
            this.acStopYMD = stopTime.split(" ")[0];
            this.acStopHMS = stopTime.split(" ")[1];
            this.max_votes = max_votes;

            //新增cc
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/ownarea/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                // data: {
                //     "code": 'V2000'
                // },
                success: function(data){
                    let code = data.returncode;
                    console.log(data)
                    if(code == 200){
                        that.typeList = data.data;
                        that.updateArea = cc;
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.resetUpdate(type, act, title, id, url, img, level, enabled, start_at, stop_at, max_votes, cc)});
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }

            })
            //this.create_input(that.acStartYMD, that.acStartHMS, that.acStopYMD, that.acStopHMS)
        },
        update() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            let imgInfo = {
                "width": that.acImgW,
                "height": that.acImgH,
                "width_ratio": that.acImgWR,
                "img_ratio": that.acImgIR,
                "type": that.acImgType,
                "url": that.acImgUrl
            };
            var startT = [that.acStartYMD, that.acStartHMS].join(" ");
            var stopT = [that.acStopYMD, that.acStopHMS].join(" ");
            var newLevel = JSON.stringify([that.acLevelS, that.acLevelE]);
            
            // console.log(newLevel)
            // console.log(JSON.stringify(imgInfo))
            if (!that.acType) {
                that.upTips1 = '请填写类型';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if( that.acType == 3 && that.updateArea == '' ){
                that.upTips1 = 'Please select the area';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if(!that.acAct){
                that.upTips1 = '请填写跳转行为';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if(!that.acTitle){
                that.upTips1 = '请填写标题';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if(!that.acUrl){
                that.upTips1 = '请填写路径';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if(that.acType != 3 && that.max_votes === ''){
                that.upTips1 = '请填写最大投票数';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if(!that.acImgW || !that.acImgH || !that.acImgWR || !that.acImgIR || !that.acImgType || !that.acImgUrl){
                that.upTips1 = '请填写图片信息';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if(!that.acLevelS || !that.acLevelE){
                that.upTips1 = '请填写完整临界值';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if(!that.acStartYMD || !that.acStartHMS){
                that.upTips1 = '请填写活动开始时间';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if(!that.acStopYMD || !that.acStopHMS){
                that.upTips1 = '请填写活动结束时间';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if(startT>stopT) {
                that.upTips1 = '活动结束时间必须超过活动开始时间';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1500);
                return false
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/activity/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "id": that.agencyUpID,
                        "type": that.acType,
                        "act": that.acAct,
                        "url": that.acUrl,
                        "img": JSON.stringify(imgInfo),
                        "level": newLevel,
                        "title": that.acTitle,
                        "start_at": startT,
                        "stop_at": stopT,
                        "max_votes": that.max_votes,
                        "cc": that.updateArea
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.unionList(that.page, that.size)
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        } else if (code == '302') {
                            that.upTips1 = 'Server Error';
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
        resetaddAc() {
            const that = this;
            that.newAcType = "";
            that.newAcAct = "";
            that.newAcTitle = "";
            that.agencyUpID = "";
            that.newAcUrl = "";
            that.newAcImgW = "";
            that.newAcImgH = "";
            that.newAcImgWR = "";
            that.newAcImgIR = "";
            that.newAcImgType = "static";
            that.newAcImgUrl = "";
            that.newAcLevel = "";//JDON.stringify(level);
            that.newAcStartYMD = "";
            that.newAcStartHMS = "";
            that.newAcStopYMD = "";
            that.newAcStopHMS = "";
            that.newmax_votes = "";
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/ownarea/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                // data: {
                //     "code": 'V2000'
                // },
                success: function(data){
                    let code = data.returncode;
                    console.log(data)
                    if(code == 200){
                        that.typeList = data.data;
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.resetaddAc);
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
        addAc() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            let newImgInfo = {
                "width": that.newAcImgW,
                "height": that.newAcImgH,
                "width_ratio": that.newAcImgWR,
                "img_ratio": that.newAcImgIR,
                "type": that.newAcImgType,
                "url": that.newAcImgUrl
            };
            var startT = [that.newAcStartYMD, that.newAcStartHMS].join(" ");
            var stopT = [that.newAcStopYMD, that.newAcStopHMS].join(" ");
            var newLevel = JSON.stringify([that.newAcLevelS, that.newAcLevelE]);
            
            if (!that.newAcType) {
                that.addATips1 = '请填写类型';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if( that.newAcType == 3 && that.newArea == '' ){
                that.addATips1 = 'Please select the area';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if(!that.newAcAct){
                that.addATips1 = '请填写跳转行为';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if(!that.newAcTitle){
                that.addATips1 = '请填写标题';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if(!that.newAcUrl){
                that.addATips1 = '请填写路径';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if( that.newAcType != 3 && that.newmax_votes === ''){
                that.addATips1 = '请填写最大投票数';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if(!that.newAcImgW || !that.newAcImgH || !that.newAcImgWR || !that.newAcImgIR || !that.newAcImgType || !that.newAcImgUrl){
                that.addATips1 = '请填写图片信息';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if(!that.newAcLevelS || !that.newAcLevelE){
                that.addATips1 = '请填写临完整界值';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if(!that.newAcStartYMD || !that.newAcStartHMS){
                that.addATips1 = '请填写活动开始时间';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if(!that.newAcStopYMD || !that.newAcStopYMD){
                that.addATips1 = '请填写活动结束时间';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if(startT>stopT) {
                that.upTips1 = '活动结束时间必须超过活动开始时间';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 1500);
                return false
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/activity/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "id": that.agencyUpID,
                        "type": that.newAcType,
                        "act": that.newAcAct,
                        "url": that.newAcUrl,
                        "img": JSON.stringify(newImgInfo),
                        "level": newLevel,
                        "title": that.newAcTitle,
                        "start_at": startT,
                        "stop_at": stopT,
                        "max_votes": that.newmax_votes,
                        "cc": that.newArea
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            that.unionList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addAc);
                        } else if (code == '301') {
                            that.addATips1 = 'Parameter error';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 1000);
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
        changeState(initState, id) {
            const that = this;
            that.AMtips1 = '';
            that.AMtips2 = '';
            if (initState == 1) {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/activity/disable',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": id
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.unionList(that.page, that.size);
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.changeState(initState, id)});
                        }  else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function() {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/activity/enable',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "id": id
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.AMtips1 = '操作成功';
                            that.unionList(that.page, that.size);
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.changeState(initState, id)});
                        }  else {
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
        this.$store.dispatch('tabChanger', 13);
        this.$store.dispatch('subChanger', 'sub5');

        this.unionList(this.page, this.size);
    }
}
</script>
