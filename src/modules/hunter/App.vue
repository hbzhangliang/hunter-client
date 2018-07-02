<template>
  <div id="app">
    <HeaderApp></HeaderApp>
    <!--<div >-->
      <router-view v-if="isRouterAlive"></router-view>
    <!--</div>-->
    <FooterApp></FooterApp>
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


</style>
