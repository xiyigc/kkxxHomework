"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "DiceList",
  props: {
    mode: {},
    idx: {},
    maskList: {},
    maskById: {},
    playerInfo: {}
  },
  setup(__props) {
    const props = __props;
    const {
      state
    } = common_vendor.useStore();
    const showDice = common_vendor.computed(() => {
      try {
        let locker = props.playerInfo[props.idx].lockerList, diceList = props.playerInfo[props.idx].diceList;
        return diceList.map((v, i) => {
          if (props.mode == 1)
            return locker[i] ? 0 : v;
          else
            return locker[i] ? v : 0;
        });
      } catch (e) {
        return Array(5).fill(0);
      }
    }), click = (i) => {
      if (props.maskById)
        props.maskById(i);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(showDice), (v, i, i0) => {
          return common_vendor.e({
            a: v ? common_vendor.unref(state).diceImgUrls[v - 1] : ""
          }, __props.mode == 1 ? {
            b: __props.maskList[i]
          } : {}, {
            c: i,
            d: common_vendor.o(($event) => click(i), i)
          });
        }),
        b: __props.mode == 1
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b6e5161a"], ["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/components/fight/DiceList.vue"]]);
wx.createComponent(Component);
