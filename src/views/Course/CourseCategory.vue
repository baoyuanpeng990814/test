<template>
	<v-main>
		<v-app-bar color="teal lighten-1" dark>
			<v-btn @click="$router.push('CourseHome')" icon>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
		</v-app-bar>
		<v-toolbar color="teal darken-1">
			<v-tabs v-model="tab" centered slider-color="teal" dark>
				<v-tab v-for="d in themes">
					{{d.themeName}}
				</v-tab>
			</v-tabs>
		</v-toolbar>
		<div class="body_height_2_top ofs">
			<v-card>
				<v-tabs-items v-model="tab">

					<v-tab-item v-for="d in themes">
						<v-row align="center">
							<v-item-group v-model="d.window" class="slight_right shrink mr-6" mandatory>
								<v-item class="aside_dot" v-slot="{ active, toggle }">
									<div>
										<v-btn :input-value="active" icon @click="toggle">
											<v-icon>mdi-record</v-icon>
										</v-btn>
									</div>
								</v-item>
								<v-item class="aside_dot" v-for="n in d.chilLTheme" :key="n.themeId"
									v-slot="{ active, toggle }">
									<div>
										<v-btn :input-value="active" icon @click="toggle">
											<v-icon>mdi-record</v-icon>
										</v-btn>
									</div>
								</v-item>
							</v-item-group>
							<v-col class="for_v_col">
								<v-window v-model="d.window" class="elevation-1" vertical>
									<v-window-item>
										<div class="corner_set">全部</div>
										<ProgramListVertical :trigger="trigger" :pagination="true" :more="false"
											:themeId="d.themeId" :childTheme="childTheme"></ProgramListVertical>
									</v-window-item>
									<v-window-item v-for="n in d.chilLTheme" :key="n.themeId">
										<div class="corner_set">{{n.themeName}}</div>
										<ProgramListVertical :trigger="trigger" :pagination="true" :more="false"
											:themeId="n.themeId" :childTheme="childTheme"></ProgramListVertical>
									</v-window-item>
								</v-window>
							</v-col>
						</v-row>
					</v-tab-item>
				</v-tabs-items>
			</v-card>
		</div>
	</v-main>
</template>

<script>
	import ProgramListVertical from '../../components/ProgramListVertical.vue'
	export default {
		components: {
			ProgramListVertical
		},
		data() {
			return {
				query: {
					themeId: 0,

				},
				tab: 0,
				themes: [],
				filterPlace: false,
				childTheme: 0,
				trigger: 1,
				window: 0
			}
		},
		created() {
			this.query.themeId = 9 //this.$route.params.themeId
			this.getCourseTheme()
		},
		methods: {
			changeId(val) {
				this.childTheme = val
				//this.query.themeId = val
			},
			getCourseTheme() {
				this.$store.dispatch("getCourseTheme").then((res) => {
					if (res.data.state == 200) {
						this.themes = res.data.data
						this.tab = this.themes.findIndex(x => x.themeId == this.query.themeId)
					} else {

					}
				}).catch((res) => {

				})
			}
		},
		watch: {
			tab(val) {
				this.trigger = val
			}
		}
	}
</script>

<style scoped>

</style>
