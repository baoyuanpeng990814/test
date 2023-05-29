//获取今天的时间
export default {
  getDate() {
    let nowDate = ''// 当前时间
    let date = new Date();
    let year = date.getFullYear(); // 年
    let month = date.getMonth() + 1; // 月
    let day = date.getDate(); // 日
    // let week = date.getDay(); // 星期
    // let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    // let hour = date.getHours(); // 时
    month = month < 10 ? '0' + month : month; // 如果只有一位，则前面补零
    day = day < 10 ? '0' + day : day; // 如果只有一位，则前面补零
    let second = date.getSeconds(); // 秒
    second = second < 10 ? '0' + second : second; // 如果只有一位，则前面补零
    // this.nowDate = `${year}年${month}月${day}日 ${hour}时${minute}分${second}秒 ${weekArr[week]}` 
    return nowDate = `${year}-${month}-${day}`
  }
}
