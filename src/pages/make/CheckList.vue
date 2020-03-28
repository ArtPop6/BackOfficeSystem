<template>
  <div class="list-wrapper">
    <div class="list-header">
      <div class="list-info">
        <div class="list-name margin-ten">{{courseName}}</div>
        <div class="coach-name margin-ten">{{coachName}}</div>
        <div class="list-time margin-ten">{{beginTime}}-{{endTime}}</div>
      </div>
      <div class="search-user">
        <a-input-search @search="onSearch" placeholder="用户昵称、手机号" style="width: 250px" />
      </div>
    </div>

    <div class="list-table">
      <a-table
        :columns="columns"
        :dataSource="appointDetail"
        :pagination="pagination"
        :rowKey="record => record.id"
        @change="pageChange"
      >
        <div slot="img" slot-scope="img, record">
          <div style="width:50px;float:left;">
            <a-avatar :src="record.img" icon="user" shape="square" size="large" style="border: 1px solid #ebebeb" />
          </div>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import './checklist.styl'
const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    scopedSlots: { customRender: 'img' }
  },
  {
    title: '用户昵称',
    dataIndex: 'nick_name',
    key: 'nick_name',
    width: ''
  },
  {
    title: '预约时间',
    dataIndex: 'book_time',
    key: 'book_time',
    width: ''
  },
  {
    title: '签到时间',
    key: 'sign_time',
    dataIndex: 'sign_time',
    width: ''
  }
]

export default {
  data() {
    return {
      columns,
      appointDetail: [],
      page: 1,
      size: 10,
      courseName: '',
      coachName: '',
      beginTime: '',
      endTime: '',
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
  methods: {
    onSearch(value) {
      console.log(value)
      this.searchValue = value
      this.pagination.current = 1
      this.getAppointDetail()
    },
    pageChange(page) {
      this.pagination.current = page.current
      this.getAppointList()
    },
    getAppointDetail() {
      const data = {
        timetable_id: this.$route.query.timetable,
        begin_date: this.$route.query.beginDate,
        condition: this.searchValue,
        page: this.pagination.current,
        size: this.size
      }
      this.$http
        .get('./group_exercise/book_detail', { params: data })
        .then(res => {
          this.appointDetail = res.data.users
          this.courseName = res.data.course_name
          this.coachName = res.data.coach_name
          this.beginTime = res.data.begin_time
          this.endTime = res.data.end_time
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getAppointDetail()
  }
}
</script>