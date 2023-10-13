import {
	getMasks,
	getNewDice,
	getScore
} from "../../public_module/common";
export const dicingPlay = async (data, callback) => {
		const {
			activateIndex: idx
		} = data.gameInfo;
		const locker = data.playerInfo[idx].lockerList;
		data.randomDice = data.playerInfo[idx].diceList.map((v, i) => locker[i] ? v : (Math.floor(Math.random() * 6) +
			1));
		data.interval = setInterval(async () => {
			let random = Math.floor(Math.random() * 3) + 1;
			if (data.dicing)
				data.randomDice.forEach((v, i) => {
					data.randomDice[i] = locker[i] ? v : ((v + random) % 6) + 1;
				});
			else {
				clearInterval(data.interval);
				if (callback) await callback(data);
			}
		}, 100);
	},
	finishSelect = (data) => {
		data.gameInfo.totalMagnification = parseInt(data.gameInfo.totalMagnification);
		data.magnificationList.forEach((v, i) => {
			data.gameInfo.totalMagnification += v;
			data.playerInfo[i].magnification += v;
		});
		data.selectMagnification = false;
	},
	nextGame = (data, commit, gameOver) => {
		let gg = false,
			out = [];
		if (data.gameInfo.currentGame == data.gameInfo.gameCount) gg = true;
		else {
			data.gameInfo.currentGame++;
			data.randomDice = Array(5).fill(0);

			data.playerInfo = data.playerInfo.filter((v) => {
				if (!v.active) out.push(v)
				return v.active
			});
			if (data.playerInfo.length == 1) gg = true;
			data.gameInfo.onegameEnd = false;
			data.gameInfo.totalMagnification = 1;
			data.playerInfo = data.playerInfo.map(v => {
				return {
					...v,
					diceList: Array(5).fill(0),
					lockerList: Array(5).fill(false),
					magnification: 1,
				}
			})
			if (out.length > 0) commit('pushPlayerRanks', out)
		}
		if (gg) gameOver()
	};
const applyAiAction = async (data) => {
	data.playerInfo[1].diceList = getNewDice(data.playerInfo[1].diceList, data.playerInfo[1].lockerList);
	const {
		result: {
			aiMaskList,
			magnification
		}
	} = await
	uniCloud.callFunction({
		name: 'diceGame',
		data: {
			action: "nextAction",
			aiDiceList: data.playerInfo[1].diceList,
			aiLockerList: data.playerInfo[1].lockerList,
			localDiceList: data.playerInfo[0].diceList,
			localLockerList: data.playerInfo[0].lockerList,
		},
	});
	data.magnificationList[1] = magnification;
	data.playerInfo[1].lockerList = getMasks(
		data.playerInfo[1].lockerList,
		aiMaskList
	);
}, control_progress = async (data, callback) => {
	let width = 10,
		interval = null;
	data.progress.width = width + "%";
	data.loading = true;
	await new Promise((resolve) => setTimeout(resolve, 800))
	async function frame() {
		if (width >= 97) {
			clearInterval(interval);
			if (callback) await callback(data);
			data.progress.width = "99%";
			await new Promise((resolve) => setTimeout(resolve, 600));
			data.loading = false;
			data.progress.width = "10%";
			width = 10;
		} else {
			width++;
			data.progress.width = width + "%";
		}
	}
	interval = setInterval(frame, data.rate);
}, settlementHandler = (data) => {
	let maxScore = 0,
		totalMagnification = parseInt(data.gameInfo.totalMagnification),
		totalChip = 0;
	data.playerInfo.forEach((v, i) => {
		v.score = getScore(v.diceList);
		if (v.score > maxScore) maxScore = v.score;
		v.diceList.sort();
	});
	const maxIdx = [];
	data.playerInfo.forEach((v, i) => {
		v.last = v.chip;
		if (v.score == maxScore) maxIdx.push(i);
		else {
			let subChip = totalMagnification * (maxScore - v.score);
			if (subChip > v.chip) {
				totalChip += v.chip;
				v.chip = 0;
				v.active = false;
				v.winS = ' - ' + v.chip;
			} else {
				v.chip -= subChip;
				totalChip += subChip;
				v.winS = ' - ' + subChip;
			}
		}
	});
	maxIdx.forEach((v) => {
		data.playerInfo[v].chip += Math.floor(totalChip / maxIdx.length);
		data.playerInfo[v].winS = ' + ' + Math.floor(totalChip / maxIdx.length);
	});
}, applyForGameId = async (_id, chip, playerCount) => {
	const {
		result: {
			status,
			gameId,
			idx
		}
	} = await uniCloud.callFunction({
		name: 'diceGame',
		data: {
			action: "matching",
			_id,
			chip,
			playerCount,
		},
	});
	if (status != 200) throw Error()
	return {
		gameId,
		idx
	};
}, applyForRelateInfos = async (gameId, idx) => {
	const {
		result: {
			playerInfo,
			gameInfo,
			code,
			status
		}
	} = await uniCloud.callFunction({
		name: 'diceGame',
		data: {
			action: "applyGameInfo",
			gameId,
			idx
		},
	});
	if (code != 200) throw Error()
	return {
		playerInfo,
		gameInfo,
		status
	}
}, otherPlayerAction = async (data) => {
	while (true) {
		const {
			result: {
				playerInfo,
				gameInfo,
				code,
				status
			}
		} = await uniCloud.callFunction({
			name: 'diceGame',
			data: {
				action: "exchgInfo",
				gameId: data.gameId,
				idx: data.idx,
				diceList: data.playerInfo[data.idx].diceList,
				lockerList: data.playerInfo[data.idx].lockerList,
				magnification: data.magnificationList[data.idx],
			},
		});
		if (code != 200) throw Error()
		if (status == 2) {
			break;
		}
		await new Promise(resolve => setTimeout(resolve, 1000))
	}
};
export const complexAction = async (data, idx) => {
	let selectOrOneGameOver = false, // true: select ; false: oneGameOver
		roundContinue = false; //true: round continue ,false : next round
	data.magnificationList = data.magnificationList.map(() => 0);
	if (data.gameInfo.mode == 1) {
		idx += 1;
		if (idx == data.gameInfo.playerCount) { //round end
			data.gameInfo.activateIndex = 0;
			data.gameInfo.round++;
			if (data.gameInfo.round <= data.gameInfo.roundCount) selectOrOneGameOver = true;
		} else { //next player
			roundContinue = true;
			data.gameInfo.activateIndex = idx;
			data.randomDice = data.playerInfo[data.gameInfo.activateIndex].diceList;
		}
	} else {
		data.gameInfo.round++;
		if (data.gameInfo.round <= data.gameInfo.roundCount) { //select magnification
			selectOrOneGameOver = true;
			// if (data.gameInfo.mode == 2) await applyAiAction(data);
			// else await otherPlayerAction(data);
			await applyAiAction(data);
		}
	}
	if (roundContinue) return;
	if (selectOrOneGameOver) {
		data.selectMagnification = true;
	} else {
		settlementHandler(data)
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
		},
		playerInfo = [],
		callback = async (data) => {
			for (let j = 0; j < 30; j++) await new Promise(resolve => setTimeout(resolve, 1000))
		};
	if (mode == 3) await control_progress(data, async () => {})
	// if (mode == 3) {
	// 	try {
	// 		await control_progress(data, callback);
	// 		const gameidInfo = await applyForGameId(state._id, chip, playerCount);
	// 		data.gameId = gameidInfo.gameId;
	// 		data.idx = gameidInfo.idx;
	// 		for (let i = 0; i < 11; i++) {
	// 			const resInfo = await applyForRelateInfos(data.gameId, data.idx);
	// 			if (resInfo.status == 1) {
	// 				callback = async (data) => {};
	// 				gameInfo = resInfo.gameInfo;
	// 				playerInfo = resInfo.playerInfo;
	// 				break;
	// 			}
	// 			await new Promise(resolve => setTimeout(resolve, 1000))
	// 			if (i == 10) {
	// 				return {
	// 					timeout: true
	// 				}
	// 			}
	// 		}
	// 	} catch (e) {}
	// } else {
	// 	for (let i = 0; i < playerCount; i++) {
	// 		playerInfo.push({
	// 			nick_name: "玩家",
	// 			magnification: 1,
	// 			chip: chip * 100,
	// 			active: true,
	// 		});
	// 		data.magnificationList.push(0);
	// 	}
	// 	if (mode == 2) {
	// 		playerInfo[0].nick_name = state.userinfo.nick_name;
	// 		playerInfo[1].nick_name = 'AI小K';
	// 		playerInfo[0].avatar_url = state.userinfo.avatar_url;
	// 		playerInfo[1].avatar_url = state.baseUrl + "avatar/AI.png";
	// 	}
	// 	playerInfo = playerInfo.map((v, i) => {
	// 		if (mode == 1) {
	// 			v.nick_name = v.nick_name + (i + 1);
	// 			v.avatar_url = state.baseUrl + "avatar/" + Math.floor(Math.random() * 9) + ".png";
	// 		}
	// 		return {
	// 			...v,
	// 			diceList: Array(5).fill(0),
	// 			lockerList: Array(5).fill(false),
	// 		}
	// 	});
	// }

	for (let i = 0; i < playerCount; i++) {
		playerInfo.push({
			nick_name: "玩家",
			magnification: 1,
			chip: chip * 100,
			active: true,
		});
		data.magnificationList.push(0);
	}
	if (mode == 2) {
		playerInfo[0].nick_name = '饼小弟';
		playerInfo[1].nick_name = 'AI小K';
		playerInfo[0].avatar_url =
			'https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/cloudstorage/30caf785-9486-47f6-a3c4-618ffd0f487a.jpg'
		playerInfo[1].avatar_url = state.baseUrl + "avatar/AI.png";
	} else if (mode == 3) {
		playerInfo[0].nick_name = '饼小弟';
		playerInfo[1].nick_name = '欣欣子冲鸭';
		playerInfo[1].avatar_url = 'https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/avatar/8.png';
		playerInfo[0].avatar_url =
			'https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/cloudstorage/30caf785-9486-47f6-a3c4-618ffd0f487a.jpg';
	}
	playerInfo = playerInfo.map((v, i) => {
		if (mode == 1) {
			v.nick_name = v.nick_name + (i + 1);
			v.avatar_url = state.baseUrl + "avatar/" + Math.floor(Math.random() * 9) + ".png";
		}
		return {
			...v,
			diceList: Array(5).fill(0),
			lockerList: Array(5).fill(false),
		}
	});

	gameInfo = {
		...gameInfo,
		round: 1,
		currentGame: 1,
		activateIndex: 0,
		onegameEnd: false,
		roundCount: 3,
	}
	return {
		gameInfo,
		playerInfo
	}
};