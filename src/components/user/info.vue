<template>
  <el-container>
    <el-header>
      <p>个人信息</p>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="3">账号:</el-col>
        <el-col :span="10"
          ><el-input
            placeholder=""
            :disabled="true"
            v-model="username"
          ></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="3">手机:</el-col>
        <el-col :span="10"
          ><el-input placeholder="" :disabled="true" v-model="mobile"></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="3">邮箱:</el-col>
        <el-col :span="10"
          ><el-input placeholder="" :disabled="true" v-model="email"></el-input
        ></el-col>
      </el-row>
    </el-main>
    <el-footer> </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: '11',
      mobile: '11',
      email: '11'
    }
  },
  created() {
    this.username = this.$store.getters.userinfo.userName
    this.mobile = this.$store.getters.userinfo.mobile
    this.email = this.$store.getters.userinfo.email
  },
  methods: {}
}
</script>

<style scoped>
.el-main {
  line-height: 70px;
}
.el-header,
.el-main {
  width: 100%;
  margin-bottom: 1px;
  background-color: white;
}
.el-header p {
  text-align: left;
  padding: 10px 10px 10px 10px;
  line-height: 0px;
}
</style>
