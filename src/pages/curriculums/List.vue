<template>
  <div class="curriculums">
    <div class="nav">
      <a-select @change="handleChange" class="nav__sele" defaultValue="全部门店" style="width: 220px">
        <a-select-option :value="allshop">{{allshop}}</a-select-option>
        <a-select-option :key="index" :value="list.id" v-for="(list,index) in listdata">{{list.name}}</a-select-option>
      </a-select>
      <a-select @change="typeChange" class="nav__select" defaultValue="全部课程" style="width: 220px">
        <a-select-option :value="allclass">{{allclass}}</a-select-option>
        <a-select-option :key="index" :value="type.category_id" v-for="(type,index) in typedata">{{type.category_name}}</a-select-option>
      </a-select>
      <a-input-search @search="onSearch" class="nav__select" placeholder="请输入课程名称" style="width: 260px" />
      <a-button @click="add" class="nva__add" style="width:100px" type="primary">新建课程</a-button>
    </div>
    <div class="table">
      <a-table
        :columns="columns"
        :dataSource="groups"
        :pagination="pagination"
        :rowKey="record => record.id"
        @change="handleTableChange"
      >
        <span slot="course_state" slot-scope="course_state">
          <!-- <a-tag :color="course_state ? '#1890ff' : ''">{{course_state}}</a-tag> -->
          <a-tag class="blue" v-if="course_state">已启用</a-tag>
          <a-tag v-if="!course_state">已禁用</a-tag>
        </span>
        <span slot="operation" slot-scope="text, record">
          <a @click="compile(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="start(record)" v-if="record.course_state">禁用</a>
          <a @click="start(record)" v-if="!record.course_state">启用</a>
          <a-divider type="vertical" />
          <a @click="copy(record)">复制</a>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '课程名称',
    dataIndex: 'course_name',
    key: 'course_name',
    width: '40%'
  },
  {
    title: '授课门店',
    dataIndex: 'store_name',
    key: 'store_name',
    width: '15%'
  },
  {
    title: '状态',
    key: 'course_state',
    dataIndex: 'course_state',
    scopedSlots: { customRender: 'course_state' },
    width: '15%'
  },
  {
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: '30%'
  }
]
export default {
  components: {},
  data() {
    return {
      allshop: '全部门店',
      allclass: '全部课程',
      groups: [],
      columns,
      listdata: [],
      typedata: [],
      storeid: '',
      categoryid: '',
      coursename: '',
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
        showTotal: total => `共有： ${total} 条`
      }
    }
  },
  computed: {},
  methods: {
    list() {
      const groupdata = {
        store_id: this.storeid,
        category_id: this.categoryid,
        course_name: this.coursename,
        page: 1,
        size: 10
      }
      this.$http.get(`/group_exercise/list`, { params: groupdata }).then(res => {
        this.groups = res.data.items
        this.pagination.total = res.data.total
      })
    },
    shoplist() {
      this.$http.get(`/stores/list`).then(res => {
        this.listdata = res.data
      })
    },
    typelist() {
      this.$http.get(`/group_exercise/type`).then(res => {
        this.typedata = res.data
      })
    },
    //选择门店
    handleChange(value) {
      if (value == '全部门店') {
        this.storeid = ''
        this.list()
      } else {
        this.storeid = value
        this.list()
      }
    },
    //选择类型
    typeChange(value) {
      if (value == '全部课程') {
        this.categoryid = ''
        this.list()
      } else {
        this.categoryid = value
        this.list()
      }
    },
    //课程搜索
    onSearch(value) {
      this.coursename = value
      this.list()
    },
    //编辑
    compile(record) {
      console.log(record.id)
      this.$router.push({
        name: 'courseAdd',
        query: {
          id: record.id
        }
      })
    },
    copy(record) {
      this.$router.push({
        name: 'courseAdd',
        query: {
          id: record.id,
          copyid: 1
        }
      })
    },
    //启用禁用
    start(record) {
      if (record.course_state) {
        this.state = false
      } else {
        this.state = true
      }
      const startdata = {
        id: record.id,
        course_state: this.state
      }
      this.$http.put(`/group_exercise/state`, { params: startdata }).then(res => {
        this.list()
        if (record.course_state) {
          this.$message.success('禁用成功', 1.5)
        } else {
          this.$message.success('启用成功', 1.5)
        }
      })
    },
    //分页
    handleTableChange(page) {
      this.pagination.current = page.current
      const groupdata = {
        store_id: this.storeid,
        category_id: this.categoryid,
        course_name: this.coursename,
        page: page.current,
        size: 10
      }
      this.$http.get(`/group_exercise/list`, { params: groupdata }).then(res => {
        this.groups = res.data.items
        this.pagination.total = res.data.total
      })
    },
    add() {
      this.$router.push({
        name: 'courseAdd'
      })
    }
  },
  created() {
    this.list()
    this.shoplist()
    this.typelist()
  }
}
</script>

<style lang="stylus" scoped>
.curriculums
  display flex
  flex-direction column
  width 100%
  height 100%
  padding 20px 40px

  .nav
    display flex
    align-items center
    width 100%
    height 60px
    background #ffffff

    .nav__sele
      margin-left 40px

    .nav__select
      margin-left 60px

    .nva__add
      margin 0 140px 0 400px

  .table
    width 100%
    height 710px
    background #ffffff

  .blue
    background rgb(24, 144, 255)
    color #fff

.ant-pagination
  margin 16px 20px !important
</style>