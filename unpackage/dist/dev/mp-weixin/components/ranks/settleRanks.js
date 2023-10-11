"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (Avatar + LilDiceList)();
}
const LilDiceList = () => "./LilDiceList.js";
const Avatar = () => "../fight/Avatar.js";
const _sfc_main = {
  __name: "settleRanks",
  props: {
    needData: {}
    // avatar_url: {},
    // integral: {},
    // nickname: {},
    // diceList: {},
    // winNum: {},
    // chip: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          customStyleAvatar: {
            marginLeft: "18px"
          },
          nick_name: __props.needData.nick_name,
          avatar_url: __props.needData.avatar_url
        }),
        b: common_vendor.t(__props.needData.score),
        c: common_vendor.t(__props.needData.last + __props.needData.winS),
        d: common_vendor.p({
          diceList: __props.needData.diceList
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-30bb55d3"], ["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/components/ranks/settleRanks.vue"]]);
wx.createComponent(Component);
