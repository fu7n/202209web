<template>
    <div>
        <MyHead></MyHead>
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
                                <ol class="list-news" v-if="list.length>0">
                                    <li v-for="item in list" :key="item.id">
                                        <router-link :to="{name:'News',params:{id:item.id}}" :title="item.title">

                                            {{item.title}}</router-link>
                                        <span>{{item.date}}</span>
                                    </li>
                                </ol>

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
        <MyFooter></MyFooter>
    </div>
</template>

<script>
import Left from "@/components/common/Left"
import Position from '@/components/common/Position'
import { getList } from '@/api/site.js'

export default {
    components: {
        Left,
        Position
    },
    data() {
        return {
            id: this.$route.params.id,
            scode: this.$route.query.scode,
            list: [],
            page: this.$route.query.page,
            num: this.$route.query.num,
            result: '',
        }
    },
    created() {
        this.getList()
        console.log(this.$store.state.scode)

    },

    methods: {
        async getList() {
            const { data: res } = await getList(this.id, this.page, this.num)
            this.list = res.data
            this.result = res.rowtotal

        },
        //下一页
        nextPage() {
            if (this.page < Math.ceil(this.result / this.num)) {
                this.$nextTick(() => {
                    this.page++
                    console.log(this.page)
                    this.getList();
                })

            }
        },
        //上一页
        prePage() {
            if (this.page != 1) {
                this.page--
                console.log(this.page)
                this.getList()
            }
        }
    }

}
</script>

<style scoped>
.list-news li {
    text-align: left
}

.list-news li a:hover p {
    color: #009a52
}

.list-news h3 {
    margin: 10px 0;
    border-left: 2px solid red;
    padding-left: 10px;
}

.list-news p {
    font-size: 14px;
    line-height: 25px;
    color: #333;
}

.list-news .commontitle::after {
    content: '';
    width: 0%;
    background: red;
    height: 2px;
    position: absolute;
    transition: .5s all;
}

.list-news:hover .commontitle::after {
    content: '';
    width: 100%;
    background: red;
    height: 2px;
    position: absolute;
    transition: .5s all;
}

.pagebar a {
    cursor: pointer;
}
</style>