const baseurl = ''
export const myRequest = (datas)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:datas.url,
			method: datas.method || 'get',
			data:datas.data || {},
			success:(res)=>{
				if(res ==null){
					return uni.showToast({
						title:'获取数据失败'
					})
				}
				resolve(res)
			},
			fail:(err)=>{
				uni.showToast({
					title:'请求接口失败'
				})
			reject(err)
			}
		})
	})
}