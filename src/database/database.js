import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('sad_db', 'postgres', 'zxcvqwer159A-', {
    host: '10.0.1.229',
    dialect: 'postgres',
    // dialectOptions: {
    //     ssl: true
    //   }
})