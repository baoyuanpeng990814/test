<!-- @format -->

<template>
  <v-main>
    <v-app-bar color="white lighten-1">
      <v-btn @click="$router.go(-1)" icon>
        <v-img
          src="../../images/icon/icon_back.png"
          height="18px"
          contain
        ></v-img>
      </v-btn>
      <v-toolbar-title class="tool_title">我的笔记</v-toolbar-title>
    </v-app-bar>
    <NoteList></NoteList>
    <v-btn block class="blockBtn">作业上传</v-btn>
  </v-main>
</template>
<script>
import NoteList from '../../components/NoteList.vue'
export default {
  components: {
    NoteList,
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
<style scoped>
.theme--light.v-btn.v-btn--has-bg {
  background-color: rgb(247, 254, 255);
}
</style>
