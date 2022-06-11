<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/userlist' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/usercreate' }">创建用户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建用户</el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>


          <el-form :model="userdetail" :rules="rules" ref="userdetail" label-width="100px"
            class="demo-ruleForm login_form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="账号" prop="userName">
                  <el-input v-model="userdetail.userName"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="密码" prop="password">
                  <el-input v-model="userdetail.password"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="24">

                <el-form-item label="姓名" prop="name">
                  <el-input v-model="userdetail.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row>
          <el-col :span="4">
            所属单位
          </el-col>
          <el-col :span="20">
            <el-input v-model="userdetail.organizationId"></el-input>
          </el-col>
        </el-row>-->
            <el-row>
              <el-col :span="24">
                <el-form-item label="性别" prop="<sex></sex>">
                  <el-radio v-model="userdetail.sex" label="1">男</el-radio>
                  <el-radio v-model="userdetail.sex" label="2">女</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="出生日" prop="birthTime">
                  <el-date-picker type="date" v-model="userdetail.birthTime"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

			<el-row>
			  <el-col :span="24">
			    <el-form-item label="*所属机构" prop="organizationId">
			      <el-input @focus="showOp = true" v-model="twin.organizationName" :readonly="true"></el-input>
			    </el-form-item>
			  </el-col>
			</el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="入职时间" prop="entryTime">
                  <el-date-picker type="date" v-model="userdetail.entryTime"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="证件号" prop="cardId">
                  <el-input v-model="userdetail.cardId"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row>
          <el-col :span="4">
            民族
          </el-col>
          <el-col :span="20">
            <el-input v-model="userdetail.nation"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            学历
          </el-col>
          <el-col :span="20">
            <el-input v-model="userdetail.educationId"></el-input>
          </el-col>
        </el-row>-->
            <el-row>
              <el-col :span="24">

                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="userdetail.mobile"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">

                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="userdetail.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">

                <el-form-item label="状态" prop="stutes">
                  <el-radio v-model="userdetail.stutes" label="1">启用</el-radio>
                  <el-radio v-model="userdetail.stutes" label="0">禁用</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20" :offset="4">
                <el-button type="primary" @click="modifyDetail()">添加</el-button>
              </el-col>
            </el-row>
          </el-form>
            </el-main>
          </el-container>

        </div>
      </el-card>
    </div>

<OrganizationPanel :show="showOp" @choose="choseOrganization" @turnOff="(e)=>showOp = e">
    </OrganizationPanel>

  </div>

</template>

<script>
 import OrganizationPanel from '../panel/OrganizationPanel.vue'
 export default {
   components: {
     OrganizationPanel
   },
    data() {
      return {
        showOp:false,
        twin:{organizationName:""},
        userdetail: {
          userName: "",
          name: "",
          organizationId: "1",
          sex: "",
          birthTime: "",
          entryTime: "",
          cardId: "",
          nation: "",
          educationId: "",
          mobile: "",
          email: "",
          stutes: "",
          password: "123456"
        },
        rules: {
          userName: [{
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: "密码不能为空",
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }],
          sex: [{
            required: true,
            message: '性别不能为空',
            trigger: 'blur'
          }],
          cardId: [{
            required: true,
            message: '证件号不能为空',
            trigger: 'blur'
          }, {
            min: 18,
            max: 18,
            message: "身份证号不正确",
            trigger: 'blur'
          }],
          mobile: [{
            pattern: /^-?\d+\.?\d*$/,
            message: "手机号不正确",
            trigger: 'blur'
          }, {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }, {
            min: 11,
            max: 11,
            message: "手机号长度不正确",
            trigger: 'blur'
          }],
        }
      }
    },
    created() {

    },
    methods: {
      choseOrganization(e){
        this.userdetail.organizationId = e.organizationId
        this.twin.organizationName = e.organizationName
      },
      modifyDetail() {
        this.createUser()
      },
      async createUser() {
        const {
          data: res
        } = await this.$http.post("/manager/user/add", this.userdetail)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {

          this.$message.success('添加成功')
          this.$router.go(-1)
        }
      }
    },
    filters: {
      truncateDate: function(date) {
        return date.split('T')[0]
      }
    }
  }
</script>

<style>
</style>
