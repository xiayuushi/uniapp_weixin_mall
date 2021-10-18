<template>
	<view>
		<button @tap="toHome">回到首页</button>
		<button @tap="toOrder">查看订单</button>  
	</view>
</template>

<script>
	export default {
		onLoad (options) {
			const { status } = options
			const title = status === 'success' ? '支付成功':'支付失败'
			uni.setNavigationBarTitle({ title })
		},
		methods: {
			toHome () {
				uni.switchTab({ url: '/pages/index/index' })
			},
			toOrder () {
				uni.navigateTo({ url: '/pages/order/order' })
			}
		}
	}
	
	// 1、跳转tabbar页面使用 uni.switchTab()，跳转普通页面使用 uni.navigateTo()
	// 2、tabbar管理的页面不会自动销毁，除非退出小程序后重进
	// 3、tabbar管理的页面会自动缓存，如果需要随页面切换反复拿数据，应该在onShow周期中去逻辑处理
	// 4、跳转到tabbar页面，之前的非tabbar页面会退出页面栈
	// 5、常规页面一般会在onLoad获取数据，tabbar页面一般会在onShow获取数据，置于频繁切换页面的操作可以在onHide或onShow中进行
	// 6、微信小程序除了页面的生命周期外，还有APP应用的生命周期，使用uniapp框架还可以使用vue组件的生命周期
	
</script>

<style lang="scss"></style>
