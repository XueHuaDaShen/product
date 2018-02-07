// import actions from './actions';
// import * as actions from './actions';
// import * as getters from './getters';
// console.log(actions);

const state = {
    tabIndex: 0,
    // 阿里云
    rootUrl: 'http://123.56.6.6:9000/api/v1',
    rootUrl3: 'http://123.56.6.6:8018/api/v1/man',

    // 线上
    // rootUrl: 'https://dee.tutulive.tv:8443/api/v1',
    // rootUrl3: 'https://dee.tutulive.tv:8446/api/v1/man',

    // rootMenu: 'manage',
    // menus: [],
    // menus: [{
    //     name: '统计信息',
    //     url: 'record'
    // },{
    //     name: '推送管理',
    //     url: 'push'
    // },{
    //     name: 'Banner管理',
    //     url: 'ad'
    // },{
    //     name: '礼品管理',
    //     url: 'gift'
    // },{
    //     name: '主播管理',
    //     url: 'anchor'
    // },{
    //     name: '主播审核',
    //     url: 'exam'
    // },{
    //     name: '公会管理',
    //     url: 'union'
    // },{
    //     name: '直播管理',
    //     url: 'tv'
    // },{
    //     name: '活动管理',
    //     url: 'ac'
    // },{
    //     name: '活动主播管理',
    //     url: 'acOnline'
    // },{
    //     name: '权限管理',
    //     url: 'authority'
    // },{
    //     name: '角色管理',
    //     url: 'role'
    // },{
    //     name: '菜单管理',
    //     url: 'menu'
    // },{
    //     name: '管理员管理',
    //     url: '/manage/record'
    // },{
    //     name: '我的资料',
    //     url: 'my'
    // },{
    //     name: '我的资料',
    //     url: 'my'
    // },],
    //
    autho: [],
    // rootUrl: 'https://dee.tutulive.tv:8443/api/v1',
    // rootUrl2: 'https://dee.tutulive.tv:8445/api/v1/cms'
};

const mutations = {
    CHANGETAB (state, currentTabindex) {
        state.tabIndex = currentTabindex;
    },

    CHANGESUB (state, currentSubindex) {
        state.subIndex = currentSubindex;
    }
};

const actions = {
    tabChanger({ commit }, tabIndex) {
        // console.log(commit);
        commit('CHANGETAB', tabIndex);
    },
    subChanger({ commit }, subIndex) {
        commit('CHANGESUB', subIndex)
    }
};

const getters = {
    getTabindex(state) {
        console.log(state.tabIndex);
    },
    getSubindex(state) {
        "use strict";
        console.log(state.subIndex);
    }
};

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
});
