<template>
  <el-container>
    <el-header class="control_header" height="48px">
      <el-row>
        <el-col>
          <el-image
            style="width: 180px; height: 48px"
            :src="require('../images/logo3.png')"
            alt=""
            fit="fit"
          >
          </el-image>
        </el-col>
        <el-col>
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#068FCD"
            text-color="#fff"
            active-text-color="#ffffff"
            unique-opened
            router
          >
            <el-menu-item
              v-for="(d, index) in dataList"
              :index="d.fireUrl"
              :key="index"
              >{{ d.menuName }}</el-menu-item
            >
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
import BroadCast from '../api/broadcast.js'
export default {
  data() {
    return {
      userinfo: null,
      dataList: []
    }
  },
  created() {
    this.userinfo = this.$store.getters.userinfo
    this.getMenu()
    if (this.userinfo.userId === null) {
      // 获取用户信息
      this.$store.commit(
        'updateUserInfo',
        JSON.parse(this.getCookie('UserInfo'))
      )
      this.userinfo = this.$store.getters.userinfo
    }
    this.dataList = this.$store.getters.role
    if (this.dataList[0] === null) {
      this.getMenu()
    }
  },
  methods: {
    async getMenu() {
      // 获取菜单，（如果后台设置了修改了菜单树，需修改route文件）
      if (this.userinfo.roleId) {
        const { data: res } = await this.$http.get(
          '/manager/item/tree?roleId=' + this.userinfo.roleId
        )
        if (res.state !== 200) {
          // return this.$message.error('数据获取失败！')
          this.dataList = []
        } else {
          this.dataList = res.data
          this.$store.commit('updateRole', this.dataList)
          this.$forceUpdate()

          BroadCast.$emit('getRoleDone')
          if (res.data.count === 0) {
            this.$router.push('/')
          } else {
            this.$forceUpdate()
            // this.$router.push(res.data[0].chilLItem[0].fireUrl)
          }
        }
      }
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
    }
  }
}
</script>

<style scoped>
.el-container .el-header {
  padding: 0;
}

.side_menu .el-menu {
  border: none;
}

.side_menu .el-menu .el-menu-item {
  text-align: center;
}

.side_menu .el-menu .el-menu-item i {
  color: white;
}

.el-col {
  width: auto;
}

.el-aside {
  background-color: #333744;
}

.unfold {
  padding: 8px 10px;
  text-align: right;
  background-color: rgb(103, 106, 108);
}

.el-avatar {
  margin: 10px 0 10px 12px;
}
</style>
