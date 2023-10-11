<script setup>
	import {
		defineProps,
		reactive,
		onMounted
	} from "vue";
	const props = defineProps({
		customStyle: {},
		bgUrl: {},
		onTap: {
			default: () => {}
		},
		text: {
			default: ""
		}
	})
	const data = reactive({
		customStyle: {}
	})
	onMounted(() => {
		data.customStyle = {
			...props.customStyle,
			backgroundImage: `url(${props.bgUrl})`
		}
	})
</script>
<template>
	<view class="bg" :style="data.customStyle" @tap="onTap">{{text}}</view>
</template>
<style lang="less" scoped>
	.bg {
		width: 40px;
		height: 40px;
		background-size: 100%;
		background-position: center;
		border-radius: 50%;
		background-repeat: no-repeat;
		line-height: 40px;
		text-align: center;
	}
</style>