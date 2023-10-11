<script setup>
	import {
		reactive,
		defineProps,
		computed
	} from 'vue'
	const props = defineProps({
		customStyleAvatar: {},
		customStyleName: {},
		avatar_url: {},
		nick_name: {}
	})

	function hasChinese(str) {
		const reg = /[\u4e00-\u9fa5]/;
		return reg.test(str);
	}
	const data = reactive({
		nick_name: {}
	})
	const nickName = computed(() => {
		let length = hasChinese(props.nick_name) ? 4 : 7;
		return props.nick_name.substring(0, length);
	})
</script>
<template>
	<view class="head" :style="customStyleAvatar">
		<image style="height: 100%;width:100%;overflow: hidden;border-radius: 50%;border: .5px solid #efefef;"
			:src="avatar_url" mode="heightFix">
		</image>
		<view class="nickname" :style="customStyleName">
			{{nickName}}
		</view>
	</view>
</template>
<style lang="less" scoped>
	.head {
		position: relative;
		height: 44px;
		width: 44px;

		.nickname {
			font-size: 8px;
			text-align: center;
			position: absolute;
			width: 140%;
			height: 16px;
			bottom: 2%;
			left: 50%;
			transform: translate(-50%);
			background: url(../../static/images/nickname.png) no-repeat center;
			background-size: contain;
			line-height: 15px;
			color: #d1a9ff;
		}
	}
</style>