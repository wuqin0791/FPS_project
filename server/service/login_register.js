const mysql = require('mysql');
const db    = require('../lib/db');
const utils = require('../utils');
const uuidv4  = require('uuid/v4');
const LoginService = {
    async checkLogin (parma) {
        if (!parma.name) {
            return  utils.handleError(4002, 'Request Parameter Error');
        }
        const conn = db.getConnection();
        const sql = `SELECT id, name, nick_name, token, type FROM order_user
                    WHERE
                        name = ${mysql.escape(parma.name)}  AND
                        status = 1`;
                        // nick_name = ${mysql.escape(parma.nick_name)}  AND
        const result = await utils.query(conn, conn.query, sql);
        db.closeConnection(conn);
        if (result && result[0]) {
            return {
                code: 2000,
                data: result[0],
                msg:"登录成功！"
            }
        } else {
            return utils.handleError(4004, '没找到相关数据',)
        }
    },
    async register (parma) {
        if (!parma.name) {
            return  utils.handleError(4002, 'Request Parameter Error');
        }
        const conn = db.getConnection();
        const token = uuidv4();
        const sql = `INSERT INTO order_user
                        SET
                            name = ${mysql.escape(parma.name)},
                            nick_name=${mysql.escape(parma.nick_name)},
                            token = ${mysql.escape(token)},
                            phone = ${mysql.escape(parma.phone)}
                        ON DUPLICATE KEY UPDATE
                            name = ${mysql.escape(parma.name)},
                            nick_name=${mysql.escape(parma.nick_name)},
                            token = ${mysql.escape(token)},
                            status = 1`;
        const result = await utils.query(conn, conn.query, sql);
        db.closeConnection(conn);
        if (result && result.affectedRows) {
            return utils.handleError(2000, '注册成功');
        } else {
            return utils.handleError(4001, '注册失败',)
        }
    }
};
module.exports = LoginService;
