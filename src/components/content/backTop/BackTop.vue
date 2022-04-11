<template>
  <div class="back-top">
    <img src="~assets/img/common/top.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'backTop',
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  padding: 5px;
}

.back-top img {
  width: 100%;
}
</style>
