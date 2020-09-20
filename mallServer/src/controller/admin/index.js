const Base = require('../base.js')
module.exports = class extends Base {
  __before() {
		return this.checkAuth()
  }
  indexAction(){
	  return this.json({msg:'login page'})
  }
  async userInfoAction(){
	  // console.log(this.ctx.state.user.name)
	  let username=this.ctx.state.user.name;
	  // let user=await this.model('member').where({username:username}).find()
	  let user=await this.model('member').where({
	  		 'cmswing_member.username':username
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
	  // console.log(user)
	  let rulelist=await this.model('auth_rule').select()
	  console.log(rulelist)
	  let filepath=think.ROOT_PATH +'/www/static/image/avatar/avatar'+user.id+'.png'
	  if(think.isFile(filepath)){
		  user.avatar=this.config('hostIpPort')+'static/image/avatar/avatar'+user.id+'.png'
	  }
	  else{
		  user.avatar=this.config('hostIpPort')+'static/image/avatar/avatar.jpg'
	  }
	  return this.json({userinfo:user,rulelist})
  }
};
