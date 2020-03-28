<template>
  <div class="class-table">
    <AddClass
      :beginDate="classInfo.begin_date"
      :calender="calenderId"
      :classVisible="classVisible"
      :storeId="storeId"
      :typeId="typeId"
      :week="week"
      @getVisible="getVisible(visible)"
      @modalVisible="getModalVisible(visible)"
    />

    <div class="tab-header">
      <div class="desc__wrap">
        <a-icon theme="filled" type="shop" />
        <div class="store table-desc">{{classInfo.store_name}}</div>
        <a-icon theme="filled" type="calendar" />
        <div class="month table-desc">{{classInfo.begin_date + '~' + classInfo.end_date}}</div>
      </div>
      <!-- <a-button class="save-button" type="primary">保存</a-button> -->
    </div>

    <div class="table-wrapper">
      <!-- <div class="week-header">
        <div :key="index" class="week-header__title" v-for="(item, index) in weeks">{{item}}</div>
      </div>-->
      <a-row class="week-header">
        <a-col :span="3"></a-col>
        <a-col :key="index" :span="3" class="week-header__title" v-for="(item, index) in weeks">{{item}}</a-col>
      </a-row>
      <div class="scroll-class">
        <a-row :key="index" class="class-wrapper" justify="center" v-for="(item, index) in classInfo.course_types">
          <!-- 课程类型名 -->
          <a-col :span="3" class="class-type">{{item.course_type_name}}</a-col>
          <!-- 课程类型对应各个星期的课程数 -->
          <!-- 星期一 -->
          <a-col :span="3" class="class-grid">
            <div :key="indexs" class="single-class" v-for="(lesson, indexs) in item.week[0].items">
              <div class="name-coach">
                <div class="single-class__name">{{lesson.course_name}}</div>
                <div class="single-class__coach">{{lesson.coach_name}}</div>
              </div>
              <div class="time-room">
                <div class="single-class__room">{{lesson.space_name}}</div>
                <div class="single-class__time">{{lesson.begin_time + '-' + lesson.end_time}}</div>
              </div>
              <a-icon @click="deleClass(lesson.timetable_id)" theme="filled" type="close-circle" />
            </div>
            <div @click="addClass(item.course_type_id, 1)" class="add-class">添加课程</div>
          </a-col>
          <!-- 星期二 -->
          <a-col :span="3" class="class-grid">
            <div :key="indexs" class="single-class" v-for="(lesson, indexs) in item.week[1].items">
              <div class="name-coach">
                <div class="single-class__name">{{lesson.course_name}}</div>
                <div class="single-class__coach">{{lesson.coach_name}}</div>
              </div>
              <div class="time-room">
                <div class="single-class__room">{{lesson.space_name}}</div>
                <div class="single-class__time">{{lesson.begin_time + '-' + lesson.end_time}}</div>
              </div>
              <a-icon @click="deleClass(lesson.timetable_id)" theme="filled" type="close-circle" />
            </div>
            <div @click="addClass(item.course_type_id, 2)" class="add-class">添加课程</div>
          </a-col>
          <!-- 星期三 -->
          <a-col :span="3" class="class-grid">
            <div :key="indexs" class="single-class" v-for="(lesson, indexs) in item.week[2].items">
              <div class="name-coach">
                <div class="single-class__name">{{lesson.course_name}}</div>
                <div class="single-class__coach">{{lesson.coach_name}}</div>
              </div>
              <div class="time-room">
                <div class="single-class__room">{{lesson.space_name}}</div>
                <div class="single-class__time">{{lesson.begin_time + '-' + lesson.end_time}}</div>
              </div>
              <a-icon @click="deleClass(lesson.timetable_id)" theme="filled" type="close-circle" />
            </div>
            <div @click="addClass(item.course_type_id, 3)" class="add-class">添加课程</div>
          </a-col>
          <!-- 星期四 -->
          <a-col :span="3" class="class-grid">
            <div :key="indexs" class="single-class" v-for="(lesson, indexs) in item.week[3].items">
              <div class="name-coach">
                <div class="single-class__name">{{lesson.course_name}}</div>
                <div class="single-class__coach">{{lesson.coach_name}}</div>
              </div>
              <div class="time-room">
                <div class="single-class__room">{{lesson.space_name}}</div>
                <div class="single-class__time">{{lesson.begin_time + '-' + lesson.end_time}}</div>
              </div>
              <a-icon @click="deleClass(lesson.timetable_id)" theme="filled" type="close-circle" />
            </div>
            <div @click="addClass(item.course_type_id, 4)" class="add-class">添加课程</div>
          </a-col>
          <!-- 星期五 -->
          <a-col :span="3" class="class-grid">
            <div :key="indexs" class="single-class" v-for="(lesson, indexs) in item.week[4].items">
              <div class="name-coach">
                <div class="single-class__name">{{lesson.course_name}}</div>
                <div class="single-class__coach">{{lesson.coach_name}}</div>
              </div>
              <div class="time-room">
                <div class="single-class__room">{{lesson.space_name}}</div>
                <div class="single-class__time">{{lesson.begin_time + '-' + lesson.end_time}}</div>
              </div>
              <a-icon @click="deleClass(lesson.timetable_id)" theme="filled" type="close-circle" />
            </div>
            <div @click="addClass(item.course_type_id, 5)" class="add-class">添加课程</div>
          </a-col>
          <!-- 星期六 -->
          <a-col :span="3" class="class-grid">
            <div :key="indexs" class="single-class" v-for="(lesson, indexs) in item.week[5].items">
              <div class="name-coach">
                <div class="single-class__name">{{lesson.course_name}}</div>
                <div class="single-class__coach">{{lesson.coach_name}}</div>
              </div>
              <div class="time-room">
                <div class="single-class__room">{{lesson.space_name}}</div>
                <div class="single-class__time">{{lesson.begin_time + '-' + lesson.end_time}}</div>
              </div>
              <a-icon @click="deleClass(lesson.timetable_id)" theme="filled" type="close-circle" />
            </div>
            <div @click="addClass(item.course_type_id, 6)" class="add-class">添加课程</div>
          </a-col>
          <!-- 星期日 -->
          <a-col :span="3" class="class-grid">
            <div :key="indexs" class="single-class" v-for="(lesson, indexs) in item.week[6].items">
              <div class="name-coach">
                <div class="single-class__name">{{lesson.course_name}}</div>
                <div class="single-class__coach">{{lesson.coach_name}}</div>
              </div>
              <div class="time-room">
                <div class="single-class__room">{{lesson.space_name}}</div>
                <div class="single-class__time">{{lesson.begin_time + '-' + lesson.end_time}}</div>
              </div>
              <a-icon @click="deleClass(lesson.timetable_id)" theme="filled" type="close-circle" />
            </div>
            <div @click="addClass(item.course_type_id, 7)" class="add-class">添加课程</div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import './edit.styl'
import AddClass from './component/AddClass'
import moment from 'moment'

export default {
  components: {
    AddClass
  },
  data() {
    return {
      weeks: ['MON 星期一', 'TUE 星期二', 'WED 星期三', 'THU 星期四', 'FRI 星期五', 'SAT 星期六', 'SUN 星期日'],
      tableShow: false,
      loading: false,
      classInfo: [],
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      classVisible: false,
      calenderId: this.$route.query.calenderId,
      storeId: this.$route.query.storeId,
      // month: this.$route.query.month,
      seleWeek: this.$route.query.week, // 选择的周数
      beginDate: this.$route.query.beginDate,
      endDate: this.$route.query.endDate,
      typeId: '',
      week: '', // 星期几
      timeTableId: ''
    }
  },
  computed: {},
  methods: {
    moment,
    getClassTable() {
      const data = {
        calender_id: this.calenderId
        // store_id: this.storeId,
        // month: this.month
        // begin_date: this.beginDate,
        // begin_date: '2020-01-01',
        // end_date: this.endDate
        // end_date: moment(this.month)
        //   .endOf('month')
        //   .format('YYYY-MM-DD')
        // this.month + '-' + new Date(this.month.substring(0, 3), this.month.substring(5), 0).getDate().toString()
      }
      this.$http
        .get('./group_exercise/calender_detail', { params: data })
        .then(res => {
          this.classInfo = res.data
          // this.calenderId = res.data.calender_id
          console.log(this.classInfo)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleClass(timetable) {
      this.timeTableId = timetable
      const that = this
      this.$confirm({
        content: '确认删除该课程？',
        okText: '确认',
        cancelText: '取消',
        class: 'dele-modal',
        // class: 'dele-class',
        onOk() {
          return new Promise((resolve, reject) => {
            that.$http
              .delete(`./group_exercise/timetable?timetable_id=${that.timeTableId}`)
              .then(res => {
                that.$message.success('删除课程成功')
                that.getClassTable()
                resolve()
              })
              .catch(err => {
                that.$message.error('删除失败')
                console.log(err)
              })
          }).catch(() => console.log('Oops errors!'))
        }
      })
    },
    addClass(type, week) {
      this.classVisible = true
      this.typeId = type
      this.week = week
      console.log(type, week)
    },
    getVisible(visible) {
      this.classVisible = visible
    },
    getModalVisible(visible) {
      this.classVisible = visible
      this.getClassTable()
    }
  },
  created() {
    this.getClassTable()
    console.log('calenderId', this.calenderId)
  }
}
</script>