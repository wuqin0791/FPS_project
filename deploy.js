/**
 * @file 远程部署
 * @author zhouqing02
 */

var sftp = require('node-sftp-deploy-i');
var chalk = require('chalk');

var config = {
    test: {
        host: '10.40.11.21',
        port: '22',
        username: 'root',
        password: 'PkKgX8bA',
        sourcePath: './fis-dist',
        remotePath: '/data/app/7din/wechat/7din'
    },
    production: {
        host: '10.40.11.21',
        port: '22',
        username: 'root',
        password: 'PkKgX8bA',
        sourcePath: './fis-dist',
        remotePath: '/data/app/online/srcfile/sevend/wechat-baodan/htdocs/wechat/7din'
    }
}

console.log(chalk.yellow(' ------- deploy start... ------- \n'));

sftp(config[process.env.NODE_ENV], function() {
    console.log(chalk.cyan('  deploy complete.\n'));
}, function(err) {
    console.log(err)
});
