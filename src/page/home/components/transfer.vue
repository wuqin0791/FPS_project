<template>
  <div class="page-transfer">
      <div class="title">注册</div>
          <mt-field label="姓名" placeholder="请输入姓名" v-model="name"></mt-field>
          <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
          <mt-button @click="submit" size="large">提交</mt-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Field, Button, Toast } from "mint-ui";
import api from "@/api";

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);

export default {
  data() {
    return {
      name: "",
      nick_name: "",
      phone: ""
    };
  },
  methods: {
    submit() {
      if (!this.name) return false;

      api.account
        .doRegister({
          name: this.name,
          nick_name: this.nick_name,
          phone: this.phone
        })
        .then(res => {
          Toast(res.data.msg);
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
