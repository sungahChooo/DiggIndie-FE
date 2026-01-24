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
        height: '65vh',
      }}
    >
      <Lottie loop animationData={loadingAnimation} play style={{ width: 200, height: 200 }} />
      <p style={{ fontSize: '1.25rem', textAlign: 'center', marginTop: '1rem' }}>
        로그인 중입니다...
      </p>
    </div>
  );
}
