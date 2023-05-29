<template>
  <div id="app">
    <el-container>
      <el-aside width="180px" class="management_side">
        <!--<div class="unfold"><i class="el-icon-s-unfold wf"></i></div>-->
        <div class="side_menu_bg">
          <div class="side_avatar">
            <el-avatar
              icon="el-icon-user-solid"
              fit="fill"
              :size="100"
            ></el-avatar>
          </div>

          <el-col :span="12" class="side_menu_bg">
            <el-menu
              text-color="#ffffff"
              default-active="2"
              background-color="#4A5064"
              class="el-menu-vertical-demo"
              unique-opened
              router
            >
              <span v-for="s in submenu" :key="s.id">
                <el-menu-item v-if="s.chilLItem.length == 0" :index="s.fireUrl">
                  <i class="el-icon-school">&nbsp;&nbsp;{{ s.menuName }}</i>
                </el-menu-item>
                <el-submenu :index="s.menuName" v-else>
                  <template slot="title"
                    ><i class="el-icon-reading"
                      >&nbsp;&nbsp;{{ s.menuName }}</i
                    ></template
                  >

                  <el-menu-item
                    v-for="l in s.chilLItem"
                    :index="l.fireUrl"
                    :key="l.id"
                    >{{ l.menuName }}</el-menu-item
                  >
                </el-submenu>
              </span>
            </el-menu>
          </el-col>
          <div class="cb"></div>
        </div>
      </el-aside>
      <el-main class="management_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import BroadCast from '../../api/broadcast.js'
export default {
  data() {
    return {
      dataList: null,
      submenu: []
    }
  },
  created() {
    this.dataList = this.$store.getters.role
    if (this.dataList[0] === null) {
      var t = this
      BroadCast.$on('getRoleDone', e => {
        t.listSubItems()
      })
    } else {
      this.listSubItems()
    }
  },
  methods: {
    listSubItems() {
      this.dataList = this.$store.getters.role
      var item = this.dataList.find(x => x.fireUrl === '/organizationlist')
      this.submenu = item.chilLItem
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped></style>
