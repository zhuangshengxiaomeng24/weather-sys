<template>
  <div class="hello">
    <!-- <img alt="logo" src="../assets/intro.png" style="width: 100%" />  -->
    <h1 style="color:rgb(59, 153, 239);font-size: 45px;margin-bottom: 80px;margin-top: 40px">基于图神经网络的天气靶向推荐系统</h1>
    <h4>请用户在下方选择需要预测的城市以及条数，条数至少大于等于1</h4>
    <div class="form">
      <div class="form">
        <el-select
          class="form-select"
          clearable
          v-model="selectedCity"
          placeholder="请选择需要进行风速预警的城市"
        >
          <el-option
            v-for="item in cityArray"
            :key="item[0]"
            :label="item[1]"
            :value="item[0]"
          />
        </el-select>
        <el-input
          class="form-input"
          type="text"
          v-model="nums"
          placeholder="请输入建议的条数"
        ></el-input>
        <el-button @click="submit_axios()" id="btn"> 提交</el-button>
      </div>
    </div>

    <div style="margin: 0 auto">
      <h2>数据随时间变化关系图展示</h2>
      <div class="chart-group">
        <!-- <h4>城市最高低气温随时间变化图</h4>
        <img :src="img" alt="图片加载出错" /> -->
        <!-- <ve-line :data="fuckingtest"></ve-line> -->
        <div class="Windbearing" style="height: 600px; width: 45%"></div>
        <div class="TemperatureLow" style="height: 600px; width: 45%"></div>
      </div>
      <h4>每日对应数据结果展示</h4>
      <el-table
        :data="tips"
        :stripe="true"
        :border="true"
        fixed
        style="width: 100%"
      >
        <el-table-column prop="date" label="日期" sortable> </el-table-column>
        <el-table-column prop="wind_speed" label="风速" sortable>
        </el-table-column>
        <el-table-column prop="wind_bearing" label="风力等级" sortable>
        </el-table-column>
        <el-table-column prop="temperature_low" label="最低温度" sortable>
        </el-table-column>
        <el-table-column prop="temperature_high" label="最高温度" sortable>
        </el-table-column>
      </el-table>
    </div>

    <!-- <ve-chart ></ve-chart> -->
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

import * as echarts from "echarts";

const Wboption = {
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "cross" },
  },
  title: {
    text: "每日风速等级柱状图",
  },
  xAxis: {
    type: "category",
    data: [],
    name: "日期",
  },
  yAxis: [
    {
      type: "value",
      name: "风速等级",
      min: 0,
      max: 5,
    },
    {
      type: "value",
      name: "风速",
      min: 0,
      max: 250,
    },
  ],
  series: [
    {
      data: [],
      type: "bar",
      connectNulls: false,
      itemStyle: {
        color: "#91cc75",
        shadowColor: "#91cc75",
        borderType: "dashed",
        opacity: 0.5,
      },
    },
    {
      data: [],
      type: "bar",
      connectNulls: false,
      itemStyle: {
        color: "rgb(135,206,250)",
        shadowColor: "rgb(135,206,250)",
        borderType: "dashed",
        opacity: 0.5,
      },
    },
  ],
};

const TPLoption = {
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "cross" },
  },
  title: {
    text: "每日最高低气温折线图",
  },
  xAxis: {
    type: "category",
    data: [],
    name: "日期",
  },
  yAxis: {
    type: "value",
    name: "气温(°C)",
  },
  series: [
    {
      data: [],
      type: "line",
      connectNulls: false,
      smooth: true,
      name: "最高气温",
      areaStyle: {
        color: "green",
      },
      lineStyle: {
        normal: {
          color: "green",
          width: 2,
          type: "solid",
        },
      },
      label: {
        show: true,
        position: "bottom",
        color: "black",
        textStyle: {
          fontSize: 12,
        },
      },
    },
    {
      data: [],
      type: "line",
      connectNulls: false,
      name: "最低气温",
      smooth: true,
      areaStyle: {
        color: "rgb(135,206,250)",
      },
      lineStyle: {
        normal: {
          color: "rgb(135,206,250)",
          width: 2,
          type: "solid",
        },
      },
      label: {
        show: true,
        position: "bottom",
        color: "gray",

        textStyle: {
          fontSize: 12,
        },
      },
    },
  ],
};

export default {
  name: "HelloWorld",
  data() {
    return {
      TPLoption,
      Wboption,
      show: true,
      tips: [],
      selectedCity: "",
      ifshowChart: false,
      cityArray: [],
      stdNum: "",
      date: ["6-20", "6-21"],
      nums: "",
      img: "",
      testData: {},
      // fuckingtest:{
      //   columns:["date","temparture"],
      //   rows:[{'date':"6-20",'temparture':21},{'date':"6-21",'temparture':22}]
      // }
    };
  },
  props: {
    msg: String,
  },
  methods: {
    submit_axios() {
      axios
        .post(
          "http://47.112.166.50:10002/weather/wind/",
          "city_id=" + this.selectedCity + "&num=" + this.nums
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "提交成功",
              grouping: true,
              type: "success",
            });
            // console.log(res);
            console.log(res);
            this.tips = res.data.data;
            this.dealWithData();
            this.img = "data:image/png;base64," + res.data.base64_str;
          } else {
            ElMessage({
              message: "提交出错，请检查输入条数",
              grouping: true,
              type: "error",
            });
          }
        });
    },
    dealWithData() {
      this.Wboption.xAxis.data = [];
      this.Wboption.series[0].data = [];
      this.Wboption.series[1].data = [];
      this.TPLoption.xAxis.data = [];
      this.TPLoption.series[0].data = [];
      this.TPLoption.series[1].data = [];
      for (var i = this.tips.length-1; i >=0 ; i--) {
        this.Wboption.xAxis.data.push(this.tips[i].date);
        this.Wboption.series[0].data.push(this.tips[i].wind_bearing);
        this.Wboption.series[1].data.push(this.tips[i].wind_speed);
        this.TPLoption.xAxis.data.push(this.tips[i].date);
        this.TPLoption.series[0].data.push(this.tips[i].temperature_high);
        this.TPLoption.series[1].data.push(this.tips[i].temperature_low);
      }
      this.init();
      this.ifshowChart = true;
    },
    alertMsg() {
      this.$store.commit("alertMsg", {
        msg: "您还未登录，即将跳转至登录页面",
        type: "error",
      });
    },
    init() {
      document.getElementsByClassName('Windbearing')[0].setAttribute('_echarts_instance_', '');
      echarts
        .init(document.getElementsByClassName("Windbearing")[0])
        .setOption(this.Wboption);
      document.getElementsByClassName('TemperatureLow')[0].setAttribute('_echarts_instance_', '');
      echarts
        .init(document.getElementsByClassName("TemperatureLow")[0])
        .setOption(this.TPLoption);
    },
  },
  mounted() {
    this.init();
    this.tips = [];
    this.show = true;
    if (this.$store.state.isLogin == false) {
      this.alertMsg();
      setTimeout(() => {
        this.$router.push({
          path: "/",
        });
      }, 2000);
    } else {
      axios.get("http://47.112.166.50:10002/weather/wind/").then((res) => {
        console.log(res);
        this.cityArray = res.data;
      });
      this.selectedCity = 1;
      this.nums = 5;
      this.submit_axios();
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute("style", "background:#F3FAFA");
    });
  },
  beforeUnmount: function () {
    document.body.removeAttribute("style");
  },
  updated(){
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #f17173;
}
p {
  color: grey;
}
.showLine {
  display: inline;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.form-select {
  width: 30%;
}
.form-input {
  margin: 20px 0px;
  width: 30%;
}
.el-table {
  width: 95%;
  border-radius: 20px;
}
#btn {
  height: 30px;
  width: 10%;
  align-self: center;
  background: linear-gradient(to right, #8bbbed, #e8f4ff);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(18, 27, 89, 0.5);
  border: none;
  cursor: pointer;
  color: white;
  margin-bottom: 20px;
  /* color: white; */
  font-weight: bold;
}

#btn:hover {
  background: linear-gradient(to left, #8bbbed, #e8f4ff);
}
.chart-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width:100vw;
}
</style>
