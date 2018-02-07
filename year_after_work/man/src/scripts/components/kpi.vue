<template id="">
<div class="">
    <div class="AM-top" style="margin-top: 10px;">
        <button style="float:left;margin-bottom: 25px;" type="button" class="btn btn-primary AM-add" data-toggle="modal" data-target="#myModal" @click="resetAdd">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <!-- Modal -->
        <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增kpi标准</h4>
                    </div>
                    <div class="modal-body">
                        <form name="myForm">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group row clearfix">
                                        <label for="name" class="col-sm-3 control-label">name</label>

                                        <div class="col-sm-9">
                                            <input type="text" name="name" v-model.trim="name" class="form-control" id="name" required="" placeholder="name">
                                        </div>
                                    </div>

                                    <div class="form-group row clearfix">
                                        <label for="name" class="col-sm-3 control-label">type</label>

                                        <div class="col-sm-9">
                                            <input type="text" name="type" v-model.trim="type" class="form-control" id="name" required="" placeholder="type">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group row clearfix">
                                        <label for="send_random_rate" class="col-sm-3 control-label">version</label>

                                        <div class="col-sm-9">
                                            <input type="number" name="send_random_rate" v-model.trim="version" min="1" max="99" class="form-control" placeholder="version" id="send_random_rate" required="">


                                        </div>
                                    </div>

                                    <div class="form-group row clearfix">
                                        <label for="zan_rate" class="col-sm-3 control-label">sharetimes</label>

                                        <div class="col-sm-9">
                                            <input type="number" name="zan_rate" v-model.trim="sharetimes" class="form-control" id="zan_rate" placeholder="sharetimes" required="">
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-4">
                                    <div class="form-group row clearfix">
                                        <label for="df_join_time_range" class="col-sm-3 control-label">fans</label>

                                        <div class="col-sm-9">
                                            <input type="number" name="df_join_time_range" v-model.trim="fans" class="form-control" id="df_join_time_range" required="" placeholder="fans">

                                        </div>
                                    </div>

                                    <div class="form-group row clearfix">
                                        <label for="df_leave_time_range" class="col-sm-3 control-label">days</label>

                                        <div class="col-sm-9">
                                            <input type="number" name="df_leave_time_range" v-model="days" class="form-control" id="df_leave_time_range" required="" placeholder="days">
                                        </div>
                                    </div>
                                </div>


                                <div class="col-md-4">
                                    <div class="form-group row clearfix">
                                        <label for="df_join_num_range2" class="col-sm-3 control-label">hours</label>

                                        <div class="col-sm-9">
                                            <input type="text" name="join_num_range3" v-model.trim="hours" class="form-control" required="" placeholder="hours">
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="row">

                                <div class="form-group">

                                    <div class="col-md-6">
                                        <div class="form-group row clearfix">
                                            <label class="col-sm-2 control-label">withdraw1</label>
                                            <div class="col-sm-9">
                                                <input type="text" v-model.trim="withdraw1v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                                <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                                <input type="text" v-model.trim="withdraw1d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group row clearfix">
                                            <label class="col-sm-2 control-label">withdraw2 (选填)</label>

                                            <div class="col-sm-9">
                                                <input type="text" v-model.trim="withdraw2v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                                <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                                <input type="text" v-model.trim="withdraw2d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                            </div>


                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group row clearfix">
                                            <label class="col-sm-2 control-label">withdraw3 (选填)</label>

                                            <div class="col-sm-9">
                                                <input type="text" v-model.trim="withdraw3v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                                <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                                <input type="text" v-model.trim="withdraw3d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">

                                <div class="form-group">

                                    <div class="col-md-6">
                                        <div class="form-group row clearfix">
                                            <label class="col-sm-2 control-label">bonus1</label>
                                            <div class="col-sm-9">
                                                <input type="text" v-model.trim="bonus1v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                                <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                                <input type="text" v-model.trim="bonus1d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group row clearfix">
                                            <label class="col-sm-2 control-label">bonus2 (选填)</label>

                                            <div class="col-sm-9">
                                                <input type="text" v-model.trim="bonus2v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                                <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                                <input type="text" v-model.trim="bonus2d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                            </div>


                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group row clearfix">
                                            <label class="col-sm-2 control-label"> bonus3 (选填)</label>

                                            <div class="col-sm-9">
                                                <input type="text" v-model.trim="bonus3v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                                <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                                <input type="text" v-model.trim="bonus3d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                            </div>


                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="row">

                                <div class="form-group">

                                    <div class="col-md-6">
                                        <div class="form-group row clearfix">
                                            <label class="col-sm-2 control-label">dailycoins1</label>
                                            <div class="col-sm-9">
                                                <input type="text" v-model.trim="dailycoins1v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                                <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                                <input type="text" v-model.trim="dailycoins1d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group row clearfix">
                                            <label class="col-sm-2 control-label">dailycoins2 (选填)</label>

                                            <div class="col-sm-9">
                                                <input type="text" v-model.trim="dailycoins2v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                                <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                                <input type="text" v-model.trim="dailycoins2d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                            </div>


                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group row clearfix">
                                            <label class="col-sm-2 control-label">dailycoins3 (选填)</label>

                                            <div class="col-sm-9">
                                                <input type="text" v-model.trim="dailycoins3v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                                <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                                <input type="text" v-model.trim="dailycoins3d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 7px;">
                                <div class="form-group">
                                    <label class="col-sm-1 control-label">note1</label>
                                    <div class="col-sm-11">
                                        <input type="text" class="form-control" placeholder="note1" v-model.trim="note1" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <label class="col-sm-1 control-label">note2 (选填)</label>
                                    <div class="col-sm-11">
                                        <input type="text" class="form-control" placeholder="note2" v-model.trim="note2" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <label class="col-sm-1 control-label">note3 (选填)</label>
                                    <div class="col-sm-11">
                                        <input type="text" class="form-control" placeholder="note3" v-model.trim="note3" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="addTips">
                                {{addTips}}
                            </div>
                            <div class="addTips2">
                                {{addTips2}}
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="addAdmin">确认</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>name</th>
                <th>type</th>
                <th>version</th>
                <th>sharetimes</th>
                <th>fans</th>
                <th>days</th>
                <th>hours</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.name}}</td>
                <td>{{admin.type}}</td>
                <td>{{admin.version}}</td>
                <td>{{admin.standard_sharetimes}}</td>
                <td>{{admin.standard_fans}}</td>
                <td>{{admin.standard_days}}</td>
                <td>{{admin.standard_hours}}</td>
                <!-- <td>{{admin.standard_withdraw}}</td> -->
                <td>
                    <button type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.name, admin.type, admin.version, admin.standard_sharetimes, admin.standard_fans, admin.standard_days, admin.standard_hours, admin.standard_withdraw, admin.standard_bouns, admin.standard_dailycoins, admin.note)">
                      编辑
                    </button>
                </td>
                <!-- <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">

                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.name, admin.type, admin.version, admin.standard_sharetimes, admin.standard_fans, admin.standard_days, admin.standard_hours, admin.standard_withdraw, admin.standard_bouns, admin.standard_dailycoins, admin.note)">编辑详细信息</a></li>
                        </ul>
                    </div>
                </td> -->
            </tr>

        </tbody>
    </table>

    <nav class="AMnav">
        <ul class="pagination">
            <li><a href="javascript:void(0);" @click="pageBegin">Begin</a></li>
            <li><a href="javascript:void(0);" @click="pagePre">&laquo;</a></li>
            <div class="pageL">
                <li v-for="pageN in pageL">
                    <a href="javascript:void(0);" v-bind:class="pageN == page ? 'activePage2' : ''" @click="adminList(pageN, size)">{{pageN}}</a>
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
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">编辑详细信息</h4>
                </div>
                <div class="modal-body">
                    <form name="myForm">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group row clearfix">
                                    <label for="name" class="col-sm-3 control-label">name</label>

                                    <div class="col-sm-9">
                                        <input type="text" name="name" v-model.trim="name" class="form-control" id="name" required="" placeholder="name">
                                    </div>
                                </div>

                                <div class="form-group row clearfix">
                                    <label for="name" class="col-sm-3 control-label">type</label>

                                    <div class="col-sm-9">
                                        <input type="text" name="type" v-model.trim="type" class="form-control" id="name" required="" placeholder="type" disabled="">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group row clearfix">
                                    <label for="send_random_rate" class="col-sm-3 control-label">version</label>

                                    <div class="col-sm-9">
                                        <input type="number" name="send_random_rate" v-model.trim="version" min="1" max="99" class="form-control" placeholder="version" id="send_random_rate" required="">


                                    </div>
                                </div>

                                <div class="form-group row clearfix">
                                    <label for="zan_rate" class="col-sm-3 control-label">sharetimes</label>

                                    <div class="col-sm-9">
                                        <input type="number" name="zan_rate" v-model.trim="sharetimes" class="form-control" id="zan_rate" placeholder="sharetimes" required="">
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-4">
                                <div class="form-group row clearfix">
                                    <label for="df_join_time_range" class="col-sm-3 control-label">fans</label>

                                    <div class="col-sm-9">
                                        <input type="number" name="df_join_time_range" v-model.trim="fans" class="form-control" id="df_join_time_range" required="" placeholder="fans">

                                    </div>
                                </div>

                                <div class="form-group row clearfix">
                                    <label for="df_leave_time_range" class="col-sm-3 control-label">days</label>

                                    <div class="col-sm-9">
                                        <input type="number" name="df_leave_time_range" v-model="days" class="form-control" id="df_leave_time_range" required="" placeholder="days">
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-4">
                                <div class="form-group row clearfix">
                                    <label for="df_join_num_range2" class="col-sm-3 control-label">hours</label>

                                    <div class="col-sm-9">
                                        <input type="text" name="join_num_range3" v-model.trim="hours" class="form-control" required="" placeholder="hours">
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="row">

                            <div class="form-group">

                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label class="col-sm-2 control-label">withdraw1</label>
                                        <div class="col-sm-9">
                                            <input type="text" v-model.trim="withdraw1v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                            <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                            <input type="text" v-model.trim="withdraw1d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label class="col-sm-2 control-label">withdraw2 (选填)</label>

                                        <div class="col-sm-9">
                                            <input type="text" v-model.trim="withdraw2v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                            <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                            <input type="text" v-model.trim="withdraw2d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                        </div>


                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label class="col-sm-2 control-label">withdraw3 (选填)</label>

                                        <div class="col-sm-9">
                                            <input type="text" v-model.trim="withdraw3v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                            <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                            <input type="text" v-model.trim="withdraw3d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">

                            <div class="form-group">

                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label class="col-sm-2 control-label">bonus1</label>
                                        <div class="col-sm-9">
                                            <input type="text" v-model.trim="bonus1v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                            <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                            <input type="text" v-model.trim="bonus1d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label class="col-sm-2 control-label">bonus2 (选填)</label>

                                        <div class="col-sm-9">
                                            <input type="text" v-model.trim="bonus2v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                            <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                            <input type="text" v-model.trim="bonus2d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                        </div>


                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label class="col-sm-2 control-label"> bonus3 (选填)</label>

                                        <div class="col-sm-9">
                                            <input type="text" v-model.trim="bonus3v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                            <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                            <input type="text" v-model.trim="bonus3d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="row">

                            <div class="form-group">

                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label class="col-sm-2 control-label">dailycoins1</label>
                                        <div class="col-sm-9">
                                            <input type="text" v-model.trim="dailycoins1v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                            <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                            <input type="text" v-model.trim="dailycoins1d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label class="col-sm-2 control-label">dailycoins2 (选填)</label>

                                        <div class="col-sm-9">
                                            <input type="text" v-model.trim="dailycoins2v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                            <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                            <input type="text" v-model.trim="dailycoins2d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                        </div>


                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group row clearfix">
                                        <label class="col-sm-2 control-label">dailycoins3 (选填)</label>

                                        <div class="col-sm-9">
                                            <input type="text" v-model.trim="dailycoins3v" class="form-control" required="" style="width: 45%; float: left;" placeholder="value" disabled>
                                            <span style="display: inline-block; height: 34px; line-height: 34px; width: 10%; text-align: center">---</span>
                                            <input type="text" v-model.trim="dailycoins3d" class="form-control" required="" style="width: 45%; float: right" placeholder="desc" disabled>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="margin-bottom: 7px;">
                            <div class="form-group">
                                <label class="col-sm-1 control-label">note1</label>
                                <div class="col-sm-11">
                                    <input type="text" class="form-control" placeholder="note1" v-model.trim="note1" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <label class="col-sm-1 control-label">note2 (选填)</label>
                                <div class="col-sm-11">
                                    <input type="text" class="form-control" placeholder="note2" v-model.trim="note2" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <label class="col-sm-1 control-label">note3 (选填)</label>
                                <div class="col-sm-11">
                                    <input type="text" class="form-control" placeholder="note3" v-model.trim="note3" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="addTips">
                            {{addTips}}
                        </div>
                        <div class="addTips2">
                            {{addTips2}}
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
            AMtips1: '',
            AMtips2: '',
            name: '',
            type: '',
            version: '',
            sharetimes: '',
            fans: '',
            days: '',
            hours: '',
            value: '',
            desc: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            id: '',
            adminL: [],
            upTips1: '',
            upTips2: '',
            adminUpID: '',
            pageL: [],
            withdraw1v: '',
            withdraw1d: '',
            withdraw2v: '',
            withdraw2d: '',
            withdraw3v: '',
            withdraw3d: '',
            bonus1v: '',
            bonus1d: '',
            bonus2v: '',
            bonus2d: '',
            bonus3v: '',
            bonus3d: '',
            dailycoins1v: '',
            dailycoins1d: '',
            dailycoins2v: '',
            dailycoins2d: '',
            dailycoins3v: '',
            dailycoins3d: '',
            note1: '',
            note2: '',
            note3: '',
        }
    },

    methods: {
        resetAdd() {
            this.name = '';
            this.type = '';
            this.note1 = '';
            this.note2 = '';
            this.note3 = '';
            this.version = 1.0;
            this.fans = 0;
            this.sharetimes = 0;
            this.days = 20;
            this.hours = 10;
            this.withdraw1v = 10000;
            this.withdraw1d = "10K";
            this.withdraw2v = '';
            this.withdraw2d = '';
            this.withdraw3v = '';
            this.withdraw3d = '';
            this.bonus1v = 10000;
            this.bonus1d = "10K";
            this.bonus2v = 30000;
            this.bonus2d = "30K";
            this.bonus3v = 80000;
            this.bonus3d = "80K";
            this.dailycoins1v = 2000;
            this.dailycoins1d = "Poor";
            this.dailycoins2v = 8000;
            this.dailycoins2d = "Middle";
            this.dailycoins3v = 20000;
            this.dailycoins3d = "Rich";
            this.note1 = 'VJs must complete Days and Hours Task to get their monthly salary';
            this.note2 = 'Monhtly fish balls greater than 10000 can be withdrawed: >10K, C Level; >30K, B Level; >80K, A Level';
            this.note3 = 'Monhtly fish balls less than 10000 will be added to cumulative fish balls, which can be withdrawed beyond 10000';
        },

        addAdmin() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';

            if (that.name === '' || that.version === '' || that.fans === '' || that.type === '' || that.sharetimes === '' || that.days === '' || that.hours === '' || that.withdraw1v === '' || that.withdraw1d === '' || that.bonus1v === '' || that.bonus1d ===
                '' || that.dailycoins1v === '' || that.dailycoins1d === '' || that.note1 === '') {
                that.addTips = '请把信息补充完整';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else {
                let tempWith = [];
                let tempBonus = [];
                let tempDaily = [];
                let tempNote = [];
                if (that.withdraw1v !== '') {
                    tempWith.push({
                        "value": that.withdraw1v,
                        "desc": that.withdraw1d,
                    });
                }
                if (that.withdraw2v !== '') {
                    tempWith.push({
                        "value": that.withdraw2v,
                        "desc": that.withdraw2d,
                    });
                }
                if (that.withdraw3v !== '') {
                    tempWith.push({
                        "value": that.withdraw3v,
                        "desc": that.withdraw3d,
                    });
                }

                if (that.bonus1v !== '') {
                    tempBonus.push({
                        "value": that.bonus1v,
                        "desc": that.bonus1d,
                    });
                }
                if (that.bonus2v !== '') {
                    tempBonus.push({
                        "value": that.bonus2v,
                        "desc": that.bonus2d,
                    });
                }
                if (that.bonus3v !== '') {
                    tempBonus.push({
                        "value": that.bonus3v,
                        "desc": that.bonus3d,
                    });
                }

                if (that.dailycoins1v !== '') {
                    tempDaily.push({
                        "value": that.dailycoins1v,
                        "desc": that.dailycoins1d,
                    });
                }
                if (that.dailycoins2v !== '') {
                    tempDaily.push({
                        "value": that.dailycoins2v,
                        "desc": that.dailycoins2d,
                    });
                }
                if (that.dailycoins3v !== '') {
                    tempDaily.push({
                        "value": that.dailycoins3v,
                        "desc": that.dailycoins3d,
                    });
                }

                if (that.note1 !== '') {
                    tempNote.push(that.note1);
                }
                if (that.note2 !== '') {
                    tempNote.push(that.note2);
                }
                if (that.note3 !== '') {
                    tempNote.push(that.note3);
                }

                let tempObj = {
                    "name": that.name,
                    "type": that.type,
                    "version": that.version,
                    "standard_sharetimes": that.sharetimes,
                    "standard_fans": that.fans,
                    "standard_days": that.days,
                    "standard_hours": that.hours,
                    "id": that.id,
                    "standard_withdraw": tempWith,
                    "standard_bouns": tempBonus,
                    "standard_dailycoins": tempDaily,
                    "note": tempNote
                };
                // console.log(typeof tempObj);
                let param = JSON.stringify(tempObj);
                // console.log(param);
                // console.log(typeof param);
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/kpi/create',
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json',
                    data: param,
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#myModal').modal('hide');
                                that.adminList(that.page, that.size);
                                that.addTips2 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addAdmin);

                        } else if (data.returncode == '301') {
                            that.addTips = '参数错误，请填写正确的参数';
                            setTimeout(function() {
                                that.addTips = '';
                            }, 2000);
                        } else if (data.returncode == '303') {
                            that.addTips = 'type已经存在,请输入列表中不存在的type数字';
                            setTimeout(function() {
                                that.addTips = '';
                            }, 2000);

                        } else {

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

        adminList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/kpi/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        // console.log(data);
                        that.adminL = [];
                        that.adminL = data.data.data;
                        if (page > data.data.totalPageNum) {
                            that.adminList(data.data.totalPageNum, that.size);
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

                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.adminList(that.page, that.size)
                        });
                    } else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        },

        resetUpdate(id, name, type, version, sharetimes, fans, days, hours, withdraw, bonus, dailycoins, note) {
            this.withdraw1v = '';
            this.withdraw1d = '';
            this.withdraw2v = '';
            this.withdraw2d = '';
            this.withdraw3v = '';
            this.withdraw3d = '';
            this.bonus1v = '';
            this.bonus1d = '';
            this.bonus2v = '';
            this.bonus2d = '';
            this.bonus3v = '';
            this.bonus3d = '';
            this.dailyconis1v = '';
            this.dailyconis1d = '';
            this.dailyconis2v = '';
            this.dailyconis2d = '';
            this.dailyconis3v = '';
            this.dailyconis3d = '';
            this.note1 = '';
            this.note2 = '';
            this.note3 = '';

            this.addTips2 = '';
            this.addTips = '';
            this.id = id;
            this.name = name;
            this.type = type;
            this.version = version;
            this.sharetimes = sharetimes;
            this.fans = fans;
            this.days = days;
            this.hours = hours;
            if (withdraw[0]) {
                this.withdraw1v = withdraw[0].value;
                this.withdraw1d = withdraw[0].desc;
            }
            if (withdraw[1]) {
                this.withdraw2v = withdraw[1].value;
                this.withdraw2d = withdraw[1].desc;
            }
            if (withdraw[2]) {
                this.withdraw3v = withdraw[2].value;
                this.withdraw3d = withdraw[2].desc;
            }

            if (bonus[0]) {
                this.bonus1v = bonus[0].value;
                this.bonus1d = bonus[0].desc;
            }
            if (bonus[1]) {
                this.bonus2v = bonus[1].value;
                this.bonus2d = bonus[1].desc;
            }
            if (bonus[2]) {
                this.bonus3v = bonus[2].value;
                this.bonus3d = bonus[2].desc;
            }

            if (dailycoins[0]) {
                this.dailycoins1v = dailycoins[0].value;
                this.dailycoins1d = dailycoins[0].desc;
            }
            if (dailycoins[1]) {
                this.dailycoins2v = dailycoins[1].value;
                this.dailycoins2d = dailycoins[1].desc;
            }
            if (dailycoins[2]) {
                this.dailycoins3v = dailycoins[2].value;
                this.dailycoins3d = dailycoins[2].desc;
            }

            if (note[0]) {
                this.note1 = note[0];
            }
            if (note[1]) {
                this.note2 = note[1];
            }
            if (note[2]) {
                this.note3 = note[2];
            }


        },


        update() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';

            if (that.name === '' || that.version === '' || that.fans === '' || that.type === '' || that.sharetimes === '' || that.days === '' || that.hours === '' || that.withdraw1v === '' || that.withdraw1d === '' || that.bonus1v === '' || that.bonus1d ===
                '' || that.dailycoins1v === '' || that.dailycoins1d === '' || that.note1 === '') {
                that.addTips = '请把信息补充完整';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else {
                let tempWith = [];
                let tempBonus = [];
                let tempDaily = [];
                let tempNote = [];
                if (that.withdraw1v !== '') {
                    tempWith.push({
                        "value": that.withdraw1v,
                        "desc": that.withdraw1d,
                    });
                }
                if (that.withdraw2v !== '') {
                    tempWith.push({
                        "value": that.withdraw2v,
                        "desc": that.withdraw2d,
                    });
                }
                if (that.withdraw3v !== '') {
                    tempWith.push({
                        "value": that.withdraw3v,
                        "desc": that.withdraw3d,
                    });
                }

                if (that.bonus1v !== '') {
                    tempBonus.push({
                        "value": that.bonus1v,
                        "desc": that.bonus1d,
                    });
                }
                if (that.bonus2v !== '') {
                    tempBonus.push({
                        "value": that.bonus2v,
                        "desc": that.bonus2d,
                    });
                }
                if (that.bonus3v !== '') {
                    tempBonus.push({
                        "value": that.bonus3v,
                        "desc": that.bonus3d,
                    });
                }

                if (that.dailycoins1v !== '') {
                    tempDaily.push({
                        "value": that.dailycoins1v,
                        "desc": that.dailycoins1d,
                    });
                }
                if (that.dailycoins2v !== '') {
                    tempDaily.push({
                        "value": that.dailycoins2v,
                        "desc": that.dailycoins2d,
                    });
                }
                if (that.dailycoins3v !== '') {
                    tempDaily.push({
                        "value": that.dailycoins3v,
                        "desc": that.dailycoins3d,
                    });
                }

                if (that.note1 !== '') {
                    tempNote.push(that.note1);
                }
                if (that.note2 !== '') {
                    tempNote.push(that.note2);
                }
                if (that.note3 !== '') {
                    tempNote.push(that.note3);
                }

                let tempObj = {
                    "name": that.name,
                    "type": that.type,
                    "version": that.version,
                    "standard_sharetimes": that.sharetimes,
                    "standard_fans": that.fans,
                    "standard_days": that.days,
                    "standard_hours": that.hours,
                    "id": that.id,
                    "standard_withdraw": tempWith,
                    "standard_bouns": tempBonus,
                    "standard_dailycoins": tempDaily,
                    "note": tempNote
                };
                console.log(typeof tempObj);
                let param = JSON.stringify(tempObj);
                console.log(param);
                console.log(typeof param);
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/kpi/update',
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json',
                    data: param,
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#updateModal').modal('hide');
                                that.adminList(that.page, that.size);
                                that.addTips2 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);

                        } else if (data.returncode == '301') {
                            that.addTips = '参数错误，请填写正确的参数';
                            setTimeout(function() {
                                that.addTips = '';
                            }, 2000);
                        } else {
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



        pageBegin() {
            const that = this;
            that.page = 1;
            that.adminList(that.page, that.size);
        },
        pageEnd() {
            const that = this;
            that.page = Number.POSITIVE_INFINITY;
            that.adminList(that.page, that.size);
        },
        pagePre() {
            const that = this;
            if (that.page > 1) {
                that.page--;
                that.adminList(that.page, that.size);
            } else {
                return false;
            }

        },
        pageNext() {
            const that = this;
            that.page++;
            that.adminList(that.page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 30);
        this.$store.dispatch('subChanger', 'sub5');

        this.adminList(this.page, this.size);
    }
}
</script>
