<template>
	<div class="home_page">

		<router-view></router-view>
		<!-- 底部导航栏 首页 -->
		<v-bottom-navigation  v-if="show" color="#19B6CA"  grow  value="index">
			<v-btn to="MenuIndex" value=1 min-width="60px" @click="set(1)"> 
				<span :class="index==1? 'font1':'font2'">首页</span>
				<v-img src="../images/icon/icon_home.png" max-height="1.25rem" max-width="1.25rem" contain :class="index==1? 'change1':'change2'"></v-img>
			</v-btn>

			<v-btn to="MyCourses" value=2 min-width="60px" @click="set(2)">
				<span :class="index==2? 'font1':'font2'">课程</span>

				<v-img src="../images/icon/icon_course2.png" max-height="1.25rem" max-width="1.25rem" contain :class="index==2? 'change1':'change2'"></v-img>
			</v-btn>

			<v-btn to="MyExams" value=3 min-width="60px" @click="set(3)">
				<span :class="index==3? 'font1':'font2'">考试</span>

				<v-img src="../images/icon/icon_exam2.png" max-height="1.25rem" max-width="1.25rem" contain :class="index==3? 'change1':'change2'"></v-img>
			</v-btn>


			<v-btn to="Mine" value=4 min-width="60px" @click="set(4)">
				<span :class="index==4? 'font1':'font2'" >我的</span>
				<v-img src="../images/icon/icon_mine.png" max-height="1.25rem" max-width="1.25rem" contain  :class="index==4? 'change1':'change2'"></v-img>
				
			</v-btn>
		</v-bottom-navigation>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
				defaultHeight: '0',
				nowHeight: '0',
				show:true,
				index: 1,
			}
		},
		created() {
      
			if(document.cookie){
        this.getCookie()
				// this.$store.commit("updateUserInfo", JSON.parse(document.cookie))
				this.index = this.$store.state.index;

			}
			
			
		},
		mounted() {
			this.defaultHeight = document.body.clientHeight;
			var t = this
			window.onresize = () => {
				return (() => {
					t.nowHeight = document.body.clientHeight;
				})();
			};
			
			
				
		},
		methods: {
       getCookie() {
      if (document.cookie.length > 0) {
        console.log(document.cookie)
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        // this.$store.commit("updateUserInfo", JSON.parse(document.cookie))
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if(arr2[0] == "userid"){
            let cc={userId:''}
            cc.userId =arr2[1]
            this.$store.commit("updateUserInfo", cc)
            console.log(this.$store.getters.userinfo.userId,'this.$store.getters.userinfo.userId')
          }
        }
      }
    },
			 set:function(i){
				 this.$store.state.index = i,
				// this.$store.commit("updateIndex", i);
				 this.index=i;
			 }
			 
		},
		watch: {
			nowHeight: function() {

				if (this.defaultHeight >= this.nowHeight+50) {
					this.show = false
				} else {
					this.show = true
				}
			},
			index:function(){
				
			}

			
			
		}
	}
</script>

<style scoped>
	
	.font1 {
		font-size: 0.9rem;
		color: #19B6CA;
	}
	.font2 {
		font-size: 0.9rem;
		color: #535656;
		
	}
	.maxWidth{
		width: 100%;
	}
	.change1{
		filter: grayscale(0%);
	}
	.change2{		
		filter: grayscale(100%);
	}
	
</style>
