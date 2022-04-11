<template>
  <div class="warpper" ref="warpper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  created() {},
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.warpper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad,
      mouseWheel: true,
      observeDOM: true
    })

    // 2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    // 3. 监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    }
  }
}
</script>
<style scoped></style>
