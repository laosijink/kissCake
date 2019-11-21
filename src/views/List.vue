<template>
  <div class="wrap">
    <van-tabs v-model="active" title-active-color="#53c0c6" color="#53c0c6" line-width="50%" line-height="2px" lazy-render @click="selectData()">
        <van-tab title="自营">
            <van-tabs v-model="active2" title-active-color="black" color="#53c0c6" line-height="5px" lazy-render @click="selectGoods()">
                <van-tab :title="item.title" v-for="(item,index) in listData" :key="index">
                    <ul>
                        <li v-for="(ite,ind) in goodsData" :key="ind" class="list_detail">
                            <img :src="ite.ImgUrl" @click="toPath(ite)">
                            <h3> {{ ite.Name }}</h3>
                            <p> {{ ite.Means }} </p>
                            <span> ￥{{ ite.CurrentPrice }}.00 </span> <i> /{{ ite.LabelText }} </i>
                            <van-icon name="https://res.bestcake.com\m-images-2\list-cart.png" tag="b" @click="add(ite)"/>
                        </li>
                    </ul>
                </van-tab>
            </van-tabs>
        </van-tab>
        <van-tab title="贝式严选">
            <van-tabs v-model="active3" title-active-color="black" color="#53c0c6" line-height="5px">
                <van-tab :title="item.title" v-for="(item,index) in listData" :key="index">
                    <ul>
                        <li v-for="(ite,ind) in ysGoodsData" :key="ind" class="list_detail">
                            <img :src="ite.ImgUrl" @click="toPath(ite)">
                            <h3> {{ ite.Name }}</h3>
                            <p> {{ ite.Means }} </p>
                            <span> ￥{{ ite.CurrentPrice }}.00 </span> <i> /{{ ite.LabelText }} </i>
                            <van-icon name="https://res.bestcake.com\m-images-2\list-cart.png?v=1" tag="b" @click="add(ite)"/>
                        </li>
                    </ul>
                </van-tab>
            </van-tabs>
        </van-tab>
    </van-tabs>
    <div class="bottomInfo" v-if="isLoad">
        <div class="Info_t">
            <h2>划线价格</h2>
            <p> 商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。 </p>
        </div>
        <div class="Info_t">
            <h2>未划线价格</h2>
            <p>商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</p>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs,Icon,Toast } from 'vant';
Vue.use(Tab).use(Tabs).use(Icon).use(Toast);
export default {
    data(){
        return {
            goodsList: [
                {title: "女神", mark: "NS", list:[]},
                {title: "经典", mark: "KSK", list:[]},
                {title: "伴手礼", mark: "JZ", list:[]},

                {title: "乳品", mark: "RP", list:[]},
            ],
            listData:[],
            goodsData:[],
            ysGoodsData:[],
            isLoad:false,
            active: 0,
            active2: 0,
            active3: 1,
        }
    },
    mounted(){
        this.init();
        this.$store.state.showNav = true;
        this.$store.state.showUser = false;
    },
    methods:{
        //初始化
        init(){
            this._getListData( (res) => {
                // console.log(res.data.Tag.cakelist);
                var res = res.data.Tag.cakelist;
                this.goodsList.map((item)=>{
                    res.map(it =>{
                        if(it.SupplyNo.indexOf(item.mark) !== -1){
                            item.list.push(it);
                            it.ImgUrl = this.$global.setImgUrl(it)
                        }
                    })
                })
            }),
            this.selectData();
            this.selectGoods();
        },
        selectData(){
            if(this.active === 0){
                this.listData = this.goodsList.slice(0,3)
            }else if (this.active === 1){
                this.listData = this.goodsList.slice(3)
                this.ysGoodsData = this.listData[0].list
            }
        },
        selectGoods(){
            this.goodsData = [];
            if(this.active2 === 0){
                this.goodsData = this.listData[0].list;
            }else if(this.active2 === 1){
                this.goodsData = this.listData[1].list;
            }else if(this.active2 === 2){
                this.goodsData = this.listData[2].list;
            }
        },
        _getListData(callback){
            this.$apis.getListData().then((res)=>{
                callback(res);
                 this.isLoad = true;
            })
        },
        add(item){
            var temp = {
                SupplyNo: item.SupplyNo,
                ID: item.ID || item.Id,
                Name: item.Name,
                CurrentPrice: item.CurrentPrice,
                Size: item.Size,
                ImgUrl: item.ImgUrl,
                check:true
            }
            // console.log(temp);
            this.$store.commit("add",temp);
            Toast({
                message: item.Name + '加入购物车成功！',
                duration: 1500
            });
        },
        toPath(ite){
            // console.log(ite);
            this.$router.push({path:"/show", query: { SupplyNo:ite.SupplyNo, Name:ite.Name, ID:ite.ID, ImgUrl:ite.ImgUrl}})
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrap{
        margin-bottom: rem(80);
        ul{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            li{
                width: 44%;
                margin:rem(10);
                margin-bottom: rem(35);
                img{
                    width: 100%;
                    height: 83%;
                }
                h3{
                    font-size: rem(14);
                    margin: rem(-18) 0 rem(5) rem(5);
                }
                p{
                    font-size: 12px;
                    color: #999;
                    width: rem(150);
                    overflow: hidden;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                    margin-left: rem(5);
                }
                span{
                    display: inline-block;
                    margin-top: rem(10);
                    color: #ff3318;
                    font-size: rem(15);
                    font-weight: 100;
                }
                i{
                    color: #bcbcbc;
                    font-size: 12px;
                }
                b{  
                    float:right;
                    font-size: rem(19);
                    color: #2eb6be;
                    margin-top: rem(5);
                }
            }
        }
        .bottomInfo{
            .Info_t{
                display: flex;
                justify-content: space-around;
                margin-bottom: rem(20);
            }
            h2{
                float: left;
                color: #181818;
                font-size: rem(14);
                margin-top: rem(4);
            }
            p{
                float: left;
                width: 65vw;
                color: #a2a2a2;
                line-height: rem(22);
                font-size: rem(14);
            }
            p:first-of-type{
                margin-left: rem(5)
            }
        }
    }
</style>
