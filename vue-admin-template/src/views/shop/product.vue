<template>
  <div class="app-container">
  <div style="padding: 5px;">
      <el-button type='primary' @click="addproduct">添加新商品</el-button>
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
      <el-table-column label="商品名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.productname }}
        </template>
      </el-table-column>
      <el-table-column label="商品图片" width="110" align="center" >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            v-if='scope.row.image'
            :src="base+'/static/upload/'+JSON.parse(scope.row.image)[0].filename"
            ></el-image>
            <el-image
              style="width: 100px; height: 100px"
              v-else
              :src="productimg"
              ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="产品类别" align="center" >
        <template slot-scope="scope">
          {{ scope.row.categoryname }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
        <el-button type='primary' icon='el-icon-edit' @click='editproduct(scope.row.id,scope.row.productname,scope.row.category,scope.row.status)' circle></el-button>
          <el-button type='danger' icon='el-icon-delete' @click='deleteproduct(scope.row.id)' circle></el-button>
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
  //导入默认图片
const productimg=require('@/assets/product.png')
const base =process.env.VUE_APP_BASE_API;
import { productlist, delproduct } from '@/api/shop'
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
      total: 0,
      base:base,
      productimg:productimg
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      productlist().then(response => {
        // console.log(response.usercount)
        this.list = response.productlist
        console.log(response)
        this.total = response.productcount
        this.listLoading = false
      })
    },
    getpage: function(page) {
      productlist({ page: page }).then(response => {
        // console.log(response.usercount)
        this.list = response.productlist
        this.total = response.productcount
        this.listLoading = false
      })
    },
    deleteproduct:async function(id){
      // console.log(id)
      this.$confirm('是否删除ID为'+id+'的商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async() => {
                this.listLoading=true
                let res =await delproduct({id})
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
    editproduct:function(id,productname,category,status){
      this.$router.push({
        path: '/shop/editproduct',
        query:{id,productname,category,status}
      })
    },
    addproduct(){
      this.$router.push('/shop/addproduct')
    }
  }
}
</script>
