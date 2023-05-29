<template>
  <el-container class="home_container">
    <!-- 内容主体区 -->
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside width="150px" class="sidenav">
        <!-- 侧边栏菜单区 -->
        <el-menu
          background-color="#44474b"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <!-- 首页（一级菜单）        index只接收字符串Id是数值 解决办法 拼接一个空"";  " -->
          <el-menu-item>
            <i class="el-icon-house">&nbsp;&nbsp;首页</i>
          </el-menu-item>
          <el-menu-item index="/mycourses">
            <i class="el-icon-reading">&nbsp;&nbsp;我的学习</i>
          </el-menu-item>
          <el-menu-item index="/myexam">
            <i class="el-icon-edit">&nbsp;&nbsp;我的考试</i>
          </el-menu-item>
          <el-menu-item index="/rights">
            <i class="el-icon-suitcase">&nbsp;&nbsp;我的课堂</i>
          </el-menu-item>
          <el-menu-item index="/ranslates">
            <i class="el-icon-notebook-1">&nbsp;&nbsp;我的错题</i>
          </el-menu-item>
          <el-menu-item>
            <i class="el-icon-chat-dot-square">&nbsp;&nbsp;消息中心</i>
          </el-menu-item>
          <el-menu-item index="/myrecord">
            <i class="el-icon-wallet">&nbsp;&nbsp;学习档案</i>
          </el-menu-item>
          <el-menu-item index="/userinfo">
            <i class="el-icon-user">&nbsp;&nbsp;个人信息</i>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧主体内容 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      icons: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      releid: {}, // 后台请求的角色ID
      username: '111' // 用户名
    }
  },
  // 生命周期函数 (生命周期函数就是vue实例在某一个时间点会自动执行的函数)
  created() {
    // this.getMenuList();
    this.username = this.$store.getters.userinfo.userName
  },
  methods: {
    chooseSection(e) {
      if (e === 'exit') {
        this.touch()
      } else {
        this.$router.push('/' + e)
      }
    },
    touch() {
      // 退出登录功能
      // 清空token值
      window.sessionStorage.clear()
      // 跳转登录首页
      this.$router.push('/login')
    }
    // async getMenuList(){
    //   const {data:res} =  await this.$http.post('manager/item/tree',this.releid)
    //   console.log(res)
    //   // console.log(res)
    //   if(res.meta.status !== 200){
    //     return res.this.$message.error(res.meta.msg)
    //   }else{
    //     this.menulist = res.data;
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.header {
  background-color: #545c64;
}

.custom_nav .el-menu {
  border-bottom: none;
  height: 90px;
}

.custom_nav .el-menu--horizontal > .el-menu-item {
  height: 90px;
  font-size: 18px;
  padding: 20px;
  padding: 16px 40px;
}

.custom_nav .el-dropdown {
  color: white;
}

.mine {
  padding: 40px 0px;
  text-align: right;
}

.mine .el-dropdown {
  font-size: 14px;
}
</style>
