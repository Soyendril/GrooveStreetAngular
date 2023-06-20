export default interface Musicien{
  id: null | string;
  nom: string;
  pseudo: string;
  password: string;
  email: string;
  style: string;
  description: string;
  photo: string;
  codePostal?: string |any;
  age?: number;
  instrument: Instrument|any;
}

export interface Instrument {
  type: string;
  // Autres propriétés de l'instrument, le cas échéant
}
