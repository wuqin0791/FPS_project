const utils = {
    query: function () {
        let params = [].slice.call(arguments);
        let ctx = params.splice(0, 1)[0];
        let fn = params.splice(0, 1)[0];
        if (typeof fn != 'function') {
            let tips = 'helper.fn arguments error, fn must be a function';
            return {
                error: tips
            };
        }
        return new Promise((resolve, reject) => {
            let callback = function () {
                let results = [].slice.call(arguments);
                let error = results.splice(0, 1)[0];
                let response = results.splice(0, 1)[0];

                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            };
            params.push(callback);
            // try{
                fn.apply(ctx, params);
            // }catch(e){
            //     console.log(fn.apply(ctx, params),'====== conn.query ======');
            // }


            // conn.query(sql, ctx.query, callback)
        });
    },
    handleError: function (code, desc, err) {
        const obj = {
            code: code,
            msg: desc
        };
        if (err) {
            obj.error = err;
        }
        return obj
    },
    handleResult: function (code, data, desc) {
        const obj = {
            code: code,
            msg: desc,
            data,
        };
        return obj
    }
};
module.exports = utils;
