<template>
  <v-main>
    <!-- 课程首页 -->
    <v-app-bar color="white lighten-1">
      <v-btn @click="goBack" icon>
        <v-img
          src="../../images/icon/icon_back.png"
          height="18px"
          contain
        ></v-img>
      </v-btn>
      <div class="details-title">课程详情</div>
      <!-- 主要用于添加预习课程 -->
    </v-app-bar>
    <div class="imgCourse">
      <img
        class="bgImg"
        v-if="this.$route.query.title == '养老护理'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/yanglaohuli.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '护工'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/yanglaohugong.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '厨嫂'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/chusao.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '月嫂'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/yuesao.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '育婴'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/yuying.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '保姆'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/baomu.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '家政整理'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/jiazhengzhengli.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '家庭保洁'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/jiatingbaojie.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '早教指导'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiaozhidao.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '营养指导'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/yingyangzhidao.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '中式面点'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zhongshimiandian.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '西式面点'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/xishimiandian.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '催乳'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/cuiru.jpg"
        alt=""
      />
      <img
        class="bgImg"
        v-if="this.$route.query.title == '产后修复'"
        src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/chanhouxiufu.jpg"
        alt=""
      />
    </div>
    <!-- 电话咨询功能 -->
    <div
      class="i-row i-align-center"
      style="position:fixed;bottom:0;width: 100%; height: 56px;  justify-content: space-between;align-items: flex-end;"
    >
      <div @click="dialog = false" class="tophone">
        <img src="../../images/tophone.png" alt="" /> 详情咨询请拨打：18034429369
      </div>
    </div>
    <!-- 电话咨询弹窗 -->
    <v-dialog v-model="dialog" width="500" style="min-height: 90%;">
      <v-card>
        <v-card-title
          style="font-size:16px; color: #2D2B2B; justify-content: center; font-size: 20px; font-weight: bolder;"
        >
          详情咨询
        </v-card-title>
        <div class="up-space"></div>
        <div style="font-size:20px; color: #2D2B2B;text-align: center; ">
          请拨打：18034429369
        </div>
        <v-card-actions style="justify-content: center;">
          <v-btn
            href="tel:+18034429369"
            @click="Calltel()"
            class="btncall"
            style="width: 70%;"
          >
            一键呼叫
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>
<script>
export default {
  data() {
    return {
      dialog: false, //弹窗
      dataDetail: {},
      fwid: '',
    }
  },
  created() {},
  mounted() {},
  methods: {
    Calltel() {},
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.details-title {
  font-size: 1.125rem;
  width: 100%;
  font-weight: 500;
  color: #2a2c2c;
  text-align: center;
  margin-right: 2rem;
}
.bgImg {
  width: 100%;
}
.tophone {
  width: 100%;
  text-align: center;
  background: linear-gradient(to top right, #fe7f65, #fb4e40);
  line-height: 2.625rem;
  color: white;
  border-radius: 0.3125rem;
  font-size: 0.9375rem;
}
.tophone img {
  width: 0.625rem;
  height: 0.75rem;
}
.space {
  height: 0.875rem;
  width: 100%;
}
.v-dialog > .v-card > .v-card__actions {
  padding: 30px 16px;
}
</style>
