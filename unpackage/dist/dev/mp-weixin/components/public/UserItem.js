"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  Avatar();
}
const Avatar = () => "../fight/Avatar.js";
const _sfc_main = {
  __name: "UserItem",
  props: {
    customStyle: {},
    avatar_url: {},
    nick_name: {},
    chip: {},
    magnification: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          nick_name: __props.nick_name,
          avatar_url: __props.avatar_url
        }),
        b: common_vendor.t(__props.chip),
        c: common_vendor.t(__props.magnification)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-354af9de"], ["__file", "D:/Myecharts/wx/WeChat_app/All_in_or_nothing/components/public/UserItem.vue"]]);
wx.createComponent(Component);
