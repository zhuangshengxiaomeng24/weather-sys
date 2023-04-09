<template>
  <div class="register">
    <div class="form">
      <h2>用户注册</h2>
      <div class="input">
        <input
          type="text"
          id="email"
          required
          class="active"
          v-model="uid"
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
          name="password1"
          v-model="password1"
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
      <div class="input">
        <input
          :type="pwdType"
          id="pwd"
          class="active"
          required
          name="password2"
          v-model="password2"
          @focus="onFocus"
          @blur="onBlur"
        />
        <label class="label" for="pwd">
          <span style="transition-delay: 0ms">再</span>
          <span style="transition-delay: 50ms">次</span>
          <span style="transition-delay: 100ms">输</span>
          <span style="transition-delay: 150ms">入</span>
          <span style="transition-delay: 50ms">密</span>
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
      <div class="input">
        <input
          class="active"
          required
          name="name"
          v-model="name"
          @focus="onFocus"
          @blur="onBlur"
        />
        <label class="label" for="pwd">
          <span style="transition-delay: 0ms">姓</span>
          <span style="transition-delay: 50ms">名</span>
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
      <div class="input">
        <input
          class="active"
          required
          name="sex"
          v-model="sex"
          @focus="onFocus"
          @blur="onBlur"
        />
        <label class="label" for="pwd">
          <span style="transition-delay: 0ms">性</span>
          <span style="transition-delay: 50ms">别</span>
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
      <div class="input">
        <input
          class="active"
          required
          name="nick_name"
          v-model="nick_name"
          @focus="onFocus"
          @blur="onBlur"
        />
        <label class="label" for="pwd">
          <span style="transition-delay: 0ms">昵</span>
          <span style="transition-delay: 50ms">称</span>
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
      <div class="input">
        <input
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
        <div class="view-icon">
          <el-icon v-if="showPwd" @click="hidePassword">
            <sunny />
          </el-icon>
          <el-icon v-else @click="showPassword">
            <sunrise />
          </el-icon>
        </div>
      </div>
      <input type="submit" @click="checkForm" value="注册" id="btn" />
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
  name: "register",
  data() {
    return {
      uid: "",
      password1: "",
      password2: "",
      name: "",
      sex: "",
      nick_name: "",
      phone_number: "",
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
    checkForm() {
      if (this.uid == "") {
        ElMessage({
          message: "uid不能为空",
          grouping: true,
          type: "error",
        });
      } else if (this.password1 == "") {
        ElMessage({
          message: "密码不能为空",
          grouping: true,
          type: "error",
        });
      } else if (this.password2 == "") {
        ElMessage({
          message: "请再次输入密码",
          grouping: true,
          type: "error",
        });
      } else if (this.name == "") {
        ElMessage({
          message: "性别为男或女",
          grouping: true,
          type: "error",
        });
      } else if (this.sex == "") {
        ElMessage({
          message: "性别不能为空（且格式为男或女）",
          grouping: true,
          type: "error",
        });
      } else if (this.nick_name == "") {
        ElMessage({
          message: "昵称不能为空",
          grouping: true,
          type: "error",
        });
      } else if (this.phone_number == "") {
        ElMessage({
          message: "手机号码不能为空",
          grouping: true,
          type: "error",
        });
      } else if (this.sex != "" && this.sex != "男" && this.sex != "女") {
        ElMessage({
          message: "性别为男或女",
          grouping: true,
          type: "error",
        });
      } else if (this.password1 != this.password2) {
        ElMessage({
          message: "两次输入的密码不一致",
          grouping: true,
          type: "error",
        });
      } else {
        this.Register();
      }
      return false;
    },
    onFocus(e) {
      e.target.classList.add("active");
    },
    onBlur(e) {
      if (!e.target.value.length) e.target.classList.remove("active");
    },
    // axios({
    //     method: "POST",
    //     url: "http://47.112.166.50:10002/userFunc/register/",
    //     data: {
    //       uid: this.uid,
    //       name: this.name,
    //       password1: this.password1,
    //       password2: this.password2,
    //       sex: this.sex,
    //       nick_name: this.nick_name,
    //       phone_number: this.phone_number,
    //     },
    //   })
    Register() {
      axios
        .post(
          "http://47.112.166.50:10002/userFunc/register/",
          "uid=" +
            this.uid +
            "&name=" +
            this.name +
            "&password1=" +
            this.password1 +
            "&password2=" +
            this.password2 +
            "&sex=" +
            this.sex +
            "&nick_name=" +
            this.nick_name +
            "&phone_number=" +
            this.phone_number
        )
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            ElMessage({
              message: "注册成功",
              grouping: true,
              type: "success",
            });
            this.$router.push({
              path: "/",
            });
          } else {
            ElMessage({
              message: "注册失败",
              grouping: true,
              type: "error",
            });
          }
        });
    },
    showPassword() {
      this.pwdType = "text";
      this.showPwd = true;
    },
    hidePassword() {
      this.pwdType = "password";
      this.showPwd = false;
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
.register {
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
