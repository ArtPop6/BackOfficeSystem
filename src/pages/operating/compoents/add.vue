<template>
  <div>
    <a-form :layout="formLayout">
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="Form Layout">
        <a-radio-group @change="handleFormLayoutChange" default-value="horizontal">
          <a-radio-button value="horizontal">Horizontal</a-radio-button>
          <a-radio-button value="vertical">Vertical</a-radio-button>
          <a-radio-button value="inline">Inline</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="Field A">
        <a-input placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="Field B">
        <a-input placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: 'horizontal'
    }
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {}
    },
    buttonItemLayout() {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {}
    }
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value
    }
  }
}
</script>