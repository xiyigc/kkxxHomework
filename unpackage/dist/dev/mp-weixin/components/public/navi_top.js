"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "navi_top",
  props: {
    opacity: {
      default: false
    },
    padding: {
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const store = common_vendor.useStore();
    const uppper = common_vendor.ref({
      position: "fixed",
      zIndex: "99",
      backgroundColor: "#fff",
      width: "100%"
    });
    const down = common_vendor.ref({});
    const outer = common_vendor.ref({});
    common_vendor.onBeforeMount(() => {
      if (props.opacity) {
        uppper.value.backgroundColor = "";
      }
      if (props.padding)
        down.value.height = store.state.phone.bottom + 4 + "px";
      outer.value.marginTop = store.state.phone.top + "px";
      outer.value.height = store.state.phone.height + "px";
      uppper.value.height = store.state.phone.bottom + 4 + "px";
      outer.value.width = store.state.phone.left + "px";
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(outer.value),
        b: common_vendor.s(uppper.value),
        c: common_vendor.s(down.value)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/components/public/navi_top.vue"]]);
wx.createComponent(Component);
