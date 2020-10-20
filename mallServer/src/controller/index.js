const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
	  let a= await this.model().table('member').select()
	  // console.log(a)
	  // return this.json(a)
	  // this.assign(a[0])
    return this.display();
  }
 async goodlistAction() {
 	  let productlist= await this.model().table('product').select()
 	  // console.log(a)
 	  // return this.json(a)
 	  // this.assign(a[0])
   return this.json({productlist})
 }
};
 // async goodlistAction() {
 // 	  let productlist= await this.model().table('producct').select()
 // 	  // console.log(a)
 // 	  // return this.json(a)
 // 	  // this.assign(a[0])
 //   return this.json({productlist})
 // }
