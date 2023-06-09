export default interface Musicien{
    id: number | null | string;
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
