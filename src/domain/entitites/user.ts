export class UserEntity {
  constructor(public user: User) {}
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string[];
  img?: string;
}
