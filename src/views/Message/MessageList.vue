<template>
	<v-main>
		<!-- 我的信息子页面 -->
		<v-app-bar color="white" >
			<v-btn @click="goBack" icon>
				<v-img src="../../images/icon/icon_back.png" height="18px" contain></v-img>
			</v-btn>
			<v-spacer></v-spacer>
			<v-toolbar-title>我的消息</v-toolbar-title>
			<v-spacer></v-spacer>			
		</v-app-bar>
		<div class=" body_no_top ofs bg">
			<div class="msg_list ">
				<div class="i-column " v-for="(item,index) in msgListDatas" :key = "index">
					<div class="msg_list_time">{{item.createTime | timeForm}}</div>
					<div class="msg_list_item" >
						<div class="msg_list_top" >
							<div :style="{color:(colorArr[query.messageType])}">【{{nameArr[query.messageType]}}】</div>							
						</div>
						
						<!-- <v-img :src="item.picUrl" min-width="10rem" v-show = "item.picUrl">
							
						</v-img> -->
						<div class="item_list_content">{{item.messageContent}}</div>
					</div>
				</div>
				
				
			</div>
			
		</div>
	</v-main>
</template>

<script>
	
		export default {
			components: {
				
			},
			data() {
				return {											
					query: {
						rows: "10",
						page: "1",
						state : "2",
						messageType : "1",
					},
					msgListDatas: {},					
					colorArr: ["#00000","#0073FF","#2ECA8E","#FD4A2C","#FFA614"],					
					nameArr: ["通知列表","系统通知","重要通知","考试通知","竞赛通知"],
				}
			},
			created() {								
				this.query.messageType = this.$route.query.messageType;
				this.getMessageList();
				this.cancelCount();
			},
			methods: {				
				getMessageList() {
					this.$store.dispatch('getMessageList',this.query).then((res) => {
						if (res.data.state == 200) {
							this.msgListDatas = res.data.data
							
						} else {
							this.msgListDatas = []
						}
						
					}).catch((res) => {
						this.msgListDatas = []
					})
				},
				cancelCount(){
					this.$store.dispatch('cancelMessageCount',{"messageType": this.query.messageType}).then((res) => {
						if (res.data.state == 200) {
							//console.log("取消成功")
						} else {
							//console.log("取消失败")
						}
						
					}).catch((res) => {
						
					})
				},
				goBack() {				
					this.$router.go(-1);									         					      					
				},
				go(url) {
					this.$router.push(url);			
					
				},
			},
			filters:{
				timeForm (date) {									
					 var time = new Date(date);
					 var year = time.getFullYear();
					 var month = time.getMonth() + 1;
					 var day = time.getDate();
					 var hh = time.getHours();
					 var mm = time.getMinutes();
					 var timeNow =  new Date();
					 var dayNow = timeNow.getDate();
					if (dayNow != day) {		            
					    return month + '月 ' + day+ '日';
					} else {
					    return hh + ': ' + mm;
					}
					
				  
				    
				}
			}
		}
	</script>
	
	<style scoped>
		.v-toolbar__title {
			margin: 0 auto;
		}
		.bg{
			background-color: #F2F2F2;
		}
		.msg_list{
			display: flex;
			flex-direction: column;
			width: 100%;
			background-color: #F2F2F2;
		}
		.msg_list_item{
			display: flex;
			flex-direction: column;
			justify-content: flex-end;		
			background-color: #FFFFFF;
			border: 1px solid #D3D3D3;
			box-shadow: 1px 1px 0.5px #a4a4a4;
			margin: 10px 1rem 20px;
			border-radius: 0.4rem;
		}
		.item_list_content{
			margin: 1rem ;
			font-size: 0.9rem;
			font-weight: bold;
			color: #666666;
			width: fit-content;
			height: max-content;
			line-height: 1rem;
			
			
		}
		.item-pic{
			width: 10rem;
			height: 5rem;
			
		}
		.msg_list_top{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin: 0.5rem 1rem 0;
		}
		.msg_list_time{
			width: 5rem;
			height: 1.5rem;
			background: #D9D9D9;
			border-radius: 3px;			
			font-size: 0.8rem;
			line-height: 1.5rem;
			font-weight: 500;
			color: #999999;
			text-align: center;
			margin: 20px auto 0;
		}
	</style>
