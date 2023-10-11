"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "BackGround",
  props: {
    customStyle: {},
    bgUrl: {}
  },
  setup(__props) {
    const props = __props;
    const data = common_vendor.reactive({
      customStyle: {}
    });
    common_vendor.onMounted(() => {
      data.customStyle = {
        ...props.customStyle,
        backgroundImage: `url(${props.bgUrl})`
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(data.customStyle)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e8d4f88d"], ["__file", "D:/Myecharts/wx/WeChat_app/All_in_or_nothing/components/public/BackGround.vue"]]);
wx.createComponent(Component);
