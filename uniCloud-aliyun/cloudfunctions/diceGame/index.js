'use strict';
const uniPush = uniCloud.getPushManager({
	appId: "__UNI__905C751"
})

const {
	nextDecision,
	getStateSpace,
} = require('dice_game');
const {
	abort
} = require('process');

const db = uniCloud.database();

exports.main = async (event, context) => {
	const {
		action
	} = event;

	if (action == 'nextAction') {
		try {
			const {
				aiDiceList,
				aiLockerList,
				localDiceList,
				localLockerList
			} = event,
			states = getStateSpace();
			const {
				bestAction: aiBestAction,
				bestScore: aiBestScore
			} = nextDecision(states, aiDiceList, aiLockerList);
			const {
				bestScore: localBestScore
			} = nextDecision(states, localDiceList, localLockerList);
			let magnification = 0;
			[0, 10, 20, 30].forEach((v, i) => {
				if (aiBestScore > localBestScore + v) magnification = i;
			})
			return {
				aiMaskList: aiBestAction,
				magnification
			}
		} catch (e) {
			return {
				aiMaskList: Array(5).fill(false),
				magnification: 0
			}
		}
	} else if (action == "matching") {
		const {
			_id,
			chip,
			playerCount,
		} = event;

		let res = {
				code: 200,
				status: 0,
				idx: 0,
			},
			matchInfo = {
				_id,
				nick_name: userInfo.nick_name,
				avatar_url: userInfo.avatar_url,
				magnification: 1,
				active: true,
			};

		const transaction = await db.startTransaction(),
			dbCmd = db.command;

		const {
			data: userInfo
		} = await db.collection('users').doc(_id).get();

		const dbRes = await db.collection('gameInfo').where({
			playerCount,
			status: 0,
		}).limit(1).get();

		if (dbRes.affectedDocs <= 0) {
			res.gameId = await db.collection("gameInfo").add({
				initChip: chip,
				playerInfo: [matchInfo],
				playerCount,
				status: 0,
				diceLists: [Array(5).fill(0)],
				lockerLists: [Array(5).fill(false)],
				time: new Date().getTime(),
				readyNum: 1,
				totalMagnification: 1,
			});
		} else {
			try {
				const {
					data: [gameInfo]
				} = dbRes;

				res.idx = gameInfo.readyNum - 1;

				let ready = gameInfo.readyNum + 1 == playerCount ? true : false;

				const count = await transaction.collection('gameInfo').doc(gameInfo._id).update({
					playerInfo: dbCmd.push(matchInfo),
					readyNum: dbCmd.inc(ready ? 1 - playerCount : 1),
					status: dbCmd.set(ready ? 1 : 0),
					diceLists: dbCmd.push(Array(5).fill(0)),
					lockerLists: dbCmd.push(Array(5).fill(false))
				});
				await transaction.commit();
				res.status = ready ? 1 : 0;
				res.gameId = gameInfo._id;
			} catch (e) {
				await transaction.rollback(-100)
				res.code = 504;
			}
		}
		return res;
	} else if (action == 'applyGameInfo') {
		const {
			gameId,
			idx
		} = event, res = {
			code: 200,
		};
		try {
			const {
				data: [gameInfo]
			} = await db.collection('users').doc(gameId).get();

			if (gameInfo.status == 1) {
				res.playerInfo = gameInfo.playerInfo.map((v, i) => {
					return {
						...v,
						chip: gameInfo.initChip * 100,
						lockerList: gameInfo.lockerLists[idx],
						diceList: gameInfo.diceLists[idx],
					}
				});
				res.gameInfo = {
					playerCount: gameInfo.playerCount,
					gameCount: gameInfo.gameCount,
					totalMagnification: gameInfo.totalMagnification,
				}
			}
			res.status = gameInfo.status;
		} catch (e) {
			res.code = 504;
		}
		return res
	} else if (action == "exchgInfo") {
		const {
			diceList,
			lockerList,
			_id,
			magnification,
			idx,
			gameId
		} = event;


	}
};