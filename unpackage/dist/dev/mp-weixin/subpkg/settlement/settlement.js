"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (CustomImage + GgRanks + BackGround)();
}
const BackGround = () => "../../components/public/BackGround.js";
const CustomImage = () => "../../components/public/CustomImage.js";
const GgRanks = () => "../../components/ranks/ggRanks.js";
const _sfc_main = {
  __name: "settlement",
  setup(__props) {
    common_vendor.useStore();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          customStyle: {
            width: "270px",
            backgroundRepeat: "no-repeat",
            height: "85px"
          },
          bgUrl: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/gameover.png"
        }),
        b: common_vendor.p({
          customStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          },
          bgUrl: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/settlementWrap.png"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/subpkg/settlement/settlement.vue"]]);
wx.createPage(MiniProgramPage);
