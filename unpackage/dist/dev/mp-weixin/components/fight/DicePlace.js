"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "DicePlace",
  props: {
    customStyle: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(__props.customStyle)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-61e3f677"], ["__file", "D:/Myecharts/wx/WeChat_app/All_in_or_nothing/components/fight/DicePlace.vue"]]);
wx.createComponent(Component);
