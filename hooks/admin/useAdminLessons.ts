import { useState, useEffect, useMemo } from 'react';
import { getAllLessonsService } from '@/libs/lessonsService';
import { IAdminLesson } from '@/interfaces/lessons/lesson';

export default function useAdminLessons() {
    const [lessons, setLessons] = useState<IAdminLesson[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        const fetchLessons = async () => {
            setIsLoading(true);
            const { data, error } = await getAllLessonsService();
            
            if (error) {
                setError(error);
            } else if (data) {
                setLessons(data);
            }
            setIsLoading(false);
        };

        fetchLessons();
    }, []);

    // Filtramos por título
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
        setFilter
    };
}