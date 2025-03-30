import {
  createUserController,
  getUserByEmailController,
  getUsersController,
} from "./controllers";

export const createUserHandler = createUserController;
export const getUserByEmailHandler = getUserByEmailController;
export const getUsersHandler = getUsersController;
