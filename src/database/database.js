import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('jwuyevnt', 'jwuyevnt', '5G84W5LSCaxZqEZxaEOzIqiA7D48ke0X', {
    host: 'tuffi.db.elephantsql.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
      }
})