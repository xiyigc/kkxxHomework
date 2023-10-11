<script setup>
	import {
		reactive
	} from "vue";
	import BackGround from '../../components/public/BackGround.vue'
	import Navi from '../../components/public/navi_top.vue'
	const data = reactive({
		pageNum: 1
	});

	function back() {
		uni.navigateBack()
	}

	function pageChange(action) {
		if (action)
			data.pageNum = ((data.pageNum + 1) % 3) + 1
		else
			data.pageNum = ((data.pageNum + 3) % 3) + 1
	}
</script>
<template>
	<Navi :opacity='true'>
		<image @tap="back" style="margin-left: 12px;height: 100%;" src="../../static/images/back.png" mode="heightFix">
		</image>
	</Navi>
	<BackGround bgUrl='https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/detailBack.png'>
		<view class="wrap">
			<view class="fixed">
				<image v-for='v in [1,2,3]' :key='v' v-show='v==data.pageNum'
					:src="`https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/detail${v}.png`"
					mode="widthFix" class="detail"></image>
			</view>
			<view class="downside">
				<image @tap='pageChange(true)' src="../../static/images/pageUp.png"
					style="width: 100px;margin-right: 40px;" mode="widthFix"></image>
				<image @tap='pageChange(false)' src="../../static/images/pageDown.png" style="width: 100px;"
					mode="widthFix"></image>
			</view>
		</view>
	</BackGround>
</template>
<style lang="less" scoped>
	.wrap {
		width: 260px;
		height: 605px;
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 62px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.fixed {
			width: 100%;
			height: 594px;
			overflow: hidden;

			.detail {
				width: 100%;
			}
		}


		.downside {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
		}
	}
</style>