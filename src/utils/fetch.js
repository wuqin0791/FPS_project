import axios from 'axios';
import cookie from './cookie';
import { API_ROOT, STATUS_CODE_MAP } from 'config';

// 创建axios实例
const service = axios.create({
    baseURL: API_ROOT, // api的base_url
    timeout: 5000, // 请求超时时间

});
//
// request拦截器
// service.interceptors.request.use(async config => {
// Do something before request is sent
// if (store.getters.token) {
// }
// config.headers['session_key'] = 'CwWQ2O74Guf0mMHJszGOXZ4Lz+tAW9Yq1GEaT5t+bqy+SxvHP3oPE+9j+Q2xQFthHjAmFSCqUL+uT7Mdze6UQ0cnr1JPY1Hjrn8i0Lk9AQU=';
// }, error => {
// Do something with request error
// console.log(error);  //for debug
// Promise.reject(error);
// })

// respone拦截器
service.interceptors.response.use(
    async (res) => {
		let code = +res.data.code;
		// if (code === 2000) {
		// 	return res || '';
		// } else {
		// 	alert(data.msg || '服务器忙');
		// 	// console.error('response data:', data);
		// 	//return Promise.reject(data)
		// }
		if (code === 401) {
            location.reload();
            return Promise.reject(res);
        } else {
            return res;
        }
	},
	error => {
		return Promise.reject(error);
	}
)

export default service;
