"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Avatar",
  props: {
    customStyleAvatar: {},
    customStyleName: {},
    avatar_url: {},
    nick_name: {}
  },
  setup(__props) {
    const props = __props;
    function hasChinese(str) {
      const reg = /[\u4e00-\u9fa5]/;
      return reg.test(str);
    }
    common_vendor.reactive({
      nick_name: {}
    });
    const nickName = common_vendor.computed(() => {
      let length = hasChinese(props.nick_name) ? 4 : 7;
      return props.nick_name.substring(0, length);
    });
    return (_ctx, _cache) => {
      return {
        a: __props.avatar_url,
        b: common_vendor.t(common_vendor.unref(nickName)),
        c: common_vendor.s(__props.customStyleName),
        d: common_vendor.s(__props.customStyleAvatar)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d81f2713"], ["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/components/fight/Avatar.vue"]]);
wx.createComponent(Component);
