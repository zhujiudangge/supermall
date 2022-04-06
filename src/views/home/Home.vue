<template>
  <div class="home">
    <nav-bar class="home-nav"><h2 slot="center">购物街</h2></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import { getHomeMultidata } from 'network/home'

export default {
  name: 'home',
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then((res) => {
      // console.log(res.data)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;
}
</style>
