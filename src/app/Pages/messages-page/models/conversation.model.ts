export default interface Conversation{
    id: number | null;
    message: string;
    userEnvoiId: number;
    userEnvoiName: string;
    userRecoitId: number;
    userRecoitName: string;
  }