// default config
module.exports = {
  workers: 1,
  jwt:{
	  secret:'yjf',
	  cookie:'jwt-token',
	  exipre:3000//单位秒，口令有效时间
  },
  hostIpPort:'http://localhost:8360/'
};
