import { IUserProfile } from "../users/user";

export interface ProfileCardProps {
    user: IUserProfile;
    onEquip?: (cat: string, id: string) => void;
    isOwnProfile?: boolean;
}
