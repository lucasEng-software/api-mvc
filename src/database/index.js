const Sequelize = require('sequelize');
const User =require('../apps/models/User');
const databaseConfig = require('../configs/db');

const models = [User];
class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);
        models.map((model)=> model.init(this.connection));
    }
}

module.exports = new Database();