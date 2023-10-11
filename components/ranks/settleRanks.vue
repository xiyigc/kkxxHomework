<script setup>
	import {
		reactive,
		defineProps
	} from "vue";
	import LilDiceList from './LilDiceList.vue'
	const props = defineProps({
		needData: {},
		// avatar_url: {},
		// integral: {},
		// nickname: {},
		// diceList: {},
		// winNum: {},
		// chip: {}
	})
	import Avatar from '../fight/Avatar.vue'
</script>
<template>
	<view class="outer">
		<Avatar :customStyleAvatar="{marginLeft:'18px'}" :nick_name="needData.nick_name" :avatar_url="needData.avatar_url">
		</Avatar>
		<view class="num">{{needData.score}}</view>
		<view class="chip">{{needData.last+needData.winS}}</view>
		<LilDiceList :diceList="needData.diceList"></LilDiceList>
	</view>
</template>
<style lang="less" scoped>
	.outer {
		width: 100%;
		height: 55px;
		display: flex;
		align-items: center;
		font-size: 18px;

		.num {
			margin-left: 22px;
			width: 36px;
			text-align: center;
		}

		.chip {
			width: 116px;
			margin-left: 3px;
			text-align: center;
		}
	}
</style>