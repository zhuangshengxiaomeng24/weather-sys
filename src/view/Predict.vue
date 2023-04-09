<template>
  <div class="hello">
    <!-- <img alt="logo" src="../assets/intro.png" style="width: 100%" /> -->
    <h1 style="color:rgb(59, 153, 239);font-size: 45px;margin-bottom: 80px;margin-top: 40px">基于图神经网络的天气靶向推荐系统</h1>
    <h4>请用户在下方选择需要预测的条数，默认条数为50条</h4>
    <div class="form">
      <el-form class="form">
        <el-form-item label="建议条数">
          <el-input
            type="text"
            v-model="nums"
            placeholder="请输入建议的条数"
            class="showLine"
          >
            </el-input
          >
        </el-form-item>
        <el-button @click="submit_axios()" class="showLine"> 提交</el-button>
      </el-form>
    </div>

    <div class="show-table">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tips.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        small
      />
      <el-table
        :data="tips.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        :stripe="true"
        :border="true"
        fixed
      >
        <el-table-column prop="temperature" label="气温" sortable>
        </el-table-column>
        <el-table-column prop="humidity" label="湿度" sortable>
        </el-table-column>
        <el-table-column prop="wind_speed" label="风速" sortable>
        </el-table-column>
        <el-table-column prop="visibility" label="能见度" sortable>
        </el-table-column>
        <el-table-column prop="pressure" label="大气压" sortable>
        </el-table-column>
        <el-table-column prop="wind_bearing" label="风向"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      show: true,
      tips: [],
      currentdata: [],
      stdNum: "",
      currentPage: 1,
      pageSize: 20,
      nums: 50,
    };
  },
  props: {
    msg: String,
  },
  methods: {
    submit_axios() {
      axios
        .post(
          "http://47.112.166.50:10002/weather/test/",
          "stdNum=123" + "&nums=" + this.nums
        )
        .then((res) => {
          // console.log(res);
          console.log(res.data.pre);
          this.tips = res.data.pre;
        });
    },
    alertMsg() {
      this.$store.commit("alertMsg", {
        msg: "您还未登录，即将跳转至登录页面",
        type: "error",
      });
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  mounted() {
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
  flex-direction: row;
  justify-content: center;
}
.show-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.head {
  font-size: 30px;
  color: gray;
  align-self: flex-start;
  margin-left: 2.5%;
}

.show-table .el-pagination {
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  // font-size: 1vw;
}

.el-pagination__total{

}


.show-table .el-table {
  width: 95%;
  border-radius: 20px;
}

.el-pagination .el-pagination__total,
.el-pagination .el-pagination__jump {
  font-size: 15px;
  // font-size: 1vw;
  margin-right: 1vw;
  color: white;
  /* font-weight: li */
}

.el-pagination .el-pager .number.active {
  background: var(--color2-dark);
}

.el-pagination .el-pager .number:hover,
.el-pagination .btn-prev.hover,
.el-pagination .btn-next.hover {
  background: var(--color2-light);
  color: var(--color1-dark);
}
</style>
