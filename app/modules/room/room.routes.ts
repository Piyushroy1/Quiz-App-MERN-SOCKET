import { NextFunction, Request , Response, Router } from "express";
import { ICreateRoom , IJoinRoom } from "./room.types";
import { StatusCodes } from "http-status-codes";
import roomService from "./room.service";
import { ResponseHandler } from "../common/response.handler";


export const router = Router();

router.post('/createRoom' , async(req: Request , res : Response , next : NextFunction)=>{
    try {
        const createdRoomDetails:any = await roomService.createRoom(req.body as ICreateRoom);
        res.status(StatusCodes.OK).send(new ResponseHandler(createdRoomDetails.id));
    } catch (error) {
        next(error);
    }
})


router.post('/joinRoom' , async(req: Request , res : Response , next : NextFunction)=>{
    try {
        const joinedRoomDetails = await roomService.joinRoom(req.body as IJoinRoom);
        res.status(StatusCodes.OK).send(joinedRoomDetails);
    } catch (error) {
        next(error);
    }
})

router.get('/getRoomDetails' , async(req: Request , res : Response , next : NextFunction)=>{
    try {
        const roomDetails = await roomService.getRoomDetails(req.params.roomId);
        res.status(StatusCodes.OK).send(roomDetails);
    } catch (error) {
        next(error);
    }
})

router.get('/availableRooms' , async(req: Request , res : Response , next : NextFunction)=>{
    try {
        const availableRooms = await roomService.getAvailableRooms();
        res.status(StatusCodes.OK).send(new ResponseHandler(availableRooms));
    } catch (error) {
        next(error);
    }
})

router.post('/startGame' , async(req: Request , res : Response , next : NextFunction)=>{
    try {
        const isGameStarted = await roomService.startGame(req.params.roomId);
        res.status(StatusCodes.OK).send(isGameStarted);
    } catch (error) {
        next(error);
    }
})

router.post('/getGameResults' , async(req: Request , res : Response , next : NextFunction)=>{
    try {
        const getGameResults = await roomService.getGameResults(req.params.roomId);
        res.status(StatusCodes.OK).send(getGameResults);
    } catch (error) {
        next(error);
    }
})

router.delete('/deleteRoom' , async(req: Request , res : Response , next : NextFunction)=>{
    try {
        const isRoomDeleted = await roomService.deleteRoom(req.params.roomId);
        res.status(StatusCodes.OK).send(isRoomDeleted);
    } catch (error) {
        next(error);
    }
})

