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
      <v-toolbar-title class="tool_title">竞赛纪录</v-toolbar-title>
    </v-app-bar>
  </v-main>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
<style></style>
