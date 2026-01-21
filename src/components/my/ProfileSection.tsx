import profileIcon from '@/assets/myPage/profileIcon.svg';
import Image from 'next/image';
export default function ProfileSection() {
  return (
    <div className="px-5 py-3 flex items-center gap-[21px]">
      <Image src={profileIcon} alt="Profile Icon" width={60} height={60} />
      <span className="text-white text-xl font-semibold">ddddd</span>
    </div>
  );
}
