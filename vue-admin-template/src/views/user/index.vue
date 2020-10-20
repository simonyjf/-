<template>
  <div class="app-container">
    <div style="padding: 5px;">
      <el-button type='primary' @click="adduser">添加用户</el-button>
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
      <el-table-column label="用户名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width='200' align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status==1?'正常':'禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type='primary' icon='el-icon-edit' @click='edituser(scope.row.id)' circle></el-button>
          <el-button type='danger' icon='el-icon-delete' @click='deleteuser(scope.row.id)' circle></el-button>
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
import { userlist, deluser } from '@/api/admin'

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
      userlist().then(response => {
        // console.log(response.usercount)
        this.list = response.userlist
        this.total = response.usercount
        this.listLoading = false
      })
    },
    getpage: function(page) {
      console.log(page)
      userlist({ page: page }).then(response => {
        // console.log(response.usercount)
        this.list = response.userlist
        this.total = response.usercount
        this.listLoading = false
      })
    },
    deleteuser:async function(id){
      // console.log(id)
      this.$confirm('是否删除ID为'+id+'的用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async() => {
                this.listLoading=true
                let res =await deluser({id})
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
    edituser:function(id){
      // console.log(id)
      this.$router.push({
        path: '/user/edituser',
        query:{id}
      })
    },
    adduser(){
      this.$router.push('/user/adduser')
    }
  }
}
</script>
