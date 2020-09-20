import request from '@/utils/request'
//用户列表
export function userlist(params) {
  return request({
    url: '/admin/user/userlist',
    method: 'get',
    //params传参
    params
  })
}
//删除用户
export function deluser(params) {
  return request({
    url: '/admin/user/deluser',
    method: 'get',
    //params传参
    params
  })
}

//更新用户
export function updateuser(data) {
  return request({
    url: '/admin/user/updateuser',
    method: 'post',
    //这里传数组用data？？
    data:data
  })
}
//添加用户
export function adduser(data) {
  return request({
    url: '/admin/user/adduser',
    method: 'post',
    //这里传数组用data？？
    data:data
  })
}
//根据id查询用户信息
export function userinfo(data) {
  return request({
    url: '/admin/user/userinfo',
    method: 'get',
    //params传参
    params:data
  })
}
//角色列表
export function rolelist(data) {
  return request({
    url: '/admin/role/rolelist',
    method: 'get',
    //params传参
    params:data
  })
}

//添加角色
export function addrole(data) {
  return request({
    url: '/admin/role/addrole',
    method: 'post',
    //这里传数组用data？？
    data:data
  })
}

//删除角色
export function delrole(params) {
  return request({
    url: '/admin/role/delrole',
    method: 'get',
    //这里传数组用data？？
    params
  })
}

//修改角色
export function editrole(data) {
  return request({
    url: '/admin/role/editrole',
    method: 'post',
    data:data
  })
}

//权限列表
export function rulelist(data) {
  return request({
    url: '/admin/rule/rulelist',
    method: 'get',
    //params传参
    params:data
  })
}

//添加权限
export function addrule(data) {
  return request({
    url: '/admin/rule/addrule',
    method: 'post',
    //这里传数组用data？？
    data:data
  })
}
//删除权限
export function delrule(params) {
  return request({
    url: '/admin/rule/delrule',
    method: 'get',
    //这里传数组用data？？
    params
  })
}
//修改权限
export function editrule(data) {
  return request({
    url: '/admin/rule/editrule',
    method: 'post',
    data:data
  })
}
