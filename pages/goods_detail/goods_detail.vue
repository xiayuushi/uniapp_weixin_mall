<template>
	<view class="goods-detail-container">
		<view class="scroll" v-if="goodsDetial && goodsDetial.goods_id">
			<view class="show-area">
				<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item class="swiper-item" v-for="(item, index) in goodsDetial.pics" :key="index">
						<image :src="item.pics_mid" @tap="previewImage(index)"></image>
					</swiper-item>
				</swiper>
				<view class="price">￥ {{ goodsDetial.goods_price }}.00</view>
				<view class="info">
					<text class="title">{{ goodsDetial.goods_name }}</text>
					<view class="icon-wrap" @tap="toggleStar">
						<text class="iconfont icon-jiaxingshoucang" v-if="!starIndex"></text>
						<text class="iconfont icon-jiaxingshoucangtianchong" v-else></text>
						<text>收藏</text>
					</view>
				</view>
				<view class="express">快递：免运费</view>
			</view>
			<view class="sales-area">
				<view class="item">
					<text>促销</text>
					<text class="red">满300减30元</text>
				</view>
				<view class="item">
					<text>已选</text>
					<text class="gray">黑色/S/1件</text>
				</view>
			</view>
			<view class="address-area">
				<text>送至</text>
				<view class="gray" @tap="selectedAddress">广东省 深圳市 宝安区</view>
			</view>
			<view class="detail-area">
				<view class="tabs">
					<view class="item" :class="{ active: toggleIndex === 0 }" @tap="toggleDetail(0)">
						<text>图文介绍</text>
					</view>
					<view class="item" :class="{ active: toggleIndex === 1 }" @tap="toggleDetail(1)">
						<text>规格参数</text>
					</view>
				</view>
				<view class="main">
					<!-- 图文介绍的内容 -->
					<view class="item" v-if="toggleIndex===0">
						<view v-html="goodsDetial.goods_introduce"></view>
					</view>
					<!-- 规格参数的内容 -->
					<view class="item pd10" v-else>
						<view class="table">
							<view class="tr" v-for="item in goodsDetial.attrs" :key="item.attr_id">
								<view class="td">{{ item.attr_name }}</view>
								<view class="td">{{ item.attr_value }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed">
			<view class="left-box">
				<view class="flex1 left-box-item">
					<text class="iconfont icon-kefu"></text>
					<text>联系客服</text>
				</view>
				<view class="flex1 left-box-item cartIcon" @tap="toCart">
					<text class="iconfont icon-gouwuche"></text>
					<text>购物车</text>
					<uni-badge class="badge" :text="badge" type="error" size="small" v-if="totalNum && totalNum !== 0"></uni-badge>
				</view>
			</view>
			<view class="right-box">
				<view class="flex1 right-box-item yellow" @tap="add2cart">加入购物车</view>
				<view class="flex1 right-box-item red">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixinCart from '@/mixins/mixin_cart.js'
	import { mapState, mapMutations } from 'vuex'
	import { CARTKEY } from '@/utils/contants.js'
	
	export default {
		mixins: [ mixinCart ],
		data () {
			return {
				goodsDetial: {},
				badge: 0,
				num: 0,
				starIndex: 0, // 0-未收藏 、1-已收藏
				toggleIndex: 0 // 0-图文介绍 、1-规格参数
			};
		},
		onLoad (options) {
			const { id } = options
			this.getGoodsDetail(id)
			this.badge = this.cartList.filter(item => item.checked).map(item => item.num).reduce((pre,cur) => pre + cur)
		},
		computed: {
			...mapState(['cartList']),
			totalNum: { 
				get (){
					let num = 0
					this.completeCartInfo.forEach(item => { 
						if(item.checked) num += item.num
					})
					return num
				},
				set (v) {
					return v
				}
			}
		},
		watch: {
			num:{
				handler(newValue, oldValue) {
					this.badge = newValue
				},
				immediate: true,
			}
		},
		methods: {
			...mapMutations(['ADD2CART']),
			toggleDetail (index) {
				this.toggleIndex = index // 图文介绍、规格参数的内容切换
			},
			toggleStar () {
				this.starIndex = !this.starIndex // 收藏、取消收藏
			},
			async getGoodsDetail (id) {
				const { message } = await this.$request({ url: `/goods/detail?goods_id=${id}` })
				this.goodsDetial = message
			},
			previewImage (index) {
				uni.previewImage({ urls: this.goodsDetial.pics.map(item => item.pics_big ), current: index })
			},
			toCart () {
				uni.switchTab({ url:'/pages/cart/cart' })
			},
			add2cart () {
				this.ADD2CART(this.goodsDetial.goods_id)
				uni.setStorageSync(CARTKEY, this.$store.state.cartList)
				uni.showToast({ title: '添加成功' })
				this.num = this.cartList.filter(item => item.checked).map(item => item.num).reduce((pre,cur) => pre + cur)
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-container {
		position: relative;

		.scroll {
			// 滚动区域
			position: absolute;
			top: 0;
			bottom: 0;
			width: 750rpx;
			height: 100vh;
			overflow-y: scroll;
			box-sizing: border-box;
			background-color: #f4f4f4;
		}

		.fixed {
			// 固定区域
			position: fixed;
			bottom: 0;
			left: 0;
			width: 750rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			background-color: #ee3f4d;

			.left-box {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 4;
				height: 100%;
				color: #999999;
				background-color: #fff;

				.left-box-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 24rpx;
				}
				
				.cartIcon {
					position: relative;
					.badge {
						position: absolute;
						top: 0;
						right: 22rpx;
						color: #f00;
					}
				}

				.iconfont {
					font-size: 48rpx;
					margin-bottom: 10rpx;
				}
			}

			.right-box {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 6;
				height: 100%;
				font-size: 32rpx;
				background-color: #ee3f4d;

				.right-box-item {
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.flex1 {
				flex: 1;
				height: 100%;
			}

			.yellow {
				color: #fff;
				background-color: #f4b73f;
			}

			.red {
				color: #fff;
				background-color: #eb4450;
			}
		}

		.show-area {
			// 滚动区域 模块1
			background-color: #fff;

			.swiper {
				width: 750rpx;
				height: 728rpx;

				.swiper-item {
					width: 100%;
					height: 100%;

					>image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.price {
				width: 750rpx;
				padding: 20rpx 20rpx 0 20rpx;
				font-size: 40rpx;
				font-weight: 600;
				color: #ee3f4d;
				box-sizing: border-box;
			}

			.info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 750rpx;
				height: 120rpx;
				padding: 20rpx;
				font-size: 28rpx;
				box-sizing: border-box;

				.title {
					flex: 1;
					height: 100%;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
				}

				.icon-wrap {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					position: relative;
					align-items: center;
					width: 96rpx;
					height: 100%;
					margin-left: 10rpx;
					font-size: 28rpx;
					box-sizing: border-box;
					
					.iconfont {
						font-size: 28rpx;
					}

					&::before {
						content: '';
						position: absolute;
						left: 0;
						top: 2rpx;
						width: 2rpx;
						height: 80rpx;
						background-color: #dddddd;
					}
				}
			}

			.express {
				width: 100%;
				font-size: 28rpx;
				color: #a4a4a4;
				padding: 20rpx;
				box-sizing: border-box;
			}
		}

		.sales-area {
			// 滚动区域 模块2
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 750rpx;
			height: 200rpx;
			margin: 20rpx 0;
			padding-left: 20rpx;
			background-color: #fff;
			box-sizing: border-box;

			.item {
				display: flex;
				align-items: center;
				flex: 1;
				font-size: 28rpx;
			}

			.red {
				margin-left: 46rpx;
				color: #ee3f4d;
			}

			.gray {
				margin-left: 46rpx;
				color: #a09fa2;
			}
		}

		.address-area {
			// 滚动区域 模块3
			display: flex;
			align-items: center;
			width: 750rpx;
			height: 100rpx;
			font-size: 28rpx;
			padding-left: 20rpx;
			background-color: #fff;
			box-sizing: border-box;

			.gray {
				margin-left: 46rpx;
				color: #a09fa2;
			}
		}

		.detail-area {
			// 滚动区域 模块4
			width: 750rpx;
			height: 100vh;
			margin-top: 20rpx;
			background-color: #fff;

			.tabs {
				display: flex;
				justify-content: center;

				.item {
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					width: 375rpx;
					height: 100rpx;
					font-size: 28rpx;
					box-sizing: border-box;
					background-color: #fff;

					&.active {
						&::after {
							content: '';
							position: absolute;
							bottom: 0;
							width: 100%;
							height: 8rpx;
							transition: all .2s;
							background-color: #ee3f4d;
						}

						>text {
							color: #ee3f4d;
						}
					}
				}
			}

			.main {
				width: 750rpx;

				.item {
					width: 100%;
				}

				.pd10 {
					padding: 10rpx;
					box-sizing: border-box;
				}

				.table {
					border: 1rpx solid #e2e2e2;
					border-collapse: collapse;

					.tr {
						display: flex;
						align-items: center;

						.td {
							flex: 1;
							height: 100rpx;
							text-align: center;
							line-height: 100rpx;
							font-size: 28rpx;
							border: 1rpx solid #e2e2e2;
						}
					}
				}
			}
		}
	}
</style>
