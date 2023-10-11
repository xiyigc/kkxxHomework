<script setup>
	import {
		reactive
	} from "vue";
	import Navi from '../../components/public/navi_top.vue'
	import RankItem from '../../components/ranks/rankItem.vue'
	const data = reactive({
		rankIcon: '../../static/images/rankIcon.png',
		usersArr: [{
			avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/cloudstorage/30caf785-9486-47f6-a3c4-618ffd0f487a.jpg",
			nickname: '陈贝贝冲鸭',
			integral: 500
		}, {
			avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/cloudstorage/30caf785-9486-47f6-a3c4-618ffd0f487a.jpg",
			nickname: '饼小弟',
			integral: 485
		}, {
			avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/avatar/9.png",
			nickname: '欣欣子',
			integral: 366
		}, {
			avatar_url: "https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/avatar/4.png",
			nickname: '冲鸭',
			integral: 199
		}],
	})

	function back() {
		uni.navigateBack()
	}
</script>
<template>
	<Navi :opacity='true'>
		<image @tap="back" style="margin-left: 10px;height: 100%;" src="../../static/images/back.png" mode="heightFix">
		</image>
	</Navi>
	<view class="bg">
		<view class="ranks">
			<RankItem v-for="(item,index) in data.usersArr" :rankNum="index+1" :integral="item.integral"
				:avatar_url="item.avatar_url" :nickname="item.nickname" :key='index'></RankItem>
		</view>
	</view>
</template>
<style lang="less" scoped>
	.ranks {
		position: absolute;
		bottom: 94px;
		width: 260px;
		height: 420px;
		margin: auto;
		left: 0;
		right: 0;
		box-sizing: border-box;
		padding: 5px;
	}

	.bg {
		position: absolute;
		background-image: url(https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/jf.png);
		top: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		background-size: 100%;
	}
</style>