<template>
	<v-main>
		<!-- 我的子页面修改密码 -->
		<v-app-bar color="white lighten-1" >
			<v-btn @click="$router.go(-1)" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			
			<v-toolbar-title class="tool_title">修改密码</v-toolbar-title>
			
		</v-app-bar>
		<div class="body_height ofs">
			<v-form v-model="valid">
				<!--  v-model="valid" -->
				<v-container>
					<v-row>
						<v-col cols="12" md="4">
	
							<v-text-field type="password" v-model="datadetail.password" :rules="rules.password" placeholder="请输入原始密码"
								required></v-text-field>
							<v-text-field type="password" v-model="datadetail.newPassword" :rules="rules.newPassword" placeholder="请输入新密码"
								required></v-text-field>
							<v-text-field type="password" v-model="datadetail.confirmPassword" :rules="rules.confirmPassword" placeholder="确认密码"
								required></v-text-field>
							<div class="btn_long" @click="editPassword">修改信息</div>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
			<v-snackbar dark color="teal" v-model="show" >修改成功</v-snackbar>
		</div>
	</v-main>
</template>

<script>
	export default {
		data() {
			return {
				valid:false,
				show:false,
				datadetail: {
					userId:this.$store.getters.userinfo.userId,
					password:"",
					newPassword:""
				},
				rules: {
					password: [
						v => !!v || '原密码不能为空'
					],
					newPassword: [
						v => !!v || '新密码不能为空'
					],
					confirmPassword: [
						v => !!v || '确认密码不能为空',
						v => v == this.datadetail.password || '与新密码不一致',
					]

				}
			}
		},
		created() {
			this.getUserInfo()
		},
		methods: {
			
			editPassword(){
				if(!this.valid) return false
				
				this.$store.dispatch("editPassword", this.datadetail).then((res) => {
					if (res.data.state == 200) {
						this.show = true

					} else {

					}
				}).catch((res) => {

				})
			},
			
			getUserInfo() {
				this.$store.dispatch("getUserInfo", this.$store.getters.userinfo.userId).then((res) => {
					if (res.data.state == 200) {
						this.datadetail = res.data.data
						this.datadetail.sex = this.datadetail.sex == "男" ? 1 : 2
						this.datadetail.entryTime = this.datadetail.entryTime.split("T")[0]
			
					} else {
			
					}
				}).catch((res) => {
			
				})
			}
			
		}
	}
</script>

<style>
</style>
