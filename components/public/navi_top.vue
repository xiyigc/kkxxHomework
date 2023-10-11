<script setup>
	import {
		useStore
	} from 'vuex';
	import {
		ref,
		defineProps
	} from 'vue';
	import {
		onBeforeMount
	} from 'vue'
	const store = useStore();
	const uppper = ref({
		position: 'fixed',
		zIndex: "99",
		backgroundColor: "#fff",
		width: "100%",
	});
	const down = ref({})
	const outer = ref({})
	const props = defineProps({
		opacity: {
			default: false
		},
		padding: {
			default: true
		},
	})
	onBeforeMount(() => {
		if (props.opacity) {
			uppper.value.backgroundColor = '';
		}
		if (props.padding)
			down.value.height = store.state.phone.bottom + 4 + 'px';
		outer.value.marginTop = store.state.phone.top + 'px';
		outer.value.height = store.state.phone.height + 'px';
		uppper.value.height = store.state.phone.bottom + 4 + 'px';
		outer.value.width = store.state.phone.left + 'px';
	})
</script>
<template>
	<view :style="uppper">
		<view :style="outer">
			<slot></slot>
		</view>
	</view>
	<view :style="down"></view>
</template>