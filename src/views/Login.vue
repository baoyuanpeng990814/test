<template>
	<div  class="top-bg">
		<v-img height="100vh" width="100%" style="position: absolute;
    top: 0;
    left: 0;
}" :src="require('../images/bg_login.png')"></v-img>
		<!-- 登录页面 -->
		<div class="login_frame">


			<v-form v-model="valid" v-if="isLogin">
				<div class="font-303232-1-2 i-center margint-1">秦皇岛家政服务业培训平台</div>
				
					<div class="i-column">
						<div class="i-row margint-2">
							<v-img src="../images/icon/icon_phone.png" maxHeight="1rem" maxWidth="1rem" contain></v-img>
							<div class="font-7c7c7c-0-9 marginl-0-5">用户名</div>

						</div>
						<v-text-field v-model="query.userName" :rules="rule.username" required dense>
						</v-text-field>
						<div class="i-row">
							<v-img src="../images/icon/icon_lock.png" maxHeight="1rem" maxWidth="1rem" contain></v-img>
							<div class="font-7c7c7c-0-9 marginl-0-5">密码</div>

						</div>

						<div class="i-row i-align-center">
							<v-text-field v-model="query.password" :rules="rule.password" required dense
								:type="typePwd ? 'text' : 'password'">

							</v-text-field>
							<v-img maxHeight="1.5rem" maxWidth="1.5rem" contain
								:src="typePwd ?  require('../images/icon/icon_watch.png') : require('../images/icon/icon_unwatch.png')"
								@click="change()"></v-img>
						</div>
<v-checkbox v-model="isremember">
      <template v-slot:label>
        <div>
          记住密码      
        </div>
      </template>
    </v-checkbox>
						
						
						<v-btn @click="login" block dark elevation="2" class="btn_login">登陆</v-btn>
           
						 <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          我已同意
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a
                target="_blank"
                href=""
               
              >
                《秦皇岛家政学习培训平台用户协议》
              </a>
            </template>
         
          </v-tooltip>
      
        </div>
      </template>
    </v-checkbox>
						<v-btn block color="teal" text @click="isLogin=false">注册</v-btn>
					</div>
				
				
					
						
					
				

				
			</v-form>
			<v-form v-model="validr" v-else>
				<v-container>
					<v-row>
						<v-col cols="12" md="4">
							<v-text-field v-model="register.userName" :rules="rule_register.userName" label="账号"
								required>
							</v-text-field>
							<v-text-field type="password" v-model="register.password" :rules="rule_register.password"
								label="密码" required>
							</v-text-field>
							<v-text-field type="password" v-model="register.rePassword"
								:rules="rule_register.rePassword" label="确认密码" required>
							</v-text-field>
							<v-text-field v-model="register.mobile" :rules="rule_register.mobile" label="手机号" required>
							</v-text-field>
							<!-- <v-text-field v-model="register.email" label="电子邮件信箱" required>
							</v-text-field> -->
              				 <v-checkbox v-model="checkbox" class="checkboxstyle">
      <template v-slot:label>
        <div>
          我已同意
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a
                target="_blank"
                href=""
               
              >
                《秦皇岛家政学习培训平台用户协议》
              </a>
            </template>
         
          </v-tooltip>
      
        </div>
      </template>
    </v-checkbox>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" md="4">
							<v-btn @click="userRegister" block color="teal lighten-1" dark elevation="2">注册</v-btn>
						</v-col>
					</v-row>
				</v-container>
				<v-divider></v-divider>
				<div class="m10"></div>
				<v-btn block color="teal " text @click="isLogin=true">返回登录</v-btn>
				<div class="m10"></div>
				<v-divider></v-divider>


			</v-form>


		</div>
		<v-snackbar color="red darken-1" v-model="snackbar">
			登录失败
		</v-snackbar>
		<v-snackbar color="success darken-1" v-model="snackbars">
			注册成功
		</v-snackbar>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        isremember:true,
        checkbox: true,
				isLogin: true,
				snackbar: false,
				query: {
					userName: "",
					password: "",
				},
				register: {
					userName: "",
					password: "",
					mobile: "",
					email: "",
					rePassword: ""
				},
				snackbars: false,
				valid: false,
				validr: false,
				typePwd: false,
				rule: {
					username: [v => !!v || '请填写用户名'],
					password: [v => !!v || '请填写密码']
				},
				rule_register: {
					userName: [v => !!v || '请填写用户名'],
					password: [v => !!v || '请填写密码', v => v.length >= 6 || '密码必须大于6位', v => v.length <= 12 || '小于12位'],
					rePassword: [v => !!v || '请填写确认密码'],
					mobile: [v => !!v || '请填写手机号', v => v.length == 11 || '手机号为11位']
				}
			}
		},
		created() {
      this.getCookie()
    },
		methods: {
			userRegister() {
        if(this.register.userName==''){
          	this.$store.dispatch('snackbar/openSnackbar', {
						msg: '请填写用户名',
						color: 'red'
					})
					return false
        }
        if(this.register.password==''){
          	this.$store.dispatch('snackbar/openSnackbar', {
						msg: '请填写密码',
						color: 'red'
					})
					return false
        }
        if(this.register.rePassword==''){
          	this.$store.dispatch('snackbar/openSnackbar', {
						msg: '请填写确认密码',
						color: 'red'
					})
					return false
        }
        if (this.register.password !== this.register.rePassword) {
					this.$store.dispatch('snackbar/openSnackbar', {
						msg: '确认密码与密码不同',
						color: 'red'
					})
					return false
				}
        if(this.register.mobile==''){
          	this.$store.dispatch('snackbar/openSnackbar', {
						msg: '请填写手机号',
						color: 'red'
					})
					return false
        }
        if(this.checkbox==false){
          	this.$store.dispatch('snackbar/openSnackbar', {
						msg: '请同意平台协议',
						color: 'red'
					})
					return false
        }
				if (!this.validr) return false
				
				this.$store.dispatch('userRegister', this.register).then((res) => {
					if (res.data.state == 200) {

						this.snackbars = true

						this.isLogin = true
						this.register = {}
					} else {
						this.$store.dispatch('snackbar/openSnackbar', {
							msg: res.data.msg,
							color: 'red'
						})
					}
				}).catch((res) => {
					this.$store.dispatch('snackbar/openSnackbar', {
						msg: 'red.data.msg',
						color: 'red'
					})
				})


			},
			login() {
        // query: {
				// 	userName: "",
				// 	password: "",
				// },
        if(this.query.userName==''){
          	this.$store.dispatch('snackbar/openSnackbar', {
						msg: '请填写用户名',
						color: 'red'
					})
					return false
        }
        if(this.query.password==''){
          	this.$store.dispatch('snackbar/openSnackbar', {
						msg: '请填写密码',
						color: 'red'
					})
					return false
        }
				if (!this.valid) return false
         if(this.checkbox==false){
          	this.$store.dispatch('snackbar/openSnackbar', {
						msg: '请同意平台协议',
						color: 'red'
					})
					return false
        }
				this.$store.dispatch('login', this.query).then((res) => {
					if (res.data.state == 200) {
						var val = res.data.data
						window.sessionStorage.setItem("token", val.token)
						document.cookie = JSON.stringify(val.luser)
						this.$router.push('MenuIndex')
            if(this.isremember){
             this.setCookie(this.query.userName,this.query.password,7) 
            }else{
              this.clearCookie()
            }
            
					} else {
						this.snackbar = true
					}
				}).catch((res) => {})
			},
			change() {
				this.typePwd = !this.typePwd;
			},
       //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        console.log(document.cookie)
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        console.log(arr,'arr')
        // this.$store.commit("updateUserInfo", JSON.parse(document.cookie))
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          console.log(arr2,'arr2')
          if (arr2[0] == "userName") {
            this.query.userName = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.query.password = arr2[1];
          }else if(arr2[0] == "userid"){
            let cc={userId:''}

            cc.userId =arr2[1]
            this.$store.commit("updateUserInfo", cc)
            console.log(this.$store.getters.userinfo.userId,'this.$store.getters.userinfo.userId')
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },

		}
	}
</script>

<style>
	.btn_login{
		width: 100%;
		height: 3rem;
		margin:  1rem 0;
		background: linear-gradient(170deg, #83E0EB, #10B8CE);
		box-shadow: 0px 3px 2px 0px rgba(17, 158, 177, 0.2);
		border-radius: 1.5rem;
	}
 .v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label{
    font-size:14px;
      
  }
  .v-icon.v-icon{
    font-size: 20px!important;
  }
  .v-application a{
    color: #10b8ce !important;
  }
  .v-messages{
    display: none;
  }
  .top-bg{
display: flex;
    align-content: center;
    overflow: scroll;
    height: 100vh;
    align-items: center;
  }
  .v-imgbox{
    position: absolute;
    top:0;
    left:0;
  }
  .login_frame{
    margin-top: auto;
  }
</style>
