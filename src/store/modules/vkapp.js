import mixin from "../../assets/mixin/index";

export default {
  actions: {
    vkInitTest: function(ctx) {
      ctx.commit("updateVkUserData", {
        id: 153928371,
        first_name: "Константин",
        last_name: "Смоквин",
        is_closed: true,
        can_access_closed: true,
        test: true
      });
      ctx.commit("updateVkAppData", {
        vk_access_token_settings: "notify",
        vk_app_id: "7297645",
        vk_are_notifications_enabled: "0",
        vk_group_id: "189901953",
        vk_is_app_user: "1",
        vk_is_favorite: "0",
        vk_language: "ru",
        vk_platform: "desktop_web",
        vk_ref: "other",
        vk_user_id: "153928371",
        vk_viewer_group_role: "admin",
        sign: "JUPZJAo6rDP_SF-mnGxMKMu_oU5zDa2XftG9QbqYDII"
      });
      ctx.commit("updateVkGroupData", {
        id: 189901953,
        name: "CalcMe",
        screen_name: "calcme",
        is_closed: 0,
        type: "page",
        photo_50: "https://vk.com/images/community_50.png?ava=1",
        photo_100: "https://vk.com/images/community_100.png?ava=1",
        photo_200: "https://vk.com/images/community_200.png?ava=1"
      });
    },
    vkInit: function(ctx) {
      if (window.name.substr(0, 2) === "fX") {
        document.body.classList = "vkapp";
        ctx.dispatch("updateVkAppData").then(function() {
          window.VK.init(
            function() {
              console.log("VK init success");
              if (ctx.getters.vkApp.vk_group_id) {
                ctx.dispatch("updateVkGroupData");
              }
              if (ctx.getters.vkApp.vk_user_id) {
                ctx.dispatch("updateVkUserData");
              }
            },
            function() {
              console.log("VK init failed");
            },
            "5.103"
          );
        });
      }
    },
    updateVkGroupData: async function(ctx) {
      window.VK.api(
        "groups.getById",
        {
          group_id: ctx.getters.vkApp.vk_group_id,
          access_token: ctx.getters.vkAppServiceToken
        },
        function(data) {
          console.log("groups.getById", data);
          if (data.response) {
            ctx.commit("updateVkGroupData", data.response[0]);
          }
        }
      );
    },
    updateVkUserData: async function(ctx) {
      window.VK.api(
        "users.get",
        {
          user_ids: ctx.getters.vkApp.vk_user_id,
          fields: "photo_100",
          access_token: ctx.getters.vkAppServiceToken
        },
        function(data) {
          if (data.response) {
            ctx.commit("updateVkUserData", data.response[0]);
          }
        }
      );
    },
    updateVkAppData: function(ctx) {
      ctx.commit("updateVkAppData", mixin.getQueryParams());
    },
    vkWallPost: function(ctx, data = {}, callback) {
      let vkGroupId = ctx.getters.vkGroupId;
      if (!data.v) data.v = "5.103";
      if (!data.owner_id) data.owner_id = "-" + vkGroupId;

      if (!vkGroupId) {
        console.error(
          "Добавление поста невозможно, так как не определён vkGroupId"
        );
        return false;
      }

      if (!callback) {
        callback = d => {
          console.log(d);
        };
      }
      console.log(data);

      window.VK.api("wall.post", data, callback);
    }
  },
  mutations: {
    updateVkAppData: function(state, vkAppData) {
      state.vkApp = vkAppData;
      // console.log("vkAppData", vkAppData);
    },
    updateVkGroupData: function(state, vkGroupData) {
      state.vkGroup = vkGroupData;
      // console.log("vkGroupData", vkGroupData);
    },
    updateVkUserData: function(state, vkUserData) {
      state.vkUser = vkUserData;
      // console.log("vkGroupData", vkGroupData);
    }
  },
  state: {
    vkAppServiceToken:
      "bbdf1f1ebbdf1f1ebbdf1f1ef4bbb04573bbbdfbbdf1f1ee5f02c51945d6a021daae909",
    vkApp: {},
    vkGroup: {},
    vkUser: {}
  },
  getters: {
    vkAppServiceToken(state) {
      return state.vkAppServiceToken;
    },
    vkApp(state) {
      return state.vkApp;
    },
    vkGroup(state) {
      return state.vkGroup;
    },
    vkUser(state) {
      return state.vkUser;
    },
    vkUserId(state) {
      return state.vkUser.id;
    },
    vkAppId(state) {
      return state.vkApp.vk_app_id;
    },
    vkGroupId(state) {
      return state.vkGroup.id;
    },
    isVkGroupAdmin(state) {
      console.log(state);
      return true;
    }
  }
};
