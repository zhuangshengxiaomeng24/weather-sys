<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
    <Footer></Footer>
    <div v-show="state.isShowMsg" :class="['msg', state.msgType]">
      <div class="msg-icon">
        <el-icon v-if="state.msgType == 'ok'" class="ok-icon"
          ><circle-check-filled
        /></el-icon>
        <el-icon v-else-if="state.msgType == 'error'" class="err-icon"
          ><circle-close-filled
        /></el-icon>
      </div>
      <span>{{ state.msgValue }}</span>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  data(){
    return{
      state: this.$store.state.msgState,
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgba(240,255,255,0.5);
  margin-top: 0px;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.msg {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  width: fit-content;
  color: var(--color1-dark);
  font-size: 20px;
  font-weight: bolder;
  letter-spacing: 1px;
  border-radius: 10px;
  animation: showmsg 500ms ease;
  z-index: 9999;
  background-color: var(--color2-light);
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0px 0px 2px 2px #8bbbed;
}
.el-icon {
  font-size: 20pt;
  margin: 0 10px;
}

.el-icon.ok-icon {
  color: green;
}
.el-icon.err-icon {
  color: red;
}
</style>

