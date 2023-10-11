<script setup>
	import {
		defineProps
	} from 'vue'
	import BackGround from './BackGround.vue'

	const props = defineProps({
		progress: {},
	})
</script>
<template>
	<BackGround :customStyle="{zIndex:'100'}"
		bgUrl='https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/jiazai.png'>
		<view class="loading">
			<image src="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/touzi.png" mode="widthFix"
				class="spin">
			</image>
			<view class="loading_bar">
				<view class="progress" :style="progress"></view>
			</view>
		</view>
	</BackGround>
</template>

<style scoped lang="less">
	.loading {
		height: 150px;
		width: 240px;
		position: absolute;
		bottom: 180px;
		left: 0;
		right: 0;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;

		.spin {
			width: 80px;
			animation: rotate 1.5s linear infinite;
			transform-origin: center;
		}

		@keyframes rotate {
			0% {
				transform: rotate(0deg);
			}

			100% {
				transform: rotate(360deg);
			}
		}

		.loading_bar {
			width: 100%;
			height: 10px;
			background-image: url(../../static/images/loading.png);
			background-repeat: no-repeat;
			background-size: 100%;
			border-radius: 30px;
			overflow: hidden;

			.progress {
				width: 0%;
				height: 100%;
				background: linear-gradient(to right, rgb(253, 193, 253), rgb(198, 82, 196));
				transition: width 1s ease;
			}
		}
	}
</style>