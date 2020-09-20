const Base = require('../base.js')
module.exports = class extends Base {
  __before() {
		return this.checkAuth()
  }
  indexAction(){
	  return this.json({msg:'admin page'})
  }
  async rolelistAction(){
	  let page=this.get('page')?this.get('page'):1;
	  let rolelist =await this.model('auth_role').order('id').page(page,10).select()
	  let rolecount=await this.model('auth_role').count();
	  return this.json({rolelist,rolecount})
  }
  async delroleAction(){
	  let roleid=this.get('id')
	  console.log(roleid)
	  let res =await this.model('auth_role').where({id:roleid}).delete()
	  this.json({msg:"删除角色成功"})
  }
  async addroleAction(){
	  let postrole=this.post()
	  console.log(postrole)
	  if(this.method=='POST')
	  {
		  this.model('auth_role').add({
			  desc:postrole.desc,
			  rule_ids:postrole.rule_ids,
			  status:1
		  })
		  this.json({msg:'添加角色成功'})
	  }
  }
  async editroleAction(){
	  let postrole=this.post()
	  if(this.method=="POST")
	  {
		  this.model('auth_role').where({id:postrole.id}).update({
			  desc:postrole.desc,
			  rule_ids:postrole.rule_ids,
			  status:1
		  })
		  this.json({msg:'修改角色成功'})
	  }
  }
};
