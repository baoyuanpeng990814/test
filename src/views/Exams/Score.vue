<template>
	<v-main>
		<!--  -->

		<div class="body_no_top ofs ">
			<div class="score_top_bg">
				<div class="i-row i-align-center ">
					<v-btn icon  @click="$router.go(-2)">
						<v-img src="../../images/icon/icon_back_white.png" height="18px" width="10px" contain></v-img>
					</v-btn>

					<div class="font-white-1" style="width: 100%; text-align: center; margin-right: 20px;">本次练题结果</div>
				</div>				
			</div>
			<div class="score_card">
				<div class="font-444242-09">练习名称：{{name}}</div>
				<div class="font-7c7c7c-0-9 margint-1">交卷时间：{{timeNow}}</div>
				<div class="score_radius">
					<div class="font-3E3D3D-1 margint-1">答对</div>
					
						<div class="score_number margint-1">{{trueNum}}</div>
						<div class="font-3E3D3D-1 marginl-1" style="margin: -1rem 0 0 6rem ;">题</div>
					
					
				</div>
			</div>	
			
			<div class="score_review" v-show="falseNum != 0" @click="turnReview()">查看错题</div>
			<div class="i-row i-align-center margint-1">
				<img src="../../images/icon/icon_clock.png"  style="width: 1.125rem; height: 1.125rem; margin-left: 1rem;"/>
				<div class="font-444242-09 marginl-1">练习时间：{{exerciseTime}}</div>
			</div>
			
			<div class="i-row i-align-center margint-1">
				<img src="../../images/icon/icon_false.png"  style="width: 1.125rem; height: 1.125rem; margin-left: 1rem;"/>
				<div class="font-444242-09 marginl-1">答题数：{{totalNum}}</div>
			</div>
			<div class="i-row i-align-center margint-1">
				<img src="../../images/icon/icon_true.png"  style="width: 1.125rem; height: 1.125rem; margin-left: 1rem;"/>
				<div class="font-444242-09 marginl-1">我的错题：{{falseNum}}</div>
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
				name: "222",
				trueNum: 0,
				falseNum: 0,
				totalNum: 0,
				exerciseTime: "411",
				timeNow: "",
				datas: [],
				errors: []

			}
		},
		created() {
			console.log("this.$route.params")
			console.log(this.$route.params)
			this.name = this.$route.params.name;
			this.trueNum = this.$route.params.trueNum;
			this.falseNum = this.$route.params.falseNum;
			this.totalNum = this.$route.params.totalNum;
			this.exerciseTime = this.$route.params.exerciseTime;
			this.errors = this.$route.params.errors;
			this.timeNow =  new Date().toLocaleString();
			console.log(this.errors ,"错题数据")
		},
		methods: {
			// 答题完毕跳转成绩界面 param ：
			turnReview() {
				//this.$router.push("score");	
        console.log('ddddd')		
				this.$router.push({
					name: "review",
					params: {
					
						errors : this.errors,
					},
				});
			}
		}
	}
</script>

<style scoped>
	.score_top_bg {
		width: 100%;
		height: 9.375rem;
		background-image: url(../../images/bg_result.png);
		background-size: cover;
		padding: 15px;
	}
	.score_card{
		margin: -5.5rem 10px 0;
		border-radius: 0.25rem;
		border: 1px solid #F2F2F2;
		background-color: white;
		padding: 1rem;
		
	}
	.score_radius{
		width: 9.5rem;
		height: 9.5rem;
		border-radius: 50%;
		border: 3px solid #A4E4ED;
		text-align: center;
		margin: 1rem auto;
	}
	.score_number{
		height: 3.625rem;
		line-height: 3.625rem;
		font-size: 3.625rem;		
		font-weight: 400;
		font-style: italic;
		color: #37BBCE;
		text-shadow: 0px 3px 2px rgba(17, 158, 177, 0.2);
	}
	.score_review{
		width: 9rem;
		height: 2.75rem;
		border-radius: 2.75rem;
		background-image: url(../../images/btn_bg.png);
		background-size: contain;
		/* background:linear-gradient(45deg,#58e8fe,#3accdf,#4bc0d2);
		border-bottom: 3px solid  rgba(184, 238, 248, 1.0);
		border-left: 2px solid  rgba(184, 238, 248, 1.0);
		border-right: 2px solid  rgba(184, 238, 248, 1.0); */
		margin: 1rem auto;
		text-align: center;
		line-height: 2.75rem;
		color: white;
	}
</style>
