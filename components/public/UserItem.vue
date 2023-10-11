<script setup>
	import {
		defineProps,
		onBeforeMount,
		reactive
	} from 'vue'
	import Avatar from '../fight/Avatar.vue'
	const props = defineProps({
		customStyle: {},
		avatar_url: {},
		nick_name: {},
		chip: {},
		magnification: {}
	})
</script>
<template>
	<view class="outer">
		<Avatar :nick_name="nick_name" :avatar_url='avatar_url'></Avatar>
		<view class="num" style="margin-left: -16px;">
			{{chip}}
		</view>
		<view class="num">
			{{magnification}}
		</view>
	</view>
</template>
<style lang="less" scoped>
	.outer {
		background-image: url(../../static/images/itemBg.png);
		width: 100%;
		height: 60px;
		background-size: 100%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		padding-top: 5px;
		box-sizing: border-box;

		.num {
			height: 60px;
			line-height: 60px;
		}
	}
</style>