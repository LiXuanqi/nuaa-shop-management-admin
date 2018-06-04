<template>
  <el-dialog title="修改店铺信息" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="网点名称" :label-width="formLabelWidth">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="介绍" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="品类" :label-width="formLabelWidth">
        <el-select v-model="form.category" placeholder="请选择所属类别">
          <el-option label="生活" value="生活"></el-option>
          <el-option label="美食" value="美食"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人" :label-width="formLabelWidth">
        <el-input v-model="form.person"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="营业时间" :label-width="formLabelWidth">
          <el-time-picker
            is-range
            v-model="form.workTime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
      </el-form-item>
      <el-form-item label="经营内容" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.businessContent"></el-input>
      </el-form-item>
      <el-form-item label="服务理念" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.serviceConcept"></el-input>
      </el-form-item>
      <el-form-item label="服务特色" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.serviceFeature"></el-input>
      </el-form-item>
      <el-form-item label="荣誉" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.award"></el-input>
      </el-form-item>
      <el-form-item label="备注1" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.note1"></el-input>
      </el-form-item>
      <el-form-item label="备注2" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.note2"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['visible'],
  computed: {
    dialogVisible: {
    // getter
      get: function() {
        return this.visible
      },
      set: function() {
        this.$emit('hideShopUpdateDialog')
      }
    }
  },
  data() {
    return {
      form: {
        name: '',
        intro: '',
        address: '',
        category: '',
        person: '',
        tel: '',
        workTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        businessContent: '',
        serviceConcept: '',
        serviceFeature: '',
        award: '',
        note1: '',
        note2: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.dialogVisible = false
      console.log(this.form)
    }
  }
}
</script>
