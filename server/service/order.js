const mysql = require('mysql');
const db = require('../lib/db');
const utils = require('../utils');

class OrderSrv {
    static async insert(params) {
        if (!params.order_time || !params.order_price || !params.order_name) {
            return {
                code: 4002,
                msg: '缺少参数 name 或者 price'
            }
        }

        let conn = db.getConnection();

        let sql = 'INSERT INTO d_order SET ?';
        let result = await utils.query(conn, conn.query, sql, params);

        db.closeConnection(conn);

        if (result && result.affectedRows === 1) {
            return utils.handleResult(2000, result, '下单成功');
        } else {
            return utils.handleError(4005, '操作失败，资源已存在')
        }
    }

    /**
     * orderDetail
     * @param  {number} id
     * @return {Object}
     */
    static async find(id) {
        let conn = db.getConnection();
        let sql = `Select * From d_order Where id = ${id}`;
        let orders = await utils.query(conn, conn.query, sql);
        db.closeConnection(conn);

        return orders[0];
    }

    /**
    * 更新数据
    * @param  {number} id       order id.
    * @param  {Object} values   order details.
    * @throws Error on referential integrity errors.
    */
    static async update(id, values) {
        try {
            let conn = db.getConnection();
            let sql = 'UPDATE d_order SET ? WHERE id = ?';
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

    /**
     * delete a order
     * @param  {number}  id [description]
     * @return {Object}    [description]
     */
    static async delete(id) {
        let conn = db.getConnection();
        try {
            await utils.query(conn, conn.query, `Delete From d_order where id = ${id}`);
        } catch (e) {
            return utils.handleError(4001, '删除失败');
        }
        db.closeConnection(conn);
    }
};

module.exports = OrderSrv;
