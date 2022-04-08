module.exports = {
    name: 'MYSQL DEMO',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    serverSettings: {
        port: process.env.PORT || 3015
    },

    tokenSettings: {
        publicKey: process.env.PUBLIC_KEY 
    } , 
    dbMYSQL : { 
        db : 'DBProduct' ,
        host : '127.0.0.1' , 
        port : '3333' ,
        user : 'root' , 
        password : 'root' ,
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        } ,
        get url (){
            return `${this.host}:${this.port}`
        } 
    }
}