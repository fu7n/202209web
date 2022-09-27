<template>
    <div>
        <div class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-3 hidden-sm hidden-xs" style="width: 10%"> </div>
                    <div class="col-lg-2 col-md-3 col-sm-4 hidden-xs">
                        <div class="f-nav">
                            <p style="font-size: 22px;font-weight: bold;color: #fff;float: left;width: 100%;">快速导航</p>
                            <span></span>
                            <ul>
                                <a href="/static/" title="网站首页">网站首页</a>
                                <li v-for="item in navList" :key="item.id">
                                    <router-link to="#" @click.native="goUrl(item)">{{item.name}}</router-link>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-offset-1 col-lg-3 col-md-3 col-sm-4 col-xs-12 xxj ">
                        <div class="f-con">
                            <p
                                style="font-size: 22px;font-weight: bold;color: #fff;float: left;width: 100%; margin-top: 0px;">
                                联系我们</p>
                            <span></span>
                            <p>联系人：{{companyList.contact}} <br />
                                手机：{{companyList.mobile}}<br />
                                邮箱：{{companyList.email}}<br />
                                地址：{{companyList.address}}</p>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-4 col-xs-12 xxj1">
                        <div class="f-ewm">
                            <p>二维码</p>
                            <span></span>
                            <div class="clear"></div>
                            <img :src="siteList.domain+companyList.weixin" alt="ewm">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="f-bd"> {{siteList.copyright}} <a href="https://beian.miit.gov.cn/" target="_blank" rel="nofollow"
                style="color:#fff;">{{siteList.siteicp}}</a> <a href="https://www.xiaobihu.cc/" target="_blank"
                style="color:#fff;">博虎网络</a>
            {{siteList.statistical}}</div>
        <div class="down">
            {pboot:sort scode=18}
            <li> <a href="[sort:link]"><img src="/static/skin/images/addr-icon.png" alt="map"><br />
                    查看地图</a> </li>
            {/pboot:sort}
            <li> <a :href="'tel:' +companyList.companymobile"><img src="/static/skin/images/tel-icon.png"
                        :alt="companyList.companymobile"><br />
                    咨询热线</a> </li>
            <li> <a :href="'sms'+companyList.mobile"><img src="/static/skin/images/sms-icon.png" alt="message"><br />
                    短信咨询</a> </li>
            <li class="current tz-gallery"> <a class="lightbox" :href="companyList.weixin"><img
                        src="/static/skin/images/ewm-icon.png" alt="ewm"><br />
                    二维码</a> </li>
        </div>
        <div class="plugin-fixed-call smal-hide hidden-xs">
            <div class="fixedTop cd-top cd-is-visible" style="background: rgb(203, 203, 203);"><a href="#top">
                    <p>TOP</p>
                </a></div>
            <a :href="'http://wpa.qq.com/msgrd?v=3&uin='+companyList.qq+'&site=qq&menu=yes'" target="_blank">
                <div class="child fixedQQ" id="fixedQQ"><img src="/static/skin/images/qq.png">
                    <p>QQ客服</p>
                </div>
            </a> <a href="javascript:;" onclick="">
                <div class="child fixedCall"><img src="/static/skin/images/call.png">
                    <p>{{companyList.mobile}}</p>
                </div>
            </a>
            <div class="fixedCode"> <img src="/static/skin/images/code.png">
                <div class="fixedCodeInfo"> <img class="fixedQr" :src="siteList.domain+companyList.weixin"
                        style="width:120px;">
                </div>
            </div>
        </div>

    </div>
</template>

  <!-- built files will be auto injected -->
<script type="text/javascript">
import bus from '@/eventBus.js'
export default {
    data() {
        return {
            companyList: [],
            navList: [],
            siteList: [],
        }
    },
    created() {
        this.getCompany()
        this.getNav()
        this.getSite()
    },
    methods: {
        getNav() {
            //接收来自header的值
            bus.$on('postNav', (val) => {
                this.navList = val;
            })
        },
        getCompany() {
            //接收来自header的值
            bus.$on("postCompany", val => {
                this.companyList = val;
            })
        },
        getSite() {
            //接收来自header的值
            bus.$on("postSite", (val) => {
                this.siteList = val;
            })
        },
        goUrl(item) {
            console.log(item)
            if (item.mcode == 1) {
                if (item.scode == 17) {
                    this.$router.push({ name: 'Gbook', query: { scode: item.scode } })
                } else {
                    this.$router.push({ name: 'Single', params: { id: item.scode }, query: { scode: item.scode } })
                }
            } else if (item.mcode == 2) {
                this.$router.push({ name: 'NewsLists', params: { id: item.scode }, query: { page: 1, num: 9, scode: item.scode } })
            } else if (item.name == "产品中心") {
                this.$router.push({ name: 'ProductsLists', params: { id: item.scode }, query: { page: 1, num: 9, scode: item.scode } })
            } else if (item.mcode == 4) {
                this.$router.push({ name: 'ProductsLists', params: { id: item.scode }, query: { page: 1, num: 9, scode: item.scode } })
            } else if (item.mcode == 5) {
                this.$router.push({ name: 'ProductsLists', params: { id: item.scode }, query: { page: 1, num: 9, scode: item.scode } })
            }
        },
    },

}

</script>

<style>

</style>