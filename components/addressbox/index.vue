<template>
  <view class="addressbox-container">
    <view class="top-area" @tap="$emit('chooseAddress')">
      <view class="content">
        <view class="item">
          <view class="name">收货人：{{ userName }}</view>
          <view class="phone">{{ telNumber }}</view>
        </view>
        <view class="item">
          <text class="address-text">收货地址：{{ address }}</text>
        </view>
      </view>
      <view class="border"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'addressbox',
  props: ['userName', 'telNumber', 'address']
}
</script>

<style lang="scss" scoped>
.top-area {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;

  .content {
    display: flex;
    flex-direction: column;
    width: 750rpx;
    height: 200rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
  }

  .border {
    width: 750rpx;
    height: 10rpx;
    background: url('~@/static/images/cart_border@2x.png');
    background-size: 100% 100%;
  }

  .item {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .name {
    width: 50%;
  }

  .phone {
    flex: 1;
  }
  .address-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
