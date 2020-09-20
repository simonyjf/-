<template>
  <div class="app-container">
   <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="商品分类名">
        <el-input v-model="form.title" placeholder="请输入商品分类" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {addcategory} from '@/api/shop'
  export default{
    data(){
      return {
      form: {
        // desc:"",
        title:""
        // status:true
      }
      }
    },
    methods:{
      onSubmit() {
        addcategory(this.form)
        this.$message('添加成功!')
        this.$router.push('/shop/category')
      },
      onCancel() {
        this.$message({
          message: '取消!',
          type: 'warning'
        })
        this.$router.push('/shop/category')
      }
    }
  }
</script>

<style>
</style>
