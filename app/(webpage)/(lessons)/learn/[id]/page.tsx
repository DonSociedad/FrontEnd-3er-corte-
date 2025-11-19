import LearnClient from './LearnClient'

type Props = {
    params: { id: string };
};

export default async function LearnPage({ params }: Props) {
    const p = await params;
    return <LearnClient lessonId={p.id} />;
}