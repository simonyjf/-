import request from '@/utils/request'

export function categorylist(params) {
  return request({
    url: '/shop/category/categorylist',
    method: 'get',
    //params传参
    params
  })
}

export function delcategory(params) {
  return request({
    url: '/shop/category/delcategory',
    method: 'get',
    //params传参
    params
  })
}

export function addcategory(data) {
  return request({
    url: '/shop/category/addcategory',
    method: 'post',
    //params传参
    data:data
  })
}

export function editcategory(data) {
  return request({
    url: '/shop/category/editcategory',
    method: 'post',
    //params传参
    data:data
  })
}

export function productlist(params) {
  return request({
    url: '/shop/product/productlist',
    method: 'get',
    //params传参
    params
  })
}

export function delproduct(params) {
  return request({
    url: '/shop/product/delproduct',
    method: 'get',
    //params传参
    params
  })
}

export function addproduct(data) {
  return request({
    url: '/shop/product/addproduct',
    method: 'post',
    //params传参
    data
  })
}

export function editproduct(data) {
  return request({
    url: '/shop/product/editproduct',
    method: 'post',
    //params传参
    data
  })
}

export function productinfo(params) {
  return request({
    url: '/shop/product/productinfo',
    method: 'get',
    //params传参
    params
  })
}
