<template>
<div id="app">
    <router-view class="app-view" :style="showTabbar ? {paddingBottom: '52px'} : ''"></router-view>
    <mt-tabbar v-if="showTabbar" v-model="selected" fixed>
        <mt-tab-item v-for="nav in navs" :id="nav.label" v-if="nav.adminRequired ? userinfo.type === 2 : true" @click.native="$router.push({name: nav.label})">
            {{nav.name}}
        </mt-tab-item>
    </mt-tabbar>
</div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

import {
  Button,
  Cell,
  Tabbar,
  TabItem,
  TabContainer,
  TabContainerItem
} from "mint-ui";

Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

export default {
  data() {
    return {
      navs: [
        {
          label: "seller",
          name: "转账"
        },
        {
          label: "user",
          name: "我的"
        },
        {
          label: "checkList",
          name: "今日订单",
          adminRequired: true
        },
        {
          label: "register",
          name: "注册",
          adminRequired: true
        }
      ],
      hidePage: ["course", "detail", "sellerAdd", "courseAdd"],
      selected: this.$route.name || "seller"
    };
  },
  computed: {
    ...mapGetters(["userinfo"]),
    showTabbar() {
      return  ["login","detail","course"].indexOf(this.$route.name) < 0 ;
    }
  },
  watch: {
    $route(to, from) {
      if (this.hidePage.indexOf(to.name) >= 0) {
        this.selected = "seller";
      } else {
        this.selected = to.name;
      }
    }
  }
};
</script>
<style lang="less">
@import "../../common/css/var.less";
#app {
  font-family: PingFang-SC-Medium, "Microsoft Yahei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .app-view {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;

    &::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
  }
  .mint-tab-item {
    padding: 20px 0;
  }
  .mint-tab-item-label {
      font-size: 16px;
      color: rgba(49, 48, 48, 0.781);
    }
  .is-selected {
   
    background:@pink;
    .mint-tab-item-label {
      //  width: 100px;
      color: white;
    }
  }
  .red {
    color: @pink;
  }
}
</style>
