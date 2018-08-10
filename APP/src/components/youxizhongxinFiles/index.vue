<template>
  <div class="yxzxsy-wrap">
    <nav class="yxdt-navList">
      <span class="nav-item" v-for="(item, index) in nav" :key="index" @click="changeYxzxsyNav(item.name)">
        <router-link :class="currNav===item.name?'active':''" :to="{name: item.url}">{{item.title}}</router-link>
      </span>
      <em class="curr-tag" :class="currNav+'-place'"></em>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'yxzxsy',
  data() {
    return {
      msg: '游戏中心首页',
      nav: [
        {title: '彩票游戏', url: 'lottery', name: 'lottery'},
        {title: '电子游艺', url: 'electron', name: 'electron'},
        {title: '足球游戏', url: 'soccer', name: 'soccer'},
        {title: '真人视讯', url: 'liveVideo', name: 'liveVideo'},
        {title: '棋牌竞技', url: 'chessBoard', name: 'chessBoard'}
      ],
      currNav: 'lottery'
    }
  },
  created() {
    this.$store.dispatch('setFooterStatus', true);
    this.$store.dispatch('setBackStatus', false);
    this.$store.dispatch('setPlayModeStatus', false);
    this.$store.dispatch('setCleanBtn', false);
    this.currNav = this.$route.name
    this.$store.dispatch('setTitle', '游戏大厅')
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  computed: {},
  methods: {
    changeYxzxsyNav(val) {
      this.currNav = val;
    }
  },
}
</script>
<style lang="scss" scoped>
.yxzxsy-wrap{
  .yxdt-navList{
    width:100%;
    height:1rem;
    padding:0 .52rem;
    display:-webkit-box;
    -webkit-box-align:center;
    -webkit-box-pack:justify;
    border-bottom:.01rem solid #333;
    position: relative;
    overflow-x:auto;
    a{
      text-decoration: none;
      display:block;
      color:#646464;
    }
    a.active{
      color:#CC3447;
    }
    span{
      display:block;
      width:27.5%;
    }
    .curr-tag{
      position: absolute;
      bottom:0;
      width:.2rem;
      height:.12rem;
      background: #CC3447;
      margin-left:-.1rem;
      left:14.5%;
      font-style:normal;
      transition: all .3s;
      background:url('/static/img/up_red_sanjiao.png') no-repeat;
      background-size:100% 100%;
    }
    em.lottery-place{
      left:14.5%;
    }
    em.electron-place{
      left:38%;
    }
    em.soccer-place{
      left:61.5%;
    }
    em.liveVideo-place{
      left:85%;
    }
  }
}
</style>


