<script setup>
	import {
		reactive,
		onBeforeMount,
		defineProps,
		onUnmounted,
		computed,
	} from "vue";
	import {
		useStore
	} from "vuex";
	import BackGround from "../public/BackGround.vue";
	import Navi from "../public/navi_top.vue";
	import UserItem from "../public/UserItem.vue";
	import DiceCenter from "./CenterDice.vue";
	import DicePlace from "./DicePlace.vue";
	import DiceList from "./DiceList.vue";
	import Rect from "./Rect.vue";
	import Avatar from './Avatar.vue'
	const {
		state
	} = useStore(),
		store = useStore(),
		data = reactive({
			padding: {},
		}),
		props = defineProps({
			start: {},
			dataParent: {},
			toMask: {},
		});
	const whichAction = computed(() => {
			if (props.dataParent.action) return "开始投掷";
			else return "结束操作";
		}),
		diceListToText = computed(() => {
			try {
				if (props.dataParent.action || props.dataParent.selectMagnification || props.dataParent.gameInfo.onegameEnd)
					throw Error()
				let s = props.dataParent.playerInfo[
					props.dataParent.gameInfo.activateIndex
				].diceList.reduce((preValue, current) => {
					if (current == 0) return "";
					return preValue + current + " ";
				}, "");
				return s == "" ? "" : s.slice(0, -1);
			} catch (e) {
				return "";
			}
		}),
		lockedDiceToText = computed(() => {
			try {
				if (props.dataParent.action || props.dataParent.selectMagnification || props.dataParent.gameInfo.onegameEnd)
					throw Error()
				const idx = props.dataParent.gameInfo.activateIndex;
				const lock = props.dataParent.playerInfo[idx].lockerList,
					dice = props.dataParent.playerInfo[idx].diceList;

				let s = dice
					.filter((v, i) => lock[i])
					.reduce((preValue, current) => {
						if (current == 0) return "";
						return preValue + current + " ";
					}, "");
				return s == "" ? "" : s.slice(0, -1);
			} catch (e) {
				return "";
			}
		});
	onBeforeMount(async () => {
		data.padding.height = state.phone.bottom + 4 + "px";
	});
	const showAvatar = computed(() => {
			let idx = props.dataParent.gameInfo.activateIndex;
			return props.dataParent.playerInfo[idx].avatar_url;
		}),
		showNickname = computed(() => {
			let idx = props.dataParent.gameInfo.activateIndex;
			return props.dataParent.playerInfo[idx].nick_name;
		});
</script>
<template>
	<Navi :opacity="true" :padding="true">
		<view class="attr">
			<view>玩家</view>
			<view>筹码</view>
			<view>倍率</view>
		</view>
	</Navi>
	<BackGround bgUrl="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/fightBg.png">
		<template>
			<view :style="data.padding"></view>
			<view class="up">
				<view class="ulist">
					<UserItem v-for="(v, i) in dataParent.playerInfo" :chip="v.chip" :magnification="v.magnification"
						:nick_name="v.nick_name" :key="i" :avatar_url="v.avatar_url">
					</UserItem>
				</view>
				<view class="info">
					<view class="itms">{{ dataParent.gameInfo.currentGame }}/{{ dataParent.gameInfo.gameCount }}：当前局数</view>
					<view class="itms">{{ dataParent.gameInfo.round }}/{{ dataParent.gameInfo.roundCount }}：当前轮数</view>
					<view class="itms">{{ dataParent.gameInfo.totalMagnification }}：当前倍率</view>
					<view class="wrap">
						<Avatar :customStyleAvatar="{ width: '60px', height: '60px' }" :customStyleName="{
								height: '20px',
								fontSize: '11px',
								lineHeight: '19px',
							}" :avatar_url="showAvatar" :nick_name="showNickname">
						</Avatar>
					</view>
				</view>
			</view>
			<view style="width: 100%; position: relative; margin-top: 30px; height: 380px">
				<DiceCenter :diceList="dataParent.randomDice"></DiceCenter>
				<DicePlace :customStyle="{ top: '216px' }">
					<Rect upWords="投掷" downWords="区域"></Rect>
					<DiceList :maskById="toMask" :idx="dataParent.gameInfo.activateIndex" :mode="1"
						:maskList="dataParent.maskList" :playerInfo="dataParent.playerInfo"></DiceList>
				</DicePlace>
				<DicePlace :customStyle="{ top: '306px' }">
					<DiceList :idx="dataParent.gameInfo.activateIndex" :mode="2" :maskList="dataParent.maskList"
						:playerInfo="dataParent.playerInfo"></DiceList>
					<Rect upWords="锁定" downWords="区域"></Rect>
				</DicePlace>
			</view>
			<view class="down">
				<view class="detail">
					<view>骰子区:[{{ diceListToText }}]</view>
					<view>锁定区:[{{ lockedDiceToText }}]</view>
					<view>倍率：{{ dataParent.gameInfo.totalMagnification }}</view>
				</view>
				<view class="btn" @tap="start"> {{ whichAction }} </view>
			</view>
		</template>
	</BackGround>
	<image :src="v" v-for="(v, i) in state.diceImgUrls" :key="i" style="width: 0; height: 0"></image>
</template>
<style scoped lang="less">
	.up {
		color: #d1a9ff;
		display: flex;
		box-sizing: border-box;
		padding: 0 24px;
		justify-content: space-between;
		width: 100%;

		.ulist {
			width: 200px;
			height: 260px;
		}
	}

	.down {
		width: 100%;
		height: 90px;
		box-sizing: border-box;
		padding: 16px 60px;
		display: flex;
		justify-content: space-between;
		color: #d1a9ff;

		.detail {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 75px;
		}

		.btn {
			width: 146px;
			height: 38px;
			border-radius: 6px;
			background-color: #d1a9ff;
			color: #5349a2;
			font-weight: bold;
			line-height: 38px;
			text-align: center;
			font-size: 24px;
			letter-spacing: 2.5px;
			margin-top: 38px;
		}
	}

	.attr {
		width: 190px;
		height: 100%;
		align-items: center;
		justify-content: space-evenly;
		display: flex;
		margin-left: 36px;
		font-size: 16px;
		color: #d1a9ff;
	}

	.info {
		margin-top: 16px;
		width: 160px;

		.itms {
			font-weight: 600;
			text-align: right;
			font-size: 17px;
			letter-spacing: 1.5px;
			height: 26px;
			line-height: 26px;
		}

		.wrap {
			margin-top: 24px;
			width: 100%;
			display: flex;
			justify-content: flex-end;
		}
	}
</style>