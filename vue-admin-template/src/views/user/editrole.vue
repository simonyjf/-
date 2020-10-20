<template>
    <div class="app-container">
   <el-form ref="form" :model="form" label-width="120px" >
      <el-form-item label="角色名">
        <el-input v-model="form.desc" placeholder="请输入角色名称" />
      </el-form-item>
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
        <el-table-column align="center" label="权限名称" width="200">
          <template slot-scope="scope">
            {{ scope.row.desc }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="权限路径" >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="授予权限" width="300" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
     <el-form-item style="margin:20px;">
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
      </div>
</template>

<script>
  import { rulelist, editrole } from '@/api/admin'
  export default{
    data(){
      return{
        listLoading:'',
        list:[],
        form:{
          desc:'',
           rule_ids:'',
           id:''
        },
        ruleids:[],
        authids:[]
      }
    },
    async beforeMount(){
      this.listLoading=true
      let res=await rulelist()
      this.list=res.rulelist
      let res2= await this.$route.query
      this.form.desc=res2.desc,
      this.form.id=res2.id
      this.ruleids=res2.ruleids.split(',')
      this.list.forEach((item,index)=>{
        //通过判断数组ruleids是否有权限对应的id值来控制启用和禁用的显示，判断的时候需要将id转为字符串
        item.status=(this.ruleids.indexOf(String(item.id))!=-1)
      })
      this.listLoading=false
    },
    methods:{
      onSubmit(){
        this.list.forEach((item,index)=>{
          if(item.status==1){
            this.authids.push(item.id)
          }
        })
        //join方法是将数组内的值用过','连接
        this.form.rule_ids=this.authids.join(',')
        editrole(this.form)
        this.$message('修改成功!')
        this.$router.push('/user/rolelist')
      },
      onCancel(){
        this.$message({
          message: '取消!',
          type: 'warning'
        })
         this.$router.push('/user/rolelist')
      }
    }
  }

</script>

<style>
</style>
