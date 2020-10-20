const Base = require('../base.js')
module.exports = class extends Base {
  __before() {
		return this.checkAuth()
  }
  indexAction(){
	  return this.json({msg:'category page'})
  }
  async categorylistAction(){
	  let page=this.get('page')?this.get('page'):1;
	  let categorylist =await this.model('category').order('id').page(page,10).select()
	  let categorycount=await this.model('category').count();
	  return this.json({categorylist,categorycount})
  }
  async delcategoryAction(){
	  let categoryid=this.get('id')
	  let res =await this.model('category').where({id:categoryid}).delete()
	  this.json({msg:"删除商品分类成功"})
  }
  async addcategoryAction(){
	  let postcategory=this.post()
	  if(this.method=='POST')
	  {
		  this.model('category').add({
			  title:postcategory.title,
			  name:postcategory.title,
			  status:1
		  })
		  this.json({msg:'添加商品分类成功'})
	  }
  }
  async editcategoryAction(){
	  let postcategory=this.post()
	  if(this.method=="POST")
	  {
		  this.model('category').where({id:postcategory.id}).update({
			  name:postcategory.title,
			  title:postcategory.title,
			  status:1
		  })
		  this.json({msg:'修改分类成功'})
	  }
  }
};
