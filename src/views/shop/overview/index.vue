<template>
  <div class="app-container">
    <el-table :data="shopList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="介绍">
              <span>{{ props.row.intro }}</span>
            </el-form-item>
            <el-form-item label="营业内容">
              <span>{{ props.row.businessContent }}</span>
            </el-form-item>
            <el-form-item label="服务特色">
              <span>{{ props.row.serviceFeature }}</span>
            </el-form-item>
            <el-form-item label="服务理念">
              <span>{{ props.row.serviceConcept }}</span>
            </el-form-item>
            <el-form-item label="奖项">
              <span>{{ props.row.award }}</span>
            </el-form-item>
            <el-form-item label="备注1">
              <span>{{ props.row.note1 }}</span>
            </el-form-item>
            <el-form-item label="备注2">
              <span>{{ props.row.note2 }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商铺名">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="品类" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.category}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.person}}
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.tel}}
        </template>
      </el-table-column>
      <el-table-column label="营业时间" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.workStartTime}}~{{scope.row.workEndTime}}
        </template>
      </el-table-column>
      <el-table-column label="评分" width="110" align="center" sortable :sort-method="sortByMeanMark">
        <template slot-scope="scope">
          {{scope.row.meanMark}}
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
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
</style>

<script>
import { getShops } from '@/api/shop'
import { sortByMeanMark } from '@/utils/index'

export default {
  data() {
    return {
      shopList: null,
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
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    sortByMeanMark: sortByMeanMark
  }
}
</script>
