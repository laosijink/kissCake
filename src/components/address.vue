<template>
    <div>
        <p>
            <van-icon name="arrow-left" size="30px" style="margin:20px 0 20px 10px" @click="toPath"/>
        </p>
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
        />
    </div>
</template>

<script>;
import Vue from 'vue';
import { AddressList, Icon } from 'vant';
Vue.use(AddressList).use(Icon);
export default {
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '老孟',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '达康书记',
          tel: '18888888888',
          address: '山西省太原市小店区长治路  50 号 能源互联网大厦'
        }
      ],
    }
  },

  methods: {
    toPath(){
        this.$router.push("/user")
    }
  }
}
</script>