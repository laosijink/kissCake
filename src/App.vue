<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#53c0c6" v-if="$store.state.showNav">
        
        <van-tabbar-item to="/">
            <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon.active : icon.inactive"
            class="home_icons"
            >
        </van-tabbar-item>
        <van-tabbar-item to="/list">
            <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon2.active : icon2.inactive"
            class="home_icons"
            >
        </van-tabbar-item>
        <van-tabbar-item to="/cart" :info="$store.state.cartList.length? $store.state.cartList.length:''">
            <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon3.active : icon3.inactive"
            class="home_icons"
            >
        </van-tabbar-item>
        <van-tabbar-item to="/user" @click="showPopup">
            <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon4.active : icon4.inactive"
            class="home_icons"
            >
        </van-tabbar-item>
    </van-tabbar>
    <van-popup
      v-model="show"
      position="right"
      class="login"
      closeable
      close-icon-position="top-left"
    >
      <h1 class="tit">快速登录</h1>
      <van-cell-group>
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" style="color:white" />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          ref="pwd"
          style="color:white"
        />
      </van-cell-group>
      <p class="agree">
        温馨提示：未注册的手机号，登录时将自动注册，且代表您已同意
        <span>《用户协议》</span>
      </p>
      <van-button round type="info" @click="login">登录</van-button>
      <van-button round type="info" @click="register">注册</van-button>
    </van-popup>
    <!-- <van-popup v-model="show" position="right">
        <van-cell-group>
            <van-field
                v-model="phone"
                label="手机号"
                placeholder="请输入手机号"
                required
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        </van-cell-group>
        <van-button type="info" size="large" plain hairline @click="login">登录</van-button>
        <van-button type="info" size="large" plain hairline @click="register">注册</van-button>
    </van-popup> -->
  </div>
</template>
<script>
import Vue from 'vue';
import Store from "storejs"
import { Popup,Field, Cell, CellGroup,Button,Toast  } from 'vant';
Vue.use(Popup).use(Field).use(Cell).use(CellGroup).use(Button).use(Toast);
    export default {
    data() {
        return {
            active: 0,
            show: false,
            phone:"",
            password:"",
            userList:[],
            icon: {
                active: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-a-2.png',
                inactive: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-a-1.png'
            },
            icon2:{
                active: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-b-2.png',
                inactive: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-b-1.png'
            },
            icon3:{
                active: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-c-2.png',
                inactive: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-c-1.png'
            },
            icon4:{
                active: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-d-2.png',
                inactive: 'https://res.bestcake.com/m-images/ww/foot/foot-menu-d-1.png'
            }
        }
    },
    methods: {
        showPopup() {
            this.show = !this.show;
        },
        login(){
            var cloudList = Store.get("userList") ||[];
            var len = cloudList.length;
            var flag = false;
            var index = 0;
            if(cloudList.length>=1){
                for(let i=0;i<len;i++){
                    if(this.phone === cloudList[i].uname){
                        flag = true;
                        index = i;
                    }else{
                        Toast('您还没有注册！请先注册~');
                    }
                }
                if(flag){
                    if(this.password === cloudList[index].upwd){
                        Toast('登录成功！');
                        this.$store.state.showUser = true;
                        this.show = !this.show;
                    }else{
                        Toast('密码错误！');
                    }
                }
            }else{
                Toast('您还没有注册！请先注册~');
            }
        },
        register(){
            this.show = !this.show;
            var cloudList = Store.get("userList")||[];
            var len = cloudList.length;
            if(len>=1){
                for(let i=0;i<len;i++){
                    if(this.phone === cloudList[i].uname){
                        Toast('该用户已存在！');
                        return;
                    }
                }
                this.userList.push({ "uname":this.phone, "upwd":this.password })
                Store.set("userList",this.userList)
                Toast('注册成功！');
                this.$store.state.showUser = true;
                return;
            }else{
                this.userList.push({ "uname":this.phone, "upwd":this.password })
                Store.set("userList",this.userList)
                Toast('注册成功！');
                this.$store.state.showUser = true;
                return;
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    
</style>
<style lang="scss" scoped>
    .van-tabbar-item__icon {
        display: flex;
        justify-content: space-around;
        img {
            width: 35px;
            height: 100%;
                margin: 0 auto;
        }
        }
        .van-tabbar-item {
            margin-top: 4px!important;
        }
    
        .login {
        background-color: #02d3d6;
        background-image: linear-gradient(141deg,#9fb8ad 0%,#1fc8db 51%,#2cb5e8 75%);
        z-index: 2004;
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
        }
        .van-cell {
        background-color: #02d3d6;
        background-image: linear-gradient(141deg,#1fc8db 51%,#2cb5e8 75%);
        }
        .tit {
        font-size: 32px;
        color: white;
        font-weight: 300;
        padding: 50px 0 10px 35px;
        }
        .van-hairline--top-bottom::after {
        border: none;
        }
        .agree {
        color: white;
        padding: 0 5px 0 15px;
        line-height: 20px;
        span {
            color: rgb(14, 144, 210);
        }
        }
        .van-button--normal {
        padding: 0 40px;
        font-size: 18px;
        height: r(35);
        line-height: r(35);
        background: transparent;
        border-color: white;
        font-weight: 300;
        margin-left: 11%;
        margin-top: 20px;
        }
</style>
<style lang="scss">
    @import url("./assets/css/reset.css");
    .van-tabbar-item__icon{
        display: flex;
        justify-content: space-around;
        
        img{
            width: 50%;
            height: 100%;
            z-index: 1000;
        }
    }
    .van-tabbar-item .van-info {
        margin-top: 7px;
        margin-right: 5px;
        z-index: 1001;
    }
</style>

