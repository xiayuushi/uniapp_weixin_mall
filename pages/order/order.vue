<template>
	<view class="order-container">
		<view class="tabbar-panel">
			<view class="tabbar-panel-item" :class="{ active: activeIndex === 1 }" @tap="toggleClass(1)"><text>全部</text></view>
			<view class="tabbar-panel-item" :class="{ active: activeIndex === 2 }" @tap="toggleClass(2)"><text>待付款</text></view>
			<view class="tabbar-panel-item" :class="{ active: activeIndex === 3 }" @tap="toggleClass(3)"><text>已付款</text></view>
			<view class="tabbar-panel-item" :class="{ active: activeIndex === 4 }" @tap="toggleClass(4)"><text>退款/退货</text></view>
		</view>
		<view class="scroll-area">
			<view class="order-panel" v-if="activeIndex === 1">
				<view class="order-panel-item" v-for="item in orderList" :key="item.order_id">
					<view class="top-area" v-for="item_c in item.goods" :key="item_c.goods_id">
						<image class="left" :src="item_c.goods_small_logo"></image>
						<view class="right">
							<view class="title">{{ item_c.goods_name }}</view>
							<view class="num-price">
								<view class="red">￥<text style="font-size: 40rpx;">{{ item_c.goods_price }}</text>.00</view>
								<view class="">x{{ item_c.goods_number }}</view>
							</view>
						</view>
					</view>
					<view class="mid-area row">
						<view class="gray fr">共{{ item.total_count }}件商品 总计:￥{{ item.total_price }} (含运费 0.00)</view>
					</view>
					<view class="bottom-area row">
						<text>订单号：{{ item.order_number }}</text>
						<button type="default">支付</button>
					</view>
				</view>
			</view>
			<view class="order-panel" v-if="activeIndex === 2">
				<view class="order-panel-item" v-for="item in orderList" :key="item.order_id">
					<view class="top-area" v-for="item_c in item.goods" :key="item_c.goods_id">
						<image class="left" :src="item_c.goods_small_logo"></image>
						<view class="right">
							<view class="title">{{ item_c.goods_name }}</view>
							<view class="num-price">
								<view class="red">￥<text style="font-size: 40rpx;">{{ item_c.goods_price }}</text>.00</view>
								<view class="">x{{ item_c.goods_number }}</view>
							</view>
						</view>
					</view>
					<view class="mid-area row">
						<view class="gray fr">共{{ item.total_count }}件商品 总计:￥{{ item.total_price }} (含运费 0.00)</view>
					</view>
					<view class="bottom-area row">
						<text>订单号：{{ item.order_number }}</text>
						<button type="default">支付</button>
					</view>
				</view>
			</view>
			<view class="order-panel" v-if="activeIndex === 3">
				<view class="order-panel-item" v-for="item in orderList" :key="item.order_id">
					<view class="top-area" v-for="item_c in item.goods" :key="item_c.goods_id">
						<image class="left" :src="item_c.goods_small_logo"></image>
						<view class="right">
							<view class="title">{{ item_c.goods_name }}</view>
							<view class="num-price">
								<view class="red">￥<text style="font-size: 40rpx;">{{ item_c.goods_price }}</text>.00</view>
								<view class="">x{{ item_c.goods_number }}</view>
							</view>
						</view>
					</view>
					<view class="mid-area row">
						<view class="gray fr">共{{ item.total_count }}件商品 总计:￥{{ item.total_price }} (含运费 0.00)</view>
					</view>
					<view class="bottom-area row">
						<text>订单号：{{ item.order_number }}</text>
						<button type="default">支付</button>
					</view>
				</view>
			</view>
			<view class="order-panel" v-if="activeIndex === 4">
				<view class="order-panel-item" v-for="item in 2" :key="item">
					<view class="top-area" v-for="item_c in 4" :key="item_c">
						<image class="left" src="http://via.placeholder.com/160x160.png"></image>
						<view class="right">
							<view class="title">退款/退货订单</view>
							<view class="num-price">
								<view class="red">￥<text style="font-size: 40rpx;">4099</text>.00</view>
								<view class="">x1</view>
							</view>
						</view>
					</view>
					<view class="mid-area row">
						<view class="gray fr">共1件商品 总计:￥4099 (含运费 0.00)</view>
					</view>
					<view class="bottom-area row">
						<text>订单号：XXXXXXXXXXXXXX</text>
						<button type="default">支付</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				activeIndex: 1,
				orderList: []
			}
		},
		onLoad () {
			this.getOrder(1)
		},
		methods: {
			toggleClass (index) {
				this.activeIndex = index
				this.getOrder(this.activeIndex)
			},
			async getOrder (type) {
				const { message } = await this.$request({ url: '/my/orders/all', addToken: true, data: { type } })
				this.orderList = message.orders
			}
		}
	}
	
	// 1、退款退货这一栏，没有对应的接口，因此并没有渲染
	
</script>

<style lang="scss" scoped>
	.order-container {
		position: relative;
		height: 100vh;
		background-color: #f4f4f4;

		.scroll-area {
			position: absolute;
			top: 130rpx;
			bottom: 0;
			width: 100%;
			height: 100vh;
			overflow-y: scroll;
		}

		.tabbar-panel {
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			width: 750rpx;
			height: 100rpx;
			font-weight: 500;
			box-sizing: border-box;
			background-color: #fff;

			.tabbar-panel-item {
				position: relative;
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				height: 100rpx;

				&.active {
					color: #f00;

					&::after {
						position: absolute;
						content: '';
						bottom: 0;
						width: 100%;
						height: 10rpx;
						transition: all .8s;
						background-color: #f00;
					}
				}
			}
		}

		.order-panel {
			.order-panel-item {
				padding: 0 30rpx;
				margin-bottom: 30rpx;
				box-sizing: border-box;
				background-color: #fff;
				display: flex;
				flex-direction: column;
			}

			.top-area {
				display: flex;
				padding: 30rpx 0;
				box-sizing: border-box;
				justify-content: space-between;

				.left {
					width: 200rpx;
					height: 200rpx;
					margin-right: 20rpx;
				}

				.right {
					display: flex;
					flex: 1;
					flex-direction: column;
					box-sizing: border-box;
					justify-content: space-between;
				}

				.title {
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.num-price {
					display: flex;
					box-sizing: border-box;
					justify-content: space-between;
				}
			}

			.mid-area {
				border-top: 2rpx solid #ccc;
				border-bottom: 2rpx solid #ccc;
			}

			.bottom-area {
				display: flex;
				align-items: center;
				justify-content: space-between;

				>button {
					width: 160rpx;
					height: 60rpx;
					margin: 0;
					color: #f00;
					font-size: 28rpx;
					line-height: 60rpx;
					border-radius: 8rpx;
					background-color: #fff;
				}
			}

			.red {
				color: #eb4450;
			}

			.gray {
				color: #999;
			}

			.row {
				height: 100rpx;
				font-size: 28rpx;
				line-height: 100rpx;
			}

			.fr {
				float: right;
			}
		}
	}
</style>
