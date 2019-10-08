"use strict";

const mysql        = require('mysql');
const config       = require('../config/config');
const mysql_config = config.mysql;

const db = {

    getConnection: function () {

        const connection = mysql.createConnection({
            host: mysql_config.host,
            user: mysql_config.user,
            password: mysql_config.password,
            database: mysql_config.database,
            multipleStatements: true
        });

        connection.connect(function (err) {
            if (err) {
                console.error("connect error happened",err);
                return;
            }
            console.log('connected as id ' + connection.threadId);
        });

        connection.on('error',function(err){
            console.error(arguments,connection.threadId);
        });

        return connection;
    },

    closeConnection: function (connection) {
        if(connection && typeof connection.end == 'function' &&　connection.threadId){
            console.log('close mysql connection id ' + connection.threadId);
            connection.end();
        }
    }

};

module.exports = db;
