<template>
  <view class="cart-container">
    <view class="full-panel" v-if="completeCartInfo && completeCartInfo.length !== 0">
      <view class="top-area" @tap="chooseAddress">
        <view class="content">
          <view class="item">
            <view class="name">收货人：{{ userName }}</view>
            <view class="phone">{{ userAddress.telNumber }}</view>
          </view>
          <view class="item">
            <text class="address-text">收货地址：{{ address }}</text>
          </view>
        </view>
        <view class="border"></view>
      </view>
      <view class="main-area">
        <view class="scrollbox">
          <view class="title">
            <view class="iconfont icon-shangpin"></view>
            <text>Mall生活馆</text>
          </view>
          <view class="content">
            <view class="item" v-for="(item, index) in completeCartInfo" :key="index">
              <view class="item-left" @tap="toggleChecked(item)">
                <text class="iconfont icon-gouxuan checked" v-if="item.checked"></text>
                <text class="iconfont icon-weigouxuan" v-else></text>
              </view>
              <view class="item-right">
                <image :src="item.goods_small_logo" mode="aspectFit" style="width: 100%;"></image>
                <view class="product-info">
                  <view class="sub-title">{{ item.goods_name }}</view>
                  <view class="row">
                    <view class="price">￥<text>{{ item.goods_price }}</text>.00</view>
                    <view class="count">
                      <uni-number-box v-model="item.num" @change="change(item)"></uni-number-box>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="bottom-area">
        <view class="checkbox">
          <view>
            <text class="iconfont icon-gouxuan checked" v-if="isAllChecked"></text>
            <text class="iconfont icon-weigouxuan" v-else></text>
          </view>
          <view>
            <text v-if="isAllChecked" @tap="notChecked">全选</text>
            <text v-else @tap="allChecked">全选</text>
          </view>
        </view>
        <view class="totalbox">
          <view class="row">
            <view class="total">
              <text>合计：</text>
              <text class="red">
                <text>￥</text>
                <text class="fsz30">{{ totalPrice }}</text>
                <text>.00</text>
              </text>
            </view>
          </view>
          <view class="row express">
            <text>包含运费</text>
          </view>
        </view>
        <view class="settlement" @tap="toPay">
          <text>结算({{ totalNum }})</text>
        </view>
      </view>
    </view>
    <view class="empty-panel" v-else>
      <view class="iconfont icon-ziyuan"></view>
      <view class="tips">你还没有添加任何商品</view>
    </view>
  </view>
</template>

<script>
import mixinCart from '@/mixins/mixin_cart.js'
import { mapState, mapMutations } from 'vuex'
import { CARTKEY, TOKENKEY } from '@/utils/contants.js'

export default {
  mixins: [mixinCart],
  watch: {
    completeCartInfo: {
      handler (currentVal, oldVal) {
        const _completeCartInfo = currentVal.map(item => {
          const { num, checked, goods_id } = item
          return { num, checked, goods_id }
        })
        this.SYNCCART(_completeCartInfo)
      },
      deep: true
    }
  },
  computed: {
    totalNum () {
      let num = 0
      this.completeCartInfo.forEach(item => {
        if (item.checked) num += item.num
      })
      return num
    },
    isAllChecked: {
      get () {
        return this.completeCartInfo.every(item => item.checked) // 购物车中每个商品勾选的状态，会影响下方按钮的全选、全不选
      },
      set (v) {
        this.completeCartInfo.map(item => (item.checked = v)) // 通过setter才能改写计算属性的值，形参就是外界对计算属性的赋值
      }
    }
  },
  onHide () {
    uni.setStorageSync(CARTKEY, this.$store.state.cartList)
  },
  methods: {
    ...mapMutations(['SYNCCART']),
    toggleChecked (item) {
      item.checked = !item.checked
    },
    change (item) {
      this.$nextTick(() => {
        if (item.num === 0) {
          // uni-ui的输入框有bug，必须在$nextTick()回调中才能准确判断输入框值为0的情况
          const index = this.completeCartInfo.findIndex(v => v.goods_id === item.goods_id)
          this.completeCartInfo[index].checked = false

          uni.showModal({
            title: '提示',
            content: '是否将该商品从购物车删除',
            success: res => {
              if (res.confirm) this.completeCartInfo.splice(index, 1)
            }
          })
        } else {
          const index = this.completeCartInfo.findIndex(v => v.goods_id === item.goods_id)
          this.completeCartInfo[index].checked = true
        }
      })
    },
    allChecked () {
      return this.completeCartInfo.map(v => (v.checked = true)) // 常规方法实现点击"全选"按钮后，勾选上方购物车列表的全部商品
    },
    notChecked () {
      return (this.isAllChecked = false) // 计算属性的setter实现点击 取消"全选"按钮后，上方购物车列表的全部商品取消勾选
    },
    toPay () {
      if (this.totalNum === 0) {
        return uni.showToast({ title: '请选择商品', icon: 'error' })
      }

      if (!this.userAddress.telNumber) {
        return uni.showToast({ title: '请选择收货地址', icon: 'error' })
      }

      if (!uni.getStorageSync(TOKENKEY)) {
        return uni.showModal({
          content: '当前并未登录，请先登录',
          showCancel: false,
          success: res => {
            if (res.confirm) return uni.navigateTo({ url: '/pages/login/login' })
          }
        })
      }

      uni.navigateTo({ url: '/pages/pay/pay' })
    }
  }
}

// 1、当前页面是tabbar页面，加入执行栈后会被缓存，页面不会被销毁，onLoad周期不会随页面切换而再次执行
// 2、如果在切换tabbar页面时需要更新数据，应该在onShow周期中执行数据更新
// 3、vuex只是存储了商品id、选中状态、数量，但是页面渲染所需要的数据还有商品图片、商品名称、商品价格
// 4、因此需要整合vuex的数据与购物车接口返回的商品数据，这两部分整合后的数据，才能完整用于页面渲染
// 5、计算属性的值不能直接赋值修改，必须通过setter改写，set方法的形参就是外界对计算属性的赋值
// 6、实际上只需要使用一个方法，通过对计算属性取反，即可实现下方按钮的全选与反选去影响购物车列表，此处便于说明使用v-if分成两个标签来做
// 7、watch侦听器，开启deep侦听复杂数据类型，当监听到购物车列表数据发生变更时同步vuex的购物车数据（商品id、商品数量、选中状态）
// 8、uni-ui的输入框插件 uni-number-box 有一个bug，必须将逻辑加入$nextTick()回调内执行，否则无论怎么在change事件中怎么做加减判断都无法准确获取值为0时的情况
</script>

<style lang="scss" scoped>
.cart-container {
  .full-panel {
    font-size: 28rpx;
    background-color: #f4f4f4;
    position: relative;
    padding-top: 220rpx;
  }

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

  .main-area {
    position: absolute;
    top: 220rpx;
    bottom: 150rpx;
    height: 100vh;
    padding-bottom: 48rpx;
    margin: 20rpx 0 50rpx 0;
    overflow-y: scroll;
    background-color: #fff;

    .scrollbox {
      overflow-y: scroll;
    }

    .title {
      display: flex;
      align-items: center;
      width: 750rpx;
      height: 88rpx;
      letter-spacing: 1rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid #ddd;

      .iconfont {
        font-size: 30rpx;
        margin: 0 12rpx 0 32rpx;
      }
    }

    .content {
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 750rpx;
        height: 206rpx;
        padding: 20rpx 30rpx;
        box-sizing: border-box;
      }

      .item-left {
        width: 50rpx;
        margin-right: 20rpx;
      }

      .item-right {
        display: flex;
        justify-content: space-between;
        border-bottom: 2rpx solid #ddd;

        image {
          width: 160rpx;
          height: 160rpx;
          margin: 20rpx;
        }
      }

      .iconfont {
        font-size: 30rpx;

        &.checked {
          color: #eb4450;
        }
      }

      .product-info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .sub-title {
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
        }

        .row {
          position: relative;
          display: flex;
          justify-content: space-between;
          height: 50rpx;
          margin-top: 40rpx;

          .price {
            color: #ee3f4d;

            > text {
              font-size: 30rpx;
            }
          }

          .count {
            position: relative;
            width: 200rpx;
            height: 100%;
          }

          // 改写ui组件库中输入框的尺寸：将px改为rpx
          ::v-deep .uni-numbox {
            position: absolute;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: row;
            height: 50rpx;
            line-height: 50rpx;
            width: 200rpx;
            box-sizing: border-box;
          }

          ::v-deep .uni-numbox__minus,
          ::v-deep .uni-numbox__plus,
          ::v-deep .uni-cursor-point,
          ::v-deep .uni-numbox__value {
            width: 100%;
            height: 100%;
            font-size: 30rpx;
          }

          ::v-deep .uni-numbox--text {
            font-size: 30rpx;
          }
        }
      }
    }
  }

  .bottom-area {
    display: flex;
    width: 750rpx;
    height: 100rpx;
    padding-left: 30rpx;
    box-sizing: border-box;
    justify-content: space-between;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;

    .checkbox {
      width: 220rpx;
      display: flex;
      align-items: center;
    }

    .iconfont {
      font-size: 30rpx;
      margin-right: 30rpx;

      &.checked {
        color: #eb4450;
      }
    }

    .totalbox {
      display: flex;
      flex-direction: column;
      flex: 6;

      .row {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .red {
        color: #eb4450;
      }

      .fsz30 {
        font-size: 30rpx;
      }

      .express {
        color: #ccc;
        font-size: 26rpx;
      }
    }

    .settlement {
      color: #fff;
      background-color: #ee3f4d;
      text-align: center;
      width: 220rpx;
      height: 100rpx;
      line-height: 100rpx;
    }
  }

  .empty-panel {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    color: #5c5c5c;
    background-color: #f4f4f4;

    .iconfont {
      font-size: 200rpx;
      color: #d5685c;
      margin: 93rpx 0 47rpx;
    }
  }
}
</style>
