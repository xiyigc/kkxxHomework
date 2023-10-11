"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "LilDiceList",
  props: {
    diceList: {},
    lockerList: {}
  },
  setup(__props) {
    const {
      state
    } = common_vendor.useStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.diceList, (v, idx, i0) => {
          return common_vendor.e({
            a: v ? common_vendor.unref(state).diceImgUrls[v - 1] : ""
          }, __props.lockerList ? {
            b: __props.lockerList[idx]
          } : {}, {
            c: idx
          });
        }),
        b: __props.lockerList
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-155b9aec"], ["__file", "D:/Myecharts/wx/WeChat_app/All_in_or_nothing/components/ranks/LilDiceList.vue"]]);
wx.createComponent(Component);
