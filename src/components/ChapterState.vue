<template>
	<div class="cs_statistic ofs">
		<div id="piechart" class="cs_pie"></div>
		<div class=" p10">
			<div class="i-row i-align-center ">
				<div class="font-3E3D3D-09 progress-text">章节进度</div>
				<strong style="color: #28BBCE;width: 4rem; "  >{{ Math.ceil(chapterSpeed) }}%</strong>
				<v-progress-linear :value="chapterSpeed" height="0.5rem" color="#28BBCE"></v-progress-linear>
			</div>
			
				
			<div class="i-row i-align-center ">
				<div class="font-3E3D3D-09 progress-text">课程进度</div>
				<strong style="color: #28BBCE; width: 4rem; " >{{ Math.ceil(courseSpeed) }}%</strong>
				<v-progress-linear :value="courseSpeed" height="0.5rem" color="#28BBCE"></v-progress-linear>
			</div>
			
		</div>
	</div>

</template>

<script>
	export default {
		name: "ChapterState",
		props: {
			chapterId: 0,
			courseId: 0,
			pieData: {},

		},
		data() {
			return {
				chapterSpeed: 0,
				courseSpeed: 0,
				option: {
					title: {},
					tooltip: {
						trigger: 'item'
					},
					legend: {
						orient: 'vertical',
						left: 'left',
					},
					series: [{
						type: 'pie',
						radius: ['50%', '80%'],
						data: [],
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				}
			}
		},
		mounted() {
			this.getLearnState()

		},
		methods: {
			getLearnState() {
				this.$store.dispatch('getChapterState', {
					chapterId: this.chapterId,
					courseId: this.courseId
				}).then((res) => {
					if (res.data.state == 200) {
						this.courseSpeed = parseInt(res.data.data.courseSpeed)
						this.courseSpeed = this.courseSpeed>100? 100 :this.courseSpeed
						this.chapterSpeed = parseInt(res.data.data.chapterSpeed)
						this.chapterSpeed = this.chapterSpeed>100? 100 :this.chapterSpeed
						this.option.series[0].data = [{
								name: "未开始",
								value: res.data.data.notCount
							},
							{
								name: "学习中",
								value: res.data.data.ingCount
							},
							{
								name: "已完成",
								value: res.data.data.alreadyCount
							}
						]
						var myChart = this.$echarts.init(document.getElementById("piechart"))
						myChart.setOption(this.option)
					} else {}
				}).catch((res) => {

				})
			}
		},
		watch:{
			chapterId:function(val){
				this.getLearnState()
			}
		}
	}
</script>

<style>
	.cs_pie {
		width: 100%;
		height: 250px;
	}
	.cs_statistic {
		width: 100%;
		height: 400px;
	}
	.cs_statistic .p10 p {
		padding: 5px 0;
		margin: 0;
		font-size: 14px;
	}
	.progress-text{
		width: 6rem;
		
	}
</style>
