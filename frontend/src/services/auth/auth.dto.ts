export type UserCreateDTO = {
  username: string;
  email: string;
  password: string;
};

export type UserLoginDTO = {
  email: string;
  password: string;
};

export type TokenDTO = {
  access_token: string;
  token_type: string;
};

export type UpdatePasswordDTO = {
  old_password: string;
  new_password: string;
};
