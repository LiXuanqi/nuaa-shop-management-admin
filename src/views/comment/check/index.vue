<template>
  <div class="app-container">
    <h1 class="title">留言</h1>
    <el-table :data="unCheckedCommentsList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row >
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
      <el-table-column label="留言人" width="90" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="留言日期" width="110" align="center" sortable :sort-method="sortByDate">
        <template slot-scope="scope">
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺环境" width="90" align="center"  sortable :sort-method="sortByEnvMark">
        <template slot-scope="scope">
          <span>{{scope.row.envMark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务态度" width="90" align="center"  sortable :sort-method="sortByServiceMark">
        <template slot-scope="scope">
          <span>{{scope.row.serviceMark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="网点质量" width="90" align="center"  sortable :sort-method="sortByQualityMark">
        <template slot-scope="scope">
          <span>{{scope.row.qualityMark}}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分" width="90" align="center" sortable :sort-method="sortByMeanMark">
        <template slot-scope="scope">
          {{scope.row.meanMark}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="回复状态" width="90" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.adminReplyStatus | replyStatusFilter">{{scope.row.adminReplyStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="审核状态" width="90" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.checkStatus | statusFilter">{{scope.row.checkStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.adminReplyStatus === '未回复'"
            size="mini"
            type="success"
            @click="handleReply(scope.$index, scope.row)">回复</el-button>
          <el-button
            v-if="scope.row.checkStatus !== '通过'"
            size="mini"
            type="primary"
            @click="handlePass(scope.$index, scope.row)">通过</el-button>
          <el-button
            v-if="scope.row.checkStatus === '审核中'"
            size="mini"
            type="danger"
            @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<style scoped>
  #title {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 20px;
  }
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
</style>

<script>
import { getComments } from '@/api/comment'
import { sortByDate, sortByMeanMark, sortByEnvMark, sortByQualityMark, sortByServiceMark } from '@/utils/index'

export default {
  data() {
    return {
      commentsList: null,
      listLoading: true
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
    unCheckedCommentsList: function() {
      return this.commentsList.filter((item) => {
        if (item.checkStatus === '审核中') {
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
      this.listLoading = true
      getComments().then(response => {
        this.commentsList = response.data.comments
        this.listLoading = false
      })
    },
    handlePass(index, row) {
      console.log(index, row)
      this.$confirm('你确定要审核通过该条评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审核'
        })
      })
    },
    handleReject(index, row) {
      console.log(index, row)
      this.$confirm('你确定要拒绝展示该条评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审核'
        })
      })
    },
    sortByDate: sortByDate,
    sortByMeanMark: sortByMeanMark,
    sortByEnvMark: sortByEnvMark,
    sortByQualityMark: sortByQualityMark,
    sortByServiceMark: sortByServiceMark
  }
}
</script>
