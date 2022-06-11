<template>
	<div class="cs_statistic">
		<div id="barchart" class="cs_pie"></div>
	</div>

</template>

<script>
  //考试统计框
	export default {
		name: "ExamState",
		props: {
			data: {},

		},
		data() {
			return {

			}
		},
		mounted() {
			this.getLearnState()
		},
		methods: {
			getLearnState() {
    

				var myChart = this.$echarts.init(document.getElementById("barchart"))
				myChart.setOption(this.data)
			}
		}
	}
</script>

<style>
	.cs_pie {
		width: 100%;
		height: 307px;
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
</style>
