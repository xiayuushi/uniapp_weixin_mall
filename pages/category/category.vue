<template>
  <view class="container">
    <searchbar />
    <view class="layout">
      <view class="sidebar">
        <view class="sidebar-item" :class="{ active: activeIndex === index }" v-for="(item, index) in categoryData" :key="item.cat_id" @tap="activeIndex = index">{{ item.cat_name }}</view>
      </view>
      <view class="main">
        <image src="../../static/images/titleImage.png"></image>
        <view class="product" v-for="v in categoryData[activeIndex].children" :key="v.cat_id">
          <view class="title">/<text>{{ v.cat_name }}</text>/</view>
          <view class="product-list">
            <view class="product-item" v-for="v_item in v.children" :key="v_item.cat_id">
              <image :src="v_item.cat_icon"></image>
              <text>{{ v_item.cat_name }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import searchbar from '@/components/searchbar'

export default {
  components: { searchbar },
  data () {
    return {
      categoryData: [],
      activeIndex: 0
    }
  },
  onLoad () {
    this.getCategory()
  },
  methods: {
    async getCategory () {
      const { message } = await this.$request({ url: '/categories' })
      this.categoryData = message
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;

  .layout {
    position: absolute;
    top: 120rpx;
    bottom: 0;
    right: 16rpx;
    display: flex;
    width: 750rpx;
    box-sizing: border-box;

    .sidebar {
      width: 198rpx;
      height: 100%;
      margin-right: 16rpx;
      overflow-y: scroll;

      .sidebar-item {
        position: relative;
        width: 198rpx;
        height: 100rpx;
        border-top: 1rpx solid #eee;
        border-bottom: 1rpx solid #eee;
        line-height: 100rpx;
        text-align: center;
        letter-spacing: 2rpx;
        font-weight: 600;
        color: #333;
        background-color: #f4f4f4;

        &.active {
          color: #eb4450;
          background-color: #fff;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 20rpx;
            width: 8rpx;
            height: 60rpx;
            background-color: #eb4450;
          }
        }
      }
    }

    .main {
      flex: 1;
      overflow-y: scroll;

      > image {
        width: 520rpx;
        height: 180rpx;
        vertical-align: bottom;
      }

      .product {
        color: #eee;
        background-color: #fff;

        .title {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 110rpx;
          padding: 0 30rpx;
          font-weight: 600;

          > text {
            color: #333;
            padding: 0 30rpx;
          }
        }

        .product-list {
          display: flex;
          flex-wrap: wrap;

          .product-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 33.3333%;
            font-weight: 600;
            color: #333;
            margin-bottom: 60rpx;

            > image {
              width: 120rpx;
              height: 120rpx;
            }

            > text {
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
