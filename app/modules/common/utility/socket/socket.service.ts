import { Socket } from "socket.io";
import questionService from "../../../question/question.service";
import roomService from "../../../room/room.service";
import userService from "../../../user/user.service";


export const socketHandler = (io : any) => {
io.on("connection", async(socket : any) => {
    console.log('A user is connected');
    console.log(socket.id)
    const availableRooms = await roomService.getAvailableRooms();
    socket.emit('availableRooms', availableRooms);

    socket.on('joinRoom' , async(roomId : string, userEmail : any, joinType : string)=> {
        try {
            if(joinType === 'CREATE'){
                console.log('CREATING ROOM ID------------->>>>>', roomId);
                socket.join(roomId);
                console.log('EMAILLLLL',userEmail.email);
                const userDetails = await userService.getUserWithEmail(userEmail.email);
                await roomService.createRoom({ hostId : userDetails?.dataValues.id , id : roomId , email : userEmail.email});
                console.log(`room has been created by ${socket.id} with roomId : ${roomId}`);
                const availableRooms = await roomService.getAvailableRooms();
                io.emit('availableRooms' , availableRooms)
            }
            else  {
                socket.join(roomId);
                const isRoomAvailable:any = await roomService.getRoomDetails(roomId);
                if(isRoomAvailable.dataValues.guestId !== null){
                    socket.emit("error",{message : 'room already full'});
                }
                else {
                    socket.join(roomId);
                    const guestDetails = await userService.getUserWithEmail(userEmail.email);
                    await roomService.joinRoom({guestId : guestDetails?.dataValues.id , roomId});
                    //emit a socket message;
                    // socket.emit('roomJoined');
                    console.log('joining ROOM ID------------->>>>>', roomId);
                    socket.emit('roomJoined' , roomId);
                    const availableRooms = await roomService.getAvailableRooms();
                    io.emit('availableRooms' , availableRooms);
                }

            }
        } catch (error) {
            throw error;
        }
    });


    // socket.on('joinRoom' , async(roomId: string, userId : string, joinType : string) => {
    //     try {
    //         if(joinType === 'CREATE'){
    //             socket.join(roomId);
    //             await roomService.createRoom({hostId : userId , id : roomId});
    //             socket.emit('roomJoined', {creatingRoomId : roomId});
                // const availableRooms = await roomService.getAvailableRooms();
                // io.emit('availableRooms' , availableRooms)
    //         }
    //         else if (joinType === 'JOIN'){
                // const isRoomAvailable:any = await roomService.getRoomDetails(roomId);
                // if(isRoomAvailable.dataValues.guestId !== null){
                //     socket.emit("roomJoined",{message : 'room already full'});
                // }
        
    //             else{
    //                 //add a condition where a player should not play with themselves.
    //                 socket.join(roomId);
    //                 await roomService.joinRoom({guestId : userId , roomId});
    //                 socket.emit("roomJoined", {hostId : isRoomAvailable.dataValues.hostId , guestId : userId , joiningRoomId : roomId});
    //                 socket.emit("hostCanJoin");
    //                 const availableRooms = await roomService.getAvailableRooms();
    //                 io.emit('availableRooms' , availableRooms);
                     
    //         }
    //     }
    //  } catch (error) {
    //         throw error;
    //     }
    // })



    
    socket.on('startingGame' , async(roomId : string , userEmail : any) => {
        try {
            console.log('ROOOM', roomId , userEmail);
            const randomFiveQuestions = await questionService.generateFiveQuestions();
            io.to(roomId).emit('Questions' , randomFiveQuestions);
        } catch (error) {
            throw error;
        }
    })

    socket.on('firstRender' , async() => {
        try {
            const availableRooms = await roomService.getAvailableRooms();
            io.emit('availableRooms' , availableRooms);
        } catch (error) {
            throw error;
        }
    })


    socket.on('startGame' , async(socketId : any) => {
        try {
            // const decodedJoiningDetails = JSON.parse(joiningDetails);
            const randomFiveQuestions = await questionService.generateFiveQuestions();
            console.log('QUESTIONSSSSSSSSSSSSS', randomFiveQuestions);
            socket.to(socketId).emit('questions' , randomFiveQuestions);
            // io.to().emit('questions' , randomFiveQuestions);
        } catch (error) {
            throw error;
        }
    })



    // socket.on('createRoom' , async(userId : string) => {
    //     try {
    //        const roomDetails:any =  await roomService.createRoom({hostId : userId});
    //         socket.emit('RoomCreated', {roomId : roomDetails.dataValues.id});
    //         const availableRooms = await roomService.getAvailableRooms();
    //         io.emit('availableRooms' , availableRooms)
    //     } catch (error) {
    //         throw error;
    //     }

    // })


    socket.on('gameOver' , async(score : number , joiningDetails : any) => {
        const decodedJoiningDetails = JSON.parse(joiningDetails);
        console.log('NUMBER------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>', score);
        // await 
    })



    io.on("disconnect" , () => {
        console.log('User is disconnected');
    })
})
}