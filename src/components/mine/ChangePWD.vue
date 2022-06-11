<template>
  <div>
    <p>修改密码</p>
    <el-form :model="datadetail" :rules="rules" ref="datadetail" label-width="100px" class="demo-ruleForm login_form">

      <el-row>
        <el-col :span="12">
          <el-form-item label="原密码" prop="password">
            <el-input type="password" v-model="datadetail.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="datadetail.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="重复新密码" prop="confirmPassword">
            <el-input type="password" v-model="datadetail.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modifyDetail()">保存修改</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>


</template>

<script>
  export default {
    data() {
      return {
        datadetail: {
          userId: this.$store.getters.userinfo.userId,
          password: "",
          newPassword: "",
          confirmPassword: ""
        },
        rules: {
          password: [{
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
          }],
          newPassword: [{
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      async modifyDetail() {
        var varification = false
        await this.$refs.datadetail.validate(async valid => {

          varification = valid
        })
        if (!varification) return false
        if (this.datadetail.newPassword != this.datadetail.confirmPassword) {
          this.$message.error("两次输入的密码不相同")
          return false
        }
        const {
          data: res
        } = await this.$http.post("/learn/user/password", this.datadetail)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          return this.$message.success("修改成功")
        }
      }
    }
  }
</script>

<style>
</style>
