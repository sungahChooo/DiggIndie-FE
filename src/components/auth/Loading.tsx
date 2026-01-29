'use client';
import Lottie from 'react-lottie-player';
import loadingAnimation from '@/assets/auth/spinner.json';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Lottie loop animationData={loadingAnimation} play style={{ width: 32, height: 32 }} />
      <p style={{ fontSize: '1.25rem', textAlign: 'center', marginTop: '1rem', color: '#666' }}>
        로딩 중...
      </p>
    </div>
  );
}
