// import { Response, Router, Request, NextFunction } from "express";
// import { createUserValidator } from "./user.validator";
// import { StatusCodes } from "http-status-codes";
// import userService from "./user.service";



// export const router = Router();

// router.post('/register', createUserValidator , async(req: Request , res : Response, next: NextFunction) => {
//     try {
//         const userDataFromRequestBody = req.body;
//         const createdUserData = await userService.register(userDataFromRequestBody);
//         res.status(StatusCodes.OK).send(createdUserData);
//     } catch (error) {
//         next(error);
//     }
// })


