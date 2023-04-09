<template>
  <div class="nav">
    <div class="logo">
      <img src="../assets/logo2.png" class="img" />
      <!-- <img src="../assets/signin/scut.png" class="img" />
      <img src="../assets/signin/sysu.png" class="img" />
      <img src="../assets/signin/cuhk.png" class="img" />
      <img src="../assets/signin/cma.png" class="img" />
      <img src="../assets/signin/gdms.png" class="img" /> -->
      <h3>华南理工大学软件学院</h3>
    </div>
    <div class="nav-menu" v-if="this.$store.state.isLogin">
      <el-menu
        :default-active="activeindex"
        :ellipsis="false"
        text-color="white"
        mode="horizontal"
        background-color="transparent"
        style="display: flex;"
      >
        <el-menu-item index="1" @click="toPredict()">天气预警</el-menu-item>
        <el-menu-item index="2" @click="toWind()">风速预警</el-menu-item>
        <el-menu-item index="3" @click="toNino()">厄尔尼诺</el-menu-item>
        <el-menu-item index="4" @click="toMy()">用户中心</el-menu-item>
      </el-menu>
      <div class="nav-user">
        <div class="avatar">
          <img class="avatar-img" src="../assets/User.png" />
        </div>
        <p class="nav-uid">{{ this.$store.state.userinfo.uid }}</p>
        <el-button id="btn" @click="Loginout()">退出登录</el-button>
      </div>
    </div>
    <!-- <el-button @click="toMy()">User</el-button> -->
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    handleselect(e) {
      console.log(e);
    },
    toMy() {
      this.activeindex = "4";
      this.$router.push({
        path: "/my",
      });
    },
    toWind() {
      this.activeindex = "2";
      this.$router.push({
        path: "/wind",
      });
    },
    toNino(){
      this.activeindex = "3";
      this.$router.push({
        path: "/nino",
      });
    },
    toPredict() {
      this.activeindex = "1";
      this.$router.push({
        path: "/predict",
      });
    },
    Loginout() {
      this.$store.state.isLogin = false;
      this.$router.push({
        path: "/",
      });
    },
  },
  data() {
    return {
      activeindex: "1",
    };
  },
};
</script>

<style lang="css">
.nav {
  background: linear-gradient(to right, #99ccff, #ccffff);
  width: auto;
  border-radius: 10px;
  height: 80px;
  /* height: 4vw; */
  flex-direction: row;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
}
h3 {
  color: #ffffff;
  font-size: 1vw;
  width: 11vw;
  margin-right: 1vw;
}
.img {
  /* height: 80px; */
  /* width: 80px; */
  width: 4vw;
}
.userButton {
  color: skyblue;
}
.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nav-menu {
  display: flex;
  flex-direction: row;
  width:80vw;
}
.el-menu .el-menu-item {
  flex: 1;
  font-size: 1vw;
  font-weight: bold;
  color: white;
  width:15vw;

}
.nav-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 35vw;
  /* height: 4vw; */
}
.nav-uid {
  margin: 0px 10px;
  color: gray;
  font-weight: bold;
  font-size: 1vw;
  width:3vw;
  padding-right: 2vw;
}
.avatar {
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  /* height: 64px; */
  position: relative;
  display: flex;
  justify-content: center;
  width:3vw;
  height:3vw;
}
#btn {
  align-self: center;
  background: linear-gradient(to right, #8bbbed, #e8f4ff);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(18, 27, 89, 0.5);
  border: none;
  cursor: pointer;
  margin-right: 10px;
  color: black;
  /* color: white; */
  width:16vw;
}

#btn:hover {
  background: linear-gradient(to left, #8bbbed, #e8f4ff);
}
</style>
