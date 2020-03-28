<template>
  <div class="appoint-list">
    <div class="select">
      <div class="select-store">
        <a-select :size="size" @change="storeChange" defaultValue="allShop" style="width: 200px">
          <a-select-option value="allShop">全部门店</a-select-option>
          <a-select-option :key="index" :value="index" v-for="(item, index) in stores">{{item.name}}</a-select-option>
        </a-select>
      </div>
      <div class="select-date">
        <a-date-picker @change="onChange" format="YYYY-MM-DD" placeholder="请选择日期" />
      </div>
      <div class="search-room">
        <a-input-search @search="onSearch" placeholder="团课名称、授课老师、操房" style="width: 250px" />
      </div>
    </div>

    <div class="table-wrap">
      <a-table
        :columns="columns"
        :dataSource="appointList"
        :pagination="pagination"
        :rowKey="record => record.timetable_id"
        @change="pageChange"
      >
        <template slot="appoint" slot-scope="text, record">
          <div
            :class="record.state_of_book > 30 ? record.state_of_book > 80 ? 'red' : 'blue' : ''"
          >{{record.book_user_count}}人({{record.state_of_book}}%)</div>
        </template>
        <template slot="operate" slot-scope="text, record">
          <a @click="checkList(record)">查看名单</a>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import './list.styl'

const columns = [
  // {
  //   dataIndex: 'name',
  //   key: 'name',
  //   slots: { title: 'customTitle' },
  //   scopedSlots: { customRender: 'name' }
  // },
  {
    title: '课程名称',
    dataIndex: 'course_name',
    key: 'course_name',
    width: ''
  },
  {
    title: '授课教练',
    dataIndex: 'coach_name',
    key: 'coach_name',
    width: ''
  },
  {
    title: '操房',
    key: 'space_name',
    dataIndex: 'space_name',
    width: ''
  },
  {
    title: '授课门店',
    key: 'store_name',
    dataIndex: 'store_name',
    width: ''
  },
  {
    title: '授课时间',
    key: 'time',
    dataIndex: 'time',
    customRender: (text, record) => {
      const time = `${record.begin_time}~${record.end_time}`
      return time
    },
    width: ''
  },
  {
    title: '预约情况',
    key: 'appoint',
    dataIndex: 'appoint',
    // customRender: (text, record) => {
    //   const appoint = `${record.book_user_count}人(${record.state_of_book}%)`
    //   return appoint
    // },
    scopedSlots: { customRender: 'appoint' },
    width: ''
  },
  {
    title: '签到情况',
    key: 'sign',
    dataIndex: 'sign',
    customRender: (text, record) => {
      const sign = `${record.signed_user_count}人(${record.state_of_sign}%)`
      return sign
    },
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

export default {
  components: {},
  data() {
    return {
      size: 'default',
      stores: [],
      currentDate: new Date().getFullYear() + '-' + new Date().getMonth() + 1 + '-' + new Date().getDate(),
      appointList: [],
      columns,
      page: 1,
      pageSize: 10,
      storeId: '',
      seleDate: '',
      searchValue: '',
      pagination: {
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0, // 总数
        hideOnSinglePage: false, // 只有一页时是否隐藏分页器
        showQuickJumper: false, // 是否可以快速跳转至某页
        showSizeChanger: false, // 是否可以改变 pageSize
        pageSizeOptions: ['5', '10', '30'], // 指定每页可以显示多少条
        showTotal: total => `共 ${total}人` // 可以展示总数
      }
    }
  },
  computed: {},
  methods: {
    storeChange(value) {
      console.log(`Select: ${value}`)
      if (value === 'allShop') {
        this.storeId = ''
        this.getAppointList()
        return
      }
      this.storeId = this.stores[value].id
      console.log('选择了storeId为', this.storeId)
      this.getAppointList()
    },
    onChange(date, dateString) {
      console.log(date, dateString)
      this.seleDate = dateString
      this.getAppointList()
    },
    onSearch(value) {
      console.log(value)
      this.searchValue = value
      this.pagination.current = 1
      this.getAppointList()
    },
    pageChange(page) {
      this.pagination.current = page.current
      this.getAppointList()
    },
    moment,
    checkList(record) {
      this.$router.push({
        name: 'checkList',
        query: { timetable: record.timetable_id, beginDate: record.date }
      })
    },
    getStore() {
      this.$http
        .get('./stores/list')
        .then(res => {
          this.stores = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAppointList() {
      const data = {
        store_id: this.storeId,
        begin_date: this.seleDate,
        condition: this.searchValue,
        page: this.pagination.current,
        size: this.pageSize
      }
      this.$http
        .get('/group_exercise/book_list', { params: data })
        .then(res => {
          this.pagination.total = res.data.total
          this.appointList = res.data.items
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getStore()
    this.getAppointList()
  }
}
</script>

<style lang="stylus" scoped></style>