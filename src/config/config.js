require('dotenv').config();

module.exports = {
    development: {
      baseUrl: "http://localhost:3001/",
      db: {
        username: process.env.LOCALHOST_USERNAME,
        password: process.env.LOCALHOST_PW,
        database: process.env.LOCALHOST_DB,
        host: process.env.LOCALHOST_HOST,
        dialect: "mysql"
      }
    },
    production:{
      baseUrl: "",
      db: {
        username: process.env.PRODUCTION_USERNAME,
        password: process.env.PRODUCTION_PW,
        database: process.env.PRODUCTION_DB,
        host: process.env.PRODUCTION_HOST,
        dialect: "mysql",
        // dialectOptions: {
        //   socketPath : `/cloudsql/${process.env.INSTANCE_NAME}`
        // }
      }
    }
}