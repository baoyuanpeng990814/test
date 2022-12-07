<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userlist' }"
        >用户管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/userdetail' }"
        >学籍详情</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">查看用户学籍</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)"
                >返回</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div class="detail_lines detail1_lines">
          <el-container>
            <el-main v-for="(item,index) in userdetail" :key="index">
              <!--  -->

              <el-row>
                <el-col :span="2">
                  头像
                </el-col>
                <el-col :span="20">
                  <img class="imgstyle" :src="item.userCover
" alt="">

                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  姓名
                </el-col>
                <el-col :span="20">
                  {{ item.name }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  身份证号
                </el-col>
                <el-col :span="20">
                  {{ item.cardId }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  类型
                </el-col>
                <el-col :span="20">
                  {{ item.completeType}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  开始时间
                </el-col>
                <el-col :span="20">
                  {{ item.startTime| truncateDate}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  结业时间
                </el-col>
                <el-col :span="20">
                  {{ item.completeTime| truncateDate}}
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="2">
                  培训项目
                </el-col>
                <el-col :span="20">
                  {{ item.courseName }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  理论分数
                </el-col>
                <el-col :span="20">
                  {{ item.score }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  实操分数
                </el-col>
                <el-col :span="20">
                  {{ item.scoreOperation }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  组织单位
                </el-col>
                <el-col :span="20">
                  {{ item.organizationType }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  培训类型
                </el-col>
                <el-col :span="20">
                  {{ item.coursType }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  学籍编号
                </el-col>
                <el-col :span="20">
                  {{ item.bookId }}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  是否显示
                </el-col>
                <el-col :span="20">
                  {{ item.flag|transfermflg }}
                </el-col>
              </el-row>
              <el-row >
              <el-col :span="4" :offset="6">
                <el-button icon="el-icon-delete" @click="deteXueji(item)"
                >删除</el-button
              >
            </el-col>
            <el-col :span="4" :offset="6">
            
              <el-button icon="el-icon-edit" @click="toeditXueji(item)"
                >编辑</el-button
              >
            </el-col>
          </el-row>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userdetail: {},
      getlist: {}
    }
  },
  created() {
    // this.userdetail = this.$route.query.row
    let cc = localStorage.getItem('item')
this.getlist = JSON.parse(cc)

    this.getdata()
  },
  methods: {
    // 获取列表
    async getdata() {
      let usedetail = {}
      usedetail.cardId = this.getlist.cardId
      usedetail.name = this.getlist.name
      const { data: res } = await this.$http.post(
        '/learn/complete/list',
        usedetail
      )
      
      if (res.state !== 200) {
        this.$router.go(-1)
        return this.$message.error('请先去录入学籍信息')
      } else {
        console.log(res.data, '取到数据')
        this.userdetail = res.data
      }
    },
    // 编辑
    toeditXueji(item) {
      this.$router.push({
          path: '/usereditXueji',
          query: {
            detailrow: item
          }
        })
        localStorage.setItem('item', JSON.stringify(item))
    },
    // 删除
    deteXueji(item) {
      let uId = { uId: item.uId }
      const { data: res } = this.$http.post(
        '/learn/complete/del',
        uId
      )
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
  },
  filters: {
    transfermSex: function(sex) {
      if (sex == '1') return '男'
      else return '女'
    },
    transfermflg: function(flg) {
      if (flg == '1') return '是'
      else return '否'
    },
    transfermType: function(type) {
      if (type == '1') return '内部'
      else return '外部'
    },
    transfermType1: function(type) {
      if (type == '1') return '学籍证明'
      else return '竞赛证书'
    },
    truncateDate: function(date) {
      if (date != null) {
        return date.split('T')[0]
      }
    }
  }
}
</script>

<style scoped>
.detail_lines .el-container{
  display: block;
  overflow: scroll;
}
.detail_lines .el-container .el-button{
  margin: 1rem 0 2rem;
}
.imgstyle{
  width:4rem;
  height:4rem;
  object-fit: cover;
  border-radius: 50%
}
</style>
