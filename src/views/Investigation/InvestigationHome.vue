<!-- @format -->

<template>
  <v-main class="main-background">
    <!-- 问卷调查首页 -->
    <v-toolbar color="#F9FAFD" dark>
      <v-btn @click="goBack" icon>
        <v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
      </v-btn>
      <div class="tool_title">问卷调查</div>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div class="body_height ofs">
      <BeingQuestionaryList :more="false" :pagination="false"></BeingQuestionaryList>
    </div>
  </v-main>
</template>

<script>
import BeingQuestionaryList from '../../components/BeingQuestionaryList.vue'
import ComingQuestionaryList from '../../components/ComingQuestionaryList.vue'
export default {
  components: {
    BeingQuestionaryList,
    ComingQuestionaryList,
  },
  data() {
    return {
      pics: [require('../../images/banner1.png'), require('../../images/banner2.png')],
      datas: [],
    }
  },
  created() {},
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.v-toolbar__title {
  margin: 0 auto;
}

</style>
