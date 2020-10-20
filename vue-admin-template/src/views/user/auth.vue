<template>
  <div class="app-container">
    <div style="padding: 5px;">
      <el-button type='primary' @click="addrule">添加权限</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="权限名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="路径"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
         <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status==1?'正常':'禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type='primary' icon='el-icon-edit' @click='editrule(scope.row.id,scope.row.desc,scope.row.name,scope.row.status)' circle></el-button>
          <el-button type='danger' icon='el-icon-delete' @click='deleterule(scope.row.id)' circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: center;align-items: center;height: 100px;">
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change='getpage'
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { rulelist, delrule } from '@/api/admin'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'success',
        '0': 'gray',
        '-1': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      rulelist().then(response => {
        // console.log(response.usercount)
        this.list = response.rulelist
        this.total = response.rulecount
        this.listLoading = false
      })
    },
    getpage: function(page) {
      console.log(page)
      rulelist({ page: page }).then(response => {
        // console.log(response.usercount)
        this.list = response.rulelist
        this.total = response.rulecount
        this.listLoading = false
      })
    },
    deleterule:async function(id){
      // console.log(id)
      this.$confirm('是否删除ID为'+id+'的权限?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async() => {
                this.listLoading=true
                let res =await delrule({id})
                this.listLoading=false
                this.fetchData()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
    },
    editrule:function(id,desc,name,status){
      this.$router.push({
        path: '/user/editrule',
        query:{id,desc,name,status:status==1?true:false}
      })
    },
    addrule(){
      this.$router.push('/user/addrule')
    }
  }
}
</script>
