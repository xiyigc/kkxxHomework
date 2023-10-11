"use strict";
const common_vendor = require("../../common/vendor.js");
const wxcomponents_dist_toast_toast = require("../../wxcomponents/dist/toast/toast.js");
require("../../wxcomponents/dist/common/validator.js");
if (!Array) {
  const _component_van_toast = common_vendor.resolveComponent("van-toast");
  _component_van_toast();
}
if (!Math) {
  (Navi + LoginWrap + BackGround)();
}
const BackGround = () => "../../components/public/BackGround.js";
const LoginWrap = () => "../../components/public/LoginWrap.js";
const Navi = () => "../../components/public/navi_top.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    const data = common_vendor.reactive({
      guideEnd: false,
      nickname: "",
      headimg: "",
      isUpload: false
    });
    const gotoMain = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/main/main"
      });
    };
    const submit_userinfo = async (e) => {
      data.nickname = e.detail.value.nickname;
      if (data.nickname == "") {
        wxcomponents_dist_toast_toast.Toast({
          message: "请输入合法昵称"
        });
        return;
      }
      wxcomponents_dist_toast_toast.Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      let is_suceess = true;
      let fileID = null;
      if (data.isUpload) {
        const res = await common_vendor.Ds.uploadFile({
          filePath: data.headimg,
          cloudPath: Math.random().toString(20).substring(2) + "_avatar.jpg"
        });
        fileID = res.fileID;
      } else
        fileID = false;
      try {
        const {
          result
        } = await common_vendor.Ds.callFunction({
          name: "upload",
          data: {
            avatar_url: fileID,
            nick_name: data.nickname,
            token: store.state.token,
            action: "userinfo"
          }
        });
        if (result.status != 200) {
          is_suceess = false;
          throw Error();
        }
        store.commit("setUserInfo", result.userData);
        await common_vendor.index.setStorage({
          key: "register",
          data: true
        });
        await common_vendor.index.setStorage({
          key: "userInfo",
          data: result.userData
        });
      } catch (e2) {
        common_vendor.Ds.callFunction({
          name: "else",
          data: {
            token: store.state.token,
            action: "delete_pic",
            fileID: [fileID]
          }
        });
      } finally {
        wxcomponents_dist_toast_toast.Toast.clear();
        if (is_suceess) {
          wxcomponents_dist_toast_toast.Toast.success("上传成功");
          store.commit("setRegister", true);
          await new Promise((resolve) => setTimeout(resolve, 500));
          gotoMain();
        } else {
          wxcomponents_dist_toast_toast.Toast.fail("上传失败");
        }
      }
    };
    const onChooseAvatar = (e) => {
      try {
        data.headimg = e.detail.avatarUrl;
        data.isUpload = true;
      } catch (e2) {
      }
    };
    const onlogin = async () => {
      try {
        const token = common_vendor.index.getStorageSync("token");
        const {
          result
        } = await common_vendor.Ds.callFunction({
          name: "login",
          data: {
            token,
            action: "withtoken"
          }
        });
        if (result.status == 200) {
          store.commit("setToken", token);
          store.commit("setUserInfo", result.userData);
        } else
          throw Error();
      } catch (e) {
        console.log("no token");
        store.dispatch("login");
      } finally {
        if (data.headimg == "") {
          await new Promise((resolve) => setTimeout(resolve, 1e3));
        }
        data.headimg = store.state.userinfo.avatar_url;
      }
    };
    common_vendor.onMounted(async () => {
      onlogin();
    });
    const changeSt = () => {
      if (store.state.register)
        gotoMain();
      else
        data.guideEnd = true;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          id: "van-toast"
        }),
        b: !data.guideEnd
      }, !data.guideEnd ? {
        c: common_vendor.o(changeSt)
      } : {
        d: common_vendor.o(gotoMain),
        e: common_vendor.p({
          opacity: true
        }),
        f: common_vendor.p({
          submit_userinfo,
          onChooseAvatar,
          headimg: data.headimg
        }),
        g: common_vendor.p({
          customStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          },
          bgUrl: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/loginBg.png"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/Myecharts/wx/WeChat_app/gamble/All_in_copy/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
