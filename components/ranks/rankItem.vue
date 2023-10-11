<script setup>
	import {
		defineProps,
	} from "vue";
	import {
		useStore
	} from 'vuex'
	const {
		state
	} = useStore(),
		props = defineProps({
			rankNum: {},
			avatar_url: {},
			integral: {},
			nickname: {},
		})
</script>
<template>
	<view class="rankItem">
		<view style="display: flex;">
			<view class="icon"
				:style="{backgroundImage: `url(${state.baseUrl + state.tittleList[props.rankNum<4?props.rankNum:3]})`,}">
				{{rankNum}}
			</view>
			<view class="avatar">
				<image :src="avatar_url" mode="widthFix" style="width:100%;"></image>
			</view>
			<view class="nickname">{{nickname}}</view>
		</view>
		<view class="num">{{integral}}
		</view>
	</view>
</template>
<style lang="less" scoped>
	.rankItem {
		height: 50px;
		width: 100%;
		box-sizing: border-box;
		padding: 1px;
		display: flex;
		color: rgb(136, 51, 163);
		font-size: 17px;
		justify-content: space-between;

		.avatar {
			height: 40px;
			overflow: hidden;
			border-radius: 50%;
			width: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.nickname {
			margin-left: 5px;
			max-width: 85px;
			min-width: 60px;
			line-height: 40px;

			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		.num {
			margin-left: 5px;
			width: 50px;
			line-height: 40px;
			text-align: left;
		}

		.icon {
			line-height: 35px;
			text-align: center;
			color: rgba(255, 255, 255, 0.8);
			height: 35px;
			width: 50px;
			background-size: 100%;
			background-position: center;
		}
	}
</style>