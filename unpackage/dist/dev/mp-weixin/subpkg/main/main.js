"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_van_icon = common_vendor.resolveComponent("van-icon");
  _component_van_icon();
}
if (!Math) {
  (Navi + CustomImage + BackGround)();
}
const Navi = () => "../../components/public/navi_top.js";
const BackGround = () => "../../components/public/BackGround.js";
const CustomImage = () => "../../components/public/CustomImage.js";
const _sfc_main = {
  __name: "main",
  setup(__props) {
    const data = common_vendor.reactive({
      select: false,
      choice: 0,
      gameCount: 1,
      playerCount: 2,
      chip: 2
    });
    common_vendor.useStore();
    function goto(path, payload) {
      common_vendor.index.navigateTo({
        url: `/subpkg${path}?${payload}`
      });
    }
    const selectMode = (action) => {
      data.choice = action;
      data.select = true;
    };
    function back() {
      data.choice = 0;
      data.gameCount = 1;
      data.playerCount = 2;
      data.chip = 2;
      data.select = false;
    }
    const controlInfo = (gameOrPlayer, action) => {
      if (gameOrPlayer) {
        if (action == -1 && data.gameCount == 1 || action == 1 && data.gameCount == 9)
          return;
        else
          data.gameCount += action;
      } else {
        if (action == -1 && data.playerCount == 2 || action == 1 && data.playerCount == 4)
          return;
        else
          data.playerCount += action;
      }
    };
    const startGame = () => {
      goto(
        "/fight/fight",
        `chip=${data.chip}&roundCount=3&mode=${data.choice}&gameCount=${data.gameCount}&playerCount=${data.playerCount}&totalMagnification=1`
      );
    }, addOrMinusChip = (chioce) => {
      if (chioce && data.chip <= 10 || !chioce && data.chip >= 2)
        data.chip += chioce ? 1 : -1;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(back),
        b: data.select,
        c: common_vendor.p({
          opacity: true
        }),
        d: common_vendor.p({
          customStyle: {
            background: "rgba(255, 245, 255, .2)"
          },
          onTap: goto.bind(this, "/detail/detail"),
          bgUrl: "../../static/images/more.png"
        }),
        e: common_vendor.o(($event) => goto("/rank/rank")),
        f: common_vendor.o(($event) => selectMode(1)),
        g: common_vendor.o(($event) => selectMode(2)),
        h: common_vendor.o(($event) => selectMode(3)),
        i: !data.select,
        j: common_vendor.p({
          bgUrl: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/select.png"
        }),
        k: common_vendor.p({
          customStyle: {
            height: "220px",
            width: "220px"
          },
          bgUrl: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/selectAvatar.png"
        }),
        l: common_vendor.o(($event) => controlInfo(true, -1)),
        m: common_vendor.p({
          name: "minus",
          size: "28",
          color: "#42388B"
        }),
        n: common_vendor.t(data.gameCount),
        o: common_vendor.o(($event) => controlInfo(true, 1)),
        p: common_vendor.p({
          name: "plus",
          size: "28",
          color: "#42388B"
        }),
        q: data.choice == 1
      }, data.choice == 1 ? {
        r: common_vendor.o(($event) => controlInfo(false, -1)),
        s: common_vendor.p({
          name: "minus",
          size: "28",
          color: "#42388B"
        }),
        t: common_vendor.t(data.playerCount),
        v: common_vendor.o(($event) => controlInfo(false, 1)),
        w: common_vendor.p({
          name: "plus",
          size: "28",
          color: "#42388B"
        })
      } : {}, {
        x: common_vendor.o(($event) => addOrMinusChip(false)),
        y: common_vendor.p({
          name: "minus",
          size: "28",
          color: "#42388B"
        }),
        z: common_vendor.t(data.chip),
        A: common_vendor.o(($event) => addOrMinusChip(true)),
        B: common_vendor.p({
          name: "plus",
          size: "28",
          color: "#42388B"
        }),
        C: common_vendor.o(startGame),
        D: data.select,
        E: common_vendor.p({
          customStyle: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          },
          bgUrl: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/selectBg.png"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-27525df0"], ["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/subpkg/main/main.vue"]]);
wx.createPage(MiniProgramPage);
