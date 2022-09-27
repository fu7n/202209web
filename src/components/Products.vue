<template>
    <div>
        <MyHead></MyHead>
        <!-- list -->
        <div class="list">
            <div class="container">
                <div class="row">
                    <Left></Left>
                    <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 no-padding-rt">
                        <div class="l-right">
                            <div class="l-right-l1">
                                <ul>
                                    {pboot:nav num=40 parent={sort:tcode}
                                    <a href='[nav:link]' class="l-right-l2">
                                        <li>[nav:name]</li>
                                    </a>
                                    {/pboot:nav}
                                </ul>
                            </div>
                            <div class="l-right-hd">
                                <Position></Position>
                            </div>
                            <div class="l-right-bd">
                                <div class="hd">
                                    <div class="row">
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <div class="nyl">
                                                <div id="preview" class="proimg">
                                                    <div id="vertical" class="bigImg">
                                                        <img :src="product.ico" alt="" id="midimg" />
                                                        <div style="display:none;" id="winSelector"></div>
                                                    </div>
                                                    <!--bigImg end-->
                                                    <div class="smallImg2">
                                                        <div class="scrollbutton smallImgUp disabled"></div>
                                                        <div id="imageMenu2">
                                                            <ul>
                                                                <li v-for="(list,index) in pics" :key="index">
                                                                    <img :src="list" alt="">
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="scrollbutton smallImgDown"></div>
                                                    </div>
                                                    <!--smallImg end-->
                                                    <div id="bigView" style="display:none;"><img width="800"
                                                            height="800" alt="" src="" /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-6 col-xs-12">
                                            <div class="rt">
                                                <h1>{{product.title}}</h1>
                                                <p>{{product.description}}</p>
                                                <a :href="'http://wpa.qq.com/msgrd?v=3;uin='+company.qq+';site=qq;menu=yes'"
                                                    target="_blank">立即咨询</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bd">
                                    <div class="title"> <span>详细描述</span> </div>
                                    <div class="content" v-html="product.content">
                                    </div>
                                    <div class="clear"></div>
                                    <ul id="prev_next">
                                        <li v-if="prvObj">上一篇：<router-link
                                                :to="'/products/'+prvObj.id+'?scode='+prvObj.scode">
                                                {{prvObj.title}}</router-link>
                                        </li>
                                        <li v-if="nextObj">下一篇：<router-link
                                                :to="'/products/'+nextObj.id+'?scode='+nextObj.scode">
                                                {{nextObj.title}}</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="pro">
                                <ul class="row">
                                    <div class="col-md-40 col-md-2 col-sm-1 commontitle">
                                        <h3>猜你喜欢</h3>
                                    </div>
                                    <div style="clear:both;height:10px"></div>
                                    <li v-for="list in productsList" :key="list.id" class="col-md col-sm-3 col-xs-12">
                                        <router-link
                                            :to="{name:'Products',params:{id:list.id},query:{scode:list.scode}}"
                                            :title="list.title">
                                            <img height="180" :src="list.ico" :alt="list.title">
                                            <p>{{list.title}}</p>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--footer  -->
        <MyFooter></MyFooter>
    </div>
</template>

<script>
function init() {
    var pro = document.querySelector(".pro")
    var protitle = document.querySelector(".pro .commontitle")
    pro.addEventListener("mouseenter", function () {
        protitle.classList.add("commontitle")
    })
    pro.addEventListener("mouseleave", function () {
        protitle.classList.remove("commontitle")
    })

}
import bus from '@/eventBus'
import Left from "@/components/common/Left"
import Position from '@/components/common/Position'
import { getContent, getPics, getList } from "@/api/site"
export default {
    components: {
        Left,
        Position
    },
    data() {
        return {
            company: [],
            id: this.$route.params.id,
            product: [],
            pics: '',
            productsList: [],
            allProList: [],
            nextObj: [],
            prvObj: []

        }
    },
    watch: {
        '$route'(to, from) { //监听路由是否变化
            // console.log(999)
            if (to.path == "/") { //跳转到哪个页面
                location.reload()
            }
        },
    },
    destroyed() {
        location.reload()
    },
    mounted() {
        init();
    },
    created() {
        this.getProduct();
        this.getCompany();
        this.getPics();
        this.getProductsList()
        this.getAllProList();

    },
    methods: {
        getCompany() {
            bus.$on("postCompany", (val) => {
                this.company = val
            })
        },
        async getProduct() {
            const { data: res } = await getContent(this.id);
            this.product = res.data;
        },
        async getPics() {
            const { data: res } = await getPics(this.id);
            this.pics = res.data;
        },
        async getProductsList() {
            const { data: res } = await getList(4, 1, 8);
            this.productsList = res.data;
        },
        async getAllProList() {
            const { data: res } = await getList(4, 1, 999999999999999999)
            this.allProList = res.data;
            this.$nextTick(() => {
                this.allProList.filter((res, index) => {
                    if (res.id == this.id) {
                        if (index > this.allProList.length - 1) {
                            this.nextObj = '';
                        } else {
                            index += 1
                            this.nextObj = this.allProList[index]
                        } if (index == 0) {
                            this.prvObj = ''
                        } else {
                            index -= 1
                            this.prvObj = this.allProList[index]
                        }
                    }
                })
            })
        },
    }
}
</script>

<style>
.pro li {
    text-align: left
}

.pro li a:hover p {
    color: #009a52
}

.pro h3 {
    margin: 10px 0;
    border-left: 2px solid red;
    padding-left: 10px;
}

.pro p {
    font-size: 14px;
    line-height: 25px;
    color: #333;
}

.pro .commontitle::after {
    content: '';
    width: 0%;
    background: red;
    height: 2px;
    position: absolute;
    transition: .5s all;
}

.pro:hover .commontitle::after {
    content: '';
    width: 100%;
    background: red;
    height: 2px;
    position: absolute;
    transition: .5s all;
}
</style>