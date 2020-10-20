const Base = require('../base.js');

module.exports = class extends Base {
  async indexAction() {
	  let a= await this.model().table('member').select()
	  // console.log(a)
	  // return this.json(a)
	  // this.assign(a[0])
    return this.display();
  }
 async goodlistAction() {
 	  // let productlist= await this.model().table('product').select()
	  let page=this.get('page')?this.get('page'):1;
	  // console.log(data)
	  let productlist =await this.model('product').order('id').page(page,4).select()
   return this.json({productlist})
 }
 async categorylistAction(){
	 let page=this.get('page')?this.get('page'):1;
	 let categorylist =await this.model('category').order('id').page(page,10).select()
	 return this.json({categorylist})
 }
};
