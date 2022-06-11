<template>
	<v-main>
		<!-- 课程首页 -->
		<v-app-bar color="white lighten-1">
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>

			</v-btn>
			<div class="tool_title">专题培训</div>

		</v-app-bar>
		<div class="body_no_top ofs">
			<div class="i-row">
				<div class="left_tab">

					<v-tabs v-model="tab" centered slider-color="#24BFD3" vertical color="#24BFD3"
						background-color="#F1F5F5" light slider-size=2>
						<v-tab v-for="d in datas">
							{{d.themeName}}
						</v-tab>
					</v-tabs>

				</div>
				<div class="right-tab-items ">
					<v-tabs-items v-model="tab">
						<v-tab-item v-for="d in datas">
							<ProgramList :more="true" :themeId="d.themeId"></ProgramList>
						</v-tab-item>
					</v-tabs-items>
				</div>

			</div>

		</div>
	</v-main>
</template>

<script>
	import ProgramList from '../../components/ProgramList.vue'
	export default {
		components: {
			ProgramList
		},
		data() {
			return {
				pics: [
					require("../../images/banner1.png"),
					require("../../images/banner2.png")
				],
				datas: [],
				tab: 0
			}
		},
		created() {
			this.getCourseTheme()
		},
		methods: {
			getCourseTheme() {
				this.$store.dispatch("getCourseTheme").then((res) => {
					if (res.data.state == 200) {
						this.datas = res.data.data
						console.log(this.datas);
					} else {

					}
				}).catch((res) => {

				})
			},

			goBack() {
				this.$router.go(-1)
			},
			go() {
				
			}
		}
	}
</script>

<style scoped>
	.v-toolbar__title {
		margin: 0 auto;
	}

	.tool_title {
		font-size: 1.125rem;
		width: 100%;
		font-weight: 500;
		color: #2A2C2C;
		text-align: center;
		margin-right: 2rem;
	}

	.left_tab {
		width: 6rem;

	}

	.right-tab-items {
		width: calc(100% - 6rem);
	}
</style>
