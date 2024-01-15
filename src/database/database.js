import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('sad_db', 'sad_db_user', 'PNSTusdJc7ZhjdKsENuCpA90xrApZc5j', {
    host: 'postgres://sad_db_user:PNSTusdJc7ZhjdKsENuCpA90xrApZc5j@dpg-cmimd8ud3nmc73ckefig-a.oregon-postgres.render.com/sad_db',
    dialect: 'postgres'
})