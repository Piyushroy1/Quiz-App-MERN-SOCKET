import { DB_NAME } from "../common/database.constants";
import { sequelize } from "../configurations/connection";
import { DataTypes } from "sequelize";
import { UserModel } from "../user/user.schema";

export const RoomModel = sequelize.define(
  DB_NAME.ROOM,
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hostId: {
      type: DataTypes.UUID,
    },
    guestId: {
      type: DataTypes.UUID,
    },
    isFull: {
      type: DataTypes.BOOLEAN,
    },
    isGameStarted: {
      type: DataTypes.BOOLEAN,
    },
    isGameFinished: {
      type: DataTypes.BOOLEAN,
    },
    gameWinner: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

RoomModel.belongsTo(UserModel, { foreignKey: "hostId" });
RoomModel.belongsTo(UserModel, { foreignKey: "guestId" });
