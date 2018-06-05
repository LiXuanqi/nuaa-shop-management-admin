<template>
  <div class="app-container">
    <h1 class="title">留言</h1>
    <comment-table
      :data="commentsList"
      :listLoading="listLoading"
      role="admin"
    />

  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentTable from '@/components/CommentTable'

export default {
  components: {
    CommentTable
  },
  data() {
    return {
      commentsList: null,
      listLoading: true
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
    }
  }
}
</script>
