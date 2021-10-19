<script>
import { CARTKEY } from '@/utils/contants'

export default {
  onLaunch: function () {},
  onShow: function () {},
  onHide: function () {
    uni.setStorageSync(CARTKEY, this.$store.state.cartList)
  }
}
</script>

<style></style>
