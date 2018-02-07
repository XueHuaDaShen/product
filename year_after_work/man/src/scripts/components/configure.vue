<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float: left" type="button" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddRole">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>

    </div>
    <table class="table table-striped table-hover AM-table" style="table-layout: fixed;">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>等级<br>阈值</th>
                <th>心跳<br>间隔</th>
                <th>心跳<br>次数</th>
                <th>推流超<br>时时间</th>
                <th>版本</th>
                <th>强制<br>更新</th>
                <th>背景<br>音乐</th>
                <th>倒计<br>时(s)</th>
                <th>收益<br>(V1)</th>
                <th>收益</th>
                <th>提现</th>
                <th>兑换</th>
                <th>退出<br>推流</th>
                <th>平台</th>
                <th>提示</th>
                <th>连接</th>
                <th>上报推<br>流质量</th>
                <th>推流码<br>率开关</th>
                <th>推流<br>码率(old)</th>
                <th>推流<br>码率(new)</th>
                <!-- <th>等级<br>图标</th> -->
                <th>分享时<br>间间隔</th>
                <th>支付日<br>志上报</th>
                <th>升级<br>标题</th>
                <th>升级<br>内容</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.level_threshold}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.heartbeat}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.heartbeat_num}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.push_stream_timeout}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.version}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{is_update(agent.update)}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.music}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.count_down}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{is_status(agent.income)}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{is_status(agent.balls)}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{is_status(agent.withdraw)}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{is_status(agent.convert)}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{is_status(agent.push_stream_exit)}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{is_os(agent.os)}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.tip}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.link}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{is_status(agent.report_stream_quality)}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.adjust}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.btr}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.btrnew}}</td>
                <!-- <td style="overflow: hidden;white-space:nowrap;">{{agent.level}}</td> -->
                <td style="overflow: hidden;white-space:nowrap;">{{agent.share_time_Interval}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{is_status(agent.paylog)}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.update_title}}</td>
                <td style="overflow: hidden;white-space:nowrap;">{{agent.update_content}}</td>
                <td>
                    <button type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent._id, agent.level_threshold, agent.heartbeat, agent.heartbeat_num, agent.push_stream_timeout, agent.version, agent.update, agent.music, agent.income, agent.balls, agent.withdraw, agent.convert, agent.push_stream_exit, agent.os, agent.tip, agent.link, agent.report_stream_quality, agent.adjust, agent.btr, agent.btrnew, agent.level, agent.share_time_Interval, agent.paylog, agent.update_title, agent.update_content, agent.startup_image_url, agent.count_down, agent.cn_link)">
                      编辑
                    </button>
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
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="roleList(pageN, size)">{{pageN}}</a>
                </li>
            </div>
            <li><a href="javascript:void(0);" @click="pageNext">&raquo;</a></li>
            <li><a href="javascript:void(0);" @click="pageEnd">End</a></li>
        </ul>
    </nav>
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
                            <label class="col-sm-2 control-label">等级阈值 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="等级阈值" v-model.trim="newlevel_threshold">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">心跳间隔 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="心跳间隔" v-model.trim="newheartbeat">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">心跳次数 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="心跳次数" v-model.trim="newheartbeat_num">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">推流超时时间 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="推流超时时间" v-model.trim="newpush_stream_timeout">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">版本 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="版本" v-model.trim="newversion">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">强制更新 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newupdate">
                                    <option value="">请选择是否强制更新</option>
                                    <option value="0">不更新</option>
                                    <option value="1">提示更新</option>
                                    <option value="2">强制更新</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">背景音乐 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="背景音乐" v-model.trim="newmusic">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">启动背景图 (*)</label>
                            <div class="col-sm-10" id="filep1">
                                <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload1" class="myfile" ref="img1">
                                <input type="text" class="form-control" style="width:60%" v-model.trim="filep1" readOnly>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">倒计时 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="倒计时" v-model.trim="newcount_down">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">收益(V1) (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newincome">
                                    <option value="">请选择收益(V1)</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">收益 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newballs">
                                    <option value="">请选择收益</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">提现 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newwithdraw">
                                    <option value="">请选择是否提现</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">兑换 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newconvert">
                                    <option value="">请选择是否兑换</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">退出推流 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newpush_stream_exit">
                                    <option value="">请选择是否退出推流</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">平台 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newos">
                                    <option value="">请选择平台</option>
                                    <option value="0">ios</option>
                                    <option value="1">android</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="newos==1">
                            <label class="col-sm-2 control-label">china store link (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="china store link" v-model.trim="newcn_link">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">提示 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="提示" v-model.trim="newtip">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">连接 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="连接" v-model.trim="newlink">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">上报推流质量 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newreport_stream_quality">
                                    <option value="">请选择是否上报推流质量</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">推流码率开关 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="推流码率开关" v-model.trim="newadjust">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">推流码率(old) (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="推流码率" v-model.trim="newbtr">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">推流码率(new) (*)</label>
                            <div class="col-sm-10" style="position:relative;">
                                <div class="col-sm-12 img_info_box" style="position:relative;" v-for="(obj, index) in medi_newbtrnew">
                                    <div class="img_info">
                                        <span class="control-label">des:</span><input type="text" id="inputEmail3" style="width:70%" class="form-control" placeholder="des" v-model.trim="des=obj.des">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">val:</span><input type="text" id="inputEmail3" style="width:70%" class="form-control" placeholder="val" v-model.trim="val=obj.val">
                                    </div>
                                    <button type="button" :class="medi_newbtrnew.length<2? 'sign_hide':'sign_show'" @click="del_info(index, medi_newbtrnew)" class="del btn btn-danger btnAMsmall">-</button>
                                </div>
                                <button id="_add" @click="create_info(medi_newbtrnew)" type="button" class="btn btn-primary btnAMsmall">+</button>
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">等级图标 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="等级图标" v-model.trim="newlevel">
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label class="col-sm-2 control-label">分享时间间隔 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="分享时间间隔" v-model.trim="newshare_time_Interval">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">支付日志上报 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newpaylog">
                                    <option value="">请选择是否支付日志上报</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">升级标题 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="升级标题" v-model.trim="newupdate_title">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">升级内容 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="升级内容" v-model.trim="newupdate_content">
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
                    <button type="button" class="btn btn-primary" @click="addRole">确认</button>
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
                            <label class="col-sm-2 control-label">等级阈值 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="等级阈值" v-model.trim="level_threshold">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">心跳间隔 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="心跳间隔" v-model.trim="heartbeat">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">心跳次数 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="心跳次数" v-model.trim="heartbeat_num">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">推流超时时间 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="推流超时时间" v-model.trim="push_stream_timeout">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">版本 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="版本" v-model.trim="version">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">强制更新 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="update">
                                    <option value="">请选择是否强制更新</option>
                                    <option value="0">不更新</option>
                                    <option value="1">提示更新</option>
                                    <option value="2">强制更新</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">背景音乐 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="背景音乐" v-model.trim="music">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">启动背景图 (*)</label>
                            <div class="col-sm-10" id="filep2">
                                <input type="file" style="width: 30%;height: 32px;padding-top: 6px;float: left" placeholder="name" id="upload2" class="myfile" ref="img1">
                                <input type="text" class="form-control" style="width:60%" v-model.trim="filep2" readOnly>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">倒计时 (*)</label>
                            <div class="col-sm-10">
                                <input type="number" class="form-control" placeholder="倒计时" v-model.trim="count_down">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">收益(V1) (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="income">
                                    <option value="">请选择收益(V1)</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">收益 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="balls">
                                    <option value="">请选择收益</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">提现 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="withdraw">
                                    <option value="">请选择是否提现</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">兑换 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="convert">
                                    <option value="">请选择是否兑换</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">退出推流 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="push_stream_exit">
                                    <option value="">请选择是否退出推流</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">平台 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="os">
                                    <option value="">请选择平台</option>
                                    <option value="0">ios</option>
                                    <option value="1">android</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" v-if="os==1">
                            <label class="col-sm-2 control-label">china store link (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="china store link" v-model.trim="cn_link">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">提示 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="提示" v-model.trim="tip">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">连接 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="连接" v-model.trim="link">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">上报推流质量 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="report_stream_quality">
                                    <option value="">请选择是否上报推流质量</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">推流码率开关 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="推流码率开关" v-model.trim="adjust">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">推流码率(old) (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="推流码率" v-model.trim="btr">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">推流码率(new) (*)</label>
                            <div class="col-sm-10" style="position:relative;">
                                <div class="col-sm-12 img_info_box" style="position:relative;" v-for="(obj, index) in medi_btrnew">
                                    <div class="img_info">
                                        <span class="control-label">des:</span><input type="text" id="inputEmail3" style="width:70%" class="form-control" placeholder="des" v-model.trim="des=obj.des">
                                    </div>
                                    <div class="img_info">
                                        <span class="control-label">val:</span><input type="text" id="inputEmail3" style="width:70%" class="form-control" placeholder="val" v-model.trim="val=obj.val">
                                    </div>
                                    <button type="button" :class="medi_btrnew.length==1? 'sign_hide':'sign_show'" @click="del_info(index, medi_btrnew)" class="del btn btn-danger btnAMsmall">-</button>
                                </div>
                                <button id="_add" @click="create_info(medi_btrnew)" type="button" class="btn btn-primary btnAMsmall">+</button>
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <label class="col-sm-2 control-label">等级图标 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="等级图标" v-model.trim="level">
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label class="col-sm-2 control-label">分享时间间隔 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="分享时间间隔" v-model.trim="share_time_Interval">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">支付日志上报 (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="paylog">
                                    <option value="">请选择是否支付日志上报</option>
                                    <option value="0">否</option>
                                    <option value="1">是</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">升级标题 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="升级标题" v-model.trim="update_title">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">升级内容 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="升级内容" v-model.trim="update_content">
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
                    <button type="button" class="btn btn-primary" @click="updateinfo">确认</button>
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
            medi_newbtrnew: [],
            medi_btrnew: [],
            level_threshold: "",
            heartbeat: "",
            heartbeat_num: "",
            push_stream_timeout: "",
            version: "",
            update: "",
            music: "",
            income: "",
            balls: "",
            withdraw: "",
            convert: "",
            push_stream_exit: "",
            os: "",
            tip: "",
            link: "",
            report_stream_quality: "",
            adjust: "",
            btr: "",
            btrnew: [],
            des: "",
            val: "",
            level: "",
            share_time_Interval: "",
            paylog: "",
            update_title: "",
            update_content: "",
            count_down: "",
            cn_link: "",
            role_name: "",
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
            newlevel_threshold: "",
            newheartbeat: "",
            newheartbeat_num: "",
            newpush_stream_timeout: "",
            newversion: "",
            newupdate: "",
            newmusic: "",
            newincome: "",
            newballs: "",
            newwithdraw: "",
            newconvert: "",
            newpush_stream_exit: "",
            newos: "",
            newtip: "",
            newlink: "",
            newreport_stream_quality: "",
            newadjust: "",
            newbtr: "",
            newbtrnew: [{
                "des": '',
                "val": ''
            }],
            newlevel: "",
            newshare_time_Interval: "",
            newpaylog: "",
            newupdate_title: "",
            newupdate_content: "",
            newcount_down: "",
            newcn_link: "",

            filep1: "",
            filep2: "",
            upload1: null,
            upload2: null,

            md51: '',
            md52: '',
            qiniuDomain: 'http://i1.live.aisoqu.com/',
            // matchUrl: /^(((ht|f)tps?):\/\/)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/
            matchUrl: /^(?:http(?:s|):\/\/|)(?:(?:\w*?)\.|)(?:\w*?)\.(?:\w{2,4})(?:\?.*|\/.*|)$/
        }
    },

    methods: {
        roleList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/app/config/list',
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
                            that.roleList(data.data.totalPageNum, size);
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
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.roleList(that.page, that.size)});
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
        initImgUpload() {
            const that = this;
            that.upload1 = null;
            that.upload2 = null;
            for(var i = 1; i < 3; i++){
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
        resetUpdate(id, level_threshold, heartbeat, heartbeat_num, push_stream_timeout, version, update, music, income, balls, withdraw, convert, push_stream_exit, os, tip, link, report_stream_quality, adjust, btr, btrnew, level, share_time_Interval, paylog, update_title, update_content, startup_image_url, count_down, cn_link) {
            this.upTips1 = '';
            this.upTips2 = '';
            this.level_threshold = level_threshold;
            this.heartbeat = heartbeat;
            this.heartbeat_num = heartbeat_num;
            this.push_stream_timeout = push_stream_timeout;
            this.version = version;
            this.update = update;
            this.music = music;
            this.income = income;
            this.balls = balls;
            this.withdraw = withdraw;
            this.convert = convert;
            this.push_stream_exit = push_stream_exit;
            this.os = os;
            this.tip = tip;
            this.link = link;
            this.report_stream_quality = report_stream_quality;
            this.adjust = adjust;
            this.btr = btr;
            this.filep2 = startup_image_url||'';
            this.count_down = count_down;
            this.cn_link = cn_link||'';
            if(btrnew.length == 0){
                this.btrnew = [{
                    "des": '',
                    "val": ''
                }];
            }else{
                this.btrnew = btrnew;
            }
            this.medi_btrnew = this.btrnew.concat();
            this.level = level;
            this.share_time_Interval = share_time_Interval;
            this.paylog = paylog;
            this.update_title = update_title;
            this.update_content = update_content;
            this.agencyUpID = id;
        },
        updateinfo() {
            const that = this;
            that.upTips1 = '';
            that.upTips2 = '';
            this.btrnew = this.medi_btrnew;
            if ( isNaN(parseInt(that.level_threshold)) ) {
                that.upTips1 = '请在等级阈值中填写数字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(parseInt(that.heartbeat)) ) {
                that.upTips1 = '请在心跳间隔中填写数字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(parseInt(that.heartbeat_num)) ) {
                that.upTips1 = '请在心跳次数中填写数字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(parseInt(that.push_stream_timeout)) ) {
                that.upTips1 = '请在推流超时时间中填写数字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.version == '') {
                that.upTips1 = '请输入版本';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.update === '') {
                that.upTips1 = '请选择是否强制更新';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.music === '') {
                that.upTips1 = '请输入背景音乐';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.count_down === '') {
                that.upTips1 = '请输入倒计时';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.filep2 === '') {
                that.upTips1 = '请上传背景图';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.income === '') {
                that.upTips1 = '请选择收益(v1)';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.balls === '') {
                that.upTips1 = '请选择收益';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }  else if (that.withdraw === '') {
                that.upTips1 = '请选择是否提现';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.convert === '') {
                that.upTips1 = '请选择是否兑换';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.push_stream_exit === '') {
                that.upTips1 = '请选择是否退出推流';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.os === '') {
                that.upTips1 = '请选择平台';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.os == 1 && !that.matchUrl.test(that.cn_link) ) {
                that.upTips1 = '请填写china store link';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.tip == '') {
                that.upTips1 = '请输入提示信息';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.link == '') {
                that.upTips1 = '请输入链接';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.report_stream_quality === '') {
                that.upTips1 = '请选择是否上报推流质量';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(parseInt(that.adjust)) ) {
                that.upTips1 = '请在推码流开关中填写数字';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.btr == '') {
                that.upTips1 = '请输入推码流率(old)';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.share_time_Interval == '') {
                that.upTips1 = '请输入分享时间间隔';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.paylog === '') {
                that.upTips1 = '请选择是否支付日志上报';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            }  else if (that.update_title == '') {
                that.upTips1 = '请输入升级标题';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else if (that.update_content == '') {
                that.upTips1 = '请输入升级内容';
                setTimeout(function() {
                    that.upTips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/app/config/update',
                    type: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: JSON.stringify({
                        "id": that.agencyUpID,
                        "level_threshold": that.level_threshold,
                        "heartbeat": that.heartbeat,
                        "heartbeat_num": that.heartbeat_num,
                        "push_stream_timeout": that.push_stream_timeout,
                        "version": that.version,
                        "update": that.update,
                        "music": that.music,
                        "income": that.income,
                        "balls": that.balls,
                        "withdraw": that.withdraw,
                        "convert": that.convert,
                        "push_stream_exit": that.push_stream_exit,
                        "os": that.os,
                        "tip": that.tip,
                        "link": that.link,
                        "report_stream_quality": that.report_stream_quality,
                        "adjust": that.adjust,
                        "btr": that.btr,
                        "btrnew": that.btrnew,
                        "share_time_Interval": that.share_time_Interval,
                        "paylog": that.paylog,
                        "update_title": that.update_title,
                        "update_content": that.update_content,
                        "startup_image_url": that.filep2,
                        "count_down": that.count_down,
                        "cn_link": that.cn_link
                    }),
                    success: function(data) {
                        let code = data.returncode;
                        console.log(data)
                        if(code == '200') {
                            that.upTips1 = '';
                            that.upTips2 = '操作成功';
                            that.roleList(that.page, that.size)
                            setTimeout(function() {
                                that.upTips2 = '';
                                $('#updateModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        } else if (code == '301') {
                            that.upTips1 = '参数错误';
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
        searchRole() {
            const that = this;
            that.page = 1;
            that.roleList(that.page, that.size);
        },
        resetaddRole() {
            const that = this;
            this.newlevel_threshold = "";
            this.newheartbeat = "";
            this.newheartbeat_num = "";
            this.newpush_stream_timeout = "";
            this.newversion = "";
            this.newupdate = "";
            this.newmusic = "";
            this.newincome = "";
            this.newballs = "";
            this.newwithdraw = "";
            this.newconvert = "";
            this.newpush_stream_exit = "";
            this.newos = "";
            this.newtip = "";
            this.newlink = "";
            this.newreport_stream_quality = "";
            this.newadjust = "";
            this.newbtr = "",
            this.newbtrnew = [{
                "des": '',
                "val": ''
            }],
            this.newlevel = "";
            this.newshare_time_Interval = "";
            this.newpaylog = "";
            this.newupdate_title = "";
            this.newupdate_content = "";
            this.medi_newbtrnew = this.newbtrnew;
            this.filep1 = '';
            this.newcount_down = '';
            this.newcn_link = '';
        },
        addRole() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            this.newbtrnew = this.medi_newbtrnew;
            if ( isNaN(parseInt(that.newlevel_threshold)) ) {
                that.addATips1 = '请在等级阈值中填写数字';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(parseInt(that.newheartbeat)) ) {
                that.addATips1 = '请在心跳间隔中填写数字';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(parseInt(that.newheartbeat_num)) ) {
                that.addATips1 = '请在心跳次数中填写数字';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(parseInt(that.newpush_stream_timeout)) ) {
                that.addATips1 = '请在推流超时时间中填写数字';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newversion == '') {
                that.addATips1 = '请输入版本';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newupdate === '') {
                that.addATips1 = '请选择是否强制更新';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newmusic === '') {
                that.addATips1 = '请输入背景音乐';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.filep1 === '') {
                that.addATips1 = '请上传背景图';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newcount_down === '') {
                that.addATips1 = '请输入倒计时';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newincome === '') {
                that.addATips1 = '请选择收益(v1)';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newballs === '') {
                that.addATips1 = '请选择收益';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }  else if (that.newwithdraw === '') {
                that.addATips1 = '请选择是否提现';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newconvert === '') {
                that.addATips1 = '请选择是否兑换';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newpush_stream_exit === '') {
                that.addATips1 = '请选择是否退出推流';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newos === '') {
                that.addATips1 = '请选择平台';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newos == 1 && !that.matchUrl.test(that.newcn_link)) {
                that.addATips1 = '请填写china store link';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newtip == '') {
                that.addATips1 = '请输入提示信息';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newlink == '') {
                that.addATips1 = '请输入链接';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newreport_stream_quality === '') {
                that.addATips1 = '请选择是否上报推流质量';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( isNaN(parseInt(that.newadjust)) ) {
                that.addATips1 = '请在推码流开关中填写数字';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newbtr == '') {
                that.addATips1 = '请输入推码流率(old)';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newshare_time_Interval == '') {
                that.addATips1 = '请输入分享时间间隔';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newpaylog === '') {
                that.addATips1 = '请选择是否支付日志上报';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            }  else if (that.newupdate_title == '') {
                that.addATips1 = '请输入升级标题';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.newupdate_content == '') {
                that.addATips1 = '请输入升级内容';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/app/config/create',
                    type: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: JSON.stringify({
                        "level_threshold": that.newlevel_threshold,
                        "heartbeat": that.newheartbeat,
                        "heartbeat_num": that.newheartbeat_num,
                        "push_stream_timeout": that.newpush_stream_timeout,
                        "version": that.newversion,
                        "update": that.newupdate,
                        "music": that.newmusic,
                        "income": that.newincome,
                        "balls": that.newballs,
                        "withdraw": that.newwithdraw,
                        "convert": that.newconvert,
                        "push_stream_exit": that.newpush_stream_exit,
                        "os": that.newos,
                        "tip": that.newtip,
                        "link": that.newlink,
                        "report_stream_quality": that.newreport_stream_quality,
                        "adjust": that.newadjust,
                        "btr": that.newbtr,
                        "btrnew": that.newbtrnew,
                        "share_time_Interval": that.newshare_time_Interval,
                        "paylog": that.newpaylog,
                        "update_title": that.newupdate_title,
                        "update_content": that.newupdate_content,
                        "startup_image_url": that.filep1,
                        "count_down": that.newcount_down,
                        "cn_link": that.newcn_link
                    }),
                    success: function(data) {
                        let code = data.returncode;
                        console.log(data)
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = '操作成功';
                            that.roleList(that.page, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addRole);
                        } else if (code == '301') {
                            that.addATips1 = '参数错误';
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


        create_info(arr) {
            const that = this;
            that.des = '';
            that.val = '';
            arr.push({
                "des": that.des,
                "val": that.val
            })
        },

        del_info(index, arr) {
            arr.splice(index,1)
        },

        is_status(status) {
            var txt = '';
            if(status == 0){
                txt = '否'
            }else if(status == 1){
                txt = '是'
            }
            return txt;
        },

        is_update(status) {
            var txt = '';
            if(status == 0){
                txt = '不更新'
            }else if(status == 1){
                txt = '提示更新'
            }else if( status == 2){
                txt = '强制更新'
            }
            return txt;
        },

        is_os(os) {
            var txt = '';
            if(os == 0){
                txt = 'ios'
            }else if(os == 1){
                txt = 'android'
            }
            return txt;
        },

        pageBegin() {
            const that = this;
            that.page = 1;
            that.roleList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.roleList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.roleList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.roleList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 5);
        this.$store.dispatch('subChanger', 'sub6');

        this.roleList(this.page, this.size);
        this.initImgUpload();
    }
}
</script>
