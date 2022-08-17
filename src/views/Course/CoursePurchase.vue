<template>

	<v-main>
		<v-app-bar color="witem">
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<v-toolbar-title>课程详情</v-toolbar-title>
			<v-spacer></v-spacer>
		</v-app-bar>
		<div class="body_height ofs">
			<v-card>
				<v-img :src="datadetail.courseCover" style="margin: 0 16px; border-radius: 4px;" />
				<v-card-title style="padding: 16px 16px 0">
					{{datadetail.name}}
				</v-card-title>

				<v-card-text>


					<div class="my-4 subtitle-1">
						<span class="font-3E3D3D-1">主讲人：{{datadetail.teacher}}</span><span
							class="font-3E3D3D-1 marginl-2">主办单位：{{datadetail.courseCompany}}</span>
						<br />
						<span class="font-858786-1">课时：{{datadetail.classHours}}课时</span><span
							class="font-858786-1 ml20">报名人数：{{datadetail.enrollCount}}人</span>
					</div>
					<div class="i-row i-align-center"   v-if="!isNaN(datadetail.courseSpeed)">
						<div style="height: 14px; line-height: 14px; color: #F6B01A;  width: 120px; text-align: start;">
							课程进度：{{ Math.ceil(datadetail.courseSpeed) }}%</div>
						<v-progress-linear v-model="datadetail.courseSpeed" height="6px" color="#F6B01A"
							style=" width:70%;">
						</v-progress-linear>
					</div>
					<div class="i-row i-align-center"   v-else>
						<div style="height: 14px; line-height: 14px; color: #F6B01A;  width: 120px; text-align: start;">
							尚未开课</div>						
					</div>	

					<!-- 评星 -->

					<v-row align="center" class="mx-0 margint-0-5">
						<v-rating :value="rating" color="#28BBCE" background-color="#28BBCE" dense half-increments
							readonly size="14"></v-rating>

						<div class="praise_text  ml-4 " style="color: #28BBCE; font-size: 14px;" v-if="!isNaN(datadetail.praise)">
							{{datadetail.praise}}%好评
						</div>
						<div class="praise_text  ml-4 " style="color: #28BBCE; font-size: 14px;" v-else>
							暂无评价
						</div>
					</v-row>


				</v-card-text>
			</v-card>

			<v-tabs v-model="tab" color="#28BBCE" centered style="width: 100%;" grow>
				<v-tabs-slider color="#F1F1F1 "></v-tabs-slider>
				<v-tab style="background-color: #F1F1F1; ">
					简介
				</v-tab>
				<v-tab style="background-color: #F1F1F1; ">
					目录
				</v-tab>
				<v-tab style="background-color: #F1F1F1;">
					评论
				</v-tab>
			</v-tabs>


			<v-tabs-items v-model="tab">
				<!-- 简介 -->
				<v-tab-item>
					<div class="marginl-1">{{datadetail.description}}</div>
				</v-tab-item>
				<!-- 目录 -->
				<v-tab-item>

					<v-card dense tile class="m10">
						<v-list disabled rounded>
							<v-subheader>目录</v-subheader>
							<v-list-item-group color="primary">
								<v-list-item v-for="c in datadetail.lChapters">
									<v-list-item-icon>
										<v-icon>mdi-animation-play</v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title v-text="c.chapterName"></v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-card>
				</v-tab-item>
				<!-- 评论 -->
				<v-tab-item>

					<v-card class="m10">
						<v-card-text>
							<Comment :rating="false" :courseId="datadetail.id"></Comment>
						</v-card-text>

					</v-card>
				</v-tab-item>
			</v-tabs-items>



			<div v-show="datadetail.recommendStutes=='2'">
				<v-card-actions class=" " v-if="datadetail.courseState == '0'" style="padding: 16px;">
					<!-- 0 -->
					<v-btn @click="enrollCourse" color="#28BBCE " text style="border: #28BBCE 1px solid; ">
						开始学习
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn @click="preview" color="#28BBCE" style="color: #FFFFFF;" >
						预览课程
					</v-btn>
				</v-card-actions>
				
				<span v-else>
					
					<div class="btn_long" @click="toStudy()" >
						开始上课
					</div>
					
					
				</span>
			</div>
			<div v-show="datadetail.recommendStutes=='1'">
				<div class="btn_long" @click="enroll()"  v-show="datadetail.courseState == '0'">
					我要报名
				</div>
				<div class="btn_long"  v-show="datadetail.courseState == '1'">
					已报名
				</div>
			</div>
			
			




		</div>
		<v-snackbar v-model="snackbar" color="red">
			报名失败
		</v-snackbar>
	</v-main>
</template>

<script>
	import Comment from '../../components/Comment.vue'
	export default {
		components: {
			Comment
		},
		data() {
			return {
				datadetail: {},
				rating: 0,
				snackbar: false,
				tab: 0,
			}
		},
		created() {
			this.datadetail = this.$route.params;
			this.getCourseDetailPurchase()
			console.log(this.datadetail,"data详情")
		},
		methods: {
			preview() {
				this.$router.push({
					name: 'CoursePreview',
					params: this.datadetail
				})
			},
			/* 报名课程 */
			enrollCourse() {
				this.$store.dispatch("enrollCourse", {
					courseId: this.datadetail.id,
					userId: this.$store.getters.userinfo.userId
				}).then((res) => {
					if (res.data.state == 200) {
						this.datadetail.courseState = '1'
						this.$forceUpdate()
					} else {
						this.snackbar = true
					}
				}).catch((res) => {
					this.snackbar = true
				})
			},
			transfermRating(val) {
				return parseInt(val) / 20
			}, 
			//getCourseDetail 获取章节详情
			getCourseDetailPurchase() {
				this.$store.dispatch("getCourseDetailPurchase", this.datadetail.courseId).then((res) => {
					if (res.data.state == 200) {
						this.datadetail = res.data.data
						
						
						this.getCourseDetail()
						
						this.rating = this.transfermRating(this.datadetail.praise)
					} else {

					}
				}).catch((res) => {

				})
			}, //getCourseDetail
			getCourseDetail() {
				this.$store.dispatch("getCourseDetail", this.datadetail.id).then((res) => {
					if (res.data.state == 200) {
						this.datadetail.lChapters = res.data.data.lChapters
						this.$forceUpdate()
						
					} else {

					}
				}).catch((res) => {

				})
			},
			/* 点击 开始上课触发事件*/
			toStudy() {
				this.$router.push({
					name: "MyCourses",
					params: {
						likeParameter: this.datadetail.name
					}
				})
				
			},
			/* 自主选课报名 */
			enroll(){
				
				this.$store.dispatch("enroll", {courseId : this.datadetail.id,userId:this.$store.getters.userinfo.userId,}).then((res) => {
					if (res.data.state == 200) {
						this.datadetail.courseState = '1'
						this.$forceUpdate()
				
					} else {
				
					}
				}).catch((res) => {
				
				})
			},
			goBack() {
				/* this.courseDetail.courseId = this.courseDetail.id
				this.$router.push({
					name:"CoursePurchase",
					params:this.courseDetail
					
				}) */
				this.$router.go(-1);
			},

			/*,
			getCourseList() {
				this.$store.dispatch("getCourseList", this.datadetail.id).then((res) => {
					if (res.data.state == 200) {
						this.datadetail.lChapters = res.data.data.lChapters
						this.$forceUpdate()

					} else {

					}
				}).catch((res) => {

				})
			}*/
		}
	}
</script>

<style>
	
</style>
