"use strict";
const common_vendor = require("../../common/vendor.js");
const public_module_common = require("../../public_module/common.js");
const dicingPlay = async (data, callback) => {
  const {
    activateIndex: idx
  } = data.gameInfo;
  const locker = data.playerInfo[idx].lockerList;
  data.randomDice = data.playerInfo[idx].diceList.map((v, i) => locker[i] ? v : Math.floor(Math.random() * 6) + 1);
  data.interval = setInterval(async () => {
    let random = Math.floor(Math.random() * 3) + 1;
    if (data.dicing)
      data.randomDice.forEach((v, i) => {
        data.randomDice[i] = locker[i] ? v : (v + random) % 6 + 1;
      });
    else {
      clearInterval(data.interval);
      if (callback)
        await callback(data);
    }
  }, 100);
}, finishSelect = (data) => {
  data.gameInfo.totalMagnification = parseInt(data.gameInfo.totalMagnification);
  data.magnificationList.forEach((v, i) => {
    data.gameInfo.totalMagnification += v;
    data.playerInfo[i].magnification += v;
  });
  data.selectMagnification = false;
}, nextGame = (data, commit, gameOver) => {
  let gg = false, out = [];
  if (data.gameInfo.currentGame == data.gameInfo.gameCount)
    gg = true;
  else {
    data.gameInfo.currentGame++;
    data.randomDice = Array(5).fill(0);
    data.playerInfo = data.playerInfo.filter((v) => {
      if (!v.active)
        out.push(v);
      return v.active;
    });
    if (data.playerInfo.length == 1)
      gg = true;
    data.gameInfo.onegameEnd = false;
    data.gameInfo.totalMagnification = 1;
    data.playerInfo = data.playerInfo.map((v) => {
      return {
        ...v,
        diceList: Array(5).fill(0),
        lockerList: Array(5).fill(false),
        magnification: 1
      };
    });
    if (out.length > 0)
      commit("pushPlayerRanks", out);
  }
  if (gg)
    gameOver();
};
const applyAiAction = async (data) => {
  data.playerInfo[1].diceList = public_module_common.getNewDice(data.playerInfo[1].diceList, data.playerInfo[1].lockerList);
  const {
    result: {
      aiMaskList,
      magnification
    }
  } = await common_vendor.Ds.callFunction({
    name: "diceGame",
    data: {
      action: "nextAction",
      aiDiceList: data.playerInfo[1].diceList,
      aiLockerList: data.playerInfo[1].lockerList,
      localDiceList: data.playerInfo[0].diceList,
      localLockerList: data.playerInfo[0].lockerList
    }
  });
  data.magnificationList[1] = magnification;
  data.playerInfo[1].lockerList = public_module_common.getMasks(
    data.playerInfo[1].lockerList,
    aiMaskList
  );
}, settlementHandler = (data) => {
  let maxScore = 0, totalMagnification = parseInt(data.gameInfo.totalMagnification), totalChip = 0;
  data.playerInfo.forEach((v, i) => {
    v.score = public_module_common.getScore(v.diceList);
    if (v.score > maxScore)
      maxScore = v.score;
    v.diceList.sort();
  });
  const maxIdx = [];
  data.playerInfo.forEach((v, i) => {
    v.last = v.chip;
    if (v.score == maxScore)
      maxIdx.push(i);
    else {
      let subChip = totalMagnification * (maxScore - v.score);
      if (subChip > v.chip) {
        totalChip += v.chip;
        v.chip = 0;
        v.active = false;
        v.winS = " - " + v.chip;
      } else {
        v.chip -= subChip;
        totalChip += subChip;
        v.winS = " - " + subChip;
      }
    }
  });
  maxIdx.forEach((v) => {
    data.playerInfo[v].chip += Math.floor(totalChip / maxIdx.length);
    data.playerInfo[v].winS = " + " + Math.floor(totalChip / maxIdx.length);
  });
};
const complexAction = async (data, idx) => {
  let selectOrOneGameOver = false, roundContinue = false;
  data.magnificationList = data.magnificationList.map(() => 0);
  if (data.gameInfo.mode == 1) {
    idx += 1;
    if (idx == data.gameInfo.playerCount) {
      data.gameInfo.activateIndex = 0;
      data.gameInfo.round++;
      if (data.gameInfo.round <= data.gameInfo.roundCount)
        selectOrOneGameOver = true;
    } else {
      roundContinue = true;
      data.gameInfo.activateIndex = idx;
      data.randomDice = data.playerInfo[data.gameInfo.activateIndex].diceList;
    }
  } else {
    data.gameInfo.round++;
    if (data.gameInfo.round <= data.gameInfo.roundCount) {
      selectOrOneGameOver = true;
      await applyAiAction(data);
    }
  }
  if (roundContinue)
    return;
  if (selectOrOneGameOver) {
    data.selectMagnification = true;
  } else {
    settlementHandler(data);
    data.gameInfo.round = 1;
    data.gameInfo.onegameEnd = true;
  }
}, getInitRelateInfo = async (data, dataPage, state, option) => {
  const {
    mode,
    playerCount,
    chip,
    gameCount
  } = option;
  let gameInfo = {
    ...option
  }, playerInfo = [];
  for (let i = 0; i < playerCount; i++) {
    playerInfo.push({
      nick_name: "玩家",
      magnification: 1,
      chip: chip * 100,
      active: true
    });
    data.magnificationList.push(0);
  }
  if (mode == 2) {
    playerInfo[0].nick_name = "饼小弟";
    playerInfo[1].nick_name = "AI小K";
    playerInfo[0].avatar_url = "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/cloudstorage/30caf785-9486-47f6-a3c4-618ffd0f487a.jpg";
    playerInfo[1].avatar_url = state.baseUrl + "avatar/AI.png";
  } else if (mode == 3) {
    playerInfo[0].nick_name = "饼小弟";
    playerInfo[1].nick_name = "欣欣子冲鸭";
    playerInfo[1].avatar_url = "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/avatar/8.png";
    playerInfo[0].avatar_url = "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/cloudstorage/30caf785-9486-47f6-a3c4-618ffd0f487a.jpg";
  }
  playerInfo = playerInfo.map((v, i) => {
    if (mode == 1) {
      v.nick_name = v.nick_name + (i + 1);
      v.avatar_url = state.baseUrl + "avatar/" + Math.floor(Math.random() * 9) + ".png";
    }
    return {
      ...v,
      diceList: Array(5).fill(0),
      lockerList: Array(5).fill(false)
    };
  });
  gameInfo = {
    ...gameInfo,
    round: 1,
    currentGame: 1,
    activateIndex: 0,
    onegameEnd: false,
    roundCount: 3
  };
  return {
    gameInfo,
    playerInfo
  };
};
exports.complexAction = complexAction;
exports.dicingPlay = dicingPlay;
exports.finishSelect = finishSelect;
exports.getInitRelateInfo = getInitRelateInfo;
exports.nextGame = nextGame;
