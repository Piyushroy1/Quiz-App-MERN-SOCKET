import { DB_NAME } from "../common/database.constants";
import { sequelize } from "../configurations/connection";
import { DataTypes } from "sequelize";

export const QuestionModel = sequelize.define(DB_NAME.QUESTION, {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  questionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  optionOne: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  optionTwo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  optionThree: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  optionFour: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
