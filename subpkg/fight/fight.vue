<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		reactive,
		onMounted
	} from "vue";
	import FightPage from "../../components/fight/FightPage.vue";
	import LoadingPage from "../../components/public/LoadingPage.vue";
	import Avatar from '../../components/fight/Avatar.vue'
	import SettleRanks from '../../components/ranks/settleRanks.vue'
	import LilDiceList from '../../components/ranks/LilDiceList.vue'
	import {
		useStore
	} from "vuex";
	import {
		dicingPlay,
		nextGame,
		finishSelect,
		complexAction,
		getInitRelateInfo,
		control_progress
	} from "./function";
	import {
		getMasks,
		getNewDice
	} from "../../public_module/common";
	const {
		state,
		commit
	} = useStore(),
		data = reactive({
			dicing: false,
			randomDice: Array(5).fill(0),
			playerInfo: [],
			gameInfo: {},
			interval: null,
			action: true, //true:could do action ,false:could not do action
			maskList: Array(5).fill(false),
			prepared: false,
			selectMagnification: false,
			magnificationList: [],
			progress: {
				width: "10%",
			},
		}), dataPage = reactive({
			magnification: [{
				"text": "不加倍",
				"value": 0,
			}, {
				"text": "1倍",
				"value": 1,
			}, {
				"text": "2倍",
				"value": 2,
			}, {
				"text": "3倍",
				"value": 3,
			}],
			loading: false,
			rate: 60,
		});
	onLoad(async (option) => {
		commit('resetPlayerRanks');
		const relateInfo = await getInitRelateInfo(data, dataPage, state, option);
		if (relateInfo.timeout) {
			goto()
		} else {
			data.gameInfo = relateInfo.gameInfo;
			data.playerInfo = relateInfo.playerInfo;
			data.prepared = true;
		}
	});
	const maskById = (diceIdx) => {
			if (data.action) return;
			let idx = data.gameInfo.activateIndex;
			if (data.playerInfo[idx].lockerList[diceIdx]) return;
			data.maskList[diceIdx] = !data.maskList[diceIdx];
		},
		nextPlayer = async () => {
				let idx = data.gameInfo.activateIndex;
				data.playerInfo[idx].lockerList = getMasks(
					data.playerInfo[idx].lockerList,
					data.maskList
				);
				data.maskList = Array(5).fill(false);
				await complexAction(data, idx);
			},
			startDicing = async () => {
				if (data.dicing == true) return;
				data.dicing = true;
				if (!data.action) {
					nextPlayer();
					data.action = true;
					data.dicing = false;
					return;
				}
				dicingPlay(data, async (data) => {
					let idx = data.gameInfo.activateIndex;
					data.playerInfo[idx].diceList = getNewDice(
						data.playerInfo[idx].diceList,
						data.playerInfo[idx].lockerList
					);
					data.randomDice = data.playerInfo[idx].diceList;
					data.action = false;
				});
				let flag = data.playerInfo[data.gameInfo.activateIndex].lockerList.reduce((pre, cur) => pre & cur, true);
				if (!flag)
					await new Promise((resolve) => setTimeout(resolve, 2000));
				data.dicing = false;
			}, goto = (path = 'main/main') => {
				uni.navigateTo({
					url: '/subpkg/' + path
				});
			};
	const nG = () => {
		nextGame(data, commit, () => {
			commit('pushPlayerRanks', data.playerInfo);
			commit('sortedPlayer');
			goto('settlement/settlement')
		})
	}
</script>
<template>
	<page-meta :page-style="'overflow:'+(data.selectMagnification?'hidden':'visible')"></page-meta>
	<van-popup v-if="data.prepared" :show="data.selectMagnification||data.gameInfo.onegameEnd" round root-portal
		:close-on-click-overlay='false' @touchstart.native.stop>
		<view class="popup" v-if="data.selectMagnification">
			<view class="item" v-for="(item,idx) in data.playerInfo" :key="idx">
				<view style="color: #d1a9ff;">请选择是否加倍：</view>
				<view style="display: flex;align-items: center;">
					<Avatar :customStyleAvatar="{margin:'0 16px'}" :nick_name="item.nick_name" :avatar_url='item.avatar_url'>
					</Avatar>
					<LilDiceList :diceList="item.diceList" :lockerList="item.lockerList"></LilDiceList>
				</view>
				<uni-data-checkbox v-model="data.magnificationList[idx]" :localdata="dataPage.magnification"
					:disabled="data.gameInfo.mode!=1&&idx!=0" selectedColor="#5349a2"></uni-data-checkbox>
			</view>
			<view class="btn" @tap="finishSelect(data)" v-if="data.selectMagnification">完成选择</view>
		</view>
		<view class="settlement" v-if="data.gameInfo.onegameEnd">
			<view class="text">第{{data.gameInfo.currentGame}}局结果</view>
			<view class="attr">
				<view class="wd">玩家</view>
				<view class="wd">分数</view>
				<view style="margin-left:25px;">筹码</view>
				<view style="margin-left:86px;">骰型</view>
			</view>
			<SettleRanks v-for="(item,idx) in data.playerInfo" :key="idx" :needData="item"></SettleRanks>
			<view class="btn" style="background-color: #d1a9ff;color: #5349a2;" @tap="nG">
				{{data.gameInfo.currentGame==data.gameInfo.gameCount ? '结束游戏' : '下一局'}}
			</view>
		</view>
	</van-popup>
	<LoadingPage v-show="data.loading" :progress="data.progress" v-if='data.gameInfo.mode==3'></LoadingPage>
	<FightPage v-if="data.prepared" v-show="!data.loading" :dataParent="data" :start="startDicing" :toMask="maskById">
	</FightPage>
</template>
<style lang="less" scoped>
	.popup {
		background-color: #d1a9ff;
		width: 305px;
		height: 530px;
		box-sizing: border-box;
		padding-left: 10px;
		position: relative;
		color: #5349a2;

		.item {
			width: 295px;
			height: 120px;
			margin: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
		}
	}

	.btn {
		background-color: #5349a2;
		width: 150px;
		border-radius: 6px;
		height: 40px;
		font-size: 30px;
		font-weight: bold;
		text-align: center;
		position: absolute;
		right: 0;
		bottom: 0;
		line-height: 36px;
		color: #d1a9ff;
	}

	.settlement {
		color: #d1a9ff;
		width: 370px;
		height: 540px;
		background-color: #5349a2;
		position: relative;

		.attr {
			display: flex;
			width: 100%;
			color: #efefef;
			font-size: 18px;
			height: 40px;
			box-sizing: border-box;
			padding: 0 8px;

			.wd {
				margin: 0 14px;
			}
		}

		.text {
			width: 100%;
			height: 55px;
			line-height: 55px;
			font-size: 34px;
			font-weight: bold;
			text-align: center;
		}
	}
</style>