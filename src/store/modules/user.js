import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {}
    // userInfo: {
    //   avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    //   name: 'devin'
    // }
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
    state.userInfo = userinfo;
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
      console.log(data)
      commit("SET_TOKEN", data.token);
      setToken(data.token);
      return data.token
    } catch (e) {
      console.log(e);
    }
  },
  async getInfo({ commit, state }) {
    try {
      const { data } = await getInfo(state.token);
      commit("SET_USER", data);
    } catch (e) {
      console.log(e);
    }
  },
  async logout({ commit }) {
    try {
      await logout();
      removeToken();
      resetRouter();
      commit("RESET_STATE");
    } catch (e) {
      console.log(e);
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
