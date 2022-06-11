<template>
  <el-dialog title="机构查询" :visible.sync="showDialog" class="protrusion">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="3">机构名称</el-col>
          <el-col :span="6">
            <el-input v-model="tq.organizationCode" placeholder="机构名称"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">机构编码</el-col>
          <el-col :span="6">
            <el-input v-model="tq.organizationName" placeholder="机构编码"></el-input>
          </el-col>
        </el-row>
        <el-row class="buttons mt15">
          <el-col :span="2" :offset="0">
            <el-button icon="el-icon-search" @click="getDataList" type="primary">查询</el-button>
          </el-col>
          <el-col :span="2" :offset="3">
            <el-button icon="el-icon-refresh-right" @click="reset" type="primary">重置</el-button>
          </el-col>

        </el-row>
      </div>
      <div>
        <el-table :data="data">
          <el-table-column property="organizationId" label="序号" width="50"></el-table-column>
          <el-table-column property="organizationCode" label="机构编码" width="150"></el-table-column>
          <el-table-column property="organizationName" label="机构名称" width="150"></el-table-column>

          <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button @click="choose(scope.row)" type="text" size="small">确定</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 5, 8]"
          :page-size="drow" layout="total, sizes, prev, pager, next" :total="dtotal">
        </el-pagination>
      </div>
    </el-card>
  </el-dialog>


</template>

<script>
   //组织机构 列表形选择框
  export default {
    name: 'OrganizationListPanel',
    props:{
      show:Boolean
    },
    data() {
      return {
        dpage: 1,
        drow: 5,
        dtotal: 0,
        tq: {},
        data: [],
        showDialog:false
      }
    },
    created() {
      this.showDialog = this.show
      this.getDataList()
    },
    methods: {
      choose(row){
        this.$emit('choose',row)
        this.showDialog=false
      },
      async getDataList() {
        var param = this.tq
        param.page = this.dpage
        param.rows = this.drow
        param.organizationId = 0
        const {
          data: res
        } = await this.$http.post("/manager/org/list", param)
        if (res.state !== 200) {
          return this.$message.error('数据获取失败！')
        } else {
          this.data = res.data
          this.dtotal = res.count
        }
      },
      reset() {
        this.tq = {}
        this.getDataList()
      },
      handleSizeChange(newSize) {
        this.drow = newSize
        this.getDataList()


      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.dpage = newPage
        this.getDataList()
      }
    },
    watch:{
      showDialog:function(val){
        //console.log()
        if(val==false) this.$emit('turnOff',false)
      },
      show:function(val){
        this.showDialog = val
      }
    }
  }
</script>

<style>
</style>
