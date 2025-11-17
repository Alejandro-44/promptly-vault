export type User = {
  id: string;
  username: string;
  email: string;
  is_active: boolean;
};

export type UserCreate = {
  username: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
};
