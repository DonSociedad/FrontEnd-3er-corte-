import { useState, useEffect, useMemo } from 'react';
import { getAllLessonsService, updateLessonService, deleteLessonService } from '@/libs/lessonsService';
import { IAdminLesson } from '@/interfaces/lessons/lesson';
import { useNotification } from '@/contexts/notificationContext';

export default function useAdminLessons() {
    const [lessons, setLessons] = useState<IAdminLesson[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('');
    
    // Estado de carga para acciones
    const [isUpdating, setIsUpdating] = useState(false);
    
    const { showNotification } = useNotification();

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        setIsLoading(true);
        const { data, error } = await getAllLessonsService();
        if (error) setError(error);
        else if (data) setLessons(data);
        setIsLoading(false);
    };

    // --- FUNCIÓN ACTUALIZAR ---
    const updateLesson = async (id: string, payload: any) => {
        setIsUpdating(true);
        const { data, error } = await updateLessonService(id, payload);
        
        if (error) {
            showNotification(error, 'error');
            setIsUpdating(false);
            return { success: false };
        } else {
            // Actualizar localmente
            setLessons(prev => prev.map(l => l.id === id ? { ...l, ...payload } : l));
            setIsUpdating(false);
            return { success: true };
        }
    };

    // --- FUNCIÓN ELIMINAR ---
    const deleteLesson = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar esta lección? Esto borrará el progreso de los usuarios en ella.")) return;

        setIsUpdating(true);
        const { error } = await deleteLessonService(id);

        if (error) {
            showNotification(error, 'error');
        } else {
            showNotification("Lección eliminada correctamente", 'success');
            setLessons(prev => prev.filter(l => l.id !== id));
        }
        setIsUpdating(false);
    };

    const filteredLessons = useMemo(() => {
        const term = filter.toLowerCase();
        return lessons.filter(l => 
            l.title.toLowerCase().includes(term)
        );
    }, [lessons, filter]);

    return {
        lessons: filteredLessons,
        totalLessons: lessons.length,
        isLoading,
        error,
        filter,
        setFilter,
        updateLesson, 
        deleteLesson, 
        isUpdating
    };
}