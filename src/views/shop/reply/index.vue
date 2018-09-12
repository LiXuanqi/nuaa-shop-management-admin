<template>
  <div class="app-container">
    
    <!-- 没有网点时 -->
    <div v-if="sid===''">
      <span>还没有自己的网点，快来申请吧。</span>
      <el-button type="primary" v-on:click="handleApplyClicked">申请网点</el-button>
    </div>
    <!-- 拥有网点 -->
      <el-alert
        v-if="isCheck"
        title="你的网点正在审核中"
        type="warning">
      </el-alert>
    <!-- 留言 -->
    <h1 class="title">留言</h1>
    <comment-table
      :data="commentsList"
      :listLoading="listLoading"
      role="owner"
    />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { getShop } from '@/api/shop'
import { getCommentsByShopId } from '@/api/comment'
import CommentTable from '@/components/CommentTable'
export default {
  components: {
    CommentTable
  },
  data() {
    return {
      shopInfo: null,
      isCheck: false,
      listLoading: true,
      commentsList: null
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
          const unReplyComments = response.data.comments.filter((item) => {
            if (item.ownerReplyStatus === '未回复') {
              return true
            } else {
              return false
            }
          })
          this.commentsList = unReplyComments
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

<style scoped>
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