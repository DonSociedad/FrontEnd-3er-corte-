import { Option } from '../buttonInterfaces/option';

export interface MultipleChoiceProps {
    prompt: string;
    options: Option[];
    onSelect: (id: string) => void;
    disabled?: boolean;
    feedback?: { correct: boolean; explanation?: string } | null;
}