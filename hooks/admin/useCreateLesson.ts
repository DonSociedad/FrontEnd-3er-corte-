import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllLessonsService, createLessonService } from '@/libs/lessonsService';
import { ICreateLessonPayload, ILessonBlock, IAdminLesson } from '@/interfaces/lessons/lesson';

const initialBlock: ILessonBlock = {
    type: 'multiple_choice',
    payload: {
        prompt: '',
        options: [
            { id: 'a', text: '' },
            { id: 'b', text: '' }
        ],
        correctOptionId: 'a',
        explanation: ''
    }
};

export default function useCreateLesson() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [existingLessons, setExistingLessons] = useState<IAdminLesson[]>([]);
    
    const [formData, setFormData] = useState<ICreateLessonPayload>({
        title: '',
        order: 1,
        prerequisites: [],
        contentBlocks: [initialBlock]
    });

    useEffect(() => {
        getAllLessonsService().then(({ data }) => {
            if (data) {
                // Sugerimos el siguiente orden automáticamente
                const maxOrder = Math.max(...data.map(l => l.order), 0);
                setFormData(prev => ({ ...prev, order: maxOrder + 1 }));
                setExistingLessons(data);
            }
        });
    }, []);

    const updateField = (field: keyof ICreateLessonPayload, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // --- LÓGICA PRERREQUISITOS (Mejorada) ---
    const addPrerequisite = (lessonId: string) => {
        if (!lessonId) return;
        setFormData(prev => {
            if (prev.prerequisites.includes(lessonId)) return prev;
            return { ...prev, prerequisites: [...prev.prerequisites, lessonId] };
        });
    };

    const removePrerequisite = (lessonId: string) => {
        setFormData(prev => ({
            ...prev,
            prerequisites: prev.prerequisites.filter(id => id !== lessonId)
        }));
    };

    // --- LÓGICA BLOQUES ---
    const addBlock = () => {
        setFormData(prev => ({
            ...prev,
            contentBlocks: [...prev.contentBlocks, { ...initialBlock }]
        }));
    };

    const removeBlock = (index: number) => {
        setFormData(prev => ({
            ...prev,
            contentBlocks: prev.contentBlocks.filter((_, i) => i !== index)
        }));
    };

    const updateBlockPayload = (blockIndex: number, field: string, value: any) => {
        setFormData(prev => {
            const newBlocks = [...prev.contentBlocks];
            newBlocks[blockIndex] = {
                ...newBlocks[blockIndex],
                payload: { ...newBlocks[blockIndex].payload, [field]: value }
            };
            return { ...prev, contentBlocks: newBlocks };
        });
    };

    // --- LÓGICA OPCIONES ---
    const updateOptionText = (blockIndex: number, optionIndex: number, text: string) => {
        setFormData(prev => {
            const newBlocks = [...prev.contentBlocks];
            const newOptions = [...newBlocks[blockIndex].payload.options];
            newOptions[optionIndex] = { ...newOptions[optionIndex], text };
            newBlocks[blockIndex].payload.options = newOptions;
            return { ...prev, contentBlocks: newBlocks };
        });
    };

    const addOption = (blockIndex: number) => {
        setFormData(prev => {
            const newBlocks = [...prev.contentBlocks];
            const currentOptions = newBlocks[blockIndex].payload.options;
            // Generamos ID basado en la longitud actual (c, d, e...)
            const nextId = String.fromCharCode(97 + currentOptions.length); 
            
            newBlocks[blockIndex].payload.options = [
                ...currentOptions,
                { id: nextId, text: '' }
            ];
            return { ...prev, contentBlocks: newBlocks };
        });
    };

    const removeOption = (blockIndex: number, optionIndex: number) => {
        setFormData(prev => {
            const newBlocks = [...prev.contentBlocks];
            const currentOptions = newBlocks[blockIndex].payload.options;

            // Validación: Mínimo 2 opciones
            if (currentOptions.length <= 2) return prev;

            // Eliminamos la opción
            const filteredOptions = currentOptions.filter((_, i) => i !== optionIndex);

            // RE-INDEXAR IDs (a, b, c...) para que no queden huecos
            const reindexedOptions = filteredOptions.map((opt, i) => ({
                ...opt,
                id: String.fromCharCode(97 + i) // 97 es 'a' en ASCII
            }));

            // Resetear respuesta correcta a 'a' por seguridad si la que se borró era la correcta
            newBlocks[blockIndex].payload.correctOptionId = 'a';
            newBlocks[blockIndex].payload.options = reindexedOptions;

            return { ...prev, contentBlocks: newBlocks };
        });
    };

    const submit = async () => {
        setIsLoading(true);
        if (!formData.title) {
            alert("El título es obligatorio");
            setIsLoading(false);
            return;
        }
        const { error } = await createLessonService(formData);
        if (error) {
            alert("Error al crear: " + error);
        } else {
            alert("Lección creada con éxito");
            router.push('/admin/lessons');
        }
        setIsLoading(false);
    };

    return {
        formData,
        existingLessons,
        isLoading,
        updateField,
        addPrerequisite,    
        removePrerequisite, 
        addBlock,
        removeBlock,
        updateBlockPayload,
        updateOptionText,
        addOption,
        removeOption,      
        submit
    };
}