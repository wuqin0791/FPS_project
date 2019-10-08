/**
 * @file tools
 * @author zhouqing02
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sendfile = require('koa-sendfile');
const Json2csvParser = require('json2csv').Parser;

module.exports = {
    async json2csv(ctx, next) {
        let documents = ctx.request.body.data;

        // documents = JSON.parse(documents)

        if (!documents || !documents.length) {
            ctx.throw(403, 'Unrecognised data');
        }

        let json2csvParser = new Json2csvParser();
        let csv = json2csvParser.parse(documents);

        let md5sum = crypto.createHash('md5');
        md5sum.update(csv);

        let tempFile = md5sum.digest('hex') + '.csv';
        let tempPath = path.resolve(__dirname, '../temp/' + tempFile);

        fs.writeFileSync(tempPath, csv);
        await sendfile(ctx, tempPath);
    }
}
