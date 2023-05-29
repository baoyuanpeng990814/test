<template>
  <v-main>
    <!-- 课程首页 -->
    <v-app-bar>
      <v-btn @click="goBack" icon>
        <v-img
          src="../../images/icon/icon_back.png"
          height="18px"
          contain
        ></v-img>
      </v-btn>
      <div class="tool_title">报名中心</div>
      <!-- 主要用于添加预习课程 -->
    </v-app-bar>
    <!-- 养老护理与护工 -->
    <div class="lesson">  
      <div class="lesson-box flexbetween">
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">养老护理</div>
          <div class="lesson-detail overflow">
            专业早教师辅助孩子养成良好习惯
          </div>
          <div class="lesson-service ">
            <div><span>价值</span></div>
            <div>￥<span>2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('养老护理')">去报名</div>
          </div>
        </div>
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">护工</div>
          <div class="lesson-detail overflow">收拾屋子，做饭扫地</div>
          <div class="lesson-service">
            <div><span>价值</span></div>
            <div>￥<span class="lesson-price">2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('护工')">去报名</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 厨嫂与月嫂 -->
    <div class="lesson">
      <div class="lesson-box flexbetween">
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">厨嫂</div>
          <div class="lesson-detail overflow">
            专业早教师辅助孩子养成良好习惯
          </div>
          <div class="lesson-service ">
            <div><span>价值</span></div>
            <div>￥<span>2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('厨嫂')">去报名</div>
          </div>
        </div>
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">月嫂</div>
          <div class="lesson-detail overflow">收拾屋子，做饭扫地</div>
          <div class="lesson-service">
            <div><span>价值</span></div>
            <div>￥<span class="lesson-price">2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('月嫂')">去报名</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 产后修复与育婴 -->
    <div class="lesson">
      <div class="lesson-box flexbetween">
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">产后修复</div>
          <div class="lesson-detail overflow">
            专业早教师辅助孩子养成良好习惯
          </div>
          <div class="lesson-service ">
            <div><span>价值</span></div>
            <div>￥<span>2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('产后修复')">去报名</div>
          </div>
        </div>
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">育婴</div>
          <div class="lesson-detail overflow">收拾屋子，做饭扫地</div>
          <div class="lesson-service">
            <div><span>价值</span></div>
            <div>￥<span class="lesson-price">2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('育婴')">去报名</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 保姆与家政整理 -->
    <div class="lesson">
      <div class="lesson-box flexbetween">
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">保姆</div>
          <div class="lesson-detail overflow">
            专业早教师辅助孩子养成良好习惯
          </div>
          <div class="lesson-service ">
            <div><span>价值</span></div>
            <div>￥<span>2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('保姆')">去报名</div>
          </div>
        </div>
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">家政整理</div>
          <div class="lesson-detail overflow">收拾屋子，做饭扫地</div>
          <div class="lesson-service">
            <div><span>价值</span></div>
            <div>￥<span class="lesson-price">2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('家政整理')">去报名</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 家庭保洁与早教指导 -->
    <div class="lesson">
      <div class="lesson-box flexbetween">
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">家庭保洁</div>
          <div class="lesson-detail overflow">
            专业早教师辅助孩子养成良好习惯
          </div>
          <div class="lesson-service ">
            <div><span>价值</span></div>
            <div>￥<span>2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('家庭保洁')">去报名</div>
          </div>
        </div>
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">早教指导</div>
          <div class="lesson-detail overflow">收拾屋子，做饭扫地</div>
          <div class="lesson-service">
            <div><span>价值</span></div>
            <div>￥<span class="lesson-price">2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('早教指导')">去报名</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 西式面点与催乳 -->
    <div class="lesson">
      <div class="lesson-box flexbetween">
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">西式面点</div>
          <div class="lesson-detail overflow">
            专业早教师辅助孩子养成良好习惯
          </div>
          <div class="lesson-service ">
            <div><span>价值</span></div>
            <div>￥<span>2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('西式面点')">去报名</div>
          </div>
        </div>
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">催乳</div>
          <div class="lesson-detail overflow">收拾屋子，做饭扫地</div>
          <div class="lesson-service">
            <div><span>价值</span></div>
            <div>￥<span class="lesson-price">2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('催乳')">去报名</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 营养指导与中式面点 -->
    <div class="lesson">
      <div class="lesson-box-last flexbetween">
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">营养指导</div>
          <div class="lesson-detail overflow">
            专业早教师辅助孩子养成良好习惯
          </div>
          <div class="lesson-service ">
            <div><span>价值</span></div>
            <div>￥<span>2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('营养指导')">去报名</div>
          </div>
        </div>
        <div class="lesson-item">
          <img src="https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png" alt="" />
          <div class="lesson-title">中式面点</div>
          <div class="lesson-detail overflow">收拾屋子，做饭扫地</div>
          <div class="lesson-service">
            <div><span>价值</span></div>
            <div>￥<span class="lesson-price">2000</span>元</div>
            <div class="buy" @click="goCourseDetailsFn('中式面点')">去报名</div>
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      /* pics: [
        require('https://zhongfujiazheng.oss-cn-beijing.aliyuncs.com/learn/APK/%E5%B9%B3%E5%8F%B0%E5%9B%BE%E7%89%87/zaojiao.png'),
        require('../../images/banner2.png'),
      ], */
      datas: [],
      tab: 1,
    }
  },
  created() {},
  //跳转课程详情页
  methods: {
    goCourseDetailsFn(e) {
      this.$router.push({ path: '/coursedetails', query: { title: e } })
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.v-toolbar__title {
  margin: 0 auto;
}

.tool_title {
  font-size: 1.125rem;
  width: 100%;
  font-weight: 500;
  color: #2a2c2c;
  text-align: center;
  margin-right: 2rem;
}

.left_tab {
  width: 6rem;
}

.right-tab-items {
  width: calc(100% - 6rem);
}
.lesson {
  padding: 0 12px;
  background-color: #fff;
}
.lesson-item {
  padding: 10px;
  width: 48%;
  box-shadow: 0px 1px 4px 2px #eee;
  border-radius: 6px;
}
.lesson-item img {
  width: 100%;
}
.lesson-detail {
  padding: 0.3125rem 0;
  font-size: 0.875rem;
}
.lesson-title {
  font-size: 1.125rem;
  color: #121212;
  font-weight: bold;
}
.lesson-box {
  padding-top: 1.25rem;
}
.lesson-box-last {
  padding: 1.25rem 0;
}
.flexbetween {
  display: flex;
  justify-content: space-between;
}
.lesson-service {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f7323b;
  font-size: 0.75rem;
}
.buy {
  height: 1.75rem;
  padding: 0 0.9375rem;
  margin-right: 0.5rem;
  background-color: rgb(97, 214, 214);
  line-height: 1.75rem;
  font-size: 0.75rem;
  border-radius: 0.1875rem;
  color: #fff;
}
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
