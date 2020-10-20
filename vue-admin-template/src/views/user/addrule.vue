<template>
  <div class="app-container">
   <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="权限名">
        <el-input v-model="form.desc" placeholder="请输入权限名" />
      </el-form-item>
      <el-form-item label="权限路径">
        <el-input v-model="form.name" placeholder="请输入权限路径" />
      </el-form-item>
    <el-form-item label="状态">
      <el-switch
        v-model="form.status"
        active-color="#13ce66"
        inactive-color="#ff4949"
          active-text="启用"
          inactive-text="禁用">
      </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {addrule} from '@/api/admin'
  export default{
    data(){
      return {
      form: {
        desc:"",
        name:"",
        status:true
      }
      }
    },
    methods:{
      onSubmit() {
        addrule(this.form)
        this.$message('添加成功!')
        this.$router.push('/user/authlist')
      },
      onCancel() {
        this.$message({
          message: '取消!',
          type: 'warning'
        })
        this.$router.push('/user/authlist')
      }
    }
  }
</script>

<style>
</style>
