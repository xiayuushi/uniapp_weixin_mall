import { mapState, mapMutations } from 'vuex'
import { ADDRESSKEY } from '@/utils/contants.js'

export default {
	data() {
		return {
			userAddress: uni.getStorageSync(ADDRESSKEY) || {},
			completeCartInfo: [] // vuex与接口整合后的可用于页面渲染的完整购物车数据
		}
	},
	onShow() {
		this.getCompleteCartInfo()
	},
	computed: {
		...mapState(['cartList']),
		totalNum () {
			let num = 0
			this.completeCartInfo.map(item => { 
				if(item.checked) num += item.num
			})
			return num
		},
		totalPrice () {
			let price = 0
			this.completeCartInfo.map(item => { 
				if (item.checked) price += item.num * item.goods_price 
			})
			return price
		},
		address () {
			const { provinceName, cityName, countyName, detailInfo, userName } = this.userAddress
			if (provinceName) {
				return provinceName + cityName + countyName + detailInfo
			} else {
				return '请选择收货地址'
			}
		},
		userName () {
			const { userName } = this.userAddress
			if (userName) {
				return userName
			} else {
				return '请选择收货人'
			}
		},
	},
	methods: {
		...mapMutations(['SYNCCART']),
		async getCompleteCartInfo () {
			const ids = this.cartList.map(item => item.goods_id).join()
			const { message } = await this.$request({ url: `/goods/goodslist?goods_ids=${ids}` })

			this.completeCartInfo = message.map(v => {
				const part = this.cartList.find(item => item.goods_id === v.goods_id)
				return { ...v, ...part }
			})
		},

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

// 1、mixin混入，将多个组件中通用的逻辑抽取出来进行复用，可以抽取数据、方法、属性、生命周期、计算属性等组件中所有的js逻辑
// 2、抽取出来之后，只需要在使用的地方进行导入并使用即可
