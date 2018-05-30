<template>
  <div class="app-container">
    
    <!-- 没有店铺时 -->
    <div v-if="sid===''">
      <span>还没有自己的店铺，快来申请吧。</span>
      <el-button type="primary" v-on:click="handleApplyClicked">申请店铺</el-button>
    </div>
    <!-- 拥有店铺 -->
      <el-alert
        v-if="isCheck"
        title="你的店铺正在审核中"
        type="warning">
      </el-alert>
    <!-- 留言 -->
    <h1 class="title">留言</h1>
    <el-table :data="unReplyCommentsList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="管委会回复：">
              <span>{{ props.row.adminReply }}</span>
            </el-form-item>
            <el-form-item label="商家回复：">
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
      <el-table-column label="店铺环境" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.envMark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务态度" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.serviceMark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商铺质量" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.qualityMark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.meanMark}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="回复状态" width="110" align="center">
        <template slot-scope="scope">
           <el-tag :type="scope.row.ownerReplyStatus | replyStatusFilter">{{scope.row.ownerReplyStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="审核状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.checkStatus | statusFilter">{{scope.row.checkStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleReplyClicked(scope.$index, scope.row)">回复</el-button>
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


export default {

  data() {
    return {
      shopInfo: null,
      isCheck: false,
      listLoading: true,
      commentsList: null
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '通过': 'success',
        '审核中': 'gray',
        '失败': 'danger'
      }
      return statusMap[status]
    },
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
    ]),
    unReplyCommentsList: function() {
      return this.commentsList.filter((item) => {
        if (item.ownerReplyStatus === '未回复') {
          return true
        } else {
          return false
        }
      })
    }
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
    handleReplyClicked() {
      console.log('apply')
    }
  }
}
</script>
