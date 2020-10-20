<template>
  <div class="app-container">
   <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="商品名称">
        <el-input v-model="form.productname" placeholder="请输入商品名称" />
      </el-form-item>
      <el-form-item label="商品类别">
        <el-select v-model="form.category" placeholder="请选择">
            <el-option
              v-for="(item,index) in categorylist"
              :key="index"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="form.price" placeholder="请输入商品名称" />
      </el-form-item>
      <el-form-item label="上传图片">
       <el-upload
          class="upload-demo"
          drag
          action="/api/assets/upload/uploadimg"
          name="uploadFile"
          :on-success="uploadSuccess"
          :file-list="fileList"
          :on-remove="uploadRemove"
          list-type="picture">
          <i class="el-icon-upload"></i>
          <div  class="el-upload_text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="sku列表">
         <el-table
            :data="skulist"
            stripe
            style="width: 80%">
            <el-table-column
              prop="name"
              label="名称"
              width="180">
              <template slot-scope='scope'>
                {{scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              label="类别"
              width="180">
              <template slot-scope='scope'>
                {{scope.row.type}}
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格">
              <template slot-scope='scope'>
                {{scope.row.sku_price}}
              </template>
            </el-table-column>
            <el-table-column
              prop="stock"
              label="数量">
              <template slot-scope='scope'>
                {{scope.row.sku_stock}}
              </template>
            </el-table-column>
            <el-table-column
              prop="code"
              label="编码">
              <template slot-scope='scope'>
                {{scope.row.sku_code}}
              </template>
            </el-table-column>
            <el-table-column
              label="删除">
              <template slot-scope='scope'>
                <el-button @click='delsku(scope.row.sku_code)' type="danger" >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item label='SKU名称'>
            <el-input v-model="sku.name"></el-input>
          </el-form-item>
          <el-form-item label='SKU类型'>
            <el-input v-model="sku.type"></el-input>
          </el-form-item>
          <el-form-item label='SKU价格'>
            <el-input v-model="sku.sku_price"></el-input>
          </el-form-item>
          <el-form-item label='SKU数量'>
            <el-input v-model="sku.sku_stock"></el-input>
          </el-form-item>
          <el-form-item label='SKU编码'>
            <el-input v-model="sku.sku_code"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='addsku'>添加sku</el-button>
          </el-form-item>
      </el-form-item>

      <el-form-item label="商品详情">
        <tinymce v-model="form.content" :height='500'></tinymce>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {editproduct, categorylist,productinfo} from '@/api/shop'
  let base = process.env.VUE_APP_BASE_API;
  import tinymce from '@/components/Tinymce'
  export default{
    components:{tinymce},
    data(){
      return {
      form: {
        productname:'',
        category:'',
        price:'',
        image:'',
        sku:'',
        content:"",
        id:''
      },
      categorylist:[],
      fileList:[],
      skuObj:{},
      sku:{
        name:'',
        type:"",
        sku_price:'',
        sku_stock:'',
        sku_code:''
      }
      }
    },
    methods:{
      onSubmit() {
        this.form.sku=JSON.stringify(this.skulist)
        this.form.image=JSON.stringify(this.fileList)
        editproduct(this.form)
        this.$message('修改成功!')
        this.$router.push('/shop/product')
      },
      onCancel() {
        this.$message({
          message: '取消!',
          type: 'warning'
        })
        this.$router.push('/shop/product')
      },
      addsku(){
        if(this.skuObj[this.sku.type]){
          this.skuObj[this.sku.type].push(this.sku)
        }
        else{
          this.$set(this.skuObj,this.sku.type,[])
          this.skuObj[this.sku.type].push({...this.sku})
        }
      },
      delsku(data){
        // this.skulist.forEach((item,index)=>{
        //   if(item.sku_code==data){
        //     this.skulist.splice(index, 1)
        //   }
        // })
      },
      uploadSuccess(res){
        this.fileList.push({name:res.data.originName,filename:res.data.filename,url:base+'/static/upload/'+res.data.filename})
      },
      uploadRemove(a,b){
      
        let remove=a.filename
        let arr=[]
        this.fileList.forEach((item)=>{
          if(item.filename!=a.filename){
            arr.push(item)
          }
        })
        this.fileList=arr
      }
    },
    computed:{
      skulist:function(){
        let list=[]
        for(let key in this.skuObj)
        {
          for(let item of this.skuObj[key])
          {
            list.push(item)
          }
        }
        return list
      }
    },
    async beforeMount(){
     let res=await categorylist()
      this.categorylist=res.categorylist
      let productid=this.$route.query.id
      let res3=await productinfo({id:productid})
      console.log(res3)
      this.form.productname=res3.productinfo.productname
      this.form.category=res3.productinfo.title
      this.form.price=res3.productinfo.price
      this.fileList=JSON.parse(res3.productinfo.image)
      //让对象变成素组再push解析出来的json对象
      this.skuObj=[]
      this.skuObj.push(JSON.parse(res3.productinfo.sku))
      this.form.content=res3.productinfo.content
      this.form.id=productid
    }
  }
</script>

<style>
</style>
