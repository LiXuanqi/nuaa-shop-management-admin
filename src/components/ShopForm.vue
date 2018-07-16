<template>
  <el-form ref="form" :model="form" label-width="80px" class="form">
    <el-form-item label="网点名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="介绍">
      <el-input type="textarea" v-model="form.intro"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item label="品类">
      <el-select v-model="form.category" placeholder="请选择所属类别">
        <el-option label="生活" value="生活"></el-option>
        <el-option label="美食" value="美食"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系人">
      <el-input v-model="form.person"></el-input>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="form.tel"></el-input>
    </el-form-item>
    <el-form-item label="营业时间">
        <el-time-picker
          is-range
          v-model="form.workTime"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围">
        </el-time-picker>
    </el-form-item>
    <el-form-item label="经营内容">
      <el-input type="textarea" v-model="form.businessContent"></el-input>
    </el-form-item>
    <el-form-item label="服务理念">
      <el-input type="textarea" v-model="form.serviceConcept"></el-input>
    </el-form-item>
    <el-form-item label="服务特色">
      <el-input type="textarea" v-model="form.serviceFeature"></el-input>
    </el-form-item>
    <el-form-item label="荣誉">
      <el-input type="textarea" v-model="form.award"></el-input>
    </el-form-item>
    <el-form-item label="备注1">
      <el-input type="textarea" v-model="form.note1"></el-input>
    </el-form-item>
    <el-form-item label="备注2">
      <el-input type="textarea" v-model="form.note2"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped>
  .form {
    width: 70vw;
  }
</style>

<script>
import { addShop } from '@/api/shop'
export default {
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
      }
    }
  },
  methods: {
    onSubmit() {
      addShop(this.form)
        .then(() => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        })
    }
  }
}
</script>
