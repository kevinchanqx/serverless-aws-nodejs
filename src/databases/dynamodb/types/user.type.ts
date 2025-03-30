// User data schema in DB
export type User = {
  name: string;
  email: string;
  gender: string;
  contact: string;
  age?: number;
};

// Partition key and Sort key of Users table
export type UserPrimaryKey = {
  contact: string;
};

export type UserEmailIndexPrimaryKey = {
  email: string;
};
