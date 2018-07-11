<template>
  <div>
    <el-table :data="data" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
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
      <el-table-column label="网点名">
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
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            v-if="scope.row.checkStatus!=='审核中'"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            v-if="scope.row.checkStatus==='审核中'"
            size="mini"
            type="primary"
            @click="handlePass(scope.$index, scope.row)">通过</el-button>
          <el-button
            v-if="scope.row.checkStatus==='审核中'"
            size="mini"
            type="danger"
            @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <shop-update-dialog
      :visible="dialogShopUpdateFormVisible"
      :shopId="choosedShopId"
      v-on:hideShopUpdateDialog="hideShopUpdateDialog"
    />
  </div>
</template>

<script>
import ShopUpdateDialog from '@/components/ShopUpdateDialog'
import { sortByMeanMark } from '@/utils/index'
export default {
  components: {
    ShopUpdateDialog
  },
  props: ['data', 'listLoading'],
  data() {
    return {
      choosedShopId: -1,
      dialogShopUpdateFormVisible: false
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
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogShopUpdateFormVisible = true
      this.choosedShopId = row.sid
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('你确定要删除这个网点吗?', '提示', {
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
          message: '操作取消'
        })
      })
    },
    handlePass(index, row) {
      console.log(index, row)
      this.$confirm('你确定要批准该网点的申请吗?', '提示', {
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
      this.$prompt('请输入拒绝理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的拒绝理由是: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    hideShopUpdateDialog() {
      this.dialogShopUpdateFormVisible = false
    },
    sortByMeanMark: sortByMeanMark
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