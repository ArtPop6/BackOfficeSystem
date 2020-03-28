<template>
  <div class="curriculums">
    <div class="add">
      <a-steps :current="current">
        <a-step description title="基础信息" />
        <a-step description title="门店描述" />
        <a-step description title="完成" />
      </a-steps>

      <div class="form__container">
        <a-form :form="form">
          <div v-show="current===0">
            <div class="form__container--color">
              <span class="container__title">基础属性（SPU）/ 课程基础信息</span>
              <a-form-item :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }" label="课程名称">
                <a-input
                  placeholder="请输入课程名称"
                  v-decorator="['name', {initialValue: counted.name, rules: [{ required: true, message: '请输入课程名称！' }] }]"
                />
              </a-form-item>
              <a-form-item :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }" label="消耗能量">
                <a-input
                  min="1"
                  oninput="javascript:this.value=this.value.replace(/[^\d]/g,'')"
                  placeholder="请输入课程消耗的能量/KCal"
                  type="number"
                  v-decorator="['calorie', {initialValue: counted.calorie, rules: [{ required: true, message: '请输入课程消耗的能量/KCAL！' }] }]"
                />
              </a-form-item>
            </div>
            <div class="form__container--color">
              <span class="container__title">课程属性（SPU）/ 方便批量为门店添加课程</span>
              <div class="container__table">
                <a-row class="container__border">
                  <a-col :span="9">上课门店</a-col>
                  <a-col :span="5">课程单价</a-col>
                  <a-col :span="5">最小开课人数</a-col>
                  <a-col :span="5">最多容纳人数</a-col>
                  <!-- <a-col :span="4">是否支持选位</a-col> -->
                </a-row>
                <a-row :key="index" class="row__margin" v-for="(sku,index) in skus">
                  <a-col :span="9">
                    <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }">
                      <a-select placeholder="请选择门店" v-model="sku.store_id">
                        <a-select-option :key="index" :value="shop.id" v-for="(shop,index) in shops">{{shop.name}}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="5">
                    <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 11 }">
                      <a-input
                        oninput="javascript:this.value=this.value.replace(/[^\d]/g,'')"
                        placeholder="输入价格"
                        v-model="sku.price"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="5">
                    <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 11 }">
                      <a-input
                        oninput="javascript:this.value=this.value.replace(/[^\d]/g,'')"
                        placeholder="最小人数"
                        v-model="sku.min_capacity"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="5">
                    <a-form-item :label-col="{ span: 2 }" :wrapper-col="{ span: 11 }">
                      <a-input
                        oninput="javascript:this.value=this.value.replace(/[^\d]/g,'')"
                        placeholder="最多人数"
                        v-model="sku.max_capacity"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <div class="container__addrow">
                  <span>操作：</span>
                  <span @click="addRow()" class="container__addrow--blue">增加一条</span>
                </div>
              </div>
            </div>
            <div class="form__container--color">
              <span class="container__title">课程标签 / 方便批量在小程序快速搜索</span>
              <div class="container__label">
                <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="已有标签">
                  <a-tag
                    :key="index"
                    color="#108ee9"
                    required="true"
                    style="height:30px;line-height:26px"
                    v-for="(imgs,index) in tag"
                  >
                    {{imgs}}
                    <img @click="delect(index)" src="./img/white.png" />
                  </a-tag>
                  <!-- <a-tag @close="log" closable color="#108ee9" style="height:30px;line-height:26px">暑期促销</a-tag>
                  <a-tag @close="log" closable color="#108ee9" style="height:30px;line-height:26px">搏击</a-tag>-->
                </a-form-item>
                <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" label="添加标签">
                  <!-- <a-input placeholder="请输入标签，最多输入6个汉字" v-model="label" /> -->
                  <a-select @change="selectLable" placeholder="请选择标签">
                    <a-select-option :key="index" :value="lables" v-for="(lables,index) in lable">{{lables}}</a-select-option>
                  </a-select>
                  <a-button @click="addLible()" class="addlable">添加</a-button>
                </a-form-item>
                <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="课程分类">
                  <a-radio-group
                    v-decorator="[
            'category_id',
            {initialValue:counted.type_id, rules: [{ required: true, message: '请选择课程分类' }]}
          ]"
                  >
                    <a-radio-button :key="index" :value="types.id" v-for="(types,index) in type">
                      {{types.name}}
                      <img @click="deleteType(index)" class="fork" src="./img/fork.png" />
                    </a-radio-button>
                  </a-radio-group>
                </a-form-item>
                <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" label="添加分类">
                  <a-input placeholder="请输入分类，最多输入6个汉字" v-model="types" />
                  <a-button @click="addType()" class="addlable">添加</a-button>
                </a-form-item>
              </div>
            </div>
          </div>
          <div v-show="current === 1">
            <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="课程图片">
              <div class="clearfix">
                <a-upload
                  :beforeUpload="beforeUpload"
                  :fileList="fileList"
                  :remove="handleRemove"
                  listType="picture-card"
                  v-decorator="['fileList']"
                >
                  <div v-if="fileList.length < 10">
                    <a-icon type="plus" />上传
                  </div>
                </a-upload>
                <a-modal :footer="null" :visible="previewVisible" @cancel="handleCancel">
                  <img :src="previewImage" alt="example" style="width: 100%" />
                </a-modal>
              </div>
            </a-form-item>
            <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="上传视频">
              <!-- <a-upload :previewFile="previewFile" listType="picture">
                <a-button>
                  <a-icon type="upload" />Upload
                </a-button>
              </a-upload>-->
              <a-upload
                :beforeUpload="handleChange"
                :fileList="defaultFileList"
                :remove="handleRemoves"
                v-decorator="['defaultFileList']"
              >
                <a-button v-if="defaultFileList.length < 1">
                  <a-icon type="upload" />上传视频
                </a-button>
              </a-upload>
            </a-form-item>
            <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="描述详情" v-show="false">
              <a-textarea
                :autosize="{ minRows: 6, maxRows: 16 }"
                placeholder="请输入描述详情"
                v-decorator="[
              'description',
              {initialValue: counted.description ,rules: [{ required: false, message: '请输入描述详情' }]}
            ]"
              />
            </a-form-item>
            <a-row>
              <a-col :span="5" class="ant-form-item-label">
                <label class for="description" title="描述详情">描述详情</label>
              </a-col>
              <a-col :span="17">
                <editor :catchData="catchData" :content="editorContent"></editor>
              </a-col>
            </a-row>
            <!-- <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" label="课程详情">
              <a-textarea
                :rows="4"
                placeholder="可详细描述本课程的使用规则、适用门店、使用时间等。可适当插入图片（富文本编辑器限制图片大小、参数、文字字数）"
                v-decorator="[
              'description',
              {rules: [{ required: false, message: 'Please input address' }]}
            ]"
              />
            </a-form-item>-->
          </div>
          <div v-show="current === 0">
            <a-form-item :wrapper-col="{ span: 12, offset: 10 }">
              <a-button @click="next()" type="primary">下一步</a-button>
              <a-button @click="back()" class="ml__16">取消</a-button>
            </a-form-item>
          </div>
          <div v-show="current === 1">
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button @click="prev">上一步</a-button>
              <a-button @click="finished($event)" class="submit" html-type="submit" type="primary">完成并启用</a-button>
            </a-form-item>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import Editor from './compoents/Editor'
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 }
}
export default {
  components: {
    Editor
  },
  watch: {
    // 'counted.calorie': function(newVal, oldVal) {
    //   const regex = /^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$/
    //   if (!regex.test(newVal)) {
    //     //如果小于等于零
    //     this.counted.calorie = oldVal //恢复原值
    //   }
    // }
  },
  data() {
    return {
      label: '',
      types: '',
      counted: {},
      skus: [{}],
      shops: [],
      tag: [],
      type: [],
      lable: [],
      selecttype: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      defaultFileList: [],
      current: 0,
      formLayout: 'horizontal',
      editorContent: '',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      newlable: '',
      fileLists: [],
      img_file_id: [],
      img_url: []
    }
  },
  methods: {
    list() {
      if (this.$route.query.id) {
        const id = this.$route.query.id
        this.$http.get(`/group_exercise/detail?id=${id}`).then(res => {
          this.counted = res.data
          this.skus = res.data.skus
          this.tag = res.data.tags
          this.editorContent = res.data.description
        })
      }
    },
    initIMGFile(data) {
      console.log(data.imgs)
      let _tmp = []
      let _tmp2 = data.imgs.map(item => {
        return {
          uid: item.img_file_id,
          name: item.img_url,
          status: 'done',
          url: item.img_url,
          file_store_id: item.file_store_id
        }
      })
      return _tmp.concat(_tmp2)
    },
    shopList() {
      this.$http.get(`/stores/list`).then(res => {
        this.shops = res.data
      })
    },
    typeList() {
      this.$http.get(`/group_exercise/type`).then(res => {
        this.type = res.data
      })
    },
    labelList() {
      this.$http.get(`/group_exercise/label`).then(res => {
        this.lable = res.data
      })
    },
    delect(index) {
      console.log(index)
      this.tag.splice(index, 1)
      console.log(this.counted.tags)
    },
    deleteType(index) {
      console.log(this.type[index].id)
      this.typeList()
    },
    selectLable(value) {
      console.log(value)
      this.newlable = value
    },
    addLible() {
      var text = ''
      for (let i = 0; i < this.tag.length; i++) {
        if (this.newlable === this.tag[i]) {
          this.$message.success('已有该标签', 1.5)
          return
        }
      }
      this.tag.push(this.newlable)
    },
    addType() {
      this.$http.post(`group_exercise/type?name=${this.types}`).then(res => {
        this.typeList()
      })
      console.log(this.types)
    },
    addRow() {
      this.skus.push({})
      console.log(this.counted.skus)
    },
    prev() {
      this.current = 0
    },
    catchData(param) {
      this.counted.description = param
      console.log(param)
    },
    back() {
      this.$router.push({
        name: 'curriculums'
      })
    },
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    next() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.current = 1
        }
      })
    },
    finished(e) {
      if (this.$route.query.id && !this.$route.query.copyid) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            for (let i = 0; i < this.fileList.length; i++) {
              this.fileList[i].img_file_id = this.fileList[i].uid
              this.fileList[i].img_url = this.fileList[i].url
            }
            const postData = {
              id: this.$route.query.id,
              name: values.name,
              type_id: values.category_id,
              calorie: values.calorie,
              skus: this.skus,
              tags: this.tag,
              imgs: this.fileList,
              description: this.counted.description,
              video_file_store_id: this.defaultFileList[0].uid,
              video_url: this.defaultFileList[0].url
            }
            console.log(postData)
            this.$http.put(`/group_exercise`, postData).then(res => {
              this.$message.success('新增课程成功', 1.5)
              setTimeout(this.back(), 1000)
            })
          }
        })
        return
      } else {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            for (let i = 0; i < this.fileList.length; i++) {
              this.fileList[i].img_file_id = this.fileList[i].uid
              this.fileList[i].img_url = this.fileList[i].url
            }
            const postData = {
              name: values.name,
              type_id: values.category_id,
              calorie: values.calorie,
              skus: this.skus,
              tags: this.tag,
              imgs: this.fileList,
              description: this.counted.description,
              video_file_store_id: this.defaultFileList[0].uid,
              video_url: this.defaultFileList[0].url
            }
            console.log(postData)
            this.$http.post(`/group_exercise`, postData).then(res => {
              this.$message.success('新增课程成功', 1.5)
              setTimeout(this.back(), 1000)
            })
          }
        })
      }
    },
    //上传图片
    beforeUpload(file) {
      const _file = file
      this.handleUpload(file).then(res => {
        if (res.status === 200) {
          _file.url = res.data.uri
          _file.uid = res.data.file_store_id
          this.fileList.unshift(_file)
        }
        // console.log(_file)
      })
      return false
    },
    handleUpload(imgData) {
      const formData = new FormData()
      formData.append('img', imgData)
      return this.$http.post('/files', formData)
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    //上传视频
    handleChange(file) {
      const video_file = file
      this.handleVideo(file).then(res => {
        if (res.status === 200) {
          video_file.url = res.data.uri
          video_file.uid = res.data.file_store_id
          this.defaultFileList.unshift(video_file)
        }
        console.log('hjhjk', this.defaultFileList)
      })
    },
    handleVideo(videoData) {
      const formData = new FormData()
      formData.append('img', videoData)
      return this.$http.post('/files', formData)
    },
    handleRemoves(file) {
      const index = this.defaultFileList.indexOf(file)
      const newFileList = this.defaultFileList.slice()
      newFileList.splice(index, 1)
      this.defaultFileList = newFileList
    }
  },
  created() {
    this.shopList()
    this.typeList()
    this.labelList()
    this.list()
    if (this.$route.query.id) {
      const id = this.$route.query.id
      this.$http.get(`/group_exercise/detail?id=${id}`).then(res => {
        const data = res.data
        this.fileList = this.initIMGFile(data)
        this.defaultFileList.push({
          uid: res.data.video_file_store_id.toString(),
          url: res.data.video_url,
          name: res.data.video_file_store_id.toString()
        })
        // this.defaultFileList = this.initVideo(data)
        // console.log(this.defaultFileList)
      })
    }
  },
  mounted() {}
}
</script>
<style lang="stylus" scoped>
.curriculums
  display flex
  width 100%
  height 100%
  padding 20px 40px

  .add
    padding 20px 40px
    width 100%
    height 100%
    background #ffffff

    .form__container
      // display flex
      // flex-direction column
      // justify-content center
      padding-top 30px

      .form__container--color
        margin-bottom 10px
        background #f2f2f2
        padding 20px 0

      .container__title
        display block
        text-align center
        font-weight bold
        font-size 20px
        margin 0 auto
        margin-bottom 30px

  .rongliang
    position absolute
    right -140px
    top -10px

  .addlable
    position absolute
    right -70px
    top -6px
    width 60px
    height 30px
    line-height 30px
    text-align center
    background #108ee9
    border-radius 6px
    color #ffffff

  .ant-form-item label
    margin-right 20px
    border-radius 6px

    .fork
      position absolute
      top -5px
      right -5px

  .submit
    margin-left 50%

  .ant-upload-select-picture-card i
    font-size 32px
    color #999

  .ant-upload-select-picture-card .ant-upload-text
    margin-top 8px
    color #666

  .ml__16
    margin-left 16px

  .container__table
    margin-left 80px
    width 80%

  .row__margin
    margin-top 24px
    border-bottom 1px solid #8a8a8a
    // height 50px

  .container__border
    padding-bottom 24px
    border-bottom 1px solid #8a8a8a

  .ant-col-4
    height 12px

  .container__addrow
    margin 24px 0

    .container__addrow--blue
      margin-left 10px
      color blue
      cursor pointer

  .container__label
    margin-left 20%
</style>
