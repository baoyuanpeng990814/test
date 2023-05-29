<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/carousellist' }"
        >新闻管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/carouselcreate' }"
        >创建新闻</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="card_detail">
      <el-card>
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="20">创建新闻</el-col>
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
              <el-row>
                上传图片到阿里云，如果不用则不填 复制图片到新闻内容
                <el-input v-model="picturesUrl"></el-input>
                <el-upload
                  :on-success="handleAvatarSuccess"
                  class=" mt15 avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                >
                  <img v-if="picturesUrl" :src="picturesUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-row>

              <el-form
                :model="newsdetail"
                :rules="rules"
                ref="newsdetail"
                label-width="100px"
                class="demo-ruleForm login_form"
              >
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="发布对象" prop="competitionUser">
                      <el-input
                        v-model="newsdetail.competitionUser"
                        @focus="dialogUserList = true"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="服务类型" prop="lExamTarget">
                    <el-input
                      v-model="twin.serviceName"
                      @focus="showOp = true"
                      suffix-icon="el-icon-search"
                      :readonly="true"
                    ></el-input>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="内容" prop="content">
                      <quill-editor
                        ref="text"
                        v-model="newsdetail.content"
                        class="myQuillEditor"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="排序" prop="competitionSeq">
                      <el-input-number
                        v-model="newsdetail.competitionSeq"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="状态" prop="competitionState">
                      <el-radio v-model="newsdetail.competitionState" label="1"
                        >已上架</el-radio
                      >
                      <el-radio v-model="newsdetail.competitionState" label="0"
                        >未上架</el-radio
                      >
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20" :offset="4">
                    <el-button type="primary" @click="modifyDetail()"
                      >新增</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
            </el-main>
          </el-container>
        </div>
      </el-card>
    </div>
    <!-- 弹窗-->

    <el-dialog title="" :visible.sync="dialogUserList" width="80%">
      <span>查询userid</span>

      <el-container>
        <!-- 查询树 -->
        <el-aside class="list_tree">
          <el-tree
            :expand-on-click-node="false"
            :default-expand-all="true"
            :data="orgTreedata"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </el-aside>
        <el-main class="list_body">
          <el-table
            height=" calc(100vh - 350px) "
            ref="multipleTable"
            :data="userTableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="userId" label="序号" width="120">
            </el-table-column>
            <el-table-column prop="userName" label="账号" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="sex" label="性别" show-overflow-tooltip>
              <template slot-scope="scope">{{
                scope.row.sex | transfermGender
              }}</template>
            </el-table-column>
            <el-table-column
              prop="organizationName"
              label="所属单位"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click="addUserId(scope.row)"
                  type="text"
                  size="small"
                  >添加</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :page-size="queryInfo2.rows"
            layout="total, prev, pager, next, jumper"
            :total="userTotal"
          >
          </el-pagination>
        </el-main>
      </el-container>
    </el-dialog>
    <CompetitionTypePanel
      :show="showOp"
      @choose="getOd"
      @turnOff="e => (showOp = e)"
    ></CompetitionTypePanel>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import CompetitionTypePanel from '../panel/CompetitionTypePanel.vue'
export default {
  components: {
    CompetitionTypePanel
  },
  data() {
    return {
      showOp: false,
      twin: {
        serviceName: ''
      },
      dialogVisible: false,
      queryInfo: {
        page: 1,
        rows: 10
      },
      queryInfo2: {
        page: 1,
        rows: 10
      },
      queryTreeInfo: {
        page: 1,
        rows: 10
      },
      defaultProps: {
        children: 'chilLOrganization',
        label: 'organizationName'
      },
      dialogUserList: false,
      uploadUrl: this.$serverURL + 'common/uploadCover',
      picturesUrl: '',
      tableData: [],
      orgTreedata: [],
      multipleSelection: [],
      total: 0,
      userTableData: [],
      userTotal: 0,
      newsdetail: {
        competitionId: '',
        competitionSeq: 0, //排序
        competitionSort: '', // 服务类型
        competitionState: 0, // 上架状态
        competitionUser: '', // 新闻用户
        content: '' //内容
      },
      rules: {
        competitionUser: [
          {
            required: true,
            message: '发布对象不能为空',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '内容不能为空',
            trigger: 'blur'
          }
        ],
        newCover: [
          {
            required: true,
            message: '图片不能为空',
            trigger: 'blur'
          }
        ],
        createUser: [
          {
            required: true,
            message: '作者不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.newsdetail.competitionId = this.$route.query.row
    this.getOrganizationTree()
    this.getUserList()
  },
  methods: {
    modifyDetail() {
      this.createContestNews()
    },
    async createContestNews() {
      const { data: res } = await this.$http.post(
        '/manager/cnew/add',
        this.newsdetail
      )
      if (res.state !== 200) {
        return this.$message.error(res.msg)
      } else {
        this.$message.success('添加成功')
        this.$router.go(-1)
      }
    },
    getOd(val) {
      console.log(val)
      this.newsdetail.competitionSort = val.competitionSortId
      this.twin.serviceName = val.competitionSortName
    },
    async getOrganizationTree() {
      const { data: res } = await this.$http.post('/manager/org/tree')
      if (res.state !== 200) {
        return this.$message.error('数据获取失败！')
      } else {
        this.orgTreedata = res.data
        /* */
      }
    },
    async getUserList() {
      const { data: res } = await this.$http.post(
        '/manager/user/list',
        this.queryInfo2
      )
      if (res.state !== 200) {
        //return this.$message.error('数据获取失败！')
        this.userTableData = []
      } else {
        this.userTableData = res.data
        this.userTotal = res.count
      }
    },
    handleAvatarSuccess(res, file) {
      this.picturesUrl = res.url
    },
    /* 查询userid*/
    handleNodeClick(data) {
      this.queryInfo2.organizationId = data.organizationId
      //this.currentNode = data.organizationId
      this.getUserList()
    },

    /* 取出列表的id*/
    addUserId(data) {
      this.newsdetail.competitionUser = data.userId
      this.dialogUserList = false
    },

    // 监听rows改变的事件
    handleSizeChange(groupize) {
      this.queryInfo.rows = groupize
      this.getGrouprList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getGrouprList()
    },
    // 监听rows改变的事件
    handleSelectionChange2(val) {
      this.multipleSelection = val
    },
    handleSizeChange2(groupize) {
      this.queryInfo2.rows = groupize
      this.getUserList()
    },
    // 监听页码值改变的事件
    handleCurrentChange2(newPage) {
      this.queryInfo2.page = newPage
      this.getUserList()
    }
  },
  filters: {
    transformDate: function(date) {
      return date.split('T')[0]
    },
    transformState: function(state) {
      if (state === '1') return '启用'
      else return '禁用'
    },
    transfermGender: function(state) {
      if (state === '1') return '男'
      else return '女'
    }
  }
}
</script>

<style></style>
