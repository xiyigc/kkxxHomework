"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    phone: {},
    token: "",
    userinfo: {},
    _id: {},
    register: false,
    baseUrl: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/",
    diceImgUrls: [],
    cid: "",
    playerRanks: [
      {
        nick_name: "chenbeibei",
        avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/avatar/8.png",
        chip: 300
      },
      {
        nick_name: "cbb",
        avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/avatar/7.png",
        chip: 200
      },
      {
        nick_name: "陈贝贝",
        avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/avatar/6.png",
        chip: 100
      },
      {
        nick_name: "贝贝老婆",
        avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/avatar/5.png",
        chip: 50
      }
    ],
    tittleList: ["page/n1.png", "page/n2.png", "page/n3.png", "page/n4.png"]
  },
  mutations: {
    resetPlayerRanks(state) {
      state.playerRanks = [];
    },
    pushPlayerRanks(state, player) {
      state.playerRanks.push(...player);
    },
    sortedPlayer(state) {
      state.playerRanks.sort((a, b) => b.chip - a.chip);
    },
    setCid(state, cid) {
      state.cid = cid;
    },
    initDiceUrls(state, _) {
      state.diceImgUrls = Array(6).fill(0).map((v, i) => state.baseUrl + "dice/" + (i + 1) + ".png");
    },
    setRegister(state, st) {
      state.register = st;
    },
    setPhone(state, obj) {
      state.phone = obj;
    },
    setUserInfo(state, user) {
      state.userinfo = user;
      state._id = user == null ? "" : user._id;
      if (user.updated)
        state.register = true;
      delete state.userinfo["updated"];
      delete state.userinfo["_id"];
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async login({
      commit
    }) {
      const {
        code
      } = await common_vendor.index.login({
        provider: "weixin"
      });
      const {
        result
      } = await common_vendor.Ds.callFunction({
        name: "login",
        data: {
          code,
          action: "notoken"
        }
      });
      common_vendor.index.setStorage({
        key: "token",
        data: result.token
      });
      commit("setToken", result.token);
      const user = {
        ...result.userData
      };
      commit("setUserInfo", user);
      common_vendor.index.setStorage({
        key: "userInfo",
        data: user
      });
    }
    // getters: {
    // 	getCount(state) {
    // 		return state.count;
    // 	}
    // }
  }
});
exports.store = store;
