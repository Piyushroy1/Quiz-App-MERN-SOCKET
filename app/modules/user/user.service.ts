import { sendMail } from "../common/utility/email/email.service";
import { IUsers } from "./user.types";
import userRepository from "./user.repository";
import { ILogin } from "../auth/auth.types";
import { generate } from "generate-password";

const register = async (userData: IUsers) => {
  const generatePassword = generate({ length: 6, numbers: true });
  const userDataAdded = await userRepository.register({
    password: generatePassword,
    ...userData,
  });
  return userDataAdded;
};

const login = async (userCredentials: ILogin) => {
  return await userRepository.getOneUser(userCredentials);
};

const getUserWithEmail = async(email : string) => {
  return await userRepository.findOneUserWithEmail(email);
}

export default {
  register,
  login,
  getUserWithEmail
};
