const Base = require('../base.js')
module.exports = class extends Base {
  __before() {
		return this.checkAuth()
  }
  indexAction(){
	  return this.json({msg:'usermanage page'})
  }
  async userlistAction(){
	  let page=this.get('page')?this.get('page'):1
	  let userlist=await this.model('member').order('id').page(page,10).select()
	  let usercount=await this.model('member').count();
	  this.json({userlist,usercount})
  }
  async deluserAction(){
	  let userid=this.get('id');
	  await this.model('member').where({id:userid}).delete()
	  this.json({
		  "msg":"删除成功"
	  })
  }
  async userinfoAction(){
	  let userid =this.get('id')
	  //连接3张表查询，通过userid找到member表里的用户信息，在通过member的id找到auth_user_role表的userid对应的那条数据
	  ///在通过role的role_id找到auth_role表的id对应的那条数据
	  let user=await this.model('member').where({
		 'cmswing_member.id':userid
	  }).join({
		  table:"auth_user_role",
		  join:"left",
		  as:'l',
		  on:['cmswing_member.id','l.user_id']
	  }).join({
		  table:'auth_role',
		  join:'left',
		  as:'c',
		  on:['l.role_id','c.id']
	  }).find()
	  // let user=await this.model('member').where({
		 //  id:userid
	  // }).find()
	  this.json({user})
  }
  
  async updateuserAction(){
	  let postuser=this.post()
	  console.log(postuser)
	  if(this.method=="POST"&&postuser.password!=''){
		  // let res =await this.model('member').where({username:postuser.username}).find()
		  // console.log(res)
		  console.log(postuser)
		  await this.model('member').where({id:postuser.userid}).update({
			  password:this.verifypassword(postuser.password),
			  email:postuser.email,
			  mobile:postuser.mobile
		  })
		  let role =await this.model('auth_user_role').where({user_id:postuser.userid}).find()
		  // console.log(role.id)
		  if(role.id){
			  await this.model('auth_user_role').where({user_id:postuser.userid}).update({role_id:postuser.role_id})
		  }
		  else{
			  await this.model('auth_user_role').add({
				  user_id:postuser.userid,
				  role_id:postuser.role_id
			  })
		  }
		  this.json({"msg":"更新成功"})
	  }
	  else{
		  await this.model('member').where({id:postuser.id}).update({
		  			  email:postuser.email,
		  			  mobile:postuser.mobile
		  })
		  let role =await this.model('auth_user_role').where({user_id:postuser.id}).find()
		  if(role.id){
		  			  await this.model('auth_user_role').where({user_id:postuser.id}).update({role_id:postuser.id})
		  }
		  else{
		  			  await this.model('auth_user_role').add({
		  				  user_id:postuser.userid,
		  				  role_id:postuser.role_id
		  			  })
		  }
		  this.json({"msg":"更新成功"})
	  }
  }
	  
  async adduserAction(){
	  let postuser=this.post()
	  // console.log(postuser)
	  let res =await this.model('member').where({username:postuser.username}).find()
	  console.log(res)
	  if(this.method=="POST"&&!res.id)
	  {
		 await this.model('member').add({
			  username:postuser.username,
			  password:this.verifypassword(postuser.password),
			  email:postuser.email,
			  mobile:postuser.mobile,
			  role_id:postuser.role_id,
			  status:1
		  })
		  let user=await this.model('member').where({username:postuser.username}).find()
		  await this.model('auth_user_role').add({
			  user_id:user.id,
			  role_id:postuser.role_id
		  })
		  this.json({msg:"添加成功"})
		  // console.log(123)
	  }
	  else{
		  console.log('该用户名已存在')
		  this.json({msg:"该用户名已存在"})
	  }
  }
  //密码加密
  verifypassword(userPassword){
  	  return think.md5(think.md5(userPassword)+think.md5('yjf'))
  }
};
