"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Rect",
  props: {
    upWords: {},
    downWords: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.upWords),
        b: common_vendor.t(__props.downWords)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2bfe600b"], ["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/components/fight/Rect.vue"]]);
wx.createComponent(Component);
