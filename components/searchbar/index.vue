<template>
	<view class="search">
		<view class="search-item" :class="{ 'isfocus':isfocus }">
			<icon type="search" size="16" />
			<input type="text" v-model="value" placeholder="搜索" @focus.stop="focus" @blur.stop="isfocus=false" />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'searchbar',
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

	<!-- 
		1、当前组件的抽取是将整个结构、样式、数据及方法都剪切过来，并没有通过props与$emit()提供方法给外界使用者修改数据，因此外界只有把当前组件当标签使用的权限
		2、因此在当前组件（相对于外部使用者来说就是子组件）标签中是可以使用v-model或.sync的 
	-->