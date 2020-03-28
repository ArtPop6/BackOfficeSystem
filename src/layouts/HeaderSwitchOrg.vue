<template>
  <a-dropdown class="top-orgizaion" v-if="orgList.length > 1">
    <span class="top-orgizaion__name">
      <span>切换俱乐部：{{currOrg}}</span>
      <a-icon type="down" />
    </span>
    <a-menu
      style="width: 150px"
      slot="overlay"
      @click="handlerSelect"
    >
      <a-menu-item v-for="(item, index) in orgList" :key="item.id" :index="index" :title="item.name">
        <a-icon type="shop" /><span >{{item.name}}</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: 'HeaderlSwitchOrg',
  computed: {
    currOrg () {
      return this.$store.state.session.org.name
    },
    orgList () {
      return this.$store.state.session.org.list
    }
  },
  methods: {
    handlerSelect (item, key, selectedKeys) {
      function _switchToken(accessToken) {
        window.localStorage.setItem('access_token', accessToken);
        window.localStorage.setItem('ampm_org_id', item.key);
        setTimeout(() => {
          window.location.href = window.location.origin + '/dashboard'
        }, 50)
      }
      function _next(item) {
        this.$http.put('/auth/access_token', {
            corp_id: item.key,
          }).then((res) => {
            _switchToken(res.data.access_token)
          })
      }
      _next.call(this, item)
    },
  }
}
</script>

<style lang="stylus" scoped>
.top-orgizaion
  display inline-block
  height 100%
  vertical-align initial

  &__name
    color #adadad
    cursor pointer

    span
      margin-right 4px
</style>
