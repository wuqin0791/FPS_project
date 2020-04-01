/*
 * @Description: This is a javascript file
 * @Author: JeanneWu
 * @Date: 2019-12-15 16:17:56
 */
module.exports = {
    success : (data) => {
        return {
            errcode: 0,
            data: data
        }
    },
    fail: (error, msg = '数据处理失败') => {
        if(error){
            return {
                errcode: 1,
                errmsg: error.message
            }
        }else{
            return {
                errcode: 1,
                errmsg: msg
            }
        }
    }
}