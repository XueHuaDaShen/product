<template id="">
<div class="">
    <div class="AM-top">
        <h3 class="" style="color: rgb(66, 139, 202); font-weight: 500; font-style: italic">
            欢迎来到 TuTulive !
        </h3>
        <div ba-panel="" ba-panel-class="profile-page" class="authorityWrap">
            <div class="panel  profile-page animated zoomIn" zoom-in="">
                <div class="panel-body">
                    <div class="panel-content">
                        <form role="form">
                            <div class="col-md-6">
                                <h3 class="with-line" style="margin-bottom: 30px;">我的信息</h3>
                                <form class="form-horizontal" role="form">
                                    <div style="display: none;">
                                        {{adminUpID}}/{{userid}}
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">Email</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" disabled="" v-model.trim="adminE">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">名字</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" placeholder="名字" v-model.trim="adminN">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" placeholder="电话">电话</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" v-model.trim="adminP">
                                        </div>
                                    </div>
                                    <div class="au-save" style="margin: 0 auto; float: none; margin-top: 15px;" @click="update">
                                        保存
                                    </div>
                                    <div class="upTips1">
                                        {{upTips1}}
                                    </div>
                                    <div class="upTips2">
                                        {{upTips2}}
                                    </div>
                                </form>

                            </div>



                            <div class="col-md-6">
                                <h3 class="with-line" style="margin-bottom: 30px;">修改密码</h3>
                                <form class="form-horizontal" role="form">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">原密码</label>
                                        <div class="col-sm-8">
                                            <input type="password" class="form-control" placeholder="原密码" v-model.trim="oldP">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">新密码</label>
                                        <div class="col-sm-8">
                                            <input type="password" class="form-control" placeholder="新密码" v-model.trim="newP1">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label" placeholder="确认密码">确认密码</label>
                                        <div class="col-sm-8">
                                            <input type="password" class="form-control" v-model.trim="newP2" placeholder="确认密码">
                                        </div>
                                    </div>
                                    <div class="au-save" style="margin: 0 auto; float: none; margin-top: 15px;" @click="updateP">
                                        修改
                                    </div>
                                    <div class="upTips1">
                                        {{upTips3}}
                                    </div>
                                    <div class="upTips2">
                                        {{upTips4}}
                                    </div>
                                </form>

                            </div>
                        </form>

                    </div>
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
            adminN: '',
            adminE: '',
            adminP: '',
            upTips1: '',
            upTips2: '',
            upTips3: '',
            upTips4: '',
            adminUpID: '',
            oldP: '',
            newP1: '',
            newP2: '',
            userid: '',
        }
    },

    methods: {

        infor() {
            this.adminN = '';
            this.adminE = '';
            this.adminP = '';
            this.upTips1 = '';
            this.upTips2 = '';
            this.upTips3 = '';
            this.upTips4 = '';
            this.adminUpID = '';
            this.oldP = '';
            this.newP1 = '';
            this.newP2 = '';
            this.userid = '';
            const that = this;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/admin/show',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                success: function(data) {
                    if (data.returncode == '200') {
                        console.log(data);
                        that.adminUpID = data.data._id;
                        that.adminE = data.data.email;
                        that.adminN = data.data.name;
                        that.adminP = data.data.phone;
                        that.userid = data.data.userid;
                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.infor);
                    } else {
                        utils.handleLogOut(data.returncode, that);
                    }
                }
            })

        },

        update() {
            const that = this;
            if (that.adminN == '') {
                that.upTips2 = '用户名不能为空';
                setTimeout(function() {
                    that.upTips2 = '';
                }, 1000);
                return false;
            }else {
                // console.log(1);
                $.ajax({
                    url: that.$store.state.rootUrl3 + '/admin/update',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "name": that.adminN,
                        "id": that.adminUpID,
                        "phone": that.adminP,
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.upTips2 = '';
                            that.upTips1 = '操作成功';

                            setTimeout(function(){
                                that.upTips1 = '';
                                that.infor();
                            }, 1000);

                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.update);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    },
                    fail: function(data) {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }
        },

        updateP() {
            const that = this;
            if (that.oldP == "" || that.newP1 == "" || that.newP2 == "") {
                that.upTips4 = '请把密码填写完整';
                setTimeout(function() {
                    that.upTips4 = '';
                }, 1000);
                return false;
            } else if (that.newP1 != that.newP2) {
                that.upTips4 = '新密码两次不一致';
                setTimeout(function() {
                    that.upTips4 = '';
                }, 1000);
                return false;
            } else if (that.oldP == that.newP1) {
                that.upTips4 = '新密码与原密码重复，请重新输入新密码';
                setTimeout(function() {
                    that.upTips4 = '';
                }, 1000);
                return false;
            } else {
                $.ajax({
                    url: that.$store.state.rootUrl + '/user/modifypass',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "POST",
                    data: {
                        "user_id": that.userid,
                        "password": CryptoJS.MD5(that.oldP).toString(),
                        "new_pass": CryptoJS.MD5(that.newP1).toString()
                    },
                    success: function(data) {
                        if (data.returncode == '200') {
                            that.upTips3 = '修改密码成功';
                            setTimeout(function() {
                                that.upTips3 = '';
                                that.infor();
                            }, 1000);
                        } else if (data.returncode == '305') {
                            that.upTips4 = '原密码错误，请重新输入原密码';
                            that.oldP = '';
                            setTimeout(function() {
                                that.upTips4 = '';
                            }, 1000);
                        } else if (data.returncode == '104') {
                            utils.refreshToken(that, localStorage.getItem('R-TOKEN'), that.updateP);
                        } else {
                            utils.handleLogOut(data.returncode, that);
                        }
                    }
                })
            }
        },



    },





    mounted() {
        this.$store.dispatch('tabChanger', 24);
        this.$store.dispatch('subChanger', 'sub1');
//         console.log(this.$store.state.tabIndex);
//         console.log(this.$store.state.subIndex);
        this.infor();
        let initNum = localStorage.getItem('INITNUM');
        if (initNum === '0') {
            this.$router.go(0);
            localStorage.setItem('INITNUM', 1);
        }

    }
}
</script>
