const Base = require('../base.js')
module.exports = class extends Base {
  __before() {
		return this.checkAuth()
  }
  indexAction(){
	  return this.json({msg:'rule page'})
  }
  async rulelistAction(){
	  let page=this.get('page')?this.get('page'):1;
	  let rulelist =await this.model('auth_rule').order('id').page(page,10).select()
	  let rulecount=await this.model('auth_rule').count();
	  return this.json({rulelist,rulecount})
  }
  async delruleAction(){
	  let ruleid=this.get('id')
	  console.log(ruleid)
	  let res =await this.model('auth_rule').where({id:ruleid}).delete()
	  this.json({msg:"删除权限成功"})
  }
  async addruleAction(){
	  if(this.method=="POST"){
		  let postuser=this.post()
		  await this.model('auth_rule').add({
		  		  desc:postuser.desc,
		  		  name:postuser.name,
		  		  status:postuser.status==true?1:-1
		  })
		  this.json({msg:'添加权限成功'})
	  }
  }
  async editruleAction(){
	  if(this.method=="POST"){
		  let postrule =this.post()
		  await this.model('auth_rule').where({id:postrule.id}).update({
			  desc:postrule.desc,
			  name:postrule.name,
			  //将bool值转化成0或1
			  status:postrule.status==true?1:0
		  })
		  this.json({msg:'修改成功'})
	  }
  }
};
