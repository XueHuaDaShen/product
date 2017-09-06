<<<<<<< HEAD
                                    <div class="sc">
                                        <li>
                                            <router-link to="/manage/my" v-bind:class="this.$store.state.tabIndex == 24 ? 'activePage' : ''">
                                                <i class="fa fa-reddit" aria-hidden="true"></i><span>我的资料</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(0)">
                                            <!-- <a v-bind:href="'#/' + this.$store.state.rootMenu + '/' + this.$store.state.menus[0].url" v-bind:class="this.$store.state.tabIndex == 19 ? 'activePage' : ''">
                                                <i class="fa fa-laptop" aria-hidden="true"></i><span>{{this.$store.state.menus[0].name}}</span>
                                            </a> -->
                                            <router-link to="/manage/record" v-bind:class="this.$store.state.tabIndex == 19 ? 'activePage' : ''">
                                                <!-- <i class="fa fa-laptop" aria-hidden="true"></i><span>{{this.$store.state.menus[0].name}}</span> -->
                                                <i class="fa fa-laptop" aria-hidden="true"></i><span>统计信息</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(1)">
                                            <router-link to="/manage/push" v-bind:class="this.$store.state.tabIndex == 12 ? 'activePage' : ''">

                                                <i class="fa fa-send" aria-hidden="true"></i><span>推送管理</span>
                                            </router-link>
                                            <!-- url改变不了 就没把router-link 改成a 了 -->
                                        </li>
                                        <li v-if="autho(2)">
                                            <router-link to="/manage/ad" v-bind:class="this.$store.state.tabIndex == 9 ? 'activePage' : ''">
                                                <i class="fa fa-barcode" aria-hidden="true"></i><span>Banner管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(3)">
                                            <router-link to="/manage/gift" v-bind:class="this.$store.state.tabIndex == 8 ? 'activePage' : ''">
                                                <i class="fa fa-gift" aria-hidden="true"></i><span>礼品管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(4)">
                                            <router-link to="/manage/anchor" v-bind:class="this.$store.state.tabIndex == 20 ? 'activePage' : ''">
                                                <i class="fa fa-microphone" aria-hidden="true"></i><span>主播管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(40)">
                                            <router-link to="/manage/anchorSee" v-bind:class="this.$store.state.tabIndex == 44 ? 'activePage' : ''">
                                                <i class="fa fa-eye" aria-hidden="true"></i><span>主播查看</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(5)">
                                            <router-link to="/manage/exam" v-bind:class="this.$store.state.tabIndex == 21 ? 'activePage' : ''">
                                                <i class="fa fa-check-square-o" aria-hidden="true"></i><span>主播审核</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(32)">
                                            <router-link to="/manage/modify" v-bind:class="this.$store.state.tabIndex == 6 ? 'activePage' : ''">
                                                <i class="fa fa-pencil" aria-hidden="true"></i><span>修改申请表</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(6)">
                                            <router-link to="/manage/union" v-bind:class="this.$store.state.tabIndex == 22 ? 'activePage' : ''">
                                                <i class="fa fa-shield" aria-hidden="true"></i><span>工会管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(7)">
                                            <router-link to="/manage/tv" v-bind:class="this.$store.state.tabIndex == 23 ? 'activePage' : ''">
                                                <i class="fa fa-toggle-right" aria-hidden="true"></i><span>直播管理</span>
                                            </router-link>
                                        </li>

                                        <li v-if="autho(8)">
                                            <router-link to="/manage/ac" v-bind:class="this.$store.state.tabIndex == 13 ? 'activePage' : ''">
                                                <i class="fa fa-bell" aria-hidden="true"></i><span>活动管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(9)">
                                            <router-link to="/manage/acOnline" v-bind:class="this.$store.state.tabIndex == 14 ? 'activePage' : ''">
                                                <i class="fa fa-headphones" aria-hidden="true"></i><span>主播活动管理</span>
                                            </router-link>
                                        </li>

                                        <li v-if="autho(10)">
                                            <router-link to="/manage/authority" v-bind:class="this.$store.state.tabIndex == 0 ? 'activePage' : ''">
                                                <i class="fa fa-lock" aria-hidden="true"></i><span>权限管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(11)">
                                            <router-link to="/manage/role" v-bind:class="this.$store.state.tabIndex == 1 ? 'activePage' : ''">
                                                <i class="fa fa-gears" aria-hidden="true"></i><span>角色管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(12)">
                                            <router-link to="/manage/menu" v-bind:class="this.$store.state.tabIndex == 2 ? 'activePage' : ''">
                                                <i class="fa fa-bars" aria-hidden="true"></i><span>菜单管理</span>
                                            </router-link>
                                        </li>

                                        <li v-if="autho(13)">
                                            <router-link to="/manage/admin" v-bind:class="this.$store.state.tabIndex == 4 ? 'activePage' : ''">
                                                <i class="fa fa-github" aria-hidden="true"></i><span>管理员管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(33)">
                                            <router-link to="/manage/configure" v-bind:class="this.$store.state.tabIndex == 5 ? 'activePage' : ''">
                                                <i class="fa fa-tag" aria-hidden="true"></i><span>配置管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(14)">
                                            <router-link to="/manage/robot" v-bind:class="this.$store.state.tabIndex == 10 ? 'activePage' : ''">
                                                <i class="fa fa-android" aria-hidden="true"></i><span>机器人规则管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(15)">
                                            <router-link to="/manage/rule" v-bind:class="this.$store.state.tabIndex == 11 ? 'activePage' : ''">
                                                <i class="fa fa-ellipsis-v" aria-hidden="true"></i><span>主播映射管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(16)">
                                            <router-link to="/manage/appUsers" v-bind:class="this.$store.state.tabIndex == 3 ? 'activePage' : ''">
                                                <i class="fa fa-user" aria-hidden="true"></i><span>红绿键用户配置</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(17)">
                                            <router-link to="/manage/punish" v-bind:class="this.$store.state.tabIndex == 7 ? 'activePage' : ''">
                                                <i class="fa fa-times-circle" aria-hidden="true"></i><span>惩罚管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(18)">
                                            <router-link to="/manage/recharge" v-bind:class="this.$store.state.tabIndex == 18 ? 'activePage' : ''">
                                                <i class="fa fa-money" aria-hidden="true"></i><span>支付管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(19)">
                                            <router-link to="/manage/review" v-bind:class="this.$store.state.tabIndex == 25 ? 'activePage' : ''">
                                                <i class="fa fa-moon-o" aria-hidden="true"></i><span>发版配置</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(20)">
                                            <router-link to="/manage/vipconfig" v-bind:class="this.$store.state.tabIndex == 26 ? 'activePage' : ''">
                                                <i class="fa fa-empire" aria-hidden="true"></i><span>vip配置</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(21)">
                                            <router-link to="/manage/vip" v-bind:class="this.$store.state.tabIndex == 27 ? 'activePage' : ''">
                                                <i class="fa fa-plane" aria-hidden="true"></i><span>vip管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(22)">
                                            <router-link to="/manage/animation" v-bind:class="this.$store.state.tabIndex == 28 ? 'activePage' : ''">
                                                <i class="fa fa-arrows" aria-hidden="true"></i><span>动画效果</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(23)">
                                            <router-link to="/manage/account" v-bind:class="this.$store.state.tabIndex == 29 ? 'activePage' : ''">
                                                <i class="fa fa-trophy" aria-hidden="true"></i><span>结算管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(35)">
                                            <router-link to="/manage/accountRec" v-bind:class="this.$store.state.tabIndex == 37 ? 'activePage' : ''">
                                                <i class="fa fa-file-excel-o" aria-hidden="true"></i><span>结算记录</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(24)">
                                            <router-link to="/manage/kpi" v-bind:class="this.$store.state.tabIndex == 30 ? 'activePage' : ''">
                                                <i class="fa fa-wrench" aria-hidden="true"></i><span>kpi配置</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(25)">
                                            <router-link to="/manage/server" v-bind:class="this.$store.state.tabIndex == 16 ? 'activePage' : ''">
                                                <i class="fa fa-flag" aria-hidden="true"></i><span>服务器管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(26)">
                                            <router-link to="/manage/acRecharge" v-bind:class="this.$store.state.tabIndex == 31 ? 'activePage' : ''">
                                                <i class="fa fa-krw" aria-hidden="true"></i><span>活动充值</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(27)">
                                            <router-link to="/manage/acRecord" v-bind:class="this.$store.state.tabIndex == 32 ? 'activePage' : ''">
                                                <i class="fa fa-file-text" aria-hidden="true"></i><span>活动充值记录</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(28)">
                                            <router-link to="/manage/concert" v-bind:class="this.$store.state.tabIndex == 33 ? 'activePage' : ''">
                                                <i class="fa fa-fire" aria-hidden="true"></i><span>房间管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(29)">
                                            <router-link to="/manage/star" v-bind:class="this.$store.state.tabIndex == 34 ? 'activePage' : ''">
                                                <i class="fa fa-signal" aria-hidden="true"></i><span>直播间</span>
                                            </router-link>
                                        </li>




                                        <li v-if="autho(30)">
                                            <router-link to="/manage/Abnormal" v-bind:class="this.$store.state.tabIndex == 15 ? 'activePage' : ''">
                                                <i class="fa fa-comments" aria-hidden="true"></i><span>异常用户</span>
                                            </router-link>
                                        </li>

                                        <li v-if="autho(31)">
                                            <router-link to="/manage/paylist" v-bind:class="this.$store.state.tabIndex == 17 ? 'activePage' : ''">
                                                <i class="fa fa-dollar" aria-hidden="true"></i><span>支付方式管理</span>
                                            </router-link>
                                        </li>

                                        <li v-if="autho(34)">
                                            <router-link to="/manage/audio" v-bind:class="this.$store.state.tabIndex == 36 ? 'activePage' : ''">
                                                <i class="fa fa-microphone-slash" aria-hidden="true"></i><span>连麦策略管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(36)">
                                            <router-link to="/manage/whiteList" v-bind:class="this.$store.state.tabIndex == 38 ? 'activePage' : ''">
                                                <i class="fa fa-minus-square-o" aria-hidden="true"></i><span>白名单管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(37)">
                                            <router-link to="/manage/pk" v-bind:class="this.$store.state.tabIndex == 39 ? 'activePage' : ''">
                                                <i class="fa fa-gavel" aria-hidden="true"></i><span>PK活动管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(38)">
                                            <router-link to="/manage/red" v-bind:class="this.$store.state.tabIndex == 40 ? 'activePage' : ''">
                                                <i class="fa fa-envelope" aria-hidden="true"></i><span>红包管理</span>
                                            </router-link>
                                        </li>
                                       
                                        <li v-if="autho(39)">
                                            <router-link to="/manage/lottery" v-bind:class="this.$store.state.tabIndex == 41 ? 'activePage' : ''">
                                                <i class="fa fa-lightbulb-o" aria-hidden="true"></i><span>抽奖活动管理</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(41)">
                                            <router-link to="/manage/videoUpload" v-bind:class="this.$store.state.tabIndex == 42 ? 'activePage' : ''">
                                                <i class="fa fa-cloud-upload" aria-hidden="true"></i><span>视频上传</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(42)">
                                            <router-link to="/manage/videoPublish" v-bind:class="this.$store.state.tabIndex == 45 ? 'activePage' : ''">
                                                <i class="fa fa-video-camera" aria-hidden="true"></i><span>视频发布</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(43)">
                                            <router-link to="/manage/videoExam" v-bind:class="this.$store.state.tabIndex == 43 ? 'activePage' : ''">
                                                <i class="fa fa-file-video-o" aria-hidden="true"></i><span>视频审核</span>
                                            </router-link>
                                        </li>
                                        <li v-if="autho(44)">
                                            <router-link to="/manage/recommend" v-bind:class="this.$store.state.tabIndex == 46 ? 'activePage' : ''">
                                                <i class="fa fa-thumbs-up" aria-hidden="true"></i><span>推荐列表</span>
                                            </router-link>
                                        </li>
                                        

                                        <!-- <li>
                                            <router-link to="/manage/video" v-bind:class="this.$store.state.tabIndex == 35 ? 'activePage' : ''">
                                                <i class="fa fa-youtube-play" aria-hidden="true"></i><span>video管理</span>
                                            </router-link>
                                        </li> -->
=======