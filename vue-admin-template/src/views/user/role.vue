<template>
  <div class="app-container">
    <div style="padding: 5px;">
      <el-button type='primary' @click="addrole">添加角色</el-button>
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
      <el-table-column label="角色名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="规则" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rule_ids }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type='primary' icon='el-icon-edit' @click='editrole(scope.row.id,scope.row.desc,scope.row.rule_ids)' circle></el-button>
          <el-button type='danger' icon='el-icon-delete' @click='deleterole(scope.row.id)' circle></el-button>
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
import { rolelist, delrole } from '@/api/admin'

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
      rolelist().then(response => {
        // console.log(response.usercount)
        this.list = response.rolelist
        this.total = response.rolecount
        this.listLoading = false
      })
    },
    getpage: function(page) {
      console.log(page)
      rolelist({ page: page }).then(response => {
        // console.log(response.usercount)
        this.list = response.rolelist
        this.total = response.rolecount
        this.listLoading = false
      })
    },
    deleterole:async function(id){
      // console.log(id)
      this.$confirm('是否删除ID为'+id+'的角色?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async() => {
                this.listLoading=true
                let res =await delrole({id})
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
    editrole:function(id,desc,ruleids){
      console.log(status)
      this.$router.push({
        path: '/user/editrole',
        query:{id,desc,ruleids}
      })
    },
    addrole(){
      this.$router.push('/user/addrole')
    }
  }
}
</script>
