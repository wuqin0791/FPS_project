<template>
  <div v-bind:style="{height:height + 'px'}" class="page-notice1">
    <div class="blur page-mask"></div>
    <mt-header title="TRANSFER">
           <router-link to="/" slot="left"><mt-button icon="BACK">BACK</mt-button></router-link>
           <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-button type="primary" size="normal" @click="submit">Account Name</mt-button>
    <mt-field label="Amount" placeholder="$" v-model="account"></mt-field>
    <mt-button type="primary" size="normal" @click="submit">CONFIRM</mt-button>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { Header, Field, Button, Toast } from "mint-ui";
import api from "@/api";

Vue.component(Header.name, Header);
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
      console.log(this.$router)
      this.$router.push({ path: "/" });
    }
  },
  watch: {
    name: function(val) {
      (this.nameStatus = false) || val || (this.nameStatus = true);
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