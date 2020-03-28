<template>
  <div class="pack-list">
    <div class="select">
      <a-button @click="addPack()" type="primary">新建课包</a-button>
    </div>

    <div class="table-wrap">
      <a-table
        :columns="columns"
        :dataSource="packList"
        :pagination="pagination"
        :rowKey="record => record.course_package_id"
        @change="pageChange"
      >
        <template slot="state" slot-scope="text, record">
          <!-- onChange($checked, $event, record.package_id) -->
          <a-switch
            :defaultChecked="record.status"
            @change="value => onChange(value, record.package_id)"
            checkedChildren="点击禁用"
            size="large"
            unCheckedChildren="点击启用"
          />
        </template>
        <template slot="operate" slot-scope="text, record">
          <a @click="edit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="checkList(record)">销量详情</a>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import './pack.stylus'

const columns = [
  {
    title: '课包名称',
    dataIndex: 'course_package_name',
    key: 'course_package_name',
    width: ''
  },
  {
    title: '内含课程数',
    dataIndex: 'course_count',
    key: 'course_count',
    width: ''
  },
  {
    title: '原价/节',
    key: 'original_price',
    dataIndex: 'original_price',
    width: ''
  },
  {
    title: '课包价/节',
    key: 'current_price',
    dataIndex: 'current_price',
    width: ''
  },
  {
    title: '使用期限',
    key: 'time_limited',
    dataIndex: 'time_limited',
    width: ''
  },
  {
    title: '库存',
    key: 'stock',
    dataIndex: 'stock',
    width: ''
  },
  {
    title: '累计销量',
    key: 'saled',
    dataIndex: 'saled',
    width: ''
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state' },
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
      currentDate: new Date().getFullYear() + '-' + new Date().getMonth() + 1 + '-' + new Date().getDate(),
      columns,
      packList: [],
      page: 1,
      size: 10,
      loading: [],
      pagination: {
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0, // 总数
        hideOnSinglePage: false, // 只有一页时是否隐藏分页器
        showQuickJumper: false, // 是否可以快速跳转至某页
        showSizeChanger: false, // 是否可以改变 pageSize
        pageSizeOptions: ['5', '10', '30'], // 指定每页可以显示多少条
        showTotal: total => `总数: ${total}` // 可以展示总数
      }
    }
  },
  computed: {},
  methods: {
    checkList(record) {
      console.log('哈哈哈', record)
      this.$router.push({
        name: 'packDetail',
        query: { id: record.key }
      })
    },
    edit(record) {
      this.$router.push({
        name: 'addPack',
        query: { pack_id: record.course_package_id }
      })
    },
    addPack() {
      this.$router.push({
        name: 'addPack'
      })
    },
    pageChange(page) {
      this.pagination.current = page.current
      this.getPackList()
    },
    // 启用禁用事件
    onChange(checked, id) {
      console.log(`a-switch to ${checked}`)
      console.log('课包id', id)
      this.$http
        .put(`./coursePackage/status?package_id=${id}`)
        .then(res => {
          console.log('状态切换成功')
          this.getPackList()
          if (checked) {
            this.$message.success('课包已启用', 0.3)
            return
          }
          this.$message.success('课包已禁用', 0.3)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getPackList() {
      const data = {
        page: this.pagination.current,
        size: this.size
      }
      this.$http
        .get('./coursePackage', { params: data })
        .then(res => {
          this.pagination.total = res.data.total
          this.packList = res.data.items
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getPackList()
  }
}
</script>

<style lang="stylus" scoped></style>