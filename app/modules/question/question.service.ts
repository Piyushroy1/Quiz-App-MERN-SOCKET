import questionRepository from "./question.repository";
import { IQuestion } from "./question.types"


const addQuestion = async(question : IQuestion) => {
    return await questionRepository.addQuestion(question);
}

const getOneRandomQuestion = async() => {
    return await questionRepository.findOneRandomQuestion();
}

const getAllQuestions = async() => {
    return await questionRepository.findAllQuestions();
}


const updateAQuestion = async(questionId : string , question : IQuestion) => {
    return await questionRepository.updateAQuestion(questionId , question);
}


const deleteQuestion = async(questionId : string) => {
    return await questionRepository.deleteQuestion(questionId);
}

const generateFiveQuestions = async() => {
    return await questionRepository.getFiveRandomQuestions();
}





export default {
    deleteQuestion,
    updateAQuestion,
    getAllQuestions,
    addQuestion,
    getOneRandomQuestion,
    generateFiveQuestions
}