<template>
  <el-dialog title="修改网点信息" :visible.sync="dialogVisible">
      <el-form :model="form">
      <el-form-item label="网点图片">
        <el-upload
          class="upload-demo"
          drag
          :action="QINIU_UPLOAD_URL"
          :data="postData"
          :before-upload="handleBeforeUpload"
          :on-success="handleAvatarSuccess"
          :on-error="handleError"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item label="网点名称" :label-width="formLabelWidth">
        <el-input v-model="form.name"></el-input>
      </el-form-item> -->
      <el-form-item label="介绍" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <!-- <el-form-item label="品类" :label-width="formLabelWidth">
        <el-select v-model="form.category" placeholder="请选择所属类别">
          <el-option label="美食" value="生活"></el-option>
          <el-option label="超市" value="美食"></el-option>
          <el-option label="生鲜果蔬" value="美食"></el-option>
          <el-option label="餐饮" value="美食"></el-option>
          <el-option label="甜点饮品" value="美食"></el-option>
          <el-option label="生活" value="美食"></el-option>
        </el-select>
      </el-form-item> -->
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
import { editShop, getQiniuToken, getShop } from '@/api/shop'

export default {
  props: ['visible', 'shopId'],
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
        // name: '',
        intro: '',
        address: '',
        // category: '',
        person: '',
        tel: '',
        workTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        businessContent: '',
        serviceConcept: '',
        serviceFeature: '',
        award: '',
        note1: '',
        note2: '',
        pic: ''
      },
      formLabelWidth: '120px',
      postData: {
        token: ''
      },
      QINIU_UPLOAD_URL: process.env.QINIU_UPLOAD_URL
    }
  },
  mounted: function() {
    getQiniuToken()
      .then((res) => {
        const uploadToken = res.data
        console.log(uploadToken)
        this.postData.token = uploadToken
      })
  },

  methods: {
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.dialogVisible = false
      // console.log(this.form)
      // console.log(this.shopId)
      editShop(this.shopId, this.form)
        .then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          location.reload()
        })
    },
    handleBeforeUpload(file) {
      getQiniuToken()
        .then((res) => {
          const uploadToken = res.data
          this.postData.token = uploadToken
        })
    },
    handleAvatarSuccess(res, file) { // 上传成功后在图片框显示图片
      this.form.pic = process.env.QINIU_SHOW_URL + res.key
      console.log(res)
      this.$message.success('上传成功')
    },
    handleError(res) { // 显示错误
      console.log(res)
    },
    getShopInfo(id) {
      getShop(id)
        .then((response) => {
          console.log(response);
          const { data } = response;
          if (data !== false) {
            console.log(data)
            this.setFormInitData(data);
          }
        })
    },
    setFormInitData(data) {
      this.form.intro = data.intro
      this.form.address = data.address
      this.form.person = data.person
      this.form.tel = data.tel
      this.form.businessContent = data.businessContent
      this.form.serviceConcept = data.serviceConcept
      this.form.serviceFeature = data.serviceFeature
      this.form.award = data.award || ""
      this.form.note1 = data.note1
      this.form.note2 = data.note2
      this.form.pic = data.pic
    }
  }
}
</script>
