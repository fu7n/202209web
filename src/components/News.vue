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
                                    <a href='[nav:link]' title="[nav:name]" class="l-right-l2">
                                        <li>[nav:name]</li>
                                    </a>
                                    {/pboot:nav}
                                </ul>
                            </div>
                            <div class="l-right-hd">
                                <Position></Position>
                            </div>
                            <div class="l-right-bd">
                                <div class="p-img">
                                    <h1 style="font-size: 27px; color: #5f5f5f; margin-bottom: 15px;">{{newData.title}}
                                    </h1>
                                    发布时间：{{newData.date}}　点击次数：{{newData.visits}}次<br />
                                    <div class="p-fgx"></div>
                                    <br />
                                </div>
                                <div class="p-content">
                                    <div class="nr" v-html="newData.content">
                                    </div>
                                    <ul id="prev_next">
                                        <li v-if="prvObj">上一篇：<router-link
                                                :to="'/news/'+this.comInd+'/'+prvObj.id+'?scode='+prvObj.scode">
                                                {{prvObj.title}}</router-link>
                                        </li>
                                        <li v-if="nextObj">下一篇：<router-link
                                                :to="'/news/'+this.comInd+'/'+nextObj.id+'?scode='+nextObj.scode">
                                                {{nextObj.title}}</router-link>
                                        </li>
                                    </ul>
                                </div>
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

import { getContent, getList } from "@/api/site"
export default {
    components: {
        Left,
        Position
    },
    data() {
        return {
            id: this.$route.params.id,
            newData: [],
            allNew: [],
            nextObj: [],
            prvObj: [],
            comInd: '',
        }
    },
    computed: {
        scode() {
            return this.newData.scode
        }
    },
    created() {
        this.getNew();
        this.getallNew();
    },
    methods: {
        async getNew() {
            const { data: res } = await getContent(this.id)
            // this.scode = res.data.scode
            this.newData = res.data
        },
        async getallNew() {
            const { data: res } = await getList(10, 1, 999999999999999999)
            console.log(res.data)
            this.allNew = res.data;
            this.$nextTick(() => {
                this.allNew.filter((res, index) => {
                    if (res.id == this.id) {
                        if (index > this.allNew.length - 1) {
                            this.nextObj = '';
                        } else {
                            index += 1
                            this.nextObj = this.allNew[index]
                            if (this.nextObj.scode == 11) {
                                this.comInd = 'com'
                            } else {
                                this.comInd = 'ind'
                            }
                            console.log(this.nextObj)
                        } if (index == 0) {
                            this.prvObj = ''
                        } else {
                            index -= 1
                            this.prvObj = this.allNew[index]
                            if (this.nextObj.scode == 11) {
                                this.comInd = 'com'
                            } else {
                                this.comInd = 'ind'
                            }
                            console.log(this.prvObj)
                        }
                    }
                })
            })
        },
    }
}
</script>

<style>

</style>