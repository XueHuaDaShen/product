<template id="">
    <div class="">
        <div class="navbar" role="navigation">
            <span style="float:right;margin-right:10%;font-size:18px;cursor:pointer;padding: 0 10px" class="back"
                  v-on:click="logout">退出</span>
        </div>
        <div class="container-fluid content">
            <div class="row">

                <!-- Sidebar -->
                <div class="sidebar">
                    <div class="sidebar-collapse">
                        <!-- Sidebar Header Logo-->
                        <div class="sidebar-header">
                            <img src="img/logo.png" class="img-responsive" alt=""/>
                        </div>
                        <!-- Sidebar Menu-->
                        <div class="sidebar-menu">
                            <nav id="menu" class="nav-main" role="navigation">
                                <ul class="nav nav-sidebar">
                                    <div class="panel-body text-center">
                                        <div class="bk-avatar">
                                            <img src="img/avatar.jpg" class="img-circle bk-img-60" alt=""/>
                                        </div>
                                        <div class="bk-padding-top-10">
                                            <!-- <i class="fa fa-circle text-success"></i> -->
                                            <small>{{username}}</small>
                                        </div>
                                    </div>
                                    <div class="divider2"></div>


                                    <div class="sc" :openKeys="this.openKeys">

                                        <div id="sub1">
                                            <li v-if="checkExisted('sub1')">
                                                <a href="javascript: void(0)" @click="changeOpen('sub1')">
                                                    <i class="fa fa-gears" aria-hidden="true"></i>
                                                    系统管理
                                                    <i class="fa fa-angle-up subicon2" v-show="checkOpen('sub1')"></i>
                                                    <i class="fa fa-angle-down subicon" v-show="!checkOpen('sub1')"></i>

                                                </a>

                                            </li>
                                            <transition name='slide-fade'>
                                                <ul v-show="checkOpen('sub1')" class="subul" id="sub1ul">

                                                    <li>
                                                        <router-link to="/manage/my"
                                                                     v-bind:class="this.$store.state.tabIndex == 24 ? 'activePage' : ''">
                                                            <span>我的资料</span>
                                                        </router-link>
                                                    </li>

                                                    <li v-if="autho(10)">
                                                        <router-link to="/manage/authority"
                                                                     v-bind:class="this.$store.state.tabIndex == 0 ? 'activePage' : ''">
                                                            <span>权限管理</span>
                                                        </router-link>
                                                    </li>

                                                    <li v-if="autho(11)">
                                                        <router-link to="/manage/role"
                                                                     v-bind:class="this.$store.state.tabIndex == 1 ? 'activePage' : ''">
                                                            <span>角色管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(12)">
                                                        <router-link to="/manage/menu"
                                                                     v-bind:class="this.$store.state.tabIndex == 2 ? 'activePage' : ''">
                                                            <span>菜单管理</span>
                                                        </router-link>
                                                    </li>

                                                    <li v-if="autho(13)">
                                                        <router-link to="/manage/admin"
                                                                     v-bind:class="this.$store.state.tabIndex == 4 ? 'activePage' : ''">
                                                            <span>管理员管理</span>
                                                        </router-link>
                                                    </li>

                                                </ul>

                                            </transition>

                                        </div>

                                        <div id="sub2">
                                            <li v-if="checkExisted('sub2')">
                                                <a href="javascript: void(0)" @click="changeOpen('sub2')">
                                                    <i class="fa fa-microphone" aria-hidden="true"></i>
                                                    主播管理
                                                    <i class="fa fa-angle-up subicon2" v-show="checkOpen('sub2')"></i>
                                                    <i class="fa fa-angle-down subicon" v-show="!checkOpen('sub2')"></i>

                                                </a>

                                            </li>


                                            <transition name='slide-fade'>
                                                <ul v-show="checkOpen('sub2')" class="subul" id="sub2ul">

                                                    <li v-if="autho(4)">
                                                        <router-link to="/manage/anchor"
                                                                     v-bind:class="this.$store.state.tabIndex == 20 ? 'activePage' : ''">
                                                            <span>主播管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(40)">
                                                        <router-link to="/manage/anchorSee"
                                                                     v-bind:class="this.$store.state.tabIndex == 44 ? 'activePage' : ''">
                                                            <span>主播查看</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(5)">
                                                        <router-link to="/manage/exam"
                                                                     v-bind:class="this.$store.state.tabIndex == 21 ? 'activePage' : ''">
                                                            <span>主播审核</span>
                                                        </router-link>
                                                    </li>
                                                    <li  v-if="autho(49)">
                                                        <router-link to="/manage/anchorRanking"
                                                                     v-bind:class="this.$store.state.tabIndex == 51 ? 'activePage' : ''">
                                                            <span>主播排行</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(32)">
                                                        <router-link to="/manage/modify"
                                                                     v-bind:class="this.$store.state.tabIndex == 6 ? 'activePage' : ''">
                                                            <span>修改申请表</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(6)">
                                                        <router-link to="/manage/union"
                                                                     v-bind:class="this.$store.state.tabIndex == 22 ? 'activePage' : ''">
                                                            <span>工会管理</span>
                                                        </router-link>
                                                    </li>

                                                </ul>

                                            </transition>
                                        </div>


                                        <div id="sub3">
                                            <li v-if="checkExisted('sub3')">
                                                <a href="javascript: void(0)" @click="changeOpen('sub3')">
                                                    <i class="fa fa-krw" aria-hidden="true"></i>
                                                    财务管理
                                                    <i class="fa fa-angle-up subicon2" v-show="checkOpen('sub3')"></i>
                                                    <i class="fa fa-angle-down subicon" v-show="!checkOpen('sub3')"></i>

                                                </a>

                                            </li>


                                            <transition name='slide-fade'>
                                                <ul v-show="checkOpen('sub3')" class="subul" id="sub3ul">
                                                    <li v-if="autho(23)">
                                                        <router-link to="/manage/account"
                                                                     v-bind:class="this.$store.state.tabIndex == 29 ? 'activePage' : ''">
                                                            <span>结算管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(26)">
                                                        <router-link to="/manage/acRecharge"
                                                                     v-bind:class="this.$store.state.tabIndex == 31 ? 'activePage' : ''">
                                                            <span>活动充值</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(63)">
                                                        <router-link to="/manage/cash"
                                                                     v-bind:class="this.$store.state.tabIndex == 65 ? 'activePage' : ''">
                                                            <span>Withdrawal List</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(68)">
                                                        <router-link to="/manage/withdrawal"
                                                                     v-bind:class="this.$store.state.tabIndex == 70 ? 'activePage' : ''">
                                                            <span>Withdrawal Manager</span>
                                                        </router-link>
                                                    </li>


                                                </ul>

                                            </transition>
                                        </div>

                                        <div id="sub4">
                                            <li v-if="checkExisted('sub4')">
                                                <a href="javascript: void(0)" @click="changeOpen('sub4')">
                                                    <i class="fa fa-toggle-right" aria-hidden="true"></i>
                                                    运营管理
                                                    <i class="fa fa-angle-up subicon2" v-show="checkOpen('sub4')"></i>
                                                    <i class="fa fa-angle-down subicon" v-show="!checkOpen('sub4')"></i>

                                                </a>

                                            </li>


                                            <transition name='slide-fade'>
                                                <ul v-show="checkOpen('sub4')" class="subul" id="sub4ul">
                                                    <li v-if="autho(2)">
                                                        <router-link to="/manage/ad"
                                                                     v-bind:class="this.$store.state.tabIndex == 9 ? 'activePage' : ''">
                                                            <span>Banner管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(7)">
                                                        <router-link to="/manage/tv"
                                                                     v-bind:class="this.$store.state.tabIndex == 23 ? 'activePage' : ''">
                                                            <span>直播管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(1)">
                                                        <router-link to="/manage/push"
                                                                     v-bind:class="this.$store.state.tabIndex == 12 ? 'activePage' : ''">

                                                            <span>推送管理</span>
                                                        </router-link>
                                                        <!-- url改变不了 就没把router-link 改成a 了 -->
                                                    </li>

                                                    <li v-if="autho(38)">
                                                        <router-link to="/manage/red"
                                                                     v-bind:class="this.$store.state.tabIndex == 40 ? 'activePage' : ''">
                                                            <span>红包管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(46)">
                                                        <router-link to="/manage/sendRed"
                                                                     v-bind:class="this.$store.state.tabIndex == 48 ? 'activePage' : ''">
                                                            <span>发红包</span>
                                                        </router-link>
                                                    </li>

                                                    <li v-if="autho(28)">
                                                        <router-link to="/manage/concert"
                                                                     v-bind:class="this.$store.state.tabIndex == 33 ? 'activePage' : ''">
                                                            <span>房间管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(29)">
                                                        <router-link to="/manage/star"
                                                                     v-bind:class="this.$store.state.tabIndex == 34 ? 'activePage' : ''">
                                                            <span>直播间</span>
                                                        </router-link>
                                                    </li>

                                                </ul>

                                            </transition>
                                        </div>


                                        <div id="sub5">
                                            <li v-if="checkExisted('sub5')">
                                                <a href="javascript: void(0)" @click="changeOpen('sub5')">
                                                    <i class="fa fa-wrench" aria-hidden="true"></i>
                                                    配置管理
                                                    <i class="fa fa-angle-up subicon2" v-show="checkOpen('sub5')"></i>
                                                    <i class="fa fa-angle-down subicon" v-show="!checkOpen('sub5')"></i>

                                                </a>

                                            </li>


                                            <transition name='slide-fade'>
                                                <ul v-show="checkOpen('sub5')" class="subul" id="sub5ul">

                                                    <li v-if="autho(8)">
                                                        <router-link to="/manage/ac"
                                                                     v-bind:class="this.$store.state.tabIndex == 13 ? 'activePage' : ''">
                                                            <span>活动管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(59)">
                                                        <router-link to="/manage/candidate"
                                                                     v-bind:class="this.$store.state.tabIndex == 61 ? 'activePage' : ''">
                                                            <span>候选人管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(14)">
                                                        <router-link to="/manage/robot"
                                                                     v-bind:class="this.$store.state.tabIndex == 10 ? 'activePage' : ''">
                                                            <span>机器人规则管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(20)">
                                                        <router-link to="/manage/vipconfig"
                                                                     v-bind:class="this.$store.state.tabIndex == 26 ? 'activePage' : ''">
                                                            <span>vip配置</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(37)">
                                                        <router-link to="/manage/pk"
                                                                     v-bind:class="this.$store.state.tabIndex == 39 ? 'activePage' : ''">
                                                            <span>PK活动管理</span>
                                                        </router-link>
                                                    </li>

                                                    <li v-if="autho(39)">
                                                        <router-link to="/manage/lottery"
                                                                     v-bind:class="this.$store.state.tabIndex == 41 ? 'activePage' : ''">
                                                            <span>抽奖活动管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(24)">
                                                        <router-link to="/manage/kpi"
                                                                     v-bind:class="this.$store.state.tabIndex == 30 ? 'activePage' : ''">
                                                            <span>kpi配置</span>
                                                        </router-link>
                                                    </li>


                                                </ul>

                                            </transition>
                                        </div>

                                        <div id="sub6">
                                            <li v-if="checkExisted('sub6')">
                                                <a href="javascript: void(0)" @click="changeOpen('sub6')">
                                                    <i class="fa fa-tag" aria-hidden="true"></i>
                                                    后台配置
                                                    <i class="fa fa-angle-up subicon2" v-show="checkOpen('sub6')"></i>
                                                    <i class="fa fa-angle-down subicon" v-show="!checkOpen('sub6')"></i>

                                                </a>

                                            </li>


                                            <transition name='slide-fade'>
                                                <ul v-show="checkOpen('sub6')" class="subul" id="sub6ul">
                                                    <li v-if="autho(19)">
                                                        <router-link to="/manage/review"
                                                                     v-bind:class="this.$store.state.tabIndex == 25 ? 'activePage' : ''">
                                                            <span>发版配置</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(33)">
                                                        <router-link to="/manage/configure"
                                                                     v-bind:class="this.$store.state.tabIndex == 5 ? 'activePage' : ''">
                                                            <span>配置管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(3)">
                                                        <router-link to="/manage/gift"
                                                                     v-bind:class="this.$store.state.tabIndex == 8 ? 'activePage' : ''">
                                                            <span>礼品管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(31)">
                                                        <router-link to="/manage/paylist"
                                                                     v-bind:class="this.$store.state.tabIndex == 17 ? 'activePage' : ''">
                                                            <span>支付方式管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(17)">
                                                        <router-link to="/manage/punish"
                                                                     v-bind:class="this.$store.state.tabIndex == 7 ? 'activePage' : ''">
                                                            <span>惩罚管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(22)">
                                                        <router-link to="/manage/animation"
                                                                     v-bind:class="this.$store.state.tabIndex == 28 ? 'activePage' : ''">
                                                            <span>动画效果</span>
                                                        </router-link>
                                                    </li>


                                                </ul>

                                            </transition>
                                        </div>

                                        <div id="sub7">
                                            <li v-if="checkExisted('sub7')">
                                                <a href="javascript: void(0)" @click="changeOpen('sub7')">
                                                    <i class="fa fa-laptop"
                                                       aria-hidden="true"></i>
                                                    系统信息
                                                    <i class="fa fa-angle-up subicon2" v-show="checkOpen('sub7')"></i>
                                                    <i class="fa fa-angle-down subicon" v-show="!checkOpen('sub7')"></i>

                                                </a>

                                            </li>


                                            <transition name='slide-fade'>
                                                <ul v-show="checkOpen('sub7')" class="subul" id="sub7ul">

                                                    <li v-if="autho(0)">
                                                        <!-- <a v-bind:href="'#/' + this.$store.state.rootMenu + '/' + this.$store.state.menus[0].url" v-bind:class="this.$store.state.tabIndex == 19 ? 'activePage' : ''">
                                                            <i class="fa fa-laptop" aria-hidden="true"></i><span>{{this.$store.state.menus[0].name}}</span>
                                                        </a> -->
                                                        <router-link to="/manage/record"
                                                                     v-bind:class="this.$store.state.tabIndex == 19 ? 'activePage' : ''">
                                                            <!-- <i class="fa fa-laptop" aria-hidden="true"></i><span>{{this.$store.state.menus[0].name}}</span> -->
                                                            <span>统计信息</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(18)">
                                                        <router-link to="/manage/recharge"
                                                                     v-bind:class="this.$store.state.tabIndex == 18 ? 'activePage' : ''">
                                                            <span>支付管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(30)">
                                                        <router-link to="/manage/Abnormal"
                                                                     v-bind:class="this.$store.state.tabIndex == 15 ? 'activePage' : ''">
                                                            <span>异常用户</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(36)">
                                                        <router-link to="/manage/whiteList"
                                                                     v-bind:class="this.$store.state.tabIndex == 38 ? 'activePage' : ''">
                                                            <span>白名单管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(35)">
                                                        <router-link to="/manage/accountRec"
                                                                     v-bind:class="this.$store.state.tabIndex == 37 ? 'activePage' : ''">
                                                            <span>结算记录</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(27)">
                                                        <router-link to="/manage/acRecord"
                                                                     v-bind:class="this.$store.state.tabIndex == 32 ? 'activePage' : ''">
                                                            <span>活动充值记录</span>
                                                        </router-link>
                                                    </li>


                                                </ul>

                                            </transition>
                                        </div>

                                        <div id="sub8">
                                            <li v-if="checkExisted('sub8')">
                                                <a href="javascript: void(0)" @click="changeOpen('sub8')">
                                                    <i class="fa fa-video-camera" aria-hidden="true"></i>
                                                    视频管理
                                                    <i class="fa fa-angle-up subicon2" v-show="checkOpen('sub8')"></i>
                                                    <i class="fa fa-angle-down subicon" v-show="!checkOpen('sub8')"></i>

                                                </a>

                                            </li>


                                            <transition name='slide-fade'>
                                                <ul v-show="checkOpen('sub8')" class="subul" id="sub8ul">

                                                    <li v-if="autho(41)">
                                                        <router-link to="/manage/videoUpload"
                                                                     v-bind:class="this.$store.state.tabIndex == 42 ? 'activePage' : ''">
                                                            <span>视频上传</span>
                                                        </router-link>
                                                    </li>
                                                    <!-- <li v-if="autho(42)">
                                                        <router-link to="/manage/videoPublish"
                                                                     v-bind:class="this.$store.state.tabIndex == 45 ? 'activePage' : ''">
                                                            <span>视频发布</span>
                                                        </router-link>
                                                    </li> -->
                                                    <li v-if="autho(43)">
                                                        <router-link to="/manage/videoExam"
                                                                     v-bind:class="this.$store.state.tabIndex == 43 ? 'activePage' : ''">
                                                            <span>视频审核</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(47)">
                                                        <router-link to="/manage/playback"
                                                                     v-bind:class="this.$store.state.tabIndex == 49 ? 'activePage' : ''">
                                                            <span>视频集锦</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(51)">
                                                        <router-link to="/manage/videoPlayback"
                                                                     v-bind:class="this.$store.state.tabIndex == 53 ? 'activePage' : ''">
                                                            <span>视频回放</span>
                                                        </router-link>
                                                    </li>


                                                </ul>

                                            </transition>
                                        </div>
                                        <div id="sub10">
                                            <li v-if="checkExisted('sub10')">
                                                <a href="javascript: void(0)" @click="changeOpen('sub10')">
                                                    <i class="fa fa-trophy" aria-hidden="true"></i>
                                                    Quiz Hunter
                                                    <i class="fa fa-angle-up subicon2" v-show="checkOpen('sub10')"></i>
                                                    <i class="fa fa-angle-down subicon" v-show="!checkOpen('sub10')"></i>

                                                </a>

                                            </li>


                                            <transition name='slide-fade'>
                                                <ul v-show="checkOpen('sub10')" class="subul" id="sub10ul">
                                                    <li v-if="autho(64)">
                                                        <router-link to="/manage/questions"
                                                                     v-bind:class="this.$store.state.tabIndex == 66 ? 'activePage' : ''">
                                                            <span>Question Bank</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(69)">
                                                        <router-link to="/manage/questionManage"
                                                                     v-bind:class="this.$store.state.tabIndex == 71 ? 'activePage' : ''">
                                                            <span>Question Manager</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(65)">
                                                        <router-link to="/manage/dictionary"
                                                                     v-bind:class="this.$store.state.tabIndex == 67 ? 'activePage' : ''">
                                                            <span>Dictionary</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(66)">
                                                        <router-link to="/manage/guessing"
                                                                     v-bind:class="this.$store.state.tabIndex == 68 ? 'activePage' : ''">
                                                            <span>Activity</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(67)">
                                                        <router-link to="/manage/startIssue"
                                                                     v-bind:class="this.$store.state.tabIndex == 69 ? 'activePage' : ''">
                                                            <span>Quiz Hunter</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(70)">
                                                        <router-link to="/manage/winner"
                                                                     v-bind:class="this.$store.state.tabIndex == 72 ? 'activePage' : ''">
                                                            <span>Search Winner</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(71)">
                                                        <router-link to="/manage/activityDetail"
                                                                     v-bind:class="this.$store.state.tabIndex == 73 ? 'activePage' : ''">
                                                            <span>Activity Detail</span>
                                                        </router-link>
                                                    </li>


                                                    <!-- <li>
                                                        <router-link to="/manage/video" v-bind:class="this.$store.state.tabIndex == 35 ? 'activePage' : ''">
                                                            <i class="fa fa-youtube-play" aria-hidden="true"></i><span>video管理</span>
                                                        </router-link>
                                                    </li> -->


                                                </ul>

                                            </transition>
                                        </div>


                                        <div id="sub9">
                                            <li v-if="checkExisted('sub9')">
                                                <a href="javascript: void(0)" @click="changeOpen('sub9')">
                                                    <i class="fa fa-scissors" aria-hidden="true"></i>
                                                    其他
                                                    <i class="fa fa-angle-up subicon2" v-show="checkOpen('sub9')"></i>
                                                    <i class="fa fa-angle-down subicon" v-show="!checkOpen('sub9')"></i>

                                                </a>

                                            </li>


                                            <transition name='slide-fade'>
                                                <ul v-show="checkOpen('sub9')" class="subul" id="sub9ul">

                                                    <li v-if="autho(9)">
                                                        <router-link to="/manage/acOnline"
                                                                     v-bind:class="this.$store.state.tabIndex == 14 ? 'activePage' : ''">
                                                            <span>主播活动管理</span>
                                                        </router-link>
                                                    </li>


                                                    <li v-if="autho(15)">
                                                        <router-link to="/manage/rule"
                                                                     v-bind:class="this.$store.state.tabIndex == 11 ? 'activePage' : ''">
                                                            <span>主播映射管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(16)">
                                                        <router-link to="/manage/appUsers"
                                                                     v-bind:class="this.$store.state.tabIndex == 3 ? 'activePage' : ''">
                                                            <span>红绿键用户配置</span>
                                                        </router-link>
                                                    </li>


                                                    <li v-if="autho(21)">
                                                        <router-link to="/manage/vip"
                                                                     v-bind:class="this.$store.state.tabIndex == 27 ? 'activePage' : ''">
                                                            <span>vip管理</span>
                                                        </router-link>
                                                    </li>


                                                    <li v-if="autho(25)">
                                                        <router-link to="/manage/server"
                                                                     v-bind:class="this.$store.state.tabIndex == 16 ? 'activePage' : ''">
                                                            <span>服务器管理</span>
                                                        </router-link>
                                                    </li>


                                                    <li v-if="autho(34)">
                                                        <router-link to="/manage/audio"
                                                                     v-bind:class="this.$store.state.tabIndex == 36 ? 'activePage' : ''">
                                                            <span>连麦策略管理</span>
                                                        </router-link>
                                                    </li>

                                                    <li v-if="autho(44)">
                                                        <router-link to="/manage/recommend"
                                                                     v-bind:class="this.$store.state.tabIndex == 46 ? 'activePage' : ''">
                                                            <span>推荐列表</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(45)">
                                                        <router-link to="/manage/tagLibrary"
                                                                     v-bind:class="this.$store.state.tabIndex == 47 ? 'activePage' : ''">
                                                            <span>标签库管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(48)">
                                                        <router-link to="/manage/imgUpload"
                                                                     v-bind:class="this.$store.state.tabIndex == 50 ? 'activePage' : ''">
                                                            <span>上传图片</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(50)">
                                                        <router-link to="/manage/sensitive"
                                                                     v-bind:class="this.$store.state.tabIndex == 52 ? 'activePage' : ''">
                                                            <span>敏感词管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(52)">
                                                        <router-link to="/manage/pid"
                                                                     v-bind:class="this.$store.state.tabIndex == 54 ? 'activePage' : ''">
                                                            <span>PID管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(53)">
                                                        <router-link to="/manage/smallVideo"
                                                                     v-bind:class="this.$store.state.tabIndex == 55 ? 'activePage' : ''">
                                                            <span>八月视频排行</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(54)">
                                                        <router-link to="/manage/broadcastMessage"
                                                                     v-bind:class="this.$store.state.tabIndex == 56 ? 'activePage' : ''">
                                                            <span>广播消息</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(55)">
                                                        <router-link to="/manage/contest"
                                                                     v-bind:class="this.$store.state.tabIndex == 57 ? 'activePage' : ''">
                                                            <span>竞赛管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(56)">
                                                        <router-link to="/manage/idol"
                                                                     v-bind:class="this.$store.state.tabIndex == 58 ? 'activePage' : ''">
                                                            <span>facebook</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(57)">
                                                        <router-link to="/manage/area"
                                                                     v-bind:class="this.$store.state.tabIndex == 59 ? 'activePage' : ''">
                                                            <span>区号管理</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(58)">
                                                        <router-link to="/manage/october"
                                                                     v-bind:class="this.$store.state.tabIndex == 60 ? 'activePage' : ''">
                                                            <span>十月banner</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(61)">
                                                        <router-link to="/manage/feedback"
                                                                     v-bind:class="this.$store.state.tabIndex == 63 ? 'activePage' : ''">
                                                            <span>feedback</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(60)">
                                                        <router-link to="/manage/christmas"
                                                                     v-bind:class="this.$store.state.tabIndex == 62 ? 'activePage' : ''">
                                                            <span>christmas</span>
                                                        </router-link>
                                                    </li>
                                                    <li v-if="autho(62)">
                                                        <router-link to="/manage/emoticon"
                                                                     v-bind:class="this.$store.state.tabIndex == 64 ? 'activePage' : ''">
                                                            <span>表情包管理</span>
                                                        </router-link>
                                                    </li>


                                                    <!-- <li>
                                                        <router-link to="/manage/video" v-bind:class="this.$store.state.tabIndex == 35 ? 'activePage' : ''">
                                                            <i class="fa fa-youtube-play" aria-hidden="true"></i><span>video管理</span>
                                                        </router-link>
                                                    </li> -->


                                                </ul>

                                            </transition>
                                        </div>


                                    </div>


                                </ul>

                            </nav>
                        </div>
                        <!-- End Sidebar Menu-->
                    </div>
                    <!-- Sidebar Footer-->

                    <!-- End Sidebar Footer-->
                </div>

            </div>
        </div>

        <router-view class="right"></router-view>
    </div>
</template>

<script>
    import utils from '../utils/utils.js';
    export default {
        data() {
            return {
                username: localStorage.getItem('USERNAME'),
                openKeys: [],
            }
        },

        computed: {},

        methods: {
            logout() {
                const that = this;
                $.ajax({
                    url: that.$store.state.rootUrl + '/user/logout',
                    headers: {
                        "token": localStorage.getItem('A-TOKEN')
                    },
                    type: "GET",
                    success: function (data) {
                        if (data.returncode == '200') {
                            localStorage.removeItem('A-TOKEN');
                            localStorage.removeItem('R-TOKEN');
                            localStorage.removeItem(localStorage.getItem('USERNAME') + 'AUTHO');
                            localStorage.removeItem('USERNAME');
                            that.$router.push('/login');
                        } else {
                            localStorage.removeItem('A-TOKEN');
                            localStorage.removeItem('R-TOKEN');
                            localStorage.removeItem(localStorage.getItem('USERNAME') + 'AUTHO');
                            localStorage.removeItem('USERNAME');
                            that.$router.push('/login');
                        }
                    }
                })


            },

            autho(i) {
                return parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[i]);
            },

            checkOpen: function (sub) {
                return this.openKeys.includes(sub) ? true : false
            },

            changeOpen: function (sub) {
                let flag = 0;
                for (let i = 0; i < this.openKeys.length; i++) {
                    if (this.openKeys[i] === sub) {
                        this.openKeys.splice(i, 1);
                        flag = 1;
                        break;
                    }
                }
                if (!flag) {
                    this.openKeys.unshift(sub);
                }
            },
            checkExisted(sub) {
                // console.dir(document.getElementById(sub + 'ul').children)  //报错 undefined
                var le = $('#' + sub + 'ul').children().length;
//                console.log(le);
                if (le > 0) {
                    return true;
                } else {
                    return false;
                }

            }
        },

        mounted() {
            // console.log(this.openKeys);
//            console.log(this.$store.state.tabIndex);
//            console.log(this.$store.state.subIndex);
            this.openKeys = [this.$store.state.subIndex];

        }
    }
</script>
