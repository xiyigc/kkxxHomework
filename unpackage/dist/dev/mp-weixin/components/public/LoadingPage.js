"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  BackGround();
}
const BackGround = () => "./BackGround.js";
const _sfc_main = {
  __name: "LoadingPage",
  props: {
    progress: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(__props.progress),
        b: common_vendor.p({
          customStyle: {
            zIndex: "100"
          },
          bgUrl: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/jiazai.png"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a0f320"], ["__file", "D:/Myecharts/wx/WeChat_app/All_in_or_nothing/components/public/LoadingPage.vue"]]);
wx.createComponent(Component);
