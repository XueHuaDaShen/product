<template id="">
<div class="">
    <div class="AM-top"  style="text-align:left;">
        <button type="button" style="margin-left:0;margin-top:8px;" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddMenu">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>礼物名称</th>
                <th>类型</th>
                <th>经验值</th>
                <th>代码</th>
                <th>动画图</th>
                <th>时长</th>
                <th>封面</th>
                <th>钻石数</th>
                <th>积分数</th>
                <th>位置</th>
                <th>排序</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <!--  v-bind:href="agent.icon" v-bind:href="agent.cover" -->
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.name}}</td>
                <td>{{agent.type}}</td>
                <td>{{agent.exp}}</td>
                <td>{{agent.code}}</td>
                <td><a style="color:#777;font-size:24px;cursor: pointer;" target="_blank" data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(agent.icon)"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                <td>{{agent.duration}}</td>
                <td><a style="color:#777;font-size:24px;cursor: pointer;" target="_blank" data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(agent.cover)"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                <td>{{agent.diamonds||0}}</td>
                <td>{{agent.balls||0}}</td>
                <td>{{agent.site==0?'列表上':'列表下'}}</td>
                <td>{{agent.position}}</td>
                <td><i v-bind:class="agent.is_forbid == 0 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="changeState(0, agent._id)">启用</a></li>
                            <li><a href="javascript: void(0)" @click="changeState(1, agent._id)">禁用</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent.name, agent.type, agent.exp, agent._id, agent.code, agent.icon, agent.cover_gif, agent.duration, agent.cover, agent.diamonds, agent.position, agent.width, agent.height, agent.site, agent.icon_webp, agent.webp_md5, agent.gif_md5, agent.balls)">编辑信息</a></li>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="menuList(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
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
    <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增礼物</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">礼物名称 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="礼物名称" v-model.trim="newName">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">类型 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newType">
                                    <option value="">请选择礼物类型</option>
                                    <option value="0">普通礼物</option>
                                    <option value="1">大礼物</option>
                                    <option value="2">积分礼物</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="newType==1">
                            <label for="inputEmail4" class="col-sm-2 control-label">size (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <span class="control-label">Width:</span><input type="number" id="inputEmail3" class="form-control" placeholder="宽" v-model.trim="acImgW">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">height:</span><input type="number" id="inputEmail3" class="form-control" placeholder="高" v-model.trim="acImgH">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-show="newType==1">
                            <label class="col-sm-2 control-label">webp (*)</label>
                            <div class="col-sm-10" id="filep7">
                                <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload7" class="myfile" ref="img7">
                                <input type="text" class="form-control" style="width:60%" v-model.trim="filep7" readOnly>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">位置 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newSite">
                                    <option value="0">列表上</option>
                                    <option value="1">列表下</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">经验值 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="经验值" v-model.trim="newExp">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">代码 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="代码" v-model.trim="newCode">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">封面动画图 (*)</label>
                            <div class="col-sm-10" id="filep1">
                                <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload1" class="myfile" ref="img1">
                                <input type="text" class="form-control" style="width:60%" v-model.trim="filep1" readOnly>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">动画图 (*)</label>
                            <div class="col-sm-10" id="filep2">
                                <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload2" class="myfile" ref="img2">
                                <input type="text" class="form-control" style="width:60%" v-model.trim="filep2" readOnly>

                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">动画图 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="动画图" v-model.trim="newIcon">
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">时长 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="时长" v-model.trim="newDuration">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">封面 (*)</label>
                            <div class="col-sm-10" id="filep3">
                                <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload3" class="myfile" ref="img3">
                                <input type="text" class="form-control" style="width:60%" v-model.trim="filep3" readOnly>

                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">封面 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="封面" v-model.trim="newCover">
                            </div>
                        </div> -->
                        <div class="form-group" v-if="newType!=2">
                            <label class="col-sm-2 control-label">钻石数 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="钻石数" v-model.trim="newDiamonds">
                            </div>
                        </div>
                        <div class="form-group" v-if="newType==2">
                            <label class="col-sm-2 control-label">积分数 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="积分数" v-model.trim="newCount">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">排序 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="排序" v-model.trim="newPosition">
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
                    <button type="button" class="btn btn-primary" @click="addMenu">确认</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">更新礼物</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">礼物名称 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="礼物名称" v-model.trim="name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">类型 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="type">
                                    <option value="">请选择礼物类型</option>
                                    <option value="0">普通礼物</option>
                                    <option value="1">大礼物</option>
                                    <option value="2">积分礼物</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="type==1">
                            <label for="inputEmail4" class="col-sm-2 control-label">size (*)</label>
                            <div class="col-sm-10">
                                <div class="col-sm-12 img_info_box">
                                    <div class="img_info">
                                        <span class="control-label">Width:</span><input type="number" id="inputEmail3" class="form-control" placeholder="宽" v-model.trim="newAcImgW">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">height:</span><input type="number" id="inputEmail3" class="form-control" placeholder="高" v-model.trim="newAcImgH">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-show="type==1">
                            <label class="col-sm-2 control-label">webp (*)</label>
                            <div class="col-sm-10" id="filep8">
                                <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload8" class="myfile" ref="img8">
                                <input type="text" class="form-control" style="width:60%" v-model.trim="filep8" readOnly>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">位置 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="site">
                                    <option value="0">列表上</option>
                                    <option value="1">列表下</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">经验值 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="经验值" v-model.trim="exp">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">代码 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="代码" v-model.trim="code">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">封面动画图 (*)</label>
                            <div class="col-sm-10" id="filep4" style="position:relative;">
                                <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload4" class="myfile" ref="img4">
                                <input type="text" class="form-control" style="width:60%" v-model.trim="filep4" readOnly>
                                <input class="btn btn-default" type="button" value="reset" style="height: 32px;position:absolute;right:15px;top:2px;" @click="(filep4='')"/>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">动画图 (*)</label>
                            <div class="col-sm-10" id="filep5">
                                <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload5" class="myfile" ref="img5">
                                <input type="text" class="form-control" style="width:60%" v-model.trim="filep5" readOnly>

                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">动画图 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="动画图" v-model.trim="icon">
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">时长 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="时长" v-model.trim="duration">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">封面 (*)</label>
                            <div class="col-sm-10" id="filep6">
                                <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload6" class="myfile" ref="img6">
                                <input type="text" class="form-control" style="width:60%" v-model.trim="filep6" readOnly>

                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">封面 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="封面" v-model.trim="cover">
                            </div>
                        </div> -->
                        <div class="form-group" v-if="type!=2">
                            <label class="col-sm-2 control-label">钻石数 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="钻石数" v-model.trim="diamonds">
                            </div>
                        </div>
                        <div class="form-group" v-if="type==2">
                            <label class="col-sm-2 control-label">积分数 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="积分数" v-model.trim="count">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">排序 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="排序" v-model.trim="position">
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
            type: "",
            exp: "",
            code: "",
            icon: "",
            duration: "",
            cover: "",
            diamonds: "",
            count: "",
            position: "",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            newName: "",
            newType: "",
            newExp: "",
            newCode: "",
            newIcon: "",
            newDuration: "",
            newCover: "",
            newDiamonds: "",
            newCount: "",
            newPosition: "",
            agencyUpID: "",
            AMtips1: "",
            AMtips2: "",
            filep1: "",
            filep2: "",
            filep3: "",
            filep4: "",
            filep5: "",
            filep6: "",
            filep7: "",
            filep8: "",
            upload1: null,
            upload2: null,
            upload3: null,
            upload4: null,
            upload5: null,
            upload6: null,
            upload7: null,
            upload8: null,

            md51: '',
            md52: '',
            md53: '',
            md54: '',
            md55: '',
            md56: '',
            md57: '',
            md58: '',
            qiniuDomain: 'http://i1.live.aisoqu.com/',
            acImgW: "",
            acImgH: "",
            newAcImgW: "",
            newAcImgH: "",
            showImgUrl: "",
            newSite: "",
            site: ""
        }
    },

    methods: {
        menuList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/gift/list',
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
                    console.log(data)
                    if(code == 200){
                        that.agentL = data.data.data;
                        that.pagesShow = true;
                        if (page > data.data.totalPageNum) {
                            that.menuList(data.data.totalPageNum, size);
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
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.menuList(that.page, that.size)});
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

        initImgUpload() {
            const that = this;
            that.upload1 = null;
            that.upload2 = null;
            that.upload3 = null;
            that.upload4 = null;
            that.upload5 = null;
            that.upload6 = null;
            that.upload7 = null;
            that.upload8 = null;
            for(var i = 1; i < 9; i++){
                that.uploadImg('upload'+i, 'filep'+i, 'md5'+i);
            }
        },

        uploadImg(fileId, filepId, imgMd5) {
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
                                // console.log(up)
                                // console.log(files)
                                that[filepId] = '';
                                plupload.each(files, function(file) {
                                    // 文件添加进队列后,处理相关的事情
                                });
                            },
                            'BeforeUpload': function(up, file) {
                                var tmp_md5;
                                var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
                                // file = this.files[0],
                                chunkSize = 8097152, // Read in chunks of 2MB
                                chunks = Math.ceil(file.size / chunkSize),
                                currentChunk = 0,
                                spark = new SparkMD5.ArrayBuffer();
                            
                                // 每个文件上传前,处理相关的事情
                                var f = file.getNative();
                                var reader = new FileReader();




                                reader.onload = function(e) {

                                    spark.append(e.target.result); // Append array buffer
                                    currentChunk++;
                                    var md5_progress = Math.floor((currentChunk / chunks) * 100);

                                   
                
                                    if (currentChunk < chunks) {
                                        loadNext();
                                    } else {
                                        tmp_md5 = spark.end();
                                        that[imgMd5] = tmp_md5;
                                        // console.log(tmp_md5)
                                    }
                                };

                                function loadNext() {
                                    var start = currentChunk * chunkSize,
                                        end = ((start + chunkSize) >= f.size) ? f.size : start + chunkSize;
                                    reader.readAsArrayBuffer(blobSlice.call(f, start, end));
                                }


                                loadNext();
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
                                // console.log(up)
                                // console.log(file)
                                // console.log(info)

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

        resetUpdate(name, type, exp, id, code, icon, cover_gif, duration, cover, diamonds, position, width, height, site, icon_webp, webp_md5, gif_md5, balls) {
            this.upTips1 = '';
            this.upTips2 = '';
            this.name = name;
            this.type = type;
            this.exp = exp;
            this.code = code;
            this.filep4 = cover_gif||"";
            this.filep5 = icon;
            this.duration = duration;
            this.filep6 = cover;
            this.filep8 = icon_webp||"";
            this.diamonds = diamonds;
            this.count = balls||0;
            this.position = position;
            this.agencyUpID = id;
            this.newAcImgW = width;
            this.newAcImgH = height;
            this.site = site;
            this.md58 = webp_md5;
            this.md54 = gif_md5;
            this.md55 = '';
            this.md56 = '';
        },
        update() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            if (that.name == '') {
                that.upTips1 = '请填写礼物名称';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.type === '') {
                that.upTips1 = '请输选择礼物类型';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.type == 1 && ( that.newAcImgW === '' || that.newAcImgH === '' ) ) {
                that.upTips1 = '请输入礼物的宽高';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.type == 1 && ( that.filep8 == '' ) ) {
                that.upTips1 = '请上传webp图';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.site === '') {
                that.upTips1 = '请选择位置';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.exp == '') {
                that.upTips1 = '请输入经验值';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.code == '') {
                that.upTips1 = '请输入代码';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.filep4 == '') {
                that.upTips1 = '请上传封面动画图';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.filep5 == '') {
                that.upTips1 = '请上传动画图';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.duration == '') {
                that.upTips1 = '请输入时长';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.filep6 == '') {
                that.upTips1 = '请上传封面';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.type != 2 && that.diamonds == '') {
                that.upTips1 = '请输入钻石数';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.type == 2 && that.count == '') {
                that.upTips1 = '请输入积分数';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.position == '') {
                that.upTips1 = '请填写排序';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/gift/update',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "id": that.agencyUpID,
                        "name": that.name,
                        "type": that.type,
                        "icon_webp": that.filep8,
                        "webp_md5": that.md58,
                        "gif_md5": that.md54,
                        "exp": that.exp,
                        "code": that.code,
                        "site": that.site,
                        "icon": that.filep5,
                        "duration": that.duration,
                        "cover": that.filep6,
                        "cover_gif": that.filep4,
                        "diamonds": that.diamonds,
                        "position": that.position,
                        "width": that.newAcImgW,
                        "height": that.newAcImgH,
                        "balls": that.count
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.menuList(that.page, that.size)
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.update()});
                        }else if (code == '302') {
                            that.upTips1 = '路径重复，请更换路径';
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
        resetaddMenu() {
            const that = this;
            this.newName = "";
            this.newType = "";
            this.acImgW = "";
            this.acImgH = "";
            this.newExp = "";
            this.newCode = "";
            this.filep1 = "";
            this.filep2 = "";
            this.newDuration = "";
            this.filep3 = "";
            this.filep7 = "";
            this.newDiamonds = "";
            this.newCount = "";
            this.newPosition = "";
            this.newSite = 0;
            this.md57 = '';
            this.md51 = '';
            this.md52 = '';
            this.md53 = '';
        },
        addMenu() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.newName == '') {
                that.addATips1 = '请填写礼物名称';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newType === '') {
                that.addATips1 = '请输选择礼物类型';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( that.newType == 1 && (that.acImgW === '' || that.acImgH === '') ) {
                that.addATips1 = '请输入礼物的宽高';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( that.newType == 1 && (that.filep7 == '' ) ) {
                that.addATips1 = '请上传webp图';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newSite === '') {
                that.addATips1 = '请选择位置';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newExp == '') {
                that.addATips1 = '请输入经验值';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newCode == '') {
                that.addATips1 = '请输入代码';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.filep1 == '') {
                that.addATips1 = '请上传封面动画图';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.filep2 == '') {
                that.addATips1 = '请上传动画图';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newDuration == '') {
                that.addATips1 = '请输入时长';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.filep3 == '') {
                that.addATips1 = '请上传封面';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newType != 2 && that.newDiamonds == '') {
                that.addATips1 = '请输入钻石数';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newType == 2 && that.newCount == '') {
                that.addATips1 = '请输入积分数';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newPosition == '') {
                that.addATips1 = '请填写排序';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/gift/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "name": that.newName,
                        "type": that.newType,
                        "width": that.acImgW,
                        "height": that.acImgH,
                        "icon_webp": that.filep7,
                        "webp_md5": that.md57,
                        "gif_md5": that.md51,
                        "exp": that.newExp,
                        "site": that.newSite,
                        "code": that.newCode,
                        "icon": that.filep2,
                        "duration": that.newDuration,
                        "cover": that.filep3,
                        "cover_gif": that.filep1,
                        "diamonds": that.newDiamonds,
                        "position": that.newPosition,
                        "balls": that.newCount
                    },
                    success: function(data) {
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            that.menuList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                             utils.loginAgain(that);
                        }else if (code == '302') {
                            that.addATips1 = '路径重复，请更换路径';
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
        changeState(initState, id) {
            const that = this;
            that.AMtips1 = '';
            that.AMtips2 = '';
            if (initState == 1) {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/gift/disable',
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
                            that.menuList(that.page, that.size);
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.changeState(initState, id)});
                        } else {
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
                    url: that.$store.state.rootUrl3 + '/gift/enable',
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
                            that.menuList(that.page, that.size);
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.changeState(initState, id)});
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
        pageBegin() {
            const that = this;
            that.page = 1;
            that.menuList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.menuList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.menuList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.menuList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 8);
        this.$store.dispatch('subChanger', 'sub6');

        this.menuList(this.page, this.size);
        this.initImgUpload()
    }
}
</script>
