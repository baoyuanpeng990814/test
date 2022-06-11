<template>
	<div class="acquisition">
		<v-app-bar color="teal lighten-1" dark>
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			
			</v-btn>
			<v-toolbar-title></v-toolbar-title>
		</v-app-bar>
		<div class="body_height ofs">

			<video ref="video"  controlsList="nodownload" class="study_video" id="video" :src="url" controls="controls" autoplay="autoplay">
				您的浏览器不支持 video 标签。
			</video>
			<div class="alert_preview">
				<v-alert color="teal" text type="info">订阅观看完整教学视频</v-alert>
			</div>

			<v-card>
				<v-card-title>
					章节
				</v-card-title>
				<v-card-text>
					<v-list dense>
						<v-list-item-group color="teal lighten-1">
							<v-list-item @click="changeChapter(c)" v-for="c in courseDetail.lChapters">
								<v-list-item-icon>
									<v-icon>mdi-animation-play</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title v-text="c.chapterName"></v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card-text>
			</v-card>


		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				courseDetail: {},
				currentChapter: {},
				timer: null,
				lock: false,
				url: ""
			}
		},
		created() {
			this.courseDetail = this.$route.params
			this.currentChapter = this.courseDetail.lChapters[0]
			this.url = this.currentChapter.lCourseware.resourcesLink

		},
		mounted() {
			var t = this
			var v = this.$refs.video
			this.timer = setInterval(function() {
				if (v.currentTime.toFixed(0) >= 300) {
					clearInterval(t.timer)
					t.currentChapter = null
					v.pause()
					t.url = ""
				}
			}, 1000)
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods: {
			goBack() {
				/* this.courseDetail.courseId = this.courseDetail.id
				this.$router.push({
					name:"CoursePurchase",
					params:this.courseDetail
					
				}) */
				this.$router.go(-1);
			},
			changeChapter(c) {
				this.currentChapter = c
				this.url = this.currentChapter.lCourseware.resourcesLink
				clearInterval(this.timer)
				var t = this
				var v = this.$refs.video
				this.timer = setInterval(function() {
					if (v.currentTime.toFixed(0) >= 300) {
						clearInterval(t.timer)
						t.currentChapter = null
						v.pause()
						t.url = ""
					}
				}, 1000)
			}
		}
	}
</script>

<style>
</style>
