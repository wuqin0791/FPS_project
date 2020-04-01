<!--
 * @Description: This is a python file
 * @Author: JeanneWu
 * @Date: 2018-03-29 15:59:10
 -->
<template>
  <div class="page-register">
    <div class="title">注册</div>
    <mt-field label="name" placeholder="请输入name" v-model="name"></mt-field>
    <mt-field label="tel" placeholder="请输入tel" type="tel" v-model="phone"></mt-field>
    <mt-field label="email" placeholder="请输入email" type="email" v-model="email"></mt-field>
    <mt-field label="password" placeholder="请输入password" type="password" v-model="password"></mt-field>
    <mt-button @click="submit" size="large">提交</mt-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Field, Button, Toast, MessageBox } from "mint-ui";
import api from "@/api";
import fetch from "@/utils/fetch.js";

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);

export default {
  data() {
    return {
      name: "",
      nick_name: "",
      phone: "",
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      fetch({
        url: "http://127.0.0.1:3000/user/register",
        method: "post",
        data: {
          password: this.password,
          tel: this.phone,
          email: this.email
        }
      }).then(res => {
        console.log(res);
        MessageBox.alert("Success!").then(action => {
          this.$router.push({ path: "/login" });
        });
      });
     
    }
  }
};
</script>
<style lang="less">
@import "../../../common/css/var.less";
@import "../../../common/css/reset.less";

.page-register {
  .title {
    font-weight: 300;
    font-size: 24px;
    padding: 20px 0px;
    text-align: center;
  }
  .mint-cell:first-child,
  .mint-cell-wrapper {
    background-origin: border-box;
  }
  .mint-button {
    border-radius: 0px;
  }
}
</style>
