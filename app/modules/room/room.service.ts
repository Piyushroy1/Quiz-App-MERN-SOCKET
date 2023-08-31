import { ICreateRoom, IJoinRoom } from "./room.types"
import roomRepository from "./room.repository";


const createRoom = async(roomDetails : ICreateRoom) => {
    const name = `${ roomDetails.email?.split('@')[0]}-ROOM`;
    roomDetails.name = name;
    const isRoomCreated = await roomRepository.createRoom(roomDetails);
    if(isRoomCreated){
        return isRoomCreated;
    }
}

const joinRoom = async(roomDetails : IJoinRoom) => {
    const isRoomFull:any = await roomRepository.getOneRoomDetails(roomDetails.roomId);
    if(isRoomFull.isFull){
        throw new Error('ROOM IS FULL');
    }
    else {
        const isRoomJoined = await roomRepository.joinRoom(roomDetails);
        if(isRoomJoined){
            return true;
        }
    }
}

const getRoomDetails = async(roomId : string) => {
    return await roomRepository.getOneRoomDetails(roomId);
}

const getAvailableRooms = async() => {
    return await roomRepository.getAvailableRooms();
}

const startGame = async(roomId : string) => {
    const gameStarted = await roomRepository.startGame(roomId);
    if(gameStarted){
        return true;
    }
}

const getGameResults = async(roomId : string) => {
    return await roomRepository.getOneRoomDetails(roomId); 
}

const deleteRoom = async(roomId : string) => {
    return await roomRepository.deleteRoom(roomId);
}

const addWinner = async(userId : string , roomId : string) => {
    return await roomRepository.addWinner(userId , roomId);
}

export default {
    deleteRoom,
    getGameResults,
    startGame,
    getAvailableRooms,
    getRoomDetails,
    joinRoom,
    createRoom,
    addWinner
}