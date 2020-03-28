<template>
  <div>
    <div class="container">
      <div class="content">
        <div class="leftbox">
          <img alt="banner" class="banner" src="static/banner.jpg" />
        </div>
        <div class="rightbox">
          <div class="top">
            <div class="header">
              <img alt="logo" class="logo" src="static/crm.png" v-if="false" />
              <span class="title">{{systemName}}</span>
            </div>
            <div class="desc">{{slogan}}</div>
          </div>

          <div class="login">
            <a-form :form="form" @submit="onSubmit">
              <a-tabs :tabBarStyle="{textAlign: 'center'}" size="large" style="padding: 0 2px;">
                <a-tab-pane key="1" tab="账户密码登录">
                  <a-form-item>
                    <a-input
                      placeholder="请输入账户名"
                      size="large"
                      v-decorator="['name', { rules: [{ required: true, message: '请输入账户名' }] }]"
                    >
                      <a-icon slot="prefix" type="user" />
                    </a-input>
                  </a-form-item>

                  <a-form-item>
                    <a-input
                      placeholder="请输入密码"
                      size="large"
                      type="password"
                      v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
                    >
                      <a-icon slot="prefix" type="lock" />
                    </a-input>
                  </a-form-item>
                </a-tab-pane>

                <!-- <a-tab-pane key="2" tab="企业微信登录"></a-tab-pane> -->
              </a-tabs>
              <div v-if="false">
                <a-checkbox :checked="true">自动登录</a-checkbox>
                <a style="float: right">忘记密码</a>
              </div>
              <a-form-item>
                <a-button
                  :loading="logging"
                  htmlType="submit"
                  size="large"
                  style="width: 100%;margin-top: 24px"
                  type="primary"
                >登录</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
      <global-footer :copyright="copyright" :link-list="linkList" />
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import GlobalFooter from '../../layouts/GlobalFooter'

export default {
  name: 'Login',
  components: { GlobalFooter },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'login' }),
      uid: '',
      pwd: '',
      logging: false,
      error: '',
      slogan: ''
    }
  },

  computed: {
    systemName() {
      return this.$store.state.settings.systemName
    },
    linkList() {
      return this.$store.state.settings.footerLinks
    },
    copyright() {
      return this.$store.state.settings.copyright
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.logging = true
          this.$http
            .post('/auth/login', {
              user_name: values.name,
              // password: values.password,
              password: md5(values.password) // MD5 加密
            })
            .then(
              res => {
                localStorage.setItem('access_token', res.data.access_token)

                this.logging = false
                if (res.status === 200) {
                  this.$router.push('/dashboard')
                  this.$message.success('欢迎回来', 3)
                } else {
                  this.error = '登录失败'
                }
              },
              err => {
                this.logging = false
                console.log(err.data)
                this.$message.warning('登陆失败', 3)
              }
            )
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
.login-panel
  width 600px
  margin 100px auto 0

.primary--text
  color #1976D2 !important

.btn
  &.primary
    background-color #1867c0 !important

  &.btn--disabled
    background-color #aaa !important

.container
  display block
  flex-direction column
  height 100vh
  overflow auto
  background url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px
  background-size 100%

  .content
    width 1000px
    height 600px
    margin-top 10%
    margin-left 50%
    position absolute
    left -500px
    background #fff
    padding 32px 0
    flex 1
    display flex
    flex-direction row

    @media (min-width: 768px)
      padding 0 0 24px

    .leftbox
      padding-top 112px
      width auto
      flex 1

      .banner
        max-width 90%
        padding-left 10%

    .rightbox
      width 500px
      padding-top 112px

      &:before
        content ''
        width 1px
        height 400px
        background #e8e8e8
        display block
        position absolute

    .top
      text-align center

      .header
        height 44px
        line-height 44px

        a
          text-decoration none

        .logo
          height 44px
          vertical-align top
          margin-right 16px

        .title
          font-size 33px
          color rgba(0, 0, 0, 0.85)
          font-family 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif
          font-weight 600
          position relative
          top 2px

      .desc
        font-size 14px
        color rgba(0, 0, 0, 0.45)
        margin-top 12px
        margin-bottom 40px

    .login
      width 368px
      margin 0 auto

      @media screen and (max-width: 576px)
        width 95%

      @media screen and (max-width: 320px)
        .captcha-button
          font-size 14px

      .icon
        font-size 24px
        color rgba(0, 0, 0, 0.2)
        margin-left 16px
        vertical-align middle
        cursor pointer
        transition color 0.3s

        &:hover
          color #1890ff

.footer
  display block !important
</style>
