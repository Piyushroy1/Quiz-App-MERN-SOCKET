import { Response, Router, Request, NextFunction } from "express";
import { createUserValidator } from "../user/user.validator";
import { StatusCodes } from "http-status-codes";
import authService from "./auth.service";
import { ResponseHandler } from "../common/response.handler";



export const router = Router();

router.post('/register', createUserValidator , async(req: Request , res : Response, next: NextFunction) => {
    try {
        const userDataFromRequestBody = req.body;
        const createdUserData = await authService.register(userDataFromRequestBody);
        res.status(StatusCodes.OK).send(new ResponseHandler(createdUserData));
    } catch (error) {
        next(error);
    }
})

router.post('/login' , async(req: Request , res : Response , next: NextFunction) => {
    try{
        const userCredentials = req.body;
        const userIdAfterUserIsVerified = await authService.login(userCredentials);
        res.status(StatusCodes.OK).send(new ResponseHandler(userIdAfterUserIsVerified))
    }
    catch(error){
        next(error);
    }
})


