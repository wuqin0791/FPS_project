<!--
 * @Description: This is a python file
 * @Author: JeanneWu
 * @Date: 2019-12-02 22:07:52
 -->
<template>
  <div class="page-transfer">
    <mt-header title="FPS">
      <router-link to="/" slot="left">
        <mt-button icon="BACK">BACK</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="balance-container">
      <div class="title">My Balance</div>
      <div class="value">{{m(money)}}</div>
    </div>

    <mt-button style="margin-top:383px;" @click="logout" class="logout" size="large">logout</mt-button>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { Field, Button, Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import { Header } from "mint-ui";
import api from "@/api";

Vue.component(Header.name, Header);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);

//MessageBox.confirm(message, title);

export default {
  data() {
    return {
      money: ''
    };
  },
  computed: {
    ...mapGetters(["upToken"])
  },
  created() {
    console.log(localStorage.getItem('token'));
    this.FETCH_USER_INFO({
      token: localStorage.getItem('token')
    }).then(res => {
      this.money = res.balance;
    });
    
  },
  // computed: {
  //   ...mapGetters(["SET_UPTOKEN"])
  // },
  methods: {
   ...mapActions(["FETCH_USER_INFO"]),
    message() {
      MessageBox({
        title: "Notice",
        message: "确定用此银行账户进行转账",
        showCancelButton: true
      });
    },
    submit() {},
    m: function(val) {
      let i = "";
      let arr = val
        .toString()
        .split("")
        .reverse();
      arr.map((item, index) => {
        i = item + i;
        if ((index + 1) % 3 == 0 && index != arr.length - 1) {
          i = "," + i;
        }
      });
      return i;
    },
    logout(){
        this.$router.push({ path: "/login"});
    }
  },
  watch: {}
};
</script>
<style lang="less">
@import "../../../common/css/var.less";
@import "../../../common/css/reset.less";
.balance-container {
  background: @pink;
  color: white;
  padding: 15px;
  .title {
    font-size: 16px;
  }
  .value {
    margin-top: 30px;
    text-align: center;
    font-size: 44px;
  }
}
 .logout{
    background: @pink;
    color: white;
    bottom:0px;

  }
</style>
