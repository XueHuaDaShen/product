import '../styles/app.scss';

// views
import index from "./components/index.vue";
import login from "./components/login.vue";
import authority from "./components/authority.vue";
import role from "./components/role.vue";
import menu from "./components/menu.vue";
import appUsers from "./components/appUsers.vue";
import admin from "./components/admin.vue";
import configure from "./components/configure.vue";
import modify from "./components/modify.vue";
import punish from "./components/punish.vue";
import gift from "./components/gift.vue";
import ad from "./components/ad.vue";
import robot from "./components/robot.vue";
import rule from "./components/rule.vue";
import push from "./components/push.vue";
import ac from "./components/ac.vue";
import acOnline from "./components/acOnline.vue";
import Abnormal from "./components/Abnormal.vue";
import server from "./components/server.vue";
import paylist from "./components/paylist.vue";
import recharge from "./components/recharge.vue";
import record from "./components/record.vue";
import anchor from "./components/anchor.vue";
import exam from "./components/exam.vue";
import union from "./components/union.vue";
import tv from "./components/tv.vue";
import my from "./components/my.vue";
import review from "./components/review.vue";
import vipconfig from "./components/vipconfig.vue";
import vip from "./components/vip.vue";
import animation from "./components/animation.vue";
import account from "./components/account.vue";
import kpi from "./components/kpi.vue";
import acRecharge from "./components/acRecharge.vue";
import acRecord from "./components/acRecord.vue";
import concert from "./components/concert.vue";
import star from "./components/star.vue";
import audio from "./components/audio.vue";
import accountRec from "./components/accountRec.vue";
import whiteList from "./components/whiteList.vue";
import pk from "./components/pk.vue";
import red from "./components/red.vue";
import lottery from "./components/lottery.vue";
import videoUpload from "./components/videoUpload.vue";
import videoExam from "./components/videoExam.vue";
import anchorSee from "./components/anchorSee.vue";
import videoPublish from "./components/videoPublish.vue";
import recommend from "./components/recommend.vue";
import tagLibrary from "./components/tagLibrary.vue";
import sendRed from "./components/sendRed.vue";
import playback from "./components/playback.vue";
import imgUpload from "./components/imgUpload.vue";
import anchorRanking from "./components/anchorRanking.vue";
import sensitive from "./components/sensitive.vue";
import videoPlayback from "./components/videoPlayback.vue";
import pid from "./components/pid.vue";
import smallVideo from "./components/smallVideo.vue";
import broadcastMessage from "./components/broadcastMessage.vue";
import contest from "./components/contest.vue";
import idol from "./components/idol.vue";
import area from "./components/area.vue";
import october from "./components/october.vue";
import candidate from "./components/candidate.vue";
import feedback from "./components/feedback.vue";
import christmas from "./components/christmas.vue";
import cash from "./components/cash.vue";
import withdrawal from "./components/withdrawal.vue";
import emoticon from "./components/emoticon.vue";
import questions from "./components/questions.vue";
import questionManage from "./components/questionManage.vue";
import dictionary from "./components/dictionary.vue";
import guessing from "./components/guessing.vue";
import startIssue from "./components/startIssue.vue";
import winner from "./components/winner.vue";
import activityDetail from "./components/activityDetail.vue";

// import video from "./components/video.vue";


// vuex
import store from './vuex/store';

// 路由定义
// const routes = [{
//     path: '/',
//     component: agentManage
// }, {
//     path: '/agentManage',
//     component: agentManage
// }, {
//     path: '/agentRecharge',
//     component: agentRecharge
// }, {
//     path: '/userRecharge',
//     component: userRecharge
// }, {
//     path: '/statistics',
//     component: statistics
// }, {
//     path: '/admin',
//     component: admin
// }];

const routes = [{
    path: '/',
    redirect: '/login',
}, {
    path: '/manage',
    component: index,
    children: [{
        path: '',
        component: my
    }, {
        path: 'my',
        component: my
    }, {
        path: 'authority',
        component: authority,
        beforeEnter: (to, from, next) => {
            if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[10])) {
                next();
            } else {
                next(false);
            }
        }
    }, {
        path: 'role',
        component: role,
        beforeEnter: (to, from, next) => {
            if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[11])) {
                next();
            } else {
                next(false);
            }
        }
    },
        {
            path: 'menu',
            component: menu,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[12])) {
                    next();
                } else {
                    next(false);
                }
            }
        },
        {
            path: 'appUsers',
            component: appUsers,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[16])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'admin',
            component: admin,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[13])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'configure',
            component: configure,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[33])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'modify',
            component: modify,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[32])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'punish',
            component: punish,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[17])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'gift',
            component: gift,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[3])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'ad',
            component: ad,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[2])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'robot',
            component: robot,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[14])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'rule',
            component: rule,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[15])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'push',
            component: push,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[1])) {
                    next();
                } else {
                    next(false);
                }

            }
        }, {
            path: 'ac',
            component: ac,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[8])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'acOnline',
            component: acOnline,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[9])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'Abnormal',
            component: Abnormal,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[30])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'server',
            component: server,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[25])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'paylist',
            component: paylist,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[31])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'recharge',
            component: recharge,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[18])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'record',
            component: record,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[0])) {
                    next()
                } else {
                    next(false);
                }

            }
        }, {
            path: 'anchor',
            component: anchor,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[4])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'exam',
            component: exam,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[5])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'union',
            component: union,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[6])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'tv',
            component: tv,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[7])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'review',
            component: review,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[19])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'vipconfig',
            component: vipconfig,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[20])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'vip',
            component: vip,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[21])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'animation',
            component: animation,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[22])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'account',
            component: account,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[23])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'kpi',
            component: kpi,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[24])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'acRecharge',
            component: acRecharge,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[26])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'acRecord',
            component: acRecord,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[27])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'concert',
            component: concert,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[28])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'star',
            component: star,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[29])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'audio',
            component: audio,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[34])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'accountRec',
            component: accountRec,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[35])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'whiteList',
            component: whiteList,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[36])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'pk',
            component: pk,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[37])) {
                    next();
                } else {
                    next(false);
                }
            }
        }, {
            path: 'red',
            component: red,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[38])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'lottery',
            component: lottery,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[39])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'anchorSee',
            component: anchorSee,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[40])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'videoUpload',
            component: videoUpload,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[41])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'videoPublish',
            component: videoPublish,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[42])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'videoExam',
            component: videoExam,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[43])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'recommend',
            component: recommend,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[44])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'tagLibrary',
            component: tagLibrary,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[45])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'sendRed',
            component: sendRed,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[46])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'playback',
            component: playback,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[47])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'imgUpload',
            component: imgUpload,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[48])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'anchorRanking',
            component: anchorRanking,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[49])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'sensitive',
            component: sensitive,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[50])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'videoPlayback',
            component: videoPlayback,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[51])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'pid',
            component: pid,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[52])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'smallVideo',
            component: smallVideo,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[53])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'broadcastMessage',
            component: broadcastMessage,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[54])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'contest',
            component: contest,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[55])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'idol',
            component: idol,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[56])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'area',
            component: area,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[57])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'october',
            component: october,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[58])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'candidate',
            component: candidate,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[59])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'christmas',
            component: christmas,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[60])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'feedback',
            component: feedback,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[61])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'emoticon',
            component: emoticon,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[62])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'cash',
            component: cash,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[63])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'questions',
            component: questions,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[64])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'dictionary',
            component: dictionary,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[65])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'guessing',
            component: guessing,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[66])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'startIssue',
            component: startIssue,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[67])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'withdrawal',
            component: withdrawal,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[68])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'questionManage',
            component: questionManage,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[69])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'winner',
            component: winner,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[70])) {
                    next();
                } else {
                    next(false);
                }
            }
        },{
            path: 'activityDetail',
            component: activityDetail,
            beforeEnter: (to, from, next) => {
                if (parseInt(localStorage.getItem(localStorage.getItem('USERNAME') + 'AUTHO').split(',')[70])) {
                    next();
                } else {
                    next(false);
                }
            }
        }]
}, {
    path: '/login',
    component: login
},];

// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});


//创建和挂载根实例。

const app = new Vue({
    router,
    store
}).$mount('#app');
