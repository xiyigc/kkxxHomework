<script setup>
	import {
		defineProps
	} from 'vue'
	const props = defineProps({
		customStyle: {}
	})
</script>

<template>
	<view class="outer" :style="customStyle">
		<slot></slot>
	</view>
</template>

<style scoped lang="less">
	.outer {
		width: 320px;
		height: 75px;
		border: .5px solid #d1a9ff;
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		justify-content: space-evenly;
		padding: 10px;
		background-color: rgba(244, 244, 244, .1);
	}
</style>