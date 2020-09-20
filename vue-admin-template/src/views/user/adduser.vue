<template>
  <div class="app-container">
   <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入用户密码" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入用户邮箱" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.mobile" placeholder="请输入用户手机号码" />
      </el-form-item>
    <el-form-item label="用户角色">
        <el-select v-model="form.role_id" placeholder="请选择角色">
          <el-option v-for="(item,index) in rolelist" :label="item.desc" :value="item.id" :key='index' />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {adduser, rolelist} from '@/api/admin'
  export default{
    data(){
      return {
      form: {
        username:'',
        password:'',
        email:'',
        mobile:"",
        role_id:'',
        userid:''
      },
      role_id:'',
      rolelist:[]
      }
    },
    methods:{
      onSubmit() {
        adduser(this.form)
        this.$message('添加成功!')
        this.$router.push('/user/userlist')
      },
      onCancel() {
        this.$message({
          message: '取消!',
          type: 'warning'
        })
        this.$router.push('/user/userlist')
      }
    },
    async beforeMount(){
      let res =await rolelist()
      this.rolelist=res.rolelist
    }
  }
</script>

<style>
</style>
