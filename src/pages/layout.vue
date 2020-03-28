<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider
      :class="[theme, 'sider', 'shadow', collapsed ? 'collapsed' : null]"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo-panel">
        <router-link to="/dashboard">
          <img class="logo" src="/static/crm.png" />
          <h1>{{ systemName }}</h1>
        </router-link>
      </div>
      <slider-menu :theme="theme"></slider-menu>
    </a-layout-sider>

    <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px' }">
      <!-- <a-layout :style="{ marginLeft: collapsed? '80px':'200px', 'background':'#fff'}"> -->
      <a-layout-header
        :style="{
          position: 'fixed',
          zIndex: 1,
          width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)'
        }"
        class="header"
      >
        <global-header :collapsed="collapsed" @toggleCollapse="toggleCollapse" />
      </a-layout-header>
      <a-layout-content :style="{ padding: '0', marginTop: '64px' }" class="layout-content" ref="content">
        <transition name="fade">
          <keep-alive v-if="multipage">
            <router-view />
          </keep-alive>
          <router-view v-else />
        </transition>
      </a-layout-content>
      <a-layout-footer style="padding: 0px; background: #fff;">
        <global-footer :copyright="copyright" :link-list="linkList" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import GlobalHeader from 'src/layouts/GlobalHeader'
import GlobalFooter from 'src/layouts/GlobalFooter'
import { mapState, mapActions } from 'vuex'
import SliderMenu from '../components/menu/SliderMenu'

export default {
  name: 'layout',
  components: { SliderMenu, GlobalFooter, GlobalHeader },
  computed: {
    theme() {
      return this.$store.state.settings.theme
    },
    systemName() {
      return this.$store.state.settings.systemName
    },
    multipage() {
      return this.$store.state.settings.multipage
    },
    ...mapState({
      user: state => state.session.user
    }),
    linkList() {
      return this.$store.state.settings.footerLinks
    },
    copyright() {
      return this.$store.state.settings.copyright
    }
  },
  data: () => ({
    collapsed: false
  }),
  methods: {
    ...mapActions(['updateSession', 'getAuthority', 'fetchOrginzations']),
    toggleCollapse() {
      this.collapsed = !this.collapsed
    }
  },
  mounted() {
    this.updateSession()
    this.getAuthority()
    this.fetchOrginzations()
    this.$refs.content.$el.style.minHeight = document.documentElement.clientHeight - 180 + 'px'
  }
}
</script>
<style lang="stylus" scoped>
.header
  background #fff
  padding 0

.layout-content
  margin 24px 0px
  padding 0px

.logo-panel
  padding 15px 10px
  overflow hidden
  text-overflow ellipsis
  word-break break-all

  .logo
    width 50px
    height 50px

  h1
    color #fff
    font-size 14px
    margin 0 0 0 7px
    font-family 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif
    font-weight 600
    display inline-block
    height 32px
    line-height 32px
    vertical-align middle

.collapsed
  .logo-panel
    text-align center

  h1
    display none

#components-layout-demo-custom-trigger
  .trigger
    font-size 18px
    line-height 64px
    padding 0 24px
    cursor pointer
    transition color 0.3s

    .logo
      height 32px
      margin 16px

  .trigger:hover
    color #1890ff

.ant-layout-sider
  background #000
</style>
