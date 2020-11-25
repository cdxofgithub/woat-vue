export default [
  // user login
  {
    url: "/admin/login",
    type: "post",
    response: () => {
      return {
        "code": 0,
        "message": "登录成功！",
        "data": {
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYmVpbmdtYXRlLnRlc3QvYWRtaW4vbG9naW4iLCJpYXQiOjE2MDYxMTczNzQsImV4cCI6MTYwNjEyMDk3NCwibmJmIjoxNjA2MTE3Mzc0LCJqdGkiOiJabGdZTHJpbUpBcWxzVjEyIiwic3ViIjoxLCJwcnYiOiI5NDJhOWRmOWQ5NmNjMDcwNjliNTMzMjJkMGM2OWI2MjAwMWNiNGY4In0.7f22mHLqVujcOXBiXttfi_ZOeKwg5e2YmsNeyP8zUfM",
            "expires_in": 3600
        }
      }
    }
  },

  // get user info
  {
    url: "/admin/admin_info",
    type: "get",
    response: () => {
      return {
        "code": 0,
        "message": "成功！",
        "data": {
            "id": 2,
            "admin_name": "jhin",
            "mobile": "17610108101",
            "head_img": "http://192.168.0.17:8001/storage/admin_head.jpeg",
            "last_login_at": "2020-11-25 18:13:09",
            "last_login_ip": "192.168.0.17"
        }
      }
    }
  },

  // user logout
  {
    url: "/admin/logout",
    type: "get",
    response: () => {
      return {
        "code": 0,
        "message": "登出成功！",
        "data": ""
      }
    }
  }
];
