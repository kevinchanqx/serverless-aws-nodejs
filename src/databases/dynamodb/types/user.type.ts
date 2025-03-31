export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}

// User data schema in DB
export type User = UserPrimaryKey &
  UserNonNullishFields &
  UserNullableFields & { created: number };

// Non nullish data
export type UserNonNullishFields = {
  name: string;
  email: string;
  gender: Gender;
};

// Nullable data
export type UserNullableFields = {
  age?: number;
};

// Partition key and Sort key of Users table
export type UserPrimaryKey = {
  contact: string;
};

export type UserEmailIndexPrimaryKey = {
  email: string;
};
