"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "rankItem",
  props: {
    rankNum: {},
    avatar_url: {},
    integral: {},
    nickname: {}
  },
  setup(__props) {
    const props = __props;
    const {
      state
    } = common_vendor.useStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.rankNum),
        b: `url(${common_vendor.unref(state).baseUrl + common_vendor.unref(state).tittleList[props.rankNum < 4 ? props.rankNum : 3]})`,
        c: __props.avatar_url,
        d: common_vendor.t(__props.nickname),
        e: common_vendor.t(__props.integral)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d27437b7"], ["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/components/ranks/rankItem.vue"]]);
wx.createComponent(Component);
