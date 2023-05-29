<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm login_form">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="ruleForm.mobile"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item style="margin-left: 70px;">
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        queryInfo: {
          userName: "",
          password: "",
          mobile: "",
          email: ""
        },
        activeName: 'second',
        ruleForm: {
          name: '',
          pass: '',
          checkPass: '',
          mobile: '',
          email: ''
        },
        rules: {
          name: [{
            required: true,
            message: '请输入您的名称',
            trigger: 'blur'
          }, {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }],
          pass: [{
              required: true,
              message: '请输入正确的密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 12,
              message: '长度在 6 到 12 个字符',
              trigger: 'blur'
            }
          ],
          checkPass: [{
            required: true,
            validator: validatePass2,
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
          email: [{
            required: false
          }]
        }
      };
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (!valid) {
            return this.$message.error('注册失败')
          } else {
            //this.$message.success('注册成功')
            //如果请求成功 发起请求对数据库进行添加用户
            this.queryInfo.userName = this.ruleForm.name
            this.queryInfo.password = this.ruleForm.pass
            this.queryInfo.mobile = this.ruleForm.mobile
            this.queryInfo.email = this.ruleForm.email
            this.createUser()
          }
        });
      },
      async createUser() {
        const {
          data: res
        } = await this.$http.post("/learn/user/register", this.queryInfo)
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          //console.log(res)
          //if(res.state==200)
          this.$message.success('注册成功')
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

  };
</script>

<style lang="less" scoped>
  .login_form {
    //   position:relative;
    //   top:10px;
    //   left:-10px;
  }
</style>
