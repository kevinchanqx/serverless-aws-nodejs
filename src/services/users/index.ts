import {
  createUserController,
  getUserByEmailController,
  getUsersController,
  updateUserController,
} from "./controllers";

export const createUserHandler = createUserController;
export const getUserByEmailHandler = getUserByEmailController;
export const getUsersHandler = getUsersController;
export const updateUserHandler = updateUserController;
