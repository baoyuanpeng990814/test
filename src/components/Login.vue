<template>
  <div id="login_container">
    <div class="login_body">
      <div class="login_middle">
        <!-- <img src="../images/bg.png" alt=""> -->
        <div class="login_box">
          <img src="../images/banner.png" alt="" />
          <p class="login">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="登录" name="first">
                <el-form
                  :model="loginForm"
                  :rules="loginFromRules"
                  ref="loginFormRef"
                  label-width="100px"
                  class="login_form"
                >
                  <el-form-item label="名称" prop="userName"
                    ><el-input v-model="loginForm.userName"></el-input
                  ></el-form-item>
                  <el-form-item label="密码" prop="password"
                    ><el-input
                      v-model="loginForm.password"
                      auto-complete="off"
                      type="password"
                    ></el-input
                  ></el-form-item>
                  <el-form-item style="margin-left: 70px;">
                    <el-button
                      type="primary"
                      @click="login('loginFormRef')"
                      @keyup.enter.native="handleLoginFn('loginFormRef')"
                      >登录</el-button
                    >
                    <el-button @click="resetForm('loginFormRef')"
                      >重置</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <register></register>
              </el-tab-pane>
            </el-tabs>
          </p>
        </div>
      </div>
      <div class="login_lower"></div>
    </div>
  </div>
</template>

<script>
// import Register from './Register.vue';
import Register from './Register'

export default {
  components: { Register },
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        userName: '', // admin
        password: '' // 123456
      },
      showControlPanel: false,
      loginFromRules: {
        // 验证规则对象
        // 验证用户名是否合法
        userName: [
          // 必填项       提示消息                鼠标失去焦点触发trigger
          { required: true, message: '请输入正确的账号', trigger: 'blur' },
          { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
          // 长度 2~5的区间   提示消息               鼠标失去焦点
        ],
        // 验证密码是否合法
        password: [
          // 鼠标失去焦点触发trigger
          { required: true, message: '请输入正确的密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      handleClick(tab, event) {},
      activeName: 'first',
      userinfo: {}
    }
  },
  created() {
    const that = this
    document.addEventListener('keydown', that.handleLoginFn)
  },
  methods: {
    handleLoginFn(e) {
      let key = window.event ? e.keyCode : e.which
      if (key === 13) {
        this.login('loginFormRef')
      }
    },
    login(formName) {
      // 先通过ref来获取 账号密码，通过validate属性进行校验如果 ！valid取反没有值就不发起请求直接return出来，否则 通过常量来保存通过axios从后台获取的请求，conslole之后返回的值是一个promise，就可以通过async await来执行异步操作，得出来的Data值为真实的值，通过data.meta.status来进行判断，如果状态码 ！==200 的话 弹出登录失败，否则登录成功
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return false
        } else {
          // this直接访问到http           //地址    形参
          const reasut = await this.$http.post(
            '/learn/user/login',
            this.loginForm
          )
          if (reasut.data.state !== 200) {
            return this.$message.error('登录失败')
          } else {
            // 1.将登录成功之后的 token,保存到客户端的 sessionStorage中
            // 1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
            // 1.2 token 值应在当前网站打开期间生效，所以将 token保存在 sessionStorage中
            const res = reasut.data.data
            // console.log(res)
            window.sessionStorage.setItem('token', res.token)
            // 3.通过编程式跳转导航到后台主页，不由地址时 /home
            // this.$router.push('/home')
            // 4.存储用户信息
            // this.$store.commit("updateUserInfo",res.luser)
            // document.cookie = 'UserInfo=' + JSON.stringify(res.luser)
            this.setCookie('UserInfo', JSON.stringify(res.luser))
            // console.log(this.$store.getters.userinfo)
            this.$store.commit(
              'updateUserInfo',
              JSON.parse(this.getCookie('UserInfo'))
            )
            this.userinfo = this.$store.getters.userinfo
            this.getMenu()
          }
        }
      })
    },

    setCookie(name, value) {
      var Days = 30
      var exp = new Date()
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 30)
      document.cookie =
        name + '=' + escape(value) + ';expires=' + exp.toGMTString()
    },

    getCookie(name) {
      var arr = []
      var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      // eslint-disable-next-line no-cond-assign
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2])
      } else {
        return null
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async getMenu() {
      const { data: res } = await this.$http.get(
        '/manager/item/tree?roleId=' + this.userinfo.roleId
      )
      if (res.state !== 200) {
        return this.$message.error('没有权限！')
      } else {
        let arr = res.data
        this.$store.commit('updateRole', arr)
        this.$message.success('登录成功')
        this.showControlPanel = res.data.length > 0

        this.$router.push('/userlist')
        this.$forceUpdate()
      }
    }
  }
}
</script>

<style lang="less" scoped>
//控制生效的区间 组件内/全局
#login_container {
  position: relative;
  //最大DIV
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.login_body {
  background-image: url(../images/loginbg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 96.9vh;
  padding-top: 30px;
}
.login_middle {
  width: 100%;
  height: 78%;
  display: flex;
}
.login_lower {
  width: 100%;
  height: 11%;
}
.login_box {
  position: relative;
  //登录注册框
  width: 470px;
  //height: 330px;
  border-radius: 4px;
  background: #fff;
  opacity: 0.8;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.04);
  align-self: center; //页面居中
  margin: 235px auto;
  align-items: center;
  font-size: 20px;
  // display: flex;
}
.login_box img {
  position: absolute;
  top: -73px;
  left: 90px;
}
.login {
  width: 400px;
  margin-left: 35px;
  // display: flex;
  // margin:0 auto;
}
.login_form {
  position: relative;
  top: 10px;
  left: -32px;
}
</style>
