
var config = require("./config").database;
var sql = require('mssql');

// module.exports = {
// 	'query': function(queryString) {
//         if (queryString == undefined || queryString == "") {
//             return null;
//         } else {
//             var sql = require('mssql');
//             sql.close();
//         	return new Promise((resolve, reject) => {
//                 console.log('Establishing connection to Database...')
//                 sql.connect(config).then(pool => {
//                     console.log('Connected to Database!');
//                     return pool.request().query(queryString);
//                 }).then(results => {
//                     console.log('Query succeded!');
//                     console.log('Closing connection...');
//                     sql.close();
//                     resolve(results);
//                 }).catch(error => {
//                     console.log('Error executing query :(', error);
//                     console.log('Closing connection...');
//                     sql.close();
//                     reject(error);
//                 });
//             });
//         }
//     }
// };

const pool = new sql.ConnectionPool(config); //cria a connectionPool com o banco de dados numa constante

module.exports = (query) => {
    pool.connect(err => {
        if (err) {
            console.log("!")
            pool.close();
            throw err;
        }
        else {
            console.log("ok")
            let retVal;
            pool.request().query(query, (err, result => {
                if(err){
                    pool.close()
                    throw err;
                }
                else{
                    retVal = result.recordset;
                }
            }))
            pool.close()
            return retVal;
        }

    })
}