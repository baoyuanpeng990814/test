<template>
  <div class="full_screen mt15">



    <el-card class="box-card">

      <div class="text item">
        <div class="finish_item">
          <span class="orange_bar">结业条件</span>
          <el-divider></el-divider>
          <span>学完所有视频</span>
        </div>
        <div class="finish_item">
          <span class="orange_bar">当前状态</span>
          <el-divider></el-divider>

          <div class="finish_status">
            <div class="finish_block">
              <div><i class="el-icon-circle-check"></i>学习进度</div>
              <div>100%</div>
              <div>恭喜你已经完成</div>
            </div>

          </div>

        </div>
      </div>
    </el-card>


  </div>
</template>

<script> //结业申请框
  export default {
    name: "ApplyFinish",
    props: {
      courseId: "",
      once : Boolean
    },
    data(){
      return{

      }
    }
    ,
    mounted() {

      if(!this.once){
        this.graduation()
      }

    },
    methods: {
      async graduation() {
        const {
          data: res
        } = await this.$http.get("/learn/myLearn/graduation?courseId="+this.courseId)
        if (res.state !== 200) {
          return this.$message.error(res.msg)
        } else {
          this.$message.success("结业申请已发送")
          this.$emit("getOnce",true)
        }
      }
    }
  }
</script>

<style>
</style>
