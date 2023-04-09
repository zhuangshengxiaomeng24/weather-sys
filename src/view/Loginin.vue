<template>
  <div class="sign-in">
    <div class="form" v-if="!this.$store.state.isLogin">
      <h2>粤港澳大湾区极端气象灾害预警及靶向服务平台</h2>
      <div class="input">
        <input
          type="text"
          id="uid"
          required
          class="active"
          v-model="userinfo.uid"
          name="uid"
          @focus="onFocus"
          @blur="onBlur"
        />
        <label class="label" for="email">
          <span style="transition-delay: 0ms">U</span>
          <span style="transition-delay: 50ms">I</span>
          <span style="transition-delay: 100ms">D</span>
        </label>
      </div>
      <div class="input">
        <input
          :type="pwdType"
          id="pwd"
          class="active"
          required
          name="password"
          v-model="userinfo.password"
          @focus="onFocus"
          @blur="onBlur"
        />
        <label class="label" for="pwd">
          <span style="transition-delay: 0ms">密</span>
          <span style="transition-delay: 50ms">码</span>
        </label>
        <div class="view-icon">
          <el-icon v-if="showPwd" @click="hidePassword">
            <sunny />
          </el-icon>
          <el-icon v-else @click="showPassword">
            <sunrise />
          </el-icon>
        </div>
      </div>
      <input type="submit" @click="checkForm" value="登录" id="btn" />
      <p class="forgot">
        <router-link to="/forget">忘记密码?</router-link>
      </p>
      <p>
        没有账户?
        <router-link to="/register">创建新用户</router-link>
      </p>
    </div>
    <div class="form" v-if="this.$store.state.isLogin">
      <h2>粤港澳大湾区极端气象灾害预警及靶向服务平台</h2>
      <div class="avatar-div">
        <div class="avatar">
          <img class="avatar-img" src="../assets/User.png" />
        </div>
      </div>
      <div class="text">
        尊敬的用户{{ this.$store.state.userinfo.uid }}，您已经登录!
      </div>
      <div class="btn-group">
        <el-button
          type="submit"
          @click="toPredict()"
          value="Use"
          class="Use-btn"
          >进入</el-button
        >
        <el-button
          type="submit"
          @click="Loginout()"
          value="Loginout"
          class="Loginout-btn"
          >登出</el-button
        >
      </div>
    </div>

    <!-- 
    <el-button @click="test_api">click</el-button> -->
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
// import { idApi } from "../api/index.js";

export default {
  name: "sign-in",
  data() {
    return {
      userinfo: { uid: "", password: "" },
      showMsg: false,
      msg: "",
      isOk: false,
      showPwd: false,
      pwdType: "password",
    };
  },
  methods: {
    // // 处理弹出提示，isError为false是背景色为green，否则为red
    // alertMsg(msg, isError = true) {
    //   this.showMsg = true;
    //   if (!isError) this.isOk = true;
    //   this.msg = msg;
    //   setTimeout(() => {
    //     this.showMsg = false;
    //   }, 3000);
    // },
    // 检查表单信息
    // axios({
    //     method: "POST",
    //     url: "http://47.112.166.50:10002/userFunc/login/",
    //     data: { uid: this.uid, password: this.password },
    //   })
    checkForm() {
      axios
        .post(
          "http://47.112.166.50:10002/userFunc/login/",
          "uid=" + this.userinfo.uid + "&password=" + this.userinfo.password
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "登陆成功",
              grouping: true,
              type: "success",
            });
            this.$store.commit("Loginin", this.userinfo);
          } else {
            ElMessage({
              message: "账号或密码错误！",
              grouping: true,
              type: "error",
            });
          }
        });
      // idApi.login({uid:this.uid,password:this.password}).then(res=>{console.log(res)})
    },
    onFocus(e) {
      e.target.classList.add("active");
    },
    onBlur(e) {
      if (!e.target.value.length) e.target.classList.remove("active");
    },
    showPassword() {
      this.pwdType = "text";
      this.showPwd = true;
    },
    hidePassword() {
      this.pwdType = "password";
      this.showPwd = false;
    },
    toPredict() {
      this.$router.push({
        path: "/predict",
      });
    },
    Loginout() {
      this.$store.commit("Loginout");
    },
    // test_api() {
    //   axios({
    //     method: "post",
    //     url: "http://47.112.166.50:10002/userFunc/login/",
    //     data: {
    //       uid: "LiSi",
    //       password: 2,
    //     },
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // },
  },
  mounted() {},
};
</script>

<style scoped>
.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
}

.form {
  padding: 30px;
  /* width: 400px; */
  width: 48vw;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(18, 27, 89, 0.5);
  background: var(--color2-light);
  display: flex;
  flex-direction: column;
}

.form h2 {
  margin: 20px 0;
  letter-spacing: 3px;
  color: var(--color1-dark);
}

.form .input {
  width: 100%;
  margin: 25px 0;
  position: relative;
  font-weight: bold;
}

.avatar-div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.avatar {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  width: 150px;
  border: none;
  height: 150px;
  position: relative;
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 140px;
  height: 140px;
}

.input label {
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
}

.input label span {
  color: var(--color2-dark);
  font-size: 20px;
  display: inline-block;
  transition: transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.input input {
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-weight: bold;
  font-size: 20px;
  padding: 5px 0px;
  border: none;
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--color);
}

input.active + label span {
  transform: translateY(-150%);
  color: var(--color1-light);
}

input.active {
  outline: none;
  border-bottom: 3px solid var(--color1-light);
  color: var(--color1-dark);
}

#btn {
  height: 40px;
  margin: 30px 0;
  /* width: 300px; */
  width: 36vw;
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

.btn-group{
  display: flex;
  flex-direction: row;
}

.Use-btn {
  height: 40px;
  margin: 30px 0;
  /* width: 300px; */
  width: 36vw;
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

.Use-btn:hover {
  background: linear-gradient(to left, #8bbbed, #e8f4ff);
}

.Loginout-btn {
  height: 40px;
  /* width: 300px; */
  width: 36vw;
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

.Loginout-btn:hover {
  background: linear-gradient(to left, #8bbbed, #e8f4ff);
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px var(--color2-light) inset;
}

.form p {
  margin: 10px 0;
}

.text {
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
}

.form p a {
  text-decoration: none;
  padding: 0 5px;
  font-weight: bold;
  color: var(--color1-light);
}

.view-icon {
  display: block;
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 20px;
  transform: translateY(-50%);
  color: var(--color1-dark);
  cursor: pointer;
}
</style>
