const jsonwebtoken=require('jsonwebtoken')
module.exports = class extends think.Controller {
  __before() {

  }
  checkAuth(){
	  let token=this.ctx.headers['x-token']
	  const{secret,cookie,exipre}=this.config('jwt')
	  try{
	  	var tokenObj=token? jsonwebtoken.verify(token,secret):{}
		this.ctx.state.user.name=tokenObj.name
	  }catch(e){
	  	//TODO handle the exception
		return this.authFail()
	  }
	  if(!tokenObj.name){
		  return this.authFail()
	  }
	  //更新口令持续时间
	  this.updateAuth(token.name)
  }
  //校验失败函数
  authFail(){
	 this.json({msg:'校验失败'})
	 return false  
  }
  //延长口令持续时间函数
  updateAuth(username){
	  const userInfo={
		  name:username
	  }
	  //获取jwt的配置信息
	  const{secret,cookie,exipre}=this.config('jwt')
	  const token=jsonwebtoken.sign(userInfo,secret,{expiresIn:exipre})
	  this.cookie(cookie,token);
	  this.header('authoriztion',token);
	  return token;
  }
};
