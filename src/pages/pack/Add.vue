<template>
  <div class="add">
    <div class="form__container">
      <a-form :form="form">
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="课包名称">
          <a-input
            placeholder="请输入操房名称"
            v-decorator="['name', {initialValue: detais.name, rules: [{ required: true, message: '请输入操房名称！' }] }]"
          />
        </a-form-item>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="原价/节">
          <a-input
            placeholder="请输入课程原价，当客户购买后将可抵用原价"
            v-decorator="['current_price', {initialValue: detais.current_price, rules: [{ required: true, message: '请输入原价！' }] }]"
          />
        </a-form-item>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="课包价/节">
          <a-input
            placeholder="请输入课包价，用户可以本价格购买课包"
            v-decorator="['original_price', {initialValue: detais.original_price, rules: [{ required: true, message: '请课包价！' }] }]"
          />
        </a-form-item>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" label="内含课程数">
          <a-input
            placeholder="请输入节数"
            v-decorator="['times', {initialValue: detais.times, rules: [{ required: true, message: '请输入节数！' }] }]"
          />
          <span class="knob">节</span>
        </a-form-item>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 4 }" label="使用期限">
          <span class="knobs">将在购买后</span>
          <a-input
            class="deadlines"
            placeholder="请输入使用期限/天"
            v-decorator="['time_limited', {initialValue: detais.time_limited, rules: [{ required: true, message: '请输入使用期限！' }] }]"
          />
          <span class="month">天失效</span>
        </a-form-item>
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="库存">
          <a-input
            placeholder="请输入库存"
            v-decorator="['store', {initialValue: detais.store, rules: [{ required: true, message: '请输入库存！' }] }]"
          />
        </a-form-item>
        <!-- <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }" label="类型">
          <a-select placeholder="请选择类型" v-model="sku.store_id">
            <a-select-option :key="index" :value="shop.id" v-for="(shop,index) in shops">{{shop.name}}</a-select-option>
          </a-select>
        </a-form-item>-->
        <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="类型">
          <a-checkbox-group
            style="width: 100%;"
            v-decorator="['course_adapter', {initialValue: detais.course_adapter,rules:[{required:true,message:'请选择类型'}]}]"
          >
            <a-row>
              <a-col :key="index" :span="8" v-for="(adapters,index) in adapter">
                <a-checkbox :value="adapters.id">{{adapters.name}}</a-checkbox>
              </a-col>
              <!-- <a-col :span="8">
                <a-checkbox value="B">B</a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="C">C</a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="D">D</a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="E">E</a-checkbox>
              </a-col>-->
            </a-row>
          </a-checkbox-group>
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
      form: this.$form.createForm(this, { name: 'operafile' }),
      formItemLayout,
      detais: {},
      adapter: []
    }
  },
  methods: {
    detailist() {
      if (this.$route.query.pack_id) {
        const packid = this.$route.query.pack_id
        this.$http.get(`/coursePackage/detail?course_package_id=${packid}`).then(res => {
          this.detais = res.data
        })
      }
    },
    typeList() {
      this.$http.get(`/coursePackage/adapter`).then(res => {
        this.adapter = res.data
      })
    },
    finished(e) {
      if (this.$route.query.pack_id) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            values.id = this.$route.query.pack_id
            this.$http.put(`/coursePackage`, { params: values }).then(res => {
              this.$message.success('新课包成功', 1.5)
              setTimeout(this.back, 1000)
            })
          }
        })
      }
      if (!this.$route.query.pack_id) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            this.$http.post(`/coursePackage`, { params: values }).then(res => {
              this.$message.success('新课包成功', 1.5)
              setTimeout(this.back, 1000)
            })
          }
        })
      }
    },
    back() {
      this.$router.push({
        name: 'pack'
      })
    }
  },
  created() {
    this.detailist()
    this.typeList()
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

  .knob
    position absolute
    width 100px
    margin-left 10px

  .knobs
    // position absolute
    width 100px

  .deadlines
    position absolute
    left 76px
    width 170px

  .month
    position absolute
    left 250px
    width 100px
</style>