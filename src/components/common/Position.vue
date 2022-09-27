<template>
    <div>
        <div class="bd" v-if="position.length>0">所在的位置：<router-link to="/">首页</router-link> > <router-link
                :to="position[0].scode+'?page=1&num=9&scode='+position[0].scode">
                {{position[0].name}}
            </router-link>
            ><router-link v-if="isTop && position.length>1"
                :to="position[1].scode+'?page=1&num=9&scode='+position[1].scode">{{position[1].name}}</router-link>
        </div>
    </div>
</template>

<script>
import { getPosition } from '@/api/site.js'
import { mapState, mapGetters } from 'vuex'
export default {
    data() {
        return {
            id: this.$route.params.id,
            scode: this.$route.query.scode,
            position: [],
            isTop: true,
        }
    },
    created() {
        this.getPosition()
    },
    methods: {
        async getPosition() {
            const { data: res } = await getPosition(this.scode)
            this.position = res.data
            if (res.data.length <= 1) {
                console.log("是的")
                this.isTop = false
            }
        },
    }
}
</script>

<style>

</style>