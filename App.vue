<script>
	import { CARTKEY } from '@/utils/contants'
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			uni.setStorageSync(CARTKEY, this.$store.state.cartList)
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
