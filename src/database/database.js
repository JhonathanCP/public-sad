import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('pbi_gctic', 'root', 'root', {
    host: 'localhost',
    dialect: 'postgres'
})