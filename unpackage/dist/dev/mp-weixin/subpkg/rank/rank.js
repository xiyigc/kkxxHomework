"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (Navi + RankItem)();
}
const Navi = () => "../../components/public/navi_top.js";
const RankItem = () => "../../components/ranks/rankItem.js";
const _sfc_main = {
  __name: "rank",
  setup(__props) {
    const data = common_vendor.reactive({
      rankIcon: "../../static/images/rankIcon.png",
      usersArr: [{
        avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/cloudstorage/30caf785-9486-47f6-a3c4-618ffd0f487a.jpg",
        nickname: "陈贝贝冲鸭",
        integral: 500
      }, {
        avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/cloudstorage/30caf785-9486-47f6-a3c4-618ffd0f487a.jpg",
        nickname: "饼小弟",
        integral: 485
      }, {
        avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/avatar/9.png",
        nickname: "欣欣子",
        integral: 366
      }, {
        avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/avatar/4.png",
        nickname: "冲鸭",
        integral: 199
      }]
    });
    function back() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(back),
        b: common_vendor.p({
          opacity: true
        }),
        c: common_vendor.f(data.usersArr, (item, index, i0) => {
          return {
            a: index,
            b: "0efad099-1-" + i0,
            c: common_vendor.p({
              rankNum: index + 1,
              integral: item.integral,
              avatar_url: item.avatar_url,
              nickname: item.nickname
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0efad099"], ["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/subpkg/rank/rank.vue"]]);
wx.createPage(MiniProgramPage);
