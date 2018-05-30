<template>
  <div class="app-container">
    
    <!-- 没有店铺时 -->
    <div v-if="sid===''">
      <span>还没有自己的店铺，快来申请吧。</span>
      <el-button type="primary" v-on:click="handleApplyClicked">申请店铺</el-button>
    </div>
    <!-- 拥有店铺 -->
    <div>
      <el-alert
        v-if="isCheck"
        title="你的店铺正在审核中"
        type="warning">
      </el-alert>
      <panel-group v-else></panel-group>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ shopInfo.name }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" v-on:click="handleEditClicked">修改</el-button>
        </div>
        <el-row type="flex" justify="space-between">
          <el-col :span="16">
            <div class="cell">
                  <span class="label">品类：</span>
                  <el-tag>{{ shopInfo.category }}类</el-tag>
            </div>
            <div class="cell">
              <span class="label">地址：</span>
              <el-tag>{{ shopInfo.address }}</el-tag>
            </div>
            <div class="cell">
              <span class="label">介绍：</span>
              <el-tag>{{ shopInfo.intro }}</el-tag>
            </div>
            <div class="cell">
              <span class="label">联系人：</span>
              <el-tag>{{ shopInfo.person }}</el-tag>
            </div>
            <div class="cell">
              <span class="label">联系方式：</span>
              <el-tag>{{ shopInfo.tel }}</el-tag>
            </div>
            <div class="cell">
              <span class="label">服务理念：</span>
              <el-tag>{{ shopInfo.serviceConcept }}</el-tag>
            </div>
            <div class="cell">
              <span class="label">服务特色：</span>
              <el-tag>{{ shopInfo.serviceFeature }}</el-tag>
            </div>
            <div class="cell">
              <span class="label">经营内容：</span>
              <el-tag>{{ shopInfo.businessContent }}</el-tag>

            </div>
            <div class="cell">
              <span class="label">营业时间：</span>
                <el-tag>{{ shopInfo.workStartTime }} ~ {{ shopInfo.workEndTime }}</el-tag>

            </div>
            <div class="cell">
              <span class="label">荣誉：</span>
              <el-tag>{{ shopInfo.award }}</el-tag>
            </div>
            <div class="cell">
              <span class="label">备注1：</span>
              <el-tag>{{ shopInfo.note1 }}</el-tag>
            </div>
            <div class="cell">
              <span class="label">备注2：</span>
              <el-tag>{{ shopInfo.note2 }}</el-tag> 
            </div>
          </el-col>
          <el-col :span="4">
            <img :src="shopInfo.pic" alt="">
            <el-row> 
              <el-tag class="mark-container" type="danger">商品质量 | {{ shopInfo.qualityMark }}</el-tag>
            </el-row>
            <el-row>
              <el-tag class="mark-container" type="danger">店铺环境 | {{ shopInfo.envMark }}</el-tag>
            </el-row>
            <el-row>
              <el-tag class="mark-container" type="danger">服务态度 | {{ shopInfo.serviceMark }}</el-tag>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <!-- 留言 -->

  </div>
</template>
<style scoped>
  #shop-name {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 20px;
  }

  .cell {
    margin-bottom: 8px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .mark-container {
    margin-top: 8px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

</style>

<script>

import { mapGetters } from 'vuex'
import { getShop } from '@/api/shop'
import PanelGroup from './components/PanelGroup'

export default {
  components: {
    PanelGroup
  },
  data() {
    return {
      shopInfo: null,
      isCheck: true
    }
  },
  computed: {
    ...mapGetters([
      'sid'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getShop(this.sid).then(response => {
        this.shopInfo = response.data
        console.log(this.shopInfo)
        if (this.shopInfo.checkStatus === '审核中') {
          this.isCheck = true
        }
      })
    },
    handleApplyClicked() {
      console.log('apply')
    },
    handleEditClicked() {
      console.log('PUT shop')
    }
  }
}
</script>
