<script setup>
	import {
		defineProps
	} from "vue";
	const props = defineProps({
		submit_userinfo: {},
		onChooseAvatar: {},
		headimg: {}
	})
</script>
<template>
	<view class='public up'>
		<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" class="avatar_wrap">
			<image class="avatar" :src="headimg" mode="widthFix" />
		</button>
	</view>
	<view class='public down'>
		<form @submit="submit_userinfo">
			<view style="font-weight: 500;font-size: 25px;width: 100%;text-align: center;">
				请输入昵称
			</view>
			<input type="nickname" class="nickname" name="nickname">
			<button form-type="submit" class="next_step">下一步</button>
		</form>
	</view>
</template>
<style lang="less" scoped>
	.public {
		width: 284px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.up {
		margin-top: 140px;
		height: 160px;
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
		background: radial-gradient(circle at bottom left, transparent 12px, #fff 0) bottom left,
			radial-gradient(circle at bottom right, transparent 12px, #fff 0) bottom right;
		background-size: 50%;
		background-repeat: no-repeat;

		.avatar_wrap {
			background-color: transparent;
			padding: 0;
			width: 80px;
			height: 80px;
			border-radius: 50%;
			overflow: hidden;

			.avatar {
				background-color: #faefff;
				width: 100%;
			}
		}
	}

	.down {
		flex-direction: column;
		height: 260px;
		border-bottom-left-radius: 30px;
		border-bottom-right-radius: 30px;
		background: radial-gradient(circle at top left, transparent 12px, #fff 0) top left,
			radial-gradient(circle at top right, transparent 12px, #fff 0) top right;
		background-size: 50%;
		background-repeat: no-repeat;

		.nickname {
			font-size: 18px;
			width: 200px;
			height: 45px;
			background-color: #faefff;
			margin-top: 32px;
			border-radius: 10px;
			text-align: center;
		}

		.next_step {
			background-color: rgb(130, 44, 186);
			color: #fff;
			width: 140px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			border-radius: 30px;
			margin-top: 32px;
		}
	}
</style>