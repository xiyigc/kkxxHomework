<script setup>
	import {
		reactive,
		defineProps
	} from "vue";
	import {
		useStore
	} from 'vuex'
	import BackGround from '../../components/public/BackGround.vue'
	import CustomImage from '../../components/public/CustomImage.vue'
	import GgRanks from '../../components/ranks/ggRanks.vue'
	const {
		state
	} = useStore();
</script>
<template>
	<BackGround :customStyle="{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}"
		bgUrl="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/settlementWrap.png">
		<view style="height: 200px;"></view>
		<CustomImage :customStyle="{width:'270px',backgroundRepeat: 'no-repeat',height:'85px'}"
			bgUrl="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/gameover.png"></CustomImage>
		<GgRanks></GgRanks>
	</BackGround>

</template>
<style lang="less" scoped>

</style>