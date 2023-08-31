import { check, query } from "express-validator";

export const createUserValidator = [
  check("firstName")
    .matches(/^[A-Za-z\s]+$/)
    .isString()
    .isLength({ min: 1 })
    .trim()
    .withMessage("First name is invalid"),
  check("lastName")
    .matches(/^[A-Za-z\s]+$/)
    .isString()
    .isLength({ min: 1 })
    .trim()
    .withMessage("Last name is invalid"),
  check("userName")
    .matches(/^[A-Za-z\s]^/)
    .isLength({ min: 1 })
    .trim()
    .withMessage("user name is invalid"),
  check("email").isEmail().withMessage("Email is invalid"),
];
