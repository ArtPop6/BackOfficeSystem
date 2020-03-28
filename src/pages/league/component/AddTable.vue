<template>
  <a-modal
    :maskClosable="maskClosable"
    :title="title"
    @cancel="onCancel"
    @ok="handleOk"
    cancelText="取消"
    okText="确认"
    v-model="visible"
    wrapClassName="add-table-modal"
  >
    <a-form :form="form">
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" label="门店">
        <a-select
          :size="seleSize"
          @change="seleStore"
          placeholder="请选择门店"
          style="width: 300px"
          v-decorator="['store', configStore]"
        >
          <a-select-option :key="index" :value="index" placeholder="请选择门店" v-for="(item, index) in stores">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" label="选择周">
        <!-- <a-month-picker
          :disabledDate="disabledBeforeDate"
          @change="formMonthChange"
          placeholder="请选择月份"
          style="width: 300px"
          v-decorator="['month', configMonth]"
        />-->
        <a-week-picker
          @change="formWeekChange"
          placeholder="请选择周"
          style="width: 210px"
          v-decorator="['week', configWeek]"
        >
          <a-icon slot="suffixIcon" type="calendar" />
        </a-week-picker>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import moment from 'moment'

export default {
  props: ['tableVisible'],
  data() {
    return {
      visible: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      configStore: {
        initialValue: undefined,
        rules: [{ required: true, message: '请选择门店' }]
      },
      configWeek: {
        initialValue: undefined,
        rules: [{ required: true, message: '请选择月份' }]
      },
      maskClosable: false,
      title: '新建课表',
      seleSize: 'default',
      stores: [],
      storeId: undefined,
      seleMonth: undefined,
      seleWeek: ''
    }
  },
  watch: {
    tableVisible(newVal, oldVal) {
      this.visible = newVal
    }
  },
  methods: {
    moment,
    seleStore(value) {
      this.storeId = this.stores[value].id
      console.log(value)
    },
    getStoreList() {
      this.$http
        .get('./stores/list')
        .then(res => {
          this.stores = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    disabledBeforeDate(current) {
      return current < moment().startOf('day')
    },
    formMonthChange(date, dateString) {
      console.log(dateString)
      this.seleMonth = dateString
    },
    formWeekChange(date, dateString) {
      this.seleWeek = dateString.substring(0, dateString.length - 1)
      console.log(this.seleWeek)
    },
    onCancel(e) {
      this.visible = false
      this.$emit('modalVisible', this.visible)
    },
    handleOk(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          // 新建课表接口
          const data = {
            store_id: this.storeId,
            year: this.seleWeek.substring(0, 4) - 0,
            week: this.seleWeek.substring(5) - 0
            // begin_date: this.seleMonth + '-01',
            // end_date: moment(this.seleMonth)
            //   .endOf('month')
            //   .format('YYYY-MM-DD')
            // end_date:
            //   this.seleMonth +
            //   '-' +
            //   new Date(this.seleMonth.substring(0, 3), this.seleMonth.substring(5), 0).getDate().toString()
          }
          this.$http
            .post('./group_exercise/calender', data)
            .then(res => {
              console.log('calender_id', res.data)
              this.$router.push({
                name: 'editClass',
                query: {
                  calenderId: res.data,
                  // beginDate: data.begin_date,
                  // endDate: data.end_date,
                  week: data.week,
                  storeId: this.storeId
                }
              })
            })
            .catch(err => {
              console.log(err)
            })
          this.visible = false
          this.$emit('modalVisible', this.visible)
        }
      })
    }
  },
  created() {
    this.getStoreList()
  }
}
</script>

<style lang="stylus" scoped>
.add-class-modal
  .ant-modal-content
    width 600px
    height auto
    border 0
    border-radius 5px
    background-clip padding-box
    box-shadow 0 0 0 rgba(0, 0, 0, 0)

    .ant-modal-body
      height 300px
      width 100%
</style>