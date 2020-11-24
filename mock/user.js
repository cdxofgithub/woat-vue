const tokens = {
  admin: {
    token: "admin-token"
  },
  editor: {
    token: "editor-token"
  }
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin"
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor"
  }
};

export default [
  // user login
  {
    url: "/admin/login",
    type: "post",
    response: config => {
      const { admin_name } = config.body;
      const token = tokens[admin_name];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "Account and password are incorrect."
        };
      }

      return {
        code: 0,
        data: token
      };
    }
  },

  // get user info
  {
    url: "/admin/admin_info",
    type: "get",
    response: config => {
      console.log(config.query)
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: -1,
          message: "token已失效，请重新登陆"
        };
      }

      return {
        code: 0,
        data: info
      };
    }
  },

  // user logout
  {
    url: "/admin/logout",
    type: "get",
    response: () => {
      return {
        code: 0,
        data: "success"
      };
    }
  }
];
