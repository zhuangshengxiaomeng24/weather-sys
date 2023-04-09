<template>
  <div class="sign-in">
    <div class="form">
      <h2>找回密码</h2>
      <div class="input">
        <input
          type="text"
          id="uid"
          required
          class="active"
          v-model="uid"
          name="uid"
          :disabled="ifRight"
          @focus="onFocus"
          @blur="onBlur"
        />
        <label class="label" for="email">
          <span style="transition-delay: 0ms">U</span>
          <span style="transition-delay: 50ms">I</span>
          <span style="transition-delay: 100ms">D</span>
        </label>
      </div>
      <div v-if="!ifRight">
        <div class="input">
          <input
            id="phone_number"
            class="active"
            required
            name="phone_number"
            v-model="phone_number"
            @focus="onFocus"
            @blur="onBlur"
          />
          <label class="label" for="pwd">
            <span style="transition-delay: 0ms">手</span>
            <span style="transition-delay: 50ms">机</span>
            <span style="transition-delay: 100ms">号</span>
            <span style="transition-delay: 150ms">码</span>
          </label>
        </div>
        <input
          type="submit"
          @click="sendVertification"
          value="发送验证码"
          id="btn1"
        />
        <div class="input">
          <input
            type="text"
            id="code"
            required
            class="active"
            v-model="code"
            name="code"
            @focus="onFocus"
            @blur="onBlur"
          />
          <label class="label" for="email">
            <span style="transition-delay: 0ms">验</span>
            <span style="transition-delay: 50ms">证</span>
            <span style="transition-delay: 100ms">码</span>
          </label>
        </div>
        <input
          type="submit"
          @click="checkVerification()"
          value="验证"
          id="btn1"
        />
      </div>
      <div v-else>
        <div class="input">
          <input
            :type="pwdType"
            id="pwd"
            class="active"
            required
            name="password"
            v-model="password"
            @focus="onFocus"
            @blur="onBlur"
          />
          <label class="label" for="pwd">
            <span style="transition-delay: 0ms">新</span>
            <span style="transition-delay: 50ms">密</span>
            <span style="transition-delay: 100ms">码</span>
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
        <input type="submit" @click="submitNewpass()" value="提交" id="btn" />
      </div>
      <p>
        <router-link to="/">返回登录界面</router-link>
      </p>
    </div>
    <!-- 
    <el-button @click="test_api">click</el-button> -->
  </div>

  
</template>

<script>
// import { idApi } from "../api/index.js";
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "Forget",
  data() {
    return {
      uid: "",
      password: "",
      code: "",
      phone_number: "",
      showMsg: false,
      msg: "",
      isOk: false,
      ifRight: false,
      showPwd: false,
      pwdType: "password",

      
    };
  },
  methods: {
    checkForm() {
      axios
        .post(
          "http://47.112.166.50:10002/userFunc/login/",
          "uid=" + this.uid + "&password=" + this.password
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "登陆成功",
              grouping: true,
              type: "success",
            });
            this.$router.push({
              path: "/user",
            });
          } else {
            ElMessage({
              message: "账号或密码错误！",
              grouping: true,
              type: "error",
            });
          }
        });
    },
    checkVerification() {
      axios
        .get("http://47.112.166.50:10002/userFunc/sms_check/", {
          params: { phone: this.phone_number, code: this.code },
        })
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "验证码正确",
              grouping: true,
              type: "success",
            });
            this.ifRight = true;
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
          params: { phone: this.phone_number },
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
    submitNewpass() {
      axios
        .post(
          "http://47.112.166.50:10002/userFunc/password_forget/",
          "uid=" +
            this.uid +
            "&new_password1=" +
            this.password +
            "&new_password2=" +
            this.password
        )
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "设置成功",
              grouping: true,
              type: "success",
            });
            this.$router.push({
              path: "/",
            });
          } else {
            ElMessage({
              message: "设置失败",
              grouping: true,
              type: "error",
            });
          }
        });
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
#btn1 {
  height: 40px;
  margin: 10px 0;
  /* width: 300px; */
  width: 36vw;
  align-self: center;
  background: linear-gradient(to left, #8bbbed, #e8f4ff);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(18, 27, 89, 0.5);
  border: none;
  cursor: pointer;
  font-size: 20px;
  /* color: white; */
  font-weight: bold;
}

#btn1:hover {
  background: linear-gradient(to right, #8bbbed, #e8f4ff);
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px var(--color2-light) inset;
}

.form p {
  margin: 10px 0;
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
