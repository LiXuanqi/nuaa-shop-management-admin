<template>
  <div class="app-container">
    <h1 id="title">添加网点</h1>
    <shop-form />
  </div>
</template>
<style scoped>
  #title {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 20px;
  }
</style>

<script>
import ShopForm from '@/components/ShopForm'

export default {
  components: {
    ShopForm
  }
}
</script>