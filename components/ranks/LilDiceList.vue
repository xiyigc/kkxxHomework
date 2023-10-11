<script setup>
	import {
		defineProps
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	const props = defineProps({
			diceList: {},
			lockerList: {}
		}),
		{
			state
		} = useStore();
</script>
<template>
	<view class="list">
		<view class="wrap" v-for="(v,idx) in diceList" :key='idx'>
			<image class='dice' :src="v ? state.diceImgUrls[v - 1] : ''" mode="widthFix"></image>
			<view class="mask" v-show="lockerList[idx]" v-if="lockerList"></view>
		</view>
	</view>
</template>
<style lang="less" scoped>
	.list {
		display: flex;
		width: 131px;
		height: 55px;
		align-items: center;
	}

	.wrap {
		width: 30px;
		height: 30px;
		position: relative;
		border-radius: 6px;
		overflow: hidden;
		margin: 0 2px;

		.dice {
			width: 100%;
			height: 100%;
			background-color: #fff;
		}

		.mask {
			background-color: rgba(252, 197, 38, .4);
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			width: 22.5px;
			height: 23px;
		}
	}
</style>