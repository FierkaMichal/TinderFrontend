export class User {
  idUser: number;
  photos: Array<string>;
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

  public toJson(): string {
    return JSON.stringify(this);
  }
}
