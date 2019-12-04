<template>
  <div v-bind:style="{height:height + 'px'}" class="page-account">
    <mt-header title="TRANSFER">
      <router-link to="/" slot="left">
        <mt-button icon="BACK">BACK</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    
<mt-search
  v-model.trim="value"
  placeholder="请输入转账电话"
  @keyup.enter.native="search">
  <mt-cell
    v-for="item of userList"
    :key="item['id']"
    :title="item['tel']"
    @click.native="nextStep(item['id'])"/><!-- 点击事件 -->
</mt-search>

    <div class="testes">{{userList}}</div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { Header, Field, Button, Search } from "mint-ui";
import api from "@/api";
import fetch from "@/utils/fetch.js";

Vue.component(Header.name, Header);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Search.name, Search);
// <mt-search v-model="value">
//       <div>{{userList}}</div>
//       <mt-cell v-for="item in userList" :title="item.tel" :value="item.id"></mt-cell>
//     </mt-search>  v-on:click.native="nextStep"
export default {
  data() {
    return {
      labelPosition: "left",
      value: "",
      userList: [
       
      ]
    };
  },
  created() {
    fetch({
      url: "http://127.0.0.1:3000/user/all",
      method: "get",
      headers: {
        token: localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res);
      this.userList = res;
    });
  },
  computed: {
    filterResult() {
      return this.userList.filter(value =>
        new RegExp(this.value, "i").test(value)
      );
    }
  },
  methods: {
    nextStep(id){
      this.$router.push({ path: "/amount" ,query: {id: id}});
    }
  },
  watch: {},
  async mounted() {
    this.height = window.innerHeight;
  }
  // async asyncData({ store, route }) {
  //   console.log(localStorage.getItem("token"));
  //   this.userList = await store.dispatch(
  //     "FETCH_ALL_USER_INFO",
  //     localStorage.getItem("token")
  //   );
  //   console.log(this.userList);
  // }
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
.mint-search-list-warp{
    margin-top: 80px!important;
  }
</style>