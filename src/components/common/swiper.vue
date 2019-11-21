<template>
    <div class="swiper-container" :id="config.id">
        <div class="swiper-wrapper">
            <!-- <div class="swiper-slide">Slide 1</div> -->
            <slot></slot>
        </div>
        <div class="swiper-pagination" v-if="config.conf.pagination"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
    props:["config"],
    mounted() {
        this.$nextTick(()=>{
            new Swiper("#"+ this.config.id,this.config.conf)
        })
    },
}
</script>
<style lang="scss" scoped>

</style>