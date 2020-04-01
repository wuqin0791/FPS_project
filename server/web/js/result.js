/*
 * @Description: This is a javascript file
 * @Author: JeanneWu
 * @Date: 2019-12-15 21:25:57
 */
let a = {
    getData: () => {
        let list = {
            hash: window.localStorage.getItem('hash')
        }
        $.ajax({
            //请求方式
            type: "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: "http://127.0.0.1:3000/getData",
            //数据，json字符串
            data: JSON.stringify(list),
            //请求成功
            success: function (result) {
                console.log(result);
                $('.card-text').html(result.data.data.message);
                // window.localStorage.setItem('hash', result.data.data.hash);

            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                console.log(e.status);
                console.log(e.responseText);
            }
        });
    }

}
a.getData()