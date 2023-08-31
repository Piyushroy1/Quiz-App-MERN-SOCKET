export interface ICreateRoom {
    hostId : string;
    name ?: string;
    id ? :string;
    email? :string;
}

export interface IJoinRoom {
    guestId : string;
    roomId: string;
}