import { createStore } from "vuex";

const store = createStore({
    state: {
        isLogin:false,
        userinfo:{
            uid:""
        },
        msgState:{
            isShowing:false,
            msgValue:"",
            msgType:'error'
        }
    },
    getters: {

    },
    mutations: {
        Loginin(state,userinfo){
            state.isLogin=true
            state.userinfo.uid=userinfo.uid
        },
        Loginout(state){
            state.isLogin=false
        },
        alertMsg(state, params) {
            state.msgState.msgValue = params.msg ? params.msg : 'msg';
            state.msgState.msgType = params.type ? params.type : 'error';
            state.msgState.isShowMsg = true;
            setTimeout(() => {
                state.msgState.isShowMsg = false;
            }, params.time ? params.time : 3000);
    }
}
});

export default store;