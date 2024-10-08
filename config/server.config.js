module.exports = {
    
    "dev" : {
    USERNAME: 'root',
    PASS: null,
    DB: 'canary_billing_meteorap',
    HOST: '127.0.0.1',
    dialect:'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
}