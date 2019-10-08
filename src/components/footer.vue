
<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <div class="page-title">Tabbar</div>

      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <transition name="fade" mode="out-in">
          <router-view class="app-view"></router-view>
        </transition>
        <mt-tab-container-item id="订餐">

        </mt-tab-container-item>
  
        <mt-tab-container-item id="我的">
          <div class="page-part">
            <mt-cell v-for="n in 12" :title="'我的 ' + n" />
          </div>
          <router-link to="/">
            <mt-button type="danger" size="large">退出</mt-button>
          </router-link>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <!-- <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="转账">
      
        转账
      </mt-tab-item>
      <mt-tab-item id="我的">
      
        我的
      </mt-tab-item>
    </mt-tabbar> -->
  </div>
</template>

<script>
import Vue from "vue";
import {
  TabContainer,
  TabContainerItem,
  Button,
  Cell,
  Tabbar,
  TabItem
} from "mint-ui";

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

export default {
  name: "page-tabbar",
  data() {
    return {
      selected: "订餐",
    };
  }
};
</script>

<style>
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}

.page-wrap {
  overflow: auto;
  height: 100%;
  padding-bottom: 100px;
}
</style>
