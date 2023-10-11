<script setup>
	import {
		onLaunch
	} from '@dcloudio/uni-app'
	import {
		useStore
	} from 'vuex';
	const store = useStore();
	onLaunch(async () => {
		store.commit('setPhone', uni.getMenuButtonBoundingClientRect());
		store.commit('initDiceUrls');
		const flag = uni.getStorageSync("register");
		if (flag) {
			store.commit('setRegister', true)
			const userinfo = uni.getStorageSync("userInfo")
			store.commit('setUserInfo', userinfo)
		}
		try {
			const {
				cid
			} = await uni.getPushClientId();
			store.commit('setCid', cid);
		} catch (e) {
			console.log(e);
		}
	})
</script>

<style>
</style>