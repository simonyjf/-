const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
	  let a= await this.model().table('member').select()
	  // console.log(a)
	  // return this.json(a)
	  // this.assign(a[0])
    return this.display();
  }
};
