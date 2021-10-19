<template>
  <view class="pay-container">
    <addressbox :userName="userName" :telNumber="userAddress.telNumber" :address="address" @chooseAddress="chooseAddress"/>
    <view class="product">
      <view class="item" v-for="item in checkCartSelected" :key="item.goods_id">
        <image class="left" :src="item.goods_small_logo"></image>
        <view class="right">
          <view class="title">{{ item.goods_name }}</view>
          <view class="row">
            <text class="red">￥ {{ item.goods_price }}</text>
            <text>{{ item.num }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="pay" @tap="createPayOrder">微信支付({{ totalPrice }})</view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex'
import mixinCart from '@/mixins/mixin_cart.js'
import addressbox from '@/components/addressbox'

export default {
  components: { addressbox },
  mixins: [mixinCart],
  computed: {
    checkCartSelected () {
      return this.completeCartInfo.filter(item => item.checked && item.num !== 0)
    }
  },
  methods: {
    ...mapMutations(['DELPAYCART']),
    async createPayOrder () {
      const goods = this.checkCartSelected.map(item => {
        return {
          goods_id: item.goods_id,
          goods_price: item.goods_price,
          goods_number: item.num
        }
      })
      const create_order_res = await this.$request({
        url: '/my/orders/create',
        method: 'post',
        addToken: true,
        data: {
          order_price: this.totalPrice,
          consignee_addr: this.address,
          goods
        }
      })

      this.DELPAYCART() // 移除购物车列表中参与结算的商品

      const { order_number } = create_order_res
      const { message } = await this.$request({
        url: '/my/orders/req_unifiedorder',
        method: 'post',
        addToken: true,
        data: { order_number }
      })
      let { timeStamp, nonceStr, signType, paySign } = message.pay
      uni.requestPayment({
        timeStamp,
        nonceStr,
        signType,
        paySign,
        package: message.pay.package,
        success: () => uni.navigateTo({ url: '/pages/pay_result/pay_result?status=success' }),
        fail: () => uni.navigateTo({ url: '/pages/pay_result/pay_result?status=fail' })
      })
    }
  }
}

// 1、生成支付订单后，应该从购物车列表中删除参与预支付的商品，购物车列表中的数据从vuex中来，因此需要定义mutations去删除购物车参与结算的商品 DELPAYCART
// 2、从后端接口拿到微信支付所需参数，调用uni.requestPayment()进行微信支付
// 3、支付成功或者支付失败都会跳转到支付结果页，但成功与失败的窗口显示不同，因此需要在路由跳转中自定义传参status去更改窗口文字 status=success表示支付成功 status=fail表示支付失败
// 4、package为系统关键字不能定义为变量或者常亮，因此无法使用对象结构写法
// 5、将需要多页面共享的方法、属性、数据等使用mixin混入抽取出来，以便复用
// 6、对于mixinx中需要单独改动的数据，可以单独掕出来再次处理！ 例如：此处checkCartSelected 就是对购物车数据再次进行处理，防止未选中的购物车商品也被添加到预支付页面

</script>

<style lang="scss" scoped>
.pay-container {
  width: 750rpx;
  height: 100vh;
  padding-top: 200rpx;
  box-sizing: border-box;
  font-size: 30rpx;
  background-color: #f4f4f4;

  .product {
    margin-top: 20rpx;
    background-color: #fff;

    .item {
      display: flex;
      padding: 20rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid #ccc;

      &:last-child {
        border-bottom: none;
      }
    }

    .left {
      width: 160rpx;
      height: 160rpx;
      margin-right: 20rpx;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
    }

    .title {
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
    }

    .row {
      display: flex;
      justify-content: space-between;
    }

    .red {
      color: #f08693;
    }
  }

  .pay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    color: #fff;
    background-color: #18aa18;
  }
}
</style>
