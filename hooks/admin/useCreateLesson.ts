import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllLessonsService, createLessonService } from '@/libs/lessonsService';
import { ICreateLessonPayload, ILessonBlock, IAdminLesson } from '@/interfaces/lessons/lesson';
import { useNotification } from '@/contexts/notificationContext';
import { createLessonSchema } from '@/schemas/lesson';

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
    const { showNotification } = useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const [existingLessons, setExistingLessons] = useState<IAdminLesson[]>([]);
    
    const [formData, setFormData] = useState<ICreateLessonPayload>({
        title: '',
        order: 1,
        prerequisites: [],
        contentBlocks: [initialBlock],
        coins: 0
    });

    // Cargar lecciones existentes para calcular el orden y mostrar prerequisitos
    useEffect(() => {
        let isMounted = true;
        getAllLessonsService().then(({ data }) => {
            if (isMounted && data) {
                // Sugerir el siguiente número de orden
                const maxOrder = data.length > 0 ? Math.max(...data.map(l => l.order)) : 0;
                setFormData(prev => ({ ...prev, order: maxOrder + 1 }));
                setExistingLessons(data);
            }
        });
        return () => { isMounted = false; };
    }, []);

    // --- MANEJO DE CAMPOS SIMPLES ---
    const updateField = (field: keyof ICreateLessonPayload, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // --- MANEJO DE PRERREQUISITOS ---
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

    // --- MANEJO DE BLOQUES (PREGUNTAS) ---
    const addBlock = () => {
        const newBlock = JSON.parse(JSON.stringify(initialBlock));
        setFormData(prev => ({
            ...prev,
            contentBlocks: [...prev.contentBlocks, newBlock]
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
            // Copia profunda segura para evitar mutar el estado directamente
            const newBlocks = [...prev.contentBlocks];
            newBlocks[blockIndex] = {
                ...newBlocks[blockIndex],
                payload: { 
                    ...newBlocks[blockIndex].payload, 
                    [field]: value 
                }
            };
            return { ...prev, contentBlocks: newBlocks };
        });
    };

    // --- MANEJO DE OPCIONES ---
    const updateOptionText = (blockIndex: number, optionIndex: number, text: string) => {
        setFormData(prev => {
            const newBlocks = [...prev.contentBlocks];
            // Copiamos el payload y las opciones para asegurar inmutabilidad
            const currentPayload = { ...newBlocks[blockIndex].payload };
            const newOptions = [...currentPayload.options];
            
            newOptions[optionIndex] = { ...newOptions[optionIndex], text };
            
            currentPayload.options = newOptions;
            newBlocks[blockIndex] = { ...newBlocks[blockIndex], payload: currentPayload };
            
            return { ...prev, contentBlocks: newBlocks };
        });
    };

    const addOption = (blockIndex: number) => {
        setFormData(prev => {
            const newBlocks = [...prev.contentBlocks];
            const currentPayload = { ...newBlocks[blockIndex].payload };
            const currentOptions = [...currentPayload.options];

            if (currentOptions.length >= 6) return prev; // Límite del schema

            const nextId = String.fromCharCode(97 + currentOptions.length); // a, b, c...
            
            currentPayload.options = [...currentOptions, { id: nextId, text: '' }];
            newBlocks[blockIndex] = { ...newBlocks[blockIndex], payload: currentPayload };

            return { ...prev, contentBlocks: newBlocks };
        });
    };

    const removeOption = (blockIndex: number, optionIndex: number) => {
        setFormData(prev => {
            const newBlocks = [...prev.contentBlocks];
            const currentPayload = { ...newBlocks[blockIndex].payload };
            const currentOptions = [...currentPayload.options];

            if (currentOptions.length <= 2) return prev; // Mínimo del schema

            // Eliminar la opción
            const filteredOptions = currentOptions.filter((_, i) => i !== optionIndex);

            // Re-indexar IDs para que queden secuenciales (a, b, c...)
            const reindexedOptions = filteredOptions.map((opt, i) => ({
                ...opt,
                id: String.fromCharCode(97 + i)
            }));

            currentPayload.options = reindexedOptions;
            
            // Si la opción correcta desapareció o cambió de índice, reseteamos a 'a' por seguridad
            // Opcional: Podrías hacer lógica más compleja para intentar preservar la selección
            if (!reindexedOptions.find(o => o.id === currentPayload.correctOptionId)) {
                currentPayload.correctOptionId = 'a';
            }

            newBlocks[blockIndex] = { ...newBlocks[blockIndex], payload: currentPayload };
            return { ...prev, contentBlocks: newBlocks };
        });
    };

    // --- SUBMIT ---
    const submit = async () => {
        setIsLoading(true);

        // 1. VALIDACIÓN CORRECTA (Usando el Schema, no la Interface)
        const validationResult = createLessonSchema.safeParse(formData);

        if (!validationResult.success) {
            // Mostrar solo el primer error
            const firstError = validationResult.error.issues[0];
            showNotification(firstError.message, 'error');
            setIsLoading(false);
            return;
        }

        // 2. ENVIAR AL BACKEND
        try {
            // validationResult.data contiene los datos limpios y tipados
            const { error } = await createLessonService(validationResult.data);

            if (error) {
                showNotification("Error al crear la lección: " + error, 'error');
            } else {
                showNotification("¡Lección creada con éxito!", 'success');
                router.push('/admin/lessons');
            }
        } catch (e) {
            showNotification("Error inesperado en el servidor", 'error');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
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