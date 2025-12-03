export interface IAvatarEquipped {
  skin: string;
  hat: string;
  eyes: string;
  mouth: string;
  body: string;
}

export interface IPigData {
  equipped: IAvatarEquipped;
  inventory: string[];
}

export interface IUserProfile {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  pig: IPigData;
  coins: number;
  isPremium?: boolean;
  completedLessons?: number; 
  friends?: number;
  itemsCount?: number;
}

export interface IRawUserResponse {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    role: string;
    pig: any;
    coins: number;
    progress: string[]; 
    registrationDate: string;
}