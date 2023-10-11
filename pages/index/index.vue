<script setup>
	import {
		reactive,
		onMounted,
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	import BackGround from '../../components/public/BackGround.vue'
	import LoginWrap from '../../components/public/LoginWrap.vue'
	import Toast from '/wxcomponents/dist/toast/toast';
	import Navi from '../../components/public/navi_top.vue'
	const store = useStore();
	const data = reactive({
		guideEnd: false,
		nickname: "",
		headimg: "",
		isUpload: false,
	})

	function waitUntilLoad() {
		data.loadEnd = true;
	}

	const gotoMain = () => {
		uni.navigateTo({
			url: '/subpkg/main/main',
		});
	}

	const submit_userinfo = async (e) => {
		data.nickname = e.detail.value.nickname;
		if (data.nickname == "") {
			Toast({
				message: '请输入合法昵称',
			});
			return;
		}
		// Toast.loading({
		// 	message: '加载中...',
		// 	forbidClick: true,
		// 	duration: 0,
		// });
		let is_suceess = true;
		let fileID = null;
		if (data.isUpload) {
			const res = await uniCloud.uploadFile({
				filePath: data.headimg,
				cloudPath: Math.random().toString(20).substring(2) + '_avatar.jpg',
			});
			fileID = res.fileID;
		} else
			fileID = false;
		try {
			const {
				result
			} = await uniCloud.callFunction({
				name: 'upload',
				data: {
					avatar_url: fileID,
					nick_name: data.nickname,
					token: store.state.token,
					action: "userinfo"
				},
			});
			// console.log(result);
			if (result.status != 200) {
				is_suceess = false;
				throw Error();
			}
			store.commit('setUserInfo', result.userData);
			await uni.setStorage({
				key: "register",
				data: true,
			})
			await uni.setStorage({
				key: "userInfo",
				data: result.userData
			});
		} catch (e) {
			uniCloud.callFunction({
				name: 'else',
				data: {
					token: store.state.token,
					action: "delete_pic",
					fileID: [fileID]
				}
			});
		} finally {
			Toast.clear();
			if (is_suceess) {
				Toast.success('上传成功');
				store.commit('setRegister', true)

				await new Promise(resolve => setTimeout(resolve, 500))
				gotoMain()
			} else {
				Toast.fail('上传失败');
			}
		}
	}
	const onChooseAvatar = (e) => {
		try {
			data.headimg = e.detail.avatarUrl;
			data.isUpload = true;
		} catch (e) {}
	};
	const onlogin = async () => {
		try {
			const token = uni.getStorageSync("token");
			const {
				result
			} = await uniCloud.callFunction({
				name: "login",
				data: {
					token,
					action: "withtoken",
				},
			});
			if (result.status == 200) {
				store.commit("setToken", token);
				store.commit("setUserInfo", result.userData);
			} else throw Error();
		} catch (e) {
			console.log('no token');
			store.dispatch("login");
		} finally {
			if (data.headimg == "") {
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
			data.headimg = store.state.userinfo.avatar_url;
		}
	}
	onMounted(async () => {
		onlogin();
	});

	const changeSt = () => {
		if (store.state.register) gotoMain()
		else data.guideEnd = true;
	}
</script>
<template>
	<van-toast id="van-toast" />
	<view v-if='!data.guideEnd' class="bg"
		style="z-index: 100;background-image: url(https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/u0.png);">
		<image class="begin" src="https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/u1.png"
			mode="widthFix" @tap="changeSt" />
	</view>
	<template v-else>
		<Navi :opacity='true'>
			<view @tap="gotoMain"
				style="align-items: center;height: 100%;display: flex;font-size: 18px;color: #efefef;margin-left: 20px;">
				跳过
			</view>
		</Navi>
		<BackGround :customStyle="{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}"
			bgUrl='https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/page/loginBg.png'>
			<LoginWrap :submit_userinfo='submit_userinfo' :onChooseAvatar='onChooseAvatar' :headimg='data.headimg'>
			</LoginWrap>
		</BackGround>
	</template>
</template>

<style lang="less" scoped>
	.bg {
		top: 0;
		bottom: 0;
		position: absolute;
		height: 100%;
		width: 100%;
		background-size: 100%;
	}

	.begin {
		width: 160px;
		height: 40px;
		position: absolute;
		bottom: 20px;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 1;
	}
</style>