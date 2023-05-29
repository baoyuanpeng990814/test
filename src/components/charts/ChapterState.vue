<template>
  <div style="width: 450px;height:220px;">
    <div id="piechart" style="width: 450px;height:220px;"></div>
  </div>
</template>

<script>
//课件完成度统计
export default {
  name: 'ChapterState',
  props: {
    pieData: {}
  },
  data() {
    return {
      chart: null,
      option: {
        title: {},
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '80%'],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.option.series[0].data = this.pieData
    this.chart = this.$echarts.init(document.getElementById('piechart'))
    this.chart.setOption(this.option)
  },
  watch: {
    pieData: function(val) {
      this.option.series[0].data = this.pieData
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style></style>
