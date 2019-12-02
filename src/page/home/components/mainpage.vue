<template>
  <div class="page-mainpage">
      <mt-header title="FPS">
         <router-link to="/" slot="left"><mt-button icon="BACK">BACK</mt-button></router-link>
         <mt-button icon="more" slot="right"></mt-button>
       </mt-header>
          <mt-field :state="nameStatus ? 'error' : ''" placeholder="My Balance" v-model="name"></mt-field>
          <mt-field :state="nameStatus ? 'error' : ''" placeholder="￥￥￥￥" v-model="name"></mt-field>
          <mt-button @click="submit" size="large">Transfer</mt-button>
          <mt-button @click="submit" size="large">Bill Payment</mt-button>


  </div>
</template>

<script>
import Vue from "vue";
import { Field, Button, Toast } from "mint-ui";
import { Header } from 'mint-ui';
import api from "@/api";

Vue.component(Header.name, Header);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);

export default {
  data() {
    return {
      name: "",
      wechat: "",
      nameStatus: "",
      height: "",
      uploader: "",
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
    border-radius: 50px;
    margin-top: 40px;
    width: 210px;
    height: 48px;
    background: rgb(226, 101, 86);
   
  }
}
</style>
