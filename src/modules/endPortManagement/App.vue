<template>
  <div id="app">
    <HeaderApp></HeaderApp>
    <!--<div >-->
      <router-view v-if="isRouterAlive"></router-view>
    <!--</div>-->
    <!--<FooterApp></FooterApp>-->
  </div>
</template>

<script>
import HeaderApp from '@/components/header'
import Slide from '@/components/slider'
import FooterApp from '@/components/footer'
export default {
  data () {
      return {
          isRouterAlive: true
      }
  },
  methods: {
      reload () {
          this.isRouterAlive = false;
          this.$nextTick(() => (this.isRouterAlive = true))
      }
  },
  provide () {
    return {
        reload : this.reload
    }
  },
  name: 'app',
  components: {
    HeaderApp,
    Slide,
    FooterApp
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family:微软雅黑, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 1200px;
  overflow: hidden;
  position: relative;
  padding-bottom: 70px;
  background: #f5f5f5;
  min-height: 100vh;
}

</style>
