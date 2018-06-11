export class User {
  idUser: number;
  photos: Array<number>;
  avatar: string;
  name: string;
  surname: string;
  phone: string;
  birthday: Date;
  description: string;
  isAdmin: boolean;
  sex: string;
  lookingFor: string;
  interests: Array<Object>;
}
