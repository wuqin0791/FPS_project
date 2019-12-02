<template>
  <div v-bind:style="{height:height + 'px'}" class="page-index">
    <div class="blur page-mask"></div>
    <mt-field :state="nameStatus ? 'error' : ''" placeholder="请输入您的真实姓名123" v-model="name"></mt-field>
    <p class="mistake" v-show="nameStatus">请输入您的真实姓名</p>
    <mt-button type="primary" size="large" @click="submit">登录</mt-button>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { Field, Button, Toast } from "mint-ui";
import api from "@/api";

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Toast.name, Toast);

export default {
  data() {
    return {
      labelPosition: "left",
      name: "",
      wechat: "",
      nameStatus: "",
      height: "",
      uploader: ""
    };
  },
  created() {},
  methods: {
    ...mapActions(["LOGIN"]),
    submit() {
      // alert(11);
      // this.nameStatus = this.name ? false : true;
      // // this.wechatStatus = this.wechat ? false : true;
      // let totalStatus = this.nameStatus;
      console.log(this.$router)
      this.$router.push({ path: "/" });
      // 下面是提交的请求
      // this.LOGIN({ 
      //   name: this.name,
      //   nick_name: this.wechat
      // })
      //   .then(res => {
      //     console.log(res);
      //     let code = +res.data.code;
      //     if (!totalStatus && code === 2000) {
      //       // if (true) {
      //       let userInfo = res.data.data;
      //       this.$router.push({ path: "/index" });
      //     } else {
      //       Toast(res.data.msg);
      //     }
      //   })
      //   .catch(res => {});
    }
  },
  watch: {
    name: function(val) {
      (this.nameStatus = false) || val || (this.nameStatus = true);
    }
    // wechat: function(val) {
    //   (this.wechatStatus = false) || val || (this.wechatStatus = true);
    // }
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
    top: 10px;
  }
  .mint-field {
    border-radius: 50px;
    width: 210px;
    margin-top: -30px;
  }
  .mint-button {
    margin-top: 40px;
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
}
</style>
