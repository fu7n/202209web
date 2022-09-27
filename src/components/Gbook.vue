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
                                </ul>
                            </div>
                            <div class="l-right-hd">
                                <Position></Position>
                            </div>
                            <div class="l-right-bd">
                                <form id="form1" ref="forms" :model="forms" @submit.prevent="submit">
                                    <ul class="message row">
                                        <li class="col-md-6 col-sm-6 col-xs-12">
                                            <input class="mg-minoru" name="contacts" v-model="forms.contacts"
                                                type="text" id="name" placeholder="姓名">
                                        </li>
                                        <li class="col-md-6 col-sm-6 col-xs-12">
                                            <input class="mg-minoru" name="mobile" v-model="forms.mobile" type="text"
                                                id="tel" placeholder="电话">
                                        </li>
                                        <li class="col-md-6 col-sm-6 col-xs-12">
                                            <input class="mg-minoru" name="dizhi" v-model="forms.dizhi" type="text"
                                                id="add" placeholder="地址">
                                        </li>
                                        <li class="col-md-6 col-sm-6 col-xs-12">
                                            <input class="mg-minoru" name="email" v-model="forms.email" type="text"
                                                id="email" placeholder="邮箱">
                                        </li>
                                        <li class="col-md-12 col-sm-12 col-xs-12">
                                            <textarea class="mg-minoru" name="content" v-model="forms.content"
                                                id="content" cols="70" rows="6" placeholder="内容"></textarea>
                                        </li>
                                        <li class="col-md-6 col-sm-6 col-xs-12" style="text-align: center;">
                                            <input class="mg-minoru" ref="submit" id="submit" @click="postFrom"
                                                value="提  交">
                                        </li>
                                    </ul>
                                </form>
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
import qs from 'qs'
import { postAddMsg } from "@/api/site"
export default {
    components: {
        Left,
        Position
    },
    data() {
        return {
            forms: {
            }
        }
    },
    mounted() {
        init();
    },
    methods: {
        postFrom() {
            postAddMsg(this.forms, 2)
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        alert("您的信息已提交成功！")
                        this.$refs.submit.setAttribute("disabled", true)
                    }
                })
        }
    }
}

function init() {
    $(function () {
        $('#submit').click(function () {
            //alert(1)
            if ($('#name').val() == '') { alert('请输入您的姓名！'); $("#name").focus(); return false; }
            if ($("#tel").val() == "") { alert("请输入你的手机！"); $("#tel").focus(); return false; }
            if (!$("#tel").val().match(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/)) { alert("手机号码格式不正确！"); $("#tel").focus(); return false; }
            if ($("#content").val() == "") { alert("请输入内容！"); $("#content").focus(); return false; }

        })
    })
}
</script>

<style>
.message #submit {
    text-align: center;
}
</style>