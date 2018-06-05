<template>
  <div class="app-container">
    <shop-table
      :data="shopList"
      :listLoading="listLoading"
    />
  </div>
</template>

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
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getShops().then(response => {
        this.shopList = response.data.shops
        this.listLoading = false
      })
    }
  }
}
</script>
