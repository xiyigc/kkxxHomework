"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (Navi + UserItem + Avatar + DiceCenter + Rect + DiceList + DicePlace + BackGround)();
}
const BackGround = () => "../public/BackGround.js";
const Navi = () => "../public/navi_top.js";
const UserItem = () => "../public/UserItem.js";
const DiceCenter = () => "./CenterDice.js";
const DicePlace = () => "./DicePlace.js";
const DiceList = () => "./DiceList.js";
const Rect = () => "./Rect.js";
const Avatar = () => "./Avatar.js";
const _sfc_main = {
  __name: "FightPage",
  props: {
    start: {},
    dataParent: {},
    toMask: {}
  },
  setup(__props) {
    const props = __props;
    const {
      state
    } = common_vendor.useStore();
    common_vendor.useStore();
    const data = common_vendor.reactive({
      padding: {}
    });
    const whichAction = common_vendor.computed(() => {
      if (props.dataParent.action)
        return "开始投掷";
      else
        return "结束操作";
    }), diceListToText = common_vendor.computed(() => {
      try {
        if (props.dataParent.action || props.dataParent.selectMagnification || props.dataParent.gameInfo.onegameEnd)
          throw Error();
        let s = props.dataParent.playerInfo[props.dataParent.gameInfo.activateIndex].diceList.reduce((preValue, current) => {
          if (current == 0)
            return "";
          return preValue + current + " ";
        }, "");
        return s == "" ? "" : s.slice(0, -1);
      } catch (e) {
        return "";
      }
    }), lockedDiceToText = common_vendor.computed(() => {
      try {
        if (props.dataParent.action || props.dataParent.selectMagnification || props.dataParent.gameInfo.onegameEnd)
          throw Error();
        const idx = props.dataParent.gameInfo.activateIndex;
        const lock = props.dataParent.playerInfo[idx].lockerList, dice = props.dataParent.playerInfo[idx].diceList;
        let s = dice.filter((v, i) => lock[i]).reduce((preValue, current) => {
          if (current == 0)
            return "";
          return preValue + current + " ";
        }, "");
        return s == "" ? "" : s.slice(0, -1);
      } catch (e) {
        return "";
      }
    });
    common_vendor.onBeforeMount(async () => {
      data.padding.height = state.phone.bottom + 4 + "px";
    });
    const showAvatar = common_vendor.computed(() => {
      let idx = props.dataParent.gameInfo.activateIndex;
      return props.dataParent.playerInfo[idx].avatar_url;
    }), showNickname = common_vendor.computed(() => {
      let idx = props.dataParent.gameInfo.activateIndex;
      return props.dataParent.playerInfo[idx].nick_name;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          opacity: true,
          padding: true
        }),
        b: common_vendor.s(data.padding),
        c: common_vendor.f(__props.dataParent.playerInfo, (v, i, i0) => {
          return {
            a: i,
            b: "5e3ee8d6-2-" + i0 + ",5e3ee8d6-1",
            c: common_vendor.p({
              chip: v.chip,
              magnification: v.magnification,
              nick_name: v.nick_name,
              avatar_url: v.avatar_url
            })
          };
        }),
        d: common_vendor.t(__props.dataParent.gameInfo.currentGame),
        e: common_vendor.t(__props.dataParent.gameInfo.gameCount),
        f: common_vendor.t(__props.dataParent.gameInfo.round),
        g: common_vendor.t(__props.dataParent.gameInfo.roundCount),
        h: common_vendor.t(__props.dataParent.gameInfo.totalMagnification),
        i: common_vendor.p({
          customStyleAvatar: {
            width: "60px",
            height: "60px"
          },
          customStyleName: {
            height: "20px",
            fontSize: "11px",
            lineHeight: "19px"
          },
          avatar_url: common_vendor.unref(showAvatar),
          nick_name: common_vendor.unref(showNickname)
        }),
        j: common_vendor.p({
          diceList: __props.dataParent.randomDice
        }),
        k: common_vendor.p({
          upWords: "投掷",
          downWords: "区域"
        }),
        l: common_vendor.p({
          maskById: __props.toMask,
          idx: __props.dataParent.gameInfo.activateIndex,
          mode: 1,
          maskList: __props.dataParent.maskList,
          playerInfo: __props.dataParent.playerInfo
        }),
        m: common_vendor.p({
          customStyle: {
            top: "216px"
          }
        }),
        n: common_vendor.p({
          idx: __props.dataParent.gameInfo.activateIndex,
          mode: 2,
          maskList: __props.dataParent.maskList,
          playerInfo: __props.dataParent.playerInfo
        }),
        o: common_vendor.p({
          upWords: "锁定",
          downWords: "区域"
        }),
        p: common_vendor.p({
          customStyle: {
            top: "306px"
          }
        }),
        q: common_vendor.t(common_vendor.unref(diceListToText)),
        r: common_vendor.t(common_vendor.unref(lockedDiceToText)),
        s: common_vendor.t(__props.dataParent.gameInfo.totalMagnification),
        t: common_vendor.t(common_vendor.unref(whichAction)),
        v: common_vendor.o((...args) => __props.start && __props.start(...args)),
        w: common_vendor.p({
          bgUrl: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/fightBg.png"
        }),
        x: common_vendor.f(common_vendor.unref(state).diceImgUrls, (v, i, i0) => {
          return {
            a: v,
            b: i
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5e3ee8d6"], ["__file", "D:/Myecharts/wx/WeChat_app/All_in_or_nothing/components/fight/FightPage.vue"]]);
wx.createComponent(Component);
