import { asyncRoutes, constantRoutes } from "@/router";
import { deepClone } from '../../utils/index'
import {serverAsyncRouter} from "../../../mock/role/routesMap"

const clientRoutes = deepClone(asyncRoutes)

/**
 * 通过后台获取的路由表与前端路由表比对合并
 * @param routes asyncRoutes
 * @param roles
 */
export function megerAsyncRoutes(serverRouter, clientRoutes) {
  clientRoutes.map(ele => {
    if (!ele.path) return
    serverRouter.forEach((e) => {
      if (ele.path == e.path && ele.meta) {
        ele.meta.roles = e.meta.roles
      }
    })
    if (ele.children) {
      megerAsyncRoutes(serverRouter, ele.children)
    }
  })
  return clientRoutes
}
let serverRouter = []
function _flatArr(arr) {
  arr.forEach((e) => {
    serverRouter.push({
      meta: e.meta,
      path: e.path
    })
    if (e.children && e.children.length) {
      _flatArr(e.children)
    }
  })
}
_flatArr(serverAsyncRouter)
const addRoutes = megerAsyncRoutes(serverRouter, clientRoutes)
console.log(addRoutes)

/**
 * 判断当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}


const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes;
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(addRoutes, roles);
      }
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
