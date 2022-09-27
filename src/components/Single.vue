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
                                    {pboot:nav num=40 parent=sort:tcode}
                                    <a href='[nav:link]' class="l-right-l2">
                                        <li>栏目名称</li>
                                    </a>
                                    {/pboot:nav}
                                </ul>
                            </div>
                            <div class="l-right-hd">
                                <Position></Position>
                            </div>
                        </div>
                        <div class="l-right-bd" v-html="data.content">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MyFooter></MyFooter>
    </div>
</template>

<script>
import { getAbout } from '@/api/site.js'
import Left from "@/components/common/Left"
import Position from '@/components/common/Position'
export default {
    components: {
        Left,
        Position
    },
    data() {
        return {
            data: '',
            id: this.$route.params.id,
        }
    },
    created() {
        this.$store.commit('changeScode', 5)
        this.$store.dispatch('updataScode', 9)
        console.log(this.$store.state.scode)
        this.getData()
    },
    methods: {
        async getData() {
            const { data: res } = await getAbout(this.id)
            this.data = res.data

        },
    }
}
</script>

<style>

</style>