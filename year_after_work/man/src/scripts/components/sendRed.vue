<template id="">
<div class="">
    <div class="AM-top"  style="text-align: left; margin-top: 10px;">
        <span class="AM-tips1">{{AMtips1}}</span>
        <span class="AM-tips2" style="left:0">{{AMtips2}}</span>
        <div class="AM-topInfo per">
            <label for="">pid：</label>
            <input type="number" @change="handlePidChange" class="form-control record-info" id="exampleInputEmail1" placeholder="PID"
                   v-model.trim="searchpid">
            <i class="fa fa-search AM-searchBtn" aria-hidden="true" @click="getLiveIDList"></i>
            <select class="form-control record-info" name="" id="exampleInputEmail1" v-model.trim="liveID">
                <option value="">选择房间</option>
                <option v-for="val in liveList" :value="val.liveid">{{ val.hostname }}</option>
            </select>
            <label for="">红包：</label>
            <select class="form-control record-info" name="" id="exampleInputEmail1" v-model.trim="redID">
                <option value="">选择红包</option>
                <option v-for="red in getRed" v-bind:value="[red._id, red.type]">{{red.name}}</option>
            </select>
            <button type="button" class="btn btn-primary AM-add" :disabled="!is_pid" @click="sendRed">发红包</button>
        </div>


    </div>
    <table class="table table-striped table-hover AM-table">
        <!-- <caption class = "AM-cap">代理商信息</caption> -->
        <thead>
            <tr>
                <th>红包类型</th>
                <th>红包名字</th>
                <th>红包数量</th>
                <th>单个红包金额（票）</th>
                <th>红包总金额（钻石）</th>
                <th>单个红包最大金额（钻石）</th>
                <th>红包持续时间</th>
                <th>状态</th>
                <!-- <th>操作</th> -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="admin in adminL">
                <td class="AM-agentID">{{admin.id}}</td>
                <td>{{admin.type==1?'ticket':'diamond'}}</td>
                <td>{{admin.name}}</td>
                <td>{{admin.num}}</td>
                <td>{{admin.size}}</td>
                <td>{{admin.amount}}</td>
                <td>{{admin.max_size || 0}}</td>
                <td>{{admin.expire_time}}</td>
                <td>{{is_status(admin.status)}}</td>
                <!-- <td>
                    <div class="btn-group">
                        <button type="button" class="btn btnAMsmall btn-default dropdown-toggle" data-toggle="dropdown">
                            选择
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li v-show="admin.status==0"><a href="javascript: void(0)" @click="sendRed(admin.id)">发红包</a></li>
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


</div>
</template>

<script>
import utils from '../utils/utils.js';
export default {
    data() {
        return {
            AMtips1: '',
            AMtips2: '',
            addTips: '',
            addTips2: '',
            page: 1,
            size: 10,
            adminL: [],
            upTips1: '',
            upTips2: '',
            adminUpID: '',
            pageL: [],
            name: '',
            type: '',
            number: '',
            amount: '',
            max_size: '',
            red_size: '',
            expire_time: '',
            liveID: '',
            newtype: '',
            newnumber: '',
            newamount: '',
            newmax_size: '',
            newred_size: '',
            newexpire_time: '',
            newliveID: '',
            searchpid: '',
            liveList: [],
            is_pid: false,
            getRed: [],
            redID: '',
        }
    },

    methods: {

        handlePidChange() {
            this.is_pid = false;
        },

        getRedList() {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/redpacket/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": 1,
                    "size": 999
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.getRed = [];
                        that.getRed = data.data.data;

                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.getRedList(that.page, that.page)
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



        adminList(page, size) {
            const that = this;
            that.is_pid = false;
            that.searchpid = '';
            that.liveID = '';
            that.redID = '';
            $.ajax({
                url: this.$store.state.rootUrl3 + '/redpacket/record/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size
                },
                success: function(data) {
                    // console.log(data)
                    if (data.returncode == '200') {
                        that.adminL = [];
                        that.adminL = data.data.data;
                        if (page > data.data.totalPageNum) {
                            that.adminList(data.data.totalPageNum, size);
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
                            that.adminList(that.page, that.page)
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





        sendRed() {
            const that = this;
            if( that.liveID == '' ){
                that.AMtips2 = '请选择房间';
                setTimeout(function() {
                    that.AMtips2 = '';
                }, 2000);
                return false;
            } else if( that.redID == '' ) {
                that.AMtips2 = '请选择红包';
                setTimeout(function() {
                    that.AMtips2 = '';
                }, 2000);
                return false;
            } else {
                if( that.redID[1] == 1 ){
                    // if( that.searchpid == 999 ){
                        $.ajax({
                            url: that.$store.state.rootUrl3 + '/redpacket/record/dispatch',
                            headers: {
                                "token": localStorage.getItem('A-TOKEN')
                            },
                            type: "POST",
                            data: {
                                "liveid": that.liveID,
                                "redpacketid": that.redID[0]
                            },
                            success: function(data){
                                let code = data.returncode;
                                if(code == 200){
                                    that.AMtips1 = '';
                                    that.AMtips1 = '发送成功';
                                    setTimeout(function() {
                                        that.adminList(that.page, that.size);
                                    }, 1000);
                                } else if (code == '301') {
                                    console.log('参数错误');
                                } else if (code == '104') {
                                    utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.delAc);
                                } else if (code == '304') {
                                    that.AMtips2 = '未找到红包';
                                    setTimeout(function() {
                                        that.AMtips2 = '';
                                    }, 2000);
                                } else if (code == '305') {
                                    that.AMtips2 = '红包已经发过';
                                    setTimeout(function() {
                                        that.AMtips2 = '';
                                    }, 2000);
                                } else if (code == '306') {
                                    that.AMtips2 = '直播房间不存在';
                                    setTimeout(function() {
                                        that.AMtips2 = '';
                                    }, 2000);
                                } else if (code == '307') {
                                    that.AMtips2 = '直播已结束';
                                    setTimeout(function() {
                                        that.AMtips2 = '';
                                    }, 2000);
                                } else {
                                    utils.handleLogOut(data.returncode, that);
                                }
                            },
                            fail: function() {
                                console.log('Ajax Error');
                                utils.loginAgain(that);
                            }

                        })
                    // }else{
                    //     that.AMtips2 = '发送ticket红包，pid必须为999';
                    //     setTimeout(function() {
                    //         that.AMtips2 = '';
                    //     }, 2000);
                    //     return false;
                    // }
                }else {
                    $.ajax({
                        url: that.$store.state.rootUrl3 + '/redpacket/record/dispatch',
                        headers: {
                            "token": localStorage.getItem('A-TOKEN')
                        },
                        type: "POST",
                        data: {
                            "liveid": that.liveID,
                            "redpacketid": that.redID[0]
                        },
                        success: function(data){
                            let code = data.returncode;
                            if(code == 200){
                                that.AMtips1 = '';
                                that.AMtips1 = '发送成功';
                                setTimeout(function() {
                                    that.adminList(that.page, that.size);
                                }, 1000);
                            } else if (code == '301') {
                                console.log('参数错误');
                            } else if (code == '104') {
                                utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.delAc);
                            } else if (code == '304') {
                                that.AMtips2 = '未找到红包';
                                setTimeout(function() {
                                    that.AMtips2 = '';
                                }, 2000);
                            } else if (code == '305') {
                                that.AMtips2 = '红包已经发过';
                                setTimeout(function() {
                                    that.AMtips2 = '';
                                }, 2000);
                            } else if (code == '306') {
                                that.AMtips2 = '直播房间不存在';
                                setTimeout(function() {
                                    that.AMtips2 = '';
                                }, 2000);
                            } else if (code == '307') {
                                that.AMtips2 = '直播已结束';
                                setTimeout(function() {
                                    that.AMtips2 = '';
                                }, 2000);
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
            }
            
            
        },


        getLiveIDList() {
            const that = this;
            that.is_pid = false;
            if( that.searchpid == '' ){
                that.AMtips2 = '请输入pid';
                setTimeout(function() {
                    that.AMtips2 = '';
                }, 2000);
            }else{
                $.ajax({
                    url: this.$store.state.rootUrl3 + '/live/list',
                    type: "GET",
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    data: {
                        "pid": that.searchpid
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.liveList = [];
                            that.liveList = data.data.data;
                            if( that.liveList && that.liveList.length>0 ){
                                that.is_pid = true;
                            }else{
                                that.is_pid = false;
                                that.AMtips2 = "当前用户没有直播";
                                setTimeout(function(){
                                    that.AMtips2 = "";
                                },1000)
                            }
                            
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.getLiveIDList);
                        } else if (data.returncode == '303' ){
                            that.is_pid = false;
                            that.AMtips2 = "pid不存在";
                            setTimeout(function(){
                                that.AMtips2 = "";
                            },1000)
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


        is_status(status) {
            switch(status){
                case -1:
                    return "失败";
                    break;
                case 0:
                    return "初始化";
                    break;
                case 1:
                    return "成功";
                    break;
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
        this.$store.dispatch('tabChanger', 48);
        this.$store.dispatch('subChanger', 'sub4');
        // console.log(this.$store.state.tabIndex);
        this.adminList(this.page, this.size);
        this.getRedList();
    }
}
</script>
