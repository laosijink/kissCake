<template>
  <div>
      <div v-if="$store.state.showUser">
          <div class="info">
          <div class="img">
              <img src="https://avatar.gitee.com/uploads/group/539678777172974.png" @click="show=!show">
              <van-image-preview v-model="show" :images="images"></van-image-preview>
          </div>
          <h2>Msea~</h2>
          <div class="userInfo">
              <li>
                  <p class="usertop">余额</p>
                  <p class="userbot">6234103.52</p>
              </li>
              <li>
                  <p class="usertop">吉致币</p>
                  <p class="userbot">999</p>
              </li>
              <li @click="toPath('/coupon')">
                  <p class="usertop">优惠券</p>
                  <p class="userbot">2</p>
              </li>
              <li>
                  <p class="usertop">兑换券</p>
                  <p class="userbot">13</p>
              </li>
          </div>
      </div>
      <div class="order">
          <li>
              <van-icon name="notes-o" size="22px" tag="i"/><span>我的订单</span><van-icon name="arrow" tag="b"/>
          </li>
          <li @click="toPath('/address')">
              <van-icon name="location-o" size="22px" tag="i"/><span>收货地址</span><van-icon name="arrow"  tag="b"/>
          </li>
      </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Icon,ImagePreview } from 'vant';
Vue.use(Icon).use(ImagePreview);
export default {
    data() {
    return {
      show: false,
      images: [
        'https://avatar.gitee.com/uploads/group/539678777172974.png',
      ]
    };
  },
    mounted(){
        // this.$store.state.showUser = false;
    },
    methods: {
       toPath(path){
           this.$router.push(path)
       } 
    },
}
</script>

<style lang="scss" scoped>
    .info{
        border-bottom: rem(14) solid rgb(247, 247, 247);
        padding-bottom: rem(12);
    }
    .img{
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 50%;
        margin: rem(40) auto rem(15);
        img{
            width: 100%;
        }
    }
    h2{
        text-align: center;
        font-size: rem(14);
        margin-bottom: rem(18);
    }
    .userInfo{
        display: flex;
        justify-content: space-around;
        text-align: center;
        p{
            margin-top: rem(10);
        }
        .usertop{
            line-height: 4vw;
            font-size: 2.93vw;
            color: #ccc;
        }
        .userbot{
            padding-top: 1.73vw;
            line-height: 5.73vw;
            font-size: 4.8vw;
            color: #333;
        }
    }
    .order{
        li{
            border-bottom: 1px solid rgb(247, 247, 247);
            height: rem(50);
            line-height: rem(50);
            padding-left: rem(20);
            span{
                font-size: rem(16);
                margin-left: rem(10);
            }
            i{
                vertical-align: middle;
            }
            b{
                float: right;
                line-height: rem(50);
                margin-right: rem(12);
                color: #ccc;
            }
        }
    }
</style>