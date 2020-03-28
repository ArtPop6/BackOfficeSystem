<template>
  <div class="pack-detail">
    <div class="table">
      <a-table :columns="columns" :dataSource="spacedata" :pagination="pagination" @change="handleTableChange">
        <img :src="user_avatar" class="avatar" slot="user_avatar" slot-scope="user_avatar" />
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '用户头像',
    dataIndex: 'user_avatar',
    key: 'user_avatar',
    width: '15%',
    scopedSlots: { customRender: 'user_avatar' }
  },
  {
    title: '用户昵称',
    dataIndex: 'user_name',
    key: 'user_name',
    width: '15%'
  },
  {
    title: '电话',
    dataIndex: 'user_phone',
    key: 'user_phone',
    width: '15%'
  },
  {
    title: '课包到期时间',
    dataIndex: 'end_time',
    key: 'end_time',
    width: '20%'
  },
  {
    title: '购买份数',
    key: 'buy_count',
    dataIndex: 'buy_count',
    // scopedSlots: { customRender: 'buy_count' },
    width: '10%'
  },
  {
    title: '已消耗数',
    dataIndex: 'used',
    key: 'used',
    width: '10%'
  },
  {
    title: '待消耗数',
    dataIndex: 'res',
    key: 'res',
    width: '10%'
  }
]
export default {
  data() {
    return {
      columns,
      spacedata: [],
      // current: 1,
      // page: 1,
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
        showTotal: total => `共有： ${total} 条`
      }
    }
  },
  methods: {
    list() {
      const spacedata = {
        course_package_id: this.$route.query.id,
        page: 1,
        size: 10
      }
      this.$http.get(`/coursePackage/saled`, { params: spacedata }).then(res => {
        this.spacedata = res.data.items
        this.pagination.total = res.data.total
      })
    },
    handleTableChange(page) {
      this.pagination.current = page.current
      const spacedata = {
        course_package_id: this.$route.query.id,
        page: page.current,
        size: 10
      }
      this.$http.get(`/coursePackage/saled`, { params: spacedata }).then(res => {
        this.spacedata = res.data.items
        this.pagination.total = res.data.total
      })
    }
  },
  created() {
    this.list()
  }
}
</script>

<style lang="stylus">
.table
  width 100%
  height 710px
  background #ffffff

.avatar
  width 40px
  height 40px
  border-radius 100%
</style>