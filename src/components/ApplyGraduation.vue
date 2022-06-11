<template>
	<div class=" m10">
		
		
		
		<v-card
		    class="mx-auto"
		  >
		    <v-card-title>
		      <div>结业申请</div>
		    </v-card-title>
			<v-card-title>
				您以完成了：{{Math.ceil(courseSpeed)}}
				<v-progress-linear color="teal" :value="courseSpeed" height="25">
					<strong style="color: white;">{{ Math.ceil(courseSpeed) }}%</strong>
				</v-progress-linear>
			</v-card-title>
		    <v-card-actions>
		      <v-btn
				block
		        color="teal white--text"
		        @click="apply"
		      >
		        发送申请
		      </v-btn>
		    </v-card-actions>
		
		    
		  </v-card>
		
		
	</div>
</template>

<script>
	export default{
		name:'ApplyGraduation',
		props:{
			courseId:"",
			chapterId:""
		},
		data(){
			return{
				courseSpeed:0,
			}
		},
		mounted() {
			this.getLearnState()
		},methods: {
			apply(){
				if(this.courseSpeed<100){
					this.$store.dispatch('snackbar/openSnackbar', {
						msg: '申请失败',
						color: 'red'
					})
					return false
				}
				this.$store.dispatch('applyGraduation', {
					courseId: this.courseId
				}).then((res) => {
					if (res.data.state == 200) {
						this.$store.dispatch('snackbar/openSnackbar', {
							msg: '申请已发送',
							color: 'green'
						})
					} else {
						this.$store.dispatch('snackbar/openSnackbar', {
							msg: '申请失败',
							color: 'red'
						})
					}
				}).catch((res) => {
				this.$store.dispatch('snackbar/openSnackbar', {
					msg: '申请失败',
					color: 'red'
				})
				})
				
			},
			getLearnState() {
				this.$store.dispatch('getChapterState', {
					chapterId: this.chapterId,
					courseId: this.courseId
				}).then((res) => {
					if (res.data.state == 200) {
						this.courseSpeed = parseInt(res.data.data.courseSpeed)
						this.courseSpeed = this.courseSpeed>100? 100 :this.courseSpeed
					} else {}
				}).catch((res) => {

				})
			}
		}
		
		
	}
</script>

<style>
</style>
