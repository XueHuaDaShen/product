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
                        <h4 class="modal-title" id="myModalLabel" style="text-align: center">新增动画效果</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">name (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="name" v-model.trim="name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">类型 (*)</label>
                                <div class="col-sm-10">
                                    <select class=" form-control" v-model="addType">
                                        <option value="entrance">entrance</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">image_url (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="image_url" v-model.trim="addImage">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-2 control-label">background_url (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="background_url" v-model.trim="addBg">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">duration (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="duration" v-model.trim="addDuration">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">height (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="height" v-model.trim="addHeight">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">startY (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="startY" v-model.trim="addY">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">bottomMargin (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="bottomMargin" v-model.trim="bM">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">topMargin (*)</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="topMargin" v-model.trim="tM">
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
                <th>image</th>
                <th>background</th>
                <th>duration</th>
                <th>height</th>
                <th>startY</th>
                <th>bottomMargin</th>
                <th>topMargin</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin._id}}</td>
                <td>{{admin.name}}</td>
                <td>{{admin.type}}</td>
                <td style="overflow: hidden"><a style="color:#777;font-size:24px;cursor: pointer" data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(admin.image_url)" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                <td style="overflow: hidden"><a style="color:#777;font-size:24px;cursor: pointer" data-toggle='modal' data-target="#showImgModal" @click="getImgUrl(admin.background_url)" target="_blank"><i class="fa fa-image" aria-hidden="true"></i></a></td>
                <td>{{admin.duration}}</td>
                <td>{{admin.height}}</td>
                <td>{{admin.startY}}</td>
                <td>{{admin.bottomMargin}}</td>
                <td>{{admin.topMargin}}</td>
                <td><i v-bind:class="admin.enabled == 1 ? 'fa fa-check AM-check' : 'fa fa-times AM-times'" aria-hidden="true"></i></td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="javascript: void(0)" @click="changeState(admin.enabled, admin._id)">启用/禁用</a></li>
                            <li><a href="javascript: void(0)" data-toggle='modal' data-target="#updateModal" @click="resetUpdate(admin._id, admin.type, admin.image_url, admin.background_url, admin.duration, admin.height, admin.startY, admin.name, admin.bottomMargin, admin.topMargin)">编辑动画效果</a></li>
                        </ul>
                    </div>
                </td>
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
    <div class="modal fade bs-example-modal-lg" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title" id="myModalLabel" style="text-align: center">修改动画效果</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">name (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="name" v-model.trim="name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">类型 (*)</label>
                            <div class="col-sm-10">
                                <select class=" form-control" v-model="addType">
                                    <option value="entrance">entrance</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-2 control-label">image_url (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="image_url" v-model.trim="addImage">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-2 control-label">background_url (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="background_url" v-model.trim="addBg">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">duration (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="duration" v-model.trim="addDuration">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">height (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="height" v-model.trim="addHeight">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">startY (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="startY" v-model.trim="addY">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">bottomMargin (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="bottomMargin" v-model.trim="bM">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">topMargin (*)</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="topMargin" v-model.trim="tM">
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
            addType: '',
            addImage: '',
            addBg: '',
            addDuration: '',
            addHeight: '',
            addY: '',
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
            name: '',
            bM: '',
            tM: '',
            showImgUrl: ''
        }
    },

    methods: {
        resetAdd() {
            this.addTips = '';
            this.addTips2 = '';
            this.addType = 'entrance';
            this.addImage = '';
            this.addBg = '';
            this.addDuration = '';
            this.addHeight = '';
            this.addY = '';
            this.name = '';
            this.bM = '';
            this.tM = '';
        },
        getImgUrl(url) {
            this.showImgUrl = url||'图片不存在';
        },
        addAdmin() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';

            if (that.addType === '' || this.addImage === '' || this.addBg === '' || this.addDuration === '' || this.addHeight === '' || that.addY === ''|| that.name === '' || that.bM === '' || that.tM === '') {
                this.addTips = '请把信息补充完整';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else if (isNaN(that.addDuration) || isNaN(that.addHeight) || isNaN(that.addY) || isNaN(that.bM) || isNaN(that.tM)) {
                this.addTips = '请在duration, height, startY, bottomMargin, topMargin中输入数字';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/animation/create',
                    type: "POST",
                    data: {
                        "image_url": that.addImage,
                        "background_url": that.addBg,
                        "type": that.addType,
                        "duration": that.addDuration,
                        "height": that.addHeight,
                        "startY": that.addY,
                        "name": that.name,
                        "bottomMargin": that.bM,
                        "topMargin": that.tM
                    },
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#myModal').modal('hide');
                                that.adminList(that.page, that.size);
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.addAdmin);
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
                url: this.$store.state.rootUrl3 + '/animation/list',
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

        changeState(initState, id) {
            const that = this;
            that.AMtips1 = '';
            that.AMtips2 = '';
            if (initState == 1) {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/animation/disable',
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
                            that.adminList(that.page, that.size);
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                                that.changeState(initState, id)
                            });
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
                    url: that.$store.state.rootUrl3 + '/animation/enable',
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
                            that.adminList(that.page, that.size);
                            setTimeout(function() {
                                that.AMtips1 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                                that.changeState(initState, id)
                            });
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

        resetUpdate(id, type, image, bg, duration, height, startY, name, bM, tM) {
            this.addTips = '';
            this.addTips2 = '';
            this.id = id;
            this.addType = type;
            this.addImage = image;
            this.addBg = bg;
            this.addDuration = duration;
            this.addHeight = height;
            this.addY = startY;
            this.name = name;
            this.bM = bM;
            this.tM = tM;
        },



        update() {
            const that = this;
            that.addTips = '';
            that.addTips2 = '';

            if (that.addType === '' || this.addImage === '' || this.addBg === '' || this.addDuration === '' || this.addHeight === '' || that.addY === ''|| that.name === '' || that.bM === '' || that.tM === '') {
                this.addTips = '请把信息补充完整';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else if (isNaN(that.addDuration) || isNaN(that.addHeight) || isNaN(that.addY) || isNaN(that.bM) || isNaN(that.tM)) {
                this.addTips = '请在duration, height, startY, bottomMargin, topMargin中输入数字';
                setTimeout(function() {
                    that.addTips = '';
                }, 1000);
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/animation/update',
                    type: "POST",
                    data: {
                        "image_url": that.addImage,
                        "background_url": that.addBg,
                        "type": that.addType,
                        "duration": that.addDuration,
                        "height": that.addHeight,
                        "startY": that.addY,
                        "id": that.id,
                        "name": that.name,
                        "bottomMargin": that.bM,
                        "topMargin": that.tM
                    },
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.addTips2 = '操作成功';
                            setTimeout(function() {
                                $('#updateModal').modal('hide');
                                that.adminList(that.page, that.size);
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
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
        this.$store.dispatch('tabChanger', 28);
        this.$store.dispatch('subChanger', 'sub6');

        this.adminList(this.page, this.size);
    }
}
</script>
