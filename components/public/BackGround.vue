<script setup>
	import {
		defineProps,
		reactive,
		onMounted
	} from "vue";
	const props = defineProps({
		customStyle: {},
		bgUrl: {},
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
	<view class="bg" :style="data.customStyle">
		<slot></slot>
	</view>
</template>
<style lang="less" scoped>
	.bg {
		top: 0;
		bottom: 0;
		position: absolute;
		height: 100%;
		width: 100%;
		background-size: 100%;
		background-position: center;
	}
</style>