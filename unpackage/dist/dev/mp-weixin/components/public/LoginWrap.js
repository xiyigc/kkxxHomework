"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "LoginWrap",
  props: {
    submit_userinfo: {},
    onChooseAvatar: {},
    headimg: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: __props.headimg,
        b: common_vendor.o((...args) => __props.onChooseAvatar && __props.onChooseAvatar(...args)),
        c: common_vendor.o((...args) => __props.submit_userinfo && __props.submit_userinfo(...args))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-342c4f91"], ["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/components/public/LoginWrap.vue"]]);
wx.createComponent(Component);
