<template>
  <div v-bind:style="{height:height + 'px'}" class="page-amount">
    <mt-header title="TRANSFER">
           <router-link to="/" slot="left"><mt-button icon="BACK">BACK</mt-button></router-link>
           <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="transfer-container">
      <div>
          <img src="https://profile.csdnimg.cn/0/3/0/3_mr_javascript" alt="">
      </div>
      <div class="name">{{name}}</div>
      <div class="tel">170****0211</div>
    </div>
    <div>转账金额</div>
    <mt-field placeholder="$" v-model="money"></mt-field>
    <p style="margin-top:50px;" class="page-picker-desc">选择银行卡: {{ year }}</p>
    <div class="page-picker-wrapper">
      <mt-picker :slots="yearSlot" @change="onYearChange" :visible-item-count="3"></mt-picker>
    </div>
    
    <div class="transfer-container">
      <mt-button type="primary" size="normal" @click="submit">CONFIRM</mt-button>
    </div>
   
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { Header, Field, Button, Toast, Picker, MessageBox} from "mint-ui";
import api from "@/api";
import fetch from "@/utils/fetch.js";

Vue.component(Header.name, Header);
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Toast.name, Toast);
Vue.component(Picker.name, Picker);

export default {
  data() {
    return {
      labelPosition: "left",
      money: '',
      name: 'reciever',
       year: '1984',
        number: 0,
        yearSlot: [{
          flex: 1,
          values: ['HSBC', 'BANK OF CHINA', 'China Constuction Bank', 'CMBC', 'Standard Chartered Bank'],
          className: 'slot1'
        }],
    };
  },
  created() {},
  methods: {
    ...mapActions(["LOGIN"]),
    submit() {
        if(this.money == 0 ){
          alert("请填写money");
          return;
        }
        MessageBox.confirm('你确定要向'+this.name+'对方转账'+ this.money +'吗?').then(action => {
            fetch({
              url: "http://127.0.0.1:3000/user/buycoin",
              method: "post",
              headers: {
                token: localStorage.getItem("token")
              },
              data:{
                  address: 9, 
                  toAddress: this.$route.query.id, 
                  count: this.money,
              }
            }).then(res => {
              console.log(res);
              MessageBox.alert('Success!').then(action => {
                this.$router.push({ path: "/transfer"});
              });
            });
        });
        
      
      
     
    },
    onYearChange(picker, values) {
        this.year = values[0];
      },
  },
  watch: {
   
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
 
}
.page-amount{
  // padding:0 15px;
}
.transfer-container{
  text-align: center;
  margin-top:50px;
}
.mint-button--primary{
  background: @pink;
}
</style>