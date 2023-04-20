<!--name: 'ThermalMap',-->
<template>
  <div class="container">
    <div class="block">
      <div class="demonstration">选择年份及月份</div>
      <div class="picker">
        <el-date-picker
            v-model="value"
            type="month"
            placeholder="选择月"
            @change="clicked">
        </el-date-picker>
      </div>
    </div>
  </div>

  <div class="echarts-box">
    <!--    <div id="myEcharts" :style="{ width: this.width, height: this.height }"></div>-->
    <div id="myChart" :style="{ width: this.width, height: this.height }"></div>
    <div id="charts" ref="chart" :style="{ width: this.width, height: this.height }"></div>
  </div>
  <div class="container">
    <div class="block">
      <div class="demonstration">选择年份及月份</div>
      <!--      暂时设为value2，将value数据规范化后可统一-->
      <el-slider
          v-model="value2"
          :step="1"
          :max="500"
          :format-tooltip="formatTooltip"
      ></el-slider>
    </div>
  </div>

</template>

<script>
import * as echarts from "echarts";
import {ref, onMounted, onUnmounted} from "vue";
import chinaJson from '../assets/china.json'
import 'echarts-gl';
import 'echarts/map/js/world.js';
import geoJson from 'echarts/map/json/world.json';
import 'echarts-extension-amap';
// import jsonp from 'jsonp'
export default {
  name: 'ThermalMap',
  props: {
    width: String,
    height: String,
    data: {
      type: Array,
      required: true,
    }
  },
  setup() {
    let myEcharts = echarts;
    const chartRef = ref(null);
    let chart = null;
    const data = [
      {
        name: 'China',
        value: 90,
      },
      {
        name: 'United States',
        value: 80,
      },
      {
        name: 'Japan',
        value: 70,
      },
    ];
    onMounted(() => {
      // initChart();
      initChart2();
      initChart3();
    });
    onUnmounted(() => {
      myEcharts.dispose;
      chart.dispose();
      chart = null;
    });

    function initChart3() {
      let chart = myEcharts.init(document.getElementById("charts"), "purple-passion");
      // 注册可用的地图
      myEcharts.registerMap('world', geoJson);
      // 设置echarts的option
      chart.setOption({
        visualMap: {
          min: 0,
          max: 100,
          inRange: {
            color: ['#FFFF00', '#FF0000'],
          },
          textStyle: {
            color: '#fff',
          },
        },
        geo: {
          map: 'world',
          roam: true,
          itemStyle: {
            areaColor: '#323c48',
            borderColor: '#111',
          },
          label: {
            show: false,
            color: '#fff',
            emphasis: {
              label: {
                show: true // 不显示国家名称
              }
            }
          },
        },
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'geo',
            data: data.map(({name, value}) => ({
              name,
              value: [Math.random() * 360 - 180, Math.random() * 180 - 90, value],
            })),
            pointSize: 5,
            blurSize: 6,
          },
        ],
      });
      window.onresize = function () {
        chart.resize();
      };
    }

    function initChart2() {
      let chart = myEcharts.init(document.getElementById("myChart"), "purple-passion");
      // 注册可用的地图
      myEcharts.registerMap('china', chinaJson);
      // 指定图表的配置项和数据
      chart.setOption({
        title: {
          text: "厄尔尼诺现象预测",
          left: "center",
        },
        series: [
          {
            type: 'map',
            map: 'china',
            // 显示标签样式
            label: {
              show: true,
              fontSize: 10,
              color: 'white',
            },
            // 图形样式
            itemStyle: {
              areaColor: 'blue',
              borderColor: 'white',
              borderWidth: '1',
            },
            zoom: 1.2,
            // 添加数据，注意应与显示的标签名一致
            data: [
              {name: '重庆市', value: 2005},
              {name: '天津市', value: 1547},
              {name: '上海市', value: 3168},
              {name: '北京市', value: 6992},
              {name: '四川省', value: 4200},
              {name: '湖北省', value: 9500},
            ],
          }
        ],
        visualMap: {
          min: 1000,
          max: 10000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
      });
      window.onresize = function () {
        chart.resize();
      };
    }

    /*   function initChart() {
         let chart = myEcharts.init(document.getElementById("myEcharts"), "purple-passion");
         chart.setOption({
           title: {
             text: "厄尔尼诺现象预测",
             left: "center",
           },
           xAxis: {
             type: "category",
             data: [
               "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
             ]
           },
           tooltip: {
             trigger: "axis"
           },
           yAxis: {
             type: "value"
           },
           series: [
             {
               data: [
                 606, 542, 985, 687, 501, 787, 339, 706, 383, 684, 669, 737
               ],
               type: "line",
               smooth: true,
               itemStyle: {
                 normal: {
                   label: {
                     show: true,
                     position: "top",
                     formatter: "{c}"
                   }
                 }
               }
             }
           ]
         });
         window.onresize = function () {
           chart.resize();
         };
       }*/


    return {
      // initChart,
      chartRef
    };
  },
  data() {
    return {
      chart: null,
      value: '',
      value2: ''
    };
  },
  methods: {
    clicked() {
      console.log(this.value)
    },
    formatTooltip(val) {
      let year = 1970 + parseInt(val / 12)
      let month = 1 + parseInt(val % 12)
      console.log(year + "-" + month)
      if (month < 10) {
        month = '0' + month.toString()
      } else {
        month = month.toString()
      }
      let date = year + "-" + month
      console.log(date)
      return date
    }
  }
  // methods: {
  //   getWorld (data) {
  //     var that = this
  //     axios.get('src/api/world.json').then(function (res) {
  //       let namemap = res.data.namemap
  //       // let dataArr = res.data.dataArr
  //       let dataArr = data.data
  //       that.drawChart(namemap, dataArr)
  //     })
  //   },
  //   drawChart (name, data) {
  //     // 基于准备好的dom，初始化echarts实例
  //     let chart = echarts.init(document.getElementById('chart'))
  //     // 监听屏幕变化自动缩放图表
  //     window.addEventListener('resize', function () {
  //       chart.resize()
  //     })
  //     // 绘制图表
  //     chart.setOption({
  //       // 图表主标题
  //       // title: {
  //       //   text: '世界地图', // 主标题文本，支持使用 \n 换行
  //       //   top: 10, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
  //       //   left: 'center', // 值: 'left', 'center', 'right' 同上
  //       //   textStyle: { // 文本样式
  //       //     fontSize: 24,
  //       //     fontWeight: 600,
  //       //     color: '#000'
  //       //   }
  //       // },
  //       grid: {
  //         width:'100%',
  //         height:'100%',
  //         left: '0%',
  //         right: '0%',
  //         bottom: '0%',
  //         containLabel: true
  //       },
  //       // 提示框组件
  //       tooltip: {
  //         trigger: 'item', // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
  //         // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
  //         // 使用函数模板  传入的数据值 -> value: number | Array
  //         formatter: function (val) {
  //           if(val.data == null) return ;
  //           return val.data.name + ': ' + val.data.value
  //         }
  //       },
  //       // 视觉映射组件
  //       visualMap: {
  //         min: 0,
  //         max: 10000,
  //         text:['max','min'],
  //         realtime: false,
  //         calculable: true,
  //         color: ['#0064d0','#c3e0ff'],
  //       },
  //       series: [
  //         {
  //           type: 'map', // 类型
  //           // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
  //           name: '世界地图',
  //           mapType: 'world', // 地图类型
  //           // 是否开启鼠标缩放和平移漫游 默认不开启 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
  //           roam: true,
  //           // 图形上的文本标签
  //           label: {
  //             show: false // 是否显示对应地名
  //           },
  //           zoom: 1.2,
  //           // 地图区域的多边形 图形样式
  //           itemStyle: {
  //             // areaColor: '#7B68EE', // 地图区域的颜色 如果设置了visualMap，areaColor属性将不起作用
  //             borderWidth: 0.5, // 描边线宽 为 0 时无描边
  //             borderColor: '#000', // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
  //             borderType: 'solid' // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
  //           },
  //           // 高亮状态下的多边形和标签样式
  //           emphasis: {
  //             label: {
  //               show: true, // 是否显示标签
  //               color: '#fff' // 文字的颜色 如果设置为 'auto'，则为视觉映射得到的颜色，如系列色
  //             },
  //             itemStyle: {
  //               areaColor: '#FF6347' // 地图区域的颜色
  //             }
  //           },
  //           // 自定义地区的名称映射
  //           nameMap: name,
  //           // 地图系列中的数据内容数组 数组项可以为单个数值
  //           data: data
  //         }
  //       ]
  //     })
  //   }
  // },
  // mounted () {
  //   this.getWorld(this.msg)
  // },
  // watch: {
  //   msg: {
  //     deep: true,
  //     handler(val) {
  //       this.getWorld(val)
  //     }
  //   }
  // },
};
</script>
<!--<template>
  <div ref="chart" style="width: 100%; height: 500px;"></div>
</template>

<script>
import { onMounted, ref } from 'vue'
import echarts from 'echarts'
import 'echarts/map/js/world'

export default {
  name: 'ThermalMap',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const chartRef = ref(null)

    onMounted(() => {
      const chart = echarts.init(chartRef.value)

      const option = {
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          inRange: {
            color: ['#fff', '#FF4500']
          }
        },
        series: [
          {
            type: 'map',
            map: 'world',
            roam: true,
            emphasis: {
              label: {
                show: false
              },
              itemStyle: {
                areaColor: '#FFA07A'
              }
            },
            data: props.data
          }
        ]
      }

      chart.setOption(option)
    })

    return { chartRef }
  }
}
</script>-->

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.block {
  width: 60%;
  display: block;

.demonstration {
  font-size: medium;
  font-weight: bold;
}

.picker {
  padding: 20px;
}

}
</style>
