/* eslint-disable prettier/prettier */
export interface LoginDetail {
  username: string;
  password: string;
}

export interface RegisterDetail {
  username: string;
  password: string;
  seller?: boolean;
}
