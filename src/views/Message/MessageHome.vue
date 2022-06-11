<template>
	<v-main>
		<!-- 我的子页面 我的信息首页 -->
		<v-app-bar color="white">
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<v-spacer></v-spacer>
			<v-toolbar-title>信息中心</v-toolbar-title>
			<v-spacer></v-spacer>
		</v-app-bar>
		<div class="body_no_top ofs">
			<!-- 菜单栏 -->

			<div class="msg_item" @click="go('messagelist?messageType=1')">
				<div class="i-row i-align-center">
					<img class="msg_icon" src="../../images/icon/icon_msg1.png" />
					<div class="i-column marginl-1">
						<div class=" font-666-0-8">
							系统通知
						</div>
						<div class="font-444242-09 max_title">{{msgCountDatas.sysMessage.messageContent}}</div>
					</div>
				</div>
				<div class="i-column min_time">
					<div class="font-666-0-8">{{msgCountDatas.sysMessage.createTime | timeAgo}}</div>
					<div class="dot" v-show="msgCountDatas.sysCount>0">{{msgCountDatas.sysCount}}</div>
				</div>
			</div>
			<div class="msg_item" @click="go('messagelist?messageType=2')">
				<div class="i-row i-align-center">
					<img class="msg_icon" src="../../images/icon/icon_msg2.png" />
					<div class="i-column marginl-1">
						<div class=" font-666-0-8">
							重要通知
						</div>
						<div class="font-444242-09 max_title">{{msgCountDatas.impMessage.messageContent}}</div>
					</div>

				</div>
				<div class="i-column min_time">
					<div class="font-666-0-8">{{msgCountDatas.impMessage.createTime | timeAgo}}</div>
					<div class="dot" v-show="msgCountDatas.impCount>0">{{msgCountDatas.impCount}}</div>
				</div>

			</div>

			<div class="msg_item" @click="go('messagelist?messageType=3')">
				<div class="i-row i-align-center">
					<img class="msg_icon" src="../../images/icon/icon_msg3.png" />
					<div class="i-column marginl-1">
						<div class=" font-666-0-8 ">
							考试通知
						</div>
						<div class="font-444242-09 max_title">{{msgCountDatas.examMessage.messageContent}}</div>
					</div>

				</div>
				<div class="i-column min_time">
					<div class="font-666-0-8">{{msgCountDatas.examMessage.createTime | timeAgo}}</div>
					<div class="dot" v-show="msgCountDatas.examCount>0">{{msgCountDatas.examCount}}</div>
				</div>

			</div>

			<div class="msg_item" @click="go('messagelist?messageType=4')">
				<div class="i-row i-align-center">
					<img class="msg_icon" src="../../images/icon/icon_msg4.png" />
					<div class="i-column marginl-1">
						<div class=" font-666-0-8 ">
							竞赛通知
						</div>
						<div class="font-444242-09 max_title">{{msgCountDatas.comMessage.messageContent}}</div>
					</div>

				</div>
				<div class="i-column min_time">
					<div class="font-666-0-8">{{msgCountDatas.comMessage.createTime | timeAgo}}</div>
					<div class="dot" v-show="msgCountDatas.comCount>0">{{msgCountDatas.comCount}}</div>
				</div>

			</div>

		</div>
	</v-main>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				msgCountDatas: [],
				query: {
					rows: "4",
					page: "1",
					state: "2"
				},


			}
		},
		created() {
			this.getMessageCount();
		},
		methods: {

			getMessageCount() {
				this.$store.dispatch('getMessageCount').then((res) => {
						if (res.data.state == 200) {
							this.msgCountDatas = res.data.data
							if (this.msgCountDatas.sysMessage == null) {
								this.msgCountDatas.sysMessage =""
						}
						if (this.msgCountDatas.impMessage == null) {
							this.msgCountDatas.impMessage = ""
						}
						if (this.msgCountDatas.examMessage == null) {
							this.msgCountDatas.examMessage = ""
						}
						if (this.msgCountDatas.comMessage == null) {
							this.msgCountDatas.comMessage = ""
						}
					} else {
						//this.msgCountDatas = []
					}

				}).catch((res) => {
				this.msgCountDatas = []
			})
		},

		goBack() {

			this.$router.go(-1)
		},
		go(url) {
			this.$router.push(url);

		},



	},
	filters: {
			timeAgo(date) {
				var seconds = Math.floor((new Date() - new Date(date)) / 1000);
				const yearseconds = 365 * 24 * 60 * 60; // 一年有多少秒
				const monthseconds = 30 * 24 * 60 * 60; //  一个月有多少秒
				const dateseconds = 24 * 60 * 60; // 一天有多少秒			 
				let interval = 0;
				if (seconds > dateseconds) {
					return createAt(date);
				} else if (seconds > 3600) {
					interval = Math.floor(seconds / 3600);
					return interval + '小时前';
				} else if (seconds > 60) {
					interval = Math.floor(seconds / 60);
					return interval + '分钟前';
				} else {
					return '刚刚';
				}

				function createAt(date) {
					var time = new Date(date);
					var year = time.getFullYear();
					var month = time.getMonth() + 1;
					var day = time.getDate();
					var hh = time.getHours();
					var mm = time.getMinutes();
					return month + '-' + day;
				}



			},

		},


	}
</script>

<style scoped>
	.msg_item {
		width: 100%;
		height: 5rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 0.5rem;
		border-bottom: 1px solid #F6F6F6;

	}

	.max_title {
		margin-top: 0.2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		height: 1rem;

	}

	.msg_icon {
		width: 2.8rem;
		height: 2.8rem;
		flex-shrink: 0;
	}

	.min_time {
		min-width: 4rem;
		text-align: end;
		justify-content: flex-end;
	}

	.dot {
		margin-left: auto;
		width: 1rem;
		height: 1rem;
		background-color: red;
		color: white;
		border-radius: 50%;
		text-align: center;
		font-size: 0.8rem;
		line-height: 1rem;

	}

	img {
		object-fit: cover;
	}
</style>
