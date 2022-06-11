<template>
	<div>
		<div class="edit_commit" v-if="!commited">
			<v-card>

				<v-card-text>
					<div class="comment_radioes">
						<v-radio-group v-model="mCommite.evaluateType" row>
							<v-radio color="#28BBCE" label="好评" value="1"></v-radio>
							<v-radio color="#28BBCE" label="中评" value="2"></v-radio>
							<v-radio color="#28BBCE" label="差评" value="3"></v-radio>
						</v-radio-group>
					</div>
					<div class="comment_body">
						<v-textarea solo label="撰写评论" v-model="mCommite.evaluateContent"></v-textarea>
					</div>
					<v-btn @click="submitComment" block color="#28BBCE" dark>
						提交评论
					</v-btn>
				</v-card-text>
			</v-card>
		</div>
		<!-- <div class="rating" v-if="rating">好评率:{{praise}}%</div> -->


		<v-btn-toggle v-model="evaluateType" color="#28BBCE" group style="width: 100%;">
			<v-btn value="0" width="20%" style="margin: 0;">
				全部
			</v-btn>

			<v-btn value="1" width="20%" style="margin: 0;">
				好评
			</v-btn>

			<v-btn value="2" width="20%" style="margin: 0;">
				中评
			</v-btn>

			<v-btn value="3" width="20%" style="margin: 0;">
				差评
			</v-btn>
			<v-btn value="4" width="20%" style="margin: 0;">
				我的
			</v-btn>
		</v-btn-toggle>



		<v-list subheader>
			<!-- 评论列表 -->
			<v-list-item @click="modifyComment(d)" v-for="d in datas" :key="d.evaluateId">
				<!-- <v-list-item-avatar style="margin-bottom: auto;" v-if="d.user&&d.user.userCover">
					<v-img :src="d.user.userCover">
					</v-img>
				</v-list-item-avatar> -->
        <v-list-item-avatar style="margin-bottom: auto;" >
					<v-img src="../images/icon/icon_mine.png">
					</v-img>
				</v-list-item-avatar>

				<v-list-item-content>
					<!-- 用户：<v-list-item-title v-if="d.user.name"  v-text="d.user.name"></v-list-item-title> -->
          <v-list-item-title v-if="d.user">用户：{{d.user.name}}</v-list-item-title>
					<v-list-item-subtitle v-if="d.updateTime">{{d.updateTime | truncateTime}}</v-list-item-subtitle>
					<!-- 判断是否是更新过 -->
					<v-list-item-subtitle v-else>{{d.createTime | truncateTime}}</v-list-item-subtitle>
					<div class="margint-1">{{d.evaluateContent}}</div>
					<v-list-item-subtitle v-text="$options.filters.rating(d.evaluateType) " style="color: #26A69A;">
					</v-list-item-subtitle>
				</v-list-item-content>

				
			</v-list-item>
		</v-list>

		<v-pagination color="#2AC9DD" v-model="query.page" :length="total" prev-icon="mdi-menu-left"
			next-icon="mdi-menu-right">
		</v-pagination>
		<div class="comment_bottom">
			<div class="comment_btn1">好评率:{{praise}}%</div>
			<div class="comment_btn2" @click="showComment()">评论</div>
		</div>
		<v-snackbar v-model="show" :color="color">
			{{ text }}
		</v-snackbar>
	</div>
</template>

<script>
	export default {
		name: "Comment",
		props: {
			courseId: 0,
			rating: true
		},
		data() {
			return {
				mCommite: {
					evaluateType: "1",
					evaluateContent: "",
					courseId: "",
					userId: "" //evaluateId
				},
				query: {
					page: 1,
					rows: 5,
					evaluateType: "0"
					//userId: 0
				},
				total: 0,
				evaluateType: "0",
				datas:[],
        user:[],
				show: false,
				text: "",
				color: "red lighten-1",
				praise: "0%",
				commited: true,
				userId: 0,
			}
		},
		created() {
			//this.query.userId = this.$store.getters.userinfo.userId
			this.userId = this.$store.getters.userinfo.userId
      console.log(this.$store.getters.userinfo.userId,'this.$store.getters.userinfo.userId')
			this.getCommentList()
		},
		methods: {
			modifyComment(val) {
				if (val.createUser == this.userId) {
					this.commited = false;
					this.mCommite = val;
					
				}
			},

			submitComment() {
				// 单条评论的id
				if (this.mCommite.evaluateId) {
					
					console.log(this.mCommite,'his.mCommite')
					this.$store.dispatch('editComment', this.mCommite).then((res) => {
						if (res.data.state == 200) {
							this.getCommentList()
							this.mCommite.evaluateContent = ""
							this.query.page = 1
							this.show = true
							this.text = "修改成功"
							this.color = "green lighten-1"
							this.mCommite.evaluateId = ""
						} else {
							this.show = true
							this.text = "修改失败"
							this.color = "red lighten-1"
						}
					}).catch((res) => {
						this.show = true
						this.text = "修改失败"
						this.color = "red lighten-1"
					})


					return ""
				}


				this.mCommite.courseId = this.courseId
				this.mCommite.userId = this.$store.getters.userinfo.userId
console.log(this.mCommite,'his.mCommite')
				this.$store.dispatch('addComment', this.mCommite).then((res) => {
					if (res.data.state == 200) {
						this.getCommentList()
						this.mCommite.evaluateContent = ""
						this.query.page = 1
						this.show = true
						this.text = "评论成功"
						this.color = "green lighten-1"

					} else {
						this.show = true
						this.text = "评论失败"
						this.color = "red lighten-1"
					}
				}).catch((res) => {
          console.log('zhel ')
					this.show = true
					this.text = "评论失败"
					this.color = "red lighten-1"
				})
			},
			getCommentList() {
				this.query.evaluateType = this.evaluateType
				if (this.query.evaluateType == "4") this.query.userId = this.userId
				if (this.query.evaluateType == "0" || this.query.evaluateType == "4") delete this.query.evaluateType
				this.query.courseId = this.courseId
				this.$store.dispatch('getCommentList', this.query).then((res) => {
					if (res.data.state == 200) {
						this.datas = []
						this.datas = res.data.data
           
            console.log(this.datas,'datas列表')
						this.praise = res.data.praise
						if (this.datas.findIndex(x => this.datas[0].createUser == this.userId) > -1) {
							this.commited = true
						}
						delete this.query.userId
						this.total = Math.ceil(parseInt(res.data.count) / this.query.rows)
						this.$forceUpdate()
					} else {
						this.datas = []
					}
				}).catch((res) => {

				})
			},
			showComment: function() {
				/* 	 query: {
						page: 1,
						rows: 5,
						evaluateType: "0"
						userId: 0
					}, */
				this.$store.dispatch('getCommentList', {
					page: 1,
					rows: 5,
					userId: this.userId,
					courseId: this.courseId,
				}, ).then((res) => {
					if (res.data.state == 200) {

						var datas = res.data.data
						console.log(datas)
						/* mCommite: {
					evaluateType: "1",
					evaluateContent: "",
					courseId: "",
					userId: "" //evaluateId
				}, */
						this.mCommite.evaluateType = datas[0].evaluateType;
						this.mCommite.evaluateContent = datas[0].evaluateContent;
						this.mCommite.courseId = datas[0].courseId;
						this.mCommite.userId = this.userId;
						this.mCommite.evaluateId = datas[0].evaluateId; 
					} else {
						this.datas = []
					}
				}).catch((res) => {

				})

				this.commited = false;
			}

		},
		watch: {
			evaluateType(val) {
				this.getCommentList();
				console.log("this.query");
				console.log(this.query);
			},
			'query.page'() {
				this.getCommentList()
			}


		},
		filters: {
			rating(val) {
				if (val == "1") {
					return "好评"
				} else if (val == "2") {
					return "中评"
				} else {
					return "差评"
				}
			},
			truncateTime(val) {
				return val.split('T')[0]
			}


		}
	}
</script>

<style>
	.comment_bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 1rem;
	}

	.comment_btn1 {
		width: 116px;
		height: 53px;
		background-image: url(../images/btn_rate1.png);
		background-size: contain;
		color: #2AC9DD;
		line-height: 53px;
		text-align: center;
	}

	.comment_btn2 {
		width: 116px;
		height: 53px;
		background-image: url(../images/btn_rate2.png);
		background-size: contain;
		line-height: 53px;

		color: #FEFEFE;
		text-indent: 66px;
	}
</style>
