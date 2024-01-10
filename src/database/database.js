import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('pbi_gctic', 'postgres', 'zxcvqwer159A-', {
    host: 'localhost',
    dialect: 'postgres'
})