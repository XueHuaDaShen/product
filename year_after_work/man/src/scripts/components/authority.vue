<template id="">
<div class="">
    <span class="AM-tips1 au-tips1">{{AMtips1}}</span>
    <span class="AM-tips2 au-tips2">{{AMtips2}}</span>
    <span class="AM-tips1 au-tips3">{{AMtips3}}</span>
    <span class="AM-tips2 au-tips4">{{AMtips4}}</span>
    <div ba-panel="" ba-panel-class="profile-page" class="authorityWrap">
        <div class="panel  profile-page animated zoomIn" zoom-in="">
            <div class="panel-body">
                <div class="panel-content">
                    <form role="form">
                        <div class="col-md-6">
                            <h3 class="with-line">角色列表</h3>
                            <div v-for="role in roleL" class="au-role">
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="role" v-bind:value="role._id" v-on:click="rmenuList(role._id)"
                                        v-model="selectedRole">
                                        {{role.name}}
                                    </label>
                                </div>
                            </div>

                        </div>



                        <div class="col-md-6">
                            <h3 class="with-line">菜单列表</h3>
                            <div v-for="menu in menuL" class="au-menu">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" v-bind:value="menu._id" v-model="checkedMenus">
                                        {{menu.menu_name}}
                                    </label>
                                </div>
                            </div>


                            <div class="au-save" v-show="aushow" v-on:click="ausave(selectedRole, checkedMenus)">
                                保存
                            </div>
                            <span class="AM-tips5">{{AMtips5}}</span>
                            <span class="AM-tips6">{{AMtips6}}</span>
                            <!-- {{checkedMenus}}
                            {{selectedRole}} -->
                        </div>
                    </form>

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
            AMtips3: '',
            AMtips4: '',
            AMtips5: '',
            AMtips6: '',
            page: 1,
            size: 999,
            roleL: [],
            menuL: [],
            menuidL: [],
            aushow: false,
            checkedMenus: [],
            selectedRole: '',
        }
    },

    methods: {
        roleList(page, size) {
            const that = this;
            $.ajax({
                url: this.$store.state.rootUrl3 + '/auth/role/list',
                type: "GET",
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                data: {
                    "page": page,
                    "size": size,
                },
                success: function(data) {
                    if (data.returncode == '200') {
                        that.roleL = [];
                        that.roleL = data.data.data;
                        that.AMtips1 = '请求成功';;
                        setTimeout(function() {
                            that.AMtips1 = '';
                        }, 500);

                    } else if (data.returncode == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.roleList(that.page, that.page)
                        });
                    }  else {
                        utils.handleLogOut(data.returncode, that);
                    }
                },
                fail: function() {
                    console.log('Ajax Error');
                    utils.loginAgain(that);
                }
            });
        },

        menuList(page, size) {
            const that = this;
            that.aushow = false;
            that.menuidL = [];
            $.ajax({
                url: that.$store.state.rootUrl3 + '/auth/menu/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "page": page,
                    "size": size
                },
                success: function(data) {
                    let code = data.returncode;
                    if (code == 200) {
                        that.menuL = data.data.data;
                        for (let i = 0; i < data.data.data.length; i++) {
                            that.menuidL.push(data.data.data[i]._id);
                        }
                        that.AMtips3 = '请求成功';
                        that.aushow = true;
                        setTimeout(function() {
                            that.AMtips3 = '';
                        }, 500);

                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.menuList(that.page, that.size)
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
        },

        rmenuList(roleid) {
            const that = this;
            //that.selectedRole = '';
            that.checkedMenus = [];
            that.aushow = false;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/auth/role/menu/list',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "GET",
                data: {
                    "role_id": roleid
                },
                success: function(data) {
                    let code = data.returncode;
                    if (code == 200) {
                        for (let i = 0; i < data.data.length; i++) {
                            for (let j = 0; j < that.menuidL.length; j++) {
                                if (data.data[i]._id == that.menuidL[j]) {
                                    that.checkedMenus.push(data.data[i]._id);
                                }
                            }
                        }
                        that.AMtips3 = '请求成功';
                        that.aushow = true;
                        setTimeout(function() {
                            that.AMtips3 = '';
                        }, 500);

                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.rmenuList(roleid)
                        });
                    } else if (code == "306") {
                        that.aushow = true;
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

        ausave(role, menu) {
            const that = this;
            if (that.selectedRole == '') {
                that.AMtips6 = '请选择角色';
                setTimeout(function() {
                    that.AMtips6 = '';
                }, 1000);
                return false;
            } else if (that.checkedMenus.length == 0) {
                that.AMtips6 = '请选择菜单';
                setTimeout(function() {
                    that.AMtips6 = '';
                }, 1000);
                return false;
            }

            that.aushow = false;
            $.ajax({
                url: that.$store.state.rootUrl3 + '/auth/role/menu/update',
                headers: {
                    "token": localStorage.getItem('A-TOKEN')
                },
                type: "POST",
                data: {
                    "role_id": role,
                    "ids": menu.join(",")
                },
                success: function(data) {
                    let code = data.returncode;
                    if (code == 200) {
                        that.AMtips5 = '保存成功';
                        that.aushow = true;
                        setTimeout(function() {
                            that.AMtips5 = '';
                        }, 1000);

                    } else if (code == '301') {
                        console.log('参数错误');
                    } else if (code == '104') {
                        utils.refreshToken(that, localStorage.getItem('R-TOKEN'), function() {
                            that.rmenuList(roleid)
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

    mounted() {
        this.$store.dispatch('tabChanger', 0);
        this.$store.dispatch('subChanger', 'sub1');
        this.roleList(this.page, this.size);
        this.menuList(this.page, this.size);
    }
}
</script>
