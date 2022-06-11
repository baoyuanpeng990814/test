<template>
	<v-main>
		<!-- 我的子页面修改信息 -->
		<v-app-bar color="white lighten-1" dark >
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<div class="tool_title">个人信息</div>
			
		</v-app-bar>
		<div class="body_height ofs">
			<v-form v-model="valid">
				<!--  v-model="valid" -->
				<v-container>
					<v-row>
						<v-col cols="12" md="4">
							<div class="m0a" v-if="datadetail.userCover!=null">
								<v-avatar size="100" color="teal">
									<v-img width="200" :src="datadetail.userCover"></v-img>
								</v-avatar>
							</div>
							<v-file-input accept="image/png, image/jpeg, image/bmp" placeholder="头像网址"
								@change="uploadFile" prepend-icon="mdi-camera" label="上传头像">
								
								</v-file-input>
								
								
							<!-- <input type="file" @change="uploadFile"/> -->
							
							
							
							<v-text-field readonly v-model="datadetail.userName" :rules="rules.userName" label="账号"
								required ></v-text-field>
							<v-text-field v-model="datadetail.name" :rules="rules.nameRules" label="姓名" required>
							</v-text-field>
							<v-radio-group v-model="datadetail.sex"  row>							
									<span>性别</span>									
										<v-radio label="男" :value="1" color="#28BBCE"></v-radio>
										<v-radio label="女" :value="2" color="#28BBCE"></v-radio>															
							</v-radio-group>
							
							<v-text-field @click="showOLPanel" readonly v-model="datadetail.organizationId" label="所属机构" required>
							</v-text-field>
							
							
							<v-text-field :readonly="datadetail.cardId!=''" v-model="datadetail.cardId" label="身份证号" required>
							</v-text-field>
							<v-text-field :readonly="datadetail.entryTime!=''" v-model="datadetail.entryTime" label="入职时间" required>
							</v-text-field>
							<v-text-field v-model="datadetail.email" label="电子邮箱" required>
							</v-text-field>
							<v-text-field type="number" v-model="datadetail.mobile" :rules="rules.mobile" label="手机号"
								required>
							</v-text-field>
							<div  @click="editUserInfo" class="btn_long">修改信息</div>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
			<v-snackbar dark color="teal" v-model="show" >修改成功</v-snackbar>
		</div>
		<OrganizationList :show="showOd" @turnOff="(e)=> showOd = e" ></OrganizationList>
	</v-main>
</template>

<script>
	import OrganizationList from '../../components/OrganizationList.vue'
	export default {
		components:{
			OrganizationList
		},
		data() {
			return {
				showOd:false,
				valid:false,
				show:false,
				datadetail: {
					userCover: null
				},
				rules: {
					nameRules: [
						v => !!v || '姓名不能为空'
					],
					mobile: [
						v => !!v || '手机号不能为空',
						v => v!==undefined&& v.length ==11 || '手机号不正确'
					]

				},
				uploadUrl: this.$serverURL + "common/uploadCover",
			}
		},
		created() {
			this.getUserInfo()
		},
		methods: {
			showOLPanel(){
				if(this.datadetail.organizationName==''){
					this.showOd=true
				}
				
				
			},
			async uploadFile(val) {
				console.log(val)
				var forms = new FormData()
				var configs = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
				forms.append('file', val)
				this.axios.post(this.uploadUrl, forms, configs).then(res => {
					
					this.datadetail.userCover = res.data.url
					console.log(this.datadetail.userCover)
					this.$forceUpdate()
				})


			},
			editUserInfo(){
				if(!this.valid) return false
				
				this.$store.dispatch("editUserInfo", this.datadetail).then((res) => {
					console.log(this.datadetail)
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
						this.datadetail.sex = this.datadetail.sex == "1" ? 1 : 2
						this.datadetail.entryTime = this.datadetail.entryTime.split("T")[0]

					} else {

					}
				}).catch((res) => {

				})
			},
			goBack() {
				this.$router.go(-1)
			},
			
		}
	}
</script>

<style>
</style>
