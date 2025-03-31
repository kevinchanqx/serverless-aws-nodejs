import { User } from "@databases/dynamodb/types";

export type CreateUserBody = Omit<User, "created">;
