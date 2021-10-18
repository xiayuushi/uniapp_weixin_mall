import  { TOKENKEY } from '@/utils/contants.js'
const BASEURL = 'https://www.uinav.com/api/public/v1'

export default function({ url, method = 'get', data, addToken }) {
	return new Promise((resolve, reject) => {
		let header = {}
		if (addToken) {
			header.authorization = uni.getStorage(TOKENKEY)
		}
		uni.request({
			url: BASEURL + url,
			method,
			data,
			header,
			success: res => resolve(res.data),
			fail: err => reject(err)
		})
	})
}
