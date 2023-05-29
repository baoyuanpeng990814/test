<template>
  <div class="container">
    <div id="app">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/userlist' }"
          >用户管理</el-breadcrumb-item
        >
        <el-breadcrumb-item :to="{ path: '/userDetail' }"
          >学籍详情</el-breadcrumb-item
        >
      </el-breadcrumb>
      <div class="content">
        <el-row>
          <el-col
            :span="6"
            v-for="(item, index) in userListLearn"
            :key="item.uId"
            :offset="index > 0 ? 2 : 0"
          >
            <el-card :body-style="{ padding: '0px' }">
              <img
                src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/avatar/%E7%BB%93%E4%B8%9A%E8%AF%81%E4%B9%A6/%E5%AD%A6%E7%B1%8D.png"
                class="image"
              />
              <div class="imgbox">
                <div class="imgcontent">
                  <div class="flexcolmn">
                    <div class="toptitle">结业证书</div>
                    <img :src="item.userCover" class="userstyleimg" alt="" />
                  </div>
                  <div class="detailmain">
                    <div class="marb10 ">
                      <span class="underline">{{ item.name }}</span
                      >学员
                    </div>
                    <div class="textleft">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;于<span
                        class="underline"
                        >{{ item.startTime | createAt }}</span
                      >
                      参加了
                      <!-- <span class="underline">{{item.organizationType}}</span> 组织的 -->
                      <!-- <span class="underline">{{ item.startTime | createAt }}</span>
                至<span class="underline">{{ item.completeTime | createAt }}</span>， -->
                      <span class="underline">{{ item.courseName }}</span
                      >项目普惠公益培训，共计15天，在本次培训中，
                      理论课成绩<span class="underline">{{ item.score }}</span
                      >，实操课成绩<span class="underline">{{
                        item.scoreOperation
                      }}</span>
                      表现优秀，已修完全部课程。考核通过，准许结业。特发此证。
                      <div>
                        学籍编号：<span style="font-size: 12px;">{{ item.bookId }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="padding: 14px;">
                <span>学籍证书</span>
                <div class="bottom clearfix">
                  <el-button
                    type="danger"
                    class="button1"
                    @click="deleteFn(item)"
                    >删除</el-button
                  >
                  <el-button
                    @click="editFn(item)"
                    type="primary"
                    class="button2"
                    >修改</el-button
                  >
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <el-row>
        <el-col
          :span="6"
          v-for="(item, index) in userListContest"
          :key="item.uId"
          :offset="index > 0 ? 2 : 0"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/avatar/%E7%BB%93%E4%B8%9A%E8%AF%81%E4%B9%A6/%E7%AB%9E%E8%B5%9B.png"
              class="image"
            />
            <div class="imgbox">
              <div class="imgcontent imgcontentjs">
                <div class="flexcolmn">
                  <img
                    :src="item.userCover"
                    class="userstyleimg learn-img"
                    alt=""
                  />
                  <!-- <div>学籍编号：<span class="font14">{{ item.bookId }}</span></div> -->
                </div>
                <div class="detailmain learn-detail">
                  <div class="marb10">
                    <span class="underline">{{ item.name }}</span
                    >学员
                  </div>
                  <div class="textleft">
                    于<span class="underline">{{
                      item.completeTime | createAt
                    }}</span
                    >，参加<span class="underline">{{ item.courseName }}</span
                    >竞赛，在本次竞赛中，表现优秀，成绩突出。颁发此证，以资鼓励。
                  </div>
                </div>
              </div>
            </div>
            <div style="padding: 14px;">
              <span>竞赛证书</span>
              <div class="bottom clearfix">
                <el-button type="danger" class="button1" @click="deleteFn(item)"
                  >删除</el-button
                >
                <el-button type="primary" class="button2" @click="editFn(item)"
                  >修改</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // 时间过滤
  filters: {
    createAt(date) {
      var time = new Date(date)
      var year = time.getFullYear()
      var month = time.getMonth() + 1
      var day = time.getDate()
      return year + '-' + month + '-' + day
    }
  },
  data() {
    return {
      userDetail: {}, // 接收上个页面传来的参数
      userListContest: [], // 竞赛证书
      userListLearn: [] // 学籍证书
    }
  },
  created() {
    /* 接收上个页面传来的参数 */
    this.userDetail = this.$route.query.row
    console.log(this.userDetail, '11111111')
    this.getdata()
  },
  methods: {
    // 获取列表
    async getdata() {
      /* 结业证书 */
      let comCert = {}
      comCert.cardId = this.userDetail.cardId
      comCert.name = this.userDetail.name
      const { data: res } = await this.$http.post(
        '/learn/complete/list',
        comCert
      )
      if (res.state !== 200) {
        this.$router.go(-1)
        return this.$message.error('请先去录入学籍信息')
      } else {
        this.userListContest = res.data.filter(
          item => item.completeType === '竞赛证书'
        )
        this.userListLearn = res.data.filter(
          item => item.completeType === '学籍证明'
        )
      }
    },
    // 编辑
    editFn(item) {
      this.$router.push({
        path: '/usereditXueji',
        query: {
          detailrow: item
        }
      })
      localStorage.setItem('item', JSON.stringify(item))
    },
    // 删除
    deleteFn(item) {
      let uId = { uId: item.uId }
      const { data: res } = this.$http.post('/learn/complete/del', uId)
      this.$forceUpdate()
      this.getdata()

      console.log(res)
      // if (res.state !== 200) {
      //   // return this.$message.error('请先去录入学籍信息')
      // } else {
      //   this.getdata()
      //   this.$forceUpdate()
      //   return this.$message.success(res.msg)

      // }
    }
  }
  /*   filters: {
    transformSex: function(sex) {
      if (sex === '1') return '男'
      else return '女'
    },
    transfermflg: function(flg) {
      if (flg === '1') return '是'
      else return '否'
    },
    transformType: function(type) {
      if (type === '1') return '内部'
      else return '外部'
    },
    transformType1: function(type) {
      if (type === '1') return '学籍证明'
      else return '竞赛证书'
    },
    transformDate: function(date) {
      if (date != null) {
        return date.split('T')[0]
      }
    }
  } */
}
</script>

<style scoped>
.detail_lines .el-container {
  display: block;
  overflow: scroll;
}
.detail_lines .el-container .el-button {
  margin: 1rem 0 2rem;
}
.imgstyle {
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 50%;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button1 {
  float: left;
}
.button2 {
  float: right;
}
.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.content {
  margin: 0 auto;
}
.imgbox {
  position: relative;
}
.imgcontent {
  position: absolute;
  top: 3%;
  left: 5%;
  z-index: 1;
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.toptitle {
  color: #0d47a1;
  font-weight: bold;
  font-size: 2rem;
  letter-spacing: 0.5rem;
  margin-bottom: 1rem;
}
.userstyleimg {
  width: 9.375rem;
  height: 9.375rem;
  margin-bottom: 27.625rem;
  object-fit: cover;
  border-radius: 50%;
}
.imgcontent {
  top: -8.75rem;
  width: 70%;
  left: 15%;
}
.detailmain {
  position: absolute;
  width: 100%;
  padding-bottom: 5%;
  font-weight: bold;
}
.underline {
  border-bottom: 1px solid #999;
}
.marb10 {
  text-align: center;
  padding-bottom: 15px;
}
.textleft {
  line-height: 1.5rem;
}
.learn-img {
  margin-bottom: 19.625rem;
}
#app {
  min-height: 100vh;
}
</style>
