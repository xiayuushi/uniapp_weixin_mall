<template>
	<view class="top">
		<icon type="search" size="20" />
		<input type="text" placeholder="请输入你想要的商品"
			:value="value"
			@input="$emit('input',$event.detail.value)"
			@confirm="confirm" />
		<button type="default" plain v-if="value.trim().length !== 0" @tap="$emit('cancel')">取消</button>
	</view>
</template>

<script>
	export default {
		props: ['value'],
		methods: {
			confirm (e) {
				this.$emit('search', e.detail.value) // 可以不用定义方法，直接在行内使用$event获取当前confirm函数形参的值e
			}
		}
	}
</script>

<style lang="scss">
	.top {
		display: flex;
		align-items: center;
		height: 114rpx;
		padding: 26px 20rpx;
		box-sizing: border-box;
		background-color: #eee;

		icon {
			position: absolute;
			top: 40rpx;
			left: 32rpx;
		}

		input {
			flex: 1;
			height: 60rpx;
			padding-left: 80rpx;
			margin-right: 20rpx;
			font-size: 26rpx;
			border-radius: 4rpx;
			background-color: #fff;
		}

		button {
			width: 156rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 26rpx;
			border-color: #dfdfdf;
		}
	}
</style>
