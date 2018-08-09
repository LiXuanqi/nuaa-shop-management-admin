<template>
  <div>
    <el-table :data="data" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
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
          <el-tag :type="role === 'owner' ? scope.row.ownerReplyStatus : scope.row.adminReplyStatus | replyStatusFilter">{{role === 'owner' ? scope.row.ownerReplyStatus : scope.row.adminReplyStatus}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column v-if="role==='admin'" class-name="status-col" label="审核状态" width="90" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.checkStatus | statusFilter">{{scope.row.checkStatus}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="240" align="center">
      <template slot-scope="scope">
        <!-- <el-button
          v-if="role === 'owner' && scope.row.ownerReplyStatus === '已回复'"
          size="mini"
          @click="handleOwnerEdit(scope.$index, scope.row)">编辑</el-button> -->
        <el-button
          v-if="role === 'owner' && scope.row.ownerReplyStatus === '未回复'"
          size="mini"
          type="primary"
          @click="handleOwnerReply(scope.$index, scope.row)">回复</el-button>  
        <el-button
          v-if="role === 'admin' && scope.row.adminReplyStatus === '已回复'"
          size="mini"
          @click="handleAdminEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          v-if="role === 'admin' && scope.row.adminReplyStatus === '未回复'"
          size="mini"
          type="primary"
          @click="handleAdminReply(scope.$index, scope.row)">回复</el-button>      
        <el-button
          v-if="role === 'admin' && scope.row.checkStatus !== '通过'"      
          size="mini"
          type="primary"
          @click="handlePass(scope.$index, scope.row)">通过</el-button>
        <el-button
          v-if="role === 'admin' && scope.row.checkStatus === '审核中'"
          size="mini"
          type="danger"
          @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>

  <comment-reply-dialog
    :visible="dialogCommentEditFormVisible"
    :choosedCommentId="choosedCommentId"
    :dialogType="dialogType"
    v-on:hideCommentReplyDialog="hideCommentReplyDialog"
  />
</div>

</template>

<script>
import { sortByDate, sortByMeanMark, sortByEnvMark, sortByQualityMark, sortByServiceMark } from '@/utils/index'
import CommentReplyDialog from './CommentReplyDialog'
import { checkCommentPass, checkCommentRej } from '@/api/comment'

export default {
  components: {
    CommentReplyDialog
  },
  props: ['data', 'listLoading', 'role'],
  data() {
    return {
      dialogCommentEditFormVisible: false,
      dialogCommentReplyFormVisible: false,
      choosedCommentId: -1,
      dialogType: ''
    }
  },
  filters: {
    replyStatusFilter(status) {
      const statusMap = {
        '已回复': 'success',
        '未回复': 'danger'
      }
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        '通过': 'success',
        '审核中': 'gray',
        '失败': 'danger'
      }
      return statusMap[status]
    }
  },
  methods: {
    handleOwnerEdit(index, row) {
      const choosedCommentId = row.cid
      this.choosedCommentId = choosedCommentId
      this.dialogType = 'edit'
      this.dialogCommentEditFormVisible = true
    },
    handleOwnerReply(index, row) {
      const choosedCommentId = row.cid
      this.choosedCommentId = choosedCommentId
      this.dialogType = 'reply'
      this.dialogCommentEditFormVisible = true
    },
    handleAdminEdit(index, row) {
      const choosedCommentId = row.cid
      this.choosedCommentId = choosedCommentId
      this.dialogType = 'edit'
      this.dialogCommentEditFormVisible = true
    },
    handleAdminReply(index, row) {
      const choosedCommentId = row.cid
      this.choosedCommentId = choosedCommentId
      this.dialogType = 'reply'
      this.dialogCommentEditFormVisible = true
    },
    hideCommentReplyDialog() {
      this.dialogCommentEditFormVisible = false
    },
    handlePass(index, row) {
      console.log(index, row)
      this.$confirm('你确定要审核通过该条评论?', '提示', {
        confirmButtonText: '通过',
        cancelButtonText: '取消'
      }).then(() => {
        const commentId = row.cid
        checkCommentPass(commentId)
          .then(() => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
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
        confirmButtonText: '拒绝',
        cancelButtonText: '取消'
      }).then(() => {
        const commentId = row.cid
        checkCommentRej(commentId)
          .then(() => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
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
</style>
