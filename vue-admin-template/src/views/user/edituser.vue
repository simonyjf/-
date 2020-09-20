<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" :disabled="true"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="form.role_id" placeholder="please select your zone">
          <el-option v-for="(item,index) in rolelist" :label="item.desc" :value="item.id" :key='index' />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import{ userinfo, updateuser, rolelist} from '@/api/admin'
export default {
  data() {
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
  async created(){
    // let userlist=await userlist()
    // console.log(userlist)
    let userid=this.$route.query.id
    let res =await userinfo({id:userid})
    this.form.id=res.user.id
    this.form.username=res.user.username;
    this.form.password=res.user.password
    this.form.email=res.user.email
    this.form.mobile=res.user.mobile
    this.form.role_id=res.user.role_id
    this.form.userid=this.$route.query.id
    this.role_id=res.user.role_id
  },
  async beforeMount(){
    let res=await rolelist()
    this.rolelist=res.rolelist
    console.log(res)
  },
  methods: {
      onSubmit() {
      updateuser(this.form)
      this.$message('修改成功!')
      this.$router.push('/user/userlist')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
	  this.$router.push('/user/userlist')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
