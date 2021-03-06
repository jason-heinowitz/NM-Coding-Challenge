export interface RegisterUser {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export interface LoginUser {
  username?: string;
  password?: string;
}

export interface Email {
  to?: string;
  subject?: string;
  body?: string;
}
