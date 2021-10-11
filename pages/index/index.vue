<template>
	<view>
		<view class="search">
			<view class="search-item" :class="{ 'isfocus':isfocus }">
				<icon type="search" size="16" />
				<input type="text" :value="value" placeholder="搜索" @focus="isfocus=true" @blur="isfocus=false" />
			</view>
		</view>
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper-item" v-for="item in swipers" :key="item.goods_id">
				<navigator :url="item.navigator_url" :open-type="item.open_type">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav">
			<navigator class="nav-item" :url="item.navigator_url" v-for="item in navs" :key="item.name">
				<image :src="item.image_src"></image>
			</navigator>
		</view>
		<view class="floor">
			<view class="floor-item" v-for="(item,index) in floors" :key="index">
				<view class="title">
					<image :src="item.floor_title.image_src"></image>
				</view>
				<view class="product">
					<navigator class="product-item" :url="item.product_list.navigator_url"
						:open-type="item.product_list.open_type" v-for="v in item.product_list" :key="item.name">
						<image :src="v.image_src"></image>
					</navigator>
				</view>
			</view>
		</view>
		<view class="backtop" @tap="toTop" v-if="isShow">
			<text>回到</text>
			<text>顶部</text>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				value: '',
				isfocus: false,
				isShow: false,
				swipers: [],
				navs: [],
				floors: []
			}
		},
		onLoad () {
			this.getSwipers()
			this.getNavs()
			this.getFloors()
		},
		onPageScroll (e) {
			e.scrollTop >= 200 ? this.isShow = true : this.isShow = false
		},
		methods: {
			async getSwipers () {
				const { message } = await this.$request({
					url: '/home/swiperdata'
				})
				this.swipers = message
			},
			async getNavs () {
				const { message } = await this.$request({
					url: '/home/catitems'
				})
				this.navs = message
			},
			async getFloors () {
				const { message } = await this.$request({
					url: '/home/floordata'
				})
				this.floors = message
			},
			toTop () {
				uni.pageScrollTo({
					scrollTop: 0,
					 duration: 600
				})
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

	.swiper {
		width: 750rpx;
		height: 340rpx;

		.swiper-item {
			width: 750rpx;
			height: 340rpx;

			image {
				width: 750rpx;
				height: 340rpx;
			}
		}
	}

	.nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 194rpx;

		.nav-item {
			image {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}

	.floor {
		box-sizing: border-box;

		.floor-item {
			margin-bottom: 10rpx;

			.title {
				display: flex;
				align-items: center;
				width: 750rpx;
				height: 88rpx;
				background-color: #f4f4f4;

				image {
					width: 750rpx;
					height: 60rpx;
				}
			}

			.product {
				height: 388rpx;
				padding: 0 17rpx;
				overflow: hidden;

				.product-item {
					float: left;
					width: 233rpx;
					height: 188rpx;
					margin-left: 10rpx;
					margin-bottom: 10rpx;

					&:first-child {
						width: 232rpx;
						height: 386rpx;
						margin-left: 0;
					}

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	
	.backtop {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		right: 20rpx;
		bottom: 40rpx;
		width: 80rpx;
		height: 80rpx;
		padding: 20rpx;
		border-radius: 50%;
		background-color: rgba($color: #fff, $alpha: .5);
	}
</style>
