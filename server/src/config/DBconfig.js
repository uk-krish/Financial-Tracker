const mysql = require('mysql2');

const Dbconnection = async () => {
    try {
        const con = await mysql.createConnection({
            host: process.env.USER_HOST,
            user: process.env.USER_ID,
            password: process.env.USER_PASSWORD,
            database: process.env.DATABASE
        })
        console.log("DB Connection Established");
        return con;
    } catch (error) {
        console.log(error);
        throw error
    }
}
module.exports=Dbconnection;