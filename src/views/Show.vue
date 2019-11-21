<template>
  <div>
    <div class="itemImg">
        <div class="more" @click="toPath">更多商品</div>
        <van-swipe :loop="false" @change="onChange">
            <van-swipe-item v-for="(item, index) in swipers" :key="index">
                <img :src="banners + item + '.jpg'" class="banners_img" @click="show=!show">
            </van-swipe-item>   
        </van-swipe>
        <van-image-preview v-model="show" :startPosition="startPosition" :images="images" @change="onChange"></van-image-preview>
        <h2>{{ infos.Name }}</h2>
    </div>
    <div class="itemInfo" v-if="isLoad">
        <li>
            <span>甜度</span> <img :src="`https://res.bestcake.com/m-images/ww/jz/tiandu_${infos.Sweet || infos.CakeType[0].Sweet}.png`">
        </li>
        <li>
            <span>口味</span> <p> {{ infos.CategoryName }}</p>
        </li>
        <li>
            <span>原材料</span> <p> {{ currentType.Resourse || infos.Resource || infos.Resourse}}</p>
        </li>
        <li>
            <span>适合人群</span> <p> {{ details.details_tips ||"所有人群" }} </p>
        </li>
        <li>
            <span>保鲜条件</span> <p>{{ infos.KeepFresh || "最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。" }}</p>
        </li>
    </div>
    <div class="goodsAdv">
        <img src="https://res.bestcake.com/m-images/ww/detail/evaluate-a.png"><span>商品评价</span>
    </div>
    <div class="goodsConfig">
        <div v-for="(item,index) in types" :key="index">
            <button @click="userSelect(index)" :class="{ liBackground:changeLeftBackground == index }">{{item.Size}}</button>
        </div>
        <div class="goodsConfig_b">
            <li v-if="styles.configsize">
                <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png?v=112">
                <span>{{styles.configsize || ""}}</span>
            </li>
            <li>
                <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png">
                <span>{{styles.configpeople || "至少2-4人分享"}}</span>
            </li>
            <li v-if="styles.configware">
                <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png">
                <span>{{styles.configware || ""}}</span>
            </li>
            <li>
                <img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png">
                <span>{{styles.configtips || "至少需要提前一天预定"}}</span>
            </li>
        </div>
    </div>
    <div class="goodsNum">
        <span>购买数量：</span> <van-stepper v-model="num" :disable-input="true" input-width="40px" button-size="16px" class="add"/>
    </div>
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
    <div class="goCart">
        <p> {{ currentType.CurrentPrice*num || 0 }}.00 </p>
        <div @click="addGo()">立即购买</div>
        <span  @click="add()">加入购物车</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem ,ImagePreview,Stepper,Dialog} from 'vant';
Vue.use(Swipe).use(SwipeItem).use(ImagePreview).use(Stepper);
export default {
    data() {
        return {
            params:{},
            //轮播
            swipers:[1,2,3,4],
            banners:"",
            //详情数据
            types:[],
            //名称，价格
            infos:{},
            isLoad:false,
            currentType:{},
            styles:{},
            details:{},
            //动态class
            bkgact:"",
            //商品数量
            num:0,
            //vant组件参数
            show: false,
            current:0,
            startPosition:0,
            images: [],
        }
    },
    mounted() {
        this.params = this.$route.query;
        this.params.city = this.$store.state.city;
        // console.log(this.params);
        this.pageInit();
        this.$store.state.showNav = false;
        this.$store.state.showUser = false;
    },
//      ID: "1457"
//      Name: "一见倾心"
//      SupplyNo: "NS-0083-1"
//      city: "上海"
    methods:{
        pageInit(){
            var currentPro;
            if(this.params.SupplyNo.indexOf("NS")!==-1){
                this.banners= this.setImgUrl("ns-detail");
                this.setPreview();
                currentPro=this.$apis.getDetailData1({Name:this.params.Name,m:"GetNSCakeByName"});
            }else if(this.params.SupplyNo.indexOf("KSK")!==-1){
                this.banners= this.setImgUrl("jd-detail");
                this.setPreview();
                currentPro=this.$apis.getDetailData2({City:this.params.city,ProName:this.params.Name,c:'Product',m:"GetCakeByName"});
            }else if(this.params.SupplyNo.indexOf("JZ")!==-1){
                this.banners= this.setImgUrl("jz-detail");
                this.setPreview();
                currentPro=this.$apis.getDetailData2({City:this.params.city,ProName:this.params.Name,c:'IndexCenter',m:"GetjzCakeInfo"});
            }else if(this.params.SupplyNo.indexOf("RP")!==-1){
                this.banners= this.setImgUrl("rp-detail");
                this.setPreview();
                currentPro=this.$apis.getDetailData1({Name:this.params.Name,m:"GetRuPCakeByName"});
            }
            currentPro.then((res)=>{
                var res=res.data.Tag;
                if (res.length) {
                    res.map(item => {
                        if (item.City == this.params.city) {
                            this.types.push(item);
                        }
                    });
                if (this.types.length === 0) {
                    this.types = res;
                }
                this.infos = this.types[0];
                } else {
                    this.types = res.infos.CakeType;
                    this.infos = res.infos;
                }
                this.isLoad = true;
                this.userSelect(0);
            })
        },
        onChange(index) {
            this.current = index;
            this.startPosition = this.current;
        },
        setPreview(item){
            this.swipers.map((item)=>{
                this.images.push(this.banners + item + ".jpg")
            });
        },
        setImgUrl(sup){
            return `https://res.bestcake.com/m-images/${sup}/${this.params.Name}/${this.params.Name}-`
        },
        userSelect(index){
            // console.log(this.types[index]);
            this.currentType = this.types[index];
            // console.log(this.currentType);
            this.changeLeftBackground = index;
            if(this.types[index].ProductConfig){
                this.styles = JSON.parse(this.types[index].ProductConfig).pc
            }
        },
        add(){
            var temp = {
                    ID: this.currentType.ID || this.currentType.Id,
                    Name: this.params.Name,
                    CurrentPrice: this.currentType.CurrentPrice,
                    Size: this.currentType.Size,
                    num: this.num,
                    ImgUrl: this.params.ImgUrl,
                    check:true
                }
            Dialog.confirm({
                message: '是否加入购物车？'
            }).then(() => {
                this.$store.commit("add",temp)
            }).catch(() => {
                // on cancel
            });
        },
        addGo(){
            var temp = {
                    SupplyNo:this.params.SupplyNo,
                    ID: this.currentType.ID || this.currentType.Id,
                    Name: this.params.Name,
                    CurrentPrice: this.currentType.CurrentPrice,
                    Size: this.currentType.Size,
                    num: this.num,
                    ImgUrl: this.params.ImgUrl,
                }
                this.$store.commit("add",temp)
                    Dialog.alert({
                        message: '加入购物车成功！'
                    }).then(() => {
                        this.$router.push({path:"/cart"})
                    });
        },
        toPath(){
            this.$router.push({path:"/list"});
        },
    }
}
</script>

<style lang="scss" scoped>
    .more{
        position: fixed;
        right: 0;
        top: rem(20);
        z-index: 10;
        width: rem(80);
        height: rem(33);
        line-height: rem(33);
        font-size: rem(16);
        text-align: center;
        border: 1px solid;
        border-radius: rem(3);
        background-color: rgba($color: #fff, $alpha: 0.5);
    }
    .banners_img{
        width: 100%;
    }
    .itemImg{
        padding-bottom: rem(50);
        h2{
            font-size: rem(18);
            font-weight: bold;
            color: #333;
            text-align: center;
            margin-top: rem(10);
        }
    }
    .itemInfo{
        height: rem(320);
        border-top: rem(15) solid #FAFAFA;
        border-bottom: rem(15) solid #FAFAFA;
        padding: rem(35) rem(15);
        li{
            height: rem(42);
            img{
                width: 25%;
            }
            span{
                float: left;
                width: rem(75);
                font-size: rem(13);
                color: #9A9A9A;
            }
            img{
                float: left;
            }
            p{
                float: left;
                width: rem(270);
                font-size: rem(13.8);
                line-height: rem(19);
                margin-top: rem(-3);
            }
        }
    }
    .goodsAdv{
        height: rem(50);
        padding-left: rem(16);
        padding-top: rem(17);
        img{
            float: left;
            width: 6%;
            margin-right: rem(10);
        }
        span{
            float: left;
            font-size: rem(13.5);
            line-height: rem(18)
        }
    }
    .goodsConfig{
        border-top: rem(15) solid #FAFAFA;
        border-bottom: rem(15) solid #FAFAFA;
        padding: rem(35) rem(15) rem(19);
        button{
            height: rem(27);
            line-height: rem(27);
            background-color: white;
            border: 1px solid #ddd;
            color: #333;
            padding: 0 rem(13);
            border-radius: 3px;
            margin-right: rem(10);
            float: left;
        }
        .liBackground {
            background: #02d3d6 !important;
            color: #fff !important;
            border: none !important;
        }
        .goodsConfig_b{
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            margin-top: rem(60);
            li{
                width: 48%;
                margin: rem(10) 0;
                img{
                    float: left;
                    width: 14%;
                    margin-right: rem(10);
                }
                span{
                    float: left;
                    font-size: rem(13);
                    line-height: rem(25);
                }
            }
        }
    }
    .goodsNum{
        padding: rem(20) rem(20) rem(35) rem(15);
        span{
            float: left;
            font-size: rem(13);
        }
        .add{
            float: right;
        }
    }
    .bottomInfo{
        padding-top: rem(45);
        padding-bottom: rem(63);
        background-color: #FAFAFA;
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
        .goCart{
            position: fixed;
            bottom: 0;
            background-color: white;
            height: rem(55);
            width: 100%;
            p{
                margin: rem(12) rem(13);
                float: left;
                color: #f2495e;
                font-size: rem(16);
                font-weight: bolder;
            }
            span{
                float: right;
                color: rgb(170, 170, 170);
                line-height:  rem(60);
                font-size: rem(16);
            }
            div{
                margin-left: rem(20);
                float: right;
                height: 100%;
                line-height: rem(60);   
                width: rem(116);
                text-align: center;
                background: #02d4d7;
                color: white;
                font-weight: bolder;
                font-size: rem(16);
            }
        }
</style>
<style lang="scss">
    .van-swipe__indicators{
        position: absolute;
        bottom: 12px;
        left: 90%;
    }
    .van-swipe__indicator{
        background-color: black;
        border-radius: 0;
    }
    .van-swipe__indicator--active{
        background: red;
        border-radius: 0;
    }
</style>