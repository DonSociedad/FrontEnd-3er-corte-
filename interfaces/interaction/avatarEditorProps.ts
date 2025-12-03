import { IPigData } from "../users/user";

export interface AvatarEditorProps {
    pigData: IPigData;
    onEquip: (category: string, itemId: string) => void;
}