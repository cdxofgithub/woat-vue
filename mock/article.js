const Mock = require("mockjs");

const List = [];
const count = 100;

const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
const image_uri =
  "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      author: "@first",
      reviewer: "@first",
      title: "@title(5, 10)",
      content_short: "mock data",
      content: baseContent,
      forecast: "@float(0, 100, 2, 2)",
      importance: "@integer(1, 3)",
      "type|1": ["CN", "US", "JP", "EU"],
      "status|1": ["published", "draft"],
      display_time: "@datetime",
      comment_disabled: true,
      pageviews: "@integer(300, 5000)",
      image_uri,
      platforms: ["a-platform"]
    })
  );
}

module.exports = [
  {
    url: "/admin/opus_list",
    type: "get",
    response: () => {
      return {
        data: [
          {
            user_code: "A1234",
            like_num: 10,
            status: "未通过",
            reviewer: "devin",
            review_at: "2020-11-25 13:44:00",
            updated_at: "2020-11-25 19:19:32",
            created_at: "2020-11-25 13:44:03",
            attachments: {
              attachment_name: "最美妈妈",
              attachment_type: "jpg",
              attachment_path:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606293243518&di=9d40942a2e5fb48e79bd6a73d7714902&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F19%2F03%2F20%2F64574470bc74dd6b64216128f81f4ae6.jpg",
              updated_at: "2020-11-25 13:47:08",
              created_at: "2020-11-25 13:47:06"
            }
          }
        ],
        links: {
          first: "http://192.168.0.17:8001/admin/opus_list?page=1",
          last: "http://192.168.0.17:8001/admin/opus_list?page=1",
          prev: null,
          next: null
        },
        meta: {
          current_page: 1,
          from: 1,
          last_page: 1,
          path: "http://192.168.0.17:8001/admin/opus_list",
          per_page: 50,
          to: 1,
          total: 1
        },
        code: 0,
        message: "成功"
      };
    }
  },

  {
    url: "/vue-element-admin/article/detail",
    type: "get",
    response: config => {
      const { id } = config.query;
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 0,
            data: article
          };
        }
      }
    }
  },

  {
    url: "/vue-element-admin/article/pv",
    type: "get",
    response: () => {
      return {
        code: 0,
        data: {
          pvData: [
            { key: "PC", pv: 1024 },
            { key: "mobile", pv: 1024 },
            { key: "ios", pv: 1024 },
            { key: "android", pv: 1024 }
          ]
        }
      };
    }
  },

  {
    url: "/vue-element-admin/article/create",
    type: "post",
    response: () => {
      return {
        code: 0,
        data: "success"
      };
    }
  },

  {
    url: "/vue-element-admin/article/update",
    type: "post",
    response: () => {
      return {
        code: 0,
        data: "success"
      };
    }
  }
];
