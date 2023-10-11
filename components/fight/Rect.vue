<script setup>
	import {
		defineProps
	} from 'vue'
	const props = defineProps({
		upWords: {},
		downWords: {}
	})
</script>

<template>
	<view class="outer">
		<view class="w">{{upWords}}</view>
		<view class="w">{{downWords}}</view>
	</view>
</template>

<style scoped lang="less">
	.outer {
		width: 46px;
		height: 46px;
		background-color: rgba(244, 244, 244, .2);
		border-radius: 8px;
		padding: 4px 0;
		box-sizing: border-box;

		.w {
			color: #fff;
			line-height: 19px;
			height: 19px;
			text-align: center;
			font-size: 16px;
			letter-spacing: 1.5px;
		}
	}
</style>