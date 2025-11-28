import LearnClient from "@/components/organism/lessons/learnClientComponent";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function LearnPage({ params }: Props) {
    try {
        const p = await params;
        return <LearnClient lessonId={p.id} />;
    } catch (error) {
        console.error('Error loading lesson:', error);
        return <div>Error loading lesson</div>;
    }
}