<template>
  <div class="profile">
    <section class="section1">
      <el-menu :default-active="tabIndex">
        <el-menu-item index="1" @click="showInfo">
          <!-- <el-icon><UserFilled /></el-icon> -->
          <span>我的信息</span>
        </el-menu-item>
        <el-menu-item index="2" @click="showChangePassword">
          <!-- <el-icon><UserFilled /></el-icon> -->
          <span>修改密码</span>
        </el-menu-item>
        <el-menu-item index="3" @click="showChangePhone">
          <!-- <el-icon><UserFilled /></el-icon> -->
          <span>更换手机</span>
        </el-menu-item></el-menu
      >
    </section>
    <section class="section2" v-if="ifShowInfo">
      <div class="basic-info">
        <p class="title">基本信息</p>
        <section class="section3">
          <div class="avatar">
            <img class="avatar-img" src="../assets/User.png" />
          </div>
          <div id="container"></div>
        </section>
        <section class="section4">
          <div class="info-item">
            <div>
              <label for="name"><p>UID</p></label>
              <input
                type="text"
                v-model="updatedInfo.uid"
                id="name"
                :disabled="true"
              />
            </div>
          </div>
          <div class="info-item">
            <div>
              <label for="name"><p>姓名</p></label>
              <input
                type="text"
                v-model="updatedInfo.name"
                id="name"
                :disabled="ifchange"
              />
            </div>
          </div>
          <div class="info-item">
            <div>
              <label for="name"><p>性别</p></label>
              <input
                type="text"
                v-model="updatedInfo.sex"
                id="name"
                :disabled="ifchange"
              />
            </div>
          </div>
          <div class="info-item">
            <div>
              <label for="name"><p>年龄</p></label>
              <input
                type="text"
                v-model="updatedInfo.age"
                id="name"
                :disabled="ifchange"
              />
            </div>
          </div>
          <div class="info-item">
            <div>
              <label for="name"><p>昵称</p></label>
              <input
                type="text"
                v-model="updatedInfo.nick_name"
                id="name"
                :disabled="ifchange"
              />
            </div>
          </div>
          <div class="info-item">
            <div>
              <label for="phone"><p>手机号码</p></label>
              <input
                type="text"
                v-model="updatedInfo.phone_number"
                id="phone"
                :disabled="true"
              />
            </div>
          </div>
          <div class="info-item">
            <div>
              <label for="country"><p>经度</p></label>
              <input
                type="text"
                v-model="updatedInfo.longitude"
                id="country"
                :disabled="true"
              />
            </div>
          </div>
          <div class="info-item">
            <div>
              <label for="position"><p>纬度</p></label>
              <input
                type="text"
                v-model="updatedInfo.latitude"
                id="position"
                :disabled="true"
              />
            </div>
          </div>
        </section>
        <el-button id="btn" @click="updateInfo">{{ buttonText }}</el-button>
      </div>
    </section>
  </div>
  <el-dialog
    v-model="ifShowChangePassword"
    title="密码修改"
    width="80%"
    :show-close="false"
    :before-close="handleClose"
  >
    <div class="password-input">
      <label for="password">原密码</label>
      <el-input
        id="password"
        v-model="password"
        type="password"
        placeholder="请输入密码"
        show-password
      />
    </div>
    <div class="password-input">
      <label for="newpassword">新密码1</label>
      <el-input
        id="newpassword"
        v-model="newpassword1"
        type="password"
        placeholder="请输入要设置的新密码(7-16位)"
        show-password
      />
    </div>
    <div class="password-input">
      <label for="newpassword">新密码2</label>
      <el-input
        id="newpassword"
        v-model="newpassword2"
        type="password"
        placeholder="请再输入一遍新密码"
        show-password
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="ifShowChangePassword = false">取消</el-button>
        <el-button type="primary" @click="changePassword">修改</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="ifShowChangePhone"
    title="手机号码修改"
    width="80%"
    :show-close="false"
    :before-close="handleClose"
  >
    <div v-if="Verification">
      <div class="password-input">
        <label for="password">原手机号码</label>
        <el-input
          id="password"
          v-model="this.updatedInfo.phone_number"
          :disabled="true"
        />
      </div>
      <div class="password-input">
        <label for="newpassword">手机验证码</label>
        <el-input v-model="code" placeholder="请输入收到的验证码">
          <template #append>
            <el-button @click="sendVertification">发送验证码</el-button>
          </template></el-input
        >
      </div>
    </div>
    <div v-else>
      <div class="password-input">
        <label for="password">新手机号码</label>
        <el-input
          id="password"
          v-model="this.newphone_number"
          placeholder="请输入要设置的新手机号码"
        />
      </div>
      <div class="password-input">
        <label for="newpassword">手机验证码</label>
        <el-input v-model="code" placeholder="请输入收到的验证码">
          <template #append>
            <el-button @click="sendVertification">发送验证码</el-button>
          </template></el-input
        >
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="ifShowChangePhone = false">取消</el-button>
        <el-button v-if="Verification" type="primary" @click="checkVerification"
          >下一步</el-button
        >
        <el-button v-else type="primary" @click="setNewPhone">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import AMapLoader from "@amap/amap-jsapi-loader";
// import { idApi } from "../api/index.js";

export default {
  name: "profile",
  data() {
    return {
      updatedInfo: {},
      tabIndex: "1",
      map: null,
      password: "",
      ifShowInfo: true,
      ifShowChangePassword: false,
      ifShowChangePhone: false,
      newpassword1: "",
      newpassword2: "",
      newphone_number: "",
      code: "",
      Verification: true,
      dialogVisible: false,
      ChangeVisible: false,
      buttonText: "修改个人信息",
      ifchange: true,
    };
  },
  mounted() {
    if (this.$store.state.isLogin == false) {
      this.alertMsg();
      setTimeout(() => {
        this.$router.push({
          path: "/",
        });
      }, 2000);
    } else {
      axios
        .get("http://47.112.166.50:10002/userFunc/userView", {
          params: { uid: this.$store.state.userinfo.uid },
        })
        .then((res) => {
          console.log(res);
          this.updatedInfo = res.data.data;
          this.initMap();
        });
    }
  },
  updated(){
    this.initMap();
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: "3773550f1f0bde0cf54825ce3d7f9c3f", //此处填入我们注册账号后获取的Key
        version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [""], //需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            //设置地图容器id
            viewMode: "3D", //是否为3D地图模式
            zoom: 6, //初始化地图级别
            center: [this.updatedInfo.longitude, this.updatedInfo.latitude], //初始化地图中心点位置
          });
          var marker = new AMap.Marker({
            position: new AMap.LngLat(this.updatedInfo.longitude, this.updatedInfo.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "当前定位",
          });
          this.map.add(marker);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    checkVerification() {
      axios
        .get("http://47.112.166.50:10002/userFunc/sms_check/", {
          params: { phone: this.updatedInfo.phone_number, code: this.code },
        })
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "验证码正确",
              grouping: true,
              type: "success",
            });
            this.Verification = false;
          } else {
            ElMessage({
              message: "验证码错误",
              grouping: true,
              type: "error",
            });
          }
        });
    },
    setNewPhone() {
      axios
        .get("http://47.112.166.50:10002/userFunc/phone_number/", {
          params: {
            uid: this.updatedInfo.uid,
            phone: this.newphone_number,
            code: this.code,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "修改成功",
              grouping: true,
              type: "success",
            });
            this.updatedInfo.phone_number = this.newphone_number;
            this.ifShowChangePhone = false;
            this.Verification = true;
          } else {
            ElMessage({
              message: "验证码错误",
              grouping: true,
              type: "error",
            });
          }
        });
    },
    sendVertification() {
      axios
        .get("http://47.112.166.50:10002/userFunc/sms_send/", {
          params: { phone: this.updatedInfo.phone_number },
        })
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "发送成功",
              grouping: true,
              type: "success",
            });
          } else {
            ElMessage({
              message: "发送失败",
              grouping: true,
              type: "error",
            });
          }
        });
    },
    sendNewVertification() {
      axios
        .get("http://47.112.166.50:10002/userFunc/phone_number/", {
          params: { phone: this.newphone_number },
        })
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "发送成功",
              grouping: true,
              type: "success",
            });
          } else {
            ElMessage({
              message: "发送失败",
              grouping: true,
              type: "error",
            });
          }
        });
    },
    changePassword() {
      if (this.newpassword1 != this.newpassword2) {
        ElMessage({
          message: "两次输入的密码不一致",
          grouping: true,
          type: "error",
        });
      } else {
        axios
          .post(
            "http://47.112.166.50:10002/userFunc/password/",
            "uid=" +
              this.updatedInfo.uid +
              "&old_password=" +
              this.password +
              "&new_password1=" +
              this.newpassword1 +
              "&new_password2=" +
              this.newpassword2
          )
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              ElMessage({
                message: "密码修改成功",
                grouping: true,
                type: "success",
              });
            } else {
              ElMessage({
                message: "修改失败！",
                grouping: true,
                type: "error",
              });
            }
          });
        this.ifShowChangePassword = false;
      }
    },
    showInfo() {
      this.tabIndex = "1";
      this.ifShowInfo = true;
      this.ifShowChangePassword = false;
      this.ifShowChangePhone = false;
    },
    showChangePassword() {
      this.tabIndex = "2";
      this.ifShowChangePassword = true;
    },
    showChangePhone() {
      this.tabIndex = "3";
      this.ifShowChangePhone = true;
    },
    updateInfo() {
      if (this.ifchange == true) {
        this.ifchange = false;
        this.buttonText = "确定";
      } else {
        axios({
          method: "POST",
          url: "http://47.112.166.50:10002/userFunc/userView/",
          data: {
            uid: this.updatedInfo.uid,
            name: this.updatedInfo.name,
            sex: this.updatedInfo.sex,
            age: this.updatedInfo.age,
            nick_name: this.updatedInfo.nick_name,
            phone_number: this.updatedInfo.phone_number,
            longitude: this.updatedInfo.longitude,
            latitude: this.updatedInfo.latitude,
          },
        }).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            ElMessage({
              message: "修改成功",
              grouping: true,
              type: "success",
            });
            this.ifchange = true;
            this.buttonText = "修改个人信息";
          } else {
            ElMessage({
              message: "修改失败",
              grouping: true,
              type: "error",
            });
          }
        });
      }
    },
    alertMsg() {
      this.$store.commit("alertMsg", {
        msg: "您还未登录，即将跳转至登录页面",
        type: "error",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.section1 {
  /* flex: 1.5; */
  width: 15vw;
  display: flex;
  flex-direction: column;
  align-self:center;
  justify-content: center;
  background: linear-gradient(to right, #99ccff, #ccffff);
  border-radius: 20px;
  margin-top: 20px;
  height: 100%;
}
.section2 {
  /* flex: 8.5; */
  height: 130vh;
  width:85vw;
  align-self: center;
}
#container {
  /* width: 300px;
  height: 150px; */
  width: 60vw;
  height: 30vw;;
  border-radius: 10px;
  border:#8bbbed 2px solid
}
.el-menu {
  width: 100%;
  /* width: 15vw; */
  border: none;
  background: transparent;
  height: 120vh;
  align-self: flex-start;
  /* padding: 0; */
}

.el-menu-item{
  padding: 0 !important;
  margin-left: 1vw;
}

.profile {
  /* width: 100%; */
  width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: row;
  height: fit-content;
  align-items: center;
}

.password-input {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  align-items: center;
  justify-content: space-around;
}
.password-input .el-input {
  width: 80%;
}

.basic-info,
.account-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section3 {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.section4 {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  position: relative;
  margin-top: 100px;
  width: 100%;
  /* margin-left: 15vw; */
  /* text-align: center; */
  /* background: blue; */
}
.password-change {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.title {
  white-space: nowrap;
  align-self: flex-start;
  text-align: start;
  border-radius: 5px;
  font-size: 22px;
  // margin-left: 50px;
  margin-left:2vw;
  color: black;
  background: var(--color2-dark);
}

.avatar {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  /* width: 150px; */
  border: none;
  /* height: 150px; */
  width: 10vw;
  height: 10vw;
  position: relative;
  display: flex;
  justify-content: center;
}

.avatar img {
  /* width: 140px;
  height: 140px; */
  width: 100%;
  height: 100%;
}

.info-item {
  /* margin: 15px 0; */
  margin: 1vw;
  margin-left:2vw;
  display: flex;
  width: 20%;
  /* width: 15vw; */
  /* background: pink; */
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: center;
}

.info-item div {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* width: fit-content; */
  width: 100%;
}

.info-item label {
  color: var(--color1-dark);
  /* font-size: 20px; */
  font-size: 1vw;
  font-weight: bolder;
  /* box-sizing: content-box; */
  /* margin: 5px 0; */
  margin: 1vw 0;
  /* width: 100px; */
  width: 7vw;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: var(--color2-dark);
  border: 1px solid var(--color1-light);
}

.info-item input {
  /* flex: 1; */
  width: 13vw;
  height: 50px;
  /* overflow: visible; */
  /* font-size: 20px; */
  font-size: 1vw;
  /* padding-left: 8px; */
  padding-left: 1vw;
  margin-right: 1vw;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  border-bottom: 2px solid var(--color2-dark);
  color: var(--color1-dark);
  /* background-color: var(--color2-light); */
  /* box-shadow: inside 0 0 0 1000px var(--color2-light); */
}

.info-item input:focus {
  outline: 2px solid var(--color1-dark);
  border-radius: 8px;
}

.info-item input:disabled {
  background: transparent;
}

#btn {
  height: 40px;
  margin-top: 100px;
  width: 300px;
  align-self: center;
  background: linear-gradient(to right, #8bbbed, #e8f4ff);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(18, 27, 89, 0.5);
  border: none;
  cursor: pointer;
  font-size: 20px;
  /* color: white; */
  font-weight: bold;
}

#btn:hover {
  background: linear-gradient(to left, #8bbbed, #e8f4ff);
}
#btn1 {
  height: 40px;
  width: 300px;
  margin-top: 40px;
  margin-left: 0px;
  align-self: center;
  background: linear-gradient(to right, #8bbbed, #e8f4ff);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(18, 27, 89, 0.5);
  border: none;
  cursor: pointer;
  font-size: 20px;
  /* color: white; */
  font-weight: bold;
}

#btn1:hover {
  background: linear-gradient(to left, #8bbbed, #e8f4ff);
}
.account-infos {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.account-item {
  /* background: red; */
  font-size: 20px;
  margin: 20px 0;
}
</style>





