import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import HelloWorld from '@/components/HelloWorld'
import a from '@/components/a'
import b from '@/components/b'
import c from '@/components/c'
import d from '@/components/d'
import login from '@/login/login'
import register from '@/register/register'

import home from '@/home/home'
import userInformation from '@/userInformation/userInformation'
import UpdateInformation from '@/userInformation/UpdateInformation'
import UpdatePassword from '@/userInformation/UpdatePassword'
import attendanceSet from '@/userInformation/attendanceSet'

import systemInformation from '@/systemInformation/systemInformation'
import accommodation from '@/systemInformation/accommodation'
import attendance from '@/systemInformation/attendance'
import basicInformation from '@/systemInformation/basicInformation'
import aflowSetting from '@/systemInformation/aflowSetting'
import resultSet from '@/systemInformation/resultSet'
import processDisplay from '@/systemInformation/processDisplay'
import designCenter from '@/systemInformation/designCenter'
import design from '@/systemInformation/design'

import statistics from '@/statistics/statistics'
import attendanceResult from '@/statistics/attendanceResult'
import salary from '@/statistics/salary'
import sign from '@/statistics/sign'
import staff from '@/statistics/staff'

import competence from '@/competence/competence'
import describe from '@/competence/describe'
import updateCompetence from '@/competence/updateCompetence'
import competenceGroup from '@/competence/competenceGroup'
import workOvertime from '@/competence/workOvertime'
import hoilday from '@/competence/hoilday'



import attendanceInformation from '@/attendanceInformation/attendanceInformation'
import myattendance from '@/attendanceInformation/myattendance'
import { format } from 'url';

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: { index: 1 }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { index: 1 }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: { index: 1 }
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { index: 24 }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: { index: 24 },
      children: [
        {
          path: '/userInformation',
          name: 'userInformation',
          component: userInformation,
          meta: { index: 21 },
          children: [
            {
              path: 'UpdateInformation',
              component: UpdateInformation,
              meta: { index: 2 },
            },
            {
              path: 'UpdatePassword',
              component: UpdatePassword,
              meta: { index: 22 },
            },
            {
              path: 'attendanceSet',
              component: attendanceSet,
              meta: { index: 2 },
            },
          ]
        },
        {
          path: '/systemInformation',
          name: 'systemInformation',
          component: systemInformation,
          meta: { index: 12 },
          children: [
            {
              path: 'accommodation',
              component: accommodation,
              meta: { index: 2 },
            },
            {
              path: 'attendance',
              component: attendance,
              meta: { index: 22 },
            },
            {
              path: 'basicInformation',
              component: basicInformation,
              meta: { index: 22 },
            },
            {
              path: 'resultSet',
              component: resultSet,
              meta: { index: 22 },
            },
            {
              path: 'aflowSetting',
              component: aflowSetting,
              meta: { index: 22 },
            },
            {
              path: 'processDisplay',
              component: processDisplay,
              meta: { index: 2 },
            },
            {
              path: 'designCenter',
              component: designCenter,
              meta: { index: 22 },
            },
            {
              path: 'design',
              component: design,
              meta: { index: 22 },
            }
          ]
        },
        {
          path: '/statistics',
          name: 'statistics',
          component: statistics,
          meta: { index: 32 },
          children: [
            {
              path: 'attendanceResult',
              component: attendanceResult,
              meta: { index: 2 },
            },
            {
              path: 'salary',
              component: salary,
              meta: { index: 22 },
            },
            {
              path: 'sign',
              component: sign,
              meta: { index: 2 },
            },
            {
              path: 'staff',
              component: staff,
              meta: { index: 22 },
            },
          ]
        },
        {
          path: '/competence',
          name: 'competence',
          component: competence,
          meta: { index: 62 },
          children: [
            {
              path: 'updateCompetence',
              component: updateCompetence,
              meta: { index: 2 },
            },
            {
              path: 'describe',
              component: describe,
              meta: { index: 22 },
            },
            {
              path: 'competenceGroup',
              component: competenceGroup,
              meta: { index: 22 },
            },
            {
              path: 'workOvertime',
              component: workOvertime,
              meta: { index: 22 },
            },
            {
              path: 'hoilday',
              component: hoilday,
              meta: { index: 22 },
            }
          ]
        },
        {
          path: '/attendanceInformation',
          name: 'attendanceInformation',
          component: attendanceInformation,
          meta: { index: 26 },
          children: [
            {
              path: 'myattendance',
              component: myattendance,
              meta: { index: 2 },
            }
          ]
        },
        {
          path: '/a',
          name: 'a',
          component: a,
          children: [
            {
              path: 'c',
              component: c
            },
            {
              path: 'd',
              component: d
            }
          ]
        },
        {
          path: '/b',
          name: 'b',
          component: b
        }
      ]
    },
    
  ]
})

let fAuth = [] //管理员用户有权访问的页面
let sAuth = ["/userInformation/UpdatePassword","/systemInformation/processDisplay","/attendanceInformation/myattendance","/login","/userInformation","/systemInformation","/attendanceInformation"] //普通用户有权访问的页面
let set = new Set(sAuth);
let hasLogin = false //判断是否登陆过
router.beforeEach((to, from, next) => {
  console.log(to.path+"-"+from.path);
  if (document.cookie.includes('JSESSIONID')) {
    hasLogin = true
    console.log(set.has(to.path)||store.state.user.role.length===3);
    if(set.has(to.path)||store.state.user.role.length===3){
      next();console.log(1111)}
    else{console.log(333);
      next({path: from.path})}
  }
  else{
    if (to.path === '/login') { // 如果是登录页面路径，就直接next()
      next()
    }
    else{
      if (hasLogin){
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie = "userName" + "=1;expires="+exp.toGMTString();
      }
      next({path: '/login'})
    }
  }
})

export default router