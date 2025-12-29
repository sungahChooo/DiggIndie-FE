import profileIcon from '@/assets/myPage/profileIcon.svg';
import Image from 'next/image';
export default function ProfileSection() {
  return (
    <div className="px-5 py-3 flex items-center gap-[21px]">
      <Image src={profileIcon} alt="Profile Icon" width={60} height={60} />
      <span>CEOS1943</span>
    </div>
  );
}
