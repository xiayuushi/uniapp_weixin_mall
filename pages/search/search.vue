<template>
	<view>
		<view class="top">
			<icon type="search" size="20" />
			<input type="text" v-model="value" placeholder="请输入你想要的商品" @confirm.stop="search" />
			<button type="default" plain v-if="value.length !== 0 && value.trim()" @tap.stop="cancel">取消</button>
		</view>
		<view class="content">
			<view class="title">
				<text>历史搜索</text>
				<icon type="clear" size="20" @tap.stop="clear" v-if="searchList.length !== 0" />
			</view>
			<view class="tag">
				<text v-for="(item, index) in searchList" :key="index" @tap.stop="value = item">{{ item }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const KEY = 'searchList'
	
	export default {
		data () {
			return {
				value: '',
				searchList: []
			}
		},
		onLoad () {
			this.searchList = uni.getStorageSync(KEY) || []
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
				
				if(this.searchList.length > 10) {
					this.searchList.shift()
				}
				uni.setStorageSync(KEY, this.searchList)
				this.cancel()
			},
			
			clear () {
				this.searchList = []
				uni.removeStorageSync(KEY)
			}
		}
	}
</script>

<style lang="scss" scoped>
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
