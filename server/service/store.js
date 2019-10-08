const mysql = require('mysql');
const db    = require('../lib/db');
const utils = require('../utils');
const StoreService = {
    async insert (parma) {
        let {name = '', description = '', logo = '', phone = ''} = parma;
        if (!name || !phone) {
            return {
                code: 4002,
                msg: '缺少参数 name 或者 phone'
            }
        }
        const conn = db.getConnection();
        const sql = `INSERT INTO store_list
                        SET
                            name = ${mysql.escape(name)},
                            description = ${mysql.escape(description)},
                            logo = ${mysql.escape(logo)},
                            phone = ${mysql.escape(phone)}`;
        const result = await utils.query(conn, conn.query, sql);
        db.closeConnection(conn);
        if (result && result.affectedRows === 1) {
            return utils.handleResult(2000, true, '添加商家成功');
        } else {
            return utils.handleError(4005, '操作失败，资源以存在')
        }
    },

    /**
    * 更新数据
    * @param  {number} id       store id.
    * @param  {Object} values   store details.
    * @throws Error on referential integrity errors.
    */
    async update(id, values) {
        try {
            let conn = db.getConnection();
            let sql = 'UPDATE store_list SET ? WHERE id = ?';
            await utils.query(conn, conn.query, sql, [values, id]);
            db.closeConnection(conn);
        } catch (e) {
            switch (e.code) { // just use default MySQL messages for now
                case 'ER_BAD_NULL_ERROR':
                case 'ER_DUP_ENTRY':
                case 'ER_ROW_IS_REFERENCED_2':
                case 'ER_NO_REFERENCED_ROW_2':
                    throw utils.handleError(4003, e.message); // Forbidden
                case 'ER_BAD_FIELD_ERROR':
                    throw utils.handleError(500, e.message); // Internal Server Error for programming errors
                default:
                    throw utils.handleError(500, e.message); // Internal Server Error for uncaught exception
            }
        }
    }
};
module.exports = StoreService;
