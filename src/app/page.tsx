'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeEntry() {
  const router = useRouter();

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

    if (!hasSeenSplash) {
      router.replace('/splash?next=/home');
    } else {
      router.replace('/home');
    }
  }, [router]);

  return null;
}
