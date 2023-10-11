"use strict";
const common_vendor = require("../../common/vendor.js");
const subpkg_fight_function = require("./function.js");
const public_module_common = require("../../public_module/common.js");
if (!Array) {
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  (_easycom_uni_data_checkbox2 + _component_van_popup)();
}
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
if (!Math) {
  (Avatar + LilDiceList + _easycom_uni_data_checkbox + SettleRanks + LoadingPage + FightPage)();
}
const FightPage = () => "../../components/fight/FightPage.js";
const LoadingPage = () => "../../components/public/LoadingPage.js";
const Avatar = () => "../../components/fight/Avatar.js";
const SettleRanks = () => "../../components/ranks/settleRanks.js";
const LilDiceList = () => "../../components/ranks/LilDiceList.js";
const _sfc_main = {
  __name: "fight",
  setup(__props) {
    const {
      state,
      commit
    } = common_vendor.useStore(), data = common_vendor.reactive({
      dicing: false,
      randomDice: Array(5).fill(0),
      playerInfo: [],
      gameInfo: {},
      interval: null,
      action: true,
      //true:could do action ,false:could not do action
      maskList: Array(5).fill(false),
      prepared: false,
      selectMagnification: false,
      magnificationList: [],
      progress: {
        width: "10%"
      }
    }), dataPage = common_vendor.reactive({
      magnification: [{
        "text": "不加倍",
        "value": 0
      }, {
        "text": "1倍",
        "value": 1
      }, {
        "text": "2倍",
        "value": 2
      }, {
        "text": "3倍",
        "value": 3
      }],
      loading: false,
      rate: 60
    });
    common_vendor.onLoad(async (option) => {
      commit("resetPlayerRanks");
      const relateInfo = await subpkg_fight_function.getInitRelateInfo(data, dataPage, state, option);
      if (relateInfo.timeout) {
        goto();
      } else {
        data.gameInfo = relateInfo.gameInfo;
        data.playerInfo = relateInfo.playerInfo;
        data.prepared = true;
      }
    });
    const maskById = (diceIdx) => {
      if (data.action)
        return;
      let idx = data.gameInfo.activateIndex;
      if (data.playerInfo[idx].lockerList[diceIdx])
        return;
      data.maskList[diceIdx] = !data.maskList[diceIdx];
    }, nextPlayer = async () => {
      let idx = data.gameInfo.activateIndex;
      data.playerInfo[idx].lockerList = public_module_common.getMasks(
        data.playerInfo[idx].lockerList,
        data.maskList
      );
      data.maskList = Array(5).fill(false);
      await subpkg_fight_function.complexAction(data, idx);
    }, startDicing = async () => {
      if (data.dicing == true)
        return;
      data.dicing = true;
      if (!data.action) {
        nextPlayer();
        data.action = true;
        data.dicing = false;
        return;
      }
      subpkg_fight_function.dicingPlay(data, async (data2) => {
        let idx = data2.gameInfo.activateIndex;
        data2.playerInfo[idx].diceList = public_module_common.getNewDice(
          data2.playerInfo[idx].diceList,
          data2.playerInfo[idx].lockerList
        );
        data2.randomDice = data2.playerInfo[idx].diceList;
        data2.action = false;
      });
      let flag = data.playerInfo[data.gameInfo.activateIndex].lockerList.reduce((pre, cur) => pre & cur, true);
      if (!flag)
        await new Promise((resolve) => setTimeout(resolve, 2e3));
      data.dicing = false;
    }, goto = (path = "main/main") => {
      common_vendor.index.navigateTo({
        url: "/subpkg/" + path
      });
    };
    const nG = () => {
      subpkg_fight_function.nextGame(data, commit, () => {
        commit("pushPlayerRanks", data.playerInfo);
        commit("sortedPlayer");
        goto("settlement/settlement");
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: "overflow:" + (data.selectMagnification ? "hidden" : "visible"),
        b: data.prepared
      }, data.prepared ? common_vendor.e({
        c: data.selectMagnification
      }, data.selectMagnification ? common_vendor.e({
        d: common_vendor.f(data.playerInfo, (item, idx, i0) => {
          return {
            a: "4a55c990-1-" + i0 + ",4a55c990-0",
            b: common_vendor.p({
              customStyleAvatar: {
                margin: "0 16px"
              },
              nick_name: item.nick_name,
              avatar_url: item.avatar_url
            }),
            c: "4a55c990-2-" + i0 + ",4a55c990-0",
            d: common_vendor.p({
              diceList: item.diceList,
              lockerList: item.lockerList
            }),
            e: "4a55c990-3-" + i0 + ",4a55c990-0",
            f: common_vendor.o(($event) => data.magnificationList[idx] = $event, idx),
            g: common_vendor.p({
              localdata: dataPage.magnification,
              disabled: data.gameInfo.mode != 1 && idx != 0,
              selectedColor: "#5349a2",
              modelValue: data.magnificationList[idx]
            }),
            h: idx
          };
        }),
        e: data.selectMagnification
      }, data.selectMagnification ? {
        f: common_vendor.o(($event) => common_vendor.unref(subpkg_fight_function.finishSelect)(data))
      } : {}) : {}, {
        g: data.gameInfo.onegameEnd
      }, data.gameInfo.onegameEnd ? {
        h: common_vendor.t(data.gameInfo.currentGame),
        i: common_vendor.f(data.playerInfo, (item, idx, i0) => {
          return {
            a: idx,
            b: "4a55c990-4-" + i0 + ",4a55c990-0",
            c: common_vendor.p({
              needData: item
            })
          };
        }),
        j: common_vendor.t(data.gameInfo.currentGame == data.gameInfo.gameCount ? "结束游戏" : "下一局"),
        k: common_vendor.o(nG)
      } : {}, {
        l: common_vendor.o(() => {
        }),
        m: common_vendor.p({
          show: data.selectMagnification || data.gameInfo.onegameEnd,
          round: true,
          rootPortal: true,
          closeOnClickOverlay: false
        })
      }) : {}, {
        n: data.gameInfo.mode == 3
      }, data.gameInfo.mode == 3 ? {
        o: data.loading,
        p: common_vendor.p({
          progress: data.progress
        })
      } : {}, {
        q: data.prepared
      }, data.prepared ? {
        r: !data.loading,
        s: common_vendor.p({
          dataParent: data,
          start: startDicing,
          toMask: maskById
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4a55c990"], ["__file", "D:/Myecharts/wx/WeChat_app/All_in_or_nothing/subpkg/fight/fight.vue"]]);
wx.createPage(MiniProgramPage);
