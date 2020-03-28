<template>
  <div class="curriculums">
    <div class="nav">
      <a-select @change="handleChange" class="nav__select" defaultValue="全部操房" style="width: 220px">
        <a-select-option :value="room">{{room}}</a-select-option>
        <a-select-option :key="index" :value="list.id" v-for="(list,index) in listdata">{{list.name}}</a-select-option>
      </a-select>
      <a-input-search @search="onSearch" class="nav__search" placeholder="请输入操房名称" style="width: 260px" />
      <a-button @click="add" class="nva__add" style="width:100px" type="primary">新建操房</a-button>
    </div>
    <div class="table">
      <a-table
        :columns="columns"
        :dataSource="spacedata"
        :pagination="pagination"
        :rowKey="record => record.space_id"
        @change="handleTableChange"
      >
        <span slot="state" slot-scope="state">
          <a-tag class="blue" v-if="state">已启用</a-tag>
          <a-tag v-if="!state">已禁用</a-tag>
        </span>
        <a slot="operation" slot-scope="text, record">
          <a @click="compile(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="start(record)" v-if="record.state">禁用</a>
          <a @click="start(record)" v-if="!record.state">启用</a>
        </a>
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '操房名称',
    dataIndex: 'name',
    key: 'name',
    width: '15%'
    // scopedSlots: { customRender: 'name' }
  },
  {
    title: '所属门店',
    dataIndex: 'store_name',
    key: 'store_name',
    width: '15%'
  },
  {
    title: '操房面积',
    dataIndex: 'area',
    key: 'area',
    width: '15%'
  },
  {
    title: '容纳人数',
    dataIndex: 'capacity',
    key: 'capacity',
    width: '15%'
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state' },
    width: '15%'
  },
  {
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: '25%'
  }
]
export default {
  components: {},
  data() {
    return {
      room: '全部操房',
      spacedata: [],
      listdata: [],
      columns,
      statuecolor: false,
      storeid: '',
      names: '',
      states: '',
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
      const getData = {
        store_id: this.storeid,
        name: this.names,
        page: '1',
        size: '10'
      }
      this.$http.get(`/space`, { params: getData }).then(res => {
        this.spacedata = res.data.items
        this.pagination.total = res.data.total
      })
    },
    //选择门店
    handleChange(value) {
      if (value == '全部操房') {
        this.storeid = ''
        this.list()
      } else {
        this.storeid = value
        this.list()
      }
      console.log(value)
    },
    //搜索操房
    onSearch(value) {
      this.names = value
      this.list()
    },
    add() {
      this.$router.push({
        name: 'operaAdd'
      })
    },
    compile() {
      this.$router.push({
        name: 'operaAdd',
        query: {
          id: 1
        }
      })
    },
    //启用、禁用
    start(record) {
      if (record.state) {
        this.states = false
      } else {
        this.states = true
      }
      const startdata = {
        space_id: record.space_id,
        space_state: this.states
      }
      this.$http.put(`/space/state`, { params: startdata }).then(res => {
        this.list()
        if (record.state) {
          this.$message.success('禁用成功', 1.5)
        } else {
          this.$message.success('启用成功', 1.5)
        }
      })
      console.log(startdata)
    },
    //编辑
    compile(record) {
      this.$router.push({
        name: 'operaAdd',
        query: {
          spaceid: record.space_id
        }
      })
      console.log(record.space_id)
    },
    handleTableChange(page) {
      this.pagination.current = page.current
      const getData = {
        store_id: this.storeid,
        name: this.names,
        page: page.current,
        size: '10'
      }
      this.$http.get(`/space`, { params: getData }).then(res => {
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

    .nav__select
      margin-left 20px

    .nav__search
      margin-left 60px

    .nva__add
      margin 0 140px 0 500px

  .table
    width 100%
    height 710px
    background #ffffff

  .relue
    color #1890ff

  .blue
    background rgb(24, 144, 255)
    color #fff
</style>