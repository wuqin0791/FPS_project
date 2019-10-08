const mysql = require('mysql');
const db = require('../lib/db');
const utils = require('../utils');

class ProductSrv {
    /**
     * 新增一条
     * @param  {[type]}  params
     * @return {Object}
     */
    static async insert(params) {
        let data = Object.assign({
            name: '',
            description: '',
            price: 0,
            stock: 9999,
            store_id: 0
        }, params);

        if (!data.name || !data.price) {
            return {code: 4002, msg: '缺少参数 name 或者 price'}
        }

        let conn = db.getConnection();

        let sql = 'INSERT INTO product SET ?';
        let result = await utils.query(conn, conn.query, sql, data);
        db.closeConnection(conn);

        if (result && result.affectedRows === 1) {
            return utils.handleResult(2000, true, '添加商品成功');
        } else {
            return utils.handleError(4005, '操作失败，资源已存在')
        }
    }

    /**
     * productDetail
     * @param  {number} id
     * @return {Object}
     */
    static async find(id) {
        let conn = db.getConnection();
        let sql = `Select * From product Where id = ${id}`;
        let products = await utils.query(conn, conn.query, sql);
        db.closeConnection(conn);

        return products[0];
    }

    /**
     * 按条件查找
     * @param  {string}         field   Field to be matched
     * @param  {string!number}  value   Value to match against field
     * @return {Object}                 product details
     */
    static async findBy(field, value) {
        try {
            let conn = db.getConnection();
            let sql = 'Select * From product Where ?? = ?';
            let products = await utils.query(conn, conn.query, sql, [field, value])
            db.closeConnection(conn);
            return products;

        } catch (e) {
            switch (e.code) {
                case 'ER_BAD_FIELD_ERROR':
                    throw utils.handleError(4003, 'Unrecognised product field ' + field);
                default:
                    throw utils.handleError(4001, e.message);
            }
        }
    }

    /**
    * 更新数据
    * @param  {number} id       product id.
    * @param  {Object} values   product details.
    * @throws Error on referential integrity errors.
    */
    static async update(id, values) {
        try {
            let conn = db.getConnection();
            let sql = 'UPDATE product SET ? WHERE id = ?';
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
     * delete a product
     * @param  {number}  id [description]
     * @return {Object}    [description]
     */
    static async delete(id) {
        let conn = db.getConnection();
        try {
            await utils.query(conn, conn.query, `Delete From product where id = ${id}`);
        } catch (e) {
            return utils.handleError(4001, '删除失败');
        }
        db.closeConnection(conn);
    }
};

module.exports = ProductSrv;
