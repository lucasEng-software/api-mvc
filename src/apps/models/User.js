const Sequelize = require('sequelize');
const {Model} = require('sequelize');
const bcryptjs = require('bcryptjs');

class User extends Model{
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            user_name: Sequelize.STRING,
            email:  Sequelize.STRING,
            bio: Sequelize.STRING,
            gender: Sequelize.STRING,
            avatar: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
        },
        {
            sequelize,
        },
        );
        this.addHook('beforeSave', async (user) =>{
            if(user.password){
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        })
        return this;
    }

    checkPassword(password){
        return bcryptjs.compare(password, this.password_hash );
    }
}

module.exports = User;