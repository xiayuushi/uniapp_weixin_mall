<template>
	<view class="pay-container">
		<addressbox :userName='userName' :telNumber='telNumber' :address='address' @chooseAddress="chooseAddress" />
		<view class="product">
			<view class="item" v-for="item in 4" :key="item">
				<image class="left" src="https://via.placeholder.com/160x160.png"></image>
				<view class="right">
					<view class="title">商品标题</view>
					<view class="row">
						<text class="red">￥ 6666.00</text>
						<text>1</text>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">微信支付({{ 6585 }})</view>
	</view>
</template>

<script>
		import { ADDRESSKEY } from '@/utils/contants.js'
		import addressbox from '@/components/addressbox'

		export default {
			components: { addressbox },
			data() {
				return {
					userName: '姓名',
					telNumber: '电话',
					address: '地址',
				}
			},
			methods: {
				chooseAddress () {
					uni.chooseAddress({
						success: res => {
							this.userAddress = res
							uni.setStorageSync(ADDRESSKEY, this.userAddress)
						}
					})
				}
			}
		}
	
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
