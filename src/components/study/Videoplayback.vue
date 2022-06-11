<!--弃用-->
<template>
    <div id="app">

        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/mystudy' }">我的学习</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Videoplayback' }">我的视频</el-breadcrumb-item>
            <!--<el-breadcrumb-item>我的考试</el-breadcrumb-item>
            <el-breadcrumb-item>我的错题</el-breadcrumb-item>-->
            <el-breadcrumb-item style="float:right"  v-if="this.userList[0] && this.userList[0].role_name"> <b><u>你好！{{this.userList[0].role_name}} </u></b></el-breadcrumb-item>

        </el-breadcrumb>

        <!-- 卡片视图区 -->
        <el-card class="box-card">
           <h2 class="videoTitle">{{this.videoList.courseName}}</h2>
           <!-- 视频播放区 -->
           <video :src="videoSrc" :poster="videoImg" autoplay="playStatus" :muted="muteStatus" controls="controls" >
           </video>
            <!-- <button @click="playClick" :class="{hide: isPlay}">点击播放</button> -->
            <!-- 章节目录 -->
            <el-col class="videoCol">
                <el-menu default-active="1-0" class="el-menu-vertical-demo"  unique-opened >
                <el-submenu index="1">
                    <template slot="title">
                    <span>章节目录</span>
                    </template>
                    <el-menu-item :index="'1-'+index"  :default-active="'1-' + index" v-for=" (item,index) in videoList.lChapters" :key="index"   style="color:black font-size:28px text-align:center">
                        <span slot="title" @click="videoClick(item.lCourseware.resourcesLink)" v-clickDown="index">{{item.chapterName}}</span>
                    </el-menu-item>
                </el-submenu>
                <!-- <el-submenu index="1">
                    <template slot="title">
                    <span>母婴护理</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item index="1-1">被动操</el-menu-item>
                    <el-menu-item index="1-2">为新生儿洗澡</el-menu-item>
                    <el-menu-item index="1-2">为新生儿抚触</el-menu-item>
                    </el-menu-item-group>
                </el-submenu> -->
                </el-menu>
            </el-col>
        </el-card>
    </div>
</template>
<script>
export default {
    directives:{
        clickDown:{
            inserted(el,binding,index){
                if(binding.value === 0){
                el.click()
                }
            }
        }
    },
    // name: 'Video2',
   data(){  //组建的私有数据
        return{
            // index:index++,
            id:this.$route.query.id,
            videoList:[],
            userList:[],
            total:[],
            courseId:"", //课程的ID
            //课程分类选择
            videoSrc: '',//视频路径
            videoImg: '../../../images/10.png',
            playStatus: '',
            muteStatus: '',
            isMute: true,
            isPlay: false,
            width: '820', // 设置视频播放器的显示宽度（以像素为单位）
            height: '500', // 设置视频播放器的显示高度（以像素为单位）
            preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            controls: true, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            autoplay: '',
    }
    },
    created(){ //生命周期函数
        this.getUserList(this.id),  //可以重新获取用户数据
        console.log ( this.videoClick(this.videoList.lChapters) )
    },
    methods:{ //事件处理函数
      goBack() {
        console.log('go back');
      },
        handleNodeClick(data){// 章节目录单击事件
            console.log(data);
        },
        // 点击章节播放相应的视频
        videoClick(videoUrl){
            this.videoSrc = videoUrl
            // this.getUserList(this.id)
            console.log(this.videoSrc)
        },
        // 获取数据的方法！
        // async getUserList(){                      // 地址     //参数
        // const {data:res} = await this.$http.p("learn/myLearn/courseInfo",this.courseId)
        //     console.log(res);
        //     if(res.meta.status !== 200){
        //         return res.this.$message.error('数据获取失败！')
        //     }else{
        //         this.userList = res.data.users;
        //         this.total = res.data.total;
        //     }
        // }, pushRadio
         async getUserList(id){
            // this.$router.push('./videoplayback') 跳转
           const n = await this.$http.get('learn/myLearn/courseInfo?id='+id)
            if(n.data.state !== 200){
                res.$message.error('请求失败')
            }else{

                 this.videoList = n.data.data
                console.log(this.videoList)
                // this.$router.push('./videoplayback')
            }
        },
        //点击播放视频按钮 跳转视频播放页
        pushRadio(){
            this.$router.push('./videoplayback')
        },

    },
}
</script>

<style lang="less" scoped>


// 卡片css
.box-card{
    margin-top:20px;
    font-size: 12px;
    padding:0 !important;
    width: 100%;
    height:95%;
    line-height:0px;
    display: flex;
}
.videoTitle{
    line-height:50px;
    margin:0 auto;
    text-align: center;
    margin-left:-300px;
}
video{
    // background-color:orange;
    height:425px;
    width:850px;
    margin:0 auto;

    // margin-left:-300px;
}
.videoCol{
    width: 250px;
    float: right;
    text-align: left;
    margin-left:70px;
    // border:1px solid #666;
    background-color:antiquewhite;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

// 隐藏Video下载按钮
video::-webkit-media-controls-enclosure {
    overflow: hidden;
}

video::-webkit-media-controls-panel {
    width:calc(100% + 30px);
}
</style>
