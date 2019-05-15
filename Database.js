
// const config = require("./config").database;
const db = require('mssql');

let config = {
    "server": "safetybd.database.windows.net",
    "user": "bandtec",
    "password": "Projeto@safety",
    "database": "safety",
    "options": {
        "encrypt": true
    }
}
let g = false;

function SQLQuery(queryLine)
{
    if(g)
    {
        return global.conn.request().
        query(queryLine).
        then(results => {
            return results.recordset;
        })
    }
    else
    {
        return db.connect(config)
            .then(conn => {
                global.conn = conn;
                g = true;
                return global.conn.request().query(queryLine);
            })
            .then(results => {
                return results.recordset;
            })
    }
}

module.exports = {
    getUsers: () => {
        return SQLQuery("select * from Usuario");
    }
}