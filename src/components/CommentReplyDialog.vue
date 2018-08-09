<template>
  <el-dialog title="编辑回复" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="你的回复" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addReply, editReply } from '@/api/reply'
export default {
  props: ['visible', 'choosedCommentId', 'dialogType'],
  computed: {
    dialogVisible: {
    // getter
      get: function() {
        return this.visible
      },
      set: function() {
        this.$emit('hideCommentReplyDialog')
      }
    }
  },
  data() {
    return {
      form: {
        content: ''
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
      console.log(this.choosedCommentId)
      console.log(this.dialogType)
      if (this.dialogType === 'reply') {
        addReply(this.choosedCommentId, this.form)
          .then(() => {
            this.$message.success('回复成功')
          })
      } else {
        editReply(this.choosedCommentId, this.form)
          .then(() => {
            this.$message.success('修改成功')
          })
      }
    }
  }
}
</script>
