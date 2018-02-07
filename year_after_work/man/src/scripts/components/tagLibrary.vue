<template id="">
<div class="">
    <div class="AM-top" style="text-align:left">
        <button type="button" style="margin-left:0;margin-top:8px;" class="btn btn-primary AM-add" data-toggle='modal' data-target="#addAgentModal" @click="resetaddMenu">新增</button>
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2">{{AMtips2}}</span>
    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th class="AM-agentID">代理商id</th>
                <th>type</th>
                <th>content</th>
                <!-- <th>操作</th> -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="(agent, index) in agentL">
                <td class="AM-agentID">{{agent.id}}</td>
                <td>{{agent.type==0?'Default':''}}</td>
                <td>{{agent.content}}</td>
                <!-- <td>
                    <button type="button" class="btn btn-primary btnAMsmall" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(agent.type, agent.content, agent.id)">
                      编辑
                    </button>
                </td> -->
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
    <div class="modal fade bs-example-modal-lg" id="addAgentModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增tag</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">type (*)</label>
                            <div class="col-sm-10">
                                <select class="form-control" name="" v-model.trim="menu_name">
                                    <option value="">类型</option>
                                    <!-- <option value="1">推荐主播</option> -->
                                    <option value="0">Default</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">content (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="content" v-model.trim="menu_url">
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
   <!--  <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">更新tag</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">tag名称 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="tag名称" v-model.trim="agencyN">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputEmail4" class="col-sm-2 control-label">tag路径 (*)</label>
                            <div class="col-sm-10">
                                <input type="text" id="inputEmail1" class="form-control" placeholder="tag路径" v-model.trim="agencyU">
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
    </div> -->
</div>
</template>

<script>
import utils from '../utils/utils.js';
export default {
    data() {
        return {
            agentL: [],
            menu_name: "",
            menu_url: "",
            addATips1: "",
            addATips2: "",
            upTips1: "",
            upTips2: "",
            page: 1,
            size: 10,
            pagesShow: false,
            pageL: [],
            agencyN: "",
            agencyU: "",
            agencyUpID: "",
            AMtips1: "",
            AMtips2: "",
            tempName: '',
        }
    },

    methods: {
        menuList(page, size) {
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/tag/list',
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
        // resetUpdate(name, url, id) {
        //     this.upTips1 = '';
        //     this.upTips2 = '';
        //     this.agencyN = name;
        //     this.agencyU = url;
        //     this.agencyUpID = id;
        //     this.tempName = name;
        // },
        // update() {
        //     const that = this;
        //     that.upTips1 = '';
        //     that.upTips2 = '';
        //     if (that.agencyN == '') {
        //         that.upTips1 = '请填写tag名称';
        //         setTimeout(function() {
        //             that.upTips1 = '';
        //         }, 500);
        //         return false;
        //     } else if (that.agencyU == '') {
        //         that.upTips1 = '请输入地址';
        //         setTimeout(function() {
        //             that.upTips1 = '';
        //         }, 500);
        //         return false;
        //     } else {
        //         $.ajax({
        //             url: that.$store.state.rootUrl3 + '/auth/menu/update',
        //             type: "POST",
        //             headers: {
        //                 "token": localStorage.getItem('A-TOKEN')
        //             },
        //             data: {
        //                 "id": that.agencyUpID,
        //                 "menu_name": that.agencyN,
        //                 "url": that.agencyU
        //             },
        //             success: function(data) {
        //                 let code = data.returncode;
        //                 if(code == '200') {
        //                     that.upTips1 = '';
        //                     that.upTips2 = '操作成功';
        //                     // console.log(that.$store.state.menus[1].name);
        //                     // for (let i = 0; i < that.$store.state.menus.length; i++) {
        //                     //     if (that.$store.state.menus[i].name === that.tempName) {
        //                     //         that.$store.state.menus[i].name = that.agencyN;
        //                     //         that.$store.state.menus[i].url = that.agencyU;
        //                     //     }
        //                     // }
        //                     that.menuList(that.page, that.size)
        //                     setTimeout(function() {
        //                         that.upTips2 = '';
        //                         $('#updateModal').modal('hide');
        //                     }, 500);
        //                 } else if (code == '104') {
        //                     utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
        //                 } else if (code == '302') {
        //                     that.upTips1 = 'tag已存在，请更换代tag名称';
        //                     setTimeout(function() {
        //                         that.upTips1 = '';
        //                     }, 500);
        //                 } else {
        //                     utils.handleLogOut(data.returncode, that);
        //                 }
        //             },
        //             fail: function() {
        //                 console.log('Ajax Error');
        //                 utils.loginAgain(that);
        //             }
        //         })
        //     }
        // },
        resetaddMenu() {
            const that = this;
            that.menu_name = "";
            that.menu_url = "";
        },
        addMenu() {
            const that = this;
            that.addATips1 = '';
            that.addATips2 = '';
            if (that.menu_name == '') {
                that.addATips1 = '请填写tag名称';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else if (that.menu_url == '') {
                that.addATips1 = '请输入地址';
                setTimeout(function() {
                    that.addATips1 = '';
                }, 500);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/tag/save',
                    type: "POST",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "type": that.menu_name,
                        "content": that.menu_url
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
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addMenu);
                        } else if (code == '305') {
                            that.addATips1 = '标签已存在';
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
        this.$store.dispatch('tabChanger', 47);
        this.$store.dispatch('subChanger', 'sub9');
        this.menuList(this.page, this.size);
    }
}
</script>
