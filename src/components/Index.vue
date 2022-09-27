<template>
    <div>

        <Head @postSite="getSite"></Head>
        <!-- m-pro -->
        <div class="m-pro">
            <div class="container">
                <div class="m-pro-hd"> <img src="/static/skin/images/m-pro-hd.jpg" alt="m-pro-hd"> </div>
                <div class="m-pro-md">
                    <ul v-show="productNav">

                        <li class="col-md-2 col-sm-4 col-xs-6" v-for="nav in productNav" :key="nav.id">
                            <router-link :to="'/productslists/'+nav.scode+'?page=1&num=9&scode='+nav.scode"
                                :title="nav.name">
                                {{nav.name}}
                            </router-link>
                        </li>

                        <li class="col-md-2 col-sm-4 col-xs-6">
                            <router-link to="/productslists" title="查看更多">查看更多</router-link>
                        </li>
                    </ul>
                </div>
                <div class="m-pro-bd" ref="mprobd">
                    <div class="row">
                        <li ref="mprobdli" class="mprobdli col-md-3 col-sm-4 col-xs-6" v-for="item in productsList"
                            :key="item.id+item.scode">
                            <router-link :to="'/products/'+item.id">
                                <img ref="mprobdimg" v-if="item.ico" :src="item.ico" :alt="item.title">
                                <p style="color: #000; padding-top:8px"> {{item.title}} </p>
                            </router-link>
                        </li>
                    </div>
                </div>
            </div>
        </div>
        <!-- 公司简介 -->
        <div class="m-com">
            <div class="container">
                <div class="row" v-if="about">
                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="m-com-left"> <img :src="site+about.ico" :alt="about.title"> </div>
                    </div>
                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="m-com-left">
                            <p style="font-size: 30px;text-align: center;margin-top: 0px;margin-bottom: 8px;">
                                {{about.title}}
                            </p>
                            <!-- <p style="margin-top: 3px;margin-bottom: 3px;" v-text="about.content.substring(1,30)">
                            </p> -->
                            <div class="btn">
                                <div class="row">
                                    <div class="col-md-40 col-sm-4 col-xs-12" v-for="nav in aboutNav" :key="nav.id">
                                        <router-link :to="'single/'+nav.id" :title="nav.name" :class="'btn'+nav.i">
                                            {{nav.name}}
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- m-case -->

        <div class="m-case">
            <div class="container">
                <div class="m-case-hd">
                    公司案例
                    <!--<img src="{pboot:sitedomain}/skin/images/m-case-hd.png" alt="case"> -->
                </div>
                <div class="m-case-bd">
                    <div class="row" v-show="productsList">
                        <li class="col-md-4 col-sm-4 col-xs-6" v-for="item in productsList" :key="item.id">
                            <div class="content"> <img :src="item.ico" :alt="item.title">
                                <p class="dedeyuan"> {{item.title}} </p>
                                <p> 　　{{item.description.substring(1,24)}}</p>
                                <router-link :to="'/products/'+item.id" :title="item.title+'-查看详情'">查看详情>></router-link>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
        </div>

        <!-- m-com -->
        <div class="m-com">
            <div class="container">
                <div class="row" v-if="gongsiSort">
                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="m-news">
                            <div class="m-news-hd"> <span>{{gongsiSort.name}}</span>
                                <router-link
                                    :to="{name:'Com',params:{id:gongsiSort.scode},query:{page:1,num:10,scode:gongsiSort.scode}}"
                                    :title="gongsiSort.name">
                                </router-link>
                            </div>
                            <ul class="m-news-bd">
                                <div class="bd">
                                    <router-link v-for="item in companyList" :key="item.id" :to="'/news/com/'+item.id"
                                        :title="item.title">
                                        <li><span></span>
                                            <p> {{item.title}} </p>
                                            <i>{{item.date}}</i>
                                        </li>
                                    </router-link>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12 col-xs-12">
                        <div class="m-news">
                            <div class="m-news-hd"> <span>{{industrySort.name}}</span>
                                <router-link :title="industrySort.name"
                                    :to="{name:'Ind',params:{id:industrySort.scode},query:{page:1,num:10,scode:industrySort.scode}}">
                                </router-link>
                            </div>
                            <ul class="m-news-bd">
                                <div class="bd">
                                    <router-link v-for="item in industryList" :key="item.id" :to="'/news/ind/'+item.id"
                                        :title="item.title">
                                        <li><span></span>
                                            <p> {{item.title}} </p>

                                            <i>{{item.date}}</i>
                                        </li>
                                    </router-link>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="hidden-xs" style='margin: 50px auto 30px; padding-left: 300px; background-color: #fff;'>
            <b>友情链接:</b>
            <a v-for="item in linkList" :key="item.id" :href="item.link" target="_blank">{{item.name}}
            </a>

        </div>
        <!--footer  -->
        <Footer></Footer>

    </div>
</template>

<script>

import Head from '@/components/common/Head'
import Footer from '@/components/common/Footer'
import { getAbout, getLink, getSort, getList, getNavScode } from "@/api/site"
export default {
    name: "Index",
    components: {
        Head,
        Footer
    },
    data() {
        return {
            linkList: [],
            gongsiSort: '',
            companyList: [],
            industrySort: '',
            industryList: [],
            productsList: [],
            productNav: [],
            aboutNav: [],
            about: '',
            site: []
        }
    },
    created() {
        this.getLink();
        this.getSort();
        this.getCompanyList();
        this.getIndustrySort();
        this.getIndustryList();
        this.getProductsList();
        this.getNavScode();
        this.getAbout();
        this.getNavAbout();

    },
    mounted() {
        init();

    },
    methods: {
        getSite(val) {
            this.site = val.domain
        },
        async getLink() {
            const { data: res } = await getLink(1, 10)
            this.linkList = res.data
        },
        async getSort() {
            const { data: res } = await getSort(11)
            this.gongsiSort = res.data
        },
        async getCompanyList() {
            const { data: res } = await getList(11, 1, 6)
            this.companyList = res.data
        },
        async getIndustrySort() {
            const { data: res } = await getSort(12)
            this.industrySort = res.data
        },
        async getIndustryList() {
            const { data: res } = await getList(12, 1, 6)
            this.industryList = res.data
        },
        async getProductsList() {
            const { data: res } = await getList(4, 1, 8)
            this.productsList = res.data
            this.$nextTick(() => {
                init();
            })
        },

        async getNavScode() {
            const { data: res } = await getNavScode(4)
            this.productNav = res.data.slice(0, 5)
        },
        async getNavAbout() {
            const { data: res } = await getNavScode(1)
            this.aboutNav = res.data
        },
        async getAbout() {
            const { data: res } = await getAbout(2)
            this.about = res.data
        },


    }

}
function init() { //你的插件程序，该代码可以放在其他js文件上

    //元素高度自适应宽度
    $(document).ready(function () {
        var ratio = 0.75;/*此处是宽高比例*/
        var liWidth = $('.m-pro-bd li').width();/*括号中为父元素选择器*/
        // console.log(liWith)
        var liHeight = liWidth * ratio;
        $('.m-pro-bd li img').width(liWidth);
        $('.m-pro-bd li img').height(liHeight);
    });
    //元素高度自适应宽度
    $(document).ready(function () {
        var ratio = 0.52;/*此处是宽高比例*/
        var liWidth = $('.m-case-bd li').width();/*括号中为父元素选择器*/
        var liHeight = liWidth * ratio;
        $('.m-case-bd li img').width(liWidth);
        $('.m-case-bd li img').height(liHeight);
    })

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