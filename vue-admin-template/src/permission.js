import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    next()
    // 进度条
    NProgress.done()
    let res=await store.dispatch('user/getInfo')
    let userinfo=res.userinfo
    let rulelist=res.rulelist
    let ruleObj={}
    let ruleStatus={}
    rulelist.forEach((item,index)=>{
      //用item.name作为ruleObj的key值
      ruleObj[item.name]=item.id
      ruleStatus[item.name]=item.status
      // console.log(ruleStatus[item.name])
    })
    let ruleids=userinfo.rule_ids.split(',')
    //判断是否需要权限,这里是判断该权限是否启用，是的话就判断该角色是否拥有权限，不是的话就不需要权限认证，直接可以使用
    if(ruleStatus[to.path]==1){
      //检索素组ruleids素组里是否有权限对应的id,如果为-1的话就是没有
      console.log(ruleStatus[to.path])
      if(ruleids.indexOf(String(ruleObj[to.path]))!=-1){
        next(to.path)
      }
      else{
        next('/admin/dashboard')
        Message({
          message:'您没有该权限',
          type: 'error',
          duration: 3 * 1000
        })
      }
    }
    else{
      next()
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
