<template id="">
<div class="">
    <div class="AM-top"  style="margin-top: 10px;">
        <button style = "float: left; margin-top: 3px;" type="button" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddUnion">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
        <!-- <div class="AM-topR" style = "float: right; margin-right: 3.9%; margin-bottom: 25px;">
            <input type="text" class="form-control AM-search" id="exampleInputEmail1" placeholder="请输入白名单名称" v-model.trim = "name">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="searchUnion"></i>
        </div> -->

    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th class="AM-agentID">白名单id</th>
                <th>ip</th>
                <th>国家</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent._id}}</td>
                <td>{{agent.ip}}</td>
                <td>{{ country(agent.cc) }}</td>
                <td>
                    <!-- <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent.ip, agent.cc, agent._id)">编辑</a></li>
                            <li><a href="javascript: void(0)" @click="deleteList(agent._id)">删除</a></li>
                        </ul>
                    </div> -->
                    <button type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#stopModal" @click="getCountryID(agent._id)">
                      删除
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="modal fade bs-example-modal-lg" id="stopModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">删除</h4>
                </div>
                <div class="modal-body">
                    <div class="messageWrap" style="font-size: 16px;">
                        是否确定删除
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
    <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增白名单</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">ip (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="ip" v-model.trim="newip">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">Country (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="newcc">
                                    <option value="">请选择国家</option>
                                    <option value="TH">泰国</option>
                                    <option value="VN">越南</option>
                                    <option value="IN">印尼</option>
                                    <option value="OT">其他</option>
                                </select>
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
    <!-- <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改白名单</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">ip (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="ip" v-model.trim="ip">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail1" class="col-sm-2 control-label">Country (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model.trim="cc">
                                    <option value="">请选择国家</option>
                                    <option value="TH">泰国</option>
                                    <option value="VN">越南</option>
                                    <option value="IN">印尼</option>
                                    <option value="OT">其他</option>
                                </select>
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
                    <button type="button" class="btn btn-primary" @click="update">确认</button>
                </div>
            </div>
        </div>
    </div> -->
</div>
</template>

<script>
import utils from '../utils/utils.js';
var testIP = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
export default {
    data() {
        return {
            agentL: [],
            name: "",
            ip: "",
            cc: "",
            newip: "",
            newcc: "",
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
            countryID: ""
        }
    },

    methods: {
        unionList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/ip/list',
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
                    // console.log(data)
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
        // searchUnion() {
        //     const that = this;
        //     that.page = 1;
        //     that.unionList(that.page, that.size);
        // },
        // resetUpdate(ip, cc, id) {
        //     this.upTips1 = '';
        //     this.upTips2 = '';
        //     this.ip = ip;
        //     this.cc = cc;
        //     this.agencyUpID = id;
        // },
        // update() {
        //     const that = this;
        //     that.upTips1 = '';
        //     that.upTips2 = '';
        //     if (that.ip == '') {
        //         that.upTips1 = '请填写ip';
        //         setTimeout(function() {
        //             that.upTips1 = '';
        //         }, 500);
        //         return false;
        //     } else if ( !testIP.test( that.ip ) ) {
        //         this.upTips1 = '请输入正确的ip';
        //         setTimeout(function() {
        //             that.upTips1 = '';
        //         }, 1000);
        //         return false;
        //     } else if ( that.cc == '' ) {
        //         this.upTips1 = '请输入国家';
        //         setTimeout(function() {
        //             that.upTips1 = '';
        //         }, 1000);
        //         return false;
        //     } else {
        //         $.ajax({
        //             url: that.$store.state.rootUrl3 + '/ip/create',
        //             type: "POST",
        //             headers: {
        //                 "token": localStorage.getItem('A-TOKEN')
        //             },
        //             data: {
        //                 "id": that.agencyUpID,
        //                 "ip": that.ip,
        //                 "cc": that.cc
        //             },
        //             success: function(data) {
        //                 let code = data.returncode;
        //                 if(code == '200') {
        //                     that.upTips1 = '';
        //                     that.upTips2 = '操作成功';
        //                     that.unionList(that.page, that.size)
        //                     setTimeout(function() {
        //                         that.upTips2 = '';
        //                         $('#updateModal').modal('hide');
        //                     }, 500);
        //                 } else if (code == '104') {
        //                     utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
        //                 } else if (code == '304' || code == '106'|| code == '102' || data.returncode == '103') {
        //                     utils.loginAgain(that);
        //                 }else if (code == '305') {
        //                     that.upTips1 = 'ip已存在';
        //                     setTimeout(function() {
        //                         that.upTips1 = '';
        //                     }, 500);
        //                 }
        //             },
        //             fail: function() {
        //                 console.log('Ajax Error');
        //                 utils.loginAgain(that);
        //             }
        //         })
        //     }
        // },
        resetaddUnion() {
            const that = this;
            that.newip = "";
            that.newcc = "";
        },
        addUnion() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.newip == '') {
                that.addATips1 = '请填写ip';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if ( !testIP.test( that.newip ) ) {
                this.addATips1 = '请输入正确的ip';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else if ( that.newcc == '' ) {
                this.addATips1 = '请输入国家';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/ip/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "ip": that.newip,
                        "cc": that.newcc
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
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addUnion);
                        } else if (code == '305') {
                            that.addATips1 = 'ip已存在';
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
        getCountryID(id) {
            this.countryID = id;
        },
        deleteList() {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/ip/delete',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": that.countryID
                },
                success: function(data){
                    if (data.returncode == '200') {
                        that.upTips2 = '操作成功';
                        that.unionList(that.page, that.size);
                        setTimeout(function() {
                            that.upTips2 = '';
                            $('#stopModal').modal('hide');
                        }, 500);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.deleteList(id)});
                    } else if (data.returncode == '303') {
                        that.AMtips2 = '服务器错误';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 2000);
                    } else if ( data.returncode == '106'|| data.returncode == '102' || data.returncode == '103' ) {
                        utils.loginAgain(that);
                    } else {
                        that.AMtips2 = '操作失败';
                        setTimeout(function() {
                            that.AMtips2 = '';
                        }, 1000);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            })
        },

        country(cc){
            switch(cc){
                case "TH":
                  return "泰国";
                  break;
                case "VN":
                  return "越南";
                  break;
                case "IN":
                  return "印尼";
                  break;
                case "OT":
                  return "其他";
                  break;
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
        this.$store.dispatch('tabChanger', 38);
        this.$store.dispatch('subChanger', 'sub7');

        this.unionList(this.page, this.size);
    }
}
</script>
