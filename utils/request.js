const BASEURL = 'https://www.uinav.com/api/public/v1'

export default function({ url, method = 'get', data }) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASEURL + url,
			method,
			data,
			success: res => resolve(res.data),
			fail: err => reject(err)
		})
	})
}
