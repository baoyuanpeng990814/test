<template>
	<v-main>
		<!-- 我的子页面 我的档案 -->

		<v-app-bar color="white lighten-1" dark>
			<v-btn @click="$router.go(-1)" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<div class="tool_title">我的档案</div>

		</v-app-bar>
		<div class="body_no_top ofs">
			<!-- 头部 -->


			<v-tabs v-model="tab" grow slider-color="#28BBCE" color="#28BBCE" style="margin-top: 2px; width: 100%;">
				<v-tab v-for="(d,index) in datas" style="padding: 0 ;min-width: 75px;">
					{{d}}
				</v-tab>
			</v-tabs>



			<v-tabs-items v-model="tab">
				<!-- 基本资料 -->
				<v-tab-item>
					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file1.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							姓名
						</div>:
						<div class="font-303232-1 marginl-1">
							{{datadetail.name}}
						</div>
					</div>

					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file2.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							性别
						</div>:
						<div class="font-303232-1 marginl-1">
							{{datadetail.sex }}
						</div>
					</div>
					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file_age.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							年龄
						</div>:
						<div class="font-303232-1 marginl-1">
							38岁
						</div>
					</div>

					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file_phone.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							电话
						</div>:
						<div class="font-303232-1 marginl-1">
							{{datadetail.mobile}}
						</div>
					</div>
					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file3.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							民族
						</div>:
						<div class="font-303232-1 marginl-1">
							汉族
						</div>
					</div>

					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file4.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							籍贯
						</div>:
						<div class="font-303232-1 marginl-1">
							秦皇岛
						</div>
					</div>
					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file5.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							婚姻状况
						</div>:
						<div class="font-303232-1 marginl-1">
							已婚
						</div>
					</div>
					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file6.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							学历
						</div>:
						<div class="font-303232-1 marginl-1">
							高中
						</div>
					</div>
					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file7.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							服务类型
						</div>:
						<div class="font-303232-1 marginl-1">
							育儿嫂
						</div>
					</div>
					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file8.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							身份证号
						</div>:
						<div class="font-303232-1 marginl-1">
							{{datadetail.cardId}}
						</div>
					</div>

					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file9.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							公司
						</div>:
						<div class="font-303232-1 marginl-1">
							{{datadetail.organizationName}}
						</div>
					</div>
					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file10.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							现住址
						</div>:
						<div class="font-303232-1 marginl-1">
							秦皇岛
						</div>
					</div>

					<div class="file_tab_item">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file11.png">
						</v-img>
						<div class="font-303232-1 marginl-1 file_title">
							体检报告
						</div>:

						<v-img maxHeigh="100px" maxWidth="150px" style="margin-left: 1rem;" src="../../images/pic3.png">
						</v-img>
					</div>
					<div class="file_tab_item ">
						<v-img maxHeight="1.2rem" maxWidth="1.2rem" contain src="../../images/icon/icon_file12.png">
						</v-img>
						<div class="font-303232-1 marginl-1 ">
							心理健康鉴定
						</div>:
						<v-img maxHeigh="100px" maxWidth="150px" src="../../images/pic4.png"></v-img>
					</div>
					<!-- <div class="btn_file_bottom" @click="go('MyArchives')">查看学习成绩</div> -->
				</v-tab-item>
				<!-- 学习档案 -->
				<v-tab-item>
					<div class="file_tab2_item" v-for="(item,index) in data">
						<v-img :src="item.courseCover" max-height="6rem" max-width="6rem">

						</v-img>
						<div class="i-column marginl-1">
							<div class="font-A9ADAD-0-9">{{item.courseName}}</div>
							<div class=" margint-1 font-3E3D3D-09">结业学时：{{item.classHours}}</div>

							<div class=" margint-0-5 font-3E3D3D-09">
								结业时间：{{item.releaseTime }}</div>

						</div>


					</div>
				</v-tab-item>
				<!-- 能力鉴定 -->

				<v-tab-item>
					<div style="border-radius: 0.5rem; border: 1px solid #dbf0ff; margin: 1rem; padding: 1rem; ">

						<div class="i-column  i-align-center" v-for="(item3,index3) in data3">
							<v-img :src="item3.picUrl" max-height="20rem" max-width="80%">

							</v-img>
							<!-- <div class="font-303232-1 margint-1">{{item3.tittle}}</div>
							 -->
							<div class="honor_btn" @click="showDialog(item3) ">查看详情</div>
						</div>


					</div>

				</v-tab-item>
				<!-- 荣誉成就 -->
				<v-tab-item>
					<div class="file_honor_top">

					</div>
					<div class="honor_border">
						<div class="i-column  i-align-center" v-for="(item4,index4) in data4">
							<v-img :src="item4.picUrl" max-height="20rem" max-width="80%">

							</v-img>
							<!-- <div class="font-303232-1 margint-1">{{item3.tittle}}</div>
							 -->
							<div class="honor_btn" @click="showDialog(item4) ">查看详情</div>
						</div>
					</div>



				</v-tab-item>
			</v-tabs-items>



			<!--图片弹窗 -->

			<v-dialog v-model="dialog" width="90%">

				<v-card>
					<img src="../../images/icon/icon-close.png"
						style="float: right; width: 1rem; height: 1rem; margin: 0.5rem;" @click="dialog=!dialog" />
					<v-card-title style="padding-top: 0.25rem; width: 100%;">

						<div class=" font-E99708-1 i-center marginlr-auto ">
							详情
						</div>

					</v-card-title>
					<v-img :src="this.dialogDetail.picUrl" max-height="100%" max-width="100%" style="margin: 0 5px;">

					</v-img>
					<v-card-text>
						<div class="font-303232-1 mt10">{{this.dialogDetail.content}}</div>

					</v-card-text>
					<v-card-actions>


						<v-spacer></v-spacer>


					</v-card-actions>
				</v-card>
			</v-dialog>




		</div>



	</v-main>
</template>

<script>
	import OrganizationList from '../../components/OrganizationList.vue'

	export default {
		components: {
			OrganizationList
		},
		data() {
			return {
				datas: ["基本信息", "知识储备", "能力证明", "荣誉成就"],
				tab: 0,
				showOd: false,
				valid: false,
				show: false,
				dialog: false,
				dialogDetail: "",
				query: {
					page: 1,
					rows: 5,
				},
				datadetail: {
					userCover: null
				},
				rules: {
					nameRules: [
						v => !!v || '姓名不能为空'
					],
					mobile: [
						v => !!v || '手机号不能为空',
						v => v !== undefined && v.length == 11 || '手机号不正确'
					]

				},

				data: [{
						"id": 131,
						"title": "中国人口科学",
						"picUrl": "http://yfqk.salmt.cn/www.beijinggkdcz.com.img.800cdn.com/uploads/allimg/150729/150R46358-0.jpg",
						"studyTime": 36,
						"endTime": "2021-03-27"
					},
					{
						"id": 131,
						"title": "什么是服务",
						"picUrl": "https://booklibimg.kfzimg.com/data/book_lib_img_v2/isbn/1/23e0/23e049569800f22628c8f952a45deee7_0_1_300_300.jpg",
						"studyTime": 8,
						"endTime": "2021-01-03"
					},
					{
						"id": 131,
						"title": "国家职业资格培训教程：公共营养师（国家职业资格三级）（第2版）",
						"picUrl": "https://booklibimg.kfzimg.com/data/book_lib_img_v2/isbn/1/350a/350a17e9e1d172ae811664fdff83183f_0_1_300_300.jpg",
						"studyTime": 15,
						"endTime": ""
					},
				],



				data3: [{
						"id": 131,
						"title": "2020感动中国·江苏十大年度人物 倪文敏",
						"picUrl": require("../../images/pic4.png"),
						"content": "荣誉证书是指记录获得的嘉奖荣誉、作为奖励的证明证件 。它的外形各种各样，由使用单位自行决定采用哪种，且不同的单位使用的格式不同。 荣誉证书是指记录获得的嘉奖荣誉、作为奖励的证明证件 。它的外形各种各样，使用单位自行决定采用哪种，且不同的单位使用的格式不。",

					},

				],
				data4: [{
						"id": 131,
						"title": "2020感动中国·江苏十大年度人物 倪文敏",
						"picUrl": require("../../images/pic2.png"),
						"content": "荣誉证书是指记录获得的嘉奖荣誉、作为奖励的证明证件 。它的外形各种各样，由使用单位自行决定采用哪种，且不同的单位使用的格式不同。 荣誉证书是指记录获得的嘉奖荣誉、作为奖励的证明证件 。它的外形各种各样，使用单位自行决定采用哪种，且不同的单位使用的格式不。",

					},
					{
						"id": 131,
						"title": "特等奖！一等奖！这项竞赛参赛8人全获奖",
						"picUrl": "https://img0.baidu.com/it/u=1198522324,1140642566&fm=26&fmt=auto&gp=0.jpg",
						"content": "特等奖！一等奖！这项竞赛参赛8人全获奖荣誉证书是指记录获得的嘉奖荣誉、作为奖励的证明证件 。它的外形各种各样，由使用单位自行决定采用哪种，且不同的单位使用的格式不同。",

					},
					{
						"id": 131,
						"title": "标准语等级证书",
						"picUrl": "https://pics7.baidu.com/feed/4d086e061d950a7b168a1e75100aecd1f3d3c923.jpeg?token=4425c84b81ea618b246018076470fac1",
						"content": "标准语等级证书",

					},
				],
				uploadUrl: this.$serverURL + "common/uploadCover",
			}
		},
		created() {
			this.getUserInfo();
			this.getGraduationList();
		},
		methods: {
			showOLPanel() {
				if (this.datadetail.organizationName == '') {
					this.showOd = true
				}


			},

			getUserInfo() {
				this.$store.dispatch("getUserInfo", this.$store.getters.userinfo.userId).then((res) => {
					if (res.data.state == 200) {
						this.datadetail = res.data.data
						this.datadetail.sex = this.datadetail.sex == "1" ? "男" : "女"
						this.datadetail.entryTime = this.datadetail.entryTime.split("T")[0]
					} else {

					}
				}).catch((res) => {

				})
			},
			go(url) {
				this.$router.push(url);

			},
			showDialog(item) {

				this.dialogDetail = item;
				this.dialog = true;
				console.log(this.dialogDetail);
			},
			getGraduationList() {
				this.$store.dispatch('getGraduationList', this.query).then((res) => {
					if (res.data.state == 200) {
						this.data = res.data.data
					} else {
						this.data = []
					}

				}).catch((res) => {
					this.datas = []
				})
			},
		},
		filters: {
			truncateTime(val) {
				return val.split('T')[0]
			}
		}

	}
</script>

<style>
	.file_tab_item {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding: 1rem;
		border-bottom: 1px #F2F2F2 solid;
	}


	.file_tab2_item {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding: 0.5rem;
		width: 96%;
		margin: 0 auto;
		border-bottom: 1px #F2F2F2 solid;
	}

	.file_title {
		width: 5rem;
		text-align: justify;
		text-align-last: justify;
		text-justify: distribute;
	}

	.btn_file_bottom {
		width: 90%;
		margin: 5%;
		border-radius: 4px;
		border: 1px solid #28BBCE;
		height: 3.5rem;
		line-height: 3.5rem;
		color: #28BBCE;
		background-color: white;
		text-align: center;
	}

	.file_honor_top {
		background-image: url(../../images/bg_honor.png);
		width: 95vw;
		margin: 0 auto;
		height: 30vw;
		background-size: 100%;
	}

	.honor_border {
		width: 86vw;
		margin: -21.6vw auto 0;
		border-left: 2px solid #FAEBEB;
		border-bottom: 2px solid #FAEBEB;
		border-right: 2px solid #FAEBEB;

		padding: 1rem 0;
	}

	.honor_btn {
		width: 5.625rem;
		height: 2.25rem;
		border: 1px solid #FDA60F;
		border-radius: 0.25rem;
		text-align: center;
		line-height: 2.25rem;
		font-size: 1rem;
		font-weight: 500;
		color: #E99708;
		margin: 10px 0 1.25rem;
	}
</style>
