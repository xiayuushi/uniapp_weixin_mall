<template>
	<view class="search-result-container">
		<searchbox class="searchbox" v-model="value" @search="search" @cancel="cancel" />
		<view class="result">
			<view class="query">
				<view class="item" :class="{ active: activeIndex === 0 }" @tap="tapClick(0)">综合</view>
				<view class="item" :class="{ active: activeIndex === 1 }" @tap="tapClick(1)">销量</view>
				<view class="item" :class="{ active: activeIndex === 2 }" @tap="tapClick(2)">
					<text>价格</text>
					<view class="arrow">
						<text class="arrow-item up-arrow" :class="{ selected: !arrowUp }"></text>
						<text class="arrow-item down-arrow" :class="{ selected: arrowUp }"></text>
					</view>
				</view>
			</view>
			<view class="list" v-if="goods && goods.length !== 0">
				<view class="item" v-for="item in mockSort" :key="item.goods_id">
					<image :src="item.goods_small_logo"></image>
					<view class="detail">
						<text class="title">{{ item.goods_name }}</text>
						<view class="price">￥<text>{{ item.goods_price }}</text>.00</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { KEY } from '../../utils/contants.js'
	import searchbox from '../../components/searchbox/index.vue'

	export default {
		components: { searchbox },
		data () {
			return {
				value: '',
				goods: [],
				pagenum: 1,
				pagesize: 10,
				activeIndex: 0,
				arrowUp: false,
				isRequest: false,
				onReachBottomStatus: false
			}
		},
		onLoad (options) {
			const { query } = options
			this.value = query
			this.getSearchResult()
		},
		onReachBottom () {
			// 触发触底加载，标记当前触底加载的状态，页码累加
			this.onReachBottomStatus = true
			this.pagenum = Number(this.pagenum) + 1
			this.getSearchResult()
		},
		computed: {
			mockSort () {
				switch (this.activeIndex) {
					case 0: // 综合排序
						return this.goods
					case 1: // 销量排序
						const _goods = [...this.goods] 
						return _goods.sort((a, b) => a.goods_id - b.goods_id)
					case 2: // 价格排序
						const _temp = [...this.goods]
						if (this.arrowUp) {
							return _temp.sort((a, b) => a.goods_price - b.goods_price)
						} else {
							// Array.sort()排序后会改写源数组，因此复制源数组进行操作
							return _temp.sort((a, b) => b.goods_price - a.goods_price)
						}

				}
			}
		},
		methods: {
			cancel() {
				uni.navigateBack()
			},
			
			search() {
				// 手动搜索商品，必须重置触底加载状态、重置页码
				this.onReachBottomStatus = false
				this.pagenum = 1
				this.getSearchResult()
				
				// 更新缓存
				if (this.value.trim() === '') return
				let searchHistory = uni.getStorageSync(KEY)
				
				searchHistory.push(this.value)
				searchHistory = [...new Set(searchHistory)]
				
				if (searchHistory.length > 10) {
					searchHistory.shift()
				}
				uni.setStorageSync(KEY, searchHistory)
			},

			async getSearchResult() {
				if (this.isRequest) return
				this.isRequest = true
				uni.showLoading({ title: '加载中...', mask: true })	
						
				try {
					const { message } = await this.$request({
						url: '/goods/search',
						data: {
							query: this.value,
							pagenum: this.pagenum,
							pagesize: this.pagesize
						}
					})
					// 触底加载是数据拼接，否则是直接赋值
					this.onReachBottomStatus ? this.goods = [...this.goods, ...message.goods] : this.goods = message.goods				
					
					this.pagenum = message.pagenum
					this.total = message.total
				} catch (err) {
					console.log(err)
				}
				
				this.isRequest = false
				uni.hideLoading()
			},

			tapClick(activeIndex) {
				if (activeIndex === 2 && this.activeIndex === activeIndex) this.arrowUp = !this.arrowUp
				this.activeIndex = activeIndex
			}
		}

	}
</script>

<style lang="scss" scoped>
	.search-result-container {
		padding-top: 214rpx;

		.searchbox {
			position: fixed;
			top: 0;
			width: 750rpx;

		}

		.result {
			// height: 100vh; 
			// 使用接口数据渲染后，此处不要设置 height: 100vh; 否则下拉触底事件会有"失灵卡顿"的效果
			overflow-y: scroll;

			.query {
				position: fixed;
				top: 114rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 750rpx;
				height: 100rpx;
				box-sizing: border-box;
				border-top: 2px solid #f6f6f6;
				background-color: #fff;

				.item {
					display: flex;
					justify-content: center;
					align-items: center;
					flex: 1;
					height: 100rpx;
					font-weight: 500;
					letter-spacing: 2rpx;
				}

				.active {
					color: #ee3f4d;
				}

				.arrow {
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: 20rpx;
					height: 100rpx;
					margin-left: 10rpx;
					box-sizing: border-box;
				}

				.arrow-item {
					width: 0;
					height: 0;
					border-left: 10rpx solid transparent;
					border-right: 10rpx solid transparent;
				}

				.up-arrow {
					border-bottom: 10rpx solid #ccc;
					margin-bottom: 10rpx;

					&.selected {
						border-bottom-color: #666;
					}
				}

				.down-arrow {
					border-top: 10rpx solid #ccc;

					&.selected {
						border-top: 10rpx solid #666;
					}
				}

			}

			.list {
				.item {
					display: flex;
					align-items: center;
					width: 750rpx;
					height: 260rpx;
					padding: 26rpx 18rpx;
					border-top: 2px solid #f6f6f6;
					box-sizing: border-box;
				}

				image {
					width: 200rpx;
					height: 200rpx;
					margin-right: 18rpx;
				}

				.detail {
					display: flex;
					flex: 1;
					height: 200rpx;
					flex-direction: column;
					justify-content: space-between;

					.title {
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
					}

					.price {
						color: #ee3f4d;

						>text {
							font-size: 40rpx;
						}
					}
				}
			}
		}
	}
</style>
