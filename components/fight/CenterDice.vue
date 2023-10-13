<script setup>
	import {
		useStore
	} from "vuex";
	import {
		defineProps
	} from "vue";
	const props = defineProps({
		diceList: {
			default: Array(5).fill(0),
		},
	});
	const {
		state
	} = useStore();
</script>
<template>
	<view class="outer">
		<view class="pub" style="width: 72%; margin: 0 auto">
			<template v-for="(v, i) in diceList" :key="i">
				<image v-if="i % 2 == 1" :src="v > 0 ? state.diceImgUrls[v - 1] : ''" mode="heightFix" class="dice"></image>
			</template>
		</view>
		<view class="pub">
			<template v-for="(v, i) in diceList" :key="i">
				<image v-if="i % 2 == 0" :src="state.diceImgUrls[v - 1]" mode="heightFix" class="dice"></image>
			</template>
		</view>
	</view>
</template>

<style scoped lang="less">
	.outer {
		width: 320px;
		height: 150px;
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;

		.pub {
			width: 100%;
			height: 75px;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
		}

		.dice {
			height: 50px;
			background-color: rgba(250, 250, 250, .5);
			width: 50px;
			border-radius: 8px;
		}
	}
</style>