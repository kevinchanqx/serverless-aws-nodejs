import { User } from "@databases/dynamodb/types";

export type UpdateUserParams = {
  contact: string;
};

export type UpdateUserBody = Partial<Omit<User, "contact" | "created">>;
