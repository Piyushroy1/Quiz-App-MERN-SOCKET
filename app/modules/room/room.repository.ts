import { RoomModel } from "./room.schema";
import { ICreateRoom, IJoinRoom } from "./room.types";

const deleteRoom = async (roomId: string) => {
  try {
    return await RoomModel.destroy({ where: { id: roomId } });
  } catch (error) {
    throw error;
  }
};

const getOneRoomDetails = async (roomId: string) => {
  try {
    return await RoomModel.findOne({ where: { id: roomId } });
  } catch (error) {
    throw error;
  }
};

const startGame = async (roomId: string) => {
  try {
    return await RoomModel.update(
      { isGameStarted: true },
      { where: { id: roomId } }
    );
  } catch (error) {
    throw error;
  }
};

const getAvailableRooms = async () => {
  try {
    return await RoomModel.findAll({ where: { guestId: null } });
  } catch (error) {
    throw error;
  }
};

// const getRoomDetails = async(roomId : string) => {
//     try {
//         return await RoomModel.findOne({where: {id : roomId}})
//     } catch (error) {
//         throw error;
//     }
// }

const joinRoom = async (guestDetails: IJoinRoom) => {
  try {
    return await RoomModel.update(
      { guestId: guestDetails.guestId , isFull : true },
      { where: { id: guestDetails.roomId } }
    );
  } catch (error) {
    throw error;
  }
};

const createRoom = async (roomDetails: ICreateRoom) => {
  try {
    return await RoomModel.create({ ...roomDetails });
  } catch (error) {
    throw error;
  }
};

const addWinner = async(userId : string , roomId : string) => {
  try {
    return await RoomModel.update({gameWinner : userId} , {where : {id : roomId}})
  } catch (error) {
    throw error;
  }
}

export default {
  deleteRoom,
  startGame,
  getAvailableRooms,
  getOneRoomDetails,
  joinRoom,
  createRoom,
  addWinner
};
