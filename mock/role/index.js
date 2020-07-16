// import Mock from "mockjs";
import { deepClone } from "../../src/utils/index.js";
import { asyncRoutes, constantRoutes } from "./routes.js";

const routes = deepClone([...constantRoutes, ...asyncRoutes]);

export default [
  // mock get all routes form server
  {
    url: "/vue-element-admin/routes",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: routes
      };
    }
  }
];
