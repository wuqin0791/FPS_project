/*
 * @Description: This is a javascript file
 * @Author: JeanneWu
 * @Date: 2019-12-15 15:40:59
 */
// personal.unlockAccount('0x8863a14BF50f0815f3146166873A89b36Be84fe0','ftec5510', 3000)
let Web3 = require('web3');
if (typeof web3 !== 'undefined') { //检查是否已有web3实例
    web3 = new Web3(web3.currentProvider)
} else {
    //否则就连接到给出节点
    web3 = new Web3(new Web3.providers.HttpProvider("http://35.190.184.40:8545"));
}

web3.eth.getBlock(48, function (error, result) {
    if (!error) {
        console.log('********** rpc调用成功 ***********');
        console.log(JSON.stringify(result));
    } else {
        console.error(error);
    }

})
module.exports = {
    getAccount: (params, callback) => {
        web3.eth.getAccounts((error, result) => {
            if (error){
                callback(error, result)
            }else{
                callback(null, 
                    {
                        result
                    }
                )   
            }
        })
    },
    sendDataFun: (params, callback) => {
        let {
            message,
            sender,
            receiver
        } = params;
        let data = '0x' + Buffer.from(message).toString('hex')
        web3.eth.getAccounts((error, result) => {
            let txo = {
                from: sender,
                to: receiver,
                value: '0x00',
                gas: 210000,
                gasPrice: '0x00',
                data
            }
            console.log(txo);
            web3.eth.sendTransaction(txo, (error, hash) => {
                callback(null, {
                    msg: "发送成功",
                    data: {
                        hash
                    }
                });
                // web3.eth.getTransaction(hash, (error, result) => {
                //     console.log(web3.utils.hexToString(result.input), 'result')
                // })

            });
        })


    },
    getData: (params, callback) => {
        let {hash} = params;
        web3.eth.getTransaction(hash, (error, result) => {
            // console.log(web3.utils.hexToString(result.input), 'result')
            let message = web3.utils.hexToString(result.input);
            callback(null, {
                msg: "查询成功",
                data: {
                    message
                }
            });
        })
        
    }
}
