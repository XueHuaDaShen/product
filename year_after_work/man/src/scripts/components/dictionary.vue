<template id="">
<div class="">
    <div class="fuDic" v-if="!detail">
        <div class="AM-top" style="text-align:left">
            <button type="button" style="margin-left:0;margin-top:8px;" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetFuDicFn">New Top dictionary</button>
            <span class="AM-tips1" style="left:40%">{{AMtips1}}</span>
            <span class="AM-tips2" style="left:40%">{{AMtips2}}</span>
        </div>
        <table class="table table-striped table-hover AM-table">
            <!-- <caption class = "AM-cap">代理商信息</caption> -->
            <thead>
                <tr>
                    <th class="AM-agentID">代理商id</th>
                    <th>key</th>
                    <th>code</th>
                    <th>status</th>
                    <th>operation</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(agent, index) in fuDicDataList">
                    <td class="AM-agentID">{{agent._id}}</td>
                    <td>{{agent.name}}</td>
                    <td>{{agent.code}}</td>
                    <td><i v-bind:class="agent.enable == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                                Select
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="javascript: void(0)" @click="seeInfo(agent._id, agent.name)">Sub list</a></li>
                            </ul>

                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="AMnav">
            <ul class="pagination" v-if="fuPageShow">
                <li><a href="javascript:void(0);" @click="pageBegin(fuDicListFn, fuPage)">Begin</a></li>
                <li><a href="javascript:void(0);" @click="pagePre(fuDicListFn, fuPage)">&laquo;</a></li>
                <div class="pageL">
                    <li v-for="pageN in fuPageList">
                        <a href="javascript:void(0);" v-bind:class="pageN == fuPage ? 'activePage2' : ''"
                           @click="fuDicListFn(pageN, size)">{{pageN}}</a>
                    </li>
                </div>
                <li><a href="javascript:void(0);" @click="pageNext(fuDicListFn, fuPage)">&raquo;</a></li>
                <li><a href="javascript:void(0);" @click="pageEnd(fuDicListFn, fuPage)">End</a></li>
            </ul>
        </nav>
        <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">New Top Dictionary</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">Key (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" id="inputEmail1" class="form-control" placeholder="name" v-model.trim="fu_newdic_name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail4" class="col-sm-2 control-label">code (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" id="inputEmail1" class="form-control" placeholder="code" v-model.trim="fu_newdic_code">
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
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" :disabled="isClick" @click="addFuDicFn">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ziDic" v-if="detail">
        <div class="AM-top" style="margin-top: 10px;">
            <button style="float: left; margin-top: 3px; margin-right:5%;" type="button" class="btn btn-primary AM-add" @click="goBack">BACK
            </button>
            <button style="float: left; margin-top: 3px;" type="button" class="btn btn-primary AM-add"
                    data-toggle='modal' data-target="#ziAddAgentModal" @click="resetZiDicFn">New Sub dictionary
            </button>
            <span class="AM-tips1" style="left:40%">{{info2AMtips1}}</span>
            <span class="AM-tips2" style="left:40%">{{info2AMtips2}}</span>
        </div>
        <table class="table table-striped table-hover AM-table">
            <!-- <caption class = "AM-cap">代理商信息</caption> -->
            <thead>
                <tr>
                    <th class="AM-agentID">代理商id</th>
                    <th>top dict</th>
                    <th>key</th>
                    <th>code</th>
                    <th>status</th>
                    <th>operation</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(agent, index) in ziDicDataList">
                    <td class="AM-agentID">{{agent._id}}</td>
                    <td>{{fuDicName}}</td>
                    <td>{{agent.name}}</td>
                    <td>{{agent.code}}</td>
                    <td><i v-bind:class="agent.enable == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                                Select
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a href="javascript: void(0)" @click="getZiDicIdFn(agent._id, agent.name)" data-toggle='modal'
                                       data-target="#delModalZiDic">Delete</a></li>
                            </ul>

                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="AMnav">
            <ul class="pagination" v-if="ziPageShow">
                <li><a href="javascript:void(0);" @click="pageBegin(ziDicListFn, ziPage)">Begin</a></li>
                <li><a href="javascript:void(0);" @click="pagePre(ziDicListFn, ziPage)">&laquo;</a></li>
                <div class="pageL">
                    <li v-for="pageN in ziPageList">
                        <a href="javascript:void(0);" v-bind:class="pageN == ziPage ? 'activePage2' : ''"
                           @click="ziDicListFn(pageN, size)">{{pageN}}</a>
                    </li>
                </div>
                <li><a href="javascript:void(0);" @click="pageNext(ziDicListFn, ziPage)">&raquo;</a></li>
                <li><a href="javascript:void(0);" @click="pageEnd(ziDicListFn, ziPage)">End</a></li>
            </ul>
        </nav>
        <div class="modal fade bs-example-modal-lg" id="ziAddAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">New Sub dictionary</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">top dict (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" id="inputEmail1" class="form-control" readOnly v-model.trim="fuDicName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">key (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" id="inputEmail1" class="form-control" placeholder="name" v-model.trim="zi_newdic_name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail4" class="col-sm-2 control-label">code (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" id="inputEmail1" class="form-control" placeholder="code" v-model.trim="zi_newdic_code">
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
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" :disabled="isClick" @click="addZiDicFn">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bs-example-modal-lg" id="delModalZiDic" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                                class="sr-only">Close</span></button>
                        <h4 class="modal-title" style="text-align: center">Delete</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <h5 style="text-align: center;">Are you sure to delete the dictionary name <em style="color:#F56C6C">“{{ziDicName}}”</em>？</h5>

                            <div class="addTips">
                                {{delTips1}}
                            </div>
                            <div class="addTips2">
                                {{delTips2}}
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" :disabled="isClick" @click="delZiDicFn">Confirm</button>
                    </div>
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
            //父类 字典
            fuDicDataList: [],
            fuDicName: "",
            fu_newdic_name: "",
            fu_newdic_code: "",

            fuDicId: '',

            fuPage: 1,
            fuPageShow: true,
            fuPageList: [],

            //子类 字典
            ziDicDataList: [],
            ziDicName: "",
            zi_newdic_name: "",
            zi_newdic_code: "",

            ziDicId: '',

            ziPage: 1,
            ziPageShow: false,
            ziPageList: [],

            detail: false,

            addATips1: "",
            addATips2: "",
            delTips1: "",
            delTips2: "",
            upTips1: "",
            upTips2: "",
            size: 10,
            pagesShow: false,
            agencyN: "",
            agencyU: "",
            agencyUpID: "",
            AMtips1: "",
            AMtips2: "",
            info2AMtips1: "",
            info2AMtips2: "",
            tempName: '',
            isClick: false,
        }
    },

    methods: {
        //父类 字典
        //列表
        fuDicListFn(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/list',
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
                        that.fuDicDataList = data.data.data;
                        that.fuPageShow = true;
                        that.fuPageList = [1];
                        if (page > data.data.totalPageNum) {
                            that.fuDicListFn(data.data.totalPageNum, size);
                            return false;
                        } else if (page <= 0) {
                            return false;
                        } else {
                            that.fuPage = page;
                            that.fuPageList = [];
                            let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                            let maxPage = Math.min(data.data.totalPageNum, Math.ceil(page / 5) * 5);
                            for (let i = pageStart; i <= maxPage; i++) {
                                that.fuPageList.push(i);
                            }
                            that.AMtips1 = 'The request is successful';;
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 500);
                        }
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.fuDicListFn(that.fuPage, that.size)});
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
        //新增
        resetFuDicFn() {
            const that = this;
            that.fu_newdic_name = "";
            that.fu_newdic_code = "";
        },
        addFuDicFn() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.fu_newdic_name === '') {
                that.addATips1 = 'Please fill in the dictionary name.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.fu_newdic_code === '') {
                that.addATips1 = 'Please enter the dictionary code.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                that.isClick = true;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/dict/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "name": that.fu_newdic_name,
                        "code": that.fu_newdic_code
                    },
                    success: function(data) {
                        that.isClick = false;
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = 'Operation is successful';
                            that.fuDicListFn(that.fuPage, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#addAgentModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addFuDicFn);
                        } else if (code == '302') {
                            that.addATips1 = 'Dictionary code duplication';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 1500);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function() {
                        that.isClick = false;
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }
        },
        //子类 字典
        //返回到 父字典
        goBack() {
            const that = this;
            setTimeout(function(){that.detail = false;},100)
            this.fuDicListFn(this.fuPage, this.size);
            that.ziPageShow = false;
        },
        //列表
        seeInfo(id, name) {
            const that = this;
            this.fuDicId = id;
            this.fuDicName = name;
            this.ziPage = 1;
            that.fuPageShow = false;
            this.ziDicListFn(this.ziPage, this.size);
            setTimeout(function(){that.detail = true;},100)
        },
        ziDicListFn(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "parentid": that.fuDicId,
                    "page": page,
                    "size": size
                },
                success: function(data){
                    let code = data.returncode;
                    if(code == 200){
                        that.ziDicDataList = data.data.data;
                        that.ziPageShow = true;
                        that.ziPageList = [1];
                        if (page > data.data.totalPageNum) {
                            that.ziDicListFn(data.data.totalPageNum, size);
                            return false;
                        } else if (page <= 0) {
                            return false;
                        } else {
                            that.ziPage = page;
                            that.ziPageList = [];
                            let pageStart = Math.floor((page - 1) / 5) * 5 + 1;
                            let maxPage = Math.min(data.data.totalPageNum, Math.ceil(page / 5) * 5);
                            for (let i = pageStart; i <= maxPage; i++) {
                                that.ziPageList.push(i);
                            }
                            that.info2AMtips1 = 'The request is successful';;
                            setTimeout(function() {
                                that.info2AMtips1 = '';
                            }, 500);
                        }
                    } else if (code == '301') {
                        console.log('Parameter error');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function(){that.ziDicListFn(that.ziPage, that.size)});
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
        //新增
        resetZiDicFn() {
            const that = this;
            that.zi_newdic_name = "";
            that.zi_newdic_code = "";
        },
        addZiDicFn() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.zi_newdic_name === '') {
                that.addATips1 = 'Please fill in the dictionary name.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.zi_newdic_code === '') {
                that.addATips1 = 'Please enter the dictionary code.';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                that.isClick = true;
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/dict/create',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "parentid": that.fuDicId,
                        "name": that.zi_newdic_name,
                        "code": that.zi_newdic_code
                    },
                    success: function(data) {
                        that.isClick = false;
                        let code = data.returncode;
                        if(code == '200') {
                            that.addATips1 = '';
                            that.addATips2 = 'Operation is successful';
                            that.ziDicListFn(that.ziPage, that.size)
                            setTimeout(function() {
                                that.addATips2 = '';
                                $('#ziAddAgentModal').modal('hide');
                            }, 500);
                        } else if (code == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addZiDicFn);
                        } else if (code == '302') {
                            that.addATips1 = 'Dictionary code duplication';
                            setTimeout(function() {
                                that.addATips1 = '';
                            }, 1500);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function() {
                        that.isClick = false;
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }
        },
        //删除
        getZiDicIdFn(id, name) {
            this.ziDicId = id;
            this.ziDicName = name;
        },
        delZiDicFn() {
            const that = this;
            that.isClick = true;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/dict/del',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "id": that.ziDicId
                },
                success: function (data) {
                    that.isClick = false;
                    if (data.returncode == '200') {
                        that.delTips2 = 'Operation is successful';
                        that.ziDicListFn(that.ziPage, that.size);
                        setTimeout(function () {
                            that.delTips2 = '';
                            $('#delModalZiDic').modal('hide');
                        }, 500);
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.delZiDicFn);
                    } else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function () {
                    that.isClick = false;
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        },

        pageBegin(callback, page) {
            const that = this;
            page = 1;
            callback(page, that.size);
        },
        pageEnd(callback, page) {
            const that = this;
            page = Number.POSITIVE_INFINITY;
            callback(page, that.size);
        },
        pagePre(callback, page) {
            const that = this;
            if (page > 1) {
                page--;
                callback(page, that.size);
            } else {
                return false;
            }

        },
        pageNext(callback, page) {
            const that = this;
            page++;
            callback(page, that.size);
        },

    },

    mounted() {
        this.$store.dispatch('tabChanger', 67);
        this.$store.dispatch('subChanger', 'sub10');
        this.fuDicListFn(this.fuPage, this.size);
    }
}
</script>
