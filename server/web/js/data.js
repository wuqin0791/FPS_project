/*
 * @Description: This is a python file
 * @Author: JeanneWu
 * @Date: 2019-12-15 20:27:23
 */

let a = {
    init: () => {
        $.ajax({
            //请求方式
            type : "GET",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "http://127.0.0.1:3000/getAccount",
            //数据，json字符串
            // data : JSON.stringify(list),
            //请求成功
            success : function(result) {
                console.log(result.data.result);
                let html = '<option>please select...</option>';
                result.data.result.map((item,index)=>{
                    html += '<option>'+ item +'</option>';
                });
                $('#exampleFormControlSelect1').html(html)
                $('#exampleFormControlSelect2').html(html)
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                console.log(e.status);
                console.log(e.responseText);
            }
        });
        a.clickFun()
    },
    clickFun: () => {
        $('#submit').click(function(){
            let list = {
                message: $('#exampleFormControlTextarea1').val(),
                sender: $('#exampleFormControlSelect1 option:selected').text(),
                receiver: $('#exampleFormControlSelect2 option:selected').text(),
            }
            $.ajax({
                //请求方式
                type : "POST",
                //请求的媒体类型
                contentType: "application/json;charset=UTF-8",
                //请求地址
                url : "http://127.0.0.1:3000/send",
                //数据，json字符串
                data : JSON.stringify(list),
                //请求成功
                success : function(result) {
                    window.localStorage.setItem('hash', result.data.data.hash);
                   
                },
                //请求失败，包含具体的错误信息
                error : function(e){
                    console.log(e.status);
                    console.log(e.responseText);
                }
            });
        })
    }

}
// $('#exampleFormControlSelect1 option:selected').text()
a.init();