<script setup>
	import {
		reactive,
		onMounted
	} from "vue";
	import {
		useStore
	} from "vuex";
	import Navi from "../../components/public/navi_top.vue";
	import BackGround from "../../components/public/BackGround.vue";
	import CustomImage from "../../components/public/CustomImage.vue";
	const data = reactive({
			select: false,
			choice: 0,
			gameCount: 1,
			playerCount: 2,
			chip: 2,
		}),
		store = useStore();

	function goto(path, payload) {
		uni.navigateTo({
			url: `/subpkg${path}?${payload}`,
		});
	}
	const selectMode = (action) => {
		data.choice = action;
		data.select = true;
	};

	function back() {
		data.choice = 0;
		data.gameCount = 1;
		data.playerCount = 2;
		data.chip = 2;
		data.select = false;
	}

	const controlInfo = (gameOrPlayer, action) => {
		if (gameOrPlayer) {
			//true : game ,false : player
			if (
				(action == -1 && data.gameCount == 1) ||
				(action == 1 && data.gameCount == 9)
			)
				return;
			else data.gameCount += action;
		} else {
			if (
				(action == -1 && data.playerCount == 2) ||
				(action == 1 && data.playerCount == 4)
			)
				return;
			else data.playerCount += action;
		}
	};
	const startGame = () => {
			goto(
				"/fight/fight",
				`chip=${data.chip}&roundCount=3&mode=${data.choice}&gameCount=${data.gameCount}&playerCount=${data.playerCount}&totalMagnification=1`
			);
		},
		addOrMinusChip = (chioce) => {
			if (chioce && data.chip <= 10 || !chioce && data.chip >= 2)
				data.chip += (chioce ? 1 : -1)
		};
</script>
<template>
	<Navi :opacity="true" v-show="data.select">
		<image @tap="back" style="margin-left: 10px; height: 100%" src="../../static/images/back.png" mode="heightFix">
		</image>
	</Navi>
	<BackGround v-show="!data.select"
		bgUrl="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/select.png">
		<view class="ranks">
			<CustomImage :customStyle="{ background: 'rgba(255, 245, 255, .2)' }" :onTap="goto.bind(this, '/detail/detail')"
				bgUrl="../../static/images/more.png">
			</CustomImage>
			<image style="width: 105%; margin-top: 8px" @tap="goto('/rank/rank')"
				src="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/select_t01.png" mode="widthFix">
			</image>
		</view>
		<view class="select">
			<image @tap="selectMode(1)" class="btn"
				src="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/select_t1.png" mode="widthFix"></image>
			<image @tap="selectMode(2)" class="btn"
				src="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/select_t2.png" mode="widthFix"></image>
			<image @tap="selectMode(3)" class="btn"
				src="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/select_t3.png" mode="widthFix"></image>
		</view>
	</BackGround>
	<BackGround v-show="data.select" :customStyle="{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
		}" bgUrl="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/selectBg.png">
		<CustomImage :customStyle="{ height: '220px', width: '220px' }"
			bgUrl="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/selectAvatar.png">
		</CustomImage>
		<template>
			<view class="words s"> 选择游戏局数 </view>
			<view class="add_minus">
				<view class="icon">
					<van-icon name="minus" size="28" color="#42388B" @click="controlInfo(true, -1)" />
				</view>
				<view class="words s">{{ data.gameCount }}</view>
				<view class="icon">
					<van-icon name="plus" size="28" color="#42388B" @click="controlInfo(true, 1)" />
				</view>
			</view>
		</template>
		<template v-if="data.choice == 1">
			<view class="words s"> 选择参战人数 </view>
			<view class="add_minus">
				<view class="icon">
					<van-icon name="minus" size="28" color="#42388B" @click="controlInfo(false, -1)" />
				</view>
				<view class="words s">{{ data.playerCount }}</view>
				<view class="icon">
					<van-icon name="plus" size="28" color="#42388B" @click="controlInfo(false, 1)" />
				</view>
			</view>
		</template>
		<template>
			<view class="words s"> 选择初始筹码 </view>
			<view class="add_minus">
				<view class="icon">
					<van-icon name="minus" size="28" color="#42388B" @click="addOrMinusChip(false)" />
				</view>
				<view class="words s">{{ data.chip }}00</view>
				<view class="icon">
					<van-icon name="plus" size="28" color="#42388B" @click="addOrMinusChip(true)" />
				</view>
			</view>
		</template>
		<view class="start words" @tap="startGame"> 开始游戏 </view>
	</BackGround>
	<image src="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/jiazai.png"
		style="width: 0; height: 0"></image>
</template>
<style lang="less" scoped>
	.s {
		color: #fff;
	}

	.start {
		color: #42388b;
		border-radius: 10px;
		width: 175px;
		height: 38px;
		line-height: 38px;
		text-align: center;
		background-color: #d1a9ff;
		padding-bottom: 3px;
		margin-top: 16px;
	}

	.words {
		font-size: 34px;
		letter-spacing: 3px;
		font-weight: bold;
	}

	.add_minus {
		width: 200px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;

		.icon {
			height: 30px;
			width: 30px;
			display: flex;
			background-color: #d1a9ff;
			align-items: center;
			justify-content: center;
			border-radius: 5px;
		}
	}

	.ranks {
		width: 80px;
		margin: 35px 4px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.select {
		position: absolute;
		bottom: 30px;
		width: 100%;
		height: 340px;
		display: flex;
		flex-direction: column;
		align-items: center;

		.btn {
			width: 180px;
			margin: 30px;
		}
	}
</style>