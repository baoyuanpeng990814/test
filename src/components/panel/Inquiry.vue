<template>
  <el-dialog :fullscreen="true" title="编辑问题" :visible.sync="showDialog" class="protrusion">
    <el-card class="box-card">
      <div slot="header" class="clearfix">

      </div>
      <div>
        <div class="inquiry_item" v-for="(c,i) in inquiries">
          <h3>问题{{i+1}}</h3>
          <el-form label-width="auto">
            <el-form-item label="题干">
              <el-input v-model="c.examineQuestionTitle"></el-input>
            </el-form-item>

            <el-form-item :label="'选项:'+l" v-for=" l in c.length">
              <el-input v-model="c.examineQuestionOption[l-1]"></el-input>
              <div class="space"></div>分数
              <el-input-number v-model="c.examineQuestionFraction[l-1]"></el-input-number>
            </el-form-item>
            <el-button size="small" type="primary" icon="el-icon-check" @click="submitInquiry(c)" circle>
            </el-button>
            <el-button size="small" type="primary" icon="el-icon-plus"
              @click="changeOptionList(++c.length) " circle>
            </el-button>
            <el-button size="small" type="primary" icon="el-icon-minus"
              @click="changeOptionList(--c.length)" circle>
            </el-button>
          </el-form>

        </div>
        <div class="plus_minus">
          <el-button type="primary" icon="el-icon-plus" @click="moreInquiry()" circle></el-button>
          <el-button type="primary" icon="el-icon-minus" @click="lessInquiry()" circle></el-button>
        </div>
        <div class="cb"></div>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
  //问卷 创建问题框
  export default {
    name: "Inquiry",
    props: {
      show: Boolean,
      examineId: Number
    },
    mounted() {
      this.showDialog = this.show
      this.getInquiries()
    },
    data() {
      return {
        inquiries: [{
          examineQuestionId: 0,
          examineQuestionTitle: "",
          examineQuestionOption: [""],
          examineQuestionFraction: [0],
          length: 1
        }],
        count: 1,
        datas: [],
        showDialog: false
      }
    },
    methods: {
      changeOptionList(val) {
        this.$forceUpdate()
      },
      submitInquiry(val) {  //把选项的集合，组合成字符串. 然后提交
        var params = {
          examineId: this.examineId,
          examineQuestionTitle: val.examineQuestionTitle,
          examineQuestionFraction: "",
          examineQuestionOption: ""
        }
        for (var i = 0; i < val.length; i++) {
          params.examineQuestionFraction += val.examineQuestionFraction[i] + "|"
          params.examineQuestionOption += val.examineQuestionOption[i] + "|"
        }
        params.examineQuestionFraction = params.examineQuestionFraction.substring(0, params.examineQuestionFraction
          .length - 1)
        params.examineQuestionOption = params.examineQuestionOption.substring(0, params.examineQuestionOption.length -
          1)
        if (val.examineQuestionId != 0 && val.examineQuestionId != null) {
          params.examineQuestionId = val.examineQuestionId
          this.updateInquiry(params)
        } else {
          this.insertInquiry(params, val)
        }


      },
      async updateInquiry(params) {  //修改问题
        const {
          data: res
        } = await this.$http.post("/manager/examine/editQuestion", params)
        if (res.state !== 200) {
          return this.$message.error("修改失败")
        } else {
          return this.$message.success('修改成功')
        }
      },
      async insertInquiry(params, val) { //添加问题
        const {
          data: res
        } = await this.$http.post("/manager/examine/addQuestion", params)
        if (res.state !== 200) {
          return this.$message.error("添加失败")
        } else {
          val.examineQuestionId = res.data
          return this.$message.success('添加成功')
        }
      },
      async deleteInquiry(params) { //删除问题
        const {
          data: res
        } = await this.$http.post("/manager/examine/delQuestion", {
          examineQuestionId:params.examineQuestionId
        })
        if (res.state !== 200) {
          //return this.$message.error("删除失败")
        } else {
          //return this.$message.success('删除成功')
        }
      },
      async getInquiries() { //获取问题
        const {
          data: res
        } = await this.$http.post("/manager/examine/listQuestion", {
          examineId: this.examineId,
          page: 1,
          rows: 1000
        })
        if (res.state !== 200) {
          this.inquiries = [{
            examineQuestionId: 0,
            examineQuestionTitle: "",
            examineQuestionOption: [""],
            examineQuestionFraction: [0],
            length: 1
          }]
        } else {
          this.inquiries = [{
            examineQuestionId: 0,
            examineQuestionTitle: "",
            examineQuestionOption: [""],
            examineQuestionFraction: [0],
            length: 1
          }]
          this.inquiries.pop()
          for (var i = 0; i < res.data.length; i++) {   //把问题的选修从字符串形式 拆分为集合形式
            var fractions = res.data[i].examineQuestionFraction.split("|")
            var options = res.data[i].examineQuestionOption.split("|")
            var temp = {
              examineQuestionTitle: res.data[i].examineQuestionTitle,
              examineQuestionId: res.data[i].examineQuestionId,
              examineQuestionOption: [],
              examineQuestionFraction: [],
              length: fractions.length
            }
            for (var j = 0; j < fractions.length; j++) {
              temp.examineQuestionFraction[j] = parseInt(fractions[j])
              temp.examineQuestionOption[j] = options[j]
            }
            this.inquiries.push(temp)
          }
          this.$forceUpdate()
        }
      },
      moreInquiry() { //添加问题填写框
        var temp = {
          examineQuestionId: 0,
          examineQuestionTitle: "",
          examineQuestionOption: [""],
          examineQuestionFraction: [0],
          length: 1
        }
        this.inquiries.push(temp)
        this.count++
      },
      lessInquiry() {  //减少问题填写框
        var temp = this.inquiries.pop()
        if(temp.examineQuestionId != 0 && temp.examineQuestionId != null){
          this.deleteInquiry(temp)
        }

        this.count--
      }
    },
    watch: {
      showDialog: function(val) {
        if (val == false) this.$emit('turnOff', false)
      },
      show: function(val) {
        this.showDialog = val
      },
      count: function() {
        this.$forceUpdate()
      }
    }
  }
</script>

<style>
</style>
