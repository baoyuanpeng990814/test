<!-- @format -->

<template>
  <v-main>
    <!-- 我的页面 -->
    <div class="body_no_top ofs">
      <!-- 头部 -->
      <div class="mine_top">
        <div class="mine">我的</div>
        <div class="i-row i-align-center" style="width: 49%; margin-right: 54%;margin-bottom: 2%;">
          <div class="m0a" v-if="datadetail.userCover != null">
            <v-avatar size="4.5rem" color="teal">
              <v-img width="4.5rem" :src="datadetail.userCover"></v-img>
            </v-avatar>
          </div>
          <div class="m0a" v-else>
            <v-avatar size="4.5rem" color="teal">
              <v-img width="4.5rem" src="../../images/head.png"></v-img>
            </v-avatar>
          </div>
          <div class="i-column marginl-1">
            <div class="fontb-white-1-2 ">
              {{ datadetail.userName }}
              <!-- 欢迎来到家政学院平台 -->
            </div>
            <div class="btn_user_info" @click="go('UserInfo')">
              修改个人资料
            </div>
          </div>
        </div>
      </div>
      <div style="margin: 1rem 0.8rem;">
        <v-img src="../../images/share.png"></v-img>
      </div>
      <!-- 菜单栏 -->
      <div class="mine_item">
        <!-- @click="go('messagehome')" -->
        <div class="i-row i-align-center">
          <img class="mine_icon" src="../../images/icon/icon_msg.png" />
          <div class="fontb-333-1 marginl-1">
            消息中心
          </div>
        </div>
        <v-icon color="grey">mdi-chevron-right</v-icon>
      </div>
      <!-- 问卷调查 -->
      <div class="mine_item" @click="go('investigationhome')">
        <div class="i-row i-align-center">
          <img class="mine_icon" src="../../images/icon/问号.png" />
          <div class="fontb-333-1 marginl-1">
            问卷调查
          </div>
        </div>
        <v-icon color="grey">mdi-chevron-right</v-icon>
      </div>
      <!-- 我的档案 -->
      <div class="mine_item">
        <!-- @click="go('myfiles')" -->
        <div class="i-row i-align-center">
          <img class="mine_icon" src="../../images/icon/icon_files.png" />
          <div class="fontb-333-1 marginl-1">
            我的档案
          </div>
        </div>
        <v-icon color="grey">mdi-chevron-right</v-icon>
      </div>
      <div class="mine_item" @click="go('MyStudyNotes')">
        <div class="i-row i-align-center">
          <img class="mine_icon" src="../../images/icon/icon_record.png" />
          <div class="fontb-333-1 marginl-1">
            学习记录
          </div>
        </div>
        <v-icon color="grey">mdi-chevron-right</v-icon>
      </div>
      <div class="mine_item" @click="go('comptitionrecord')">
        <div class="i-row i-align-center">
          <img class="mine_icon" src="../../images/icon/icon_contest2.png" />
          <div class="fontb-333-1 marginl-1">
            竞赛记录
          </div>
        </div>
        <v-icon color="grey">mdi-chevron-right</v-icon>
      </div>

      <div class="mine_item" @click="go('changepassword')">
        <div class="i-row i-align-center">
          <img class="mine_icon" src="../../images/icon/icon_lock2.png" />
          <div class="fontb-333-1 marginl-1">
            修改密码
          </div>
        </div>
        <v-icon color="grey">mdi-chevron-right</v-icon>
      </div>
      <div class="loginout" @click="tologinpot">退出登录</div>
    </div>
  </v-main>
</template>

<script>
import OrganizationList from '../../components/OrganizationList.vue'
export default {
  components: {
    OrganizationList,
  },
  data() {
    return {
      showOd: false,
      valid: false,

      datadetail: '',
      rules: {
        nameRules: [(v) => !!v || '姓名不能为空'],
        mobile: [(v) => !!v || '手机号不能为空', (v) => (v !== undefined && v.length == 11) || '手机号不正确'],
      },
      uploadUrl: this.$serverURL + 'common/uploadCover',
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    showOLPanel() {
      if (this.datadetail.organizationName === '') {
        this.showOd = true
      }
    },
    getUserInfo() {
      console.log(this.$store.getters, 'this.$store.getters.userinfo.userId')
      this.$store
        .dispatch('getUserInfo', this.$store.getters.userinfo.userId)
        .then((res) => {
          if (res.data.state == 200) {
            this.datadetail = res.data.data
            this.datadetail.sex = this.datadetail.sex == '男' ? 1 : 2
            this.datadetail.entryTime = this.datadetail.entryTime.split('T')[0]
          } else {
          }
        })
        .catch((res) => {})
    },
    go(url) {
      this.$router.push(url)
    },
    tologinpot() {
      this.$store.state.index = 1
      this.$router.push('/')
    },
    share() {
      Android.share()
    },
  },
}
</script>

<style>
.loginout {
  width: 50%;
  margin: 1rem auto;
  padding: 0.3rem;
  text-align: center;
  background: #28bbce;
  border-radius: 2.25rem;
  color: #fff;
}
.mine_top {
  width: 100%;
  height: 11rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: url(../../images/bg_mine.png) no-repeat 100% 100%;
  padding: 0 1rem;
}
.mine {
  margin-top: 33px;
  font-size: 18px;
  color: #ffffff;
  font-family: SourceHanSansCN-Regular;
}
.mine_item {
  width: 100%;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border-bottom: 1px #eaeaea solid;
}
.mine_icon {
  width: 1.2rem;
  height: 1.2rem;
}
.btn_user_info {
  margin-top: 0.625rem;
  width: 7rem;
  padding: 0 0.25rem;
  display: inline-block;
  /* height: 1.625rem; */
  border: 1px solid #ffffff;
  line-height: 1.625rem;
  text-align: center;
  font-size: 0.9rem;
  color: #ffffff;
  border-radius: 2px;
  opacity: 0.66;
}
</style>
