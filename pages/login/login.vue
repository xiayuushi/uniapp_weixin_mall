<template>
  <view>
    <button open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
  </view>
</template>

<script>
import { mapMutations } from 'vuex'
import { TOKENKEY } from '@/utils/contants.js'

export default {
  methods: {
    ...mapMutations(['SETUSERINFO']),

    getUserInfo (res) {
      this.SETUSERINFO(res.detail.userInfo)
      const { encryptedData, rawData, iv, signature } = res.detail

      uni.login({
        success: async login_res => {
          const { code } = login_res

          const { token } = await this.$request({
            url: '/users/wxlogin',
            method: 'post',
            data: { encryptedData, rawData, iv, signature, code }
          })

          uni.setStorageSync(TOKENKEY, token)
          uni.navigateBack()
        }
      })
    }
  }
}

	// 1、微信小程序的获取用户公开信息的方式有两种（不能获取微信用户登录唯一标识code）
	// 	方式1、button + @tap + uni.getUserInfo() 
	// 	方式2、button + open-type="getUserInfo"+ @getuserinfo 

	// 2、获取微信用户登录唯一标识code必须使用uni.login() 或 wx.login() 
	// 3、拿到code与用户公开信息后，作为参数传递后端接口，可以获取token
	// 4、后续的敏感操作（如支付、核对确认订单等）都必须在请求头中携带token作为身份验证

</script>

<style lang="scss"></style>

