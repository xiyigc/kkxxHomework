"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (Navi + BackGround)();
}
const BackGround = () => "../../components/public/BackGround.js";
const Navi = () => "../../components/public/navi_top.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const data = common_vendor.reactive({
      pageNum: 1
    });
    function back() {
      common_vendor.index.navigateBack();
    }
    function pageChange(action) {
      if (action)
        data.pageNum = (data.pageNum + 1) % 3 + 1;
      else
        data.pageNum = (data.pageNum + 3) % 3 + 1;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(back),
        b: common_vendor.p({
          opacity: true
        }),
        c: common_vendor.f([1, 2, 3], (v, k0, i0) => {
          return {
            a: v,
            b: v == data.pageNum,
            c: `https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/detail${v}.png`
          };
        }),
        d: common_vendor.o(($event) => pageChange(true)),
        e: common_vendor.o(($event) => pageChange(false)),
        f: common_vendor.p({
          bgUrl: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/detailBack.png"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-77240552"], ["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/subpkg/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
