'use client';
import { useParams, useRouter as useNextRouter } from 'next/navigation';

export function useSafeRouter() {
    const router = useNextRouter();
    const { lng } = useParams();

    const push = (path) => {
        // Remove any existing language prefix
        const normalizedPath = path.replace(new RegExp(`^/${lng}`), '');

        // Add the current language prefix if not present
        const finalPath = normalizedPath.startsWith(`/${lng}`)
            ? normalizedPath
            : `/${lng}${normalizedPath}`;

        router.push(finalPath);
    };

    return { ...router, push };
}