<template>
  <div id="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userlist' }"
        >用户管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/useredit' }"
        >录入学籍</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">录入学籍</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)"
                >返回</el-button
              >
            </el-col>
          </el-row>
        </div>

        <div class="edit_lines">
          <el-container>
            <el-main>
              <el-form
                :model="userdetail"
                :rules="rules"
                ref="userdetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-form-item label="上传头像" prop="userCover">
                    <el-input v-model="userdetail.userCover"></el-input>
                    <el-upload
                      :on-success="handleAvatarSuccess"
                      class=" mt15 avatar-uploader"
                      :action="uploadUrl"
                      :show-file-list="false"
                    >
                      <img
                        v-if="userdetail.userCover"
                        :src="userdetail.userCover"
                        class="avatar"
                      />
                      <i
                        v-else
                        class="el-icon-plus avatar-uploader-icon"
                        style="display:flex;justify-content: center;align-items: center;"
                      ></i>
                    </el-upload>
                  </el-form-item>
                </el-row>
                <!-- <el-row>
                  <el-col :span="24">
                    <el-form-item label="密码" prop="password">
                      <el-input v-model="userdetail.password"></el-input>
                    </el-form-item>
                  </el-col>
                
                </el-row> -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="姓名" prop="name">
                      <span>{{userdetail.name}}</span>
                      <!-- <el-input v-model="userdetail.name"></el-input> -->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="身份证号" prop="cardId">
                      <span>{{userdetail.cardId}}</span>
                   
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="类型" prop="completeType">
                      <el-radio v-model="userdetail.completeType" label="1"
                        >电子学籍</el-radio
                      >
                      <el-radio v-model="userdetail.completeType" label="2"
                        >竞赛证书</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="开始时间" prop="startTime">
                      <el-date-picker
                        type="date" @change="changetime"
                        v-model="userdetail.startTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="结业时间">
                      <el-date-picker
                        type="date" 
                        v-model="userdetail.completeTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="培训项目" prop="courseName">
                      <el-input v-model="userdetail.courseName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="理论分数" prop="score">
                      <el-input v-model="userdetail.score"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="实操分数" prop="score_operation">
                      <el-input v-model="userdetail.scoreOperation"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="组织单位" prop="organizationType">
                      <el-input v-model="userdetail.organizationType"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="培训类型" prop="coursType">
                      <el-input v-model="userdetail.coursType"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="生成编号" prop="bookId">
                      <el-input v-model="userdetail.bookId">
                        <el-button slot="prepend" @click="tobookId()"
                          >生成</el-button
                        >
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="是否显示" prop="flag">
                      <el-radio v-model="userdetail.flag" label="1"
                        >显示</el-radio
                      >
                      <el-radio v-model="userdetail.flag" label="0"
                        >不显示</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20" :offset="4" v-if="isedit">
                    <el-button type="primary" @click="modifyDetail()"
                      >录入学籍</el-button
                    >
                  </el-col>
                  <el-col :span="20" :offset="4" v-else>
                    <el-button type="primary" @click="modifyDetail()"
                      >修改学籍</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>

    <!-- <OrganizationPanel :show="showOp" @choose="choseOrganization" @turnOff="(e)=>showOp = e">
		</OrganizationPanel> -->
    <!-- <RolePanel :show="showRp" @choose="choseRole" @turnOff="(e)=>showRp = e">
		</RolePanel> -->
  </div>
</template>

<script>
// import RolePanel from '../panel/RolePanel.vue'
// import OrganizationPanel from '../panel/OrganizationPanel.vue'

export default {
  // components: {
  // 	// OrganizationPanel,
  // 	RolePanel
  // },
  data() {
    return {
      // showRp: false,
      // showOp: false,
      // twin: {
      // 	organizationName: ''
      // },
      uploadUrl: this.$serverURL + 'common/uploadCover',
      userdetail: {},
      isedit: false,
      
      rules: {
        userCover: [
          {
            required: true,
            message: '请上传头像',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }
        ],
        cardId: [
          {
            required: true,
            message: '证件号不能为空',
            trigger: 'blur'
          },
          {
            min: 18,
            max: 18,
            message: '身份证号不正确',
            trigger: 'blur'
          }
        ],
        completeType: [
          {
            required: true,
            message: '类型不能为空',
            trigger: 'blur'
          }
        ],
        startTime: [
          {
            required: true,
            message: '请选择开始时间',
            trigger: 'blur'
          }
        ],
      
        courseName: [
          {
            required: true,
            message: '培训项目不能为空',
            trigger: 'blur'
          }
        ],
        organizationType: [
          {
            required: true,
            message: '组织单位不能为空',
            trigger: 'blur'
          }
        ],
        coursType: [
          {
            required: true,
            message: '培训类型不能为空',
            trigger: 'blur'
          }
        ],
        bookId: [
          {
            required: true,
            message: '证书编号不能为空',
            trigger: 'blur'
          },
          {
            min: 12,
            message: '证书编号不正确',
            trigger: 'blur'
          }
        ],
        flag: [
          {
            required: true,
            message: '是否显示不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    console.log(this.$route.query.detailrow, 'this.$route.query.row')
    if (this.$route.query.row) {
      this.isedit = true
      this.userdetail.jobNumber = this.$route.query.row.gonghao
    this.userdetail.cardId = this.$route.query.row.cardId
    this.userdetail.name = this.$route.query.row.name
    this.userdetail.userId = this.$route.query.row.userId
    this.userdetail.organizationType = '秦皇岛市家政联合工会'
    this.userdetail.coursType = '普惠公益培训'
    } else {
      this.isedit = false
      this.userdetail = this.$route.query.detailrow
      if (this.userdetail.flag == 1) {
        this.userdetail.flag = '1'
      } else if (this.userdetail.flag == 0) {
        this.userdetail.flag = '0'
      }
      if (this.userdetail.completeType == '学籍证明') {
        this.userdetail.completeType = 1
      } else {
        this.userdetail.completeType = 2
      }
      this.userdetail.completeType = this.userdetail.completeType.toString()
    }
    
    // this.twin.organizationName = this.$route.query.row.organizationName
    // this.userdetail.sex = this.userdetail.sex == '男' ? '1' : '2'
  },
  methods: {
    changetime() {
this.tobookId()
    },
    handleAvatarSuccess(res, file) {
      this.$nextTick(() => {
        this.userdetail.userCover = res.url
        console.log(this.userdetail.userCover)
        this.$forceUpdate()
      })
    },
    formatDateTime (data) {
      let date = new Date(data)
        let timeStr = date.getFullYear() + '-'
        if (date.getMonth() < 9) {
          // 月份从0开始的
          timeStr += '0'
        }
        timeStr += date.getMonth() + 1 + '-'
        timeStr += date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        return timeStr
    },
    tobookId() {
      if (
        this.userdetail.startTime !== '' &&
        this.userdetail.startTime !== undefined &&
        this.userdetail.cardId !== ''
      ) {
        let date = new Date(this.userdetail.startTime)
        let timeStr = date.getFullYear()
        if (date.getMonth() < 9) {
          // 月份从0开始的
          timeStr += '0'
        }
        timeStr += date.getMonth() + 1
        timeStr += date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        console.log(timeStr)
       // 截取身份证14位之后的数
        let cardId = this.userdetail.cardId.slice(14)
        this.userdetail.bookId = this.userdetail.jobNumber + timeStr + cardId
        this.$forceUpdate()
      } else {
        this.$message({
          message: '请先选择开始时间',
          type: 'warning'
        })
      }
    },
    // choseRole(e) {
    // 	this.userdetail.roleId = e.roleId
    // 	this.userdetail.roleName = e.roleName
    // },
    // choseOrganization(e) {
    // 	this.userdetail.organizationId = e.organizationId
    // 	this.twin.organizationName = e.organizationName
    // },
    modifyDetail(item) {
      if (this.userdetail.userCover == undefined) {
        this.$message({
          message: '请先上传头像',
          type: 'warning'
        })
        return
      }
      if (this.userdetail.completeType == undefined) {
        this.$message({
          message: '请先选择类型',
          type: 'warning'
        })
        return
      } else {
        if (this.userdetail.completeType == 1) {
          this.userdetail.completeType = '学籍证明'
        } else {
          this.userdetail.completeType = '竞赛证书'
        }
      }

      // startTime
      if (this.userdetail.startTime != undefined) {
        this.userdetail.startTime = this.formatDateTime(this.userdetail.startTime)
      } else {
        this.$message({
          message: '请先选择开始时间',
          type: 'warning'
        })
        return
      } 
      
      if (this.userdetail.courseName == undefined || this.userdetail.courseName == '') {
        this.$message({
          message: '请填写培训项目',
          type: 'warning'
        })
        return
      }
      if (this.userdetail.bookId == undefined || this.userdetail.bookId == '') {
        this.$message({
          message: '请先生成编号',
          type: 'warning'
        })
        return
      }
      if (this.userdetail.flag == undefined) {
        this.$message({
          message: '请先选择是否显示',
          type: 'warning'
        })
        return
      } 
      console.log(this.userdetail, 'this.userdetail')
      if (this.$route.query.row) {
         this.modifyUser()
      } else {
        this.tobookId()
        this.editmodifyUser() 
      }
    },
    async editmodifyUser() {
      const { data: res } = await this.$http.post(
        '/learn/complete/edit',
        this.userdetail
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('修改成功')
        // this.$router.push({
        //   path: '/userlist'
         
        // })
        this.$router.go(-1)
      }
    },
    async modifyUser() {
      const { data: res } = await this.$http.post(
        '/learn/complete/add',
        this.userdetail
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('录入成功')
        this.$router.go(-1)
      }
    }
  },

  watch: {
    userdetail() {
      console.log(this.userdetail)
    }
  }
}
</script>

<style></style>
