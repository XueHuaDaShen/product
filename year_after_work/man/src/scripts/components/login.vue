<template id="">
<div class="hasbg">
    <div class="signin">
        <div class="signin-head"><img src="/img/head_120.png" alt="" class="img-circle"></div>
        <form class="form-signin" role="form">
            <div class="box"><span><img src="/img/login_user.png"></span><input type="text" class="form-control" placeholder="邮箱地址" required autofocus id="form-username" v-model="username"  v-on:keyup.enter="login"/></div>
            <div class="box"><span><img src="/img/login_pas.png"></span><input type="password" class="form-control" placeholder="密码" required id="form-password" v-model="userpassword"  v-on:keyup.enter="login"/></div>
            <button class="btn btn-lg btn-warning btn-block" type="button" v-on:click="login">登录</button>
            <div class="logTips">
                {{logTips}}
            </div>
            <!-- <label class="checkbox">
                    <input type="checkbox" value="remember-me"> 记住我
                </label> -->
        </form>
    </div>
</div>
</template>

<script>
import utils from '../utils/utils.js';
export default {
    data() {
        return {
            username: '',
            userpassword: '',
            logTips: ''
        }
    },

    methods: {
        login() {
            let that = this;
            this.logTips = '';
            if (this.username == '') {
                this.logTips = '请输入邮箱地址';
            } else if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(this.username))) {
                this.logTips = '请输入正确的邮箱地址';
            } else if (this.userpassword == '') {
                this.logTips = '请输入密码';
            } else {
                $.ajax({
                    url: this.$store.state.rootUrl + '/user/random',
                    type: "GET",
                    data: 'email=' + this.username,
                    success: function(e) {
                        if (e.returncode == 200) {
                            let salt = e.data.salt;
                            let new_password = CryptoJS.HmacMD5(CryptoJS.MD5(that.userpassword).toString(), salt).toString();
                            $.ajax({
                                url: that.$store.state.rootUrl + '/user/login',
                                data: {
                                    "username": that.username,
                                    "password": new_password
                                },
                                type: "POST",
                                success: function(e) {
                                    if (e.returncode == '304') {
                                        that.logTips = '用户不存在';
                                    } else if (e.returncode == '305') {
                                        that.logTips = '密码错误';
                                    } else if (e.returncode == '200') {
                                        utils.getToken(that, e.data.bearer, that.username);
                                    } else if (e.returncode == '306') {
                                        that.logTips = '您的账号被禁止登陆，请联系管理员';
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
                    fail: function() {
                        console.log('Ajax Error');
                        utils.loginAgain(that);
                    }
                })
            }
        }
    },

    mounted() {
    }
}
</script>
