// export default class Musicien{
// constructor(
//   public id: string | null,
//   public nom: string,
//   public password: string,
//   public email: string,
//   public pseudo: string
// ){}
//   }

export default interface Musicien{
  id: null | string;
  nom: string;
  pseudo: string;
  password: string;
  email: string;
  style: string;
  description: string;
  photo: string;
  codePostal?: string;
  age?: number
}
