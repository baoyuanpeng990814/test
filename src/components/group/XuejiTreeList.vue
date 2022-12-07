<template>
  <div id="app">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>学籍管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="list_card">
      <div slot="header" class="clearfix">
        <!-- 筛选 -->

        <el-row class="search_form">
          <el-form class="demo-ruleForm login_form" label-width="auto">
            <el-row>
              <el-col :span="5">
                <el-form-item label="学员名称">
                  <el-input v-model="queryInfo.name" placeholder="分组名称"></el-input>

                </el-form-item>

              </el-col>
              <el-col :span="5">
              <el-form-item label="是否显示">
                <el-select v-model="queryInfo.flag" placeholder="请选择">
                  <el-option v-for="item in flag" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
              <el-button style="float: right;" icon="el-icon-arrow-left" @click="$router.go(-1)"
                >返回</el-button
              >
            </el-row>
          </el-form>
        </el-row>
        <el-row class="buttons">
          <el-col :span="24" :offset="0">
            <el-button
              icon="el-icon-search"
              @click="searchGroup()"
              type="primary"
              >查询</el-button
            >
            <el-button
              icon="el-icon-refresh-right"
              @click="reset()"
              type="primary"
              >重置</el-button
            >
            <el-button @click="searchAll()"
                >查询全部列表</el-button
              >
            <el-button @click="exportExcel()"
                >点击导出当前列表的excel</el-button
              >
          </el-col>
        </el-row>
      </div>
      <div>
        <el-container>
          <el-main class="list_body">
            <el-table height=" calc(100vh - 350px) " ref="multipleTable" :data="tableData" tooltip-effect="dark" id="out-table"
              style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="userId" label="序号" width="120">
              </el-table-column>
              <el-table-column prop="flag" label="状态" width="120">
                <template slot-scope="scope">{{ scope.row.flag | transfermState }}</template>
              </el-table-column>
              <el-table-column prop="jobNumber" label="工号" width="120">
              </el-table-column>
              
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
             
              <el-table-column fixed="right" label="操作" width="180" class="rightstyle">
                <template slot-scope="scope">
                  <!-- <el-button @click="findDetail(scope.row)" type="text" size="small">查看</el-button> -->
                  <!-- <el-button @click="editDetail(scope.row)" type="text" size="small">编辑</el-button>-->
                  
                  <el-button @click="toeditXueji(scope.row)" type="text" size="small">修改</el-button>
                  <el-button  @click="deleteUser(scope.row)" type="text" size="small">删除</el-button> 
                </template>
              </el-table-column>
            </el-table>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :page-size="queryInfo.rows" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </el-main>
        </el-container>
      </div>
    </el-card>
  </div>
</template>
<script>
import JSZipUtils from 'jszip-utils'
// import JSZip from 'jszip'
import JSZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
// import FileSaver from 'file-saver'

import XLSX from 'xlsx'
export default {
  data() {
    return {
      queryInfo: {
        page: 1,
        rows: 10
      },
      total: 0,
      tableData: [],
      flag: [{
            value: '1',
            label: '显示'
          },
          {
            value: '0',
            label: '隐藏'
          }
        ]
    }
  },
  created() {},
  mounted() {
    this.getdata()
  },
  filters: {
      transfermState: function(state) {
        if (state === 1) return '显示'
        else return '隐藏'
      }
    
    },
  methods: {
    searchAll() {
        this.queryInfo.rows = this.total
        this.getdata()
      },
     // 定义导出Excel表格事件
     exportExcel() {
      /* 从表生成工作簿对象 */
      let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          // 设置导出文件名称
          '学籍列表.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    reset() {
      this.queryInfo = {
        page: 1,
        rows: 10
      }
this.getdata()
    },
    async searchGroup() {
      const { data: res } = await this.$http.post(
        '/learn/complete/flagList',
        this.queryInfo
      )
      if (res.state !== 200) {
        // return this.$message.error('数据获取失败！')
        this.tableData = []
      } else {
        console.log(res)
        // res.data.forEach(res => {
        //   res.gonghao = 'QG22' + res.userId
        // })
        this.tableData = res.data
        console.log(this.tableData, '查flag后')
        this.total = res.count
      }
    },
    async getdata() {
      const { data: res } = await this.$http.post(
        '/learn/complete/listAll',
        this.queryInfo
      )
      if (res.state !== 200) {
        // return this.$message.error('数据获取失败！')
        this.tableData = []
      } else {
        console.log(res)
        // res.data.forEach(res => {
        //   res.gonghao = 'QG22' + res.userId
        // })
        this.tableData = res.data
        console.log(this.tableData, '总')
        this.total = res.count
      }
    },
     // 编辑
     toeditXueji(item) {
      this.$router.push({
          path: '/usereditXueji',
          query: {
            detailrow: item
          }
        })
    },
    // 删除
   
    deleteUser(item) {
      let uId = { uId: item.uId }
      const { data: res } = this.$http.post(
        '/learn/complete/del',
        uId
      )
      this.$forceUpdate()
      this.getdata() 
      
      console.log(res)
    },
    handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 监听rows改变的事件
      handleSizeChange(newSize) {
        this.queryInfo.rows = newSize
        this.getdata()
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage) {
        this.queryInfo.page = newPage
        this.getdata()
      }
  }
}
</script>

<style scoped}></style>
