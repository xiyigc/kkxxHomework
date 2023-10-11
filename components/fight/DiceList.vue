<script setup>
	import {
		defineProps,
		computed
	} from "vue";
	import {
		useStore
	} from "vuex";
	const {
		state
	} = useStore(),
		props = defineProps({
			mode: {},
			idx: {},
			maskList: {},
			maskById: {},
			playerInfo: {},
		});
	const showDice = computed(() => {
			try {
				let locker = props.playerInfo[props.idx].lockerList,
					diceList = props.playerInfo[props.idx].diceList;
				return diceList.map((v, i) => {
					if (props.mode == 1) return locker[i] ? 0 : v;
					else return locker[i] ? v : 0;
				});
			} catch (e) {
				return Array(5).fill(0);
			}
		}),
		click = (i) => {
			if (props.maskById) props.maskById(i);
		};
</script>

<template>
	<view class="outer">
		<view class="wrap" v-for="(v, i) in showDice" :key="i" @tap="click(i)">
			<image :src="v ? state.diceImgUrls[v - 1] : ''" class="dice" mode="widthFix">
			</image>
			<view class="dice mask" v-show="maskList[i]" v-if="mode==1"></view>
		</view>
	</view>
</template>

<style scoped lang="less">
	.outer {
		height: 100%;
		width: 240px;
		display: flex;
		align-items: center;

		.wrap {
			margin: 0 6px;
			width: 36px;
			height: 36px;
			position: relative;

			.dice {
				width: 36px;
				height: 36px;
				background-color: rgba(255, 255, 255, 0.6);
				border-radius: 6px;
			}

			.mask {
				background-color: rgba(252, 197, 38, .6);
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}
		}
	}
</style>