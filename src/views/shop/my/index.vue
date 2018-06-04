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
          <el-button style="float: right; padding: 3px 0" type="text" @click="dialogShopUpdateFormVisible = true">修改</el-button>
          <shop-update-dialog :visible="dialogShopUpdateFormVisible" />
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
    <h1 class="title">留言</h1>
    <el-table :data="commentsList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="管委会回复">
              <span>{{ props.row.adminReply }}</span>
            </el-form-item>
            <el-form-item label="商家回复">
              <span>{{ props.row.ownerReply }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          {{scope.row.content}}
        </template>
      </el-table-column>
      <el-table-column label="留言人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="留言日期" width="110" align="center" sortable :sort-method="sortByDate" >
        <template slot-scope="scope">
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺环境" width="110" align="center" sortable :sort-method="sortByEnvMark">
        <template slot-scope="scope">
          <span>{{scope.row.envMark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务态度" width="110" align="center" sortable :sort-method="sortByServiceMark">
        <template slot-scope="scope">
          <span>{{scope.row.serviceMark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="网点质量" width="110" align="center" sortable :sort-method="sortByQualityMark">
        <template slot-scope="scope">
          <span>{{scope.row.qualityMark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分" width="110" align="center" sortable :sort-method="sortByMeanMark">
        <template slot-scope="scope">
          {{scope.row.meanMark}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="回复状态" width="110" align="center">
        <template slot-scope="scope">
           <el-tag :type="scope.row.ownerReplyStatus | replyStatusFilter">{{scope.row.ownerReplyStatus}}</el-tag>
        </template>
      </el-table-column>
   
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.ownerReplyStatus === '已回复'"
            size="mini"
            @click="handleCommentEdit(scope.$index, scope.row)">编辑</el-button>
      


          <el-button
            v-if="scope.row.ownerReplyStatus === '未回复'"
            size="mini"
            type="primary"
            @click="handleCommentReply(scope.$index, scope.row)">回复</el-button>

        

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .title {
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
import { getCommentsByShopId } from '@/api/comment'
import PanelGroup from './components/PanelGroup'
import ShopUpdateDialog from './components/ShopUpdateDialog'
import { sortByDate, sortByMeanMark, sortByEnvMark, sortByQualityMark, sortByServiceMark } from '@/utils/index'

export default {
  components: {
    PanelGroup,
    ShopUpdateDialog
  },
  data() {
    return {
      shopInfo: null,
      isCheck: false,
      listLoading: true,
      commentsList: null,
      dialogShopUpdateFormVisible: false,
      dialogCommentEditFormVisible: false,
      dialogCommentReplyFormVisible: false
    }
  },
  filters: {
    replyStatusFilter(status) {
      const statusMap = {
        '已回复': 'success',
        '未回复': 'danger'
      }
      return statusMap[status]
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
      if (this.isCheck === false) {
        this.listLoading = true
        getCommentsByShopId(this.sid).then(response => {
          this.commentsList = response.data.comments
          // console.log(this.commentsList)
          this.listLoading = false
        })
      }
    },
    handleApplyClicked() {
      console.log('apply')
    },
    handleShopInfoUpdateCancel() {
      this.dialogShopUpdateFormVisible = false
    },
    handleShopInfoUpdateConfirm() {
      this.dialogShopUpdateFormVisible = false
    },
    handleCommentEdit() {
      this.dialogCommentEditFormVisible = true
    },
    handleCommentReply() {
      this.dialogCommentReplyFormVisible = true
    },
    sortByDate: sortByDate,
    sortByMeanMark: sortByMeanMark,
    sortByEnvMark: sortByEnvMark,
    sortByQualityMark: sortByQualityMark,
    sortByServiceMark: sortByServiceMark
  }
}
</script>
