<template>
    <div>
        <!-- header 手机端  不折叠，横排菜单-->
        <div class="header">
            <div class="h-top">
                <div class="container">
                    <p>{{label}}</p>
                </div>
            </div>
            <div class="h-mid">
                <div class="container">
                    <div class="row">
                        <div class="col-md-9 col-sm-12 col-xs-12 no-padding-lt"> <a :href="siteList.domain"><img
                                    :src="siteList.domain+siteList.logo" alt="logo" class="h-logo"></a> </div>
                        <div class=" col-md-offset-0 col-md-3 hidden-sm hidden-xs no-padding-rt">
                            <div class="h-tel">{{companyList.mobile}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="h-nav">
                <div class="container">
                    <ul class="row mrow">
                        <li>
                            <a href="/">网站首页</a>
                        </li>

                        <li v-for="item in navList" :key="item.id">
                            <!-- {{item}} -->
                            <router-link to="#" @click.native="goUrl(item)">{{item.name}}</router-link>
                            <!-- {lable:if('[nav:scode]'=='{sort:tcode}')}class="nobg" {/lable:if}
                              -->
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        <!-- banner -->
        <div class="banner">
            <div class="container-fluid">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item in slideList" :key="item.id">
                            <img :src="siteList.domain+item.pic" :alt="item.title">
                        </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                    <!-- Add Arrows -->
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
        </div>
        <!-- search -->
        <div class="m-search">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-7 col-sm-12 col-xs-12 m-search-left">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="m-keywords"> <span>热门搜索：</span>
                                    <a href="[nav:link]">产品中心</a>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="search">
                                    <form action="{lable:scaction}" @submit.prevent>
                                        <input name="keyword" type="text" id="input_search" class="search-text"
                                            placeholder="请输入关键词">
                                        <button type="submit" value="搜索" class="search-btn" id="btn_search">搜索</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-5 hidden-sm hidden-xs m-tel"> <span>{{companyList.mobile}}</span> </div>
                </div>
            </div>
        </div>
        <!-------结束----->
    </div>
</template>

<script>

// var signature = hex_md5(hex_md5(appid + appsecret + timestamp));    //构建signature
import { getLabel, getSite, getCompany, getNav, getSlide, getContent } from '@/api/site'
import bus from '@/eventBus.js'
export default {
    data() {
        return {
            label: [],
            siteList: '',
            companyList: '',
            navList: [],
            slideList: [],
            content: ''
        }
    },

    created() {
        // this.jiami = this.appid + this.api_secret + this.timestamp;
        this.getSite()
        this.getCompany()
        this.getNav()
        this.getSlide()
        this.getContent()
        this.getLabel()


    },
    mounted() {
        init();
    },
    methods: {
        goUrl(item) {
            console.log(item)
            if (item.mcode == 1) {
                if (item.scode == 17) {
                    this.$router.push({ name: 'Gbook', query: { scode: item.scode } })
                } else {
                    this.$router.push({ name: 'Single', params: { id: item.scode }, query: { scode: item.scode } })
                }
            } else if (item.name == "新闻中心") {
                this.$router.push({ name: 'NewsLists', params: { id: item.scode }, query: { page: 1, num: 9, scode: item.scode } })
            } else if (item.name == "产品中心") {
                this.$router.push({ name: 'ProductsLists', params: { id: item.scode }, query: { page: 1, num: 9, scode: item.scode } })
            } else if (item.mcode == 4) {
                this.$router.push({ name: 'ProductsLists', params: { id: item.scode }, query: { page: 1, num: 9, scode: item.scode } })
            } else if (item.mcode == 5) {
                this.$router.push({ name: 'ProductsLists', params: { id: item.scode }, query: { page: 1, num: 9, scode: item.scode } })
            }
        },
        async getLabel() {
            const { data: res } = await getLabel("top")
            this.label = res.data
        },
        async getSite() {
            //可进行解耦

            const { data: res } = await getSite()
            this.siteList = res.data
            //将数据共享给footer
            this.$emit("postSite", res.data)
            bus.$emit("postSite", res.data)

            // {
            // "appid": this.appid,
            // "signature": this.$md5(this.$md5(this.jiami)),
            // "timestamp": this.timestamp,
            // }
            // )
            //     request(
            //     {
            //         url: 'site',
            //         method: 'get',
            //         params: {
            //             "appid": this.appid,
            //             "signature": this.$md5(this.$md5(this.jiami)),
            //             "timestamp": this.timestamp,
            //         }
            //     }
            // )
            // .then(res => {
            //     this.siteList = res.data.data
            //     //将数据共享给footer
            //     bus.$emit("postSite", res.data.data)
            // }, error => {
            //     // console.log(error)
            // })



        },
        async getCompany() {
            const { data: res } = await getCompany()
            this.companyList = res.data
            //将数据共享给footer
            bus.$emit("postCompany", res.data)
        },
        async getNav() {
            const { data: res } = await getNav()
            this.navList = res.data
            //将数据共享给footer
            bus.$emit('postNav', res.data)
        },
        async getSlide() {
            const { data: res } = await getSlide("1", "5")
            this.slideList = res.data
        },
        async getContent() {
            const { data: res } = await getContent("1")
            this.content = res.data
        },
    }
}

function init() {
    $(document).ready(function () {

        var swiper = new Swiper('.banner .swiper-container', {
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    })
}
</script>

<style>

</style>