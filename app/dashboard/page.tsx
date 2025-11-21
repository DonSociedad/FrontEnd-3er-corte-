import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Admin page"
};

export default function homeDashboardPage() {
    return (
        <div>
            <h1>Home Dashboard</h1>
        </div>
    );
}