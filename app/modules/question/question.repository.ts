import { sequelize } from "../configurations/connection";
import { QuestionModel } from "./question.schema";
import { IQuestion } from "./question.types";

const addQuestion = async (question: IQuestion) => {
  try {
    return await QuestionModel.create({ ...question });
  } catch (error) {
    throw error;
  }
};

const findOneRandomQuestion = async () => {
  try {
    return await QuestionModel.findOne({
      order: sequelize.random(),
    });
  } catch (error) {
    throw error;
  }
};

const findAllQuestions = async () => {
  try {
    return await QuestionModel.findAll();
  } catch (error) {
    throw error;
  }
};

const updateAQuestion = async (questionId: string, question: IQuestion) => {
  try {
    return await QuestionModel.update(
      { ...question },
      { where: { id: questionId } }
    );
  } catch (error) {
    throw error;
  }
};

const deleteQuestion = async (questionId: string) => {
  try {
    return await QuestionModel.destroy({ where: { id: questionId } });
  } catch (error) {
    throw error;
  }
};

const getFiveRandomQuestions = async() => {
    try {
        return QuestionModel.findAll({
            order: sequelize.random(),
            limit: 5,
          });
    } catch (error) {
        throw error;
    }
}

export default {
  addQuestion,
  findOneRandomQuestion,
  findAllQuestions,
  updateAQuestion,
  deleteQuestion,
  getFiveRandomQuestions
};
