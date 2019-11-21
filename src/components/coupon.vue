<template>
    <div>
        <p>
            <van-icon name="arrow-left" size="30px" style="margin:20px 0 20px 10px" @click="toPath"/>
        </p>
        <van-coupon-cell
  :coupons="coupons"
  :chosen-coupon="chosenCoupon"
  @click="showList = true"
/>

<!-- 优惠券列表 -->
<van-popup v-model="showList" position="bottom">
  <van-coupon-list
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    :disabled-coupons="disabledCoupons"
    @change="onChange"
    @exchange="onExchange"
  />
</van-popup>
    </div>
</template>

<script>;
import Vue from 'vue';
import { CouponCell, CouponList,Icon } from 'vant';
Vue.use(CouponCell).use(CouponList).use(Icon);
export default {
  data() {
    return {
        showList: false,
        chosenCoupon: -1,
        coupons: [{
            available: 1,
            condition: '无使用门槛\n最多优惠20元',
            reason: '',
            value: 2000,
            name: '蛋糕无门槛券',
            startAt: 1714592000,
            endAt: 1789104000,
            valueDesc: '20',
            unitDesc: '元'
        }],
        disabledCoupons: [{
            available: 1,
            condition: '无使用门槛\n最多优惠10%',
            reason: '',
            value: 150,
            name: '伴手礼券',
            startAt: 1714592000,
            endAt: 1789104000,
            valueDesc: '150',
            unitDesc: '元'
        }]
    }
  },

  methods: {
      onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    toPath(){
        this.$router.push("/user")
    }
  }
}
</script>