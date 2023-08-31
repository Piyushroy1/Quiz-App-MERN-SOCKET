import { Sequelize } from "sequelize";
import { DOT_ENV } from "./config-env";
import { DATABASE_CONNECTION_ERROR } from "../common/errors";

const {database , username , port , password , host} = DOT_ENV;

export const sequelizeInstanceCreation = () => {
    return new Sequelize (
        database as string,
        username as string,
        password as string,
        {
            host: host,
            dialect: 'postgres',
            port,
            pool: {
                max: 20,
                min: 0,
                acquire: 60000    
            }
        }
    )
}

const sequelize = sequelizeInstanceCreation();

export const databaseConnection = async () => {    
    await sequelize.sync();
    if(sequelize){
        console.log('Database has been connected successfully');
    }
    else {
        console.log("Something went wrong with database Connection");
        throw new Error(DATABASE_CONNECTION_ERROR.CONNECTION_FAILED);
    }
}

export { sequelize };
