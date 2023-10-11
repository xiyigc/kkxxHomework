"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "CustomImage",
  props: {
    customStyle: {},
    bgUrl: {},
    onTap: {
      default: () => {
      }
    },
    text: {
      default: ""
    }
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
        a: common_vendor.t(__props.text),
        b: common_vendor.s(data.customStyle),
        c: common_vendor.o((...args) => __props.onTap && __props.onTap(...args))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fddc7743"], ["__file", "D:/Myecharts/wx/WeChat_app/All_in_or_nothing/components/public/CustomImage.vue"]]);
wx.createComponent(Component);
