module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "tododb",
    dialect: "mysql",
    pool: {
        max: 50,
        min: 0,
        acquire: 300000,
        idle: 10000
    }
};