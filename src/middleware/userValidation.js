import { check, body } from "express-validator";

export const validRegister = [
  body("password").default(undefined),
  body("email").default(undefined),
  body("firstName").default(undefined),
  body("lastName").default(undefined),
  body("Age").default(undefined),
  body("City").default(undefined),
  body("userType").default(undefined),

  check("firstName", "firstName is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("firstName must be between 3 to 32 characters"),

  check("lastName", "lastName is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("name must be between 3 to 32 characters"),

  check("Age", "Age is required")
    .notEmpty()
    .isNumeric()
    .withMessage("name must be between 3 to 32 characters"),

  check("City", "City is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("name must be between 3 to 32 characters"),

  check("userType", "UserType is required").notEmpty().isString(),

  check("email", "Enter valid Email")
    .notEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),

  check("password", "Enter valid password")
    .isLength({ min: 6 })
    .matches(/(?=.*?[0-9])/)
    .withMessage(
      "Password must contain 6 letter with a character and a number"
    ),
];
