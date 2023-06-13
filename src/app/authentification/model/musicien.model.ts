export default class Musicien{
constructor(
  public id: string | null,
  public nom: string,
  public password: string,
  public email: string,
  public pseudo: string,
  public photo?: string,
  public description?: string,
  public style?: string
){}
  }