<template>
  <div>
    <div class="rBg">
        <div v-if="!cartList.length" class="isEmpty">
        <h2>购物车是空的哦~</h2>
    </div>
    <div class="wrap">
        <van-card v-for="(item,index) in cartList" :key="index" clase="card" :num="item.num" :centered="true" :price="item.CurrentPrice" :desc="item.Size" :title="item.Name" :thumb="item.ImgUrl">
            <div slot="tag">
                    <van-checkbox @change="count()" v-model="item.check" :name="item.ID">
                        <img slot="icon" slot-scope="props" :src="props.checked ? activeIcon : inactiveIcon" style="width:50%">
                    </van-checkbox>
            </div>
            <div slot="tag" class="mark" @click="toShow(item)">
            </div>
            <div slot="footer" class="footer">
                <button @click="minus(item)" class="btn">-</button>
                <button @click="add(item)" class="btn">+</button>
            </div>
        </van-card>
    </div>
    <van-submit-bar :price="allPrice * 100" button-text="结算" style="bottom:50px;padding-left:20px">
        <van-checkbox v-model="check" @click="allCheck">
            <img slot="icon" slot-scope="props" :src="props.checked ? activeIcon : inactiveIcon" style="width:50%">
            <span>全选</span>
            <span class="goNo" @click="clearAll">清空</span>
        </van-checkbox>
    </van-submit-bar>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Store from "storejs"
import { SubmitBar ,Checkbox, CheckboxGroup, Card,Button,Stepper,Dialog,} from 'vant';
Vue.use(SubmitBar).use(Checkbox).use(CheckboxGroup).use(Card).use(Button).use(Stepper);
export default {
    data() {
        return {
            cartList:[],
            allPrice:0,
            check: false,
            isArr:[],
            activeIcon: 'https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg',
            inactiveIcon: 'https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg'
        }
    },
    mounted() {
        //显示底部导航
        this.$store.state.showNav = true;
        this.$store.state.showUser = false;
        //引入vuex
        this.cartList = this.$store.state.cartList;
        //初始化总价
        this.count();
    },
    methods: {
        clearAll(){
            Dialog.confirm({
                message: '确定要清空购物车吗？'
            }).then(() => {
                this.cartList=[];
                this.$store.commit("clearAll");
                this.count();
            }).catch(() => {
            // on cancel
            });
        },
        minus(item){
            if(item.num > 1){
                item.num--;
                this.count();
                Store.set("cartList",this.cartList)
            }else{
                Dialog.confirm({
                    message: '是否将' + item.Name + '移出购物车？'
                }).then(() => {
                    this.cartList.map((ite,index)=>{
                        if(item.Name === ite.Name){
                            this.cartList.splice(index,1);
                        }
                    })
                    this.count()
                    Store.set("cartList",this.cartList)
                }).catch(() => {
                // on cancel
                });
            }
        },
        add(item){
            item.num++;
            Store.set("cartList",this.cartList)
            this.count();
        },
        allCheck(){
            if(!this.check){
                this.check = !this.check;
                this.cartList.map((item)=>{
                    item.check = true;
                })
            }else{
                this.check = !this.check;
                this.cartList.map((item)=>{
                    item.check = false;
                })
            }
            
        },
        count(){
            this.allPrice = 0;
            this.isArr = [];
            this.cartList.map((item)=>{
                if(item.check){
                    this.allPrice += item.CurrentPrice * item.num;
                    this.isArr.push(item);
                }
            })
            if(this.isArr.length == this.cartList.length){
                this.check = true;
            }else{
                this.check = false;
            }
        },
        toShow(item){
            this.$router.push({path:"/show", query: { SupplyNo:item.SupplyNo, Name:item.Name, ID:item.ID, ImgUrl:item.ImgUrl}})
        }
    },
}
</script>
<style lang="scss" scoped>
    .rBg{
        min-height: 550px;
        background-color: rgb(247, 247, 247)
    }
    .wrap{
        margin-bottom: rem(101);
    }
    .goNo{
        font-size: rem(12);
        color: #333;
        line-height: 4.93vw;
        width: 8.06vw;
        text-align: center;
        margin-left: 6vw;
    }
    .isEmpty{
        height: rem(60);
        line-height: rem(60);
        text-align: center;
        background-color: white;
    }
    .btn{
        border:none;
        font-size: rem(25);
        width: rem(30);
        height: rem(20);
        line-height: rem(12);
        background-color: #fff;
        margin-left: rem(5);
        border-radius: 5px;
    }
    .mark{
        width: rem(80);
        height: rem(70);
        // background-color: aqua;
        position: absolute;
        top: -33px;
        left:30px;
    }
</style>
<style lang="scss">
    .van-card{
        background-color: white;
        border-bottom: rem(14) solid rgb(247, 247, 247);
        padding-left: 40px;
    }
    .van-button--danger {
        color: #fff;
        background-color: #02d4d7;
        border: 1px solid #02d4d7;
    }
    .van-checkbox__icon--round{
        width: 40px;
        margin-right: -20px;
    }
    .van-card__tag{
        position: absolute;
        top: 45px;
        left: -25px;
    }
</style>
