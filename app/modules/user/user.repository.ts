import { IUsers } from "./user.types"
import { UserModel } from "./user.schema"
import { ILogin } from "../auth/auth.types";



const register = async(userData: IUsers) => {
    try {
        const createdUserData = await UserModel.create({...userData});
        return createdUserData;
    } catch (error) {
        throw error;
    }
}

const getOneUser = async(loginCredentials : ILogin) => {
    try {
        return await UserModel.findOne({where: {...loginCredentials}})
    } catch (error) {
        throw error;
    }
}

const findOneUserWithEmail = async(email : string) => {
    try {
        return await UserModel.findOne({where : {email}});
    } catch (error) {
        throw error;
    }
}

export default {register , getOneUser, findOneUserWithEmail}