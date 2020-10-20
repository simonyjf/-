const Base = require('../base.js');

module.exports = class extends Base {
  indexAction() {
    return this.json({msg:'ok111'})
  }
  async loginAction(){
	  // console.log(11111)
	  if(this.method=='POST'){
		  //获得用户密码账号
		  let userName=this.post('username')
		  let userPassword=this.post('password')
		  let user=await this.model('member').where({username:userName}).find()
		  console.log(this.verifypassword(userPassword))
		  if(user.password==this.verifypassword(userPassword)){
			  const token=this.updateAuth(userName)
			   this.json({state:'登陆成功',token})
		  }
		  else{
			  return this.json({msg:'登录失败'})
		  }
	  }
  }
  verifypassword(userPassword){
	  return think.md5(think.md5(userPassword)+think.md5('yjf'))
  }
};
