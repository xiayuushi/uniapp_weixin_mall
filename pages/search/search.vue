<template>
  <view>
    <searchbox v-model="value" @search="search" @cancel="cancel" />
    <view class="content">
      <view class="title">
        <text>历史搜索</text>
        <icon type="clear" size="20" @tap.stop="clear" v-if="searchList.length !== 0"/>
      </view>
      <view class="tag">
        <text v-for="(item, index) in searchList" :key="index" @tap.stop="clicktag(item)" >{{ item }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { KEY } from '@/utils/contants.js'
import searchbox from '@/components/searchbox/index.vue'

export default {
  components: { searchbox },
  data () {
    return {
      value: '',
      searchList: []
    }
  },
  onShow () {
    this.searchList = uni.getStorageSync(KEY) || []
    this.cancel()
  },
  methods: {
    cancel () {
      this.value = ''
    },

    search () {
      if (this.value.trim() === '') return
      if (this.searchList.includes(this.value.trim())) {
        this.value = ''
        return
      }
      this.searchList.push(this.value.trim())
      this.searchList = [...new Set(this.searchList)]

      if (this.searchList.length > 10) {
        this.searchList.shift()
      }
      uni.setStorageSync(KEY, this.searchList)
      uni.navigateTo({ url: `/pages/search_result/search_result?query=${this.value}` })
      this.cancel()
    },

    clear () {
      this.searchList = []
      uni.removeStorageSync(KEY)
    },

    clicktag (item) {
      this.value = item
      uni.navigateTo({ url: `/pages/search_result/search_result?query=${this.value}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 114rpx;
  bottom: 0;
  width: 750rpx;
  padding: 24rpx 20rpx;
  color: #666;
  box-sizing: border-box;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    text {
      font-weight: 600;
      letter-spacing: 4rpx;
    }
  }

  .tag {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40rpx;
    align-content: space-between;

    text {
      float: left;
      height: 60rpx;
      padding: 0 20rpx;
      margin-right: 28rpx;
      margin-bottom: 28rpx;
      line-height: 60rpx;
      border-radius: 4rpx;
      background-color: #ddd;
    }
  }
}
</style>
