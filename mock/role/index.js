/**
 * @description mock接口
 * @author devin
 */

import Mock from "mockjs";
import { deepClone } from "../../src/utils/index.js";
import { asyncRoutes, constantRoutes } from "./routes.js";

const routes = deepClone([...constantRoutes, ...asyncRoutes]);
console.log(routes)

const roles = [
  {
    key: 'admin',
    name: '超级管理员',
    description: '超级管理员。可以查看所有页面',
    routes: routes
  },
  {
    key: 'editor',
    name: '编辑',
    description: '可以看到除权限外到页面',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: '游客',
    description: '仅能看到主页和文档页',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

export default [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
