<template>
    <div>
        <div class="col-lg-3 col-md-3 hidden-sm hidden-xs no-padding-lt">
            <div class="sidebar">
                <div class="s-hd">
                    <p v-if="position.length>0">{{position[0].name}}</p>
                </div>
                <div class="s-bd">
                    <ul>
                        <router-link v-for="item in navName" :key="item.id"
                            :to="item.scode+'?page=1&num=9&scode='+item.scode">
                            <li class="active">{{item.name}}</li>
                        </router-link>

                    </ul>
                </div>
                <div class="s-con">
                    <div class="hd"> <img src="/static/skin/images/s-con-hd.jpg" alt="s-hd"> </div>
                    <div class="bd">
                        <p>联系人：{{companyList.contact}} <br />
                            手机：{{companyList.mobile}}<br />
                            邮箱：{{companyList.email}}<br />
                            地址：{{companyList.address}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getCompany, getNavScode, getPosition } from '@/api/site'

export default {
    data() {
        return {
            id: this.$route.params.id,
            scode: this.$route.query.scode,
            companyList: [],
            navList: [],
            navName: [],
            position: [],
        }
    },
    created() {
        this.getCompany();
        this.getNavScode();
        this.getPosition()
        // this.getNavScode();
    },
    methods: {
        async getCompany() {
            const { data: res } = await getCompany()
            // console.log(res.data)
            this.companyList = res.data
        },
        async getNavScode() {
            const { data: res } = await getNavScode(this.scode)
            this.navName = res.data
        },
        async getPosition() {
            const { data: res } = await getPosition(this.scode)
            console.log(res.data)
            this.position = res.data

        },
    }
}
</script>

<style>

</style>