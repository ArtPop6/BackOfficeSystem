<template>
  <a-modal
    :maskClosable="maskClosable"
    :title="title"
    @cancel="onCancel"
    @ok="handleOk"
    cancelText="取消"
    okText="确认"
    v-model="visible"
    width="500px"
    wrapClassName="add-class-modal"
  >
    <a-form :form="form">
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" label="课程名称">
        <a-select
          @change="courseChange"
          placeholder="选择课程名称"
          showSearch
          v-decorator="[
            'name',
            configName
          ]"
        >
          <a-select-option :key="index" :value="item.id" v-for="(item, index) in classList">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" label="授课教练">
        <a-select
          @change="coachChange"
          placeholder="输入教练名来搜索"
          showSearch
          v-decorator="[
            'coach',
            configCoach
          ]"
        >
          <a-select-option :key="index" :value="item.id" v-for="(item, index) in coaches">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" label="开始时间">
        <!-- <input placeholder="请选择时间" v-decorator="[
            'time',
            configTime
        ]" />-->
        <div class="hours">
          <a-select
            @change="changeStartHours"
            style="width: 110px"
            v-decorator="[
            'start',
            configStart
          ]"
          >
            <a-icon slot="suffixIcon" type="clock-circle" />
            <a-select-option :key="index" :value="item" v-for="(item, index) in hours">{{item}}</a-select-option>
          </a-select>
          <span class="hours-title">时</span>
        </div>

        <div class="minutes">
          <a-select @change="changeStartMinutes" style="width: 110px">
            <a-icon slot="suffixIcon" type="clock-circle" />
            <a-select-option :key="index" :value="item" v-for="(item, index) in minutes">{{item}}</a-select-option>
          </a-select>
          <span class="minutes-title">分</span>
        </div>
      </a-form-item>
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" label="结束时间">
        <div class="hours">
          <a-select
            :disabled="disableTime"
            @change="changeEndHours"
            style="width: 110px"
            v-decorator="[
            'end',
            configEnd
          ]"
          >
            <a-icon slot="suffixIcon" type="clock-circle" />
            <a-select-option :key="index" :value="item" v-for="(item, index) in hours">{{item}}</a-select-option>
          </a-select>
          <span class="hours-title">时</span>
        </div>

        <div class="minutes">
          <a-select :disabled="disableTime" @change="changeEndMinutes" style="width: 110px">
            <a-icon slot="suffixIcon" type="clock-circle" />
            <a-select-option :key="index" :value="item" v-for="(item, index) in minutes">{{item}}</a-select-option>
          </a-select>
          <span class="minutes-title">分</span>
        </div>
      </a-form-item>
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" label="操房">
        <a-select
          @change="roomChange"
          placeholder="选择操房"
          showSearch
          v-decorator="[
            'room',
            configRoom
          ]"
        >
          <a-select-option :key="index" :value="item.id" v-for="(item, index) in roomList">{{item.name}}</a-select-option>
        </a-select>
        <!-- TODO 编辑部门初始化多选没有"X"符号 -->
        <!-- @change="onChange" -->
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import moment from 'moment'
export default {
  props: ['classVisible', 'calender', 'beginDate', 'storeId', 'typeId', 'week'],
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      maskClosable: false,
      title: '添加课程',
      visible: false,
      configName: {
        rules: [{ required: true, message: '请选择课程名称!' }]
      },
      configCoach: {
        rules: [{ required: true, message: '请选择对应的教练!' }]
      },
      configStart: {
        rules: [{ required: true, message: '请选择开始时间!' }]
      },
      configEnd: {
        rules: [{ required: true, message: '请选择结束时间!' }]
      },
      configRoom: {
        rules: [{ required: true, message: '请选择对应的操房' }]
      },
      coachId: '',
      courseId: '',
      spaceId: '',
      coaches: [],
      roomList: [],
      classList: [],
      value: null,
      timeValue: null,
      hours: [],
      minutes: [],
      disableTime: true,
      startHour: '',
      startMinute: '',
      endHour: '',
      endMinute: '',
      endHours: [],
      endMinutes: []
    }
  },
  watch: {
    classVisible(newVal, oldVal) {
      this.visible = newVal
    },
    typeId(newVal, oldVal) {
      if (newVal) {
        this.getClassList()
      }
    }
  },
  methods: {
    moment,
    changeStartHours(value) {
      console.log('选中了', value)
      this.startHour = value
      if (this.startMinute) {
        this.disableTime = false
      }
    },
    changeStartMinutes(value) {
      this.startMinute = value
      if (this.startHour) {
        this.disableTime = false
      }
    },
    changeEndHours(value) {
      this.endHour = value
    },
    changeEndMinutes(value) {
      this.endMinute = value
    },
    onTimeChange() {
      console.log(time)
      this.value = time
    },
    onCancel(e) {
      this.visible = false
      this.inputValue = ''
      this.value = this.sendSeleKeys
      this.move = true
      this.$emit('getVisible', this.visible)
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = {
            calender_id: this.calender,
            course_type_id: this.typeId,
            course_id: this.courseId,
            coach_id: this.coachId,
            space_id: this.spaceId,
            // month: this.beginDate.substring(0, 7),
            begin_time: this.startHour.toString() + ':' + this.startMinute.toString(),
            end_time: this.endHour.toString() + ':' + this.endMinute.toString(),
            weekday: this.week
          }
          this.$http
            .post('./group_exercise/timetable', data)
            .then(res => {
              console.log('calender_id', res.data.calender_id)
              // this.$router.push({
              //   name: 'editClass',
              //   query: { id: res.data.calender_id }
              // })
              this.$message.success('添加课程成功')
              this.visible = false
              this.$emit('modalVisible', this.visible)
              this.form.setFieldsValue({
                name: '',
                coach: '',
                room: null
              })
            })
            .catch(err => {
              this.$message.warn(err.response.data.err_msg)
              console.log(err)
            })
        }
      })
      // this.visible = false
      // this.$emit('getVisible', this.visible)
      console.log('哈哈哈')
    },
    coachChange(value) {
      this.coachId = value
      console.log(value)
    },
    courseChange(value) {
      this.courseId = value
      console.log(value)
    },
    roomChange(value) {
      this.spaceId = value
      console.log(value)
    },
    onChange(value, dateString) {
      console.log('Selected Time: ', value)
      console.log('Formatted Selected Time: ', dateString)
    },
    onOk(value) {
      console.log('onOk: ', value)
    },
    getCoachList() {
      this.$http
        .get('./group_exercise/coaches')
        .then(res => {
          this.coaches = res.data
          console.log(this.coaches)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getRoomList() {
      this.$http
        .get('./space')
        .then(res => {
          this.roomList = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getClassList() {
      const data = {
        store_id: this.storeId,
        course_type_id: this.typeId
      }
      this.$http
        .get('./group_exercise/course_list', { params: data })
        .then(res => {
          console.log('获取课程名称', res.data)
          this.classList = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getCoachList()
    this.getRoomList()
    // this.getClassList()
    for (let i = 0; i < 24; i++) {
      if (this.hours.length < 10) {
        this.hours.push('0' + this.hours.length)
      } else {
        this.hours.push(this.hours.length)
      }
    }
    for (let i = 0; i < 60; i++) {
      if (this.minutes.length < 10) {
        this.minutes.push('0' + this.minutes.length)
      } else {
        this.minutes.push(this.minutes.length)
      }
    }
  }
}
</script>

<style lang="stylus">
.add-class-modal
  .ant-modal-content
    width 500px
    height auto
    border 0
    border-radius 5px
    background-clip padding-box
    box-shadow 0 0 0 rgba(0, 0, 0, 0)

    .ant-modal-body
      // height 300px
      padding 50px
      width 100%

      .ant-form
        .ant-row
          .ant-form-item-control-wrapper
            .ant-form-item-control
              .ant-form-item-children
                display flex
                justify-content space-between
                align-items center

                .hours
                  display flex
                  align-items center

                  .hours-title
                    margin-left 10px
                    margin-right 10px

                .minutes
                  display flex
                  align-items center

                  .minutes-title
                    margin-left 10px
</style>
