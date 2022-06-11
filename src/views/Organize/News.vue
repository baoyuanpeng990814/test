<template>
	<v-main>

		<v-app-bar color="white lighten-1" dark>
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<div class="tool_title">服务分类</div>

		</v-app-bar>
		<div class="body_height ofs">


		</div>
	</v-main>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

				data: [],


			}
		},
		created() {

		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
		}
	}
</script>

<style>

</style>
