<template>
  <div class="app-container">
    <h1 id="title">待审核网点</h1>
    <shop-table
      :data="shopList"
      :listLoading="listLoading"
    />
  </div>
</template>

<style scoped>
  #title {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 20px;
  }
</style>

<script>
import { getShops } from '@/api/shop'
import ShopTable from '@/components/ShopTable'
export default {
  components: {
    ShopTable
  },
  data() {
    return {
      shopList: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '审核通过': 'success',
        '审核中': 'gray',
        '审核失败': 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getShops().then(response => {
        const unCheckedShopList = response.data.shops.filter((item) => {
          if (item.checkStatus === '审核中') {
            return true
          } else {
            return false
          }
        })
        this.shopList = unCheckedShopList
        this.listLoading = false
      })
    }

  }
}
</script>
