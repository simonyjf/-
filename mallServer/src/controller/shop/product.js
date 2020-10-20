const Base = require('../base.js')
module.exports = class extends Base {
  __before() {
		return this.checkAuth()
  }
  indexAction(){
	  return this.json({msg:'product page'})
  }
  async productlistAction(){
	  let page=this.get('page')?this.get('page'):1;
	  let productlist =await this.model('product').order('id').page(page,10).select()
	  let productcount=await this.model('product').count();
	  return this.json({productlist,productcount})
  }
  async delproductAction(){
	  let productid=this.get('id')
	  let res =await this.model('product').where({id:productid}).delete()
	  this.json({msg:"删除商品成功"})
  }
  async addproductAction(){
	  let postproduct=this.post()
	  if(this.method=='POST')
	  {
		  let res=await this.model('category').where({id:postproduct.category}).find()
		  let categoryName=res.name
		  await this.model('product').add({
			  productname:postproduct.productname,
			  category:postproduct.category,
			  categoryname:categoryName,
			  image:postproduct.image,
			  price:postproduct.price,
			  sku:postproduct.sku,
			  content:postproduct.content,
			  status:1
		  })
		  this.json({msg:'添加商品成功'})
	  }
  }
  async editproductAction(){
	  let postproduct=this.post()
	  console.log(postproduct)
	  if(this.method=="POST")
	  {		
		  let res=await this.model('category').where({id:postproduct.category}).find()
		  let categoryName=res.name
		  console.log(categoryName)
		  await this.model('product').where({id:postproduct.id}).update({
			  productname:postproduct.productname,
			  category:postproduct.category,
			  categoryname:categoryName,
			  image:postproduct.image,
			  price:postproduct.price,
			  sku:postproduct.sku,
			  content:postproduct.content,
			  status:1
		  })
		  this.json({msg:'修改商品成功'})
	  }
  }
  async productinfoAction(){
	  let productid=this.get('id')
	  let productinfo=await this.model('product').where({'cmswing_product.id':productid}).join({
		  table:'category',
		  join:'left',
		  as:'c',
		  on:['cmswing_product.category','c.id']
	  }).find()
	  this.json({productinfo})
  }
};
