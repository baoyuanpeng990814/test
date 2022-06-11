<template>
	<v-app>

		<router-view></router-view>
		<Snackbar />
	</v-app>
</template>

<script>
	import Snackbar from './components/Snackbar.vue'
	export default {
		name: 'App',
		components: {
			Snackbar
		}
	};
</script>
