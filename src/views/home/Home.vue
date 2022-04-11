<template>
  <div class="home">
    <nav-bar class="home-nav"><h2 slot="center">购物街</h2></nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="ContentScroll"
      @pullingUp="LoadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import GoodsListItem from 'components/content/goods/GoodsListItem'
import Scroll from 'components/common/scroll/Scroll.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import BackTop from 'components/content/backTop/BackTop.vue'

export default {
  name: 'home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    TabControl,
    GoodsList,
    GoodsListItem,
    Scroll,
    BackTop
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {},

  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听的方法
     */
    tabClick(index) {
      this.currentType = index == 0 ? 'pop' : index == 1 ? 'new' : 'sell'
    },
    backTop() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    ContentScroll(position) {
      this.isShowBackTop = position.y <= -1000
    },
    LoadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.finishPullUp()
      this.$refs.scroll.scroll.refresh()
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res.data)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>
<style scoped>
.home {
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9;
}

.content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
}
</style>
