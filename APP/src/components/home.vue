<template>
  <div class="shouye-wrap public-wrap">
    <div class="tip">
      <span class="laba"></span>
      <em>【温馨提示】更安全的设置密码</em>
    </div>
    <div class="banner-wrap">
      <div class="swiper-content" v-if="bannerlist.length>0">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide b1" v-for="(item, index) in bannerlist" :key="index">
              <a target="_blank" :href="item.url">
                <img :src="item.activity_photo" />
              </a>
            </div>
            <!-- <div class="swiper-slide b2">
            </div>
            <div class="swiper-slide b3">
            </div> -->
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="split-bar"></div>
    <div class="nav-bar">
      <span></span>
      <em>彩票大厅</em>
    </div>
    <ul class="caipiaoList">
      <router-link v-for="(lottery, li) in lotteryList" :key="li" :to="{ name: lottery.gamecode.split('.')[0]==='lhc'?'lhc':'betsView', query:{id: lottery.gameid, code: lottery.gamecode.split('.')[0]==='qt'?lottery.gamecode.split('.')[1]:lottery.gamecode.split('.')[0]} }">
        <li>
          <span><img :src="'../static/img/'+lottery.gamecode.split('.')[0]+'_icon.png'"></span>
          <em>{{lottery.gamename}}</em>
        </li>
      </router-link>
    </ul>
    <div class="split-bar"></div>
    <div class="nav-bar">
      <span></span>
      <em>综合娱乐</em>
    </div>
    <ul class="yuleList">
      <li class="agdz-li">
        <span>AG电子</span>
      </li>
      <li class="byyxg-li">
        <span>波音游戏馆</span>
      </li>
      <li class="sbty-li">
        <span>沙巴体育</span>
      </li>
      <li class="agsx-li">
        <span>AG视讯</span>
      </li>
      <li class="bbinyxg-li">
        <span>BBIN游戏馆</span>
      </li>
      <li class="igyxg-li">
        <span>IG游戏馆</span>
      </li>
    </ul>
    <div class="split-bar"></div>
    <div class="nav-bar">
      <span></span>
      <em>最新活动</em>
    </div>
    <p class="no-result" style="padding:.3rem;text-align:center;" v-if="noResult">暂无活动</p>
    <ul class="huodongList" v-if="!noResult">
      <li v-for="(activity, index) in huodongList" :key="index">
        <a>
          <img :src="activity.activity_photo" class="a1" :alt="activity.title">
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import request from '@/axios/axios.js'
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mySwiper: null,
      bannerlist: [], // banner图
      lotteryList: [], // 彩票列表
      noResult: false, // 是否有活动
      huodongList: [], // 活动列表
    }
  },
  beforeCreate() {
  },
  created() {
    // alert('islogout-----'+localStorage.getItem('islogout'))
    // alert('phone-token-----'+localStorage.getItem('phone-token'))
    // alert('loginname-----'+localStorage.getItem('loginname'))
    // alert('refund-----'+localStorage.getItem('refund'))
    // alert('blance-----'+localStorage.getItem('blance'))
    this.$store.dispatch('setTitle', '首页');
    this.$store.dispatch('setFooterStatus', true);
    this.$store.dispatch('setBackStatus', false);
    this.$store.dispatch('setCleanBtn', false)
    this.$store.dispatch('setPlayModeStatus', false);
    this.$store.dispatch('setPlayName', []);
    this.$store.dispatch('setShoppingCartData', []);
  },
  mounted() {
    this.getBanner();
    this.getLotteryList();
    this.getActivities();
  },
  beforeDestroy() {},
  destroyed() {},
  computed: {},
  methods: {
    // 获取banner 图
    getBanner() {
      const vm = this;
      request.http('get', '/ad/list', {},
        (success) => {
          // console.log(success)
          if (success.returncode == 200) {
            // let bannerlist = success.data;
            if (success.data.total != 0) {
              try{
                vm.bannerlist = success.data.data;
                vm.$nextTick(function() {
                  vm.initSwiperData()
                })
              }catch(e){
                alert('banner图---'+e)
              }
            } else {
              vm.bannerlist = [];
              vm.initSwiperData()
            }
          }
        },
        (error) => {
          console.log('获取用户信息失败', error)
        }
      )
    },
    initSwiperData() {
      this.mySwiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 1000,
        onlyExternal: true,
        loopedSlides: 20,
        loopAdditionalSlides: 20,
        navigation: {
          nextEl: '.arrow-left',
          prevEl: '.arrow-right',
        },
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: '.swiper-pagination',
          // type: 'custom',
          // clickable: true,
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active',
          renderBullet: function(index, className) {
            // return '<span class="' + className + '">' + (index + 1) + '</span>';
            return '<span class="' + className + '"></span>';
          },
        },
        onSlideChangeEnd: function(swiper) {
          //alert(swiper.activeIndex);
          if (swiper.activeIndex == 40) {
            swiper.swipeTo(0, 0)
          }
        },
      });
    },
    // 获取彩票列表
    getLotteryList() {
      const vm = this;
      request.http(
        'get',
        '/lottery/hots',
        {},
        (success) => {
          // console.log(success.data)
          if (success.returncode && success.returncode == 200) {
            vm.lotteryList = success.data;
            // vm.lotteryList.sort((a, b) => {
            //   return a.order-b.order
            // })
          }
        },
        (error) => {
          console.log('数据异常', error)
        }
      )
    },
    // 获取活动列表
    getActivities() {
      const vm = this;
      let url = "/activity/list";
      request.http(
        "get",
        url, { page_num: 1, page_size: 1000 },
        success => {
          if (success.returncode && success.returncode == 200) {
            if (success.data.total != 0) {
              try{
                let data = success.data.data;
                vm.huodongList = data;
                vm.noResult = false;
              }catch(e){
                alert('活动列表---'+e)
              }
            } else {
              vm.huodongList = [];
              vm.noResult = true;
            }
          }
        },
        error => {
          vm.huodongList = [];
          vm.noResult = true;
        }
      );
    }
  },
}
</script>
<style lang="scss">

.my-bullet {
  width: .18rem;
  height: .18rem;
  // text-align: center;
  // line-height: .18rem;
  cursor: pointer;
  display: inline-block;
  margin: 0 .1rem;
  border-radius: 50%;
  background: #8D8D8D;
  opacity:1;
}

.my-bullet-active {
  background: #fff;
}
</style>

<style lang="scss" scoped>
.shouye-wrap{
  // padding-bottom:1.83rem;
  em{
    font-style:normal;
  }
  img{
    width:100%;
    height:100%;
  }
  .tip{
    padding:.2rem 0 .3rem .2rem;
    font-size:.3rem;
    display:-webkit-box;
    -webkit-box-align:center;
    .laba{
      display:block;
      width:.34rem;
      height:.34rem;
      // background:#c7c7c7;
      background:url('/static/img/horn.png') no-repeat;
      background-size:100% 100%;
    }
    em{
      display:block;
      margin-left:.1rem;
    }
  }
  .banner-wrap{
    width:100%;
    height:3rem;
    .swiper-content, .swiper-container{
      height:100%;
    }
    .b1{
      background:red;
    }
    .b2{
      background:green;
    }
    .b3{
      background:blue;
    }
    .swiper-slide {
      height:100%;
      position: relative;
      a{
        display:block;
        width:100%;
        height:100%;
      }
      img {
        max-width: 100%;
        height:100%;
        opacity: 0.7;
        -webkit-transition: all linear 300ms;
        transition: all linear 300ms;
      }
      a:hover img {
        opacity: 1;
      }
    }
  }
  .nav-bar{
    padding:.3rem;
    font-size:.32rem;
    display:-webkit-box;
    -webkit-box-align:center;
    span{
      display:block;
      width:.08rem;
      height:.36rem;
      background:#C7C7C7;
    }
    em{
      display:block;
      margin-left:.16rem;
    }
  }
  .caipiaoList{
    width:100%;
    border-bottom:.01rem solid #333;
    display:flex;
    flex-wrap:wrap;
    li{
      width:2.5rem;
      height:2.49rem;
      border-top:.01rem solid #333;
      border-right:.01rem solid #333;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-box-align:center;
      -webkit-box-pack:center;
      &::nth-child(3n){
        border-right:none;
      }
      span{
        display:block;
        width:1.3rem;
        height:1.3rem;
        // background:#c7c7c7;
        border-radius:50%;
        overflow:hidden;
      }
      em{
        display:block;
        margin-top:.14rem;
      }
    }
  }
  .yuleList{
    width:100%;
    display:flex;
    flex-wrap:wrap;
    li{
      width:2.1rem;
      height:2.1rem;
      background: #292932;
      border-radius: .08rem;
      margin-left:.3rem;
      margin-bottom:.3rem;
      overflow:hidden;
      position: relative;
      span{
        display:block;
        width:2.1rem;
        height:.5rem;
        background:#303040;
        text-align:center;
        line-height:.5rem;
        position: absolute;
        left:0;
        bottom:0;
      }
    }
    li.agdz-li{
      background:url('/static/img/agdz.png') no-repeat;
      background-size:100% 100%;
    }
    li.byyxg-li{
      background:url('/static/img/byyxg.png') no-repeat;
      background-size:100% 100%;
    }
    li.sbty-li{
      background:url('/static/img/sbty.png') no-repeat;
      background-size:100% 100%;
    }
    li.agsx-li{
      background:url('/static/img/agsx.png') no-repeat;
      background-size:100% 100%;
    }
    li.bbinyxg-li{
      background:url('/static/img/bbinyxg.png') no-repeat;
      background-size:100% 100%;
    }
    li.igyxg-li{
      background:url('/static/img/igyxg.png') no-repeat;
      background-size:100% 100%;
    }
  }
  .huodongList{
    width:100%;
    display:flex;
    flex-wrap:wrap;
    margin-bottom:1.83rem;
    li{
      width:3.3rem;
      height:1.85rem;
      background: #292932;
      border-radius: .08rem;
      margin-left:.3rem;
      margin-bottom:.3rem;
      overflow:hidden;
      position: relative;
      a{
        display:block;
        width:100%;
        height:100%;
      }
    }
  }
}
</style>

