<!-- @format -->

<template>
  <v-main>
    <div class="service_sort_bg">
      <v-app-bar style="background-color: transparent;">
        <v-btn @click="goBack" icon>
          <v-img
            src="../../images/icon/icon_back.png"
            height="18px"
            contain
          ></v-img>
        </v-btn>
        <div class="tool_title" style="color: #2A2C2C;">服务分类</div>
        <v-spacer></v-spacer>

        <v-spacer></v-spacer>
      </v-app-bar>
      <div class="service_sort_list">
        <div
          class="service_sort_item"
          v-for="(item, index) in sortDetail"
          @click="goCompetitionList(item.competitionSortId)"
        >
          <img class="service_sort_icon" :src="item.competitionSortCover" />
          <div class="service_sort_title">{{ item.competitionSortName }}</div>
        </div>
        <div class="service_sort_item"></div>
        <div class="service_sort_item"></div>
        <div class="service_sort_item"></div>
        <div class="service_sort_item"></div>
      </div>
    </div>
  </v-main>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      sortDetail: [],
      query: {
        page: 1,
        rows: 20,
      },
    }
  },
  created() {
    this.getCompetitionSort()
  },
  methods: {
    // 根据服务分类到相应的竞赛列表 param ：
    goCompetitionList(id) {
      //this.$router.push("score");
      this.$router.push({
        name: 'ContestList',
        params: {
          id: id,
        },
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    /* 获取竞赛分类列表 */
    getCompetitionSort() {
      this.$store
        .dispatch('competitionSort', this.query)
        .then((res) => {
          if (res.data.state == 200) {
            this.sortDetail = res.data.data
            console.log(this.sortDetail)
          } else {
          }
        })
        .catch((res) => {})
    },
  },
}
</script>

<style scoped>
.service_sort_bg {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-color: rgba(219, 249, 253);
}
.service_sort_list {
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
}
.service_sort_item {
  width: 27vw;
  height: 27vw;
  border-radius: 0.5rem;
  background-color: #ffffffb8;
  margin: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.service_sort_icon {
  width: 2.625rem;
  height: 2.625rem;
}
.service_sort_title {
  line-height: 2rem;
  color: #2eb1c0;
}
</style>
