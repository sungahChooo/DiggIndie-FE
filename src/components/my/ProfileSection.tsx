import profileIcon from '@/assets/myPage/profileIcon.svg';
import Image from 'next/image';

interface ProfileSectionProps {
  userId: string | null;
}
export default function ProfileSection({ userId }: ProfileSectionProps) {
  return (
    <div className="px-5 py-3 flex items-center gap-3">
      <Image src={profileIcon} alt="Profile Icon" width={44} height={44} />
      <span className="text-white text-xl font-semibold">{userId}</span>
    </div>
  );
}
