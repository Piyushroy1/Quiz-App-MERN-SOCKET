import { sendMail } from "../common/utility/email/email.service";
import userService from "../user/user.service";
import { IUsers } from "../user/user.types";
import { generate } from "generate-password";
import { ILogin } from "./auth.types";

export const register = async (userData: IUsers) => {
  const addedUser = await userService.register(userData);
  const email = addedUser.getDataValue("email");
  const firstName = addedUser.getDataValue("firstName");
  const lastName = addedUser.getDataValue("lastName");
  const password = addedUser.getDataValue("password");

  // await sendMail({
  //   to: email,
  //   subject: "WELCOME TO QUIZ-APP",
  //   emailData: `
  //   Hi, ${firstName} ${lastName}
  //   you have been successfully registered with us on the quiz app, please login to continue.
  //   and your login credentials are:
  //   Email: ${email},
  //   password: ${password}
  //   `,
  // });

  return addedUser;
};

const login = async (userCredentials: ILogin) => {
  const isUserVerified: any = await userService.login(userCredentials);
  if (isUserVerified) {
    //returning user's id on successful login
    return isUserVerified["id"];
  }
};

export default { register, login };
