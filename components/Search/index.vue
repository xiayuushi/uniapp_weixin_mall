<template>
	<view class="search">
		<view class="search-item" :class="{ 'isfocus':isfocus }">
			<icon type="search" size="16" />
			<input type="text" :value="value" placeholder="搜索" @focus="focus" @blur="isfocus=false" />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Search',
		data () {
			return {
				value: '',
				isfocus: false,
			}
		},
		methods: {
			focus () {
				this.isfocus = true
				uni.navigateTo({ url: '/pages/search/search' })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		padding: 20rpx 10rpx;
		background-color: #eb4450;
	
		.search-item {
			position: relative;
			height: 60rpx;
			padding-left: 20rpx;
			color: #ccc;
			border-radius: 8rpx;
			background-color: #fff;
			box-sizing: border-box;
	
			icon {
				position: absolute;
				top: 17rpx;
				left: 42%;
				transition: all .6s;
			}
	
			input {
				padding-left: 46%;
				padding-top: 8rpx;
				transition: all .6s;
			}
	
			&.isfocus {
				icon {
					left: 20rpx;
				}
	
				input {
					padding-left: 40rpx;
				}
			}
		}
	}
	
</style>
