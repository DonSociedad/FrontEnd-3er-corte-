import { Option } from '../buttonInterfaces/option';

export interface LearnOrganismProps {
    title: string;
    prompt: string;
    options: Option[];
    onSelect: (id: string) => void;
    disabled?: boolean;
    feedback?: { correct: boolean; explanation?: string } | null;
    onNext?: () => void;
}