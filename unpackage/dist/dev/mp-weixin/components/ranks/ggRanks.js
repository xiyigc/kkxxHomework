"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  CustomImage();
}
const CustomImage = () => "../public/CustomImage.js";
const _sfc_main = {
  __name: "ggRanks",
  setup(__props) {
    const {
      state,
      commit
    } = common_vendor.useStore(), goback = () => {
      commit("resetPlayerRanks");
      common_vendor.index.navigateTo({
        url: "/subpkg/main/main"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(state).playerRanks, (item, idx, i0) => {
          return {
            a: "0466e97e-0-" + i0,
            b: common_vendor.p({
              bgUrl: common_vendor.unref(state).baseUrl + common_vendor.unref(state).tittleList[idx < 4 ? idx : 3],
              text: idx + 1,
              customStyle: {
                height: "60px",
                width: "60px",
                lineHeight: "60px",
                color: "rgba(255,255,255,.8)"
              }
            }),
            c: "0466e97e-1-" + i0,
            d: common_vendor.p({
              customStyle: {
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                overFlow: "hidden",
                boreder: "5px solid #efefef"
              },
              bgUrl: item.avatar_url
            }),
            e: common_vendor.t(item.nick_name),
            f: common_vendor.t(item.chip),
            g: idx
          };
        }),
        b: common_vendor.o(goback)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0466e97e"], ["__file", "D:/Myecharts/wx/WeChat_app/All_in_or_nothing/components/ranks/ggRanks.vue"]]);
wx.createComponent(Component);
