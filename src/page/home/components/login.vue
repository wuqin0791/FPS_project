<template>
  <div v-bind:style="{height:height + 'px'}" class="page-index">
    <div class="blur page-mask"></div>
    <img class="logo" src=http://chuantu.xyz/t6/703/1575364368x977013264.png />
    <div>
      <mt-field :state="nameStatus ? 'error' : ''" placeholder="Account" v-model="name"></mt-field>
    </div>
    <div style="margin-top: 50px;">
      <mt-field
        type="password"
        :state="passwordStatus ? 'error' : ''"
        placeholder="Password"
        v-model="password"
      ></mt-field>
    </div>

    <p class="mistake" v-show="nameStatus">Mistake in Account name or Password</p>
    <mt-button style="margin-top: 60px;" type="primary" size="large" @click="submit">LOG IN</mt-button>
    <mt-button type="primary" size="normal" @click="register">REGISTER</mt-button>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { Field, Button, Toast } from "mint-ui";
import api from "@/api";
import fetch from "@/utils/fetch.js";
import store from "@/store/home";

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Toast.name, Toast);

export default {
  data() {
    return {
      labelPosition: "left",
      name: "",
      password: "",
      nameStatus: "",
      height: "",
      uploader: ""
    };
  },
  created() {},
  computed: {
    ...mapGetters(["upToken"])
  },
  methods: {
    ...mapActions(["LOGIN"]),
    submit() {
      this.nameStatus = this.name ? false : true;
      this.passwordStatus = this.password ? false : true;
      // 下面是提交的请求
      this.LOGIN({
        tel: this.name,
        password: this.password
      }).then(res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.$router.push({ path: "/" });
      });
    },
    register() {
      this.$router.push({ path: "/register" });
    }
  },
  watch: {
    name: function(val) {
      (this.nameStatus = false) || val || (this.nameStatus = true);
    },
    password: function(val) {
      (this.wechatStatus = false) || val || (this.wechatStatus = true);
    }
  },
  async mounted() {
    this.height = window.innerHeight;
  }
};
</script>

<style lang="less">
@import "../../../common/css/var.less";
@import "../../../common/css/reset.less";

.page-index {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
  flex-direction: column;
  -webkit-flex-direction: column;
  .mint-field-core {
    text-align: center;
  }
  .page-mask {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: url("/static/img/bg.png") no-repeat 0 0;
    background-size: 100%;
    z-index: -1;
  }
  h2 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 28px;
    color: @brand-primary;
  }
  .title {
    color: rgb(243, 240, 240);
    text-shadow: 1px 1px 10px rgb(146, 142, 142);
    font-size: 24px;
    margin-bottom: 30px;
  }
  .logo {
    position: absolute;
    top: 33px;
    left: 30px;
    width: 80px;
  }
  .mint-field {
    border-radius: 50px;
    width: 210px;
    margin-top: -30px;
  }

  .mint-button {
    margin-top: 21px;
    width: 210px;
    height: 48px;
    background: rgb(226, 101, 86);
    border-radius: 50px;
  }
  .mistake {
    text-align: left;
    width: 205px;
    color: white;
  }
  input:-internal-autofill-selected {
    background-color: white !important;
  }
}
</style>
