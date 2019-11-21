<template>
  <div class="home">
    <div class="wrap">
        <p class="top_info">Kiss Cake 私人烘焙</p>
        <swiper :config="{id:'banner',conf:{ pagination: '.swiper-pagination', autoplay : 3000, }}" class="banner_wrap" v-if="SwiperBannerList.length !== 0">
        <div class="swiper-slide" v-for="(item,index) in SwiperBannerList" :key="index">
            <img :src="item.ImgUrl" class="banner_img">
        </div>
    </swiper>
    </div>
    <div class="wrap">
        <img src="https://res.bestcake.com/images/newIndex/title.png?v=1" class="info_img">
        <a href="http://m.bestcake.com/act/item-2019-fc?back=1">
            <img :src="AbsoluteBannerList" style="width:100%">
        </a>
        <ul class="toplist_wrap">
            <li v-for="(item,index) in TopIconList" :key="index" @click="$router.push('/list')">
                <img :src="item.ImgUrl">
                <span> {{ item.ActName }}</span>
            </li>
        </ul>
    </div>
    <div class="notice_wrap">
        <p>通知</p>
        <van-notice-bar text="官方申明：我司近期发现有客户通过非正常渠道售卖的代金卡无法正常使用，目前我司正通过法律途径解决此问题。我司在此郑重申明，从未授权过任何渠道售卖我司代金卡，请客户通过正常渠道（如：官网、公司销售）进行购买消费。​" left-icon="volume-o" id="noticeList" color="#53c0c6" background="#fff"/>
    </div>
    <div class="center_wrap">
        <div v-for="(item,index) in CenterContentList" :key="index" @click="$router.push('/list')">
            <img :src="item.ImgUrl">
    </div>
    </div>
    <div class="sale_wrap">
      <div v-for="(item,index) in SaleList" :key="index">
        <img class="title_img" :src="item.TabImgUrl" @click="$router.push('/list')" />
            <swiper :config="{id:'banner'+index,conf:{  slidesPerView: 2.2,spaceBetween:1}}">

            <div class="swiper-slide" v-for="(value,idx) in item.CakeList" :key="idx">
                <div class="list_detail" @click="toPath(value)">
                    <img class="banner_img" :src="value.ImgUrl" />
                    <p> {{value.Name}} </p>
                    <div class="detail_bottom">
                        <span> ￥{{ value.Price }} </span> <i> /{{ value.Size }} </i>
                    </div>
                </div>
            </div>

        </swiper>
      </div>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue';
import { NoticeBar } from 'vant';
Vue.use(NoticeBar);

export default {
    data(){
        return {
            SwiperBannerList: [],
            AbsoluteBannerList:'',
            TopIconList: [],
            NoticeList: "",
            CenterContentList: [],
            SaleList: [],
        }
    },
    mounted(){
        this.$apis.getIndexData().then((res)=>{
            var res = res.data.Tag.mainresult;
            //banner数据
            this.SwiperBannerList = res.SwiperBannerList;
            //1.1元活动数据
            this.AbsoluteBannerList = res.AbsoluteBannerList[0].ImgUrl
            //商品分类数据
            this.TopIconList = res.TopIconList;
            //通知栏消息
            this.NoticeList = res.NoticeList;
            //中部广告
            this.CenterContentList = res.CenterContentList;
            //sale列表
            var SaleList = res.SaleList;
            SaleList.map(item => {
                item.CakeList = JSON.parse(item.CakeList);
                item.CakeList.map(item => {
                    item.ImgUrl=this.$global.setImgUrl(item);
                });
             });
            this.SaleList = SaleList;
        })
        this.$store.state.showNav = true;
        this.$store.state.showUser = false;
    },
    methods: {
        toPath(value){
            // console.log(ite);
            this.$router.push({path:"/show", query: { SupplyNo:value.SupplyNo, Name:value.Name, ID:value.ID, ImgUrl:value.ImgUrl}})
        }
    },
}
</script>
<style lang="scss" scoped>
    img{
        width: 100%;
    }
    .top_info{
        line-height: rem(50)
    }
    .wrap{
        padding: 0 rem(16)
    }
    .banner_wrap{
        width: 100%;
        height: rem(180);
        border-radius: rem(10);
    }
    .banner_img{
        width: 100%;
        height: 100%;
    }
    .toplist_wrap{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 100%;
        li{
            width: 15%;
            margin: rem(12) rem(17);
            text-align: center;
            span{
                white-space: nowrap;
                display: inline-block;
                margin-top: rem(12);
            }
        }
    }
    .notice_wrap{
        position: relative;
        width: 100%;
        border-top:rem(8) solid #FAFAFA;
        border-bottom:rem(8) solid #FAFAFA;
        padding: 0 rem(16);
        p{
            width: rem(34);
            line-height: rem(16);
            font-size: rem(12);
            text-align: center;
            background: #1fb1b8;
            border-radius: 5px;
            color: white;
            position:absolute;
            top: rem(11.5);
            left: rem(15);
            z-index:1;
        }
        #noticeList{
            border-radius: 5px;
        }
    }
    .center_wrap{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 100%;
        border-bottom:rem(8) solid #FAFAFA;
        padding: rem(10) rem(16);
        div{
            width: 47%;
            margin: rem(5) rem(5);
            text-align: center;
            border-radius: 10px;
            overflow: hidden;
        }
    }
    .sale_wrap{
        margin-bottom: rem(40);
        background-color: #FAFAFA;
        .list_detail{
            background-color: white;
            width: rem(155);
            height: rem(220);
            margin: rem(15) 0 rem(30) rem(15);
            padding: rem(10) rem(12) rem(20);
            box-shadow: 0px 2px 6px rgba(0,0,0,0.1);
            border-radius: 8px;
            img{
                width: 94%;
                height: 64%;
            }
            &>p{
                font-weight: bold;
                height: rem(30);
                margin: rem(7) rem(8);
                overflow: hidden;
            }
            .detail_bottom{
                float: left;
                width: rem(115);
                margin: rem(10) rem(6) 0;
                overflow: hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
                span{
                    color: #cc2864;
                    font-size: rem(16);
                }
                i{
                    color: #999;
                    font-size: rem(14);
                }
            }
        }
    }
</style>
<style lang="scss">
.swiper-pagination-bullet {
    background: #fff;
    opacity: .5;
}
.swiper-pagination-bullet-active {
    background: #fff;
    opacity: 1;
}
</style>
