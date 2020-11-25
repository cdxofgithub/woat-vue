import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {}
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER(state, userinfo) {
    state.userInfo = {
      avatar: userinfo.head_img,
      name: userinfo.admin_name
    };
  }
};

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    try {
      const { data } = await login({
        admin_name: username.trim(),
        password: password
      });
      commit("SET_TOKEN", data.token);
      setToken(data.token);
      return data.token
    } catch (e) {
      throw new Error(e);
    }
  },
  async getInfo({ commit }) {
    try {
      const { data } = await getInfo();
      commit("SET_USER", data);
    } catch (e) {
      throw new Error(e);
    }
  },
  async logout({ commit }) {
    try {
      await logout();
      removeToken();
      resetRouter();
      commit("RESET_STATE");
    } catch (e) {
      throw new Error(e);
    }
  },
  async resetToken({ commit }) {
    removeToken();
    commit("RESET_STATE");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
