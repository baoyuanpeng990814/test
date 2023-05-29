<template>

  <el-container class="home_container">
    <!-- 頭部 -->
    <el-header style="height: 90px;" class="header">
      <el-row class="custom_nav">
        <el-col :span="6">
          <img src="../images/logo1.png" alt="">
        </el-col>
        <el-col :span="15">
          <el-menu mode="horizontal" class="el-menu-demo" background-color="#545c64" text-color="#fff"
            active-text-color="#ffd04b" unique-opened router>
            <!-- 表头 首页 -->
            <el-menu-item index="/mystudy">首页</el-menu-item>
            <!--<el-menu-item index="/gatepage">首页</el-menu-item>-->
            <!-- 表头课程 -->
            <el-menu-item index="/selection">课程</el-menu-item>
            <el-menu-item index="/examfinder">考试</el-menu-item>
            <!-- 表头信息 -->
            <el-menu-item index="/myinvestigations">调查</el-menu-item>
            <!--  -->

          </el-menu>
        </el-col>
        <el-col :span="3" class="mine">
          <el-dropdown @command="chooseSection">
            <span class="el-dropdown-link">
              你好！{{userinfo.userName}} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userinfo">个人设置</el-dropdown-item>
              <el-dropdown-item command="changepwd">修改密码</el-dropdown-item>
              <el-dropdown-item v-if="showControlPanel" command="userlist">后台管理</el-dropdown-item> <!--  -->
              <el-dropdown-item command="exit">登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-col>
      </el-row>

    </el-header>
    <router-view></router-view>
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
        userinfo: {},
        showControlPanel: false
      }
    },
    // 生命周期函数 (生命周期函数就是vue实例在某一个时间点会自动执行的函数)
    created() {
      // this.getMenuList();
      // roleId
      this.$store.commit('updateUserInfo', JSON.parse(document.cookie))
      this.userinfo = this.$store.getters.userinfo      
      this.getMenu()
    },
    methods: {
      async getMenu() {
        const {
          data: res
        } = await this.$http.get('/manager/item/tree?roleId=' + this.userinfo.roleId)
        if (res.state !== 200) {
        } else {
          this.showControlPanel = res.data.length > 0
          this.$forceUpdate()
        }
      },
      closeBrowser() {
        document.cookie = "{'state':false}"
      },
      chooseSection(e) {
        if (e === 'exit') {
          this.touch()
        } else {
          if (e === 'userlist') {
            // this.$router.push('/userlist')
            let {
              href
            } = this.$router.resolve({
              path: '/userlist'
            })
            window.open(href, '_blank')
          } else {
            this.$router.push('/' + e)
          }
        }
      },
      touch() { // 退出登录功能
        // 清空token值
        window.sessionStorage.clear()
        // 跳转登录首页
        this.$router.push('/login')
        document.cookie = "{'state':false}"
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

  .custom_nav .el-menu--horizontal>.el-menu-item {
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
