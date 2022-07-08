<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/questionarylist' }">问卷调查</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/questionarycreate' }">编辑问卷</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">编辑问卷
              &nbsp;&nbsp;
              <el-button v-if="dataDetail.examineId != null" @click="showId = true">编辑问题</el-button>
            </el-col>
            <el-col :span="4">
              <el-button icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="edit_lines">
          <el-container>
            <el-main>
              <el-form :model="dataDetail" :rules="rules" ref="roledetail" label-width="100px"
                class="demo-ruleForm login_form">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="封面" prop="examineCover">
                      <el-input v-model="dataDetail.examineCover"></el-input>
                      <el-upload :on-success="handleAvatarSuccess" class=" mt15 avatar-uploader" :action="uploadUrl"
                        :show-file-list="false">
                        <img v-if="dataDetail.examineCover" :src="dataDetail.examineCover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="名称" prop="examineName">
                      <el-input v-model="dataDetail.examineName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="编号" prop="examineNum">
                      <el-input v-model="dataDetail.examineNum"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="所属机构" prop="organizationId">
                      <el-input v-model="twin.organizationName" @focus="showOd=true" :readonly="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="次数限制" prop="examFrequency">
                      <el-input-number v-model="dataDetail.examineFrequency"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="开始时间" prop="startTime">
                      <el-date-picker v-model="dataDetail.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="开始时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="失效时间" prop="endTime">
                      <el-date-picker v-model="dataDetail.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="失效时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="说明" prop="description">
                      <el-input type="textarea" :rows="4" v-model="dataDetail.description"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="submitCreation()">提交</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>
    <OrganizationPanel :show="showOd" @choose="getOd" @turnOff="(e) => showOd=e"></OrganizationPanel>
    <Inquiry :show="showId" :examineId="dataDetail.examineId" @choose="getOd" @turnOff="(e) => showId=e"></Inquiry>
  </div>
</template>

<script>
  import OrganizationPanel from '../panel/OrganizationPanel.vue'
  import Inquiry from '../panel/Inquiry.vue'
  export default {
    components: {
      OrganizationPanel,
      Inquiry
    },
    data() {
      return {
        showId: false,
        showOd: false,
        twin: {
          organizationName: ''
        },
        dataDetail: {},
        rules: {},
        uploadUrl: this.$serverURL + 'common/uploadCover'
      }
    },
    created() {
      if (this.$route.query.row == null) {
        this.dataDetail.examineSortId = this.$route.query.parent
        this.dataDetail.examineState = '0'
        this.dataDetail.lExamineQuestions = []
      } else {
        this.dataDetail = this.$route.query.row
        // console.log(this.dataDetail)
        this.twin.organizationName = this.dataDetail.organizationName
      }
    },
    methods: {
      async submitCreation() {
        if (this.dataDetail.examineId != null && this.dataDetail.examineId != '' && this.dataDetail.examineId != 0) {
          const {
            data: res
          } = await this.$http.post('/manager/examine/edit', this.dataDetail)
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            this.$forceUpdate()
            return this.$message.success('修改成功')
          }
        } else {
          const {
            data: res
          } = await this.$http.post('/manager/examine/add', this.dataDetail)
          if (res.state !== 200) {
            return this.$message.error(res.msg)
          } else {
            this.$message.success('创建成功')
            this.dataDetail.examineId = res.data
            this.$forceUpdate()
            // this.$router.go(-1)
          }
        }
      },
      getOd(val) {
        this.dataDetail.organizationId = val.organizationId
        this.twin.organizationName = val.organizationName
      },
      handleAvatarSuccess(res, file) {
        this.dataDetail.examineCover = res.url
        this.$forceUpdate()
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
