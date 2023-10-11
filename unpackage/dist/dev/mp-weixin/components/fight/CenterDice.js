"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "CenterDice",
  props: {
    diceList: {
      default: Array(5).fill(0)
    }
  },
  setup(__props) {
    const { state } = common_vendor.useStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.diceList, (v, i, i0) => {
          return common_vendor.e({
            a: i % 2 == 1
          }, i % 2 == 1 ? {
            b: v > 0 ? common_vendor.unref(state).diceImgUrls[v - 1] : ""
          } : {}, {
            c: i
          });
        }),
        b: common_vendor.f(__props.diceList, (v, i, i0) => {
          return common_vendor.e({
            a: i % 2 == 0
          }, i % 2 == 0 ? {
            b: common_vendor.unref(state).diceImgUrls[v - 1]
          } : {}, {
            c: i
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fd577d0a"], ["__file", "D:/Myecharts/wx/WeChat_app/All_in_or_nothing/components/fight/CenterDice.vue"]]);
wx.createComponent(Component);
