<script setup>
	import {
		useStore
	} from 'vuex'
	import CustomImage from '../public/CustomImage.vue'
	const {
		state,
		commit
	} = useStore(),
		goback = () => {
			commit('resetPlayerRanks');
			uni.navigateTo({
				url: '/subpkg/main/main'
			})
		};
</script>
<template>
	<view class="wrap">
		<view class="item" v-for="(item,idx) in state.playerRanks" :key="idx">
			<CustomImage :bgUrl="state.baseUrl+state.tittleList[idx<4?idx:3]" :text="idx+1"
				:customStyle="{height:'60px',width:'60px',lineHeight:'60px',color:'rgba(255,255,255,.8)'}"></CustomImage>
			<CustomImage
				:customStyle="{height:'50px',width:'50px',borderRadius:'50%',overFlow:'hidden',boreder:'5px solid #efefef'}"
				:bgUrl="item.avatar_url"></CustomImage>
			<view class="nickname">{{item.nick_name}}</view>
			<view class="chip">{{item.chip}}</view>
		</view>
	</view>
	<view class="btn" @tap="goback">
		退出对战
	</view>
</template>
<style lang="less" scoped>
	.wrap {
		width: 310px;
		height: 240px;

		.item {
			color: #8E38A2;
			font-weight: bold;
			letter-spacing: 2px;
			font-size: 20px;
			display: flex;
			width: 100%;
			align-items: center;
			height: 60px;
			justify-content: space-evenly;
		}

		.nickname {
			width: 110px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			margin-left: 10px;
			text-align: center;
		}

		.chip {
			width: 60px;
			text-align: center;
		}
	}

	.btn {
		width: 140px;
		height: 36px;
		line-height: 36px;
		color: #fff;
		text-align: center;
		font-weight: bold;
		font-size: 24px;
		position: absolute;
		bottom: 120px;
		left: 0;
		right: 0;
		margin: auto;
		background-color: #8E38A2;
		border-radius: 10px;
		letter-spacing: 2.5px;
	}
</style>