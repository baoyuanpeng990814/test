<template>
	<div class="acquisition">
		<v-app-bar color="white lighten-1" dark>
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<!-- <div class="tool_title">课程</div> -->
      <div class="tool_title">竞赛评审</div>
			<v-spacer></v-spacer>
			<!-- <v-btn @click="showAG = !showAG" class="ag" icon color="black">
				申请结业
			</v-btn> -->
		</v-app-bar>
		<div class="body_height_note ">
			<transition name="fade">
				<ApplyGraduation v-if="showAG" :courseId="id" :chapterId="currentChapter.chapterId"></ApplyGraduation>
			</transition>
			<video if="currentChapter.lCourseware.resourcesLink!=null" ref="video" class="study_video" id="video"
				controlsList="nodownload" :src="currentChapter.lCourseware.resourcesLink"
				:controls="currentChapter.done" autoplay="autoplay">
				您的浏览器不支持 video 标签。
			</video>

			<div class="list_panel">
				<v-tabs v-model="tab" color="#28BBCE" centered >
					<v-tabs-slider color="#28BBCE " ></v-tabs-slider>
					<v-tab style="background-color: #F1F1F1; " maxWidth="25%" >
						<!-- 章节 -->
            选手
					</v-tab>
					<v-tab style="background-color: #F1F1F1; " maxWidth="25%" >
						笔记
					</v-tab>
					<v-tab style="background-color: #F1F1F1; " maxWidth="25%" >
						统计
					</v-tab>
					<v-tab style="background-color: #F1F1F1;" maxWidth="25%" >
						评论
					</v-tab>
				</v-tabs>
				<div class="tabs_item_height ofs">
					<v-tabs-items v-model="tab">
						<!-- 课程章节列表 -->
						<v-tab-item>
							<v-list dense>
								<v-list-item-group >
									<v-list-item @click="changeChapter(c)" v-for="c in courseDetail.lChapters"  color="#28BBCE">
										<v-img src="../../images/icon/icon_play.png" maxWidth="1rem" MaxHeight="1rem">
										</v-img>
										
										<v-list-item-content>
											<v-list-item-title v-text="c.chapterName" style="margin-left: 10px;"></v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list-item-group>
							</v-list>
						</v-tab-item>
						<!-- 笔记 -->
						<v-tab-item >
							<NoteList :director="director" :courseId="courseDetail.courseId"
								:chapterId="currentChapter.chapterId" class="tabs_item_bottom_height ofs" ></NoteList>

							<div class="bottom">
								<Note @add="director++" :studyNotesTime="currentTime"
									:chapterId="currentChapter.chapterId" :courseId="courseDetail.courseId">

								</Note>
							</div>
						</v-tab-item>
						<!-- 统计 -->
						<v-tab-item>
							<ChapterState :courseId="courseDetail.courseId" :chapterId="currentChapter.chapterId">
							</ChapterState>
						</v-tab-item>
						<!-- 评论 -->
						<v-tab-item>
							<Comment :rating="true" :courseId="courseDetail.courseId"></Comment>
						</v-tab-item>
					</v-tabs-items>
				</div>

			</div>

		</div>


	</div>


</template>

<script>
	import Note from '../../components/Note.vue'
	import NoteList from '../../components/NoteList.vue'
	import ChapterState from '../../components/ChapterState.vue'
	import Comment from '../../components/Comment.vue'
	import ApplyGraduation from '../../components/ApplyGraduation.vue'
	export default {
		components: {
			Note,
			NoteList,
			ChapterState,
			Comment,
			ApplyGraduation
		},
		data() {
			return {
				timer: null,
				currentTime: 0,
				id: 0,
				currentChapter: {
					done: false,
					lCourseware: {
						resourcesLink: ""
					}
				},
				courseDetail: {},
				tab: 0,
				director: 0,
				enrollId: 0,
				learningId: "",
				showAG: false,
				duration: 0,
				vsi: null,
        chapterId:'',
			}
		},
		created() {
			this.id = this.$route.params.id
			this.enrollId = this.$route.params.enrollId

			this.getCourseDetail()
		},
    mounted(){
       // 监听视频停止
    this.$refs.video.addEventListener("ended", () => {
      console.log("video is stop", this.chapterId);
      //this.courseDetail.courseId;课程的id
      //this.courseDetail.courseId[0] 没点的时候第一个视频id
      //this.chapterId  点了之后播放视频的id
      //this.$store.getters.userinfo.userId 人的id
    });
    },
		beforeDestroy() {
			clearInterval(this.timer)
			var v = this.$refs.video
			this.$store.dispatch('recordStudy', {
				learnId: this.learningId,
				chapterId: this.currentChapter.chapterId,
				coursewareId: this.currentChapter.lCourseware.coursewareId,
				learnTime: v.duration,
				enrollId: this.enrollId
			}).then((res) => {}).catch((res) => {})
			if (this.vsi != null) {
				clearInterval(this.vsi)
			}
		},
		methods: {
			changeChapter(val) {
        console.log(val,'点击选视频')
        this.chapterId=val.chapterId
				this.duration = 0
				var v = this.$refs.video
				this.$store.dispatch('recordStudy', {
					learnId: this.learningId,
					chapterId: this.currentChapter.chapterId,
					coursewareId: this.currentChapter.lCourseware.coursewareId,
					learnTime: v.duration,
					enrollId: this.enrollId
				}).then((res) => {}).catch((res) => {})

				clearInterval(this.timer)
				this.currentChapter = val

				this.setTimer()
				if (this.vsi != null) {
					clearInterval(this.vsi)
				}
				var t = this
				this.vsi = setInterval(function() {

					if (!isNaN(v.duration)) {
						//v.src = t.currentChapter.lCourseware.resourcesLink
						t.setVideoProgress()
						//v.play()
						t.$forceUpdate()
						clearInterval(t.vsi)
					}
				}, 100)

			},
			setVideoProgress() {
				if (this.currentChapter.lLearn != null) {
					this.currentChapter.done = false
					this.learningId = this.currentChapter.lLearn.learnId
					var v = this.$refs.video
					var t = this
					setTimeout(function() {
						v.currentTime = t.currentChapter.lLearn.learnTime
						t.currentChapter.done = t.currentChapter.lLearn.learnTime >= v.duration.toFixed(0) - 1
						v.currentTime = 0
						v.play()
					}, 100)
					this.$forceUpdate()
				} else {
					this.currentChapter.done = false
					this.learningId = null
				}

			},
			getCourseDetail() {
				this.$store.dispatch('getCourseDetail', this.id).then((res) => {
					if (res.data.state == 200) {
						this.courseDetail = res.data.data
						this.currentChapter = this.courseDetail.lChapters[0]
						var t = this
						var v = this.$refs.video

						console.log(this.courseDetail)
						this.vsi = setInterval(function() {

							if (!isNaN(v.duration)) {
								//v.src = t.currentChapter.lCourseware.resourcesLink
								//v.play()

								t.setVideoProgress()
								t.$forceUpdate()
								t.setTimer()
								clearInterval(t.vsi)
							}
						}, 100)


					} else {
						//this.snackbar = true
					}
				}).catch((res) => {

				})
			},
			goBack() {
				this.$router.go(-1)
			},
			setTimer() {
				var t = this
				var v = this.$refs.video
				this.timer = setInterval(function() {
					t.currentTime = t.$common.SecondsFormat(v.currentTime.toFixed(0))
					if (v.currentTime >= v.duration) {
						t.$store.dispatch('recordStudy', {
							learnId: t.learningId,
							chapterId: t.currentChapter.chapterId,
							coursewareId: t.currentChapter.lCourseware.coursewareId,
							learnTime: v.duration,
							enrollId: t.enrollId
						}).then((res) => {
							if (res.data.state == 200) {
								clearInterval(t.timer)

							} else {
								//this.snackbar = true
							}
						}).catch((res) => {})
					}
				}, 1000)
			}
		},
		watch: {
			currentTime(val) {},

		}
	}
</script>

<style>
	.bottom {
		bottom: 0;
		height: 90px;
		margin: 0;
		position: page;
		width: 100%;
		
	}
</style>
