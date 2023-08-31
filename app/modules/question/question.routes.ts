import { NextFunction, Request, Response, Router, request } from "express";
import { IQuestion } from "./question.types";
import { StatusCodes } from "http-status-codes";
import { ResponseHandler } from "../common/response.handler";
import questionService from "./question.service";

export const router = Router();

router.post(
  "/addQuestion",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addedQuestion = await questionService.addQuestion(
        req.body as IQuestion
      );
      res.status(StatusCodes.OK).send(new ResponseHandler(addedQuestion));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/getAllQuestions",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allQuestions = await questionService.getAllQuestions();
      res.status(StatusCodes.OK).send(new ResponseHandler(allQuestions));
    } catch (error) {
      throw error;
    }
  }
);

router.get(
  "/getOneQuestion",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const question = await questionService.getOneRandomQuestion();
      res.status(StatusCodes.OK).send(new ResponseHandler(question));
    } catch (error) {
      throw error;
    }
  }
);


router.get(
    "/getRandomFiveQuestion",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const questions = await questionService.generateFiveQuestions();
        res.status(StatusCodes.OK).send(new ResponseHandler(questions));
      } catch (error) {
        throw error;
      }
    }
  );

  

router.put(
  "/updateAQuestion/:questionId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedQuestion = await questionService.updateAQuestion(
        req.params.questionId,
        req.body as IQuestion
      );
      res.status(StatusCodes.OK).send(new ResponseHandler(updatedQuestion));
    } catch (error) {
      throw error;
    }
  }
);

router.delete(
  "deleteQuestion/:questionId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedQuestion = await questionService.deleteQuestion(
        req.body.questionId
      );
      res.status(StatusCodes.OK).send(new ResponseHandler(deletedQuestion));
    } catch (error) {
      throw error;
    }
  }
);
