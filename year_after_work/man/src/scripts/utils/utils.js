import vuex from '../vuex/store.js';
const utils = {
    getToken(that, bearer, username) {

        for (let countN = 0; countN < 71; countN++ ) {

            vuex.state.autho[countN] = 0;
        }
        $.ajax({
            url: that.$store.state.rootUrl3 + '/authorise',
            headers: {
                "authorization": bearer
            },
            type: "GET",
            success: function(data) {
                if (data.returncode == '200') {
                    // console.log(data.data.code);
                    let code = data.data.code;
                    $.ajax({
                        url: that.$store.state.rootUrl + '/oauth/token',
                        headers: {
                            "authorization": bearer
                        },
                        type: "POST",
                        data: {
                            code: code
                        },
                        success: function(data) {
                            if (data.returncode == '200') {
                                // console.log(data.data.refresh_token);
                                localStorage.setItem('A-TOKEN', data.data.access_token);
                                localStorage.setItem('R-TOKEN', data.data.refresh_token);
                                localStorage.setItem('USERNAME', username);
                                localStorage.setItem('INITNUM', '0');

                                $.ajax({
                                    url: that.$store.state.rootUrl3 + '/admin/check',
                                    headers: {
                                        "token": localStorage.getItem('A-TOKEN')
                                    },
                                    type: "POST",
                                    success: function(data) {
                                        if (data.returncode == '200') {
                                            // that.$router.push('/manage');
                                            $.ajax({
                                                url: that.$store.state.rootUrl3 + '/auth/role/menu/list',
                                                headers: {
                                                    "token": localStorage.getItem('A-TOKEN')
                                                },
                                                type: "GET",
                                                success: function(data) {
                                                    if (data.returncode == '200') {
                                                        let roleMenu = data.data;
                                                        $.ajax({
                                                            url: that.$store.state.rootUrl3 + '/auth/menu/list',
                                                            headers: {
                                                                "token": localStorage.getItem('A-TOKEN')
                                                            },
                                                            type: "GET",
                                                            data: {
                                                                "page": 1,
                                                                "size": 999
                                                            },
                                                            success: function(data){
                                                                let code = data.returncode;
                                                                if(code == 200){
                                                                    // console.log(data.data.data);
                                                                    for (let i = 0; i < data.data.data.length; i++) {
                                                                        // vuex.state.menus[i].name = data.data.data[i].menu_name;
                                                                        // vuex.state.menus[i].url = data.data.data[i].url;
                                                                        // 路由已经定义好 无法更改
                                                                        for (let j = 0; j < roleMenu.length; j++) {
                                                                            if(roleMenu[j].menu_name === data.data.data[i].menu_name) {
                                                                                // console.log(data.data.data[i].menu_name);
                                                                                vuex.state.autho[i] = 1;
                                                                            }

                                                                        }

                                                                    }
                                                                    // console.log(vuex.state.autho);
                                                                    localStorage.setItem(username + 'AUTHO', vuex.state.autho);

                                                                    that.$router.push('/manage');


                                                                    // console.log(vuex.state.menus[0].name);
                                                                    // that.$router.push('/manage');

                                                                } else if (code == '301') {
                                                                    console.log('参数错误');
                                                                } else if (code == '304' || data.returncode == '106'|| data.returncode == '102') {
                                                                    utils.loginAgain(that);
                                                                }
                                                            },
                                                            fail: function() {
                                                                console.log('Ajax Error');
                                                                utils.loginAgain(that);
                                                            }

                                                        })

                                                    } else {
                                                        that.logTips = '登录失败，您没有权限登录';
                                                    }

                                                },
                                                fail: function() {
                                                    that.logTips = '登录失败';
                                                }
                                            })
                                        } else {
                                            that.logTips = '登录失败，您没有权限登录';
                                        }

                                    },
                                    fail: function() {
                                        that.logTips = '登录失败';
                                    }
                                })


                                // that.$router.push('/manage');



                            } else if (data.returncode = '301') {
                                console.log('服务器内部错误');
                            }

                        },
                        fail: function() {
                            console.log('Ajax Error');
                        }
                    });

                }

            },
            fail: function() {
                console.log('Ajax Error');
            }
        });

    },

    refreshToken(that, refreshToken, cb) {
        $.ajax({
            url: that.$store.state.rootUrl + '/oauth/refreshToken',
            data: {
                "refresh_token": refreshToken
            },
            type: "POST",
            success: function(data) {
                // debugger;
                if (data.returncode == '200') {

                    // console.log('refreshToken = ' + data.data);
                    // debugger;
                    localStorage.setItem('A-TOKEN', data.data.access_token);
                    localStorage.setItem('R-TOKEN', data.data.refresh_token);
                    cb();
                } else if (data.returncode == '301') {
                    // console.log(refreshToken);
                    // console.log('参数错误');
                    localStorage.removeItem('A-TOKEN');
                    localStorage.removeItem('R-TOKEN');
                    that.$router.push('/user');
                } else if (data.returncode == '304') {
                    // debugger;
                    localStorage.removeItem('A-TOKEN');
                    localStorage.removeItem('R-TOKEN');
                    localStorage.removeItem(localStorage.getItem('USERNAME') +  'AUTHO');
                    localStorage.removeItem('USERNAME');
                    that.$router.push('/login');
                }
            },
            fail: function() {
                console.log('Ajax Error');
            }
        });
    },

    loginAgain(that) {
        localStorage.removeItem('A-TOKEN');
        localStorage.removeItem('R-TOKEN');
        localStorage.removeItem(localStorage.getItem('USERNAME') +  'AUTHO');
        localStorage.removeItem('USERNAME');
        that.$router.push('/login');
    },

    handlerErr(that, code, func) {
        var suc = false;
        if(code) {
            if(code == 304 || code == 102 ||  code == 103 || code == 106) {
                this.loginAgain(that);
            }else if(code == 104){
                this.refreshToken(that, localStorage.getItem('R-TOKEN'), func)
            }else if(code == 303){
                alert('服务器内部错误');
            }else if (code == 200){
                suc = true;
            } else {
                console.log('returncode-----' + code);
            }
        }else{
            alert("请求服务异常");
        }
        return suc;
    },

    handleLogOut(code, that) {
        if (code == 102 || code == 103 || code == 106 || code == 304) {
            this.loginAgain(that)
        } else if (code == 109) {
            alert('此账号不具有相应的权限，请重新登录！');
            this.loginAgain(that)
        }
    }


};
export default utils;
