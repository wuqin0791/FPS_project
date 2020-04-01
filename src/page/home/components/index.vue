<template>
<div class="page-seller">
    <transition-group name="list">
        <router-link :key="1" :to="{path: 'course'}" tag="div">
            <section>
              
            </section>
        </router-link>
    </transition-group>
</div>
</template>

<script>
import { Button } from "mint-ui";
import Vue from "vue";
import api from "@/api";
import * as config from "config";
import { mapGetters, mapActions } from "vuex";

Vue.component(Button.name, Button);

export default {
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style lang="less">
@import "../../../common/css/var.less";
@import "../../../common/css/reset.less";

@list-height: 80px;

.page-seller {
  background: @page-bg;
  padding-bottom: 1px;
  .seller-add {
    position: fixed;
    right: 10px;
    bottom: 100px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    color: white;
    z-index: 2;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
  }

  section {
    background: white;
    margin-bottom: 15px;
    .top-container {
      position: relative;
      padding: 10px 10px 10px @list-height+20px;
      border-bottom: 1px solid @line-color;
      .top {
        height: @list-height;
        .seller-img {
          left: 10px;
          top: 10px;
          position: absolute;
          width: @list-height;
          height: @list-height;
          object-fit: cover;
          border-radius: 5px;
        }
        .desc {
          color: #727070ab;
          .seller-name {
            font-size: 18px;
            color: rgba(49, 48, 48, 0.781);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            width: 100%;
          }
          .seller-desc {
            margin-top: 15px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            width: 100%;
            height: 20px;
          }
        }
      }
    }
    .bottom {
      padding: 10px;
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
      button {
        font-size: 14px;
        padding: 7px 20px;
        border: 1px solid @light-pink;
        background: white;
        border-radius: 5px;
        color: @pink;
        margin-left: 10px;
      }
    }
  }
}
</style>
