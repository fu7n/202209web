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
                            <div class="l-right-bd" style="padding:20px 0">
                                <div class="pro">
                                    <ul class="row">
                                        <li v-for="item in list" :key="item.id" class="col-md-40 col-sm-4 col-xs-6">
                                            <router-link :to="'/products/'+item.id+'?scode='+item.scode"><img
                                                    :src="item.ico" :alt="item.title">
                                                <p
                                                    style="font-size: 16px;line-height: 40px;text-align: center; color: #333;">
                                                    {{item.title}}</p>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                                <div class="pagebar" v-if="list.length>0">
                                    <div class="pagination">
                                        <a class="page-item page-link st" @click.prevent="prePage" title="上一页">
                                            &lt;&lt; </a>
                                        共{{result}}条数据
                                        <!-- <a class="page-item page-link" href="javascript:;"
                                                                            title="当前页/总页数">{page:current}/{page:count}</a> -->
                                        <a class="page-item page-link st" @click.prevent="nextPage" title="下一页">>></a>
                                    </div>
                                </div>

                                <div class="tac text-secondary" v-else-if="list.length<0">本分类下无任何数据！</div>

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
import bus from '@/eventBus'
import Left from "@/components/common/Left"
import Position from '@/components/common/Position'
import { getContent, getPics, getList } from "@/api/site"
export default {
    components: {
        Position,
        Left
    },
    data() {
        return {
            id: this.$route.params.id,
            list: [],
            page: this.$route.query.page,
            num: this.$route.query.num,
            result: ''
        }
    },
    created() {
        this.getProductsList()
    },
    methods: {
        async getProductsList() {
            const { data: res } = await getList(this.id, this.page, this.num)
            this.list = res.data
            this.result = res.rowtotal
            this.$nextTick(() => {
                init();
            })
        },
        //下一页
        nextPage() {
            if (this.page < Math.ceil(this.result / this.num)) {
                this.$nextTick(() => {
                    this.page++
                    // this.$router.push({ params: { page: this.page, num: this.num } })
                    console.log(this.page)
                    this.getProductsList();
                })

            }
        },
        //上一页
        prePage() {
            if (this.page != 1) {
                this.page--
                console.log(this.page)
                this.getProductsList()
            }
        }
    },
}
function init() { //你的插件程序，该代码可以放在其他js文件上

    //元素高度自适应宽度
    $(function () {
        var ratio = 0.75;/*此处是宽高比例*/
        var liWidth = $('.pro ul li').width();/*括号中为父元素选择器*/
        var liHeight = liWidth * ratio;
        $('.pro li img').width(liWidth);
        $('.pro li img').height(liHeight);
    });
}
</script>

<style>

</style>