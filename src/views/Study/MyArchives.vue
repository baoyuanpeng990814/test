<template>
	<v-main>
		<v-app-bar color="white lighten-1" dark>
			<v-btn @click="$router.go(-1)" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<div class="tool_title">我的成绩</div>

		</v-app-bar>
		<div class="body_no_top ofs">

			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-left" v-for="th in headers ">
								{{th.text}}
							</th>

						</tr>
					</thead>
					<tbody>
						<tr v-for="item in datas">
							<td>{{ item.examName }}</td>
							<td>{{ item.examTime |truncateTime}}</td>
							<td>{{ item.userScore }}</td>

						</tr>
					</tbody>
				</template>
			</v-simple-table>

			<!-- <template>
				<v-data-table hide-default-footer :headers="headers" :items="datas" class="elevation-1"></v-data-table>
			</template> -->


			<v-pagination v-if="total>1" color="teal lighten-1" v-model="query.page" :length="total"
				prev-icon="mdi-menu-left" next-icon="mdi-menu-right">
			</v-pagination>
		</div>
	</v-main>
</template>

<script>
	export default {
		data() {
			return {
				headers: [{
						text: '考试名称',
						value: 'examName'
					},
					{
						text: '报名时间',
						value: 'examTime'
					},
					{
						text: '分数',
						value: 'userScore'
					}
				],
				query: {
					rows: 10,
					page: 1
				},
				datas: [],
				total: 1,
			}
		},
		created() {
			this.getExamScore()
		},
		methods: {
			transferDate(val) {
				if (val == null) return ""
				return val.split('T')[0] + " " + val.split('T')[1].split('.')[0]
			},
			getExamScore() {
				this.$store.dispatch('getExamScore', this.query).then((res) => {
					if (res.data.state == 200) {
						this.datas = res.data.data
						for (var i = 0; i < this.datas.length; i++) {
							this.datas[i].examTime = this.transferDate(this.datas[i].examTime)

						}

						this.total = Math.ceil(res.data.count / this.query.rows)

					} else {
						this.datas = []

					}
				}).catch((res) => {
					this.datas = []

				})
			}
		},
		watch: {
			'query.page'(val) {
				this.getExamScore()
			}


		},
		filters: {
			truncateTime(time) {
				if (!time) return time;
				var date = time.substr(0, 10); //年月日
				var hours = time.substring(11, 13);
				var minutes = time.substring(14, 16);
				var seconds = time.substring(17, 19);
				var timeFlag = date + ' ' + hours + ':' + minutes + ':' + seconds;
				timeFlag = timeFlag.replace(/-/g, "/");
				timeFlag = new Date(timeFlag);
				timeFlag = new Date(timeFlag.getTime() + 8 * 3600 * 1000);
				timeFlag = timeFlag.getFullYear() + '-' + ((timeFlag.getMonth() + 1) < 10 ? "0" + (timeFlag.getMonth() +
					1) : (timeFlag.getMonth() + 1)) + '-' + (timeFlag.getDate() < 10 ? "0" + timeFlag.getDate() :
					timeFlag.getDate()) + ' ' + (timeFlag.getHours() < 10 ? "0" + timeFlag.getHours() : timeFlag
					.getHours()) + ':' + (timeFlag.getMinutes() < 10 ? "0" + timeFlag.getMinutes() : timeFlag
					.getMinutes()) + ':' + (timeFlag.getSeconds() < 10 ? "0" + timeFlag.getSeconds() : timeFlag
					.getSeconds());
				return timeFlag;

			}
		}
	}
</script>

<style>
</style>
