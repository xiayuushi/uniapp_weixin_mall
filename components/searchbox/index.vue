<template>
	<view class="top">
		<icon type="search" size="20" />
		<input type="text" placeholder="请输入你想要的商品" :value="value" @input="$emit('input',$event.detail.value)" @confirm="confirm" />
		<button type="default" plain v-if="value.trim().length !== 0" @tap="$emit('cancel')">取消</button>
	</view>
</template>

<script>
	export default {
		name: 'searchbox',
		props: ['value'],
		methods: {
			confirm(e) {
				this.$emit('search', e.detail.value)
			}
		}
	}
	
	// 1、可以不用定义方法，直接在行内使用$event获取confirm函数形参的值e
	// 2、外部使用者需要在使用该封装组件时，传入当前组件需要的props参数，以及实现当前组件的$emit中传输的方法
	
</script>

<style lang="scss">
	.top {
		display: flex;
		align-items: center;
		height: 114rpx;
		padding: 26rpx 20rpx;
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
			border: 1px solid #dfdfdf !important;
		}
	}
</style>


	<!--
		1、当前组件的抽取是仅仅是将结构与样式剪切过来，还有部分数据是需要外部使用者提供的
		2、当前组件 通过 props属性 接收外部使用者传递的数据进行渲染
		3、当前组件 通过 $emit()提供的方法 给外界使用者修改数据 
		4、需要注意：当前组件（相对于外部使用者来说就是子组件）标签中是不能直接使用v-model或.sync的，因为子组件使用v-model或.sync会造成单向数据流报错 
		5、因此 需要将当前组件原先的v-model或者.sync拆解开来，避免出现props传参时造成单向数据流报错

		6、当前抽取方法的好处是：
		6.1、外界不仅可以将当前抽取的组件做普通标签使用
		6.2、还可以传递数据与特定的方法来修改当前抽取的组件的数据 
	-->
