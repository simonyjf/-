const Base = require('../base.js')
let path =require('path')
let fs=require('fs')
module.exports = class extends Base {

  uploadimgAction(){
	  //获取上传图片的信息
	  let uploadfile=this.file('uploadFile')
	  //获取图片的本地地址
	  let filepath=uploadfile.path
	  //定义上传图片的路径
	  let uploadpath=think.ROOT_PATH+'/www/static/upload'
	  //若没有upload这个文件夹就创建
	  think.mkdir(uploadpath)
	  let basename=path.basename(filepath)
	  //读写流
	  var readStream=fs.createReadStream(filepath)
	  var writeStream=fs.createWriteStream(uploadpath+'/'+basename)
	  readStream.pipe(writeStream)
	  this.success({filename:basename,originName:uploadfile.name})
  }
};
