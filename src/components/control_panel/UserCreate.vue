<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userlist' }"
        >用户管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/usercreate' }"
        >创建用户</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建用户</el-col>
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
                :model="userDetail"
                :rules="rules"
                ref="userDetailRef"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="账号" prop="userName">
                      <el-input v-model.trim="userDetail.userName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="手机号" prop="mobile">
                      <el-input v-model="userDetail.mobile"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="姓名" prop="name">
                      <el-input v-model.trim="userDetail.name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--<el-row>
          <el-col :span="4">
            所属单位
          </el-col>
          <el-col :span="20">
            <el-input v-model="userDetail.organizationId"></el-input>
          </el-col>
        </el-row>-->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="证件号" prop="cardId">
                      <el-input
                        v-model.trim="userDetail.cardId"
                        @change="autoBirthFn()"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="性别" prop="sex">
                      <el-radio-group v-model="userDetail.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="*所属机构" prop="organizationId">
                      <el-input
                        @focus="showOrgDialog = true"
                        v-model.trim="twin.organizationName"
                        :readonly="true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="入职时间" prop="entryTime">
                      <el-date-picker
                        type="date"
                        v-model="userDetail.entryTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="出生日期" prop="birthTime">
                      <el-date-picker
                        type="date"
                        v-model="userDetail.birthTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!--<el-row>
          <el-col :span="4">
            民族
          </el-col>
          <el-col :span="20">
            <el-input v-model="userDetail.nation"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            学历
          </el-col>
          <el-col :span="20">
            <el-input v-model="userDetail.educationId"></el-input>
          </el-col>
        </el-row>-->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="密码" prop="password">
                      <el-input v-model.trim="userDetail.password"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- <el-row>
                  <el-col :span="24">
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="userDetail.email"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row> -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="状态" prop="stutes">
                      <el-radio v-model="userDetail.stutes" label="1"
                        >启用</el-radio
                      >
                      <el-radio v-model="userDetail.stutes" label="0"
                        >禁用</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" style="text-align: center">
                    <el-button type="primary" @click="modifyDetail()"
                      >添加</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>

    <OrganizationPanel
      :show="showOrgDialog"
      @choose="choseOrganization"
      @turnOff="e => (showOrgDialog = e)"
    >
    </OrganizationPanel>
  </div>
</template>

<script>
import OrganizationPanel from '../panel/OrganizationPanel.vue'
import Today from '../../assets/common.js/today.js'
export default {
  components: {
    OrganizationPanel
  },
  data() {
    return {
      showOrgDialog: false,
      twin: { organizationName: '' },
      userDetail: {
        userName: '',
        name: '',
        organizationId: '1',
        sex: '2',
        birthTime: '',
        entryTime: '',
        cardId: '',
        nation: '',
        educationId: '',
        mobile: '',
        email: '',
        stutes: '1',
        password: '123456'
      },
      organizationId: '', // 记录路由传过来的参数
      rules: {
        userName: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
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
        sex: [
          {
            required: true,
            message: '性别不能为空',
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
        mobile: [
          {
            pattern: /^-?\d+\.?\d*$/,
            message: '手机号不正确',
            trigger: 'blur'
          },
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '手机号长度不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    // 获取当前时间
    this.userDetail.entryTime = Today.getDate(this.userDetail.entryTime)
    if (this.$route.query.organizationId) {
      this.organizationId = this.$route.query.organizationId
    }
  },
  methods: {
    // 获取当前日期
    /* getTodayFn(){
      this.Today.getDate()
      console.log('被调用了');
    }, */
    // 证件号输入后生日自动显示且选择性别
    autoBirthFn() {
      let year = this.userDetail.cardId.substring(6, 10)
      let month = this.userDetail.cardId.substring(10, 12)
      let day = this.userDetail.cardId.substring(12, 14)
      let birthdayTime = year + '-' + month + '-' + day
      if (
        this.userDetail.cardId &&
        parseInt(this.userDetail.cardId) % 2 === 0
      ) {
        this.userDetail.sex = '1'
      } else {
        this.userDetail.sex = '2'
      }
      if (
        birthdayTime !== 0 &&
        birthdayTime !== undefined &&
        birthdayTime !== null
      ) {
        this.userDetail.birthTime = birthdayTime
      }
    },
    choseOrganization(e) {
      this.userDetail.organizationId = e.organizationId
      this.twin.organizationName = e.organizationName
    },
    modifyDetail() {
      this.createUser()
    },
    // 添加表单按钮
    async createUser() {
      this.$refs.userDetailRef.validate(async valid => {
        if (!valid) {
          return valid
        } else {
          const { data: res } = await this.$http.post(
            '/manager/user/add',
            this.userDetail
          )
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            this.$message.success('添加成功')
            this.$router.push({
              path: '/userlist',
              query: { organizationId: this.organizationId }
            })
          }
        }
      })
    }
  },
  filters: {
    transformDate: function(date) {
      return date.split('T')[0]
    }
  }
}
</script>

<style></style>
