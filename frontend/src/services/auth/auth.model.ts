export type UserCreate = {
  username: string;
  password: string;
  email: string;
};

export type UserLogin = {
  email: string;
  password: string;
}

export type Token = {
  accessToken: string;
  tokenType: string;
};
