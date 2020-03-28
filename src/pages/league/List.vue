<template>
  <div class="appoint-list">
    <AddTable :tableVisible="tableVisible" @modalVisible="getModalVisible()" />
    <div class="select">
      <div class="select-store-date">
        <div class="select-store">
          <!-- <a-range-picker
            :placeholder="['Start Time', 'End Time']"
            :showTime="{ format: 'HH:mm' }"
            @change="onChange"
            @ok="onOk"
            format="YYYY-MM-DD HH:mm"
          />-->
          <a-select :size="seleSize" @change="storeChange" defaultValue="allshop" style="width: 200px">
            <a-select-option value="allshop">全部门店</a-select-option>
            <a-select-option :key="index" :value="index" v-for="(item, index) in stores">{{item.name}}</a-select-option>
          </a-select>
        </div>
        <div class="select-date">
          <!-- :defaultValue="moment(currentDate, 'YYYY-MM-DD')" -->
          <!-- :disabledDate="disabledDate" -->
          <!-- <a-month-picker @change="monthChange" placeholder="请选择月份" style="width: 200px" /> -->
          <a-week-picker @change="weekChange" placeholder="请选择周" style="width: 210px">
            <a-icon slot="suffixIcon" type="calendar" />
          </a-week-picker>
        </div>
      </div>

      <a-button @click="addClassTable()" type="primary">新建课表</a-button>
      <!-- <a-button @click="editTest()" type="primary">测试编辑</a-button> -->
    </div>

    <div class="table-wrap">
      <a-table
        :columns="columns"
        :dataSource="classList"
        :pagination="pagination"
        :rowKey="record => record.calender_id"
        @change="pageChange"
      >
        <template slot="operate" slot-scope="text, record">
          <a @click="edit(record)">编辑</a>
          <!-- <a-divider type="vertical" />
          <a @click="start(record)">复制</a>-->
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '含课数量',
    dataIndex: 'course_count',
    key: 'course_count',
    width: ''
  },
  {
    title: '课程周期',
    dataIndex: 'month',
    customRender: (text, record) => {
      const time = `${record.begin_date}至${record.end_date}`
      return time
    },
    key: 'month',
    width: ''
  },
  {
    title: '周数',
    key: 'weekOfYear',
    customRender: (text, record) => {
      const time = `${record.year}年第${record.week}周`
      return time
    },
    dataIndex: 'weekOfYear',
    width: ''
  },
  {
    title: '授课门店',
    key: 'store_name',
    dataIndex: 'store_name',
    width: ''
  },
  {
    title: '操作',
    key: 'operate',
    dataIndex: 'operate',
    width: '',
    scopedSlots: { customRender: 'operate' }
  }
]

import moment from 'moment'
import AddTable from './component/AddTable'

export default {
  components: {
    AddTable
  },
  data() {
    return {
      seleSize: 'default',
      currentDate: new Date().getFullYear() + '-' + new Date().getMonth() + 1 + '-' + new Date().getDate(),
      classList: [],
      beginDate: '',
      endDate: '',
      stores: [],
      columns,
      seleMonth: '',
      seleWeek: '',
      storeId: null,
      page: 1,
      size: 10,
      title: '新增课表',
      maskClosable: false,
      tableVisible: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      configStore: {
        initialValue: '',
        rules: [{ required: true, message: '请选择门店' }]
      },
      configMonth: {
        initialValue: undefined,
        rules: [{ required: true, message: '请选择月份' }]
      },
      monthValue: '',
      pagination: {
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0, // 总数
        hideOnSinglePage: false, // 只有一页时是否隐藏分页器
        showQuickJumper: false, // 是否可以快速跳转至某页
        showSizeChanger: false, // 是否可以改变 pageSize
        pageSizeOptions: ['5', '10', '30'], // 指定每页可以显示多少条
        showTotal: total => `共 ${total}张` // 可以展示总数
      }
    }
  },
  computed: {},
  methods: {
    moment,
    storeChange(value) {
      if (value === 'allshop') {
        this.storeId = null
        console.log(this.storeId)
        this.getClassList()
        this.pagination.current = 1
        return
      }
      this.storeId = this.stores[value].id
      this.getClassList()
      this.pagination.current = 1
    },
    pageChange(page) {
      this.pagination.current = page.current
      this.getClassList()
    },
    edit(record) {
      console.log('哈哈哈', record)
      this.$router.push({
        name: 'editClass',
        query: {
          calenderId: record.calender_id,
          storeId: record.store_id,
          beginDate: record.begin_date,
          endDate: record.end_date
        }
      })
    },
    addPack() {
      this.$router.push({
        name: 'addPack'
      })
    },
    // 时间选择器
    onChange(time, timeString) {
      console.log(time, timeString)
    },
    // onOk(value) {
    //   console.log('onOk: ', value)
    // },
    addClassTable() {
      this.tableVisible = true
    },
    disabledBeforeDate(current) {
      return current && current < moment().endOf('day')
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().endOf('day')
    },
    getClassList() {
      // if (this.seleMonth !== '') {
      //   this.beginDate = this.seleMonth + '-01'
      //   this.endDate =
      //     this.seleMonth +
      //     '-' +
      //     new Date(this.seleMonth.substring(0, 3), this.seleMonth.substring(5), 0).getDate().toString()
      // } else if (this.seleMonth === '') {
      //   this.beginDate = ''
      //   this.endDate = ''
      // }
      const data = {
        store_id: this.storeId,
        // begin_date: this.beginDate,
        // end_date: this.endDate,
        // week: this.seleWeek,ing
        year: this.seleWeek.substring(0, 4),
        week: this.seleWeek.substring(5),
        page: this.pagination.current,
        size: this.size
      }
      console.log('周', data.week)
      this.$http
        .get('./group_exercise/calender_list', { params: data })
        .then(res => {
          this.classList = res.data.items
          this.pagination.total = res.data.total
        })
        .catch(err => {
          console.log(err)
        })
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
    // monthChange(date, dateString) {
    //   console.log('月份变化', date, dateString)
    //   this.seleMonth = dateString
    //   this.getClassList()
    //   this.pagination.current = 1
    // },
    weekChange(date, dateString) {
      console.log(date, dateString)
      this.seleWeek = dateString.substring(0, dateString.length - 1)
      this.getClassList()
      this.pagination.current = 1
      console.log('选中周', this.seleWeek)
    },
    onCancel(e) {
      this.visible = false
    },
    getModalVisible(visible) {
      this.tableVisible = visible
    },
    editTest() {
      this.$router.push({
        name: 'editClass',
        query: { calenderId: 1, storeId: 12, month: '2020-01' }
      })
    }
  },
  created() {
    this.getClassList()
    this.getStoreList()
  }
}
</script>

<style lang="stylus">
.add-table-modal
  .ant-modal-content
    // width 500px
    height auto
    border 0
    border-radius 5px

    .ant-modal-body
      // height 300px
      width 100%

.appoint-list
  padding 15px
  overflow hidden

  .select
    height 65px
    display flex
    align-items center
    padding 0 38px
    background #fff
    box-shadow -2px 3px 10px #d4d4d4
    margin-bottom 16px
    justify-content space-between

    .select-store-date
      display flex

      .select-store
        margin-right 30px

    .ant-btn
      padding 0 30px
      display flex
      align-items center

  .table-wrap
    background #fff
    box-shadow -2px 3px 10px #d4d4d4
    min-height 740px

    .ant-table-pagination.ant-pagination
      margin 16px 16px
</style>