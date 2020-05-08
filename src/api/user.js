import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/woat-vue/user/login",
    method: "post",
    data
  });
}

export function getInfo(token) {
  return request({
    url: "/woat-vue/user/info",
    method: "get",
    params: { token }
  });
}

export function logout() {
  return request({
    url: "/woat-vue/user/logout",
    method: "post"
  });
}
