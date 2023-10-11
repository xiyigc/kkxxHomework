"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./subpkg/fight/fight.js";
  "./subpkg/settlement/settlement.js";
  "./subpkg/rank/rank.js";
  "./subpkg/detail/detail.js";
  "./subpkg/main/main.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    const store = common_vendor.useStore();
    common_vendor.onLaunch(async () => {
      store.commit("setPhone", common_vendor.index.getMenuButtonBoundingClientRect());
      store.commit("initDiceUrls");
      const flag = common_vendor.index.getStorageSync("register");
      if (flag) {
        store.commit("setRegister", true);
        const userinfo = common_vendor.index.getStorageSync("userInfo");
        store.commit("setUserInfo", userinfo);
      }
      try {
        const {
          cid
        } = await common_vendor.index.getPushClientId();
        store.commit("setCid", cid);
      } catch (e) {
        console.log(e);
      }
    });
    return () => {
    };
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Myecharts/wx/WeChat_app/All_in_or_nothing/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
