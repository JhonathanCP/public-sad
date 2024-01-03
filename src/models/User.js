import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Role } from "../models/Role.js";
import { Report } from "../models/Report.js";
import { Group } from "../models/Group.js";
import bcrypt from "bcryptjs";

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail:true
        },
        allowNull: false
    },
    nombres: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    dni: {
        type: DataTypes.STRING,
        unique: true,
    },    
    area: {
        type: DataTypes.STRING
    },
    red: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Sequelize hooks for password encryption
User.beforeCreate(async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// Sequelize method to compare passwords
User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

User.belongsToMany(Role, { through: 'userRole', foreignKey: 'userId' });
Role.belongsToMany(User, { through: 'userRole', foreignKey: 'roleId' });
User.belongsToMany(Group, { through: 'userGroup', foreignKey: 'userId' });
Group.belongsToMany(User, { through: 'userGroup', foreignKey: 'groupId' });
User.belongsToMany(Report, { through: 'userReport', foreignKey: 'userId' });
Report.belongsToMany(User, { through: 'userReport', foreignKey: 'reportId' });
