<template>
  <div class="add">
    <div class="form__container">
      <a-form :form="form">
        <span class="container__title">基础属性（SPU）/ 操房基础信息</span>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="操房名称">
          <a-input
            placeholder="请输入操房名称"
            v-decorator="[
              'name',
              { initialValue: details.name, rules: [{ required: true, message: '请输入操房名称!' }] }
            ]"
          />
        </a-form-item>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="所属门店">
          <a-select
            placeholder="请选择，单选"
            style="width: 220px"
            v-decorator="[
              'store_id',
              { initialValue: details.store_id, rules: [{ required: true, message: '请选择门店!' }] }
            ]"
          >
            <a-select-option :key="index" :value="list.id" v-for="(list, index) in listdata">
              {{
              list.name
              }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="房间面积">
          <a-input
            placeholder="请输入房间面积"
            v-decorator="[
              'area',
              { initialValue: details.area, rules: [{ required: true, message: '请输入房间面积！' }] }
            ]"
          />
        </a-form-item>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="容纳人数">
          <a-input
            placeholder="请输入最大上课人数"
            v-decorator="[
              'capacity',
              { initialValue: details.capacity, rules: [{ required: true, message: '请输入最大容纳人数！' }] }
            ]"
          />
        </a-form-item>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="位置分布">
          <a-input
            placeholder="行数"
            v-decorator="[
              'row_counts',
              { initialValue: details.row_counts, rules: [{ required: true, message: '请输入行数！' }] }
            ]"
          />
        </a-form-item>
        <a-button @click="finished($event)" class="submit" html-type="submit" type="primary">保存</a-button>
        <a-button @click="back" class="ml__16">取消</a-button>
      </a-form>
    </div>
  </div>
</template>
<script>
const formItemLayout = {
  wrapperCol: { span: 4, offset: 4 }
}

export default {
  data() {
    return {
      space_id: '',
      form: this.$form.createForm(this, { name: 'operafile' }),
      formItemLayout,
      listdata: [],
      details: {}
    }
  },
  methods: {
    shoplist() {
      this.$http.get(`/stores/list`).then(res => {
        this.listdata = res.data
      })
    },
    detail() {
      if (this.$route.query.spaceid) {
        const space_id = this.$route.query.spaceid
        this.$http.get(`/space/detail?space_id=${space_id}`).then(res => {
          this.details = res.data
        })
      }
    },
    finished(e) {
      if (this.$route.query.spaceid) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            const data = {
              id: this.$route.query.spaceid,
              name: values.name,
              area: values.area,
              capacity: values.capacity,
              row_counts: values.row_counts,
              store_id: values.store_id
            }
            this.$http.put(`/space`, data).then(res => {
              this.$message.success('新增操房成功', 1.5)
              setTimeout(this.back, 1000)
            })
          }
        })
      }
      if (!this.$route.query.spaceid) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            const data = {
              name: values.name,
              area: values.area,
              capacity: values.capacity,
              row_counts: values.row_counts,
              store_id: values.store_id
            }
            this.$http.post(`/space`, data).then(res => {
              this.$message.success('新增操房成功', 1.5)
              setTimeout(this.back, 1000)
            })
          }
        })
      }
    },
    back() {
      this.$router.push({
        name: 'operating'
      })
    }
  },
  created() {
    this.shoplist()
    this.detail()
  }
}
</script>
<style lang="stylus" scoped>
.add
  padding 20px 50px

  .form__container
    padding-top 70px

    .container__title
      display block
      text-align center
      font-weight bold
      font-size 20px
      margin 0 auto
      margin-bottom 30px

  .times
    text-align center
    line-height 40px
    margin-right 20px

  .rongliang
    position absolute
    right -390px
    top -6px

  .submit
    margin-left 42%
    margin-top 80px

  .ml__16
    margin-left 16px

  .location
    margin-left 256px
</style>
