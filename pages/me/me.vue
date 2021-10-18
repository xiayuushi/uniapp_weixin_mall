<template>
	<view class="me-container">
		<view class="user-panel">
			<view class="wrap-box">
				<view class="clearfix">
					<text class="item iconfont icon-shezhi"></text>
					<view class="item white">
						<image class="portrait" :src="userInfo.avatarUrl"></image>
					</view>
					<text class="item iconfont icon-xiaoxi"></text>
				</view>
				<view class="letter">
					<text v-if="userInfo && userInfo.nickName">{{ userInfo.nickName }}</text>
					<text v-else @tap="toLogin">请登录</text>
				</view>
			</view>
		</view>
		<view class="padding-horizontal">
			<view class="nav-panel">
				<view class="item">
					<text>0</text>
					<text>收藏的店铺</text>
				</view>
				<view class="item">
					<text>0</text>
					<text>收藏的商品</text>
				</view>
				<view class="item">
					<text>0</text>
					<text>关注的商品</text>
				</view>
				<view class="item">
					<text>0</text>
					<text>我的足迹</text>
				</view>
			</view>
			<view class="order-panel">
				<view class="title">我的订单</view>
				<view class="content">
					<view class="item">
						<text class="iconfont icon-daifukuandingdan"></text>
						<text>待付款</text>
					</view>
					<view class="item">
						<text class="iconfont icon-gerenzhongxindingdandaishouhuo"></text>
						<text>待收货</text>
					</view>
					<view class="item">
						<text class="iconfont icon-tuikuan"></text>
						<text>退款/退货</text>
					</view>
					<view class="item">
						<text class="iconfont icon-quanbudingdan-01"></text>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<view class="address-panel">
				<text>收货地址管理</text>
				<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="other-panel">
				<view class="item">
					<text>联系客服</text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
				<view class="item">
					<text>我的预约</text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
				<view class="item">
					<text>意见反馈</text>
					<text style="color: #ccc;">400-618-4000</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			toLogin () {
				uni.navigateTo({ url:'/pages/login/login' })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.me-container {
		position: relative;
		width: 750rpx;
		height: 100vh;
		font-size: 30rpx;
		font-weight: 600;
		color: #343434;
		background-color: #f4f4f4;
		overflow: hidden;

		.user-panel {
			width: 750rpx;
			height: 360rpx;
			color: #fff;
			background-color: #eb4450;

			.wrap-box {
				width: 360rpx;
				height: 250rpx;
				margin: 0 auto;
				text-align: center;
				box-sizing: border-box;

				.clearfix {
					&:after {
						content: "";
						display: block;
						height: 0;
						clear: both;
						visibility: hidden;
					}

					.item {
						float: left;
					}
				}

				.letter {
					display: flex;
					justify-content: center;
				}

				.iconfont {
					font-size: 40rpx;
					margin-top: 110rpx;
				}

				.white {
					position: relative;
					width: 140rpx;
					height: 140rpx;
					margin: 60rpx 60rpx 16rpx;
					border-radius: 50%;
					box-sizing: border-box;
					background-color: #fff;

					.portrait {
						position: absolute;
						top: 50%;
						left: 50%;
						width: 132rpx;
						height: 132rpx;
						border-radius: 50%;
						transform: translate(-50%, -50%);
					}
				}
			}
		}

		.padding-horizontal {
			position: absolute;
			top: 336rpx;
			bottom: 0;
			left: 10rpx;
			right: 10rpx;
			z-index: 999;
			height: 100vh;
			box-sizing: border-box;
			background-color: #f4f4f4;
			overflow: hidden;
			border-radius: 6rpx;
		}

		.nav-panel {
			display: flex;
			justify-content: space-around;
			height: 116rpx;
			font-size: 24rpx;
			color: #717171;
			background-color: #fff;
			border-radius: 6rpx;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex: 1;
			}
		}

		.order-panel {
			margin: 20rpx 0;
			box-sizing: border-box;
			background-color: #fff;

			.title {
				height: 86rpx;
				line-height: 86rpx;
				border-bottom: 2rpx solid #e7e7e7;
				padding-left: 30rpx;
				box-sizing: border-box;
			}

			.content {
				display: flex;
				justify-content: space-around;
				align-items: center;
				color: #717171;
				font-size: 28rpx;

				.item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					flex: 1;
					height: 166rpx;
					box-sizing: border-box;

					.iconfont {
						margin-bottom: 18rpx;
						font-size: 50rpx;
						color: #eb4450;
					}
				}
			}
		}

		.address-panel {
			display: flex;
			justify-content: space-between;
			height: 86rpx;
			line-height: 86rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 20rpx;

			.iconfont {
				color: #717171;
				font-size: 28rpx;
				font-weight: 400;
			}
		}

		.other-panel {
			padding: 0 30rpx;
			background-color: #fff;

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 86rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid #e7e7e7;

				.iconfont {
					color: #717171;
					font-size: 28rpx;
					font-weight: 400;
				}
			}
		}
	}
</style>
