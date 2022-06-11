<template>
  <div id="app">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/mystudy' }">我的学习</el-breadcrumb-item>
      <el-breadcrumb-item style="float:right" v-if="this.userList[0] && this.userList[0].role_name">
        <b><u>你好！{{this.userList[0].role_name}} </u></b></el-breadcrumb-item>

    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 课程分类 搜索区 -->
      <div class="text_item">
        <div class="textItemFirst">
          <b>课程选择:</b>
          <el-radio-group v-model="textItemRadio" @change="courseSort">

            <el-radio-button v-for="item in radioList" :key="item.id" :label="item.courseSortId">{{item.courseSortName}}
            </el-radio-button>
          </el-radio-group>
        </div> <!--
        <div class="textItemSection">

          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList" class="ItemInput">
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </div> -->
      </div>
      <!-- 视频区 -->
      <div class="Videos" v-for="item in userList" :key="item.id">
        <div class="videoLeft">
          <!-- 视频图片 -->
          <img :src="item.courseCover" alt="">
        </div>
        <div class="videoCenter">
          <div class="centerTop">{{item.courseName}}</div>
          <div class="centerMiddle">课程类型：{{item.courseSortName}}</div>
          <div class="centerBottom">主讲人：{{item.teacherName}}</div>
        </div>
        <!-- 播放按钮 -->
        <div class="videoRight">
          <el-button type="success" size="medium" @click="userStateChange(item)">进入学习</el-button>
        </div>
      </div>
      <!-- 分页栏区 (current-page绑定当前页数) (page-sizes显示下拉菜单的项) (page-size当前情况下每页显示多少条数据) (layout用来指定用来展示哪些功能组件)-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 8]" :page-size="queryInfo.rows"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

  </div>
</template>
<script>
  import Videoplayback from './Videoplayback.vue'
  export default {
    data() { //组建的私有数据
      // 验证邮箱的校验规则
      var checkEmail = (rule, value, cb) => {
        // 验证邮箱的正则表达式
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

        if (regEmail.test(value)) {
          // 合法的邮箱
          return cb()
        }
        // 非法的邮箱
        cb(new Error('请输入合法的邮箱'))
      }
      // 验证手机号的校验规则
      var checkMobile = (rule, value, cb) => {
        // 验证手机号的正则表达式
        const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

        if (regMobile.test(value)) {
          // 合法的手机号
          return cb()
        }
        // 非法的手机号
        cb(new Error('请输入合法的手机号'))
      }
      return {
        // 获取用户列表的参数
        queryInfo: {
          query:'', //搜索关键字
          page: 1, //当前的页数
          rows: 2, //当前每页显示多少条数据
          courseSortId: '',
          teacher: '',
          likeParameter: ''
        },
        id: "",
        nid: 0,
        radioList: [], //保存课程分类数据
        videoList: [], // 保存vedio数据
        userList: [],
        total: 0,
        value2: true,
        UidType: {
          uid: 1,
          type: true
        },
        // 控制添加用户对话框的显示与隐藏
        dialogVisible: false,
        // 添加用户的表单数据
        addForm: {
          username: '',
          password: '',
          phone: '',
          email: '',
        },
        // 添加表单的验证规则对象
        addFormRules: {
          username: [
            //必填项       提示消息                    鼠标失去焦点触发trigger
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '用户名的长度在3~10的字符之间',
              trigger: 'blur'
            }
            //长度 2~5的区间   提示消息               鼠标失去焦点
          ],
          // 验证密码是否合法
          password: [{
              required: true,
              message: '请输入正确的密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 15,
              message: '用户名的长度在6~15的字符之间',
              trigger: 'blur'
            }
          ],
          // 验证邮箱是否合法
          email: [{
              required: true,
              message: '请输入正确的邮箱',
              trigger: 'blur'
            },
            {
              validator: checkEmail,
              message: '可以使用163邮箱或QQ邮箱',
              trigger: 'blur'
            }
          ],
          // 验证手机号是否合法
          phone: [{
              required: true,
              message: '请输入正确的手机号',
              trigger: 'blur'
            },
            {
              validator: checkMobile,
              message: '手机号的长度为11为的字符',
              trigger: 'blur'
            }
          ],

        },
        // 修改表单的验证规则对象
        editFormRules: {
          // 验证邮箱是否合法
          email: [{
              required: true,
              message: '请输入正确的邮箱',
              trigger: 'blur'
            },
            {
              validator: checkEmail,
              message: '可以使用163邮箱或QQ邮箱',
              trigger: 'blur'
            }
          ],
          // 验证手机号是否合法
          mobile: [{
              required: true,
              message: '请输入正确的手机号',
              trigger: 'blur'
            },
            {
              validator: checkMobile,
              message: '手机号的长度为11为的字符',
              trigger: 'blur'
            }
          ],
        },
        //控制修改用户对话框的显示与隐藏
        editDialogVisible: false,
        // 查询到的用户信息对象，用于页面使用
        editForm: {

        },
        //课程分类选择
        textItemRadio: ''
      }
    },
    created() { //生命周期函数
      this.getUserList() //可以重新获取用户数据
      this.radioChange()
    },
    methods: { //事件处理函数
      omitEmpty(array) {
        var tempQuery = {}
        tempQuery.page = array.page
        tempQuery.rows = array.rows
        if (array.courseSortId != "") tempQuery.courseSortId = array.courseSortId
        if (array.teacher != "") tempQuery.teacher = array.teacher
        if (array.likeParameter != "") tempQuery.likeParameter = array.likeParameter
        return tempQuery
      },
      // 获取数据的方法！
      async getUserList() {
        this.queryInfo = this.omitEmpty(this.queryInfo)
        const {
          data: res
        } = await this.$http.post("/learn/myLearn/courseList", this.queryInfo)
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.userList = res.data;
          this.total = res.count;
          // console.log(this.userList)
        }
      },
      // 监听rows改变的事件
      handleSizeChange(newSize) {
        this.queryInfo.rows = newSize
        this.getUserList()

      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage
        this.getUserList()
      },
      // 获取课程分类
      async radioChange() {
        const {
          data: res
        } = await this.$http.get("learn/myLearn/courseSortList?id=" + this.nid)
        //    console.log(res)
        if (res.state !== 200) {
          this.$message.error("获取数据失败")
        } else {
          this.radioList = res.data
        }
      },
      //点击播放视频按钮 跳转视频播放页
      async userStateChange(item) {
        console.log(item)
        this.$router.push({
          path: '/acquisition',
          query:{
            id:item.courseId,
            enrollId:item.enrollId
          }
        })
      },
      courseSort(v) {
        this.queryInfo.courseSortId = v
        console.log(this.queryInfo.courseSortId)
        this.getUserList() //可以重新获取用户数据
        this.radioChange()
      }

    },

  }
</script>

<style lang="less" scoped>
  // 卡片css
  .box-card {
    margin-top: 20px;
    font-size: 12px;
    padding: 0 !important;
    // height:300px;
  }

  .el-card__body {
    padding: none !important;
  }

  // 表格属性
  .el-table {
    // margin-top:15px;
    border-radius: 4px;
    // font-size: 13px;
    font-family: 华文行楷;
  }

  // 输入框css
  .el-select .el-input {
    width: 110px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  // 设置el-dialog属性
  .abow_dialog {
    display: flex;
    justify-content: center;
    align-items: Center;
    overflow: hidden;

    .el-dialog {
      margin: 0 auto !important;
      height: 40%;
      overflow: hidden;

      .el-dialog__body {
        position: absolute;
        left: 0;
        top: 54px;
        bottom: 0;
        right: 0;
        padding: 0;
        z-index: 1;
        overflow: hidden;
        overflow-y: auto;
      }
    }
  }

  .el_row {
    padding: 0px;
    margin: 0px;
    display: flex;
    vertical-align: middle;
    height: 50px;
  }

  .text_item {
    display: flex;
    line-height: 100px;
  }

  .textItemFirst {
    //   align-items: center;
    width: 70%;
    text-align: left;
    margin-left: 3%;
    float: left;
  }

  .textItemFirst>b {
    color: #666;
    font-size: 17px;
    margin-right: 20px;
  }

  .textItemSection {
    width: 30%;
  }

  .ItemInput {
    width: 80%;
    margin-left: 70px;
  }

  // 视频区 布局
  .Videos {
    //视频
    width: 100%;
    height: 200px;
    border: 1px solid #F1F3F4;
    display: flex;

  }

  .videoLeft {
    width: 15%;
    padding: 35px;
    background-image: 100%;
  }

  .videoLeft>img {
    background-size: 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
  }

  .videoCenter {
    width: 70%;
    float: left;
    padding: 35px;
  }

  .videoRight {
    width: 15%;
    line-height: 200px;

  }

  .centerTop {
    width: 100%;
    height: 35%;
    line-height: 17px;
    text-align: left;
    font-size: 18px;
    font-weight: 700;
    color: #666;
  }

  .centerMiddle {
    width: 100%;
    height: 32.5%;
    line-height: 17px;
    text-align: left;
    font-size: 16px;
    color: #999;
  }

  .centerBottom {
    width: 100%;
    height: 32.5%;
    line-height: 17px;
    text-align: left;
    font-size: 16px;
    color: #999;
  }
</style>
