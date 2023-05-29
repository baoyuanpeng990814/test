<template>
  <div>
    <div id="barchart" class="mt15" style="width:800px;height:600px;"></div>
  </div>
</template>

<script>
// 考试分数统计
export default {
  name: 'CandidateScore',
  props: {
    option: {}
  },
  data() {
    return {
      barchart: null
    }
  },
  mounted() {
    this.barchart = this.$echarts.init(document.getElementById('barchart'))
    this.barchart.setOption(this.option)
  }
}
</script>

<style></style>
